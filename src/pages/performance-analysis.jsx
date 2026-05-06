import React, { useState, useRef, useEffect } from "react";
import "../styles/PerformanceAnalysis.css";
import PerformanceResult from "../performance-result/performance-result.jsx";

import DEVICE_DATA from "../data/deviceData";

// ── Searchable Select ──────────────────────────────────────────────────────
const SearchableSelect = ({
  label,
  required,
  placeholder,
  options,
  value,
  onChange,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setQuery("");
    setOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name, value: "" } });
    setQuery("");
  };

  return (
    <div className="pa-field" ref={ref}>
      <label className="pa-label">
        {label} {required && <span className="pa-req">*</span>}
      </label>
      <div className={`pa-select-wrapper${open ? " open" : ""}`}>
        <div className="pa-select-trigger" onClick={() => setOpen((p) => !p)}>
          {open ? (
            <input
              autoFocus
              className="pa-select-search"
              placeholder={`Search ${label}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={value ? "pa-select-value" : "pa-select-placeholder"}
            >
              {value || placeholder}
            </span>
          )}
          <div className="pa-select-icons">
            {value && !open && (
              <span className="pa-clear-btn" onClick={handleClear}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            )}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {open && (
          <div className="pa-dropdown">
            {query && !options.includes(query) && (
              <div
                className="pa-dropdown-item pa-dropdown-custom"
                onClick={() => handleSelect(query)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Use "<strong>{query}</strong>"
              </div>
            )}
            {filtered.length === 0 && !query && (
              <div className="pa-dropdown-empty">
                Start typing to search or enter your own value
              </div>
            )}
            {filtered.map((opt) => (
              <div
                key={opt}
                className={`pa-dropdown-item${value === opt ? " active" : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {value === opt && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const PerformanceAnalysis = () => {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const [form, setForm] = useState({
    user_id: storedUser.userId || storedUser.useId || 1,
    username: storedUser.firstName,
    model: "",
    cpu: "",
    gpu: "",
    memory: "",
    storage: "",
    screen: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  if (result) {
    return (
      <PerformanceResult result={result} onReset={() => setResult(null)} />
    );
  }

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // ── MOCK MODE: set to false when backend is ready ──
  const MOCK = false;

  const MOCK_RESPONSE = {
    user_id: 1,
    username: "ma004q",
    user_req_number: 1,
    model: 'MacBook Pro 16" M3 Pro',
    cpu: "Apple M3 Pro",
    gpu: "Apple 18-core GPU",
    screen: "16-inch Liquid Retina XDR",
    storage: "1TB SSD",
    memory: "32GB Unified Memory",
    ai_analysis: {
      cpu_score: 92,
      gpu_score: 78,
      ram_score: 95,
      storage_score: 90,
      screen_score: 96,
      gaming_score: 75,
      gaming_analysis:
        "M3 Pro handles gaming well via Rosetta 2. Expect 60-90 FPS at High settings. Limited AAA library vs Windows.",
      design_editing_score: 95,
      design_editing_analysis:
        "Crushes creative workflows. 8K ProRes RAW in Final Cut Pro without proxies. Blender Cycles 40% faster than M2.",
      programming_score: 93,
      programming_analysis:
        "Xcode builds 2-3x faster than Intel. 32GB handles multiple IDEs, simulators, Chrome tabs simultaneously.",
      office_work_score: 98,
      office_work_analysis:
        "Handles 50+ Chrome tabs, multiple 4K displays, video calls simultaneously. Battery lasts 18+ hours.",
      final_score: 93,
      advantages:
        "• M3 Pro delivers exceptional CPU performance\n• 32GB unified memory eliminates bottlenecks\n• Liquid Retina XDR: 1600 nits HDR, perfect blacks\n• 18-hour battery life at peak performance\n• Silent operation under most workloads\n• Native ProRes/ProRAW acceleration\n• Instant wake, superior build quality",
      disadvantages:
        "• Gaming library limited vs Windows\n• No CUDA support limits some AI/ML workflows\n• Expensive for basic tasks\n• No user-upgradeable components\n• Limited ports, dongles required\n• Some software still x86-optimized",
      conclusion:
        "The M3 Pro MacBook is a powerhouse for professionals prioritizing creative workflows, development, and productivity. Ideal for creators, developers, executives who value reliability over upgrade flexibility.",
    },
  };

  const handleSubmit = async () => {
    if (!form.cpu || !form.gpu || !form.memory || !form.storage) {
      setError("Please fill in all required fields (CPU, GPU, RAM, Storage).");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    // ── MOCK MODE ──────────────────────────────────────────
    if (MOCK) {
      await new Promise((r) => setTimeout(r, 1500));
      setResult(MOCK_RESPONSE);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // ───────────────────────────────────────────────────────

    try {
      const body = {
        user_id: "user_001",
        username: form.username,
        user_req_number: 0,
        model: form.model || "desktop",
        cpu: form.cpu,
        gpu: form.gpu,
        screen: form.screen || "no screen",
        storage: form.storage,
        memory: form.memory,
      };

      const res = await fetch(
        "https://teck-wise-production.up.railway.app/analysis/CreateAnalysis",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error: ${res.status}`);
      }

      setResult(await res.json());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pa-page">
      <div className="pa-container">
        {/* ── Main Card ── */}
        <div className="pa-main-card">
          {/* Header inside card */}
          <div className="pa-header">
            <h1 className="pa-title">Performance Analysis</h1>
            <p className="pa-subtitle">
              Get a comprehensive analysis of your computer performance across
              different use cases. Identify bottlenecks and discover
              optimization opportunities.
            </p>
          </div>

          {/* ── System Specifications ── */}
          <div className="pa-section-title">System Specifications</div>
          <p className="pa-section-sub">
            Enter your device specifications to get a detailed performance
            analysis
          </p>

          <div className="pa-fields-wrap">
            {/* Device Type + GPU */}
            <div className="pa-form-row two-col">
              <SearchableSelect
                label="Device Type"
                name="model"
                placeholder="Select your Device Type"
                options={DEVICE_DATA.models}
                value={form.model}
                onChange={handleChange}
              />
              <SearchableSelect
                label="GPU"
                required
                name="gpu"
                placeholder="Select your GPU"
                options={DEVICE_DATA.gpus}
                value={form.gpu}
                onChange={handleChange}
              />
            </div>

            {/* Storage + RAM */}
            <div className="pa-form-row two-col">
              <SearchableSelect
                label="Storage"
                required
                name="storage"
                placeholder="Select your Storage needed"
                options={DEVICE_DATA.storage}
                value={form.storage}
                onChange={handleChange}
              />
              <SearchableSelect
                label="RAM"
                required
                name="memory"
                placeholder="Select your RAM needed"
                options={DEVICE_DATA.memory}
                value={form.memory}
                onChange={handleChange}
              />
            </div>

            {/* CPU + Screen Size */}
            <div className="pa-form-row two-col">
              <SearchableSelect
                label="CPU"
                required
                name="cpu"
                placeholder="Select your needed CPU"
                options={DEVICE_DATA.cpus}
                value={form.cpu}
                onChange={handleChange}
              />
              <SearchableSelect
                label="Screen Size"
                name="screen"
                placeholder="Select your Screen Size Needed"
                options={DEVICE_DATA.screens}
                value={form.screen}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <div className="pa-error">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
        </div>
        {/* end pa-main-card */}

        {/* ── Submit outside card ── */}
        <button
          className="pa-submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="pa-spinner" /> Analyzing...
            </>
          ) : (
            <>
              Analyze Performance <span className="pa-arrow">&#8594;</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
