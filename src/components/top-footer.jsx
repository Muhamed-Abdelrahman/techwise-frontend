import React from "react";

const styles = `
  .ft-cta {
    background: #1a4fd6;
    padding: 80px 40px;
    text-align: center;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .ft-cta h2 {
    font-size: 2.4rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 16px 0;
  }
  .ft-cta p {
    font-size: 1rem;
    color: rgba(255,255,255,0.85);
    margin: 0 0 40px 0;
  }
  .ft-cta-btn {
    background: #ffffff;
    color: #1a3a8f;
    border: none;
    border-radius: 12px;
    padding: 18px 48px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }
  .ft-cta-badges {
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }
  .ft-cta-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.9);
    font-size: 0.95rem;
  }
  @media (max-width: 768px) {
    .ft-cta    { padding: 60px 24px; }
    .ft-cta h2 { font-size: 1.8rem; }
  }
  @media (max-width: 480px) {
    .ft-cta        { padding: 48px 16px; }
    .ft-cta h2     { font-size: 1.4rem; }
    .ft-cta-btn    { padding: 14px 28px; font-size: 1rem; }
    .ft-cta-badges { flex-direction: column; align-items: center; gap: 12px; }
  }
`;

export default function Topfooter({ setCurrentPage }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // لو logged in متظهرش خالص
  if (isLoggedIn) return null;

  return (
    <>
      <style>{styles}</style>
      <section className="ft-cta">
        <h2>Ready to make smarter PC decisions?</h2>
        <p>
          Join thousands of users who trust SmartFix for their PC buying,
          selling, and upgrading needs.
        </p>
        <button className="ft-cta-btn" onClick={() => setCurrentPage("signup")}>
          Get Started Now →
        </button>
        <div className="ft-cta-badges">
          {["Free to start", "No credit card required"].map((text, i) => (
            <div key={i} className="ft-cta-badge">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              {text}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
