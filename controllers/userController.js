const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@dec Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { Username, email, password } = req.body;
  if (!Username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  // creating the hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    Username,
    email,
    password: hashedPassword,
  });
  console.log(`User Created ${user}`);
  res.status(200).json({ message: "user is registered" });
});

//@desc login user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login user" });
});

//@desc current user
//@route GET /api/users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
