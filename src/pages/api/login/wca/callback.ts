import { lucia, wcaClient } from '@/lib/auth';
import { OAuth2RequestError } from 'arctic';

import type { NextApiRequest, NextApiResponse } from 'next';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { getPersonComps } from '@/lib/wca-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }
  const code = req.query.code?.toString() ?? null;
  const state = req.query.state?.toString() ?? null;
  const storedState = req.cookies.wca_oauth_state ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    res.status(400).redirect('/ranks/account').end();
    return;
  }

  try {
    const tokens = await wcaClient.validateAuthorizationCode(code, {
      credentials: process.env.WCA_CLIENT_SECRET!,
    });

    const wcaUserResponse = await fetch('https://www.worldcubeassociation.org/api/v0/me', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const wcaUser = await wcaUserResponse.json() as { me: {
      id: string,
      name: string,
      wca_id: string,
    } };

    const existingUser = (await db
      .select()
      .from(users)
      .where(eq(users.id, wcaUser.me.id))
      .limit(1)
      .execute())[0];

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      res
        .setHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
        .redirect('/ranks/account');
      return;
    }

    const comps = await getPersonComps(wcaUser.me.wca_id);
    const beenToComp = comps.some((comp) => comp.country_iso2 === 'IE'
      || (comp.country_iso2 === 'GB' && comp.city.includes('County')));

    await db.insert(users).values({
      id: wcaUser.me.id,
      name: wcaUser.me.name,
      wcaId: wcaUser.me.wca_id,
      visible: true,
      beenToComp,
    }).execute();

    const session = await lucia.createSession(wcaUser.me.id, {});
    res
      .setHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
      .redirect('/ranks/account');
  } catch (e) {
    if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
      // invalid code
      res.status(400).redirect('/ranks/account').end();
      return;
    }
    res.status(500).redirect('/ranks/account').end();
  }
}
