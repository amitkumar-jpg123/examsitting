const express = require("express");

const router = express.Router();

const {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controller/studentController");

// ============================
// Student Routes
// ============================

// Add Student
router.post("/add", addStudent);

// Get All Students
router.get("/", getStudents);

// Update Student
router.put("/update/:id", updateStudent);

// Delete Student
router.delete("/delete/:id", deleteStudent);

module.exports = router;