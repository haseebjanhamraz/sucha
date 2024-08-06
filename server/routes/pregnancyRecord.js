const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");
const AiSemen = require("../models/AiSemen");
const PregnancyRecord = require("../models/PregnancyRecord");

const validateToken = require("../middlewares/validateToken");

router.post("/:animalId", validateToken, async (req, res) => {
  const { animalId } = req.params;
  const { semenId, date } = req.body; // Assuming semenId and optional date are sent in the request body

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

    animal.pregnant = true;
    animal.pregnancyCount = (animal.pregnancyCount || 0) + 1;

    await animal.save();

    const pregnancyStartDate = date ? new Date(date) : new Date();

    // Create a new pregnancy record
    const pregnancyRecord = new PregnancyRecord({
      animalId: animal._id,
      date: pregnancyStartDate,
      semen: semen._id,
      pregnancyStartDate: pregnancyStartDate,
    });

    await pregnancyRecord.save();

    res.status(200).json({
      message: "AI Semen injected successfully and pregnancy status updated",
      animal,
      pregnancyRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", validateToken, async (req, res) => {
  try {
    const pregnancyRecords = await PregnancyRecord.find().exec();
    res.status(200).json(pregnancyRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:animalId", validateToken, async (req, res) => {
  try {
    const { animalId } = req.params;
    const pregnancyRecords = await PregnancyRecord.find({ animalId: animalId });
    if (!pregnancyRecords) {
      return res.status(404).json({ message: "Pregnancy record not found" });
    }
    res.status(200).json(pregnancyRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
