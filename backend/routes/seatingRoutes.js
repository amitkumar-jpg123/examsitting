const express = require("express");
const router = express.Router();

const {
  generateSeating,
  getSeating,
  clearSeating,
} = require("../controller/seatingController");

// Generate Seating
router.post("/generate", generateSeating);

// View Seating
router.get("/", getSeating);

// Clear Seating
router.delete("/clear", clearSeating);

module.exports = router;