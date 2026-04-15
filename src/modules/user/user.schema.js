import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core'


export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),

    name: varchar('name', { length: 45 }).notNull(),

    email: varchar('email', { length: 322 }).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),

    password: varchar('password', { length: 66 }),
    refresh_token: text('refresh_token'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})