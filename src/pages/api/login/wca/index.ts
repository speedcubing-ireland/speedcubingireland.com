import { generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';
import { wcaClient } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }
  const state = generateState();
  const url = await wcaClient.createAuthorizationURL({
    state,
    scopes: ['public'],
  });
  res
    .setHeader(
      'Set-Cookie',
      serializeCookie('wca_oauth_state', state, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: 'lax',
      }),
    )
    .redirect(url.toString());
}
