const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please fill all required fields");
  };
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  };
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });
  const token = generateToken(user._id);
  
  res.cookie("token", token, {
  httpOnly: true,
  secure: true,          
  sameSite: "none",      
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  res.status(201).json({
    id: user._id,
    name,
    email,
    token,
    role,
    message: "User registered successfully",
  });


});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password , role} = req.body;
  const existsUser = await User.findOne({ email });
  if(!existsUser){
    res.status(400);
    throw new Error("user not found with ths email");
  };
  const isPasswordCorrect = await bcrypt.compare(password, existsUser.password);
  if(!isPasswordCorrect){
    res.status(400);
    throw new Error("Invalid credentials");
  };
  if (existsUser.role !== role) {
  res.status(403);
  throw new Error("Role mismatch");
}

  const token = generateToken(existsUser._id);

 res.cookie("token", token, {
  httpOnly: true,
  secure: true,          
  sameSite: "none",      
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
  res.status(200).json({
    _id: existsUser._id,
    name: existsUser.name,
    email: existsUser.email,
    role: existsUser.role,
    token,
    
    message: "Login successful",
  });
});

// logout user
const logoutUser = asyncHandler( (req, res) => {
  try{
    res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
  res.status(200).json({ message: "Logout successful" });
  }
  catch(error){
    res.status(500);
    throw new Error("Logout failed");
  };
});

module.exports = { registerUser, loginUser, logoutUser };