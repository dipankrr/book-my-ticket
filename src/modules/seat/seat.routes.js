import { Router } from "express";
import * as controller from "../seat/seat.controllers.js";
import { authenticate } from "../auth/auth.middleware.js";


const router = Router();



router.get("/:showId/seats", controller.getSeats);
router.post("/lockseats", authenticate, controller.lockSeats);



export default router
