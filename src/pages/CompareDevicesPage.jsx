import React, { useState, useRef, useEffect } from "react";
import "../styles/CompareDevicesPage.css";
import DEVICE_DATA from "../data/deviceData";
import ComparisonResultPage from "../ComparisonResultPage/ComparisonResultPage";

// ── Searchable Select ──────────────────────────────────────────────────────
const SearchableSelect = ({
  label,
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
    <div className="cdp-field" ref={ref}>
      <label className="cdp-label">{label}</label>
      <div className={`cdp-select-wrapper${open ? " open" : ""}`}>
        <div className="cdp-select-trigger" onClick={() => setOpen((p) => !p)}>
          {open ? (
            <input
              autoFocus
              className="cdp-select-search"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={value ? "cdp-select-value" : "cdp-select-placeholder"}
            >
              {value || placeholder}
            </span>
          )}
          <div className="cdp-select-icons">
            {value && !open && (
              <span className="cdp-clear-btn" onClick={handleClear}>
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
          <div className="cdp-dropdown">
            {query && !options.includes(query) && (
              <div
                className="cdp-dropdown-item cdp-dropdown-custom"
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
              <div className="cdp-dropdown-empty">Start typing to search</div>
            )}
            {filtered.map((opt) => (
              <div
                key={opt}
                className={`cdp-dropdown-item${value === opt ? " active" : ""}`}
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

// ── Categories ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "Gaming", label: "Gaming", icon: "🎮" },
  { key: "Design&Editing", label: "Design & Editing", icon: "🎨" },
  { key: "Programming", label: "Programming", icon: "💻" },
  { key: "OfficeWork", label: "Office Work", icon: "📋" },
];

const emptyDevice = () => ({
  model: "",
  cpu: "",
  gpu: "",
  memory: "",
  storage: "",
  screen: "",
});

// ── Main Component ─────────────────────────────────────────────────────────
const CompareDevicesPage = () => {
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const [deviceA, setDeviceA] = useState(emptyDevice());
  const [deviceB, setDeviceB] = useState(emptyDevice());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleA = (e) =>
    setDeviceA((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleB = (e) =>
    setDeviceB((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleCategory = (key) =>
    setCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );

  const MOCK = false;

  const MOCK_RESPONSE = {
    user_id: 1,
    username: "ma004q",
    user_req_number: 4,
    device_a: {
      model: "MacBook Pro 16 M3 Pro",
      cpu: "Apple M3 Pro",
      gpu: "Apple 18-core GPU",
      screen: "16-inch Liquid Retina XDR",
      storage: "1TB SSD",
      memory: "36GB Unified Memory",
    },
    device_b: {
      model: "ASUS ProArt Studiobook 16",
      cpu: "AMD Ryzen 9 7940HS",
      gpu: "NVIDIA RTX 4070 8GB",
      screen: "16-inch OLED 4K",
      storage: "2TB NVMe SSD",
      memory: "32GB DDR5",
    },
    category: ["Design&Editing", "Programming"],
    ai_comparison: {
      device_a: {
        price: 2800,
        model: "MacBook Pro 16 M3 Pro",
        cpu_score: 85,
        gpu_score: 78,
        ram_score: 95,
        storage_score: 85,
        screen_score: 95,
        gaming_score: 65,
        gaming_analysis:
          "Limited gaming library, decent performance for supported titles. M3 GPU handles 1080p well.",
        design_editing_score: 92,
        design_editing_analysis:
          "Excellent for video editing, color accuracy superb. Native M-series apps fly.",
        programming_score: 88,
        programming_analysis:
          "Great for iOS/macOS dev, Docker support improving. Unified memory helps VMs.",
        office_work_score: 90,
        office_work_analysis:
          "Silent operation, amazing battery life. Perfect for productivity tasks.",
        advantages:
          "• Exceptional battery life (18+ hrs)\n• Industry-leading XDR display with 1600 nits\n• Unified memory architecture (36GB)\n• Native optimization for creative apps\n• Silent operation under load\n• Premium build quality",
        disadvantages:
          "• Limited gaming compatibility\n• Fewer ports\n• Expensive for specs\n• macOS may require learning curve\n• No upgrade options post-purchase",
        final_score: 88,
      },
      device_b: {
        price: 3300,
        model: "ASUS ProArt Studiobook 16",
        cpu_score: 82,
        gpu_score: 85,
        ram_score: 85,
        storage_score: 90,
        screen_score: 92,
        gaming_score: 88,
        gaming_analysis:
          "RTX 4070 excels at 1440p gaming. Ray tracing capable. DLSS 3 support.",
        design_editing_score: 90,
        design_editing_analysis:
          "OLED perfect for color work. RTX accelerates renders. 2TB storage ample.",
        programming_score: 85,
        programming_analysis:
          "Windows dev friendly. CUDA support for ML. Good multi-core performance.",
        office_work_score: 82,
        office_work_analysis:
          "Solid productivity performer. Shorter battery than MacBook.",
        advantages:
          "• RTX 4070 GPU with 8GB VRAM\n• Stunning 4K OLED display\n• 2TB storage included\n• $500 cheaper than MacBook\n• Windows ecosystem compatibility\n• Upgradeable RAM/storage",
        disadvantages:
          "• Battery life 6-8 hours max\n• Heavier than MacBook\n• Fan noise under load\n• OLED may have burn-in risk\n• Build quality not as premium",
        final_score: 86,
      },
      comp_result:
        "Winner: MacBook Pro for design/editing (92 vs 90), programming (88 vs 85). ASUS wins gaming (88 vs 65). MacBook offers superior optimization for creative apps, better battery life, and excellent display quality. ASUS provides better value with RTX 4070 and 2TB storage. Choose MacBook for pro creative work, ASUS for budget-conscious users needing GPU power.",
    },
  };

  const handleSubmit = async () => {
    if (
      !deviceA.model ||
      !deviceA.cpu ||
      !deviceA.gpu ||
      !deviceA.memory ||
      !deviceA.storage
    ) {
      setError("Please fill in all required fields for Device A.");
      return;
    }
    if (
      !deviceB.model ||
      !deviceB.cpu ||
      !deviceB.gpu ||
      !deviceB.memory ||
      !deviceB.storage
    ) {
      setError("Please fill in all required fields for Device B.");
      return;
    }
    setLoading(true);
    setError(null);

    if (MOCK) {
      await new Promise((r) => setTimeout(r, 1800));
      setResult(MOCK_RESPONSE);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const body = {
        user_id: storedUser.userId || storedUser.useId || 1,
        username: storedUser.firstName,
        user_req_number: 0,
        device_a: deviceA,
        device_b: deviceB,
        category: categories,
      };
      const res = await fetch(
        "https://teck-wise-production.up.railway.app/comparison/CreateComparison",
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

  if (result) {
    return (
      <ComparisonResultPage
        result={result}
        onReset={() => {
          setResult(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    );
  }

  const DeviceFields = ({ vals, handler, label, sublabel, side }) => (
    <div className="cdp-device-card">
      <div className="cdp-device-card-header">
        <span className="cdp-dot" />
        <div>
          <div className="cdp-device-card-title">{label}</div>
          <div className="cdp-device-card-sub">{sublabel}</div>
        </div>
      </div>
      <SearchableSelect
        label="Device Name"
        name="model"
        placeholder={
          side === "a"
            ? "e.g., MSI Gaming Laptop GF63"
            : "e.g., ASUS ROG Strix G15"
        }
        options={DEVICE_DATA.models}
        value={vals.model}
        onChange={handler}
      />
      <SearchableSelect
        label="CPU"
        name="cpu"
        placeholder={
          side === "a"
            ? "e.g., Intel Core i7-12700K"
            : "e.g., AMD Ryzen 7 5800X"
        }
        options={DEVICE_DATA.cpus}
        value={vals.cpu}
        onChange={handler}
      />
      <SearchableSelect
        label="GPU"
        name="gpu"
        placeholder={
          side === "a" ? "e.g., NVIDIA RTX 3070" : "e.g., AMD RX 6800 XT"
        }
        options={DEVICE_DATA.gpus}
        value={vals.gpu}
        onChange={handler}
      />
      <SearchableSelect
        label="RAM"
        name="memory"
        placeholder={side === "a" ? "e.g., 16GB DDR4" : "e.g., 32GB DDR5"}
        options={DEVICE_DATA.memory}
        value={vals.memory}
        onChange={handler}
      />
      <SearchableSelect
        label="Storage"
        name="storage"
        placeholder={side === "a" ? "e.g., 1TB NVMe SSD" : "e.g., 2TB NVMe SSD"}
        options={DEVICE_DATA.storage}
        value={vals.storage}
        onChange={handler}
      />
      <SearchableSelect
        label="Screen"
        name="screen"
        placeholder="e.g., 15.6-inch FHD IPS"
        options={DEVICE_DATA.screens}
        value={vals.screen}
        onChange={handler}
      />
    </div>
  );

  return (
    <div className="cdp-page">
      <div className="cdp-container">
        {/* Header */}
        <div className="cdp-header">
          <h1 className="cdp-title">Compare Devices</h1>
          <p className="cdp-subtitle">
            Make informed decisions by comparing specifications, performance,
            and value of different computers side by side.
          </p>
        </div>

        {/* Section label */}
        <div className="cdp-section-row">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <span className="cdp-section-label">
            Write or select Devices specifications to Compare
          </span>
        </div>

        {/* Two device cards + VS */}
        <div className="cdp-devices-wrap">
          <DeviceFields
            vals={deviceA}
            handler={handleA}
            label="Device A"
            sublabel="Enter first device specifications"
            side="a"
          />

          {/* VS divider */}
          <div className="cdp-vs-col">
            <div className="cdp-vs-line" />
            <div className="cdp-vs-badge">VS</div>
            <div className="cdp-vs-line" />
          </div>

          <DeviceFields
            vals={deviceB}
            handler={handleB}
            label="Device B"
            sublabel="Enter second device specifications"
            side="b"
          />
        </div>

        {/* Categories centered below */}
        <div className="cdp-categories-section">
          <div className="cdp-categories-label">
            Comparison Focus <span>(optional)</span>
          </div>
          <div className="cdp-categories-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`cdp-cat-btn${categories.includes(cat.key) ? " selected" : ""}`}
                onClick={() => toggleCategory(cat.key)}
              >
                <span>{cat.icon}</span>
                {cat.label}
                {categories.includes(cat.key) && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="cdp-error">
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

        {/* Submit */}
        <button
          className="cdp-submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="cdp-spinner" /> Comparing Devices...
            </>
          ) : (
            <>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              Compare Devices
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CompareDevicesPage;
