import ApiResponse from "../../common/utils/ApiResponse.js";
import * as seatService from "./seat.service.js";

const getSeats = async (req, res) => {
    const { showId } = req.params;
    const seats = await seatService.getSeats(showId)

    ApiResponse.ok(
        res,
        `all seats of show ${showId}`,
        seats
    )
}


const lockSeats = async (req, res, next) => {

    const { showSeatIds, userId } = req.body;

    const result = await seatService.lockSeats(showSeatIds, userId);

    ApiResponse.ok(
        res,
        "Seats locked successfully",
        result
    )


};


export{
    getSeats,
    lockSeats
}