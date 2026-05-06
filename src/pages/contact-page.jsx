import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, Loader } from 'lucide-react';
import light from "../assets/light.svg";
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = "https://techwiseapp.runasp.net";
const USE_MOCK = false; // ← موك شغال

const MOCK_CONTACT_RES = { message: "Message sent successfully" };

const styles = `
  .ct-page {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #fff;
    color: #1e293b;
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 20px 60px;
  }
  .ct-hero {
    text-align: center;
    margin-bottom: 36px;
  }
  .ct-hero h1 {
    font-size: 2.6rem;
    font-weight: 700;
    color: #155DFC;
    margin-bottom: 10px;
  }
  .ct-hero p {
    font-size: 1.1rem;
    color: #475569;
    margin: 0;
  }
  .ct-banner {
    background: #EDF5FF;
    border: 1px solid #bfdbfe;
    border-radius: 12px;
    padding: 20px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 28px;
  }
  .ct-banner-text strong {
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
    color: #155DFC;
    margin-bottom: 4px;
  }
  .ct-banner-text span {
    font-size: 1rem;
    color: #063FBF;
  }
  .ct-banner-btn {
    background: #155DFC;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 11px 22px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .ct-form-card {
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 36px;
    margin-bottom: 28px;
  }
  .ct-form-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.3rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 6px;
  }
  .ct-form-title svg { color: #155DFC; }
  .ct-form-sub {
    font-size: 1rem;
    color: #64748b;
    margin-bottom: 24px;
  }
  .ct-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  .ct-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .ct-field label {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
  }
  .ct-field input,
  .ct-field textarea {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 1rem;
    color: #1e293b;
    outline: none;
    transition: border-color 0.15s;
    font-family: inherit;
    background: #f9fafb;
  }
  .ct-field input::placeholder,
  .ct-field textarea::placeholder { color: #94a3b8; }
  .ct-field input:focus,
  .ct-field textarea:focus {
    border-color: #155DFC;
    background: #fff;
  }
  .ct-field textarea { resize: none; }
  .ct-submit {
    width: 100%;
    background: #155DFC;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 15px;
    font-size: 1.05rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .ct-submit:hover:not(:disabled) { background: #1248d4; }
  .ct-submit:disabled { opacity: 0.7; cursor: not-allowed; }
  .ct-error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 0.95rem;
    margin-bottom: 16px;
  }
  .ct-success {
    text-align: center;
    padding: 32px 0;
  }
  .ct-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }
  .ct-info-card {
    border: 1px solid #EFF6FF;
    border-radius: 12px;
    padding: 22px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .ct-info-icon {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ct-info-card h6 {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 4px;
  }
  .ct-info-card p {
    font-size: 0.95rem;
    color: #64748b;
    margin: 0;
  }
  .ct-info-card a {
    font-size: 0.95rem;
    color: #155DFC;
    text-decoration: none;
    font-weight: 500;
  }
  .ct-promise {
    background: #EDF5FF;
    border: 1px solid #bfdbfe;
    border-radius: 12px;
    padding: 32px 36px;
    text-align: center;
  }
  .ct-promise-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 1.15rem;
    font-weight: 700;
    color: #155DFC;
    margin-bottom: 10px;
  }
  .ct-promise p {
    font-size: 1rem;
    color: #063FBF;
    margin: 0;
    line-height: 1.65;
  }
  .ct-spin {
    animation: ct-spin-anim 1s linear infinite;
  }
  @keyframes ct-spin-anim {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @media (max-width: 768px) {
    .ct-row        { grid-template-columns: 1fr; }
    .ct-info-grid  { grid-template-columns: 1fr; }
    .ct-banner     { flex-direction: column; align-items: flex-start; }
    .ct-page       { padding: 32px 16px 40px; }
    .ct-form-card  { padding: 20px; }
    .ct-promise    { padding: 20px; }
  }
  @media (max-width: 480px) {
    .ct-hero h1   { font-size: 1.8rem; }
    .ct-info-card { flex-direction: column; align-items: flex-start; gap: 10px; }
  }
`;

const ContactPage = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setIsLoading(true);

    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("Mock Response:", MOCK_CONTACT_RES);
      } else {
        const res = await fetch(`${BASE_URL}/api/Support/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            message: formData.message,
          }),
        });
        if (!res.ok) throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: '', email: '', message: '' });
      }, 3000);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ct-page">

        <div className="ct-hero">
          <h1>Get in Touch with us</h1>
          <p>Have questions, feedback, or need help? We're here for you. Reach out through any of the methods below and we'll get back to you quickly.</p>
        </div>


        <div className="ct-form-card">
          <div className="ct-form-title">
            <Send size={20} />
            Send us a Message
          </div>
          <p className="ct-form-sub">Fill out the form below and we'll get back to you as soon as possible</p>

          {apiError && (
            <div className="ct-error">
              ❌ {apiError}
            </div>
          )}

          {isSubmitted ? (
            <div className="ct-success">
              <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 20px' }}>
                <div style={{ width: 80, height: 80, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={40} color="#fff" />
                </div>
                <span style={{ position: 'absolute', top: 0, right: -8, width: 10, height: 10, background: '#155DFC', borderRadius: '50%' }} />
                <span style={{ position: 'absolute', bottom: 4, left: -10, width: 7, height: 7, background: '#155DFC', borderRadius: '50%' }} />
                <span style={{ position: 'absolute', top: 10, left: -14, width: 5, height: 5, background: '#22c55e', borderRadius: '50%' }} />
              </div>
              <h4 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 16 }}>Your message sent Successfully</h4>
              <div style={{ height: 3, borderRadius: 999, background: 'linear-gradient(to right, #22c55e, #155DFC)', width: '60%', margin: '0 auto' }} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="ct-row">
                <div className="ct-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="ct-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="ct-field" style={{ marginBottom: '16px' }}>
                <label>Message</label>
                <textarea
                  rows={5}
                  placeholder="Type your Message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="ct-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader size={18} className="ct-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>

        <div className="ct-info-grid">
          <div className="ct-info-card">
            <div className="ct-info-icon" style={{ background: '#F3F4F6' }}>
              <Mail size={22} color="#155DFC" />
            </div>
            <div>
              <h6>Email Support</h6>
              <p>support@smartpcadvisor.com</p>
            </div>
          </div>
          <div className="ct-info-card">
            <div className="ct-info-icon" style={{ background: '#F3F4F6' }}>
              <Phone size={22} color="#16a34a" />
            </div>
            <div>
              <h6>Phone Support</h6>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="ct-info-card">
            <div className="ct-info-icon" style={{ background: '#F3F4F6' }}>
              <img src={light} alt="check" style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h6>Need Immediate Help?</h6>
              <p style={{ whiteSpace: 'nowrap' }}>Check out our FAQ for quick answers</p>
              <a onClick={() => setCurrentPage('faq')} style={{ cursor: 'pointer', color: '#155DFC', display: 'block', textAlign: 'center', marginTop: '4px' }}>Visit FAQ</a>
            </div>
          </div>
        </div>

        <div className="ct-promise">
          <div className="ct-promise-title">
            <CheckCircle size={20} />
            Our Response Promise
          </div>
          <p>We're committed to providing excellent customer service. You can expect a response to your inquiry<br />within 24 hours during business days. For urgent technical issues, we typically respond within 4 hours.</p>
        </div>

      </div>
    </>
  );
};

export default ContactPage;