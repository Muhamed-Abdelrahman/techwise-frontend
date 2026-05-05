import React, { useState, useEffect } from 'react';
import ask from "../assets/ask.svg";
const faqs = [
  {
    question: "What is TechWise?",
    answer: "TechWise is an AI-powered platform that helps users analyze PC performance, choose the right computer, evaluate used devices, and get smart upgrade recommendations.",
  },
  {
    question: "How does TechWise analyze PC performance?",
    answer: "TechWise analyzes your device specifications such as CPU, GPU, RAM, and storage, then compares them with benchmarks and usage scenarios using AI algorithms.",
  },
  {
    question: "Can TechWise help me choose the right computer?",
    answer: "Yes. TechWise recommends the most suitable devices based on your budget, usage needs, and performance expectations.",
  },
  {
    question: "Does TechWise support gaming and professional use cases?",
    answer: "Yes. TechWise supports gaming, programming, graphic design, video editing, and office work use cases.",
  },
  {
    question: "Can I evaluate the price of a used PC?",
    answer: "Yes. By entering your device specifications and selecting its condition, TechWise provides an estimated market price range.",
  },
];

export default function FAQSection({ setCurrentPage }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % faqs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      padding: "clamp(24px, 4vw, 35px) clamp(16px, 5vw, 60px) clamp(48px, 10vw, 100px)",
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>

      <style>{`
        .faq-outer {
          position: relative;
          border: 1px solid #e5e9f0;
          border-radius: 24px;
          padding: clamp(56px, 8vw, 80px) clamp(16px, 3vw, 20px) clamp(32px, 5vw, 60px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .faq-viewall-btn {
          position: absolute;
          top: clamp(20px, 3vw, 40px);
          right: clamp(16px, 5vw, 60px);
          background: #DDEDFF;
          border: none;
          border-radius: 20px;
          padding: 8px 20px;
          font-size: clamp(0.75rem, 2vw, 0.875rem);
          color: #155DFC;
          cursor: pointer;
          white-space: nowrap;
        }
        .faq-header {
          text-align: center;
          margin-bottom: clamp(24px, 4vw, 48px);
        }
        .faq-header h2 {
          font-size: clamp(1.3rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #155DFC;
          margin: 0 0 12px 0;
        }
        .faq-header p {
          font-size: clamp(0.9rem, 2.5vw, 1.5rem);
          color: #4A5565;
          margin: 0;
        }
        .faq-body {
          display: flex;
          flex-direction: row;
          max-width: 1200px;
          margin: 0 auto;
          align-items: stretch;
        }
        .faq-questions {
          flex: 0 0 46%;
          border: 1px solid #e5e9f0;
          background: #ffffff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          z-index: 2;
          border-radius: 16px 0 0 16px;
          display: flex;
          flex-direction: column;
        }
        .faq-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: clamp(14px, 2.5vw, 26px) clamp(16px, 3vw, 28px);
          cursor: pointer;
          transition: background 0.2s;
        }
        .faq-item span {
          font-size: clamp(0.85rem, 1.8vw, 16px);
          color: #000000;
          flex: 1;
        }
        .faq-answer {
          flex: 1;
          border: 1px solid #e5e9f0;
          border-left: none;
          border-radius: 0 16px 16px 0;
          background: #f8f9ff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          padding: clamp(24px, 4vw, 40px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .faq-answer h3 {
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }
        .faq-answer p {
          font-size: clamp(0.875rem, 2vw, 17px);
          color: #000000;
          line-height: 1.75;
          margin: 0;
        }
        @media (max-width: 767px) {
          .faq-body {
            flex-direction: column;
          }
          .faq-questions {
            flex: none;
            border-radius: 16px 16px 0 0;
          }
          .faq-answer {
            border-left: 1px solid #e5e9f0;
            border-top: none;
            border-radius: 0 0 16px 16px;
          }
        }
        @media (max-width: 480px) {
          .faq-outer { border-radius: 16px; }
        }
      `}</style>

      <div className="faq-outer">

        <button className="faq-viewall-btn" onClick={() => setCurrentPage("faq")}>
          View All
        </button>

        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions about SmartPC</p>
        </div>

        <div className="faq-body">

          {/* Left — Questions list */}
          <div className="faq-questions">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item"
                onClick={() => setSelected(i)}
                style={{
                  borderBottom: i < faqs.length - 1 ? "1px solid #f0f2f8" : "none",
                  background: selected === i ? "#f8f9ff" : "#ffffff",
                }}
              >
                <div style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: selected === i ? "#155DFC" : "#c5c8f0",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }} />
                <span>{faq.question}</span>
                <svg
                  width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke={selected === i ? "#3b5bdb" : "#aaa"}
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            ))}
          </div>

          {/* Right — Answer */}
          <div className="faq-answer">
            <h3>{faqs[selected].question}</h3>
            <p>{faqs[selected].answer}</p>
          </div>

        </div>
      </div>
      
    </section>
  );
}