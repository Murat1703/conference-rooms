import { Router } from "express";
import * as bookingController from "../controllers/booking.controller.js";
import multer from 'multer'

const router = Router();
const upload = multer();
// GET /api/bookings
router.get("/", bookingController.getBooking);
router.get("/availibility", bookingController.getBookingByDate);

router.get("/hall", bookingController.getBookingWithHallName);

// GET /api/bookings/:id
router.get("/:id", bookingController.getBookingById);

// post /api/halls
router.post("/", upload.none(), bookingController.createBooking);
// delete /api/halls

router.delete("/:id", bookingController.deleteBooking);

export default router;