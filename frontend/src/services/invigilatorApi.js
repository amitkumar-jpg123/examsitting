import API from "./axiosInstance";


// =====================================
// Admin - Get All Invigilators
// =====================================

export const getInvigilators = () =>
  API.get("/invigilators/");




// =====================================
// Admin - Add Invigilator
// =====================================

export const addInvigilator = (data) =>
  API.post(
    "/invigilators/add",
    data,
    {
      notificationMessage:
        "👨‍🏫 New Invigilator Added Successfully",
    }
  );




// =====================================
// Admin - Update Invigilator
// =====================================

export const updateInvigilator = (id, data) =>
  API.put(
    `/invigilators/update/${id}`,
    data,
    {
      notificationMessage:
        "✏️ Invigilator Updated Successfully",
    }
  );




// =====================================
// Admin - Delete Invigilator
// =====================================

export const deleteInvigilator = (id) =>
  API.delete(
    `/invigilators/delete/${id}`,
    {
      notificationMessage:
        "🗑 Invigilator Deleted Successfully",
    }
  );





// =====================================
// Invigilator Login
// =====================================

export const invigilatorLogin = (data) =>
  API.post(
    "/invigilator/login",
    data,
    {
      notificationMessage:
        "✅ Login Successful",
    }
  );





// =====================================
// Invigilator Profile
// =====================================

export const getInvigilatorProfile = (id) =>
  API.get(
    `/invigilator/profile/${id}`
  );





// =====================================
// Invigilator Dashboard
// =====================================

export const getInvigilatorDashboard = (id) =>
  API.get(
    `/invigilator/dashboard/${id}`
  );





// =====================================
// Invigilator My Duties
// =====================================

export const getMyDuties = (id) =>
  API.get(
    `/invigilator/duties/${id}`
  );





// =====================================
// Invigilator Attendance
// =====================================

export const getAttendance = (id) =>
  API.get(
    `/invigilator/attendance/${id}`
  );





// =====================================
// Invigilator Students
// =====================================

export const getInvigilatorStudents = (id) =>
  API.get(
    `/invigilator/students/${id}`
  );





// =====================================
// Submit Incident Report
// =====================================

export const submitIncident = (data) =>
  API.post(
    "/incidents/create",
    data,
    {
      notificationMessage:
        "🚨 Incident Report Submitted Successfully",
    }
  );





// =====================================
// Get Invigilator Incidents
// =====================================

export const getInvigilatorIncidents = (id) =>
  API.get(
    `/incidents/invigilator/${id}`
  );