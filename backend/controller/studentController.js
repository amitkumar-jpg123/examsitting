const Student = require("../models/Student");

// ==========================
// Add Student
// ==========================
const addStudent = async (req, res) => {
  try {
    const { roll, name, branch, semester } = req.body;

    if (!roll || !name || !branch || !semester) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingStudent = await Student.findOne({ roll });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Roll Number already exists",
      });
    }

    const student = await Student.create({
      roll,
      name,
      branch,
      semester,
    });

    return res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      student,
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
// Get All Students
// ==========================
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      students,
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
// Update Student
// ==========================
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const { roll, name, branch, semester } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      {
        roll,
        name,
        branch,
        semester,
      },
      {
        new: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      student,
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
// Delete Student
// ==========================
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
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
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};