const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authMiddleware");
const AiSemen = require("../models/AiSemen");

// Validation middleware for vaccine records

const validateSemen = [
  body("name").isString().withMessage("Must be a valid vaccine name"),
  body("expirydate").isDate().withMessage("Expiry Date must be a valid date"),
  body("barcode").isString().withMessage("Barcode must be a valid string"),
];

// Get all AI Semens list
router.get("/", async (req, res) => {
  try {
    const semens = await AiSemen.find();
    res.json(semens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a ai semen to the database
router.post("/", validateSemen, authenticateJWT, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newAiSemen = new AiSemen({
      name: req.body.name,
      expirydate: req.body.expirydate,
      barcode: req.body.barcode,
      createdBy: req.user._id,
    });

    const savedAiSemen = await newAiSemen.save();
    res.status(201).json(savedAiSemen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", validateSemen, authenticateJWT, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const aiSemen = await AiSemen.findById(req.params.id);
    if (!aiSemen) {
      return res.status(404).json({ message: "AiSemen not found" });
    }

    // Update the fields
    aiSemen.name = req.body.name || aiSemen.name;
    aiSemen.expirydate = req.body.expirydate || aiSemen.expirydate;
    aiSemen.barcode = req.body.barcode || aiSemen.barcode;
    aiSemen.updatedBy = req.user._id; // Set the updatedBy field with the user ID

    const updatedAiSemen = await aiSemen.save();
    res.json(updatedAiSemen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete an AiSemen record by its ID
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const aiSemen = await AiSemen.findById(req.params.id);
    if (!aiSemen) {
      return res.status(404).json({ message: "AiSemen not found" });
    }

    await AiSemen.deleteOne({ _id: req.params.id });
    res.json({ message: "AiSemen deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
