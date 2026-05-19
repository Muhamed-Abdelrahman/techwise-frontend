import React from "react";
import logo from "../assets/footerlogo.svg";
import twitter from "../assets/ic Twitter.svg";
import linked from "../assets/ic Linkedin.svg";
import facebook from "../assets/ic Facebook.svg";
import Link from "../assets/Link.svg";

const styles = `
  .ft-footer {
    background: #0A142F;
    padding: 60px 60px 30px 60px;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
  }
  .ft-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr 1.2fr;
    gap: 40px;
    max-width: 1350px;
    margin: 0 auto;
    padding-bottom: 40px;
  }
  .ft-bottom {
    border-top: 1px solid #90A1B9;
    padding-top: 24px;
    text-align: center;
    max-width: 1350px;
    margin: 0 auto;
  }
  .ft-bottom p {
    font-size: 0.89rem;
    color: rgba(255,255,255,0.4);
    margin: 0;
  }
  @media (max-width: 1024px) {
    .ft-grid { grid-template-columns: 1fr 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .ft-grid   { grid-template-columns: 1fr 1fr; }
    .ft-footer { padding: 40px 24px 24px; }
  }
  @media (max-width: 480px) {
    .ft-grid   { grid-template-columns: 1fr; }
    .ft-footer { padding: 32px 16px 20px; }
  }
`;

// الـ pages دي محتاجة login
const PROTECTED_PAGES = ["chatbot", "used-device", "performance", "compare"];

export default function Footer({ setCurrentPage }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleNav = (e, page) => {
    e.preventDefault();
    if (PROTECTED_PAGES.includes(page) && !isLoggedIn) {
      setCurrentPage("signup");
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <footer className="ft-footer">
        <div className="ft-grid">
          {/* Logo & Description */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <img src={logo} alt="TechWise" width="200" height="60" />
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              Empowering users to optimize
              <br />
              their PCs through AI-powered
              <br />
              insights and recommendations.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                color: "#fff",
                margin: "0 0 20px 0",
              }}
            >
              Quick Links
            </h4>
            {[
              { label: "Home", page: "home" },
              { label: "Device Recommendation", page: "chatbot" },
              { label: "Device Evaluation", page: "used-device" },
              { label: "Performance Analysis", page: "performance" },
            ].map((link, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <a
                  onClick={(e) => handleNav(e, link.page)}
                  href="#"
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                color: "#fff",
                margin: "0 0 20px 0",
              }}
            >
              Quick Links
            </h4>
            {[
              { label: "Compare 2 Devices", page: "compare" },
              { label: "Device Upgrade", page: "chatbot" },
              { label: "Smart Tips", page: "smart tips" },
              { label: "Market Trends", page: "market alerts" },
            ].map((link, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <a
                  onClick={(e) => handleNav(e, link.page)}
                  href="#"
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                color: "#fff",
                margin: "0 0 20px 0",
              }}
            >
              Support
            </h4>
            {[
              { label: "Chat with AI bot", page: "chatbot" },
              { label: "FAQ", page: "faq" },
              { label: "About Us", page: "about" },
              { label: "Contact Support", page: "contact" },
            ].map((link, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <a
                  onClick={(e) => handleNav(e, link.page)}
                  href="#"
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                color: "#fff",
                margin: "0 0 20px 0",
              }}
            >
              Contact Info
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <span
                style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}
              >
                support@TechWise.com
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span
                style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}
              >
                +1 (555) 123-4567
              </span>
            </div>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[linked, facebook, Link, twitter].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <img src={icon} alt="social" width="18" height="18" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ft-bottom">
          <p>© 2026 TechWise. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
