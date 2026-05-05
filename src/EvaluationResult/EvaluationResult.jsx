import React, { useState } from "react";
import "./EvaluationResult.css";

/* ── Reusable bar ── */
const MarketBar = ({ label, score }) => (
  <div className="evr-mbar-row">
    <div className="evr-mbar-top">
      <span className="evr-mbar-label">{label}</span>
      <span className="evr-mbar-pct">{score}%</span>
    </div>
    <div className="evr-mbar-track">
      <div className="evr-mbar-fill" style={{ width: `${score}%` }} />
    </div>
  </div>
);

/* ══════════════════════════════════════════════════ */
const EvaluationResult = ({ result: resultProp, onReset }) => {
  const result = resultProp || MOCK_RESULT;

  const { condition, ai_pricing } = result;
  const price        = ai_pricing?.price         || 0;
  const priceText    = ai_pricing?.pricing_result || "";
  const marketStatus = ai_pricing?.market_status  || "stable";
  const deprecation  = ai_pricing?.deprecation    ?? null;
  const cpuScore     = ai_pricing?.cpu_score      ?? null;
  const gpuScore     = ai_pricing?.gpu_score      ?? null;
  const ramScore     = ai_pricing?.ram_score      ?? null;
  const storageScore = ai_pricing?.storage_score  ?? null;

  const low = Math.round((price * 0.88) / 50) * 50;
  const high = Math.round((price * 1.12) / 50) * 50;

  const [activeTab, setActiveTab] = useState("preparation");

  /* derive recommendation sentence */
  const sentences = priceText
    .split(/(?<=[.!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);
  const recommendation = sentences.find(
    (s) =>
      s.toLowerCase().includes("recommend") ||
      s.toLowerCase().includes("listing")
  );

  /* market status badge colors */
  const statusColor =
    marketStatus === "high demand" ? "#16a34a"
    : marketStatus === "low demand" ? "#dc2626"
    : "#d97706";
  const statusBg =
    marketStatus === "high demand" ? "#dcfce7"
    : marketStatus === "low demand" ? "#fef2f2"
    : "#fef3c7";

  /* build quality score from condition text */
  const condLower = (condition || "").toLowerCase();
  const buildScore =
    condLower.includes("very good") || condLower.includes("like new") || condLower.includes("no single")
      ? 90
      : condLower.includes("good") ? 75
      : condLower.includes("fair") ? 60
      : 50;

  /* memory & storage combined */
  const memStorageScore =
    ramScore != null && storageScore != null
      ? Math.round((ramScore + storageScore) / 2)
      : ramScore ?? storageScore ?? null;

  /* ── static tips data ── */
  const preparationSteps = [
    { num: 1, title: "Backup Your Data",          desc: "Create a complete backup of all important files, documents, photos, and settings. Use cloud storage or an external drive.", tags: ["Cloud Backup", "External Drive", "Time Machine"] },
    { num: 2, title: "Sign Out of All Accounts",  desc: "Remove all personal accounts including iCloud, Google, Microsoft, Adobe, and other services.", bullets: ["Apple ID / iCloud (for Mac)", "Microsoft Account", "Google Chrome sync", "Adobe Creative Cloud", "Password managers"] },
    { num: 3, title: "Factory Reset",             desc: "Perform a complete factory reset to wipe all personal data and restore to original settings.", warning: "This cannot be undone. Make sure your backup is complete!" },
    { num: 4, title: "Clean & Inspect",           desc: "Physically clean your device inside and out. A clean device photographs better and commands higher prices.", grid: ["Screen & keyboard", "Exterior casing", "Remove dust", "Check for damage"] },
    { num: 5, title: "Gather Original Accessories", desc: "Include all original accessories, packaging, and documentation if available. This increases value by 15-20%.", tags: ["Original Box", "Charger", "Cables", "Manual", "Warranty Card"] },
  ];

  const pricingBestPractices = [
    { title: "Research Comparable Listings", desc: "Check eBay sold listings, Swappa, and Facebook Marketplace for similar devices to validate pricing." },
    { title: "Use Psychological Pricing",    desc: `Price at $${price - 1} instead of $${price}. Buyers perceive it as a better deal.` },
    { title: "Leave Negotiation Room",       desc: "Start 10-15% higher than your minimum acceptable price to allow for offers." },
    { title: "Consider Timing",             desc: "List before new model releases. Prices typically drop 15-20% after new launches." },
    { title: "Bundle Strategy",             desc: "Include accessories, software, or peripherals to justify a higher price point." },
  ];

  const pricingMistakes = [
    "Pricing too high initially - listings get stale after 2 weeks",
    "Not researching current market prices",
    "Ignoring the impact of condition on value",
    "Pricing without factoring in platform fees (eBay: 12-15%, Mercari: 10%)",
    "Refusing all offers - be flexible within reason",
  ];

  const platforms = [
    {
      name: "eBay", color: "#2563eb",
      tags: [{ label: "Best for Tech", color: "#16a34a", bg: "#dcfce7" }, { label: "Large Audience", color: "#374151", bg: "#f3f4f6" }],
      desc: "Largest marketplace for electronics. Great for older/rare devices with international reach.",
      fees: "12.9% + $0.30", saleTime: "2-3 weeks",
      pros: ["Buyer protection builds trust", "Auction or fixed price options"],
      cons: ["Higher fees than other platforms"],
      url: "https://ebay.com",
    },
    {
      name: "Swappa", color: "#16a34a",
      tags: [{ label: "Tech Specialists", color: "#fff", bg: "#2563eb" }, { label: "Safe Trading", color: "#374151", bg: "#f3f4f6" }],
      desc: "Dedicated electronics marketplace with strict quality standards and verification process.",
      fees: "3% + $5", saleTime: "1-2 weeks",
      pros: ["Much lower fees than eBay", "Serious buyers, less haggling"],
      cons: ["Smaller audience than eBay"],
      url: "https://swappa.com",
    },
    {
      name: "Facebook Marketplace", color: "#7c3aed",
      tags: [{ label: "Local Sales", color: "#fff", bg: "#7c3aed" }, { label: "No Fees", color: "#374151", bg: "#f3f4f6" }],
      desc: "Perfect for local, in-person sales. No shipping hassle and instant payment.",
      fees: "FREE", feesGreen: true, saleTime: "1-3 weeks",
      pros: ["No platform fees or shipping", "Cash payment, meet in person"],
      cons: ["More time-wasters and lowball offers"],
      url: "https://facebook.com/marketplace",
    },
  ];

  /* ════════════════════════════════ RENDER ════════════════════════════════ */
  return (
    <div className="evr-page">
      <div className="evr-container">

        {/* ── Header ── */}
        <div className="evr-header">
          <h1 className="evr-title">Evaluation Complete!</h1>
          <p className="evr-subtitle">Based on current market data and your device specifications</p>
        </div>

        {/* ════════ Estimated Market Value ════════ */}
        <div className="evr-section">
          <div className="evr-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Estimated Market Value
          </div>

          <div className="evr-price-block">
            <div className="evr-price-main">${low} - ${high}</div>
            <div className="evr-price-avg">Average: <strong>${price}</strong></div>

            <div className="evr-stats-row">
              {/* Market Trend */}
              <div className="evr-stat-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                </svg>
                <div className="evr-stat-label">Market Trend</div>
                <div className="evr-stat-value" style={{ color: statusColor }}>
                  {marketStatus.charAt(0).toUpperCase() + marketStatus.slice(1)}
                </div>
              </div>
              {/* Depreciation */}
              <div className="evr-stat-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div className="evr-stat-label">Depreciation</div>
                <div className="evr-stat-value">{deprecation}% from new</div>
              </div>

            </div>
          </div>
        </div>

        {/* ════════ AI Pricing Analysis ════════ */}
        <div className="evr-section">
          <div className="evr-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            AI Pricing Analysis
          </div>
          <div className="evr-analysis-body">
            {sentences.filter(s => s.length > 10).map((s, i) => (
              <div key={i} className="evr-analysis-sentence">
                <span className="evr-analysis-dot" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════ Market Analysis ════════ */}
        <div className="evr-section evr-market-section">
          <div className="evr-market-header">
            <div className="evr-market-title">Market Analysis</div>
            <div className="evr-market-sub">Detailed breakdown of factors affecting your device's value</div>
          </div>
          <div className="evr-market-bars">
            {cpuScore     != null && <MarketBar label="CPU Performance"       score={cpuScore} />}
            {memStorageScore != null && <MarketBar label="Memory & Storage"   score={memStorageScore} />}
            {gpuScore     != null && <MarketBar label="Graphics Performance"  score={gpuScore} />}
            <MarketBar label="Build Quality & Condition" score={buildScore} />
          </div>
        </div>

        {/* ── Small reset button before static ── */}
        <div className="evr-before-static-row">
          <button className="evr-reset-small-btn" onClick={onReset}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Evaluate another device
          </button>
        </div>

        {/* ════════ Smart Selling Tips ════════ */}
        <div className="evr-section">
          <div className="evr-tips-header">
            <div className="evr-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Smart Selling Tips
            </div>
            <div className="evr-tips-sub">Maximize your device value with these expert tips</div>

          </div>

          {/* Tabs */}
          <div className="evr-tabs">
            {["preparation", "pricing", "where"].map((tab) => (
              <button key={tab} className={`evr-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab === "preparation" ? "Preparation" : tab === "pricing" ? "Pricing" : "Where to Sell"}
              </button>
            ))}
          </div>

          {/* ── Preparation ── */}
          {activeTab === "preparation" && (
            <div className="evr-tab-content">
              <div className="evr-checklist-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
                Device Preparation Checklist
              </div>
              {preparationSteps.map((step) => (
                <div key={step.num} className="evr-step-card">
                  <div className="evr-step-header">
                    <span className="evr-step-num">{step.num}</span>
                    <span className="evr-step-title">{step.title}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <p className="evr-step-desc">{step.desc}</p>
                  {step.warning && (
                    <div className="evr-step-warning">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span><strong>Important:</strong> {step.warning}</span>
                    </div>
                  )}
                  {step.bullets && (
                    <div className="evr-step-bullets">
                      {step.bullets.map((b, i) => <div key={i}>• {b}</div>)}
                    </div>
                  )}
                  {step.tags && (
                    <div className="evr-step-tags">
                      {step.tags.map((t) => <span key={t} className="evr-tag">{t}</span>)}
                    </div>
                  )}
                  {step.grid && (
                    <div className="evr-step-grid">
                      {step.grid.map((g) => (
                        <div key={g} className="evr-step-grid-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                          {g}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Pricing ── */}
          {activeTab === "pricing" && (
            <div className="evr-tab-content">
              <div className="evr-checklist-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                Pricing Strategy
              </div>

              <div className="evr-pricing-range-card">
                <div className="evr-pricing-range-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Your Recommended Price Range
                </div>
                <div className="evr-pricing-range-num">${low} - ${high}</div>
                <p className="evr-pricing-range-sub">Based on current market analysis, we recommend listing at <strong>${price}</strong> for optimal results.</p>
                <div className="evr-pricing-tiers">
                  <div className="evr-pricing-tier"><span>Quick sale (1-2 weeks):</span><strong>${low}</strong></div>
                  <div className="evr-pricing-tier"><span>Optimal price:</span><strong>${price}</strong></div>
                  <div className="evr-pricing-tier"><span>Patient seller (4-6 weeks):</span><strong>${high}</strong></div>
                </div>
              </div>

              <div className="evr-practices-card">
                <div className="evr-practices-title">Pricing Best Practices</div>
                {pricingBestPractices.map((p, i) => (
                  <div key={i} className="evr-practice-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <div>
                      <div className="evr-practice-title">{p.title}</div>
                      <div className="evr-practice-desc">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="evr-mistakes-card">
                <div className="evr-mistakes-title">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Avoid These Pricing Mistakes
                </div>
                {pricingMistakes.map((m, i) => (
                  <div key={i} className="evr-mistake-item">
                    <span className="evr-mistake-x">&#10060;</span> {m}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Where to Sell ── */}
          {activeTab === "where" && (
            <div className="evr-tab-content">
              <div className="evr-checklist-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Best Platforms to Sell
              </div>
              {platforms.map((p) => (
                <div key={p.name} className="evr-platform-card" style={{ borderColor: p.color }}>
                  <div className="evr-platform-header">
                    <div>
                      <div className="evr-platform-name">{p.name}</div>
                      <div className="evr-platform-tags">
                        {p.tags.map((t) => (
                          <span key={t.label} className="evr-platform-tag" style={{ background: t.bg, color: t.color }}>{t.label}</span>
                        ))}
                      </div>
                    </div>
                    <span className="evr-platform-star">&#9733;</span>
                  </div>
                  <p className="evr-platform-desc">{p.desc}</p>
                  <div className="evr-platform-meta">
                    <div>
                      <div className="evr-meta-label">Fees</div>
                      <div className="evr-meta-val" style={p.feesGreen ? { color: "#16a34a", fontWeight: 700 } : {}}>{p.fees}</div>
                    </div>
                    <div>
                      <div className="evr-meta-label">Avg Sale Time</div>
                      <div className="evr-meta-val">{p.saleTime}</div>
                    </div>
                  </div>
                  {p.pros.map((pr) => (
                    <div key={pr} className="evr-platform-pro">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      {pr}
                    </div>
                  ))}
                  {p.cons.map((co) => (
                    <div key={co} className="evr-platform-con">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {co}
                    </div>
                  ))}
                  <a href={p.url} target="_blank" rel="noreferrer" className="evr-platform-visit">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Visit {p.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>



        {/* ── Footer Button ── */}
        <button className="evr-footer-btn" onClick={onReset}>
          Evaluate Another Device
        </button>

      </div>
    </div>
  );
};

export default EvaluationResult;