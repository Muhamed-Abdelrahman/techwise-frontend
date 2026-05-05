import React from 'react'
import shield from "../assets/shield.svg";
import dollar from "../assets/dollar.svg";
import clock from "../assets/clock.svg";
import badge from "../assets/badge.svg";

const features = [
  {
    icon: shield,
    title: "AI-Powered Accuracy",
    description: "Our advanced algorithms analyze thousands of data points to provide precise recommendations.",
  },
  {
    icon: dollar,
    title: "Save Money",
    description: "Make informed decisions and avoid overpaying for computers or unnecessary upgrades.",
  },
  {
    icon: clock,
    title: "Real-Time Updates",
    description: "Get the latest pricing and availability information updated in real-time.",
  },
  {
    icon: badge,
    title: "Expert Insights",
    description: "Benefit from years of industry expertise and comprehensive market analysis.",
  },
];

export default function WhyChoose() {
  return (
    <section style={{
       padding: "64px 24px",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2 style={{
          fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
          fontWeight: "700",
          color: "#155DFC",
          margin: "0 0 14px 0",
        }}>
          Why Choose TechWise?
        </h2>
        <p style={{
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          color: "#6b7280",
          margin: 0,
        }}>
          Join thousands of satisfied users who trust our platform for their computer decisions
        </p>
      </div>

      {/* ✅ Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "24px",
        maxWidth: "1350px",
        margin: "0 auto",
        width: "100%",
      }}>
        {features.map((feature, index) => (
          <div key={index} style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e9f0",
            padding: "40px 28px 44px 28px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}>

            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              background: "#eef3fc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}>
              <img src={feature.icon} alt={feature.title} width="30" height="30" />
            </div>

            <h3 style={{
              fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 14px 0",
            }}>
              {feature.title}
            </h3>

            <p style={{
              fontSize: "clamp(0.875rem, 2vw, 0.9375rem)",
              color: "#4A5565",
              margin: 0,
              lineHeight: "1.75",
            }}>
              {feature.description}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}