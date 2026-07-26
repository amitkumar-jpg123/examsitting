import axios from "axios";

const API = axios.create({
  baseURL: "https://examsitting.onrender.com/api/admin",
});

// Get All Admins
export const getAdmins = () =>
  API.get("/all");

// Add Admin
export const addAdmin = (data) =>
  API.post("/add", data);

// Update Admin
export const updateAdmin = (id, data) =>
  API.put(`/update-admin/${id}`, data);

// Delete Admin
export const deleteAdmin = (id) =>
  API.delete(`/delete/${id}`);