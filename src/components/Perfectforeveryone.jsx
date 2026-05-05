import React from "react";
import container2 from "../assets/container.png";
import container3 from "../assets/container1.png";
import container from "../assets/container2.png";
import container1 from "../assets/container3.png";
import userIcon from "../assets/usercopy.svg";
import gamers from "../assets/gamer.svg";
import profitional from "../assets/profitional.svg";
import Student from "../assets/student.svg";

const users = [
  {
    title: "Gamers",
    description: "Optimize your rig for maximum FPS and competitive advantage",
    image: container,
    iconBg: "#eef3fc",
    icon: <img src={gamers} alt="gamers" width="20" height="20" />,
  },
  {
    title: "Students",
    description: "Find budget-friendly PCs perfect for coursework and projects",
    image: container1,
    iconBg: "#eef3fc",
    icon: <img src={Student} alt="student" width="20" height="20" />,
  },
  {
    title: "Professionals",
    description: "Get powerful workstations for creative work and productivity",
    image: container2,
    iconBg: "#eef3fc",
    icon: <img src={profitional} alt="professional" width="20" height="20" />,
  },
  {
    title: "Office Users",
    description: "Reliable systems for daily tasks and business applications",
    image: container3,
    iconBg: "#eef3fc",
    icon: <img src={userIcon} alt="office users" width="20" height="20" />,
  },
];

const PerfectForEveryone = () => {
  return (
    <section style={{
      padding: "64px 24px",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", width: "100%" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
            fontWeight: "700",
            color: "#155DFC",
            margin: "0 0 12px 0",
          }}>
            Perfect For Everyone
          </h2>
          <p style={{
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            color: "#6b7280",
            margin: 0,
          }}>
            Tailored insights for different user needs
          </p>
        </div>

        {/* ✅ Grid ريسبونسيف */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>

      </div>
    </section>
  );
};

const UserCard = ({ user }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e5e9f0",
        boxShadow: hovered
          ? "0 8px 28px rgba(0,0,0,0.09)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.22s ease",
        cursor: "default",
      }}
    >
      <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
        <img
          src={user.image}
          alt={user.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>

      <div style={{ padding: "20px 20px 24px 20px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}>
          <div style={{
            width: "36px", height: "36px",
            borderRadius: "10px",
            background: user.iconBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            {user.icon}
          </div>
          <h3 style={{
            fontSize: "1rem", fontWeight: "700",
            color: "#111827", margin: 0,
          }}>
            {user.title}
          </h3>
        </div>

        <p style={{
          fontSize: "0.875rem", color: "#6b7280",
          margin: 0, lineHeight: "1.65",
        }}>
          {user.description}
        </p>
      </div>
    </div>
  );
};

export default PerfectForEveryone;