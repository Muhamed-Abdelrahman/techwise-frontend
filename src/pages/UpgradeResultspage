import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  Cpu,
  Monitor,
  HardDrive,
  Zap,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import "../styles/UpgradeResultsPage.css";

/* ── helpers ── */
const getPriorityLabel = (score) => {
  if (score >= 85)
    return { label: "High Priority", className: "priority-high" };
  if (score >= 65)
    return { label: "Medium Priority", className: "priority-medium" };
  return { label: "Low Priority", className: "priority-low" };
};

const getDefaultImage = (component = "") => {
  const c = component.toLowerCase();
  if (c.includes("gpu") || c.includes("graphics") || c.includes("graphic"))
    return "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80";
  if (
    c.includes("cpu") ||
    c.includes("processor") ||
    c.includes("ryzen") ||
    c.includes("intel") ||
    c.includes("core")
  )
    return "/images/cpu.jpg";
  if (c.includes("ram") || c.includes("memory") || c.includes("ddr"))
    return "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80";
  if (
    c.includes("ssd") ||
    c.includes("storage") ||
    c.includes("hdd") ||
    c.includes("nvme") ||
    c.includes("drive")
  )
    return "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80";
  if (c.includes("motherboard") || c.includes("mobo") || c.includes("board"))
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80";
  if (
    c.includes("cooling") ||
    c.includes("fan") ||
    c.includes("cooler") ||
    c.includes("aio") ||
    c.includes("heatsink")
  )
    return "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80";
  if (c.includes("power") || c.includes("psu") || c.includes("supply"))
    return "https://images.unsplash.com/photo-1600348712270-5af9e3591a2e?w=400&q=80";
  if (c.includes("case") || c.includes("chassis") || c.includes("tower"))
    return "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&q=80";
  if (c.includes("monitor") || c.includes("display") || c.includes("screen"))
    return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80";
  if (c.includes("keyboard") || c.includes("mouse") || c.includes("peripheral"))
    return "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80";
  if (c.includes("laptop") || c.includes("notebook"))
    return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80";
  if (
    c.includes("wifi") ||
    c.includes("network") ||
    c.includes("ethernet") ||
    c.includes("card")
  )
    return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80";
  /* fallback — generic PC hardware */
  return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80";
};

/* ════════════════════════════════════════════ */
const UpgradeResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.resultsData;

  if (!data) {
    return (
      <div className="results-empty">
        <p>No results found.</p>
        <button onClick={() => navigate("/chat")}>Go Back</button>
      </div>
    );
  }

  const { recommendations = [] } = data;
  const totalPrice = recommendations.reduce((s, r) => s + (r.price || 0), 0);
  const avgScore = recommendations.length
    ? Math.round(
        recommendations.reduce((s, r) => s + (r.score || 0), 0) /
          recommendations.length,
      )
    : 0;

  return (
    <div className="upgrade-results-wrapper">
      <div className="upgrade-page-card">
        {/* ── Header ── */}
        <div className="upgrade-results-header">
          <div className="header-titles">
            <h1>Recommended Upgrades</h1>
            <p>Optimize your system with these performance-boosting upgrades</p>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="upgrade-stats-bar">
          <div className="stat-item">
            <span className="stat-value">${totalPrice.toFixed(2)}</span>
            <span className="stat-label">Total Investment</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value stat-green">+{avgScore}%</span>
            <span className="stat-label">Avg Performance Gain</span>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="upgrade-cards-list">
          {recommendations.map((rec, idx) => {
            const priority = getPriorityLabel(rec.score);
            const reasons = rec.reason?.split("\n").filter(Boolean) || [];
            const progressWidth = Math.min(rec.score || 0, 100);

            return (
              <div key={idx} className="upgrade-card">
                {/* Image */}
                <div className="upgrade-card-image">
                  <img
                    src={rec.image_url || getDefaultImage(rec.component)}
                    alt={rec.component}
                    onError={(e) => {
                      e.target.src = getDefaultImage(rec.component);
                    }}
                  />
                </div>

                {/* Content */}
                <div className="upgrade-card-content">
                  <div className="upgrade-card-title-row">
                    <h3>{rec.component} Upgrade</h3>
                    <span className={`priority-badge ${priority.className}`}>
                      {priority.label}
                    </span>
                  </div>
                  <p className="upgrade-product-name">{rec.product_name}</p>

                  {/* Performance bar */}
                  <div className="performance-row">
                    <span className="performance-label">
                      Performance Improvement
                    </span>
                    <span className="performance-pct">+{rec.score}%</span>
                  </div>
                  <div className="performance-bar-track">
                    <div
                      className="performance-bar-fill"
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>

                  {/* Reasons */}
                  {reasons.length > 0 && (
                    <div className="upgrade-reasons">
                      <p className="reasons-title">Key Benefits:</p>
                      <div className="reasons-grid">
                        {reasons.map((r, i) => (
                          <div key={i} className="reason-item">
                            <CheckCircle size={14} className="reason-icon" />
                            <span>{r.replace(/^•\s*/, "")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Details */}
                  <div className="upgrade-card-actions">
                    <button
                      onClick={() => navigate(`/product/${rec.product_id}`)}
                      className="view-details-btn"
                    >
                      View Details <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="upgrade-card-price">
                  <span className="price-value">${rec.price?.toFixed(2)}</span>
                  <span className="price-roi">Excellent ROI</span>
                  {rec.rating_avg && (
                    <div className="rating-row">
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span>{rec.rating_avg}</span>
                      {rec.rating_count && (
                        <span className="rating-count">
                          ({rec.rating_count})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="upgrade-results-footer">
          <button className="new-rec-btn" onClick={() => navigate("/chatbot")}>
            <ArrowLeft size={16} /> New Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeResultsPage;
