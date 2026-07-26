const Student = require("../models/Student");
const Room = require("../models/Room");
const Exam = require("../models/Exam");
const Seating = require("../models/Seating");
const Invigilator = require("../models/Invigilator");

// ==========================
// Generate Seating
// ==========================
const generateSeating = async (req, res) => {
  try {
    // Delete old seating
    await Seating.deleteMany();

    // Get Selected IDs from Frontend
    const { examId, roomId, invigilatorId } = req.body;

    // Fetch Data
    const students = await Student.find().sort({ roll: 1 });

    const exam = await Exam.findById(examId);
    const room = await Room.findById(roomId);
    const invigilator = await Invigilator.findById(invigilatorId);

    if (!exam || !room || !invigilator) {
      return res.status(404).json({
        success: false,
        message: "Invalid Selection",
      });
    }

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Students Found",
      });
    }

    let studentIndex = 0;

    // Generate Seating
    for (let seat = 1; seat <= room.capacity; seat++) {
      if (studentIndex >= students.length) {
        break;
      }

      await Seating.create({
        student: students[studentIndex]._id,
        room: room._id,
        exam: exam._id,
        invigilator: invigilator._id,
        seatNumber: seat,
      });

      studentIndex++;
    }

    return res.status(201).json({
      success: true,
      message: "Seating Generated Successfully",
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
// Get All Seating
// ==========================
const getSeating = async (req, res) => {
  try {
    const seating = await Seating.find()
      .populate("student")
      .populate("room")
      .populate("exam")
      .populate("invigilator")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      seating,
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
// Delete All Seating
// ==========================
const clearSeating = async (req, res) => {
  try {
    await Seating.deleteMany();

    return res.status(200).json({
      success: true,
      message: "All Seating Deleted Successfully",
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
  generateSeating,
  getSeating,
  clearSeating,
};