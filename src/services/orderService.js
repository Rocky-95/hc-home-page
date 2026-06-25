import apiClient from "./apiClient";

const orderService = {
  getOrders: () => apiClient.get("/Orders"),
  getOrderById: (id) => apiClient.get(`/Orders/${id}`),
  createOrder: (payload) => apiClient.post("/Orders", payload),
  updateOrder: (payload) => apiClient.put("/Orders", payload),
  deleteOrder: (payload) => apiClient.delete("/Orders", { data: payload }),

  getOrderItems: () => apiClient.get("/Order-Items"),
  createOrderItem: (payload) => apiClient.post("/Order-Items", payload),
  getOrderAddresses: () => apiClient.get("/Order-Addresses"),
  createOrderAddress: (payload) => apiClient.post("/Order-Addresses", payload),
  getOrderStatusMaster: () => apiClient.get("/Order-Status-Master"),
  createOrderStatusMaster: (payload) => apiClient.post("/Order-Status-Master", payload),
  getOrderStatusHistory: () => apiClient.get("/Order-Status-History"),
  createOrderStatusHistory: (payload) => apiClient.post("/Order-Status-History", payload),
  getOrderCancellations: () => apiClient.get("/Order-Cancellations"),

  getInvoices: () => apiClient.get("/Invoices"),
  createInvoice: (payload) => apiClient.post("/Invoices", payload),
  getPayments: () => apiClient.get("/Payments"),
  createPayment: (payload) => apiClient.post("/Payments", payload),
  updatePayment: (payload) => apiClient.put("/Payments", payload),

  getCoupons: () => apiClient.get("/Coupons"),
  getDiscounts: () => apiClient.get("/Discounts"),
  getDiscountTargets: () => apiClient.get("/Discount-Targets"),
  getCouponUsage: () => apiClient.get("/Coupon-Usage"),
  getOrderPromotions: () => apiClient.get("/Order-Promotions"),
  createOrderPromotion: (payload) => apiClient.post("/Order-Promotions", payload),

  getCourierPartners: () => apiClient.get("/Courier-Partners"),
  getShipments: () => apiClient.get("/Shipments"),
  createShipment: (payload) => apiClient.post("/Shipments", payload),
  updateShipment: (payload) => apiClient.put("/Shipments", payload),
  getShipmentEvents: () => apiClient.get("/Shipment-Events"),
  createShipmentEvent: (payload) => apiClient.post("/Shipment-Events", payload),
  getReturns: () => apiClient.get("/Returns"),
  createReturn: (payload) => apiClient.post("/Returns", payload),
  updateReturn: (payload) => apiClient.put("/Returns", payload),
  getRefunds: () => apiClient.get("/Refunds"),
};

export default orderService;
