const express = require("express");
const router = express.Router();

const {
  addInvigilator,
  getInvigilators,
  updateInvigilator,
  deleteInvigilator,
} = require("../controller/invigilatorController");

// Add
router.post("/add", addInvigilator);

// Get All
router.get("/", getInvigilators);

// Update
router.put("/update/:id", updateInvigilator);

// Delete
router.delete("/delete/:id", deleteInvigilator);

module.exports = router;