import { createClient } from '@libsql/client';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle } from 'drizzle-orm/libsql';
import { sessions, users } from './schema';

const sqliteClient = createClient({
  url: 'file:local.db',
});

const db = drizzle(sqliteClient);

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export {
  db,
  adapter,
  users,
  sessions,
};
