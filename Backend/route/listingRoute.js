const express = require("express");
const router = express.Router();

const {
  createListing,
  getAllListings,
  getListingById,
  deleteListing,
} = require("../controller/listingController");

const upload = require("../middleware/multer");
const isAuth = require("../middleware/auth");

// public
router.get("/get-all", getAllListings);
router.get("/get/:id", getListingById);

// private (host)
router.post("/create", isAuth, upload.single("image"), createListing);
router.delete("/delete/:id", isAuth, deleteListing);

module.exports = router;