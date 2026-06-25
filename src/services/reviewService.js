import apiClient from "./apiClient";

const reviewService = {
  getReviews: () => apiClient.get("/reviews"),
  getReviewById: (id) => apiClient.get(`/reviews/${id}`),
  createReview: (payload) => apiClient.post("/reviews", payload),
  updateReview: (payload) => apiClient.put("/reviews", payload),
  deleteReview: (payload) => apiClient.delete("/reviews", { data: payload }),
};

export default reviewService;
