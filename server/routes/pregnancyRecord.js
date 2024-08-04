const express = require("express");
const { body, validationResult } = require("express-validator");
const MilkRecord = require("../models/MilkRecord");
const Animal = require("../models/Animal");
const AiSemen = require("../models/AiSemen");
const router = express.Router();

const validateToken = require("../middlewares/validateToken");

router.post("/:animalId", validateToken, async (req, res) => {
  const { animalId } = req.params;
  const { semenId } = req.body; // Assuming semenId is sent in the request body
  const { date } = req.body;

  try {
    // Find the animal by ID
    const animal = await Animal.findById(animalId);

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    // Check if the animal is female
    if (animal.sex !== "female") {
      return res.status(400).json({
        message:
          "Cattle is not female, AI Semen can only be injected to female cows",
      });
    }
    // Find the AI semen by ID
    const semen = await AiSemen.findById(semenId);

    if (!semen) {
      return res.status(404).json({ message: "AI Semen not found" });
    }

    let pregnancyCount = 1;

    // Update the animal's pregnancy status and start date
    animal.pregnant = true;
    animal.pregnancyStartDate = date ? date : new Date();
    animal.pregnancyCount = (animal.pregnancyCount || 0) + 1;
    await animal.save();

    res.status(200).json({
      message: "AI Semen injected successfully and pregnancy status updated",
      animal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
