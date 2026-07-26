import API from "./axiosInstance";


// Submit Incident

export const createIncident = (data) => {

  return API.post(
    "/incidents",
    data
  );

};



// Get All Incidents (Admin)

export const getIncidents = () => {

  return API.get(
    "/incidents"
  );

};



// Update Status

export const updateIncidentStatus = (
  id,
  status
) => {

  return API.put(
    `/incidents/${id}`,
    {
      status
    }
  );

};



// Delete Incident

export const deleteIncident = (id) => {

  return API.delete(
    `/incidents/${id}`
  );

};