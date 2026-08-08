import api from "../admin/services/api";

// Auto-generated from httpie-space-harry-clinton-2.json
// Exports a registry of callable service objects for every API resource.

export const apiRegistry = {
  "FileUpload": {
    create: (payload) => api.post("/FileUpload", payload).then((res) => res.data),
  },
  "Auth/Register": {
    create: (payload) => api.post("/Auth/Register", payload).then((res) => res.data),
  },
  "Auth/Password-Login": {
    create: (payload) => api.post("/Auth/Password-Login", payload).then((res) => res.data),
  },
  "Auth/OTP-Login": {
    create: (payload) => api.post("/Auth/OTP-Login", payload).then((res) => res.data),
  },
  "Auth/Verify-Login-OTP": {
    create: (payload) => api.post("/Auth/Verify-Login-OTP", payload).then((res) => res.data),
  },
  "Auth/Reset-Password": {
    create: (payload) => api.post("/Auth/Reset-Password", payload).then((res) => res.data),
  },
  "Auth/Forgot-Password": {
    create: (payload) => api.post("/Auth/Forgot-Password", payload).then((res) => res.data),
  },
  "Auth/Forgot-Password-Confirm": {
    create: (payload) => api.post("/Auth/Forgot-Password-Confirm", payload).then((res) => res.data),
  },
  "Mail/Send-Mail": {
    create: (payload) => api.post("/Mail/Send-Mail", payload).then((res) => res.data),
  },
  "Mail/Send-OTP-Email": {
    create: (payload) => api.post("/Mail/Send-OTP-Email", payload).then((res) => res.data),
  },
  "Users": {
    get: (id) => api.get(`/Users/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Users", payload).then((res) => res.data),
    update: (payload) => api.put("/Users", payload).then((res) => res.data),
    remove: (id) => api.delete("/Users", { data: { id } }).then((res) => res.data),
  },
  "Roles": {
    get: (id) => api.get(`/Roles/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Roles", payload).then((res) => res.data),
    update: (payload) => api.put("/Roles", payload).then((res) => res.data),
    remove: (id) => api.delete("/Roles", { data: { id } }).then((res) => res.data),
  },
  "User-Roles": {
    get: (id) => api.get(`/User-Roles/${id}`).then((res) => res.data),
    create: (payload) => api.post("/User-Roles", payload).then((res) => res.data),
    update: (payload) => api.put("/User-Roles", payload).then((res) => res.data),
    remove: (id) => api.delete("/User-Roles", { data: { id } }).then((res) => res.data),
  },
  "User-Roles/user": {
    get: (id) => api.get(`/User-Roles/user/${id}`).then((res) => res.data),
  },
  "User-Roles/add": {
    create: (payload) => api.post("/User-Roles/add", payload).then((res) => res.data),
  },
  "User-Roles/remove": {
    remove: (id) => api.delete("/User-Roles/remove", { data: { id } }).then((res) => res.data),
  },
  "Profiles": {
    get: (id) => api.get(`/Profiles/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Profiles", payload).then((res) => res.data),
    update: (payload) => api.put("/Profiles", payload).then((res) => res.data),
    remove: (id) => api.delete("/Profiles", { data: { id } }).then((res) => res.data),
  },
  "Addresses": {
    get: (id) => api.get(`/Addresses/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Addresses", payload).then((res) => res.data),
    update: (payload) => api.put("/Addresses", payload).then((res) => res.data),
    remove: (id) => api.delete("/Addresses", { data: { id } }).then((res) => res.data),
  },
  "Running-Bar": {
    get: (id) => api.get(`/Running-Bar/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Running-Bar", payload).then((res) => res.data),
    update: (payload) => api.put("/Running-Bar", payload).then((res) => res.data),
    remove: (id) => api.delete("/Running-Bar", { data: { id } }).then((res) => res.data),
  },
  "Running-Bar-Items": {
    get: (id) => api.get(`/Running-Bar-Items/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Running-Bar-Items", payload).then((res) => res.data),
    update: (payload) => api.put("/Running-Bar-Items", payload).then((res) => res.data),
    remove: (id) => api.delete("/Running-Bar-Items", { data: { id } }).then((res) => res.data),
  },
  "Menu-Category": {
    get: (id) => api.get(`/Menu-Category/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Menu-Category", payload).then((res) => res.data),
    update: (payload) => api.put("/Menu-Category", payload).then((res) => res.data),
    remove: (id) => api.delete("/Menu-Category", { data: { id } }).then((res) => res.data),
  },
  "Menu-Sub-Category": {
    get: (id) => api.get(`/Menu-Sub-Category/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Menu-Sub-Category", payload).then((res) => res.data),
    update: (payload) => api.put("/Menu-Sub-Category", payload).then((res) => res.data),
    remove: (id) => api.delete("/Menu-Sub-Category", { data: { id } }).then((res) => res.data),
  },
  "Products": {
    get: (id) => api.get(`/Products/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products", payload).then((res) => res.data),
    update: (payload) => api.put("/Products", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products", { data: { id } }).then((res) => res.data),
  },
  "Products-Media": {
    list: () => api.get("/Products-Media").then((res) => res.data),
    get: (id) => api.get(`/Products-Media/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Media", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Media", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Media", { data: { id } }).then((res) => res.data),
  },
  "Products-Seo": {
    list: () => api.get("/Products-Seo").then((res) => res.data),
    get: (id) => api.get(`/Products-Seo/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Seo", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Seo", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Seo", { data: { id } }).then((res) => res.data),
  },
  "Products-Cloth-Type-Care-Instructions": {
    list: () => api.get("/Products-Cloth-Type-Care-Instructions").then((res) => res.data),
    get: (id) => api.get(`/Products-Cloth-Type-Care-Instructions/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Cloth-Type-Care-Instructions", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Cloth-Type-Care-Instructions", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Cloth-Type-Care-Instructions", { data: { id } }).then((res) => res.data),
  },
  "Products-Care-Instructions": {
    list: () => api.get("/Products-Care-Instructions").then((res) => res.data),
    get: (id) => api.get(`/Products-Care-Instructions/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Care-Instructions", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Care-Instructions", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Care-Instructions", { data: { id } }).then((res) => res.data),
  },
  "Products-Cloth-Types": {
    list: () => api.get("/Products-Cloth-Types").then((res) => res.data),
    get: (id) => api.get(`/Products-Cloth-Types/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Cloth-Types", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Cloth-Types", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Cloth-Types", { data: { id } }).then((res) => res.data),
  },
  "Products-Sizes": {
    list: () => api.get("/Products-Sizes").then((res) => res.data),
    get: (id) => api.get(`/Products-Sizes/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Sizes", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Sizes", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Sizes", { data: { id } }).then((res) => res.data),
  },
  "Products-Attributes-Values": {
    list: () => api.get("/Products-Attributes-Values").then((res) => res.data),
    get: (id) => api.get(`/Products-Attributes-Values/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Attributes-Values", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Attributes-Values", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Attributes-Values", { data: { id } }).then((res) => res.data),
  },
  "Products-Attributes": {
    list: () => api.get("/Products-Attributes").then((res) => res.data),
    get: (id) => api.get(`/Products-Attributes/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Attributes", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Attributes", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Attributes", { data: { id } }).then((res) => res.data),
  },
  "Products-Variants": {
    list: () => api.get("/Products-Variants").then((res) => res.data),
    get: (id) => api.get(`/Products-Variants/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Products-Variants", payload).then((res) => res.data),
    update: (payload) => api.put("/Products-Variants", payload).then((res) => res.data),
    remove: (id) => api.delete("/Products-Variants", { data: { id } }).then((res) => res.data),
  },
  "Appointment-Date-Slots": {
    get: (id) => api.get(`/Appointment-Date-Slots/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Appointment-Date-Slots", payload).then((res) => res.data),
    update: (payload) => api.put("/Appointment-Date-Slots", payload).then((res) => res.data),
    remove: (id) => api.delete("/Appointment-Date-Slots", { data: { id } }).then((res) => res.data),
  },
  "Appointment-Slot-Blocks": {
    get: (id) => api.get(`/Appointment-Slot-Blocks/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Appointment-Slot-Blocks", payload).then((res) => res.data),
    update: (payload) => api.put("/Appointment-Slot-Blocks", payload).then((res) => res.data),
    remove: (id) => api.delete("/Appointment-Slot-Blocks", { data: { id } }).then((res) => res.data),
  },
  "Appointment-Time-Slots": {
    get: (id) => api.get(`/Appointment-Time-Slots/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Appointment-Time-Slots", payload).then((res) => res.data),
    update: (payload) => api.put("/Appointment-Time-Slots", payload).then((res) => res.data),
    remove: (id) => api.delete("/Appointment-Time-Slots", { data: { id } }).then((res) => res.data),
  },
  "Custom-Appointments": {
    get: (id) => api.get(`/Custom-Appointments/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Custom-Appointments", payload).then((res) => res.data),
    update: (payload) => api.put("/Custom-Appointments", payload).then((res) => res.data),
    remove: (id) => api.delete("/Custom-Appointments", { data: { id } }).then((res) => res.data),
  },
  "Wishlists": {
    get: (id) => api.get(`/Wishlists/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Wishlists", payload).then((res) => res.data),
    update: (payload) => api.put("/Wishlists", payload).then((res) => res.data),
    remove: (id) => api.delete("/Wishlists", { data: { id } }).then((res) => res.data),
  },
  "Wishlist-Items": {
    get: (id) => api.get(`/Wishlist-Items/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Wishlist-Items", payload).then((res) => res.data),
    update: (payload) => api.put("/Wishlist-Items", payload).then((res) => res.data),
    remove: (id) => api.delete("/Wishlist-Items", { data: { id } }).then((res) => res.data),
  },
  "Carts": {
    get: (id) => api.get(`/Carts/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Carts", payload).then((res) => res.data),
    update: (payload) => api.put("/Carts", payload).then((res) => res.data),
    remove: (id) => api.delete("/Carts", { data: { id } }).then((res) => res.data),
  },
  "Cart-Items": {
    get: (id) => api.get(`/Cart-Items/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Cart-Items", payload).then((res) => res.data),
    update: (payload) => api.put("/Cart-Items", payload).then((res) => res.data),
    remove: (id) => api.delete("/Cart-Items", { data: { id } }).then((res) => res.data),
  },
  "Orders": {
    get: (id) => api.get(`/Orders/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Orders", payload).then((res) => res.data),
    update: (payload) => api.put("/Orders", payload).then((res) => res.data),
    remove: (id) => api.delete("/Orders", { data: { id } }).then((res) => res.data),
  },
  "Order-Items": {
    get: (id) => api.get(`/Order-Items/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Order-Items", payload).then((res) => res.data),
    update: (payload) => api.put("/Order-Items", payload).then((res) => res.data),
    remove: (id) => api.delete("/Order-Items", { data: { id } }).then((res) => res.data),
  },
  "Order-Addresses": {
    get: (id) => api.get(`/Order-Addresses/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Order-Addresses", payload).then((res) => res.data),
    update: (payload) => api.put("/Order-Addresses", payload).then((res) => res.data),
    remove: (id) => api.delete("/Order-Addresses", { data: { id } }).then((res) => res.data),
  },
  "Order-Status-Master": {
    get: (id) => api.get(`/Order-Status-Master/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Order-Status-Master", payload).then((res) => res.data),
    update: (payload) => api.put("/Order-Status-Master", payload).then((res) => res.data),
    remove: (id) => api.delete("/Order-Status-Master", { data: { id } }).then((res) => res.data),
  },
  "Order-Status-History": {
    get: (id) => api.get(`/Order-Status-History/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Order-Status-History", payload).then((res) => res.data),
    update: (payload) => api.put("/Order-Status-History", payload).then((res) => res.data),
    remove: (id) => api.delete("/Order-Status-History", { data: { id } }).then((res) => res.data),
  },
  "Order-Cancellations": {
    get: (id) => api.get(`/Order-Cancellations/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Order-Cancellations", payload).then((res) => res.data),
    update: (payload) => api.put("/Order-Cancellations", payload).then((res) => res.data),
    remove: (id) => api.delete("/Order-Cancellations", { data: { id } }).then((res) => res.data),
  },
  "Invoices": {
    get: (id) => api.get(`/Invoices/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Invoices", payload).then((res) => res.data),
    update: (payload) => api.put("/Invoices", payload).then((res) => res.data),
    remove: (id) => api.delete("/Invoices", { data: { id } }).then((res) => res.data),
  },
  "Payments": {
    get: (id) => api.get(`/Payments/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Payments", payload).then((res) => res.data),
    update: (payload) => api.put("/Payments", payload).then((res) => res.data),
    remove: (id) => api.delete("/Payments", { data: { id } }).then((res) => res.data),
  },
  "Coupons": {
    get: (id) => api.get(`/Coupons/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Coupons", payload).then((res) => res.data),
    update: (payload) => api.put("/Coupons", payload).then((res) => res.data),
    remove: (id) => api.delete("/Coupons", { data: { id } }).then((res) => res.data),
  },
  "Discounts": {
    get: (id) => api.get(`/Discounts/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Discounts", payload).then((res) => res.data),
    update: (payload) => api.put("/Discounts", payload).then((res) => res.data),
    remove: (id) => api.delete("/Discounts", { data: { id } }).then((res) => res.data),
  },
  "Discount-Targets": {
    get: (id) => api.get(`/Discount-Targets/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Discount-Targets", payload).then((res) => res.data),
    update: (payload) => api.put("/Discount-Targets", payload).then((res) => res.data),
    remove: (id) => api.delete("/Discount-Targets", { data: { id } }).then((res) => res.data),
  },
  "Coupon-Usage": {
    get: (id) => api.get(`/Coupon-Usage/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Coupon-Usage", payload).then((res) => res.data),
    update: (payload) => api.put("/Coupon-Usage", payload).then((res) => res.data),
    remove: (id) => api.delete("/Coupon-Usage", { data: { id } }).then((res) => res.data),
  },
  "Order-Promotions": {
    get: (id) => api.get(`/Order-Promotions/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Order-Promotions", payload).then((res) => res.data),
    update: (payload) => api.put("/Order-Promotions", payload).then((res) => res.data),
    remove: (id) => api.delete("/Order-Promotions", { data: { id } }).then((res) => res.data),
  },
  "Courier-Partners": {
    get: (id) => api.get(`/Courier-Partners/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Courier-Partners", payload).then((res) => res.data),
    update: (payload) => api.put("/Courier-Partners", payload).then((res) => res.data),
    remove: (id) => api.delete("/Courier-Partners", { data: { id } }).then((res) => res.data),
  },
  "Shipments": {
    get: (id) => api.get(`/Shipments/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Shipments", payload).then((res) => res.data),
    update: (payload) => api.put("/Shipments", payload).then((res) => res.data),
    remove: (id) => api.delete("/Shipments", { data: { id } }).then((res) => res.data),
  },
  "Shipment-Events": {
    get: (id) => api.get(`/Shipment-Events/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Shipment-Events", payload).then((res) => res.data),
    update: (payload) => api.put("/Shipment-Events", payload).then((res) => res.data),
    remove: (id) => api.delete("/Shipment-Events", { data: { id } }).then((res) => res.data),
  },
  "Returns": {
    get: (id) => api.get(`/Returns/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Returns", payload).then((res) => res.data),
    update: (payload) => api.put("/Returns", payload).then((res) => res.data),
    remove: (id) => api.delete("/Returns", { data: { id } }).then((res) => res.data),
  },
  "Refunds": {
    get: (id) => api.get(`/Refunds/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Refunds", payload).then((res) => res.data),
    update: (payload) => api.put("/Refunds", payload).then((res) => res.data),
    remove: (id) => api.delete("/Refunds", { data: { id } }).then((res) => res.data),
  },
  "Support-Contacts": {
    get: (id) => api.get(`/Support-Contacts/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Support-Contacts", payload).then((res) => res.data),
    update: (payload) => api.put("/Support-Contacts", payload).then((res) => res.data),
    remove: (id) => api.delete("/Support-Contacts", { data: { id } }).then((res) => res.data),
  },
  "FAQs": {
    get: (id) => api.get(`/FAQs/${id}`).then((res) => res.data),
    create: (payload) => api.post("/FAQs", payload).then((res) => res.data),
    update: (payload) => api.put("/FAQs", payload).then((res) => res.data),
    remove: (id) => api.delete("/FAQs", { data: { id } }).then((res) => res.data),
  },
  "Newsletter-Subscriptions": {
    get: (id) => api.get(`/Newsletter-Subscriptions/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Newsletter-Subscriptions", payload).then((res) => res.data),
    update: (payload) => api.put("/Newsletter-Subscriptions", payload).then((res) => res.data),
    remove: (id) => api.delete("/Newsletter-Subscriptions", { data: { id } }).then((res) => res.data),
  },
  "Settings": {
    get: (id) => api.get(`/Settings/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Settings", payload).then((res) => res.data),
    update: (payload) => api.put("/Settings", payload).then((res) => res.data),
    remove: (id) => api.delete("/Settings", { data: { id } }).then((res) => res.data),
  },
  "Style-Collection-Media": {
    get: (id) => api.get(`/Style-Collection-Media/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Style-Collection-Media", payload).then((res) => res.data),
    update: (payload) => api.put("/Style-Collection-Media", payload).then((res) => res.data),
    remove: (id) => api.delete("/Style-Collection-Media", { data: { id } }).then((res) => res.data),
  },
  "Style-Collections": {
    get: (id) => api.get(`/Style-Collections/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Style-Collections", payload).then((res) => res.data),
    update: (payload) => api.put("/Style-Collections", payload).then((res) => res.data),
    remove: (id) => api.delete("/Style-Collections", { data: { id } }).then((res) => res.data),
  },
  "Spotlight-Media": {
    get: (id) => api.get(`/Spotlight-Media/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Spotlight-Media", payload).then((res) => res.data),
    update: (payload) => api.put("/Spotlight-Media", payload).then((res) => res.data),
    remove: (id) => api.delete("/Spotlight-Media", { data: { id } }).then((res) => res.data),
  },
  "Spotlight-Entries": {
    get: (id) => api.get(`/Spotlight-Entries/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Spotlight-Entries", payload).then((res) => res.data),
    update: (payload) => api.put("/Spotlight-Entries", payload).then((res) => res.data),
    remove: (id) => api.delete("/Spotlight-Entries", { data: { id } }).then((res) => res.data),
  },
  "Menu-Video": {
    get: (id) => api.get(`/Menu-Video/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Menu-Video", payload).then((res) => res.data),
    update: (payload) => api.put("/Menu-Video", payload).then((res) => res.data),
    remove: (id) => api.delete("/Menu-Video", { data: { id } }).then((res) => res.data),
  },
  "Image-Sliders": {
    get: (id) => api.get(`/Image-Sliders/${id}`).then((res) => res.data),
    update: (payload) => api.put("/Image-Sliders", payload).then((res) => res.data),
    remove: (id) => api.delete("/Image-Sliders", { data: { id } }).then((res) => res.data),
  },
  "f{{P}}/Image-Sliders": {
    create: (payload) => api.post("/f{{P}}/Image-Sliders", payload).then((res) => res.data),
  },
  "Legal-Page-Headers": {
    get: (id) => api.get(`/Legal-Page-Headers/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Legal-Page-Headers", payload).then((res) => res.data),
    update: (payload) => api.put("/Legal-Page-Headers", payload).then((res) => res.data),
    remove: (id) => api.delete("/Legal-Page-Headers", { data: { id } }).then((res) => res.data),
  },
  "Legal-Page-Sections": {
    get: (id) => api.get(`/Legal-Page-Sections/${id}`).then((res) => res.data),
    create: (payload) => api.post("/Legal-Page-Sections", payload).then((res) => res.data),
  },
  "reviews": {
    get: (id) => api.get(`/reviews/${id}`).then((res) => res.data),
    create: (payload) => api.post("/reviews", payload).then((res) => res.data),
    update: (payload) => api.put("/reviews", payload).then((res) => res.data),
    remove: (id) => api.delete("/reviews", { data: { id } }).then((res) => res.data),
  },
  "variant-rating-summary": {
    list: () => api.get("/variant-rating-summary").then((res) => res.data),
    get: (id) => api.get(`/variant-rating-summary/${id}`).then((res) => res.data),
    create: (payload) => api.post("/variant-rating-summary", payload).then((res) => res.data),
    update: (payload) => api.put("/variant-rating-summary", payload).then((res) => res.data),
    remove: (id) => api.delete("/variant-rating-summary", { data: { id } }).then((res) => res.data),
  },
  "variant-rating-summary/var_001": {
    list: () => api.get("/variant-rating-summary/var_001").then((res) => res.data),
    get: (id) => api.get(`/variant-rating-summary/var_001/${id}`).then((res) => res.data),
  },
  "product-rating-summary": {
    list: () => api.get("/product-rating-summary").then((res) => res.data),
    get: (id) => api.get(`/product-rating-summary/${id}`).then((res) => res.data),
    create: (payload) => api.post("/product-rating-summary", payload).then((res) => res.data),
    update: (payload) => api.put("/product-rating-summary", payload).then((res) => res.data),
    remove: (id) => api.delete("/product-rating-summary", { data: { id } }).then((res) => res.data),
  },
  "product-rating-summary/prod_001": {
    list: () => api.get("/product-rating-summary/prod_001").then((res) => res.data),
    get: (id) => api.get(`/product-rating-summary/prod_001/${id}`).then((res) => res.data),
  },
  "review-votes": {
    get: (id) => api.get(`/review-votes/${id}`).then((res) => res.data),
    create: (payload) => api.post("/review-votes", payload).then((res) => res.data),
    update: (payload) => api.put("/review-votes", payload).then((res) => res.data),
    remove: (id) => api.delete("/review-votes", { data: { id } }).then((res) => res.data),
  },
  "review-media": {
    get: (id) => api.get(`/review-media/${id}`).then((res) => res.data),
    create: (payload) => api.post("/review-media", payload).then((res) => res.data),
    update: (payload) => api.put("/review-media", payload).then((res) => res.data),
    remove: (id) => api.delete("/review-media", { data: { id } }).then((res) => res.data),
  },
};

export const getApi = (resource) => apiRegistry[resource];

export default apiRegistry;