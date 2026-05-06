import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ExternalLink,
  Cpu,
  Monitor,
  HardDrive,
  Zap,
  CheckCircle,
} from "lucide-react";
import "../styles/Laptopresultspage.css";

const LaptopResultsPage = () => {
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

  const { recommendations = [], purpose, budget } = data;

  /* ── shorten product name ── */
  const shortenName = (name = "") => {
    const cutPatterns = [
      /\s*[-–,]\s*\d+GB.*/i,
      /\s*[-–,]\s*Intel.*/i,
      /\s*[-–,]\s*AMD.*/i,
      /\s*[-–,]\s*NVIDIA.*/i,
      /\s*[-–,]\s*GeForce.*/i,
      /\s*\(?\d{4}\)?$/,
      /\s+\d+GB\s+DDR.*/i,
    ];
    let shortened = name;
    for (const pattern of cutPatterns) {
      shortened = shortened.replace(pattern, "");
    }
    return shortened.trim();
  };

  /* ── extract specs from product name ── */
  const extractSpecs = (name = "") => {
    const specs = [];
    const cpuMatch = name.match(/(Intel Core\s+\S+|AMD Ryzen\s+\d+\s+\S+)/i);
    const ramMatch = name.match(/(\d+\s*GB\s*DDR\d)/i);
    const storageMatch = name.match(
      /(\d+\s*(?:GB|TB)\s*(?:PCIe\s*|NVMe\s*)?SSD)/i,
    );
    const gpuMatch = name.match(
      /((?:GeForce\s+)?RTX\s*\d+\w*|(?:GeForce\s+)?GTX\s*\d+\w*|Radeon\s+RX\s*\d+\w*)/i,
    );

    if (cpuMatch)
      specs.push({
        icon: <Cpu size={14} />,
        label: "CPU",
        value: cpuMatch[1].replace(/\s+/g, " "),
      });
    if (gpuMatch)
      specs.push({
        icon: <Monitor size={14} />,
        label: "GPU",
        value: gpuMatch[1].replace(/\s+/g, " "),
      });
    if (ramMatch)
      specs.push({ icon: <Zap size={14} />, label: "RAM", value: ramMatch[1] });
    if (storageMatch)
      specs.push({
        icon: <HardDrive size={14} />,
        label: "Storage",
        value: storageMatch[1],
      });

    return specs;
  };

  const getMatchColor = (score) => {
    if (score >= 85) return "match-green";
    if (score >= 70) return "match-blue";
    return "match-gray";
  };

  const fakeOriginal = (price) =>
    price ? `$${(price * 1.25).toFixed(0)}` : null;

  return (
    <div className="laptop-results-wrapper">
      {/* ── Header ── */}
      <div className="laptop-results-header">
        <button className="back-btn-l" onClick={() => navigate("/chat")}>
          <ArrowLeft size={18} /> New Recommendations
        </button>
        <h1>Perfect Matches found!</h1>
        <p>
          Based on your {purpose?.toLowerCase() || "design"} needs and{" "}
          {budget || "mid-range"} budget, here are our top recommendations:
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="laptop-cards-list">
        {recommendations.map((rec, idx) => {
          const specs = extractSpecs(rec.product_name);
          const reasons = rec.reason?.split("\n").filter(Boolean) || [];
          const origPrice = fakeOriginal(rec.price);

          return (
            <div key={idx} className="laptop-card">
              {/* Image */}
              <div className="laptop-card-image">
                {rec.image_url ? (
                  <img src={rec.image_url} alt={rec.product_name} />
                ) : (
                  <div className="laptop-img-placeholder">
                    <Monitor size={48} color="#94a3b8" />
                  </div>
                )}
                <div className="laptop-badges">
                  <span className="badge-best-value">Best Value</span>
                  <span className={`badge-match ${getMatchColor(rec.score)}`}>
                    {rec.score}% Match
                  </span>
                </div>
              </div>

              {/* Main content */}
              <div className="laptop-card-content">
                {/* Title + Price */}
                <div className="laptop-card-top">
                  <div className="laptop-title-section">
                    <h3>
                      {shortenName(rec.product_name) || `Laptop #${idx + 1}`}
                    </h3>
                    {rec.rating_avg && (
                      <div className="laptop-rating">
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{rec.rating_avg}</span>
                        {rec.rating_count && (
                          <span className="rating-count">
                            ({rec.rating_count.toLocaleString()} reviews)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="laptop-price-section">
                    <span className="laptop-price">
                      ${rec.price?.toFixed(2)}
                    </span>
                    {origPrice && (
                      <span className="laptop-price-original">{origPrice}</span>
                    )}
                  </div>
                </div>

                {/* Specs */}
                {specs.length > 0 && (
                  <div className="laptop-specs-row">
                    {specs.map((spec, i) => (
                      <div key={i} className="spec-chip">
                        <span className="spec-icon">{spec.icon}</span>
                        <div className="spec-text">
                          <span className="spec-label">{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reasons */}
                {reasons.length > 0 && (
                  <div className="laptop-reasons">
                    <p className="reasons-title-l">Key Advantages:</p>
                    <div className="laptop-reasons-list">
                      {reasons.map((r, i) => (
                        <div key={i} className="laptop-reason-item">
                          <CheckCircle size={14} className="reason-icon-l" />
                          <span>{r.replace(/^•\s*/, "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Details */}
                <div className="laptop-card-actions">
                  <button
                    onClick={() => navigate(`/product/${rec.product_id}`)}
                    className="view-details-btn"
                  >
                    View Details <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="laptop-results-footer">
        <button className="new-rec-btn-l" onClick={() => navigate("/chatbot")}>
          <ArrowLeft size={16} /> New Recommendations
        </button>
      </div>
    </div>
  );
};

export default LaptopResultsPage;