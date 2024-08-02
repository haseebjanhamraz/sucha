const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const VaccineRecord = require("../models/VaccineRecord");
const Animal = require("../models/Animal");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const validateToken = require("../middlewares/validateToken");

// Validation middleware for vaccine records

const validateVaccineRecord = [
  body("animalId")
    .isMongoId()
    .withMessage("Animal ID must be a valid Mongo ID"),
  body("date").isDate().withMessage("Date must be a valid date"),
  body("vaccine").isString().withMessage("Vaccine must be a valid string"),
];

// Add a vaccine record to an animal
router.post("/", validateVaccineRecord, validateToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const animal = await Animal.findById(req.body.animalId);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    const newVaccineRecord = new VaccineRecord({
      animalId: req.body.animalId,
      date: req.body.date,
      vaccine: req.body.vaccine,
    });

    const savedVaccineRecord = await newVaccineRecord.save();
    res.status(201).json(savedVaccineRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all vaccine records for a specific animal
router.get("/", validateToken, async (req, res) => {
  try {
    const vaccineRecords = await VaccineRecord.find();
    res.json(vaccineRecords);
    console.log(`Vaccines Retrieved ${vaccineRecords}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific Animal Records
router.get("/:id", validateToken, async (req, res) => {
  try {
    const vaccineRecords = await VaccineRecord.find({
      animalId: req.params.id,
    });
    if (!vaccineRecords) {
      return res.status(404).json({ message: "Vaccine records not found" });
    }
    res.json(vaccineRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
