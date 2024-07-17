// validateToken.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secretOrKey } = require("../config/keys");

const validateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("No Authorization header");
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Received token:", token);
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretOrKey);
    console.log("Decoded token:", decoded);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      console.log("Token expired");
      return res.status(401).json({ message: "Unauthorized, token expired" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token validation failed:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = validateToken;
