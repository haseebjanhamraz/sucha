const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");
const passport = require("passport");
const { authenticateJWT } = require("../middlewares/authMiddleware");

// Get all animals

router.get("/", authenticateJWT, async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default page 1
  const perPage = parseInt(req.query.perPage) || 10; // Default 10 animals per page

  try {
    const totalAnimals = await Animal.countDocuments();
    const animals = await Animal.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    console.log("*** Animals Retrieved ***");

    res.json({
      data: animals,
      totalPages: Math.ceil(totalAnimals / perPage),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an animal by ID
router.get("/:id", authenticateJWT, async (req, res) => {
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
  authenticateJWT,
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
router.put("/:id", authenticateJWT, async (req, res) => {
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
router.delete("/:id", authenticateJWT, async (req, res) => {
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
