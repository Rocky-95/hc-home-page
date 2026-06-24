import apiClient from "./apiClient";

const contentService = {
  // FAQs
  getFaqs: () => apiClient.get("/FAQs"),
  getFaqById: (id) => apiClient.get(`/FAQs/${id}`),

  // Legal pages
  getLegalPageHeaders: () => apiClient.get("/Legal-Page-Headers"),
  getLegalPageHeaderById: (id) => apiClient.get(`/Legal-Page-Headers/${id}`),
  getLegalPageSections: () => apiClient.get("/Legal-Page-Sections"),
  getLegalPageSectionById: (id) => apiClient.get(`/Legal-Page-Sections/${id}`),

  // Settings
  getSettings: () => apiClient.get("/Settings"),

  // Support contacts
  getSupportContacts: () => apiClient.get("/Support-Contacts"),

  // Newsletter
  subscribeNewsletter: (payload) =>
    apiClient.post("/Newsletter-Subscriptions", payload),

  // Mail
  sendMail: (payload) => apiClient.post("/Mail/Send-Mail", payload),
  sendOtpEmail: (payload) => apiClient.post("/Mail/Send-OTP-Email", payload),
};

export default contentService;
