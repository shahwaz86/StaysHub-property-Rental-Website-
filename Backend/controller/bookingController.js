const Booking = require("../models/bookingModel");
const Listing = require("../models/listingModel");

/**
 * CREATE BOOKING
 */
const createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate } = req.body;

    if (!listingId || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const days =
      (new Date(endDate) - new Date(startDate)) /
      (1000 * 60 * 60 * 24);

    if (days <= 0) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const totalPrice = days * listing.price;

    const booking = await Booking.create({
      user: req.user._id,
      listing: listingId,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET USER BOOKINGS
 */
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * CANCEL BOOKING
 */
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "cancelled";
    await booking.save(); 

    res.json({
      success: true,
      booking, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};