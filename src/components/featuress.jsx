import React from "react";
import LightningIcon  from "../assets/Vector.svg";
import DollarIcon     from "../assets/icon3.svg";
import BarChartIcon   from "../assets/icon2.svg";
import TrendingIcon   from "../assets/icon6.svg";
import CompareIcon    from "../assets/icon5.svg";
import LightbulbIcon  from "../assets/icon4.svg";

const Features = () => {
  const features = [
    {
      icon: <img src={LightningIcon} width="28" height="28" alt="Smart Device Recommendations" />,
      iconBg: "#FAF5FF",
      title: "Smart Device Recommendations",
      description: "AI-powered suggestions for PCs that match your needs and budget perfectly.",
    },
    {
      icon: <img src={DollarIcon} width="28" height="28" alt="Used PC Value Estimation" />,
      iconBg: "#F0FDF4",
      title: "Used PC Value Estimation",
      description: "Know the fair market value of used devices before buying or selling.",
    },
    {
      icon: <img src={BarChartIcon} width="28" height="28" alt="Performance Analysis" />,
      iconBg: "#EFF6FF",
      title: "Performance Analysis",
      description: "Get detailed insights into your PC's gaming and application performance with real-world benchmarks.",
    },
    {
      icon: <img src={TrendingIcon} width="28" height="28" alt="Hardware Upgrade Advisor" />,
      iconBg: "#FFF7DA",
      title: "Hardware Upgrade Advisor",
      description: "Get smart recommendations on which components to upgrade for maximum impact.",
    },
    {
      icon: <img src={CompareIcon} width="28" height="28" alt="Device Comparison" />,
      iconBg: "#DCFAFF",
      title: "Device Comparison",
      description: "Compare multiple PCs side-by-side with detailed specifications and performance metrics.",
    },
    {
      icon: <img src={LightbulbIcon} width="28" height="28" alt="Smart Tips" />,
      iconBg: "#FFEFE5",
      title: "Smart Tips",
      description: "Receive personalized tips to save money and optimize your PC investment.",
    },
  ];

  return (
    <section style={{
      padding: "0 24px 60px 24px",
      background: "#ffffff",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: "800",
            color: "#155DFC",
            margin: "0 0 12px 0",
          }}>
            Main Features
          </h2>
          <p style={{
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            color: "#6b7280",
            margin: 0,
          }}>
            Everything you need to make smart computer decisions in one platform
          </p>
        </div>

        {/* ✅ Grid ريسبونسيف */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
};

const FeatureCard = ({ feature }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "32px 28px 36px 28px",
        border: "1px solid #e5e9f0",
        boxShadow: hovered
          ? "0 8px 28px rgba(0,0,0,0.09)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.22s ease",
        cursor: "default",
      }}
    >
      <div style={{
        width: "60px", height: "60px",
        borderRadius: "14px",
        background: feature.iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "26px",
      }}>
        {feature.icon}
      </div>

      <h3 style={{
        fontSize: "1rem", fontWeight: "700",
        color: "#111827", margin: "0 0 10px 0", lineHeight: "1.3",
      }}>
        {feature.title}
      </h3>

      <p style={{
        fontSize: "0.9rem", color: "#6b7280",
        margin: 0, lineHeight: "1.75",
      }}>
        {feature.description}
      </p>
    </div>
  );
};

export default Features;