import { useState } from "react";
import DollarIcon    from "../assets/icon3.svg";
import clock         from "../assets/clock.svg";
import check         from "../assets/check.svg";
import BuildingStrategy from "../assets/BuildingStrategy.svg";
import warnty from "../assets/warnty.svg";
import up from "../assets/up.svg";
import light from "../assets/light.svg";
import Topfooter from "../components/top-footer.jsx";

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M7 8l3 3 3-3" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarnIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 21h20L12 2z" stroke="#e65100" strokeWidth="1.8" fill="#fff3e0" strokeLinejoin="round" />
    <path d="M12 9v5" stroke="#e65100" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="#e65100" />
  </svg>
);

const tipsData = [
  {
    category: "Money Saving",
    tips: [
      {
        icon: DollarIcon,
        iconBg: "#F3F4F6",
        title: "Buy Components During Sales Events",
        description: "Time your purchases around Black Friday, Cyber Monday, and end-of-year clearances to save 20-40% on hardware.",
        tags: [
          { label: "High Impact", bg: "#DCFCE7", color: "#016630" },
          { label: "Easy", bg: "#DCFCE7", color: "#016630" },
          { label: "Save $200-500", bg: "#DBEAFE", color: "#193CB8" },
        ],
        keyPoints: [
          "Black Friday typically offers the best GPU deals",
          "Back-to-school season is great for laptops",
          "End-of-year clearances for older generation CPUs",
          "Subscribe to price tracking alerts",
        ],
      },
    ],
  },
  {
    category: "Building Strategy",
    tips: [
      {
        icon: BuildingStrategy,
        iconBg: "#F3F4F6",
        title: "Consider Refurbished Business PCs",
        description: "Ex-corporate computers offer excellent value for office work and light gaming when paired with a dedicated GPU.",
        tags: [
          { label: "High Impact", bg: "#e8f5e9", color: "#2e7d32" },
          { label: "Medium", bg: "#FEF9C2", color: "#894B00" },
          { label: "Save $300-800", bg: "#DBEAFE", color: "#193CB8" },
        ],
        keyPoints: [
          "Dell OptiPlex and HP EliteDesk are reliable options",
          "Add a low-profile GPU for decent gaming performance",
          "Perfect for productivity and programming work",
          "Usually come with Windows license included",
        ],
      },
    ],
  },
  {
    category: "Upgrade Strategy",
    tips: [
      {
        icon: up,
        iconBg: "#F3F4F6",
        color: "#9810FA",
        title: "GPU First, Then Everything Else",
        description: "For gaming, upgrading your graphics card provides the biggest performance boost per dollar spent.",
        tags: [
          { label: "High Impact", bg: "#e8f5e9", color: "#2e7d32" },
          { label: "Easy", bg: "#DBEAFE", color: "#193CB8" },
        ],
        keyPoints: [
          "GPU affects gaming performance more than CPU",
          "Modern CPUs from 2018+ are still capable",
          "Check PSU compatibility before upgrading",
          "Consider used GPUs from miners (test thoroughly)",
        ],
      },
    ],
  },
  {
    category: "Timing",
    tips: [
      {
        icon: clock,
        iconBg: "#F3F4F6",
        title: "Wait for Next-Gen Announcements",
        description: "Current generation prices drop significantly when new products are announced, even if they're months away.",
        tags: [
          { label: "Medium Impact", bg: "#FEF9C2", color: "#894B00" },
          { label: "Easy", bg: "#e8f5e9", color: "#2e7d32" },
          { label: "Save $100-300", bg: "#DBEAFE", color: "#193CB8" },
        ],
        keyPoints: [
          "GPU prices drop 10-20% after new generation announcement",
          "CPU prices drop when new socket releases",
          "Follow tech news for announcement schedules",
          "Consider if new features are worth the premium",
        ],
      },
    ],
  },
  {
    category: "Warranty",
    tips: [
      {
        icon: warnty,
        iconBg: "#F3F4F6",
        title: "Understand Warranty Terms",
        description: "Some manufacturers offer better warranty coverage and support, which can save money on repairs and replacements.",
        tags: [
          { label: "Medium Impact", bg: "#FEF9C2", color: "#894B00" },
          { label: "Easy", bg: "#e8f5e9", color: "#2e7d32" },
          { label: "Save $100-400", bg: "#DBEAFE", color: "#193CB8" },
        ],
        keyPoints: [
          "EVGA and ASUS offer excellent GPU warranties",
          "Some SSDs have 5-10 year warranties",
          "Register products immediately after purchase",
          "Keep receipts and warranty documentation",
        ],
      },
    ],
  },
  {
    category: "Maintenance",
    tips: [
      {
        icon: light,
        iconBg: "#F3F4F6",
        title: "Regular Cleaning Extends Lifespan",
        description: "Proper maintenance can extend your computer's life by 2-3 years, delaying the need for expensive upgrades.",
        tags: [
          { label: "Medium Impact", bg: "#FEF9C2", color: "#894B00" },
          { label: "Easy", bg: "#e8f5e9", color: "#2e7d32" },
          { label: "Save $500-1000", bg: "#DBEAFE", color: "#193CB8" },
        ],
        keyPoints: [
          "Clean dust from fans and heatsinks quarterly",
          "Replace thermal paste every 2-3 years",
          "Monitor temperatures to catch issues early",
          "Use compressed air, not vacuum cleaners",
        ],
      },
    ],
  },
];

const priceTools = [
  "Use CamelCamelCamel for Amazon price history",
  "Set up Google Shopping alerts for specific products",
  "Follow r/buildapcsales on Reddit for deals",
  "Use Honey browser extension for coupon codes",
];

const shoppingCalendar = [
  "January: Post-holiday clearance sales",
  "August: Back-to-school laptop deals",
  "November: Black Friday/Cyber Monday",
  "December: End-of-year inventory clearance",
];

const importantConsiderations = [
  "Always research compatibility before purchasing components",
  "Buy from reputable sellers to avoid counterfeit products",
  "Factor in shipping costs and return policies",
  "Consider total cost of ownership, not just initial price",
];

const TipCard = ({ tip }) => (
  <div style={{
    background: "#fff",
    border: "1px solid #e8eaf0",
    borderRadius: 10,
    padding: "18px 22px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flex: 1 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: tip.iconBg, display: "flex",
          alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <img src={tip.icon} alt="" width={22} height={22} />
        </div>
        <div>
          {/* ✅ title أكبر */}
          <div style={{ fontWeight: 700, fontSize: 17, color: "#1a1a2e", marginBottom: 4 }}>{tip.title}</div>
          {/* ✅ description أكبر */}
          <div style={{ fontSize: 15.5, color: "#555", lineHeight: 1.6 }}>{tip.description}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start", flexShrink: 0 }}>
        {tip.tags.map((tag, i) => (
          <span key={i} style={{
            background: tag.bg, color: tag.color,
            fontSize: 11.5, fontWeight: 600,
            borderRadius: 5, padding: "3px 9px", whiteSpace: "nowrap",
          }}>{tag.label}</span>
        ))}
      </div>
    </div>
    <div style={{ marginTop: 18, paddingTop: 14 }}>
      {/* ✅ Key Points label أكبر */}
      <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 10 }}>Key Points:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {tip.keyPoints.map((pt, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <img src={check} alt="" width={18} height={18} style={{ flexShrink: 0, marginTop: 1 }} />
            {/* ✅ key point items أكبر */}
            <span style={{ fontSize: 15, color: "#444", lineHeight: 1.5 }}>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SmartTips = ({ setCurrentPage }) => (
  <>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 60px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        {/* ✅ h1 أكبر */}
        <h1 style={{ fontSize: 42, fontWeight: 710, color: "#155DFC", marginBottom: 10 }}>
          Smart Tips & Money-Saving Strategies
        </h1>
        {/* ✅ subtitle أكبر */}
        <p style={{ fontSize: 17, color: "#666", maxWidth: 1000, margin: "0 auto", lineHeight: 1.7, marginTop: "20px" }}>
          Expert tips to help you save money, make smart purchasing decisions, and get the most value from your computer investments.
        </p>
      </div>

      {tipsData.map((section, si) => (
        <div key={si} style={{ marginBottom: 34 }}>
          {/* ✅ section title أكبر */}
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>{section.category}</h2>
          {section.tips.map((tip, ti) => <TipCard key={ti} tip={tip} />)}
        </div>
      ))}

      <div style={{ border: "1.5px dashed #90caf9", borderRadius: 10, padding: "24px 28px", marginBottom: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 4 }}>Additional Money-Saving Resources</div>
        <div style={{ fontSize: 13.5, color: "#666", marginBottom: 20 }}>More ways to save money and make smart computer purchasing decisions</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "#1a1a2e", marginBottom: 10 }}>Price Tracking Tools</div>
            {priceTools.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 8 }}>
                <ChevronIcon />
                <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "#1a1a2e", marginBottom: 10 }}>Smart Shopping Calendar</div>
            {shoppingCalendar.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 8 }}>
                <ChevronIcon />
                <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ border: "solid #FFD6A7 1px", borderRadius: 10, padding: "20px 24px", marginBottom: 18, background: "#FFF7ED" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <WarnIcon />
          <span style={{ fontWeight: 700, fontSize: 14.5, color: "#7E2A0C" }}>Important Considerations</span>
        </div>
        {importantConsiderations.map((item, i) => (
          <div key={i} style={{ fontSize: 13.5, color: "#9F2D00", marginBottom: 6 }}>• {item}</div>
        ))}
      </div>

      <div style={{ border: "solid #EFF7FF 1px", borderRadius: 10, padding: "36px 24px", background: "#EFF7FF", textAlign: "center" }}>
        {/* ✅ CTA title أكبر */}
        <div style={{ fontWeight: 700, fontSize: 26, color: "#1a1a2e", marginBottom: 10 }}>
          Ready to Save Money on Your Next Purchase?
        </div>
        {/* ✅ CTA subtitle أكبر */}
        <div style={{ fontSize: 17, color: "#555", marginBottom: 22 }}>
          Use our recommendation tools to find the best deals and make informed decisions.
        </div>
        <button
          onClick={() => setCurrentPage && setCurrentPage("new-device")}
          style={{ background: "#155DFC", color: "#fff", border: "none", borderRadius: 6, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Get Recommendations
        </button>
      </div>
    </div>
    
  </>
);

export default SmartTips;