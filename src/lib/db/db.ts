import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

export const turso = createClient({
  url: 'file:local.db',
});

export const db = drizzle(turso);
