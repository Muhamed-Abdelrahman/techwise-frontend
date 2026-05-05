import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.svg';
import { AuthService } from '../services/authService';

const SignupVerifyPage = ({ setCurrentPage, setIsLoggedIn }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRefs = useRef([]);
  const email = localStorage.getItem("signupEmail") || "";

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newCode = [...code];
    pasted.split('').forEach((digit, i) => {
      if (i < 6) newCode[i] = digit;
    });
    setCode(newCode);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) return;
    setError("");
    setLoading(true);
    try {
      await AuthService.verifyEmail(email, fullCode);
      setShowSuccess(true);
      setTimeout(() => {
        localStorage.removeItem("signupEmail");
        setIsLoggedIn && setIsLoggedIn(true);
        setCurrentPage && setCurrentPage('home');
      }, 2000);
    } catch (err) {
      setError(err.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

    const handleResend = async () => {
  if (!email) return;
  try {
    // POST /api/auth/resend-verification
    await AuthService.resendVerification(email);
    alert('Verification code resent to your email!');
  } catch (err) {
    alert(err.message || 'Failed to resend code.');
  }
};

  const handleGoBack = (e) => {
    e.preventDefault();
    localStorage.removeItem("signupEmail");
    setCurrentPage && setCurrentPage('signup');
  };

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.circle, ...styles.circleLeft }} />
      <div style={{ ...styles.circle, ...styles.circleRight }} />
      <div style={{ ...styles.circle, ...styles.circleTopRight }} />
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <img src={logo} alt="TECHWISE Logo" style={styles.logo} />
        </div>
        <h2 style={styles.title}>Verify Your Email</h2>
        <p style={styles.subtitle}>
          We have sent a code to <strong style={{ color: '#1a1a1a' }}>{email}</strong>
        </p>
        <div style={styles.codeSection}>
          <label style={styles.codeLabel}>Code</label>
          <div style={styles.inputRow} onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  ...styles.codeInput,
                  borderColor: digit ? '#155DFC' : '#e5e7eb',
                  color: '#1a1a1a',
                  background: '#f9fafb'
                }}
              />
            ))}
          </div>
        </div>
        {error && <p style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button
          onClick={handleVerify}
          disabled={code.join('').length !== 6 || loading}
          style={{
            ...styles.verifyBtn,
            opacity: code.join('').length !== 6 || loading ? 0.7 : 1,
            cursor: code.join('').length !== 6 || loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>
        <p style={styles.resendText}>
          Didn't receive the code?{' '}
          <button onClick={handleResend} style={styles.resendLink}>Try again</button>
        </p>
        <p style={{ ...styles.resendText, marginTop: 16 }}>
          Wrong email?{' '}
          <a href="#!" onClick={handleGoBack} style={styles.resendLink}>Go back</a>
        </p>
      </div>

      {showSuccess && (
        <div style={styles.overlay}>
          <div style={styles.successCard}>
            <div style={styles.successIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h5 style={styles.successTitle}>Verified Successfully</h5>
            <p style={styles.successSubtitle}>Your account has been verified</p>
            <div style={styles.progressTrack}>
              <div style={styles.progressFill} />
            </div>
            <style>{"@keyframes vprogress { from { width: 100%; } to { width: 0%; } }"}</style>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: { minHeight: '100vh', width: '100%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  circle: { position: 'absolute', borderRadius: '50%', background: '#ABC5FF', zIndex: 0 },
  circleLeft: { width: '300px', height: '320px', top: '90px', left: '-170px', opacity: 0.8 },
  circleRight: { width: '300px', height: '350px', bottom: '-120px', right: '-170px', opacity: 0.8 },
  circleTopRight: { width: '300px', height: '350px', top: '-220px', right: '-400px', opacity: 0.6, zIndex: -1 },
  card: { background: '#ffffff', borderRadius: '10px', padding: '50px 80px', width: '100%', maxWidth: '550px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 },
  logoWrap: { marginBottom: '20px', textAlign: 'center' },
  logo: { maxWidth: '220px', height: 'auto' },
  title: { fontSize: '28px', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', textAlign: 'center', letterSpacing: '-0.3px' },
  subtitle: { fontSize: '15px', color: '#6b7280', marginBottom: '28px', textAlign: 'center', lineHeight: 1.6 },
  codeSection: { width: '100%', marginBottom: '24px' },
  codeLabel: { display: 'block', fontSize: '18px', color: '#1a1a1a', marginBottom: '12px', fontWeight: 500, opacity: 0.95 },
  inputRow: { display: 'flex', gap: '12px', justifyContent: 'flex-start' },
  codeInput: { width: '52px', height: '52px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', fontSize: '22px', fontWeight: 600, outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' },
  verifyBtn: { width: '100%', padding: '15px', background: '#155DFC', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 600, marginBottom: '24px', letterSpacing: '0.2px', transition: 'background 0.2s' },
  resendText: { fontSize: '15px', color: '#4A5565', margin: 0, textAlign: 'center' },
  resendLink: { background: 'none', border: 'none', color: '#155DFC', fontWeight: 500, fontSize: '15px', cursor: 'pointer', padding: 0, textDecoration: 'none' },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.35)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" },
  successCard: { background: "#fff", borderRadius: 16, padding: "40px 48px", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", minWidth: 320 },
  successIcon: { width: 72, height: 72, borderRadius: "50%", background: "#22c55e", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" },
  successTitle: { fontWeight: 700, color: "#1a1a1a", marginBottom: 8, fontSize: 20 },
  successSubtitle: { color: "#aaa", fontSize: 14, margin: 0 },
  progressTrack: { marginTop: 20, height: 4, background: "#e5e7eb", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", background: "#22c55e", borderRadius: 2, animation: "vprogress 2s linear forwards" }
};

export default SignupVerifyPage;