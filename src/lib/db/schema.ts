import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  wcaId: text('wca_id').notNull().unique(),
  county: text('county'),
  visible: int('visible', { mode: 'boolean' }).default(true).notNull(),
  beenToComp: int('been_to_comp', { mode: 'boolean' }).default(false).notNull(),
});

export const sessions = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: int('expires_at').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
});
