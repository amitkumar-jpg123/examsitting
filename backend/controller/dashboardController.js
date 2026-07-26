const Student = require("../models/Student");
const Room = require("../models/Room");
const Exam = require("../models/Exam");
const Invigilator = require("../models/Invigilator");
const Seating = require("../models/Seating");
const Admin = require("../models/Admin");

const getDashboard = async (req, res) => {

  try {

    const totalStudents = await Student.countDocuments();

    const totalRooms = await Room.countDocuments();

    const totalExams = await Exam.countDocuments();

    const totalInvigilators = await Invigilator.countDocuments();

    const totalSeating = await Seating.countDocuments();

    const totalAdmins = await Admin.countDocuments();

    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentExams = await Exam.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({

      success: true,

      dashboard: {

        totalStudents,

        totalRooms,

        totalExams,

        totalInvigilators,

        totalSeating,

        totalAdmins,

      },

      recentStudents,

      recentExams,

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

  getDashboard,

};