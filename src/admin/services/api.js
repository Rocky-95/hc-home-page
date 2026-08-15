import axios from "axios";

// This is the admin panel's own axios instance, separate from the storefront's
// src/services/apiClient.js. The two must stay separate: admin GET requests need
// to include inactive/hidden records by default (so a record doesn't vanish from
// the admin panel just because someone toggled it off), while the storefront must
// keep filtering to isactive-only — the two clients would otherwise fight over
// what "default" means for the same shared instance.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://dev.dine360.ca/backend/API/Harry-Clinton-DEV",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Most list endpoints default to isactive-only (isactive = 1) unless told
  // otherwise via ?includeInactive=1. The admin panel manages records regardless
  // of their active state, so every GET defaults to including inactive rows —
  // a caller that explicitly sets includeInactive in its own params still wins.
  if ((config.method || "get").toLowerCase() === "get") {
    config.params = { includeInactive: 1, ...(config.params || {}) };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      const alreadyOnLogin = typeof window !== "undefined" && window.location.pathname === "/login";
      localStorage.removeItem("hc_token");
      localStorage.removeItem("hc_user");
      if (!alreadyOnLogin && typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
