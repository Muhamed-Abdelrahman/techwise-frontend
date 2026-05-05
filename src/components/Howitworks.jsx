import React from 'react'
import icon4 from "../assets/1.svg";
import icon3 from "../assets/2.svg";
import icon2 from "../assets/3.svg";
import icon1 from "../assets/4.svg";

const steps = [
  {
    number: "01",
    icon: icon1,
    title: "Enter your PC specs",
    description: "Share your requirements, budget, intended use, and preferences through our intuitive interface.",
  },
  {
    number: "02",
    icon: icon2,
    title: "AI analyzes performance",
    description: "Our advanced algorithms process millions of data points including specs, reviews, benchmarks, and current market prices.",
  },
  {
    number: "03",
    icon: icon3,
    title: "Get Recommendations",
    description: "Receive personalized, data-backed recommendations with detailed explanations and comparison options.",
  },
  {
    number: "04",
    icon: icon4,
    title: "Make Informed Decisions",
    description: "Compare, upgrade, or save. Access alternatives, evaluate and purchase with confidence knowing you've made the right choice.",
  },
];

export default function HowItWorks() {
  return (
    <section style={{
        padding: "64px 24px",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>

      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2 style={{
          fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
          fontWeight: "700",
          color: "#155DFC",
          margin: "0 0 15px 0",
        }}>
          How It Works
        </h2>
        <p style={{
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          color: "#6b7280",
          margin: "0 0 15px 0",
        }}>
          Our simple four-step process helps you make the best computer decisions
        </p>
      </div>

      {/* ✅ Grid ريسبونسيف */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "35px",
        maxWidth: "1350px",
        margin: "0 auto",
        width: "100%",
      }}>
        {steps.map((step) => (
          <div key={step.number} style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e9f0",
            padding: "15px 32px 30px 32px",
            position: "relative",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}>

            <div style={{
              position: "absolute",
              top: "-10px",
              right: "-8px",
              width: "47px",
              height: "47px",
              borderRadius: "50%",
              background: "#155DFC",
              color: "#fff",
              fontSize: "0.90rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {step.number}
            </div>

            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#eef3fc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px auto",
            }}>
              <img src={step.icon} alt={step.title} width="36" height="36" />
            </div>

            <h3 style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 16px 0",
            }}>
              {step.title}
            </h3>

            <p style={{
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              color: "#4A5565",
              margin: 0,
              lineHeight: "1.75",
            }}>
              {step.description}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}