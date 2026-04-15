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

import { screens } from "../../screen/screen.schema.js";

export const seats = pgTable(
  "seats",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    screenId: uuid("screen_id")
      .references(() => screens.id, { onDelete: "cascade" }),

    rowLabel: varchar("row_label", { length: 10 }),
    seatNumber: integer("seat_number"),

    seatType: varchar("seat_type", { length: 50 }),
  },
  (table) => [
     uniqueIndex("unique_screen_seat").on(
      table.screenId,
      table.rowLabel,
      table.seatNumber
    ),
  ]
);