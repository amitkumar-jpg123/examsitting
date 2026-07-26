import API from "./axiosInstance";

// Get All Students
export const getStudents = () => API.get("/students/");

// Add Student
export const addStudent = (data) =>
  API.post("/students/add", data, {
    notificationMessage: "👨‍🎓 New Student Added Successfully",
  });

// Update Student
export const updateStudent = (id, data) =>
  API.put(`/students/update/${id}`, data, {
    notificationMessage: "✏️ Student Updated Successfully",
  });

// Delete Student
export const deleteStudent = (id) =>
  API.delete(`/students/delete/${id}`, {
    notificationMessage: "🗑 Student Deleted Successfully",
  });