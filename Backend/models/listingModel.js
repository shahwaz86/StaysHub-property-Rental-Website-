const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

  city:{
      type: String,
      required: true,
  },
  country:{
      type: String,
      required: true,
  },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        url: String,
        
      },
    ],

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    maxGuests: {
      type: Number,
      default: 1,
    },


    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;