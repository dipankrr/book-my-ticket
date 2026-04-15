import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";


export const venues = pgTable("venues", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
    city: varchar("city", { length: 100 }),
    address: text("address"),
  
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});