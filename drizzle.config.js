import 'dotenv/config';

/** @type {import('drizzle-kit').Config} */
export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:local.db',
  },
}
