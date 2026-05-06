import React from "react";
import "./performance-result.css";
import CpuIcon      from "../assets/PerformanceResult_img/CpuIcon.svg";
import MemoryIcon   from "../assets/PerformanceResult_img/MemoryIcon.svg";
import GpuIcon      from "../assets/PerformanceResult_img/GpuIcon.svg";
import StorageIcon  from "../assets/PerformanceResult_img/StorageIcon.svg";
import ScreenIcon   from "../assets/PerformanceResult_img/GpuIcon.svg";

const PerformanceResult = ({ result, onReset }) => {
  if (!result) return null;

  const a = result.ai_analysis || result;

  const overallScore = a.final_score    || 0;
  const cpuScore     = a.cpu_score      || 0;
  const gpuScore     = a.gpu_score      || 0;
  const ramScore     = a.ram_score      || 0;
  const storageScore = a.storage_score  || 0;
  const screenScore  = a.screen_score   || 0;

  const useCases = [
    { label: "Gaming",        score: a.gaming_score,         analysis: a.gaming_analysis,         icon: "🎮" },
    { label: "Programming",   score: a.programming_score,    analysis: a.programming_analysis,    icon: "💻" },
    { label: "Design & Edit", score: a.design_editing_score, analysis: a.design_editing_analysis, icon: "🎨" },
    { label: "Office Work",   score: a.office_work_score,    analysis: a.office_work_analysis,    icon: "📋" },
  ];

    const compIconMap = {
    "CPU Performance":      CpuIcon,
    "Memory Performance":   MemoryIcon,
    "Graphics Performance": GpuIcon,
    "Storage Performance":  StorageIcon,
    "Screen Performance":   ScreenIcon,
  };

  const CompIcon = ({ label }) => (
    <img src={compIconMap[label]} alt={label} className="pr-comp-icon" />
  );

  const components = [
    { label: "CPU Performance",      score: cpuScore     },
    { label: "Memory Performance",   score: ramScore     },
    { label: "Graphics Performance", score: gpuScore     },
    { label: "Storage Performance",  score: storageScore },
    { label: "Screen Performance",   score: screenScore  },
  ];

  const parseList = (str) =>
    (str || "").split(/\n/).map(s => s.replace(/^[\u2022\s]+/, "").trim()).filter(Boolean);

  const pros = parseList(a.advantages);
  const cons = parseList(a.disadvantages);

  const getTier = (s) => {
    if (s >= 90) return { label: "High-End",    color: "#16a34a", bg: "#dcfce7" };
    if (s >= 75) return { label: "Mid-Range",   color: "#2563eb", bg: "#dbeafe" };
    if (s >= 60) return { label: "Entry-Level", color: "#d97706", bg: "#fef3c7" };
    return              { label: "Low-End",     color: "#dc2626", bg: "#fee2e2" };
  };

  const getVerdict = (s) => {
    if (s >= 90) return { label: "Highly Recommended", color: "#fff", bg: "#16a34a" };
    if (s >= 75) return { label: "Recommended",        color: "#fff", bg: "#2563eb" };
    if (s >= 60) return { label: "Average",            color: "#fff", bg: "#d97706" };
    return              { label: "Not Recommended",    color: "#fff", bg: "#dc2626" };
  };

  const getPerf = (s) => {
    if (s >= 90) return "Strong Performance";
    if (s >= 75) return "Good Performance";
    if (s >= 60) return "Average Performance";
    return "Weak Performance";
  };

  const getRating = (s) => {
    if (s >= 90) return { label: "Excellent", color: "#16a34a", bg: "#dcfce7" };
    if (s >= 75) return { label: "Very Good", color: "#2563eb", bg: "#dbeafe" };
    if (s >= 60) return { label: "Good",      color: "#d97706", bg: "#fef3c7" };
    return              { label: "Poor",      color: "#dc2626", bg: "#fee2e2" };
  };

  const getBarColor = (s) => {
    if (s >= 90) return "#16a34a";
    if (s >= 75) return "#2563eb";
    if (s >= 60) return "#d97706";
    return "#dc2626";
  };

  const getComponentDesc = (label, s) => {
    if (s >= 90) {
      const m = {
        "CPU Performance":      "Excellent performance, no upgrade needed",
        "Memory Performance":   "Ideal amount for all workloads",
        "Graphics Performance": "Excellent GPU, handles any task",
        "Storage Performance":  "Fast NVMe SSD, excellent performance",
        "Screen Performance":   "Premium display quality",
      };
      return m[label] || "Excellent, no upgrade needed";
    }
    if (s >= 75) {
      const m = {
        "CPU Performance":      "Good performance for most tasks",
        "Memory Performance":   "Good amount, consider upgrading for heavy workloads",
        "Graphics Performance": "Good GPU for most use cases",
        "Storage Performance":  "Good storage speed",
        "Screen Performance":   "Good display quality",
      };
      return m[label] || "Good performance";
    }
    if (s >= 60) {
      const m = {
        "CPU Performance":      "Average, may bottleneck heavy tasks",
        "Memory Performance":   "Consider upgrading RAM",
        "Graphics Performance": "Limited for gaming or creative work",
        "Storage Performance":  "Consider upgrading to NVMe SSD",
        "Screen Performance":   "Average display, consider upgrade",
      };
      return m[label] || "Average performance";
    }
    return "Upgrade recommended";
  };

  const tier    = getTier(overallScore);
  const verdict = getVerdict(overallScore);


  const RatingIcon = ({ score, color }) => {
    if (score >= 90) return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    );
    if (score >= 75) return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    );
    if (score >= 60) return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
      </svg>
    );
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    );
  };

  return (
    <div className="pr-page">
      <div className="pr-container">
        <div className="pr-main-card">

          {/* Header */}
          <div className="pr-header">
            <h1 className="pr-title">Performance Analysis Complete</h1>
            <p className="pr-subtitle">Comprehensive analysis of your system capabilities</p>
          </div>

          {/* Overall Score */}
          <div className="pr-overall-section">
            <div className="pr-score-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="pr-perf-label">{getPerf(overallScore)}</div>
            <div className="pr-overall-score">Overall Score: <strong>{overallScore}/100</strong></div>
            <span className="pr-tier-badge" style={{ color: tier.color, background: tier.bg }}>
              {tier.label}
            </span>

            <div className="pr-highlights">
              {useCases.map((u) => {
                const r = getRating(u.score);
                return (
                  <div key={u.label} className="pr-highlight-item">
                    <div className="pr-highlight-icon" style={{ background: r.bg }}>
                      <RatingIcon score={u.score} color={r.color} />
                    </div>
                    <div className="pr-highlight-text">
                      <span className="pr-highlight-label">{u.label}</span>
                      <span className="pr-highlight-rating" style={{ color: r.color, background: r.bg }}>
                        {r.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Explanation */}
          {a.conclusion && (
            <div className="pr-inner-card">
              <div className="pr-card-title">Performance Explanation</div>
              <p className="pr-explanation-text">{a.conclusion}</p>
            </div>
          )}

          {/* Performance by Use Case */}
          <div className="pr-inner-card">
            <div className="pr-card-title">Performance by Use Case</div>
            <p className="pr-card-sub">How well your system performs for different types of work</p>
            <div className="pr-usecase-grid">
              {useCases.map((u) => (
                <div key={u.label} className="pr-usecase-item">
                  <div className="pr-usecase-header">
                    <span className="pr-usecase-label">{u.icon} {u.label}</span>
                    <span className="pr-score-badge" style={u.score >= 85
                      ? { background: "#dcfce7", color: "#16a34a" }
                      : { background: "#f3f4f6", color: "#374151" }}>
                      {u.score}/100
                    </span>
                  </div>
                  <div className="pr-bar-track">
                    <div className="pr-bar-fill" style={{ width: u.score + "%", background: "#111827" }} />
                  </div>
                  {u.analysis && <p className="pr-usecase-analysis">{u.analysis}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Component Analysis */}
          <div className="pr-inner-card">
            <div className="pr-card-title">Component Analysis</div>
            <p className="pr-card-sub">Detailed breakdown of each component performance</p>
            <div className="pr-components">
              {components.map((c) => (
                <div key={c.label} className="pr-component-card">
                  <div className="pr-component-header">
                    <span className="pr-component-label">
                      <CompIcon label={c.label} />
                      <strong>{c.label}</strong>
                    </span>
                    <span className="pr-score-badge" style={c.score >= 85
                      ? { background: "#dcfce7", color: "#16a34a" }
                      : { background: "#f3f4f6", color: "#374151" }}>
                      {c.score}/100
                    </span>
                  </div>
                  <div className="pr-bar-track">
                    <div className="pr-bar-fill" style={{ width: c.score + "%", background: "#111827" }} />
                  </div>
                  <p className="pr-component-desc">{getComponentDesc(c.label, c.score)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Verdict */}
          <div className="pr-inner-card pr-verdict-card">
            <div className="pr-verdict-top">
              <div className="pr-verdict-title">Final Verdict</div>
              <div className="pr-verdict-score-wrap">
                <span className="pr-verdict-score">{(overallScore / 10).toFixed(1)}/10</span>
                <span className="pr-verdict-badge" style={{ background: verdict.bg, color: verdict.color }}>
                  {verdict.label}
                </span>
              </div>
            </div>

            <div className="pr-pros-cons">
              <div className="pr-pros">
                <div className="pr-pros-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Pros
                </div>
                {pros.map((p, i) => (
                  <div key={i} className="pr-pro-item">
                    <span className="pr-pro-check">&#10003;</span> {p}
                  </div>
                ))}
              </div>
              <div className="pr-cons">
                <div className="pr-cons-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  Cons
                </div>
                {cons.map((c, i) => (
                  <div key={i} className="pr-con-item">
                    <span className="pr-con-warn">&#9888;</span> {c}
                  </div>
                ))}
              </div>
            </div>

            {a.conclusion && (
              <div className="pr-best-for">
                <div className="pr-best-for-title">Best For:</div>
                <p className="pr-best-for-text">{a.conclusion.split(".")[0]}.</p>
              </div>
            )}
          </div>

          <button className="pr-reset-btn" onClick={onReset}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Analyze New Device
          </button>

        </div>
      </div>
    </div>
  );
};

export default PerformanceResult;