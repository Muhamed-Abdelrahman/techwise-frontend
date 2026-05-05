import React from 'react';
import light        from "../assets/light.svg";
import accessability from "../assets/about-img/accessability.svg";
import ai_img       from "../assets/about-img/ai-img.svg";
import impowering   from "../assets/about-img/impowering.svg";
import innovation   from "../assets/about-img/innovation.svg";
import mission      from "../assets/about-img/mission.svg";
import personalized from "../assets/about-img/personalized.svg";
import realtime     from "../assets/about-img/realtime.svg";
import transparency from "../assets/about-img/transparency.svg";
import trusted      from "../assets/about-img/trusted.svg";
import user_first   from "../assets/about-img/user-first.svg";
import vission      from "../assets/about-img/vission.svg";
import check        from "../assets/check.svg";
import Vector       from "../assets/about-img/Vector.svg";
import Icon1        from "../assets/about-img/icon.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Topfooter from '../components/Topfooter';

const styles = `
  .ab-page {
    font-family: 'Segoe UI', system-ui, sans-serif;
    color: #1e293b;
    background: #fff;
  }

  /* ── Hero ── */
  .ab-hero {
    padding: 60px 20px 40px;
    text-align: center;
    max-width: 1000px;
    margin: 0 auto;
  }
  .ab-hero h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #155DFC;
    margin-bottom: 16px;
  }
  .ab-hero p {
    font-size: 1.15rem;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 28px;
  }
  .ab-year-badge {
    display: inline-block;
    background: #EDF5FF;
    color: #193CB8;
    border: 1px solid #bfdbfe;
    border-radius: 999px;
    padding: 8px 32px;
    font-size: 1rem;
    font-weight: 500;
  }

  /* ── Our Story ── */
  .ab-story-wrap {
    background: #f0f5ff;
    border-radius: 20px;
    margin: 32px auto;
    max-width: 1200px;
    padding: 40px;
  }
  .ab-story-inner {
    display: flex;
    align-items: center;
    gap: 40px;
  }
  .ab-story-img-col {
    position: relative;
    flex-shrink: 0;
    width: 420px;
  }
  .ab-story-img-col img.main-img {
    width: 100%;
    height: 320px;
    object-fit: cover;
    border-radius: 16px;
    display: block;
  }
  .ab-float-badge {
    position: absolute;
    background: #fff;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ab-float-badge.top    { top: 14px; right: 14px; }
  .ab-float-badge.bottom { bottom: 14px; left: 14px; }
  .ab-float-badge img    { width: 16px; height: 16px; }
  .ab-float-badge .dot {
    width: 8px; height: 8px;
    background: #155DFC;
    border-radius: 50%;
  }
  .ab-story-text h2 {
    font-size: 1.7rem;
    font-weight: 700;
    color: #155DFC;
    margin-bottom: 16px;
  }
  .ab-story-text p {
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.75;
    margin-bottom: 14px;
  }
  .ab-story-text p:last-child { margin-bottom: 0; }

  /* ── Mission & Vision ── */
  .ab-mv-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .ab-mv-card {
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 32px 28px;
    background: #F9FAFB;
  }
  .ab-mv-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
  }
  .ab-mv-header img {
    width: 44px;
    height: 44px;
    object-fit: contain;
  }
  .ab-mv-card h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  .ab-mv-card p {
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.75;
    margin: 0;
  }

  /* ── Our Values ── */
  .ab-values-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 20px 48px;
  }
  .ab-values-section h2 {
    font-size: 1.9rem;
    font-weight: 700;
    color: #155DFC;
    text-align: center;
    margin-bottom: 32px;
  }
  .ab-values-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .ab-value-card {
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 28px 20px;
    text-align: center;
    background: #fff;
  }
  .ab-value-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px;
  }
  .ab-value-icon-wrap img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
  .ab-value-card h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 10px;
  }
  .ab-value-card p {
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }

  /* ── Empowering ── */
  .ab-empower-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 20px;
    display: flex;
    align-items: center;
    gap: 48px;
  }
  .ab-empower-text { flex: 1; }
  .ab-empower-text h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #155DFC;
    margin-bottom: 20px;
  }
  .ab-empower-text p {
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.75;
    margin-bottom: 14px;
  }
  .ab-empower-img-col {
    flex-shrink: 0;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    overflow: hidden;
  }
  .ab-empower-img-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ── What Makes Us Different ── */
  .ab-diff-section {
    border-radius: 20px;
    max-width: 1200px;
    margin: 0 auto 60px;
    padding: 40px;
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }
  .ab-diff-left { flex: 1; }
  .ab-diff-left h2 {
    font-size: 1.7rem;
    font-weight: 700;
    color: #155DFC;
    margin-bottom: 14px;
  }
  .ab-diff-left p {
    font-size: 1.05rem;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 18px;
  }
  .ab-checklist {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ab-checklist li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: #1e293b;
  }
  .ab-diff-right {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 420px;
    flex-shrink: 0;
  }
  .ab-diff-card {
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 22px 18px;
    text-align: center;
    background: #fff;
  }
  .ab-diff-card img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-bottom: 12px;
  }
  .ab-diff-card h5 {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 6px;
  }
  .ab-diff-card p {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .ab-story-inner        { flex-direction: column; }
    .ab-story-img-col      { width: 100%; }
    .ab-mv-section         { grid-template-columns: 1fr; }
    .ab-values-grid        { grid-template-columns: 1fr 1fr; }
    .ab-empower-section    { flex-direction: column; }
    .ab-empower-img-col    { width: 200px; height: 200px; margin: 0 auto; }
    .ab-diff-section       { flex-direction: column; }
    .ab-diff-right         { width: 100%; }
  }
  @media (max-width: 560px) {
    .ab-hero h1            { font-size: 2rem; }
    .ab-values-grid        { grid-template-columns: 1fr 1fr; }
    .ab-story-wrap,
    .ab-diff-section       { padding: 20px; }
  }
`;

const AboutPage = ({ setCurrentPage }) => {
  return (
    <>
      <style>{styles}</style>
      <div className="ab-page">

        {/* ── Hero ── */}
        <div className="ab-hero">
          <h1>About TeckWise</h1>
          <p>Smart PC Advisor is a next-generation AI platform designed to help users make smarter tech decisions. We combine data, analytics, and artificial intelligence to recommend the best computers and upgrades for every user.</p>
          <span className="ab-year-badge">Developed in 2026</span>
        </div>

        {/* ── Our Story ── */}
        <div style={{ padding: '0 20px' }}>
          <div className="ab-story-wrap">
            <div className="ab-story-inner">
              <div className="ab-story-img-col">
                <img src={ai_img} alt="AI" className="main-img" />
                <div className="ab-float-badge top" style={{ top: '-12px', right: '-12px' }}>
                  <img src={Icon1} alt="" />
                  AI-Powered
                </div>
                <div className="ab-float-badge bottom" style={{ left: '-12px' }}>
                  <img src={Vector} alt="" />
                  Trusted Analysis
                </div>
              </div>

              <div className="ab-story-text">
                <h2>Our Story</h2>
                <p>TechWise was born from a simple observation: choosing the right computer or evaluating a used device shouldn't require expert-level knowledge or hours of research.</p>
                <p>As technology enthusiasts and developers, we experienced firsthand the overwhelming complexity of PC markets—countless specifications, fluctuating prices, and conflicting advice. We knew there had to be a better way.</p>
                <p>By combining our expertise in artificial intelligence, market analysis, and user experience design, we created a platform that transforms complex data into clear, actionable recommendations. Today, Smart PC Advisor helps thousands of users make confident technology decisions every day.</p>
                <p>Our journey continues as we refine our algorithms, expand our database, and develop new features to serve our growing community better.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mission & Vision ── */}
        <div className="ab-mv-section">
          <div className="ab-mv-card">
            <div className="ab-mv-header">
              <img src={mission} alt="Mission" />
              <h3>Our Mission</h3>
            </div>
            <p>To empower everyone with the knowledge and tools they need to make smart, informed decisions about computer technology. We believe that with the right information, anyone can find the perfect computer setup for their needs and budget.</p>
          </div>
          <div className="ab-mv-card">
            <div className="ab-mv-header">
              <img src={vission} alt="Vision" />
              <h3>Our Vision</h3>
            </div>
            <p>A world where technology decisions are transparent, accessible, and tailored to individual needs. We envision a future where buying a computer is as simple and confident as any other major purchase decision.</p>
          </div>
        </div>

        {/* ── Our Values ── */}
        <div className="ab-values-section">
          <h2>Our Values</h2>
          <div className="ab-values-grid">
            <div className="ab-value-card">
              <div className="ab-value-icon-wrap" style={{ background: '#F9FAFB' }}>
                <img src={transparency} alt="Transparency" />
              </div>
              <h4>Transparency</h4>
              <p>We believe in honest, clear recommendations without hidden agendas or sponsored content.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon-wrap" style={{ background: '#F9FAFB' }}>
                <img src={user_first} alt="User-First" />
              </div>
              <h4>User-First</h4>
              <p>Every feature we build is designed with our users' needs and success in mind.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon-wrap" style={{ background: '#F9FAFB' }}>
                <img src={innovation} alt="Innovation" />
              </div>
              <h4>Innovation</h4>
              <p>We continuously push the boundaries of what's possible with AI and technology.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon-wrap" style={{ background: '#F9FAFB' }}>
                <img src={accessability} alt="Accessibility" />
              </div>
              <h4>Accessibility</h4>
              <p>Technology should be accessible to everyone, regardless of their technical background.</p>
            </div>
          </div>
        </div>

        {/* ── Empowering ── */}
        <div className="ab-empower-section">
          <div className="ab-empower-text">
            <h2>Empowering Smart PC Decisions Through AI</h2>
            <p>TechWise was born from a simple observation: making informed decisions about PC hardware is unnecessarily complicated. Whether you're buying your first gaming PC, upgrading an existing system, or evaluating a used device, you deserve clear, trustworthy guidance.</p>
            <p>Our platform combines cutting-edge AI technology with comprehensive benchmark data to provide you with personalized insights. We analyze performance metrics, market prices, and compatibility factors to help you make decisions that align with your needs and budget.</p>
            <p>From students to professionals, gamers to content creators, TechWise serves thousands of users who want to maximize their PC investment. Our mission is to democratize access to expert-level hardware knowledge, making it accessible to everyone.</p>
          </div>
          <div className="ab-empower-img-col">
            <img src={impowering} alt="Empowering" />
          </div>
        </div>

        {/* ── What Makes Us Different ── */}
        <div style={{ padding: '0 20px' }}>
          <div className="ab-diff-section" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
            <div className="ab-diff-left">
              <h2>What Makes Us Different</h2>
              <p>Unlike traditional recommendation sites that rely on static guides or biased reviews, Smart PC Advisor uses real-time AI analysis to provide personalized recommendations based on your specific needs, budget, and usage patterns.</p>
              <ul className="ab-checklist">
                {[
                  'Real-time market analysis and pricing',
                  'Compatibility checking and verification',
                  'Real-time market analysis and pricing',
                  'Cost-benefit analysis for upgrades',
                  'Future-proofing recommendations',
                  'Expert-level technical insights',
                ].map((item, i) => (
                  <li key={i}>
                    <img src={check} alt="check" style={{ width: 20, height: 20 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ab-diff-right">
              <div className="ab-diff-card">
                <img src={light} alt="Smart Analysis" />
                <h5>Smart Analysis</h5>
                <p>AI-powered insights that understand your unique needs</p>
              </div>
              <div className="ab-diff-card">
                <img src={realtime} alt="Real-time Data" />
                <h5>Real-time Data</h5>
                <p>Always up-to-date pricing and performance metrics</p>
              </div>
              <div className="ab-diff-card">
                <img src={personalized} alt="Personalized" />
                <h5>Personalized</h5>
                <p>Tailored recommendations for your specific use case</p>
              </div>
              <div className="ab-diff-card">
                <img src={trusted} alt="Trusted" />
                <h5>Trusted</h5>
                <p>Unbiased recommendations with clear explanations</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Topfooter />
    </>
  );
};

export default AboutPage;