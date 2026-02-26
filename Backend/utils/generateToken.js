const jwt = require("jsonwebtoken");

const genToken = (userId) => {
  if (!process.env.SECRETKEY) {
    throw new Error("SECRETKEY is not defined in environment variables");
  }

  return jwt.sign(
    { userId },
    process.env.SECRETKEY,
    { expiresIn: "7d" }
  );
};

module.exports = genToken;