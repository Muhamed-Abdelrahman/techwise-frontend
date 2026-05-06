import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/login.css";
import logo from "../assets/logo.svg";
import LockIcon from "../assets/Lock.svg";
import EyeClosedIcon from "../assets/Eye_Closed.svg";
import { AuthService } from "../services/authService";

const bgStyles = {
  wrapper: { minHeight: '100vh', width: '100%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  circle: { position: 'absolute', borderRadius: '50%', background: '#ABC5FF', zIndex: 0 },
  circleLeft: { width: '300px', height: '320px', top: '90px', left: '-170px', opacity: 0.8 },
  circleRight: { width: '300px', height: '350px', bottom: '-120px', right: '-170px', opacity: 0.8 },
};

const NewPasswordPage = ({ setCurrentPage }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await AuthService.resetPassword(newPassword, confirmPassword);
      setShowSuccess(true);
      setTimeout(() => setCurrentPage("login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={bgStyles.wrapper}>
      <style>{`.login-card::before { display: none !important; }`}</style>
      <div style={{ ...bgStyles.circle, ...bgStyles.circleLeft }} />
      <div style={{ ...bgStyles.circle, ...bgStyles.circleRight }} />
      <div className="login-card" style={{ position: 'relative', zIndex: 1 }}>
        <div className="login-logo">
          <img src={logo} alt="TECHWISE Logo" />
        </div>
        <h2 className="login-title">New Password</h2>
        <p className="login-subtitle">Please enter a new Password</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: '18px', fontWeight: 500, color: '#1a1a1a' }}>New Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <img src={LockIcon} alt="Lock" width="24" height="24" />
              </span>
              <input
                type={showNew ? "text" : "password"}
                className="form-control login-input"
                placeholder="••••••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button type="button" className="password-toggle" onClick={() => setShowNew(!showNew)}>
                <img src={EyeClosedIcon} alt="Toggle" width="24" height="24" />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ fontSize: '18px', fontWeight: 500, color: '#1a1a1a' }}>Repeat your New Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <img src={LockIcon} alt="Lock" width="24" height="24" />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                className="form-control login-input"
                placeholder="••••••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                <img src={EyeClosedIcon} alt="Toggle" width="24" height="24" />
              </button>
            </div>
          </div>
          {error && <p style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{error}</p>}
          <button type="submit" className="login-btn w-100" disabled={loading}>
            {loading ? "Saving..." : "Confirm"}
          </button>
        </form>
      </div>
      {showSuccess && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "36px 40px", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", minWidth: 300 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#22c55e", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h5 style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: 8, fontSize: 18 }}>Your Password has been<br/>Changed Successfully</h5>
            <div style={{ marginTop: 20, height: 4, background: "#e5e7eb", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#22c55e", borderRadius: 2, animation: "progress 2s linear forwards", width: "100%" }} />
            </div>
            <style>{`@keyframes progress { from { width: 100%; } to { width: 0%; } }`}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPasswordPage;