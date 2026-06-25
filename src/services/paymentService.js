import apiClient from "./apiClient";

export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout script"));
    document.body.appendChild(script);
  });
};

const paymentService = {
  getPayments: () => apiClient.get("/Payments"),
  createPayment: (payload) => apiClient.post("/Payments", payload),
  updatePayment: (payload) => apiClient.put("/Payments", payload),

  // Backend must expose these endpoints
  createRazorpayOrder: (payload) => apiClient.post("/Payments/Create-Razorpay-Order", payload),
  verifyRazorpayPayment: (payload) => apiClient.post("/Payments/Verify", payload),
};

export default paymentService;
