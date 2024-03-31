import { Lucia, Session, User } from 'lucia';
import { GitHub } from 'arctic';
import { IncomingMessage, ServerResponse } from 'http';
import { adapter } from './db';

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes: DatabaseUserAttributes) => {
    const { id, githubId, username } = attributes;
    return {
      id,
      githubId,
      username,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }

  interface User {
    id: string;
    githubId: string;
    username: string;
  }
}

interface DatabaseUserAttributes {
  id: string;
  githubId: number;
  username: string;
}

export async function validateRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<{ user: User; session: Session } | { user: null; session: null }> {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await lucia.validateSession(sessionId);
  if (result.session && result.session.fresh) {
    res.setHeader('Set-Cookie', lucia.createSessionCookie(result.session.id).serialize());
  }
  if (!result.session) {
    res.setHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize());
  }
  return result;
}
