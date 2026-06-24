import apiClient from "./apiClient";

const userService = {
  getUsers: () => apiClient.get("/Users"),
  getUser: (id) => apiClient.get(`/Users/${id}`),
  createUser: (payload) => apiClient.post("/Users", payload),
  updateUser: (payload) => apiClient.put("/Users", payload),
  deleteUser: (payload) => apiClient.delete("/Users", { data: payload }),

  getProfile: () => apiClient.get("/Profiles"),
  getProfileById: (id) => apiClient.get(`/Profiles/${id}`),
  createProfile: (payload) => apiClient.post("/Profiles", payload),
  updateProfile: (payload) => apiClient.put("/Profiles", payload),
  deleteProfile: (payload) => apiClient.delete("/Profiles", { data: payload }),

  getAddresses: () => apiClient.get("/Addresses"),
  createAddress: (payload) => apiClient.post("/Addresses", payload),
  updateAddress: (payload) => apiClient.put("/Addresses", payload),
  deleteAddress: (payload) => apiClient.delete("/Addresses", { data: payload }),
};

export default userService;
