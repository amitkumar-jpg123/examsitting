const express = require("express");

const router = express.Router();

const {
  createIncident,
  getAllIncidents,
  updateIncidentStatus,
  deleteIncident,
} = require("../controller/incidentController");


// ===============================
// Create Incident
// ===============================
router.post("/", createIncident);


// ===============================
// Get All Incidents
// ===============================
router.get("/", getAllIncidents);


// ===============================
// Update Status
// ===============================
router.put("/:id", updateIncidentStatus);


// ===============================
// Delete Incident
// ===============================
router.delete("/:id", deleteIncident);


module.exports = router;