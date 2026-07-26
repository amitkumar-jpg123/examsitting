import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/dashboard",
});

// Get Dashboard
export const getDashboard = () => API.get("/");