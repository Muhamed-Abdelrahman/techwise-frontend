import React from "react";
import "./comparison-result-page.css";

const ComparisonResultPage = ({ result, onReset }) => {
  if (!result) return null;

  const { device_a: reqA, device_b: reqB, ai_comparison } = result;
  const a = ai_comparison.device_a;
  const b = ai_comparison.device_b;
  const comp_result = ai_comparison.comp_result || "";

  const priceA = a.price || reqA?.price;
  const priceB = b.price || reqB?.price;

  const overallWinnerIsA = a.final_score >= b.final_score;
  const winnerName  = overallWinnerIsA ? a.model : b.model;
  const winnerScore = overallWinnerIsA ? a.final_score : b.final_score;
  const winnerReason = comp_result.split(/(?<=[.!])\s+/).slice(0,2).join(" ");

  // Core metrics
  const coreMetrics = [
    { label: "CPU Performance",  scoreA: a.cpu_score,     scoreB: b.cpu_score     },
    { label: "GPU Performance",  scoreA: a.gpu_score,     scoreB: b.gpu_score     },
    { label: "RAM Speed",        scoreA: a.ram_score,     scoreB: b.ram_score     },
    { label: "Storage Speed",    scoreA: a.storage_score, scoreB: b.storage_score },
    { label: "Screen Quality",   scoreA: a.screen_score,  scoreB: b.screen_score  },
  ];

  // Use case metrics with analysis
  const useCaseMetrics = [
    a.gaming_score        != null && { label: "Gaming",           icon: "🎮", scoreA: a.gaming_score,        scoreB: b.gaming_score,        analysisA: a.gaming_analysis,        analysisB: b.gaming_analysis        },
    a.design_editing_score != null && { label: "Design & Editing", icon: "🎨", scoreA: a.design_editing_score, scoreB: b.design_editing_score, analysisA: a.design_editing_analysis, analysisB: b.design_editing_analysis },
    a.programming_score   != null && { label: "Programming",      icon: "💻", scoreA: a.programming_score,   scoreB: b.programming_score,   analysisA: a.programming_analysis,   analysisB: b.programming_analysis   },
    a.office_work_score   != null && { label: "Office Work",       icon: "📋", scoreA: a.office_work_score,   scoreB: b.office_work_score,   analysisA: a.office_work_analysis,   analysisB: b.office_work_analysis   },
  ].filter(Boolean);

  // Pros & Cons — read directly from device object (advantages/disadvantages fields)
  const parseLines = (str) => str
    ? str.split("\n").map(s => s.replace(/^[•\-]\s*/, "").trim()).filter(Boolean)
    : [];

  const prosA = parseLines(a.advantages);
  const consA = parseLines(a.disadvantages);
  const prosB = parseLines(b.advantages);
  const consB = parseLines(b.disadvantages);

  const ScoreBar = ({ score, winner }) => (
    <div className="crp-bar-wrap">
      <div className="crp-bar-track">
        <div className="crp-bar-fill" style={{ width: `${score}%`, background: winner ? "#2563eb" : "#d1d5db" }} />
      </div>
      <span className={`crp-bar-score ${winner ? "crp-bar-score-win" : ""}`}>{score}/100</span>
    </div>
  );

  return (
    <div className="crp-page">
      <div className="crp-container">

        {/* Header */}
        <div className="crp-header">
          <h1 className="crp-title">Compare Devices</h1>
          <p className="crp-subtitle">Make informed decisions by comparing specifications, performance, and value of different computers side by side.</p>
        </div>

        {/* Device cards */}
        <div className="crp-devices-row">
          {[{d: a, price: priceA}, {d: b, price: priceB}].map(({d, price}, idx) => {
            const valueScore = Math.round((d.final_score * 0.7) + ((price ? Math.max(0, 100 - price / 50) : 50) * 0.3));
            const overallColor = d.final_score >= 85 ? "#16a34a" : d.final_score >= 70 ? "#d97706" : "#dc2626";
            const valueColor   = valueScore   >= 75 ? "#16a34a" : valueScore   >= 55 ? "#d97706" : "#dc2626";
            return (
              <div key={idx} className="crp-device-card">
                <div className="crp-device-img-wrap">
                  <div className="crp-device-img-placeholder">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                </div>
                <div className="crp-device-info">
                  <div className="crp-device-name">{d.model}</div>
                  <div className="crp-device-price-row">
                    {price && <span className="crp-device-price">${price.toLocaleString()}</span>}
                  </div>
                  <div className="crp-device-scores-row">
                    <div className="crp-device-score-item">
                      <span className="crp-score-label">Overall Score</span>
                      <span className="crp-score-val" style={{color: overallColor}}>{d.final_score}/100</span>
                    </div>
                    <div className="crp-device-score-item">
                      <span className="crp-score-label">Value Score</span>
                      <span className="crp-score-val" style={{color: valueColor}}>{valueScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Comparison Table */}
        <div className="crp-table-card">
          <div className="crp-table-header-block">
            <div className="crp-table-title">Comparison Results</div>
            <div className="crp-table-sub">Detailed performance comparison across key metrics</div>
          </div>
          <table className="crp-table">
            <thead>
              <tr>
                <th className="crp-th crp-th-cat">Category</th>
                <th className="crp-th crp-th-a">Device A</th>
                <th className="crp-th crp-th-b">Device B</th>
                <th className="crp-th crp-th-w">Winner</th>
              </tr>
            </thead>
            <tbody>
              {coreMetrics.map((m) => {
                const aWins = m.scoreA >= m.scoreB;
                const diff  = Math.abs(m.scoreA - m.scoreB);
                return (
                  <tr key={m.label} className="crp-tr">
                    <td className="crp-td crp-td-cat">{m.label}</td>
                    <td className="crp-td">
                      <div className="crp-score-cell">
                        <span className={aWins && diff > 0 ? "crp-score-bold" : "crp-score-dim"}>{m.scoreA}/100</span>
                        {aWins && diff > 0 && <span className="crp-trophy">🏆</span>}
                      </div>
                    </td>
                    <td className="crp-td">
                      <div className="crp-score-cell">
                        <span className={!aWins && diff > 0 ? "crp-score-bold" : "crp-score-dim"}>{m.scoreB}/100</span>
                        {!aWins && diff > 0 && <span className="crp-trophy">🏆</span>}
                      </div>
                    </td>
                    <td className="crp-td">
                      {diff > 0 && (
                        <span className={`crp-diff-badge ${aWins ? "crp-badge-a" : "crp-badge-b"}`}>+{diff}%</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Use Case Analysis */}
        {useCaseMetrics.length > 0 && (
          <div className="crp-usecase-section">
            <div className="crp-usecase-title">Use Case Analysis</div>
            <div className="crp-usecase-grid">
              {useCaseMetrics.map((m) => {
                const aWins = m.scoreA >= m.scoreB;
                return (
                  <div key={m.label} className="crp-usecase-card">
                    <div className="crp-usecase-card-header">
                      <span className="crp-usecase-icon">{m.icon}</span>
                      <span className="crp-usecase-label">{m.label}</span>
                      <span className={`crp-usecase-winner-badge ${aWins ? "crp-uw-a" : "crp-uw-b"}`}>
                        {aWins ? "Device A Wins" : "Device B Wins"}
                      </span>
                    </div>
                    <div className="crp-usecase-scores">
                      <div className="crp-usecase-device-row">
                        <span className="crp-usecase-device-name">{a.model}</span>
                        <ScoreBar score={m.scoreA} winner={aWins} />
                      </div>
                      {m.analysisA && <p className="crp-usecase-analysis">{m.analysisA}</p>}
                      <div className="crp-usecase-divider" />
                      <div className="crp-usecase-device-row">
                        <span className="crp-usecase-device-name">{b.model}</span>
                        <ScoreBar score={m.scoreB} winner={!aWins} />
                      </div>
                      {m.analysisB && <p className="crp-usecase-analysis">{m.analysisB}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <div className="crp-rec-card">
          <div className="crp-rec-top">
            <span className="crp-rec-trophy">🏆</span>
            <span className="crp-rec-label">Recommendation</span>
          </div>
          <div className="crp-rec-body">
            <div className="crp-rec-winner">{winnerName} Wins!</div>
            <div className="crp-rec-reason">{winnerReason}</div>
            <div className="crp-rec-score-badge">Overall Score: {winnerScore}/100</div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="crp-proscons-row">
          {[{d: a, pros: prosA, cons: consA}, {d: b, pros: prosB, cons: consB}].map(({d, pros, cons}) => (
            <div key={d.model} className="crp-proscons-card">
              <div className="crp-proscons-title">{d.model}</div>
              <div className="crp-pros-label">Pros</div>
              {pros.map((p, i) => (
                <div key={i} className="crp-pro-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  {p}
                </div>
              ))}
              <div className="crp-cons-label">Cons</div>
              {cons.map((c, i) => (
                <div key={i} className="crp-con-item">
                  <span className="crp-con-x">✕</span>{c}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Reset */}
        <button className="crp-reset-btn" onClick={onReset}>Compare Different Devices</button>

      </div>
    </div>
  );
};

export default ComparisonResultPage;