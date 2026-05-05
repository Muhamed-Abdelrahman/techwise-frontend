import React, { useState } from "react";
import { X, Star, MessageSquare } from "lucide-react";
import "../styles/FeedbackModal.css";

/* ── CONFIG ── */
const USE_MOCK = false;
const BASE_URL = "https://techwiseapp.runasp.net";

/* ════════════════════════════════════════════ */
const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating before submitting.");
      return;
    }
    setError("");
    setLoading(true);

    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 1000));
      setLoading(false);
      setSubmitted(true);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/api/Support/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit feedback.");
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // reset state on close
    setRating(0);
    setHoveredRating(0);
    setComment("");
    setEmail("");
    setError("");
    setSubmitted(false);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fb-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="fb-modal">

        {/* ── Success State ── */}
        {submitted ? (
          <div className="fb-success">
            <div className="fb-success-dots">
              <span className="fb-dot fb-dot-1" />
              <span className="fb-dot fb-dot-2" />
              <span className="fb-dot fb-dot-3" />
            </div>
            <div className="fb-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="fb-success-title">Thank You for Your Feedback!</h2>
            <p className="fb-success-sub">
              Your experience matters to us. We'll use your feedback to improve our service.
            </p>
            <div className="fb-success-bar">
              <div className="fb-success-bar-fill" />
            </div>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="fb-header">
              <div className="fb-header-left">
                <div className="fb-header-icon">
                  <MessageSquare size={20} color="#2563eb" />
                </div>
                <div>
                  <div className="fb-header-title">Share Your Experience</div>
                  <div className="fb-header-sub">Help us improve TechWise</div>
                </div>
              </div>
              <button className="fb-close" onClick={handleClose}>
                <X size={18} />
              </button>
            </div>

            <div className="fb-body">

              {/* ── Stars ── */}
              <div className="fb-section">
                <label className="fb-label">
                  How would you rate your experience? <span className="fb-required">*</span>
                </label>
                <div className="fb-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`fb-star ${(hoveredRating || rating) >= star ? "active" : ""}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star size={32} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
                {error && <div className="fb-error">{error}</div>}
              </div>

              {/* ── Comment ── */}
              <div className="fb-section">
                <label className="fb-label">
                  Tell us more about your experience{" "}
                  <span className="fb-optional">(optional)</span>
                </label>
                <textarea
                  className="fb-textarea"
                  placeholder="What did you like? What could we improve? How was the recommendation process?"
                  maxLength={500}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="fb-char-count">{comment.length}/500 characters</div>
              </div>

              {/* ── Email ── */}
              <div className="fb-section">
                <label className="fb-label">
                  Email <span className="fb-optional"></span>
                </label>
                <input
                  type="email"
                  className="fb-input"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="fb-input-hint">We'll only use this to follow up on your feedback</div>
              </div>

              {/* ── Questions hint ── */}
              <div className="fb-hints">
                <div className="fb-hints-title">Some questions to consider:</div>
                <ul className="fb-hints-list">
                  <li>Was the device recommendation helpful?</li>
                  <li>How was the checkout process?</li>
                  <li>Did you find all the information you needed?</li>
                  <li>Would you recommend Smart PC Advisor to others?</li>
                </ul>
              </div>

            </div>

            {/* ── Footer ── */}
            <div className="fb-footer">
              <button
                className="fb-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="fb-spinner" />
                ) : (
                  "Send Feedback"
                )}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default FeedbackModal;