const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");
const validateToken = require("../middlewares/validateToken");

// Get all animals

router.get("/", validateToken, async (req, res) => {
  try {
    const animals = await Animal.find();
    console.log("*** Animals Retrieved ***");

    res.json({
      data: animals,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/count", validateToken, async (req, res) => {
  try {
    const totalCount = await Animal.countDocuments();
    res.json({ count: totalCount });
  } catch (err) {
    console.error("Error while counting animals:", err);
    res.status(500).json({ message: "Failed to get total count of animals" });
  }
});

// Get an animal by ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new animal
const { body, validationResult } = require("express-validator");
router.post(
  "/",
  validateToken,
  [
    body("tag").notEmpty().withMessage("Tag is required"),
    body("breed").notEmpty().withMessage("Breed is required"),
    body("dob").isDate().withMessage("DOB must be a valid date"),
    body("dam").notEmpty().withMessage("Dam is required"),
    body("sire").notEmpty().withMessage("Sire is required"),
    body("sex")
      .isIn(["male", "female"])
      .withMessage("Sex must be either male or female"),
    body("color").notEmpty().withMessage("Color is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const animal = new Animal({
      tag: req.body.tag,
      breed: req.body.breed,
      dob: req.body.dob,
      dam: req.body.dam,
      sire: req.body.sire,
      sex: req.body.sex,
      color: req.body.color,
    });

    try {
      const newAnimal = await animal.save();
      res.status(201).json(newAnimal);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Update an animal
router.put("/:id", validateToken, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    animal.tag = req.body.tag || animal.tag;
    animal.breed = req.body.breed || animal.breed;
    animal.dob = req.body.dob || animal.dob;
    animal.dam = req.body.dam || animal.dam;
    animal.sire = req.body.sire || animal.sire;
    animal.sex = req.body.sex || animal.sex;
    animal.color = req.body.color || animal.color;

    const updatedAnimal = await animal.save();
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an animal
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    await Animal.deleteOne({ _id: req.params.id });
    res.json({ message: "Animal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
