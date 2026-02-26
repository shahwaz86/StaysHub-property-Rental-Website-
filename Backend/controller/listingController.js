const Listing = require("../models/listingModel");
const uploadToCloudinary = require("../cloudinary/cloudinary");

/**
 * CREATE LISTING (with image upload)
 */
const createListing = async (req, res) => {
  try {
    const { title, description, city, country, price, maxGuests=1 } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // upload image to cloudinary
    const imageUrl = await uploadToCloudinary(req.file.path);

    const listing = await Listing.create({
      title,
      description,
      city,
      country,
      maxGuests,
      price,
      images: [{ url: imageUrl }],
      host: req.user._id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL LISTINGS
 */
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SINGLE LISTING
 */
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "host",
      "name email"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE LISTING (only host)
 */
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createListing,
  getAllListings,
  getListingById,
  deleteListing,
};