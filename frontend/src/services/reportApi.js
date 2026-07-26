import axios from "axios";

const API = axios.create({
  baseURL: "https://examsitting.onrender.com/api/reports",
});

// Get Report
export const getReport = () => API.get("/");