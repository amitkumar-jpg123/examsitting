import axios from "axios";

const API = axios.create({
  baseURL: "https://examsitting.onrender.com/api/dashboard",
});

// Get Dashboard
export const getDashboard = () => API.get("/");