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

import { screens } from "../screen/screen.schema.js";
import { events } from "../event/event.schema.js";

export const shows = pgTable(
  "shows",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    eventId: uuid("event_id").references(() => events.id),

    screenId: uuid("screen_id").references(() => screens.id),

    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),

    basePrice: numeric("base_price", {
      precision: 10,
      scale: 2,
    }),
  },
  (table) => [
    uniqueIndex("unique_screen_start").on(
      table.screenId,
      table.startTime
    ),
  ]
);