import apiClient from "./apiClient";

const appointmentService = {
  getDateSlots: () => apiClient.get("/Appointment-Date-Slots"),
  getDateSlotById: (id) => apiClient.get(`/Appointment-Date-Slots/${id}`),

  getSlotBlocks: () => apiClient.get("/Appointment-Slot-Blocks"),
  getTimeSlots: () => apiClient.get("/Appointment-Time-Slots"),

  getCustomAppointments: () => apiClient.get("/Custom-Appointments"),
  getCustomAppointmentById: (id) => apiClient.get(`/Custom-Appointments/${id}`),
  createCustomAppointment: (payload) =>
    apiClient.post("/Custom-Appointments", payload),
  updateCustomAppointment: (payload) =>
    apiClient.put("/Custom-Appointments", payload),
  deleteCustomAppointment: (payload) =>
    apiClient.delete("/Custom-Appointments", { data: payload }),
};

export default appointmentService;
