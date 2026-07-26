import API from "./axiosInstance";

// Get All Exams
export const getExams = () => API.get("/exams/");

// Add Exam
export const addExam = (data) =>
  API.post("/exams/add", data, {
    notificationMessage: "📅 New Exam Scheduled Successfully",
  });

// Update Exam
export const updateExam = (id, data) =>
  API.put(`/exams/update/${id}`, data, {
    notificationMessage: "✏️ Exam Updated Successfully",
  });

// Delete Exam
export const deleteExam = (id) =>
  API.delete(`/exams/delete/${id}`, {
    notificationMessage: "🗑 Exam Deleted Successfully",
  });