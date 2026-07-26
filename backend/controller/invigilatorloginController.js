const Invigilator = require("../models/Invigilator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================================
// Register Invigilator
// ======================================

const registerInvigilator = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      department,
      phone,
      password,
    } = req.body;

    if (
      !employeeId ||
      !name ||
      !email ||
      !department ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const employeeExists = await Invigilator.findOne({
      employeeId,
    });

    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists",
      });
    }

    const emailExists = await Invigilator.findOne({
      email,
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const invigilator = await Invigilator.create({
      employeeId,
      name,
      email,
      department,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Invigilator Registered Successfully",

      data: {
        _id: invigilator._id,
        employeeId: invigilator.employeeId,
        name: invigilator.name,
        email: invigilator.email,
        department: invigilator.department,
        phone: invigilator.phone,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Login Invigilator
// ======================================

const loginInvigilator = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and Password are required",
      });
    }

    const invigilator = await Invigilator.findOne({
      employeeId,
    }).select("+password");

    if (!invigilator) {
      return res.status(404).json({
        success: false,
        message: "Invalid Employee ID",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      invigilator.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: invigilator._id,
        role: "invigilator",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",

      token,

      data: {
        _id: invigilator._id,
        employeeId: invigilator.employeeId,
        name: invigilator.name,
        email: invigilator.email,
        department: invigilator.department,
        phone: invigilator.phone,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Invigilator Profile
// ======================================

const getInvigilatorProfile = async (req, res) => {
  try {
    const invigilator = await Invigilator.findById(
      req.params.id
    ).select("-password");

    if (!invigilator) {
      return res.status(404).json({
        success: false,
        message: "Invigilator not found",
      });
    }

    res.status(200).json({
      success: true,
      data: invigilator,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Invigilator Dashboard
// ======================================

const getInvigilatorDashboard = async (req, res) => {
  try {
    const invigilator = await Invigilator.findById(req.params.id);

    if (!invigilator) {
      return res.status(404).json({
        success: false,
        message: "Invigilator not found",
      });
    }

    res.status(200).json({
      success: true,

      data: {
        _id: invigilator._id,
        name: invigilator.name,
        employeeId: invigilator.employeeId,
        department: invigilator.department,

        todayDuty: 1,
        assignedExams: 5,
        upcomingDuties: 3,
        completedDuties: 12,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerInvigilator,
  loginInvigilator,
  getInvigilatorProfile,
  getInvigilatorDashboard,
};