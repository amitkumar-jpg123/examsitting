import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/reports",
});

// Get Report
export const getReport = () => API.get("/");