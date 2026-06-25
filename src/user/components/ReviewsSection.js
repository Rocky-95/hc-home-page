import React, { useEffect, useState } from "react";
import reviewService from "../../services/reviewService";
import userService from "../../services/userService";
import "../styles/ReviewsSection.css";

const ReviewsSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [form, setForm] = useState({ rating: 5, review_title: "", review_text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    const fetchReviewsAndUser = async () => {
      try {
        const [reviewsRes, profileRes] = await Promise.all([
          reviewService.getReviews(),
          userService.getProfile().catch(() => ({ data: null })),
        ]);
        const allReviews = reviewsRes.data?.data || reviewsRes.data || [];
        setReviews(allReviews.filter((r) => String(r.product_id) === String(productId)));
        const profile = profileRes.data?.data || profileRes.data;
        if (profile?.user_id) {
          setUserId(profile.user_id);
          setUserName(profile.fullname || "");
        }
      } catch (err) {
        setMessage({ text: err.response?.data?.message || "Failed to load reviews", isError: true });
      } finally {
        setLoading(false);
      }
    };
    fetchReviewsAndUser();
  }, [productId]);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage({ text: "Please log in to write a review.", isError: true });
      return;
    }
    setSubmitting(true);
    setMessage({ text: "", isError: false });
    try {
      await reviewService.createReview({
        product_id: productId,
        variant_id: null,
        user_id: userId,
        rating: Number(form.rating),
        review_title: form.review_title,
        review_text: form.review_text,
        is_verified: 1,
        rcu: "website",
      });
      const reviewsRes = await reviewService.getReviews();
      const allReviews = reviewsRes.data?.data || reviewsRes.data || [];
      setReviews(allReviews.filter((r) => String(r.product_id) === String(productId)));
      setForm({ rating: 5, review_title: "", review_text: "" });
      setMessage({ text: "Review submitted successfully.", isError: false });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Failed to submit review", isError: true });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-3">Loading reviews...</div>;
  }

  return (
    <div className="reviews-section">
      <div className="reviews-summary">
        <h3>Customer Reviews</h3>
        <div className="reviews-rating">
          <span className="reviews-average">{averageRating}</span>
          <span className="reviews-stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(averageRating) ? "#111" : "none"} stroke="#111" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </span>
          <span className="reviews-count">Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div className="review-card" key={review.review_id}>
              <div className="review-header">
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Number(review.rating) ? "#111" : "none"} stroke="#111" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="review-author">{review.user_name || "Verified Buyer"}</span>
                <span className="review-date">
                  {review.created_at ? new Date(review.created_at).toLocaleDateString("en-IN") : ""}
                </span>
              </div>
              <h5 className="review-title">{review.review_title}</h5>
              <p className="review-text">{review.review_text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="reviews-empty">No reviews yet. Be the first to review this product.</p>
      )}

      <div className="review-form-wrap">
        <h4>Write a Review</h4>
        {message.text && (
          <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <select
              className="form-select"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={form.review_title}
              onChange={(e) => setForm({ ...form, review_title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Review</label>
            <textarea
              className="form-control"
              rows="4"
              value={form.review_text}
              onChange={(e) => setForm({ ...form, review_text: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsSection;
