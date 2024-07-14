const express = require("express");
const { body, validationResult } = require("express-validator");
const MilkRecord = require("../models/MilkRecord");
const Animal = require("../models/Animal");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authMiddleware");
const validateToken = require("../middlewares/validateToken");

// Add a milk record (protected route)
router.post(
  "/",
  validateToken,
  [
    body("animalId")
      .isMongoId()
      .withMessage("Animal ID must be a valid Mongo ID"),
    body("date").isDate().withMessage("Date must be a valid date"),
    body("time")
      .isIn(["morning", "afternoon", "evening"])
      .withMessage("Time must be morning, afternoon, or evening"),
    body("quantity")
      .isFloat({ min: 0 })
      .withMessage("Quantity must be a positive number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const animal = await Animal.findById(req.body.animalId);
      if (!animal) return res.status(404).json({ message: "Animal not found" });

      const newMilkRecord = new MilkRecord({
        animalId: req.body.animalId,
        date: req.body.date,
        time: req.body.time,
        quantity: req.body.quantity,
      });

      const savedMilkRecord = await newMilkRecord.save();
      res.status(201).json(savedMilkRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.get("/", validateToken, async (req, res) => {
  try {
    const milkRecords = await MilkRecord.find();

    if (!milkRecords) {
      return res.status(404).json({ message: "No milk records found" });
    }

    res.status(200).json(milkRecords);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:animalId", validateToken, async (req, res) => {
  try {
    const animalId = req.params.animalId;
    const milkRecords = await MilkRecord.find({ animalId });

    if (!milkRecords) {
      return res
        .status(404)
        .json({ message: "No milk records found for this animal" });
    }

    res.status(200).json(milkRecords);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
