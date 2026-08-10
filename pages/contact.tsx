import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState, FormEvent } from 'react';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Obfuscate from 'react-obfuscate';
import Layout from '../components/layout/Layout';
import { getCompsFromNow } from '../utils/wca-api';
import { CURRENT_COMP_REVALIDATE_TIME } from '../utils/constants';
import {
  CONTACT_REASONS,
  CONTACT_OTHER_COMPETITION,
  getContactReason,
  validateContact,
  hasContactErrors,
  ContactPayload,
} from '../utils/contact';

interface CompetitionOption {
  id: string;
  name: string;
}

export const getStaticProps: GetStaticProps<{ competitions: CompetitionOption[] }> = async () => {
  let competitions: CompetitionOption[] = [];

  try {
    const comps = await getCompsFromNow();
    competitions = comps.map((comp) => ({ id: comp.id, name: comp.name }));
  } catch {
    // If the WCA API is unreachable, fall back to a plain text competition
    // field instead of failing the build.
    competitions = [];
  }

  return {
    props: { competitions },
    revalidate: CURRENT_COMP_REVALIDATE_TIME,
  };
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact({
  competitions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [competition, setCompetition] = useState('');
  const [otherCompetition, setOtherCompetition] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [submitError, setSubmitError] = useState<string | undefined>();

  const reasonConfig = getContactReason(reason);
  const showCompetition = !!reasonConfig?.needsCompetition;
  const showOtherCompetitionInput = competition === CONTACT_OTHER_COMPETITION
    || competitions.length === 0;

  let resolvedCompetition: string | undefined;
  if (showCompetition) {
    resolvedCompetition = showOtherCompetitionInput ? otherCompetition : competition;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name, email, reason, competition: resolvedCompetition, message,
    };

    const validation = validateContact(payload);
    if (hasContactErrors(validation)) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitError(undefined);
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) {
          setErrors(data.errors);
          setStatus('idle');
          return;
        }
        setSubmitError(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setReason('');
    setCompetition('');
    setOtherCompetition('');
    setMessage('');
    setStatus('idle');
    setErrors({});
    setSubmitError(undefined);
  };

  return (
    <Layout title="Contact">
      <div className="bg-base-100">
        <div className="prose max-w-prose mx-auto p-8 pb-0">
          <h1>Contact Us</h1>
          <p>
            Have a question, want to organise a competition, or need help with a
            registration? Fill in the form below and we&apos;ll get back to you.
            We&apos;re all volunteers, so please allow a few days for a reply.
          </p>
        </div>

        <div className="max-w-prose mx-auto px-8 pb-8">
          {status === 'success' ? (
            <div className="alert alert-success flex flex-col items-start gap-4">
              <span>
                Thanks — we&apos;ve got your message and will reply to
                {' '}
                {email}
                . We&apos;re all volunteers, so please allow a few days.
              </span>
              <button type="button" className="btn btn-sm" onClick={resetForm}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="card bg-base-200 shadow p-6 gap-2" onSubmit={handleSubmit} noValidate>
              {/* Honeypot field: hidden from real users, bots often fill every field. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">
                  Leave this field empty
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label" htmlFor="contact-name">
                  <span className="label-text">Your name</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <span id="contact-name-error" className="label-text-alt text-error mt-1">{errors.name}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="contact-email">
                  <span className="label-text">Your email</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <span id="contact-email-error" className="label-text-alt text-error mt-1">{errors.email}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="contact-reason">
                  <span className="label-text">Why are you contacting us?</span>
                </label>
                <select
                  id="contact-reason"
                  className="select select-bordered"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setCompetition('');
                    setOtherCompetition('');
                  }}
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? 'contact-reason-error' : undefined}
                >
                  <option value="" disabled>Select a reason</option>
                  {CONTACT_REASONS.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
                {errors.reason && (
                  <span id="contact-reason-error" className="label-text-alt text-error mt-1">{errors.reason}</span>
                )}
                {reasonConfig?.helpText && (
                  <span className="label-text-alt mt-2">{reasonConfig.helpText}</span>
                )}
              </div>

              {showCompetition && (
                <div className="form-control">
                  <label
                    className="label"
                    htmlFor={competitions.length > 0 ? 'contact-competition' : 'contact-competition-other'}
                  >
                    <span className="label-text">Which competition?</span>
                  </label>
                  {competitions.length > 0 ? (
                    <select
                      id="contact-competition"
                      className="select select-bordered"
                      value={competition}
                      onChange={(e) => setCompetition(e.target.value)}
                      aria-invalid={!!errors.competition}
                      aria-describedby={errors.competition ? 'contact-competition-error' : undefined}
                    >
                      <option value="" disabled>Select a competition</option>
                      {competitions.map((comp) => (
                        <option key={comp.id} value={comp.name}>{comp.name}</option>
                      ))}
                      <option value={CONTACT_OTHER_COMPETITION}>
                        My competition isn&apos;t listed
                      </option>
                    </select>
                  ) : null}
                  {/* The visible label points at the select whenever one is
                      rendered, so this input carries its own accessible name. */}
                  {showOtherCompetitionInput && (
                    <input
                      id="contact-competition-other"
                      type="text"
                      className="input input-bordered mt-2"
                      placeholder="Name of the competition"
                      aria-label="Name of the competition"
                      value={otherCompetition}
                      onChange={(e) => setOtherCompetition(e.target.value)}
                      aria-invalid={!!errors.competition}
                      aria-describedby={errors.competition ? 'contact-competition-error' : undefined}
                    />
                  )}
                  {errors.competition && (
                    <span id="contact-competition-error" className="label-text-alt text-error mt-1">{errors.competition}</span>
                  )}
                </div>
              )}

              <div className="form-control">
                <label className="label" htmlFor="contact-message">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  id="contact-message"
                  className="textarea textarea-bordered h-40"
                  placeholder={reasonConfig?.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && (
                  <span id="contact-message-error" className="label-text-alt text-error mt-1">{errors.message}</span>
                )}
              </div>

              {status === 'error' && submitError && (
                <div className="alert alert-error">
                  <span>
                    {submitError}
                    {' '}
                    You can also email us directly at
                    {' '}
                    <Obfuscate email="info@speedcubingireland.com" />
                    .
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}

          <div className="divider mt-8">or</div>

          <p className="text-center">
            Prefer not to use the form? You can also reach us on social media.
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <Link
              className="btn btn-ghost gap-2"
              href="https://www.facebook.com/SpeedcubingIreland"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
              Facebook
            </Link>
            <Link
              className="btn btn-ghost gap-2"
              href="https://www.instagram.com/speedcubingireland/"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
