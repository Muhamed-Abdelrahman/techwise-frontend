import React from 'react';
import ai_img           from "../assets/about-img/ai-img.svg";
import compare          from "../assets/learnmore/compare.svg";
import database         from "../assets/learnmore/database.svg";
import dataprocessing   from "../assets/learnmore/dataprocessing.svg";
import experttips       from "../assets/learnmore/experttips.svg";
import forgammers       from "../assets/learnmore/forgammers.svg";
import forprofessionals from "../assets/learnmore/forprofessionals.svg";
import forstudents      from "../assets/learnmore/forstudents.svg";
import forupgrades      from "../assets/learnmore/forupgrades.svg";
import machinelearning  from "../assets/learnmore/machinelearning.svg";
import marketalerts     from "../assets/learnmore/marketalerts.svg";
import nodataselling    from "../assets/learnmore/nodataselling.svg";
import performanceanalysis from "../assets/learnmore/performanceanalysis.svg";
import searchengine     from "../assets/learnmore/searchengine.svg";
import ShieldCheckIcon  from "../assets/learnmore/ShieldCheckIcon.svg";
import TargetIcon       from "../assets/learnmore/TargetIcon.svg";
import upgrade          from "../assets/learnmore/upgrade.svg";
import valuation        from "../assets/learnmore/valuation.svg";
import check            from "../assets/check.svg";
import aipowered        from "../assets/learnmore/aipowered.svg";
import trustedanalysis  from "../assets/learnmore/trustedanalysis.svg";
import privacypic       from "../assets/learnmore/privacypic.svg";
import arrow            from "../assets/learnmore/arrow.svg";
import Topfooter from '../components/top-footer.jsx';

export default function LearnMore({ setCurrentPage }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif", color: "#111827" }}>

      <style>{`
        .lm-section { padding: clamp(40px, 6vw, 80px) clamp(16px, 6vw, 80px); }
        .lm-center { text-align: center; margin-bottom: clamp(24px, 4vw, 48px); }
        .lm-title { font-size: 2.2rem; font-weight: 600; margin: 0 0 10px; color: #111827; }
        .lm-blue { color: #155DFC; }
        .lm-subtitle { font-size: 1.3rem; color: #4A5565; margin: 0; }
        .lm-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .lm-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .lm-card { border: 1px solid #e5e9f0; border-radius: 14px; padding: 28px 24px; background: #fff; }
        .lm-card-icon { margin-bottom: 18px; }
        .lm-card-title { font-size: 0.95rem; font-weight: 700; color: #111827; margin: 0 0 10px; }
        .lm-card-desc  { font-size: .85rem; color: #6b7280; line-height: 1.65; margin: 0 0 16px; }
        .lm-bullet { font-size: 0.8rem; color: #374151; display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
        .lm-bullet::before { content: "›"; color: #155DFC; font-size: 1.7rem; font-weight: 600; line-height: 1; }
        .lm-user-card { border: 1px solid #e5e9f0; border-radius: 14px; overflow: hidden; background: #fff; }
        .lm-user-img-wrap { position: relative; }
        .lm-user-img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .lm-user-label { position: absolute; bottom: 0; left: 0; padding: 16px 20px; color: #fff; font-size: 1.1rem; font-weight: 700; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%); width: 100%; box-sizing: border-box; }
        .lm-user-body { padding: 32px 22px 28px; }
        .lm-tag { display: inline-block; padding: 3px 14px; border-radius: 20px; font-size: 0.75rem; color: #155DFC; background: #EFF6FF; margin-right: 8px; margin-top: 8px; }
        .lm-ai-row { border: 1px solid #e5e9f0; border-radius: 14px; padding: 22px 28px; display: flex; align-items: flex-start; gap: 18px; margin-bottom: 14px; background: #fff; }
        .lm-privacy-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 32px; }
        .lm-privacy-icon { width: 40px; height: 40px; border-radius: 10px; border: 1px solid #e5e9f0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #fff; }
        .lm-feature-card { border: 1px solid #e5e9f0; border-radius: 14px; padding: 24px; background: #fff; display: flex; flex-direction: column; justify-content: space-between; }
        .lm-feature-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .lm-arrow { color: #9ca3af; font-size: 1.1rem; }
        @media (max-width: 768px) {
          .lm-grid-3 { grid-template-columns: 1fr; }
          .lm-grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Section 1: Hero ── */}
      <div className="lm-section">
        <div className="lm-center">
          <h1 style={{ fontSize: "2.2rem", fontWeight: "600", margin: "0 0 12px", color: "#155DFC" }}>
            Everything You Need to Know About <strong>TeckWise</strong>
          </h1>
          <p className="lm-subtitle">
            The most comprehensive AI-powered platform for finding, evaluating, and optimizing your perfect computer setup
          </p>
        </div>

        {/* ✅ ضفنا flexWrap */}
        <div style={{ display: "flex", gap: "clamp(24px, 4vw, 60px)", alignItems: "center", flexWrap: "wrap" }}>

          {/* ✅ minWidth أصغر */}
          <div style={{ flex: "1", minWidth: "min(280px, 100%)" }}>
            <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)", fontWeight: "700", margin: "0 0 18px", lineHeight: "1.4", color: "#111827" }}>
              Your Personal <span className="lm-blue">Device Experts</span> Powerd by <span className="lm-blue">AI</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#374151", lineHeight: "1.8", margin: "0 0 14px" }}>
              TeckWise is an intelligent platform that takes the guesswork out of buying, selling, and upgrading computers. Whether you're a gamer seeking the ultimate rig, a professional needing workstation power, or someone looking to sell their old device, we've got you covered.
            </p>
            <p style={{ fontSize: "1.1rem", color: "#374151", lineHeight: "1.8", margin: "0 0 28px" }}>
              Our advanced AI algorithms analyze millions of data points—from technical specifications and benchmark scores to real-time market prices and user reviews—to deliver personalized recommendations that perfectly match your needs and budget.
            </p>
            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
              {[
                { label: "100% Free",     sub: "No hidden charges" },
                { label: "Unbiased",      sub: "Data-driven results" },
                { label: "Real-Time",     sub: "Updated daily" },
                { label: "Expert-Backed", sub: "Validated advice" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <img src={check} width={22} height={22} style={{ marginTop: "2px", flexShrink: 0 }} alt="" />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#111827" }}>{b.label}</div>
                    <div style={{ fontSize: "0.73rem", color: "#9ca3af", marginTop: "2px" }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ minWidth أصغر */}
          <div style={{ flex: "1", minWidth: "min(280px, 100%)", position: "relative" }}>
            <img src={ai_img} alt="AI" style={{ width: "100%", borderRadius: "18px", display: "block" }} />
            <div style={{
              position: "absolute", top: "9px", right: "14px",
              background: "#fff", borderRadius: "12px", padding: "10px 12px",
              display: "flex", alignItems: "center", gap: "7px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              fontSize: "0.82rem", fontWeight: "700", color: "#111827",
            }}>
              <img src={aipowered} width={16} height={16} alt="" />
              AI-Powered
            </div>
            <div style={{
              position: "absolute", bottom: "60px", left: "14px",
              background: "#fff", borderRadius: "12px", padding: "10px 12px",
              display: "flex", alignItems: "center", gap: "7px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              fontSize: "0.82rem", fontWeight: "700", color: "#111827",
            }}>
              <img src={trustedanalysis} width={16} height={16} alt="" />
              Trusted Analysis
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Everything You Need in One Platform ── */}
      <div className="lm-section">
        <div className="lm-center">
          <h2 className="lm-title">Everything You Need in <span className="lm-blue">One Platform</span></h2>
          <p className="lm-subtitle">Comprehensive tools and features designed to help you make the best PC-related decisions</p>
        </div>
        <div className="lm-grid-3">
          {[
            { icon: searchengine,        title: "Smart Recommendation Engine", desc: "Our AI analyzes thousands of computer configurations to match your exact needs, budget, and use case.",    bullets: ["Personalized results", "Budget optimization", "Latest market data"] },
            { icon: valuation,           title: "Accurate Valuation",           desc: "Get precise market valuations for used devices based on condition, specs, and real-time market trends.",   bullets: ["Fair pricing", "Market comparison", "Instant estimates"] },
            { icon: upgrade,             title: "Upgrade Intelligence",         desc: "Discover which upgrades deliver the best performance-per-dollar improvement for your specific system.",     bullets: ["ROI analysis", "Compatibility check", "Performance boost prediction"] },
            { icon: performanceanalysis, title: "Performance Analysis",         desc: "Deep dive into component performance metrics, benchmarks, and real-world usage scenarios.",                bullets: ["Detailed benchmarks", "Bottleneck detection", "Gaming/work optimization"] },
            { icon: marketalerts,        title: "Market Alerts",                desc: "Stay informed about price drops, deals, and availability changes for the devices you're watching.",        bullets: ["Price tracking", "Deal notifications", "Stock alerts"] },
            { icon: experttips,          title: "Expert Tips & Guides",         desc: "Access professional advice on PC building, maintenance, troubleshooting, and optimization.",               bullets: ["Step-by-step guides", "Best practices", "Troubleshooting help"] },
          ].map((c, i) => (
            <div className="lm-card" key={i}>
              <div className="lm-card-icon"><img src={c.icon} width={36} height={36} alt="" /></div>
              <div className="lm-card-title">{c.title}</div>
              <div className="lm-card-desc">{c.desc}</div>
              {c.bullets.map((b, j) => <div className="lm-bullet" key={j}>{b}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Built for Every User ── */}
      <div className="lm-section">
        <div className="lm-center">
          <h2 className="lm-title">Built for <span className="lm-blue">Every User</span></h2>
          <p className="lm-subtitle">Whether you're gaming, working, studying, or upgrading, SmartPC has solutions tailored to your needs</p>
        </div>
        <div className="lm-grid-2" style={{ maxWidth: "1180px", margin: "0 auto" }}>
          {[
            { img: forgammers,      label: "For Gamers",       desc: "Find the perfect gaming rig that balances FPS, graphics quality, and budget for your favorite games.",                   tags: ["High FPS", "Ray Tracing", "VR Ready"] },
            { img: forprofessionals,label: "For Professionals", desc: "Get workstations optimized for video editing, 3D rendering, software development, or data analysis.",                  tags: ["Multi-core", "Fast Storage", "Professional GPUs"] },
            { img: forstudents,     label: "For Students",      desc: "Affordable, reliable laptops that handle coursework, research, and entertainment without breaking the bank.",           tags: ["Budget-Friendly", "Portable", "All-Day Battery"] },
            { img: forupgrades,     label: "For Upgraders",     desc: "Maximize your existing PC's performance with smart component upgrades that deliver real-world improvements.",           tags: ["Cost-Effective", "Performance Boost", "Easy Installation"] },
          ].map((u, i) => (
            <div className="lm-user-card" key={i}>
              <div className="lm-user-img-wrap">
                <img src={u.img} alt={u.label} className="lm-user-img" />
                <div className="lm-user-label">{u.label}</div>
              </div>
              <div className="lm-user-body">
                <p style={{ fontSize: "1.2rem", color: "#4A5565", lineHeight: "1.8", margin: "0 0 6px" }}>{u.desc}</p>
                <div>{u.tags.map((t, j) => <span className="lm-tag" key={j}>{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 4: Powered by Advanced AI ── */}
      <div className="lm-section" style={{ background: "#fff" }}>
        <div className="lm-center">
          <h2 className="lm-title">Powered by <span className="lm-blue">Advanced AI</span></h2>
          <p className="lm-subtitle" style={{ maxWidth: "1200px", margin: "0 auto", color: "#4A5565" }}>
            Our recommendation engine uses cutting-edge machine learning algorithms trained on millions of PC configurations, benchmark results, user reviews, and real-world usage data.
          </p>
        </div>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          {[
            { icon: dataprocessing,  title: "Real-Time Data Processing", desc: "Our systems process over 10 million data points daily from retailers, manufacturers, and review sites." },
            { icon: machinelearning, title: "Machine Learning Models",    desc: "Continuously learning from user feedback and market trends to improve recommendation accuracy." },
            { icon: database,        title: "Comprehensive Database",     desc: "Access to historical pricing, benchmark scores, compatibility matrices, and component specifications." },
          ].map((row, i) => (
            <div className="lm-ai-row" key={i}>
              <img src={row.icon} width={32} height={32} style={{ marginTop: "2px", flexShrink: 0 }} alt="" />
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#4A5565", marginBottom: "6px" }}>{row.title}</div>
                <div style={{ fontSize: "1.1rem", color: "#4A5565", lineHeight: "1.65" }}>{row.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 5: Privacy & Security ── */}
      <div className="lm-section" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="lm-center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: "700", color: "#155DFC", margin: "0 0 10px" }}>
            Your Privacy &amp; Security Matter
          </h2>
          <p className="lm-subtitle" style={{ maxWidth: "1100px", margin: "0 auto", fontSize: "1.51rem" }}>
            We employ enterprise-grade security measures to protect your data and ensure your privacy while using TechWise.
          </p>
        </div>
        <div style={{ display: "flex", gap: "clamp(32px, 5vw, 80px)", alignItems: "center", flexWrap: "wrap", marginTop: "40px" }}>
          <div style={{ flex: "1", minWidth: "320px" }}>
            {[
              { icon: ShieldCheckIcon, title: "End-to-End Encryption", desc: "All data transmissions are secured with AES-256 encryption" },
              { icon: TargetIcon,      title: "GDPR Compliant",         desc: "Full compliance with international privacy regulations" },
              { icon: nodataselling,   title: "No Data Selling",        desc: "We never sell or share your personal information with third parties" },
            ].map((item, i) => (
              <div className="lm-privacy-item" key={i}>
                <div className="lm-privacy-icon">
                  <img src={item.icon} width={20} height={20} alt="" />
                </div>
                <div>
                  <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827", marginBottom: "5px" }}>{item.title}</div>
                  <div style={{ fontSize: "1.119rem", color: "#6b7280", lineHeight: "1.65" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ flex: "1", minWidth: "380px" }}>
            <img src={privacypic} alt="Privacy" style={{ width: "100%", borderRadius: "18px", display: "block" }} />
          </div>
        </div>
      </div>

      {/* ── Section 6: Explore All Features ── */}
      <div className="lm-section" style={{ marginBottom: "140px" }}>
        <div className="lm-center">
          <h2 className="lm-title" style={{ fontSize: "2.5rem", fontWeight: "500" }}>Explore All <span className="lm-blue">Features</span></h2>
        </div>
        <div className="lm-grid-3">
          {[
            { icon: searchengine,        title: "New Device Recommendation", desc: "Find the perfect new computer based on your needs and budget",  page: "new-device" },
            { icon: valuation,           title: "Used Device Evaluation",    desc: "Get accurate valuations for used computers and selling tips",    page: "used-device" },
            { icon: upgrade,             title: "Upgrade Suggestions",       desc: "Discover smart upgrades for maximum performance improvements",  page: "upgrade" },
            { icon: compare,             title: "Compare Devices",           desc: "Side-by-side comparison of computers and components",           page: "compare" },
            { icon: performanceanalysis, title: "Performance Analysis",      desc: "Deep dive into benchmarks and performance metrics",             page: "performance" },
            { icon: marketalerts,        title: "Market Alerts",             desc: "Get notified about price drops and availability changes",       page: "market alerts" },
          ].map((f, i) => (
            <div className="lm-feature-card" key={i}>
              <div className="lm-feature-top">
                <img src={f.icon} width={32} height={32} alt="" />
                <img src={arrow} width={18} height={18} alt="" onClick={() => setCurrentPage(f.page)} style={{ cursor: "pointer" }} />
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#111827", marginBottom: "8px" }}>{f.title}</div>
              <div style={{ fontSize: "1.1rem", color: "#6b7280", lineHeight: "1.65", maxWidth: "300px" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}