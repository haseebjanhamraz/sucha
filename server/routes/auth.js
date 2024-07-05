const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Blacklist = require("../models/Blacklist");
const router = express.Router();
const { secretOrKey } = require("../config/keys");
const validateToken = require("../middlewares/validateToken");

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to handle login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, secretOrKey, { expiresIn: "1h" });

    res.json({ message: "Login successful", token: token });
    console.log("A User Logged In 🟢 ");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/validate-token", validateToken, (req, res) => {
  res.json({ user: req.user });
});

// POST route to handle logout and invalidate token
router.post("/logout", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Token is required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Check if token exists in blacklist
    const tokenExists = await Blacklist.findOne({ token });
    if (tokenExists) {
      return res.status(400).json({ message: "Token already invalidated" });
    }
    console.log("A User Logged out 🔴 ");
    // Extract expiration date from token (optional)
    const decodedToken = jwt.decode(token);
    const expiresAt = new Date(decodedToken.exp * 1000); // Convert seconds to milliseconds

    // Add token to blacklist with expiration date (optional)
    const blacklistToken = new Blacklist({
      token,
      expiresAt: expiresAt,
    });
    await blacklistToken.save();
    res.json({ message: "Token invalidated successfully" });
  } catch (err) {
    console.error("Error while blacklisting token:", err);
    res.status(500).json({ message: "Failed to invalidate token" });
  }
});

module.exports = router;
