import ApiError from "../../common/utils/ApiError.js";
import { db } from "../../db/index.js";
import {seats } from "./schemas/screen-seat.schema.js";
import {showSeats } from "./schemas/show-seat.schema.js";
import { seatLocks } from "./schemas/seatlock.schema.js";
import { shows } from "../show/show.schema.js";
import { eq, sql , inArray, and, gt } from "drizzle-orm";

const getSeats = async (showId) => {  
  try {

    console.log(showId);
    
    const show = await db
      .select({ id: shows.id })
      .from(shows)
      .where(eq(shows.id, showId))
      .limit(1);

      console.log(show);
      
    if (!show.length) {
      throw ApiError.notFound("Show not found");
    }

    return await db
    .select({
      id: showSeats.id,
      row: seats.rowLabel,
      number: seats.seatNumber,
      price: showSeats.price,

      status: sql`
        CASE
          WHEN ${showSeats.status} = 'booked' THEN 'booked'
          WHEN EXISTS (
            SELECT 1 FROM ${seatLocks}
            WHERE ${seatLocks.showSeatId} = ${showSeats.id}
            AND ${seatLocks.expiresAt} > NOW()
          ) THEN 'locked'
          ELSE 'available'
        END
      `,
    })
    .from(showSeats)
    .innerJoin(seats, eq(showSeats.seatId, seats.id))
    .where(eq(showSeats.showId, showId));

  } catch (error) {
    // throw ApiError.failed("could not get seats")
    throw error;
  }
  
};



const lockSeats = async (showSeatIds, userId) => {
  return await db.transaction(async (tx) => {

    const selectedSeats = await tx
      .select()
      .from(showSeats)
      .where(inArray(showSeats.id, showSeatIds));

    if (selectedSeats.length !== showSeatIds.length) {
      throw ApiError.notFound("Some seats not found");
    }

    

    const bookedSeat = selectedSeats.find(
      seat => seat.status === "booked"
    );

    if (bookedSeat) {
      throw ApiError.badRequest("Some seats already booked");
    }


    const activeLocks = await tx
      .select()
      .from(seatLocks)
      .where(
        and(
          inArray(seatLocks.showSeatId, showSeatIds),
          gt(seatLocks.expiresAt, new Date())
        )
      );

    if (activeLocks.length) {
      throw ApiError.badRequest("Some seats already locked");
    }

 
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    const locks = await tx
      .insert(seatLocks)
      .values(
        showSeatIds.map(id => ({
          showSeatId: id,
          userId,
          expiresAt: expiry,
        }))
      )
      .returning();

    return locks;
  });
};


export{
    getSeats,
    lockSeats
}