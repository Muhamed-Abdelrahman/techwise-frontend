import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/login.css";
import logo from "../assets/logo.svg";
import LetterIcon from "../assets/Letter.svg";
import { AuthService } from "../services/authService";

const bgStyles = {
  wrapper: { minHeight: '100vh', width: '100%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px', position: 'relative', overflow: 'hidden', fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  circle: { position: 'absolute', borderRadius: '50%', background: '#ABC5FF', zIndex: 0 },
  circleLeft: { width: '300px', height: '320px', top: '90px', left: '-170px', opacity: 0.8 },
  circleRight: { width: '300px', height: '350px', bottom: '-120px', right: '-170px', opacity: 0.8 },
};

const ResetPasswordPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await AuthService.forgetPassword(email);
      localStorage.setItem("resetEmail", email);
      setCurrentPage("verify");
    } catch (err) {
      setError(err.message || "Failed to send reset code.");
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
        <h2 className="login-title">Reset Password</h2>
        <p className="login-subtitle">Please enter your registered email and we'll send you a code</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <img src={LetterIcon} alt="Email" width="24" height="24" />
              </span>
              <input
                type="email"
                className="form-control login-input"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
          {error && <p style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{error}</p>}
          <button type="submit" className="login-btn w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
        <p className="signup-link">
          Remembered your password?{" "}
          <a href="#!" onClick={(e) => { e.preventDefault(); setCurrentPage("login"); }}>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;