const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const examRoutes = require("./routes/examRoutes");
const invigilatorRoutes = require("./routes/invigilatorRoutes");
const seatingRoutes = require("./routes/seatingRoutes");
const reportRoutes = require("./routes/reportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminProfileRoutes = require("./routes/adminprofileRoutes");
const contactRoutes = require("./routes/contactRoutes");
const invigilatorloginRoutes =require("./routes/invigilatorloginRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

const invigilatorDashboardRoutes = require("./routes/invigilatorDashboardRoutes");
const dutyRoutes =require("./routes/dutyRoutes");




const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Exam Seating Arrangement Backend Running Successfully 🚀",
  });
});

// API Routes
app.use("/api/admin", adminRoutes);
// http://localhost:5000/api/admin/register----> for register
// http://localhost:5000/api/admin/login----->for login

app.use("/api/students", studentRoutes);
app.use("/api/rooms", roomRoutes);

//  http://localhost:5000/api/rooms/add ---->for add room
//  http://localhost:5000/api/rooms ----->for get
app.use("/api/exams", examRoutes);

// http://localhost:5000/api/exams/add ---->for add exam
// http://localhost:5000/api/exams ---->for for get
app.use("/api/invigilators", invigilatorRoutes);

// http://localhost:5000/api/invigilators/add ---->for add Invigilator
// http://localhost:5000/api/invigilators---->for get
// http://localhost:5000/api/invigilators/update/{id}   
// http://localhost:5000/api/invigilators/delete/{id}
// {id}:-get krne se zo id milti h usko paste krna hota hai iski jagah 

app.use("/api/seating", seatingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin-profile",adminProfileRoutes);
// http://localhost:5000/api/contacta
app.use("/api/contact",contactRoutes);

app.use("/api/invigilator",invigilatorloginRoutes);
// http://localhost:5000/api/invigilator/register

app.use("/api/incidents", incidentRoutes);
app.use("/api/invigilator",invigilatorloginRoutes);

// http://localhost:5000/api/duties/INVIGILATOR_ID
app.use(
"/api/duties",
dutyRoutes
);

// POST
// http://localhost:5000/api/duties/create   ------>for duty create 

// {
//     "invigilator":"YOUR_INVIGILATOR_ID",
//     "exam":"YOUR_EXAM_ID",
//     "examName":"B.Tech Mathematics",
//     "subject":"Mathematics",
//     "room":"Room 101",
//     "examDate":"25-07-2026",
//     "examTime":"09:00 AM - 12:00 PM",
//     "totalStudents":60
// }

app.use(
  "/api/invigilator",
  invigilatorDashboardRoutes
);

module.exports = app;


// GET    /api/students
// POST   /api/students/add
// PUT    /api/students/update/:id
// DELETE /api/students/delete/:id
// http://localhost:5000/api/seating/generate
// http://localhost:5000/api/seating

// http://localhost:5000/api/seating/clear   :- postmain me method DELETE use krke ye api chalaye



// http://localhost:5000/api/admin/forgot-password----->mail me otp lene ki lye

// http://localhost:5000/api/admin/verify-otp--->for veryfy otp to mail

// http://localhost:5000/api/admin/reset-password----->for create new password with mail


// http://localhost:5000/api/admin/login----->for user_name with password se login krne ka

// http://localhost:5000/api/admin/check-admin------>for check admin