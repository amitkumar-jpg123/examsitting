import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ==========================
// Admin Login
// ==========================

export const adminLogin = (data) =>
  API.post("/admin/login", data);

// ==========================
// Admin Register
// ==========================

export const adminRegister = (data) =>
  API.post("/admin/register", data);

// ==========================
// Check Admin Exists
// ==========================

export const checkAdminExists = () =>
  API.get("/admin/check-admin");

// ==========================
// Forgot Password
// ==========================

export const forgotPassword = (data) =>
  API.post("/admin/forgot-password", data);

// ==========================
// Verify OTP
// ==========================

export const verifyOTP = (data) =>
  API.post("/admin/verify-otp", data);

// ==========================
// Reset Password
// ==========================

export const resetPassword = (data) =>
  API.put("/admin/reset-password", data);

// ==========================
// Get Admin Profile
// ==========================

export const getAdminProfile = (id) =>
  API.get(`/admin-profile/profile/${id}`);

// ==========================
// Update Admin Profile
// ==========================

export const updateAdmin = (id, data) =>
  API.put(`/admin-profile/update/${id}`, data);

// ==========================
// Change Password
// ==========================

export const changePassword = (id, data) =>
  API.put(`/admin/change-password/${id}`, data);

// ==========================
// Upload Profile Image
// ==========================

export const uploadProfileImage = (id, formData) =>
  API.put(`/admin/upload-image/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });