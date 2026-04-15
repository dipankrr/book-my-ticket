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

import { shows } from "../../show/show.schema.js";
import { seats } from "../schemas/screen-seat.schema.js";


export const showSeats = pgTable(
  "show_seats",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    showId: uuid("show_id")
      .references(() => shows.id, { onDelete: "cascade" }),

    seatId: uuid("seat_id")
      .references(() => seats.id),

    price: numeric("price", {
      precision: 10,
      scale: 2,
    }).notNull(),

    status: varchar("status", { length: 20 })
      .default("available"),
  },
  (table) => [
    uniqueIndex("unique_show_seat").on(
      table.showId,
      table.seatId
    ),

    index("idx_show_seats_show_status").on(
      table.showId,
      table.status
    ),
  ]
);