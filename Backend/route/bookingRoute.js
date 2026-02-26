const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controller/bookingController");
const isAuth = require("../middleware/auth");

router.post("/create", isAuth, createBooking);
router.get("/my", isAuth, getMyBookings);
router.put("/cancel/:id", isAuth, cancelBooking);

module.exports = router;