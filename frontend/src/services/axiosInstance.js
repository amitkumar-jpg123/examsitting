import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://examsitting.onrender.com/api",
});

axiosInstance.interceptors.response.use(
  (response) => {
    const notificationMessage =
      response.config?.notificationMessage;

    if (
      notificationMessage &&
      typeof window.addNotification === "function"
    ) {
      window.addNotification(notificationMessage);
    }

    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;