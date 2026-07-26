const Student = require("../models/Student");
const Room = require("../models/Room");
const Exam = require("../models/Exam");
const Invigilator = require("../models/Invigilator");
const Seating = require("../models/Seating");

const getReport = async (req, res) => {
  try {

    const totalStudents = await Student.countDocuments();

    const totalRooms = await Room.countDocuments();

    const totalExams = await Exam.countDocuments();

    const totalInvigilators =
      await Invigilator.countDocuments();

    const seating = await Seating.find()
      .populate("student")
      .populate("room")
      .populate("exam")
      .populate("invigilator");

    return res.status(200).json({
      success: true,

      summary: {
        totalStudents,
        totalRooms,
        totalExams,
        totalInvigilators,
      },

      reports: seating,
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
  getReport,
};