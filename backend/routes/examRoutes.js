const express = require("express");
const router = express.Router();

const {
  addExam,
  getExams,
  updateExam,
  deleteExam,
} = require("../controller/examController");

// Add Exam
router.post("/add", addExam);

// Get All Exams
router.get("/", getExams);

// Update Exam
router.put("/update/:id", updateExam);

// Delete Exam
router.delete("/delete/:id", deleteExam);

module.exports = router;