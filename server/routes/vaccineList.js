const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authMiddleware");
const VaccinesList = require("../models/VaccinesList");
const validateToken = require("../middlewares/validateToken");

// Add a vaccine to the database
router.post(
  "/",
  validateToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("expirydate").notEmpty().withMessage("Expiry date is required"),
    body("barcode").notEmpty().withMessage("Barcode is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newVaccine = new VaccinesList({
        name: req.body.name,
        expirydate: req.body.expirydate,
        barcode: req.body.barcode,
      });

      const savedVaccine = await newVaccine.save();
      res.status(201).json(savedVaccine);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Route to fetch all vaccines
router.get("/", validateToken, async (req, res) => {
  try {
    const vaccines = await VaccinesList.find();
    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update a vaccine record by ID
router.put("/:id", validateToken, async (req, res) => {
  try {
    const vaccine = await VaccinesList.findById(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    // Update fields based on request body
    vaccine.name = req.body.name || vaccine.name;
    vaccine.expirydate = req.body.expirydate || vaccine.expirydate;
    vaccine.barcode = req.body.barcode || vaccine.barcode;

    const updatedVaccine = await vaccine.save();
    res.json(updatedVaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/:id", validateToken, async (req, res) => {
  try {
    const vaccine = await VaccinesList.findById(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }
    res.json(vaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a vaccine record by ID
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const vaccine = await VaccinesList.findById(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: "Vaccine not found" });
    }

    await vaccine.deleteOne(); // Use deleteOne() method

    res.json({ message: "Vaccine deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
