import apiClient from "./apiClient";

const authService = {
  register: (payload) => apiClient.post("/Auth/Register", payload),
  passwordLogin: (payload) => apiClient.post("/Auth/Password-Login", payload),
  otpLogin: (payload) => apiClient.post("/Auth/OTP-Login", payload),
  verifyLoginOtp: (payload) => apiClient.post("/Auth/OTP-Login", { ...payload, verify: true }),
  resetPassword: (payload) => apiClient.post("/Auth/Reset-Password", payload),
  forgotPassword: (payload) => apiClient.post("/Auth/Forgot-Password", payload),
  forgotPasswordConfirm: (payload) =>
    apiClient.post("/Auth/Forgot-Password-Confirm", payload),
  uploadFile: (formData) =>
    apiClient.post("/FileUpload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default authService;
