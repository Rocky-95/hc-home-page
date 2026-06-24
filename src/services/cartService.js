import apiClient from "./apiClient";

const cartService = {
  getCarts: () => apiClient.get("/Carts"),
  getCartById: (id) => apiClient.get(`/Carts/${id}`),
  createCart: (payload) => apiClient.post("/Carts", payload),
  updateCart: (payload) => apiClient.put("/Carts", payload),
  deleteCart: (payload) => apiClient.delete("/Carts", { data: payload }),

  getCartItems: () => apiClient.get("/Cart-Items"),
  getCartItemById: (id) => apiClient.get(`/Cart-Items/${id}`),
  createCartItem: (payload) => apiClient.post("/Cart-Items", payload),
  updateCartItem: (payload) => apiClient.put("/Cart-Items", payload),
  deleteCartItem: (payload) => apiClient.delete("/Cart-Items", { data: payload }),

  getWishlists: () => apiClient.get("/Wishlists"),
  createWishlist: (payload) => apiClient.post("/Wishlists", payload),
  getWishlistItems: () => apiClient.get("/Wishlist-Items"),
  createWishlistItem: (payload) => apiClient.post("/Wishlist-Items", payload),
  deleteWishlistItem: (payload) =>
    apiClient.delete("/Wishlist-Items", { data: payload }),
};

export default cartService;
