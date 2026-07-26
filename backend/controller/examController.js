const Exam = require("../models/Exam");

// ==========================
// Add Exam
// ==========================
const addExam = async (req, res) => {
  try {
    const {
      subject,
      subjectCode,
      semester,
      examDate,
      examTime,
    } = req.body;

    if (
      !subject ||
      !subjectCode ||
      !semester ||
      !examDate ||
      !examTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const exam = await Exam.create({
      subject,
      subjectCode,
      semester,
      examDate,
      examTime,
    });

    return res.status(201).json({
      success: true,
      message: "Exam Added Successfully",
      exam,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get All Exams
// ==========================
const getExams = async (req, res) => {
  try {

    const exams = await Exam.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      exams,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Update Exam
// ==========================
const updateExam = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      subject,
      subjectCode,
      semester,
      examDate,
      examTime,
    } = req.body;

    const exam = await Exam.findByIdAndUpdate(
      id,
      {
        subject,
        subjectCode,
        semester,
        examDate,
        examTime,
      },
      {
        new: true,
      }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exam Updated Successfully",
      exam,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Delete Exam
// ==========================
const deleteExam = async (req, res) => {
  try {

    const { id } = req.params;

    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exam Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addExam,
  getExams,
  updateExam,
  deleteExam,
};