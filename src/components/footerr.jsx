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
    overflow-x: hidden;
    overflow-wrap: break-word;
    word-wrap: break-word;
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

  /* Logo responsive */
  .ft-logo-img {
    height: auto;
    max-width: 180px;
    width: 100%;
    display: block;
  }

  /* Contact info text — يكسر لو طويل */
  .ft-contact-text {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.6);
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* Links */
  .ft-link {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    transition: color 0.15s;
  }
  .ft-link:hover { color: #fff; }

  /* Social icon */
  .ft-social-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.15s;
  }
  .ft-social-circle:hover {
    border-color: rgba(255,255,255,0.4);
  }

  /* ── Tablet ── */
  @media (max-width: 1024px) {
    .ft-grid { grid-template-columns: 1fr 1fr 1fr; gap: 32px; }
    .ft-logo-img { max-width: 160px; }
  }

  /* ── Mobile Large ── */
  @media (max-width: 768px) {
    .ft-footer { padding: 36px 20px 20px; }
    .ft-grid { grid-template-columns: 1fr 1fr; gap: 28px; padding-bottom: 32px; }
    .ft-logo-img { max-width: 140px; }
    .ft-social-circle { width: 36px; height: 36px; }
    .ft-social-circle img { width: 16px; height: 16px; }
  }

  /* ── Mobile Small ── */
  @media (max-width: 540px) {
    .ft-footer { padding: 28px 16px 16px; }
    .ft-grid { grid-template-columns: 1fr; gap: 24px; padding-bottom: 24px; }
    .ft-logo-img { max-width: 120px; }
    .ft-bottom { padding-top: 18px; }
    .ft-bottom p { font-size: 0.8rem; }
  }

  /* ── Very Small ── */
  @media (max-width: 360px) {
    .ft-footer { padding: 24px 12px 14px; }
    .ft-grid { gap: 20px; padding-bottom: 20px; }
    .ft-logo-img { max-width: 100px; }
    .ft-bottom p { font-size: 0.75rem; }
    .ft-social-circle { width: 34px; height: 34px; }
    .ft-social-circle img { width: 14px; height: 14px; }
  }
`;

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

  const renderLinks = (links) =>
    links.map((link, i) => (
      <div key={i} style={{ marginBottom: "12px" }}>
        <a
          className="ft-link"
          onClick={(e) => handleNav(e, link.page)}
          href="#"
        >
          {link.label}
        </a>
      </div>
    ));

  return (
    <>
      <style>{styles}</style>
      <footer className="ft-footer">
        <div className="ft-grid">

          {/* Logo & Description */}
          <div style={{ minWidth: 0 }}>
            <div style={{ marginBottom: "16px" }}>
              <img
                src={logo}
                alt="TechWise"
                className="ft-logo-img"
              />
            </div>
            <p style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: "1.7",
              margin: 0,
            }}>
              Empowering users to optimize their PCs through AI-powered insights and recommendations.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", margin: "0 0 20px 0" }}>
              Quick Links
            </h4>
            {renderLinks([
              { label: "Home", page: "home" },
              { label: "Device Recommendation", page: "chatbot" },
              { label: "Device Evaluation", page: "used-device" },
              { label: "Performance Analysis", page: "performance" },
            ])}
          </div>

          {/* Quick Links 2 */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", margin: "0 0 20px 0" }}>
              Quick Links
            </h4>
            {renderLinks([
              { label: "Compare 2 Devices", page: "compare" },
              { label: "Device Upgrade", page: "chatbot" },
              { label: "Smart Tips", page: "smart-tips" },
              { label: "Market Trends", page: "market-alerts" },
            ])}
          </div>

          {/* Support */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", margin: "0 0 20px 0" }}>
              Support
            </h4>
            {renderLinks([
              { label: "Chat with AI bot", page: "chatbot" },
              { label: "FAQ", page: "faq" },
              { label: "About Us", page: "about" },
              { label: "Contact Support", page: "contact" },
            ])}
          </div>

          {/* Contact Info */}
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", margin: "0 0 20px 0" }}>
              Contact Info
            </h4>

            {/* Email */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", minWidth: 0 }}>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.6)" strokeWidth="2"
                style={{ flexShrink: 0 }}
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <span className="ft-contact-text">support@TechWise.com</span>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", minWidth: 0 }}>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.6)" strokeWidth="2"
                style={{ flexShrink: 0 }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="ft-contact-text">+1 (555) 123-4567</span>
            </div>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[linked, facebook, Link, twitter].map((icon, i) => (
                <div key={i} className="ft-social-circle">
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