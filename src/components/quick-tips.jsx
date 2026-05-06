import React from 'react'
import trend from "../assets/trend.svg";
import i1 from "../assets/1.svg";
import bulb from "../assets/bulb.svg";
import icon2 from "../assets/icon2.svg";
import arrow from "../assets/arrow.svg";
import dollar from "../assets/dollar.svg";

const tips = [
  {
    icon: dollar,
    title: "Avoid overpaying for hardware",
    description: "Get real-time market insights and price comparisons to ensure you're getting the best deal.",
  },
  {
    icon: arrow,
    title: "Upgrade only what you need",
    description: "Focus your budget on components that will make the biggest impact on your specific use case.",
  },
  {
    icon: i1,
    title: "Know when to sell vs upgrade",
    description: "Our AI helps you decide whether upgrading or selling makes more financial sense.",
  },
  {
    icon: bulb,
    title: "Future-proof your investment",
    description: "Choose components with longevity in mind based on upcoming technology trends.",
  },
  {
    icon: icon2,
    title: "Monitor performance over time",
    description: "Track your PC's performance and get notified when upgrades become worthwhile.",
  },
  {
    icon: trend,
    title: "Avoid compatibility issues",
    description: "Ensure all components work together seamlessly before you buy.",
  },
];

export default function QuickTips() {
  return (
    <section style={{
        padding: "64px 24px",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>

      <style>{`
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1350px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 991px) {
          .tips-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 575px) {
          .tips-grid { grid-template-columns: 1fr; }
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
          Quick Tips
        </h2>
        <p style={{
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          color: "#6b7280",
          margin: 0,
        }}>
          Expert advice to maximize your investment
        </p>
      </div>

      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e9f0",
            padding: "28px 28px 32px 28px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "16px",
          }}>

            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#eef3fc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <img src={tip.icon} alt={tip.title} width="24" height="24" />
            </div>

            <div>
              <h3 style={{
                fontSize: "clamp(1rem, 2.5vw, 1.0625rem)",
                fontWeight: "700",
                color: "#111827",
                margin: "0 0 10px 0",
              }}>
                {tip.title}
              </h3>
              <p style={{
                fontSize: "clamp(0.875rem, 2vw, 0.9375rem)",
                color: "#4A5565",
                margin: 0,
                lineHeight: "1.7",
              }}>
                {tip.description}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}