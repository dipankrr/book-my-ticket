import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
  uniqueIndex,
  index
} from "drizzle-orm/pg-core";

import { venues } from "../venue/venue.schema.js";


export const screens = pgTable("screens", {
    id: uuid("id").defaultRandom().primaryKey(),

    venueId: uuid("venue_id")
        .references(() => venues.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 100 }).notNull(),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});