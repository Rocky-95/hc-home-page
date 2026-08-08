import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://dev.dine360.ca/backend/API/Harry-Clinton-DEV";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Attach JWT token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("hc_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response handler for common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("hc_token");
      localStorage.removeItem("hc_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
