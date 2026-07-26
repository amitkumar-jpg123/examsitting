const express = require("express");

const upload = require("../middleware/multer");

const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdmin,
  changePassword,
  uploadProfileImage,
  checkAdminExists,
  forgotPassword,
  verifyOTP,
  resetPassword,

  // Admin CRUD
  getAllAdmins,
  addAdmin,
  updateAdminById,
  deleteAdminById,

} = require("../controller/adminController");

// ==========================
// Authentication
// ==========================

// Register
router.post("/register", registerAdmin);

// Login
router.post("/login", loginAdmin);

// Check First Admin
router.get("/check-admin", checkAdminExists);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Reset Password
router.put("/reset-password", resetPassword);

// ==========================
// Profile
// ==========================

// Get Profile
router.get("/profile/:id", getAdminProfile);

// Update Profile
router.put("/update/:id", updateAdmin);

// Change Password
router.put("/change-password/:id", changePassword);

// Upload Profile Image
router.put(
  "/upload-image/:id",
  upload.single("profileImage"),
  uploadProfileImage
);

// ==========================
// Admin CRUD
// ==========================

// Get All Admins
router.get("/all", getAllAdmins);

// Add Admin
router.post("/add", addAdmin);

// Update Admin
router.put("/update-admin/:id", updateAdminById);

// Delete Admin
router.delete("/delete/:id", deleteAdminById);

module.exports = router;