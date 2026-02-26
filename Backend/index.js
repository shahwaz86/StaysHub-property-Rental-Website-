const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const userRoute = require("./route/userRoute");
const listingRoute = require("./route/listingRoute");
const bookingRoute = require("./route/bookingRoute");





connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "https://stays-hub-property-rental-website.vercel.app",
  credentials: true,
}));




app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);
app.use("/api/booking", bookingRoute);





app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);
  res.status(res.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});


module.exports = app;