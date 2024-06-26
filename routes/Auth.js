const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user
// router.post("/register", async (req, res) => {
//   console.log("Register route hit!");
//   try {
//     const { username, password } = req.body;
//     console.log(username, password);
//     const user = new User({ username, password });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     // res.status(500).json({ error: "Internal Server Error" });
//     console.error("Error during registration:", error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", message: error.message });
//   }
// });

// Register a new user
router.post("/register", async (req, res) => {
  console.log("Register route hit!");
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    const user = new User({ username, password });
    await user.save();

    // Generate a token for the registered user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      message: "User registered successfully",
      userID: user._id,
      token: token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  console.log("Login route hit!");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // console.log(user);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check if a username is already taken
router.get("/check-username", async (req, res) => {
  try {
    const { username } = req.query;

    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });

    // If the username is taken, respond accordingly
    if (existingUser) {
      res.json({ isTaken: true });
    } else {
      res.json({ isTaken: false });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
