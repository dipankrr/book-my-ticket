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

import { users } from "../../user/user.schema.js";
import { showSeats } from "../schemas/show-seat.schema.js";

export const seatLocks = pgTable(
  "seat_locks",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    showSeatId: uuid("show_seat_id")
      .unique()
      .references(() => showSeats.id),

    userId: uuid("user_id")
      .references(() => users.id),

    expiresAt: timestamp("expires_at").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_seat_locks_expiry").on(
      table.expiresAt
    ),

    index("idx_seat_locks_showseat_expiry").on(
      table.showSeatId,
      table.expiresAt
    ),
  ]
);