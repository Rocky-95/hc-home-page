import apiClient from "./apiClient";

const reviewService = {
  getReviews: () => apiClient.get("/reviews"),
  getReviewById: (id) => apiClient.get(`/reviews/${id}`),
  createReview: (payload) => apiClient.post("/reviews", payload),
  updateReview: (payload) => apiClient.put("/reviews", payload),
  deleteReview: (payload) => apiClient.delete("/reviews", { data: payload }),

  // Review media
  getReviewMedia: () => apiClient.get("/review-media"),
  getReviewMediaById: (id) => apiClient.get(`/review-media/${id}`),
  createReviewMedia: (payload) => apiClient.post("/review-media", payload),
  updateReviewMedia: (payload) => apiClient.put("/review-media", payload),
  deleteReviewMedia: (payload) => apiClient.delete("/review-media", { data: payload }),

  // Review votes
  getReviewVotes: () => apiClient.get("/review-votes"),
  getReviewVoteById: (id) => apiClient.get(`/review-votes/${id}`),
  createReviewVote: (payload) => apiClient.post("/review-votes", payload),
  updateReviewVote: (payload) => apiClient.put("/review-votes", payload),
  deleteReviewVote: (payload) => apiClient.delete("/review-votes", { data: payload }),
};

export default reviewService;
