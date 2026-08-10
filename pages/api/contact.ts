import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { getContactReason, validateContact, hasContactErrors } from '../../utils/contact';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// Best-effort, per-serverless-instance rate limiting. This map is not shared
// across instances/regions, so it only blunts obvious bursts from a single
// warm instance — the honeypot field below is the primary spam defence.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: real users never fill in this hidden field. Silently accept so
  // bots don't learn they were caught.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim()
    ?? req.socket.remoteAddress
    ?? 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  const validation = validateContact(body);
  if (hasContactErrors(validation)) {
    return res.status(400).json({ errors: validation.errors });
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const reasonId = String(body.reason).trim();
  const competition = typeof body.competition === 'string' ? body.competition.trim() : '';
  const message = String(body.message).trim();

  const reasonConfig = getContactReason(reasonId);
  const reasonLabel = reasonConfig?.label ?? reasonId;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.error('RESEND_API_KEY is not configured; cannot send contact email.');
    return res.status(500).json({ message: 'Unable to send your message right now. Please try again later.' });
  }

  const to = process.env.CONTACT_EMAIL || 'info@speedcubingireland.com';
  const subject = `[Website] ${reasonLabel}${competition ? ` — ${competition}` : ''}`;

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Reason: ${reasonLabel}`,
    competition ? `Competition: ${competition}` : undefined,
    '',
    message,
  ].filter((line): line is string => line !== undefined);

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Reason:</strong> ${escapeHtml(reasonLabel)}</p>
    ${competition ? `<p><strong>Competition:</strong> ${escapeHtml(competition)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Speedcubing Ireland Website <website@speedcubingireland.com>',
      to,
      replyTo: email,
      subject,
      text: textLines.join('\n'),
      html,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Resend error sending contact email:', error);
      return res.status(500).json({ message: 'Unable to send your message right now. Please try again later.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error sending contact email:', err);
    return res.status(500).json({ message: 'Unable to send your message right now. Please try again later.' });
  }
}
