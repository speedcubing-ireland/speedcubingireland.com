import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  githubId: int('github_id').notNull().unique(),
  username: text('username').notNull(),
});

export const sessions = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: int('expires_at').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
});
