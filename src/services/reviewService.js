import apiClient from "./apiClient";

const reviewService = {
  getReviews: () => apiClient.get("/Reviews"),
  getReviewById: (id) => apiClient.get(`/Reviews/${id}`),
  createReview: (payload) => apiClient.post("/Reviews", payload),
  updateReview: (payload) => apiClient.put("/Reviews", payload),
  deleteReview: (payload) => apiClient.delete("/Reviews", { data: payload }),

  // Review media
  getReviewMedia: () => apiClient.get("/Review-Media"),
  getReviewMediaById: (id) => apiClient.get(`/Review-Media/${id}`),
  createReviewMedia: (payload) => apiClient.post("/Review-Media", payload),
  updateReviewMedia: (payload) => apiClient.put("/Review-Media", payload),
  deleteReviewMedia: (payload) => apiClient.delete("/Review-Media", { data: payload }),

  // Review votes
  getReviewVotes: () => apiClient.get("/Review-Votes"),
  getReviewVoteById: (id) => apiClient.get(`/Review-Votes/${id}`),
  createReviewVote: (payload) => apiClient.post("/Review-Votes", payload),
  updateReviewVote: (payload) => apiClient.put("/Review-Votes", payload),
  deleteReviewVote: (payload) => apiClient.delete("/Review-Votes", { data: payload }),
};

export default reviewService;
