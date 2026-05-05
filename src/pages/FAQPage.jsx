import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ask from "../assets/ask.svg";
import Topfooter from '../components/Topfooter';

const faqs = [
  { q: 'What is TechWise?', a: 'TechWise is an AI-powered platform that helps users analyze PC performance, choose the right computer, evaluate used devices, and get smart upgrade recommendations.' },
  { q: 'How does the platform recommend the best PC for me?', a: 'Our AI analyzes your input — such as budget, purpose (gaming, design, office, etc.), and preferences — then suggests the best PC configurations available in the market.' },
  { q: 'Can I check the value of my used computer?', a: 'Yes! You can enter your device specifications, and the system will estimate its current market value using AI-based price evaluation.' },
  { q: 'Is technical knowledge required to use TechWise?', a: 'No. TechWise is designed with a user-friendly interface that simplifies technical details for all users.' },
  { q: 'How accurate are the AI recommendations?', a: 'Our AI model is trained on real-world market data and continuously updated to ensure accurate pricing, compatibility, and performance analysis.' },
  { q: 'Do I need to create an account to use the website?', a: 'You can explore basic features without signing up, but creating an account allows you to save analyses, reports, and receive personalized alerts.' },
  { q: 'Is my data safe on TechWise?', a: 'Yes. All user data is securely stored and handled according to GDPR privacy standards.' },
  { q: 'Can I compare two or more computers?', a: 'Yes! The comparison tool lets you analyze performance, price, and specifications side-by-side to make better purchasing or upgrading decisions.' },
  { q: 'Does TechWise work on mobile devices?', a: 'Yes, the platform is fully responsive and works smoothly on desktops, tablets, and smartphones.' },
  { q: 'Is the basic recommendation service free?', a: 'Yes! Basic PC recommendations are completely free.' },
  { q: 'Can I trust your recommendations are unbiased?', a: "Absolutely. We don't accept payments from manufacturers and our AI focuses purely on performance, value, and compatibility." },
];

export default function FAQPage({ setCurrentPage }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      background: '#f9fafb',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        .faq-page-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(32px, 5vw, 56px) clamp(16px, 4vw, 24px) 60px;
        }
        .faq-search-input {
          width: 100%;
          padding: 12px 14px 12px 44px;
          border: 1px solid #e5e9f0;
          border-radius: 10px;
          font-size: 0.9375rem;
          color: #374151;
          outline: none;
          transition: border-color .2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        .faq-search-input:focus { border-color: #155DFC; }
        .faq-search-input::placeholder { color: #9ca3af; }
        .contact-btn {
          background: #155DFC;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 11px 28px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .contact-btn:hover { opacity: .88; }

        /* ✅ الـ paragraph في سطر واحد */
        .faq-subtitle {
          font-size: 0.82rem;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          display: block;
        }
      `}</style>

      <div className="faq-page-inner">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '700', color: '#155DFC', margin: '0 0 8px 0' }}>
            Frequently Asked Questions
          </h1>
          {/* ✅ سطر واحد ثابت */}
          <p className="faq-subtitle">
            Find Quick answers to common questions about TechWise
          </p>
        </div>

        {/* ✅ Search + FAQ List في كونتينر واحد */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e9f0',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: 'clamp(20px, 4vw, 36px)',
        }}>

          {/* ✅ Search بأيقونة lucide زي الأصل */}
          <div style={{ padding: 'clamp(16px, 3vw, 28px)', borderBottom: '1px solid #f0f2f8' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', color: '#9ca3af' }} />
              <input
                className="faq-search-input"
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* FAQ List */}
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
              No results found. Try different keywords.
            </div>
          ) : (
            filtered.map((faq, i) => (
              <div key={i} style={{
                padding: 'clamp(16px, 2.5vw, 22px) clamp(16px, 3vw, 28px)',
                borderBottom: i < filtered.length - 1 ? '1px solid #f0f2f8' : 'none',
              }}>
                <h3 style={{ fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)', fontWeight: '700', color: '#111827', marginBottom: '8px', lineHeight: '1.5' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '.8.5rem', color: '#4b5563', lineHeight: '1.75', margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Still have questions */}
        <div style={{ background: '#fff', border: '1px solid #e5e9f0', borderRadius: '16px', padding: 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 40px)', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <img src={ask} alt="contact" width={26} height={26} />
          </div>
          <h2 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            Still have questions?
          </h2>
        <p style={{ fontSize:'0.8rem', color: '#4b5563', margin: '0 auto 20px', whiteSpace: 'nowrap' }}>
  Can't find the answer you're looking for? Our support team is here to help you with any questions or concerns.
</p>
          <button className="contact-btn" onClick={() => setCurrentPage('contact')}>
            Contact Us
          </button>
        </div>

      </div>
      <Topfooter/>
    </div>
  );
}