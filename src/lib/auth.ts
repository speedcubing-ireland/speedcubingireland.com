import {
  Lucia, Session, TimeSpan, User,
} from 'lucia';
import { OAuth2Client } from 'oslo/oauth2';
import { InferSelectModel } from 'drizzle-orm';
import { IncomingMessage, ServerResponse } from 'http';
import { adapter, users } from './db';

const authorizeEndpoint = 'https://www.worldcubeassociation.org/oauth/authorize';
const tokenEndpoint = 'https://www.worldcubeassociation.org/oauth/token';

export const wcaClient = new OAuth2Client(
  process.env.WCA_CLIENT_ID!,
  authorizeEndpoint,
  tokenEndpoint,
  {
    redirectURI: 'http://localhost:3000/api/login/wca/callback',
  },
);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, 'd'),
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes: DatabaseUserAttributes) => ({
    id: attributes.id,
    name: attributes.name,
    wcaId: attributes.wcaId,
    county: attributes.county,
    visible: attributes.visible,
    beenToComp: attributes.beenToComp,
  }),
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }

  interface User extends DatabaseUserAttributes {
  }
}

interface DatabaseUserAttributes extends InferSelectModel<typeof users> {}

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
