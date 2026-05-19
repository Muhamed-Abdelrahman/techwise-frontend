import React, { useState } from 'react';
import motherboard from "../assets/marketalerts-img/motherboard.svg";
import rtx         from "../assets/marketalerts-img/rtx.svg";
import ddr5        from "../assets/marketalerts-img/ddr5.svg";
import gaminglap   from "../assets/marketalerts-img/gaminglap.svg";
import gpu_price   from "../assets/marketalerts-img/gpu_price.svg";
import ram_price   from "../assets/marketalerts-img/ram_price.svg";
import ssd_price   from "../assets/marketalerts-img/ssd_price.svg";
import Topfooter from '../components/top-footer.jsx';

const deals = [
  {
    img: motherboard,
    title: "Motherboard Bundle Deal",
    badge: "Bundle Deal",
    badgeBg: "#EFF6FF", badgeColor: "#3b82f6",
    subtitle: "Corsair Vengeance DDR5-5600 32GB Kit",
    rating: "4.7", seller: "Micro Center",
    ends: { label: "Ends in 1 week", color: "#6b7280" },
    stock: { label: "In Stock", color: "#16a34a" },
    price: "$549", oldPrice: "$649", save: "Save 15%",
  },
  {
    img: rtx,
    title: "RTX 4070 Ti Super - Limited Time",
    badge: "Price Drop",
    badgeBg: "#dcfce7", badgeColor: "#16a34a",
    subtitle: "ASUS ROG Strix GeForce RTX 4070 Ti Super",
    rating: "4.7", seller: "Amazon",
    ends: { label: "Ends in 2 days", color: "#ea580c" },
    stock: { label: "Limited Stock", color: "#ea580c" },
    price: "$679", oldPrice: "$849", save: "Save 20%",
  },
  {
    img: ddr5,
    title: "32GB DDR5 Kit Deal",
    badge: "Flash Sale",
    badgeBg: "#fce7f3", badgeColor: "#db2777",
    subtitle: "Corsair Vengeance DDR5-5600 32GB Kit",
    rating: "4.7", seller: "Newegg",
    ends: { label: "Ends in 5 hours", color: "#ea580c" },
    stock: { label: "In Stock", color: "#16a34a" },
    price: "$149", oldPrice: "$199", save: "Save 25%",
  },
  {
    img: gaminglap,
    title: "Gaming Laptop Flash Sale",
    badge: "Low Stock",
    badgeBg: "#fff7ed", badgeColor: "#ea580c",
    subtitle: "MSI Katana 15 - RTX 4060, i7-13620H",
    rating: "4.7", seller: "Best Buy",
    ends: { label: "Ends in 1 day", color: "#ea580c" },
    stock: { label: "3 left", color: "#ea580c" },
    price: "$999", oldPrice: "$1,299", save: "Save 23%",
  },
];

const trends = [
  { img: gpu_price, label: "GPU Prices", value: "-15%", color: "#16a34a", bg: "#f0fdf4" },
  { img: ram_price, label: "RAM Prices", value: "+8%",  color: "#155DFC", bg: "#EFF6FF" },
  { img: ssd_price, label: "SSD Prices", value: "-3%",  color: "#374151", bg: "#F8FAFC" },
];

export default function MarketAlerts({ setCurrentPage }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <div style={{
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "clamp(24px, 4vw, 48px) clamp(16px, 5vw, 60px)",
        maxWidth: "1200px", // ✅ كبرنا الكونتينر
        margin: "0 auto",
        marginBottom:"110px"
      }}>

        <style>{`
          .ma-deal-card {
            background: #fff;
            border: 1px solid #e5e9f0;
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px 24px;
            margin-bottom: 14px;
          }
          .ma-deal-img {
            width: 220px;
            height: 155px;
            object-fit: cover;
            border-radius: 10px;
            flex-shrink: 0;
            background: #f1f5f9;
          }
          .ma-badge {
            display: inline-block;
            padding: 3px 12px;
            border-radius: 20px;
            font-size: 0.82rem;
            font-weight: 600;
            margin-left: 8px;
          }
          .ma-save-badge {
            font-size: 0.82rem;
            font-weight: 600;
            color: #16a34a;
            background: #f0fdf4;
            border-radius: 6px;
            padding: 3px 10px;
            margin-top: 4px;
            display: inline-block;
          }
          @media (max-width: 600px) {
            .ma-deal-img { width: 90px; height: 80px; }
            .ma-deal-card { gap: 12px; padding: 12px; }
          }
        `}</style>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.6rem)", fontWeight: "700", color: "#155DFC", margin: "0 0 8px" }}>
            Market Alerts
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", margin: 0 }}>
            Stay updated with the latest deals, price drops, and market trends. Never miss a great opportunity to save money on computer hardware.
          </p>
        </div>

        {/* Alert Notifications Bar */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e9f0",
          borderRadius: "14px",
          padding: "16px 24px",
          marginBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div>
              <div style={{ fontSize: "1.05rem", fontWeight: "700", color: "#111827" }}>Alert Notifications</div>
              <div style={{ fontSize: "0.88rem", color: "#9ca3af", marginTop: "2px" }}>
                Get notified about price drops and deals on your watchlist
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <span style={{ fontSize: "0.95rem", color: "#374151" }}>Enable Notifications</span>
            <div
              onClick={() => setNotifications(!notifications)}
              style={{
                width: "44px", height: "24px", borderRadius: "12px",
                background: notifications ? "#155DFC" : "#d1d5db",
                cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
              }}
            >
              <div style={{
                width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
                position: "absolute", top: "3px",
                left: notifications ? "23px" : "3px",
                transition: "left 0.2s",
              }} />
            </div>
          </div>
        </div>

        {/* Section title */}
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#111827", margin: "0 0 14px" }}>
          Current Market Deals
        </h2>

        {/* Deal Cards */}
        {deals.map((deal, i) => (
          <div className="ma-deal-card" key={i}>

            <img src={deal.img} alt={deal.title} className="ma-deal-img" />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: "6px" }}>
                <span style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", fontWeight: "700", color: "#111827" }}>
                  {deal.title}
                </span>
                <span className="ma-badge" style={{ background: deal.badgeBg, color: deal.badgeColor }}>
                  {deal.badge}
                </span>
              </div>

              <p style={{ margin: "0 0 8px", fontSize: "0.95rem", color: "#6b7280" }}>{deal.subtitle}</p>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", fontSize: "0.95rem", color: "#6b7280" }}>
                <span style={{ color: "#f59e0b" }}>★</span>
                <span>{deal.rating}</span>
                <span>· Sold by {deal.seller}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.95rem", color: deal.ends.color, display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={deal.ends.color} strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {deal.ends.label}
                </span>
                <span style={{ fontSize: "0.95rem", color: deal.stock.color, display: "flex", alignItems: "center", gap: "4px" }}>
                  {deal.stock.color === "#16a34a" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={deal.stock.color} strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  )}
                  {deal.stock.label}
                </span>
              </div>
            </div>

            {/* Price */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: "700", color: "#111827" }}>
                {deal.price}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#9ca3af", textDecoration: "line-through", marginTop: "2px" }}>
                {deal.oldPrice}
              </div>
              <span className="ma-save-badge">{deal.save}</span>
            </div>

          </div>
        ))}

        {/* Market Trends */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e9f0",
          borderRadius: "14px",
          padding: "24px 28px",
          marginTop: "28px",
        }}>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "#111827" }}>Market Trends</div>
            <div style={{ fontSize: "0.88rem", color: "#9ca3af", marginTop: "3px" }}>Recent price movements and market insights</div>
          </div>

          <div style={{ display: "flex", gap: "14px" }}>
            {trends.map((t, i) => (
              <div key={i} style={{
                flex: 1,
                background: t.bg,
                borderRadius: "12px",
                padding: "24px 16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}>
                <img src={t.img} alt={t.label} width={36} height={36} />
                <span style={{ fontSize: "1rem", fontWeight: "700", color: "#111827" }}>{t.label}</span>
                <span style={{ fontSize: "1.8rem", fontWeight: "700", color: t.color }}>{t.value}</span>
                <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>vs last month</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}