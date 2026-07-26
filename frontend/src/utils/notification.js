// Add Notification

export const addNotification = (message) => {

  const oldNotifications =
    JSON.parse(
      localStorage.getItem("notifications")
    ) || [];


  const newNotification = {

    id: Date.now(),

    message: message,

    time: new Date().toLocaleString()

  };


  const updatedNotifications = [

    newNotification,

    ...oldNotifications

  ];


  localStorage.setItem(
    "notifications",
    JSON.stringify(updatedNotifications)
  );

};




// Get Notifications

export const getNotifications = () => {

  return (
    JSON.parse(
      localStorage.getItem("notifications")
    ) || []
  );

};




// Clear Notifications

export const clearNotifications = () => {

  localStorage.removeItem(
    "notifications"
  );

};