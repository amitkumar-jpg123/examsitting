import API from "./axiosInstance";

// Get All Rooms
export const getRooms = () => API.get("/rooms/");

// Add Room
export const addRoom = (data) =>
  API.post("/rooms/add", data, {
    notificationMessage: "🏫 New Room Added Successfully",
  });

// Update Room
export const updateRoom = (id, data) =>
  API.put(`/rooms/update/${id}`, data, {
    notificationMessage: "✏️ Room Updated Successfully",
  });

// Delete Room
export const deleteRoom = (id) =>
  API.delete(`/rooms/delete/${id}`, {
    notificationMessage: "🗑 Room Deleted Successfully",
  });