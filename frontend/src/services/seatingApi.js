import API from "./axiosInstance";

// Get Seating
export const getSeating = () =>
  API.get("/seating/");

// Generate Seating
export const generateSeating = (data) =>
  API.post("/seating/generate", data, {
    notificationMessage:
      "🪑 Seating Arrangement Generated Successfully",
  });

// Clear Seating
export const clearSeating = () =>
  API.delete("/seating/clear", {
    notificationMessage:
      "🗑 Seating Arrangement Cleared Successfully",
  });