import React, { useState, useRef, useEffect } from "react";
import HardwareSpecsIcon from "../assets/EvalutationPrice_img/CpuIcon.svg";
import DeviceConditionIcon from "../assets/EvalutationPrice_img/device-condition.svg";
import PhotosUploadIcon from "../assets/EvalutationPrice_img/photos-upload.svg";
import UploadCloudIcon from "../assets/EvalutationPrice_img/upload-cloud.svg";
import ConditionPoorIcon from "../assets/EvalutationPrice_img/BrokenScreenIcon.svg";
import ConditionFairIcon from "../assets/EvalutationPrice_img/CrackedBackIcon.svg";
import ConditionGoodIcon from "../assets/EvalutationPrice_img/ScratchesIcon.svg";
import ConditionLikeNewIcon from "../assets/EvalutationPrice_img/LikeNewIcon.svg";
import EvaluationResult from "../EvaluationResult/EvaluationResult";
import "../styles/UsedDeviceEvaluation.css";
import DEVICE_DATA from "../data/deviceData";

// ── Searchable Dropdown ────────────────────────────────────────────────────
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
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleSelect = (opt) => {
    onChange({ target: { name, value: opt } });
    setQuery("");
    setOpen(false);
  };
  const handleClear = (e) => {
    e.stopPropagation();
    onChange({ target: { name, value: "" } });
    setQuery("");
  };

  return (
    <div className="ude-field" ref={ref} style={{ position: "relative" }}>
      <label className="ude-label">
        {label} {required && <span className="ude-req">*</span>}
      </label>
      <div className={`ude-select-wrapper${open ? " open" : ""}`}>
        <div className="ude-select-trigger" onClick={() => setOpen((p) => !p)}>
          {open ? (
            <input
              autoFocus
              className="ude-select-search"
              placeholder={`Search ${label}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={value ? "ude-select-value" : "ude-select-placeholder"}
            >
              {value || placeholder}
            </span>
          )}
          <div className="ude-select-icons">
            {value && !open && (
              <span className="ude-clear-btn" onClick={handleClear}>
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
          <div className="ude-dropdown">
            {query && !options.includes(query) && (
              <div
                className="ude-dropdown-item ude-dropdown-custom"
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
              <div className="ude-dropdown-empty">
                Start typing to search or enter your own value
              </div>
            )}
            {filtered.map((opt) => (
              <div
                key={opt}
                className={`ude-dropdown-item${value === opt ? " active" : ""}`}
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
const UsedDeviceEvaluation = () => {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const [form, setForm] = useState({
    user_id: storedUser.userId || 1,
    username: storedUser.firstName,
    model: "",
    cpu: "",
    gpu: "",
    storage: "",
    memory: "",
    screen: "",
    usage_duration_months: "",
    condition: "",
    image: null,
  });
  const [selectedCondition, setSelectedCondition] = useState("");
  const [photos, setPhotos] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(() => {
    try {
      const s = sessionStorage.getItem("ude_result");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });
  const [error, setError] = useState(null);

  const conditionMap = {
    Poor: "poor condition with significant damage",
    Fair: "fair condition with visible wear and some issues",
    Good: "good condition with minor scratches, fully functional",
    "Like New": "very good no single problem",
  };

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handlePhotoChange = (e) => {
    const f = Array.from(e.target.files).slice(0, 1);
    setPhotos(f);
    if (f.length) setForm((p) => ({ ...p, image: f[0] }));
  };
  const handleRemovePhoto = () => {
    setPhotos([]);
    setForm((p) => ({ ...p, image: null }));
  };
  const handleConditionSelect = (lbl) => {
    setSelectedCondition(lbl);
    setForm((p) => ({ ...p, condition: conditionMap[lbl] }));
  };

  const MOCK = false;
  const MOCK_RESPONSE = {
    user_id: 1,
    username: "ma004q",
    user_req_number: 34,
    model: "Lenovo Legion 5 Pro",
    cpu: "Intel Core i7-13700HX",
    gpu: "NVIDIA RTX 4070 8GB",
    screen: "16-inch QHD 165Hz",
    storage: "1TB NVMe SSD",
    memory: "32GB DDR5",
    usage_duration_months: 13,
    condition: "not a singal problem ver good and new",
    img_url:
      "https://res.cloudinary.com/dmq2mjcgm/image/upload/v1773245985/device_pricing/nns1mawz9ntqvtliqy9i.jpg",
    created_at: new Date().toISOString(),
    ai_pricing: {
      price: 1350,
      market_status: "high demand",
      deprecation: 35,
      cpu_score: 88,
      gpu_score: 85,
      ram_score: 95,
      storage_score: 85,
      pricing_result:
        "Current NEW Legion 5 Pro i7-13700HX/RTX4070/32GB/1TB lists $1999-2099. Global USED market shows $1200-1500 range (eBay sold $1299-1499). Egyptian Dubizzle for similar 13-month units shows 65000-75000 EGP. Image analysis confirms excellent condition. Final $1350 reflects current market reality. Recommend listing on Dubizzle Egypt at EGP 65000 for quick sale, or eBay international for maximum reach.",
    },
  };

  const handleSubmit = async () => {
    if (
      !form.cpu ||
      !form.gpu ||
      !form.storage ||
      !form.memory ||
      !form.condition
    ) {
      setError(
        "Please fill in all required fields (CPU, GPU, Storage, RAM, Condition).",
      );
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    if (MOCK) {
      await new Promise((r) => setTimeout(r, 1500));
      setResult(MOCK_RESPONSE);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    try {
      const fd = new FormData();
      fd.append("user_id", form.user_id || 1);
      fd.append("username", form.username || "name");
      fd.append("user_req_number", 0);
      fd.append("model", form.model || "");
      fd.append("cpu", form.cpu);
      fd.append("gpu", form.gpu);
      fd.append("storage", form.storage);
      fd.append("memory", form.memory);
      fd.append("screen", form.screen || "");
      fd.append(
        "usage_duration_months",
        form.usage_duration_months ? parseInt(form.usage_duration_months) : 0,
      );
      fd.append(
        "condition",
        form.condition + (additionalDetails ? ". " + additionalDetails : ""),
      );
      if (form.image) fd.append("image", form.image);
      const res = await fetch(
        "https://teck-wise-production.up.railway.app/pricing/CreatePricing",
        {
          method: "POST",
          headers: { accept: "application/json" },
          body: fd,
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error: ${res.status}`);
      }
      const data = await res.json();
      sessionStorage.setItem("ude_result", JSON.stringify(data));
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const conditions = [
    {
      label: "Poor",
      desc: "Significant damage, limited function",
      range: "30–60% of market value",
      icon: <img src={ConditionPoorIcon} alt="poor" width="18" height="18" />,
    },
    {
      label: "Fair",
      desc: "Visible wear, some issues",
      range: "60–80% of market value",
      icon: <img src={ConditionFairIcon} alt="fair" width="18" height="18" />,
    },
    {
      label: "Good",
      desc: "Minor scratches, fully functional",
      range: "80–95% of market value",
      icon: <img src={ConditionGoodIcon} alt="good" width="18" height="18" />,
    },
    {
      label: "Like New",
      desc: "No visible wear, works perfectly",
      range: "95–100% of market value",
      icon: (
        <img src={ConditionLikeNewIcon} alt="like new" width="18" height="18" />
      ),
    },
  ];

  if (result)
    return (
      <EvaluationResult
        result={result}
        onReset={() => {
          sessionStorage.removeItem("ude_result");
          setResult(null);
        }}
      />
    );

  return (
    <div className="ude-page">
      <div className="ude-container">
        {/* ── Single Main Card ── */}
        <div className="ude-main-card">
          {/* Header */}
          <div className="ude-header">
            <h1 className="ude-title">Used Device Evaluation</h1>
            <p className="ude-subtitle">
              Get an accurate market valuation for your used computer. Our AI
              analyzes current market prices, depreciation rates, and condition
              factors to provide you with a fair price estimate.
            </p>
          </div>

          <div className="ude-fields-wrap">
            {/* ── Hardware Specifications ── */}
            <div className="ude-section-title">
              <span className="ude-section-icon blue">
                <img
                  src={HardwareSpecsIcon}
                  alt="specs"
                  width="16"
                  height="16"
                />
              </span>
              Hardware Specifications
            </div>
            <p className="ude-section-sub">
              Select your device specifications to get an evaluation
            </p>

            <div className="ude-form-row">
              <SearchableSelect
                label="Brand"
                name="model"
                placeholder="Select your Brand"
                options={DEVICE_DATA.models}
                value={form.model}
                onChange={handleChange}
              />
            </div>

            <div className="ude-form-row two-col">
              <SearchableSelect
                label="Storage"
                required
                name="storage"
                placeholder="Select your Storage"
                options={DEVICE_DATA.storage}
                value={form.storage}
                onChange={handleChange}
              />
              <SearchableSelect
                label="RAM"
                required
                name="memory"
                placeholder="Select your RAM"
                options={DEVICE_DATA.memory}
                value={form.memory}
                onChange={handleChange}
              />
            </div>

            <div className="ude-form-row two-col">
              <SearchableSelect
                label="CPU"
                required
                name="cpu"
                placeholder="Select your CPU"
                options={DEVICE_DATA.cpus}
                value={form.cpu}
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

            <div className="ude-form-row two-col">
              <SearchableSelect
                label="Screen Size"
                name="screen"
                placeholder="Select your Screen Size"
                options={DEVICE_DATA.screens}
                value={form.screen}
                onChange={handleChange}
              />
              <div className="ude-field">
                <label className="ude-label">
                  Usage Duration (months) <span className="ude-req">*</span>
                </label>
                <input
                  className="ude-input"
                  type="number"
                  min="0"
                  name="usage_duration_months"
                  value={form.usage_duration_months}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                />
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="ude-divider" />

            {/* ── Device Condition ── */}
            <div className="ude-section-title">
              <span className="ude-section-icon blue">
                <img
                  src={DeviceConditionIcon}
                  alt="condition"
                  width="16"
                  height="16"
                />
              </span>
              Select Your Device Condition <span className="ude-req">*</span>
            </div>

            <div className="ude-condition-grid">
              {conditions.map((c) => (
                <div
                  key={c.label}
                  className={`ude-condition-card${selectedCondition === c.label ? " selected" : ""}`}
                  onClick={() => handleConditionSelect(c.label)}
                >
                  <div className="ude-condition-top">
                    <span
                      className={`ude-condition-icon${selectedCondition === c.label ? " active" : ""}`}
                    >
                      {c.icon}
                    </span>
                    <span className="ude-condition-label">{c.label}</span>
                  </div>
                  <p className="ude-condition-desc">{c.desc}</p>
                  <span className="ude-condition-badge">{c.range}</span>
                </div>
              ))}
            </div>

            {/* ── Divider ── */}
            <div className="ude-divider" />

            {/* ── Photos ── */}
            <div className="ude-section-title">
              <span className="ude-section-icon orange">
                <img
                  src={PhotosUploadIcon}
                  alt="photos"
                  width="16"
                  height="16"
                />
              </span>
              Photos{" "}
              <span className="ude-optional">(Optional but Recommended)</span>
            </div>

            <label className="ude-upload-area">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
              <img src={UploadCloudIcon} alt="upload" width="36" height="36" />
              <p className="ude-upload-text">Upload a photo of your device</p>
              <span className="ude-upload-btn">
                {photos.length > 0 ? "1 photo selected" : "Choose Photos"}
              </span>
            </label>

            {photos.length > 0 && (
              <div className="ude-photo-previews">
                {photos.map((f, i) => (
                  <div key={i} className="ude-photo-thumb">
                    <img src={URL.createObjectURL(f)} alt={`preview-${i}`} />
                    <button
                      className="ude-photo-remove"
                      onClick={handleRemovePhoto}
                      type="button"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ── Divider ── */}
            <div className="ude-divider" />

            {/* ── Additional Details ── */}
            <div className="ude-section-title plain">
              Additional Details{" "}
              <span className="ude-optional">(Optional)</span>
            </div>
            <textarea
              className="ude-textarea"
              rows={4}
              placeholder="Any additional information about your device, modifications, or issues..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />

            {error && (
              <div className="ude-error">
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
          {/* end ude-fields-wrap */}
        </div>
        {/* end ude-main-card */}

        {/* ── Submit outside card ── */}
        <button
          className="ude-submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="ude-spinner" /> Evaluating...
            </>
          ) : (
            <>
              Start Evaluation{" "}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UsedDeviceEvaluation;
