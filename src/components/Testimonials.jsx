import React from 'react'
import prof from "../assets/prof.svg";

const reviews = [
  {
    text: "Smart PC Advisor helped me build the perfect workstation for video editing. The AI recommendations were spot-on, and I saved over $400 compared to pre-built options!",
    name: "Sarah Johnson",
    role: "Graphic Designer",
    avatar: <img src={prof} alt="Sarah Johnson" width="44" height="44" style={{ borderRadius: "50%", objectFit: "cover" }} />,
  },
  {
    text: "As a student on a budget, this tool was a game-changer. It found the best deals on used components and warned me about potential bottlenecks. Highly recommend!",
    name: "Michael Chen",
    role: "College Student",
    initials: "MC",
  },
  {
    text: "I needed to upgrade 5 office PCs. The platform's analysis saved us thousands by identifying exactly what needed upgrading vs. full replacements. Outstanding service!",
    name: "Emma Rodriguez",
    role: "Small Business Owner",
    initials: "ER",
  },
];

export default function Testimonials() {
  return (
    <section style={{
        padding: "64px 24px",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>

      <style>{`
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1350px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 991px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 575px) {
          .reviews-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2 style={{
          fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
          fontWeight: "700",
          color: "#155DFC",
          margin: "0 0 14px 0",
        }}>
          Trusted by PC enthusiasts
        </h2>
        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
          color: "#6b7280",
          margin: 0,
        }}>
          See what our users say about SmartFix.
        </p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e9f0",
            padding: "28px 28px 32px 28px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>

            {/* Quote Icon */}
            <div style={{
              width: "44px", height: "44px",
              borderRadius: "50%",
              background: "#eef3fc",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b6fd4">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Stars */}
            <div style={{ display: "flex", gap: "4px" }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Review Text */}
            <p style={{
              fontSize: "clamp(0.875rem, 2vw, 0.9375rem)",
              color: "#4A5565",
              margin: 0,
              lineHeight: "1.75",
              flexGrow: 1,
            }}>
              {review.text}
            </p>

            {/* Divider + Avatar */}
            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              {review.avatar ? review.avatar : (
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "50%",
                  background: "#155DFC",
                  color: "#fff",
                  fontSize: "14px", fontWeight: "700",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {review.initials}
                </div>
              )}
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#111827" }}>{review.name}</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>{review.role}</div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}