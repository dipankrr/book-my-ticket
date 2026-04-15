import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";



export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),

    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),

    durationMins: integer("duration_mins"),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});
