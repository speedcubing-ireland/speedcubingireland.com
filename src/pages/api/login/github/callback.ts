import { github, lucia } from '@/lib/auth';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';

import type { NextApiRequest, NextApiResponse } from 'next';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }
  const code = req.query.code?.toString() ?? null;
  const state = req.query.state?.toString() ?? null;
  const storedState = req.cookies.github_oauth_state ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    res.status(400).end();
    return;
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = (await db
      .select()
      .from(users)
      .where(eq(users.githubId, githubUser.id))
      .limit(1)
      .execute())[0];

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      res
        .setHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
        .redirect('/');
      return;
    }

    const userId = generateId(15);

    await db.insert(users).values({
      id: userId,
      githubId: githubUser.id,
      username: githubUser.login,
    }).execute();

    const session = await lucia.createSession(userId, {});
    res
      .setHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
      .redirect('/');
  } catch (e) {
    if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
      // invalid code
      res.status(400).end();
      return;
    }
    res.status(500).end();
  }
}

interface GitHubUser {
  id: number;
  login: string;
}
