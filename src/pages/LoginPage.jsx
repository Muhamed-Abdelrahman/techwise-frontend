import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/login.css";
import logo from "../assets/logo.svg";
import LetterIcon from "../assets/Letter.svg";
import LockIcon from "../assets/Lock.svg";
import EyeClosedIcon from "../assets/Eye_Closed.svg";
import { AuthService } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = ({ setCurrentPage, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [googleHovered, setGoogleHovered] = useState(false);

  // ── Email/Password Login ──────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await AuthService.login({
        email: formData.email,
        password: formData.password,
      });
      setIsLoggedIn && setIsLoggedIn(true);
      setCurrentPage && setCurrentPage("home");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Google Login ──────────────────────────────────────────
  const handleGoogleSuccess = async (credentialResponse) => {
    setSocialLoading("google");
    setError("");
    try {
      console.log("Google response:", credentialResponse);
      await AuthService.googleLogin(credentialResponse.credential);
      setIsLoggedIn && setIsLoggedIn(true);
      setCurrentPage && setCurrentPage("home");
    } catch (err) {
      setError(err.message || "Google login failed.");
    } finally {
      setSocialLoading("");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="TECHWISE Logo" />
        </div>

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <img src={LetterIcon} alt="Email" width="24" height="24" />
              </span>
              <input
                type="email"
                id="email"
                className="form-control login-input"
                placeholder="example@gamil.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <img src={LockIcon} alt="Password" width="24" height="24" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control login-input"
                placeholder="******************"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={EyeClosedIcon} alt="Toggle" width="24" height="24" />
              </button>
            </div>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: 13, marginBottom: 8 }}>
              {error}
            </p>
          )}

          <div className="login-options d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="remember"
              />
              <label htmlFor="remember" style={{ marginLeft: "6px" }}>
                Remember me
              </label>
            </div>
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage && setCurrentPage("reset");
              }}
            >
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-btn w-100" disabled={loading}>
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="divider">or</div>

        {/* ── Google Button ── */}
        <div className="mb-3">
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setGoogleHovered(true)}
            onMouseLeave={() => setGoogleHovered(false)}
          >
            {/* الزرار اللي بيتشاف */}
            <button
              type="button"
              className="google-btn"
              disabled={!!socialLoading}
              style={{
                transition: "all 0.3s ease",
                transform: googleHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: googleHovered
                  ? "0 0 15px rgba(54, 122, 255, 0.4), 0 0 30px rgba(54, 122, 255, 0.2), 0 4px 15px rgba(54, 122, 255, 0.3)"
                  : "none",
                borderColor: googleHovered ? "#367aff" : "#e5e7eb",
                background: googleHovered ? "#f0f5ff" : "#ffffff",
              }}
            >
              {socialLoading === "google" ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <>
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    width="24"
                    height="24"
                  />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* GoogleLogin مخفي فوق الزرار - pointerEvents على none عشان الـ hover يشتغل */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                overflow: "hidden",
                cursor: "pointer",
                pointerEvents: socialLoading ? "none" : "auto",
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setError("Google login was cancelled or failed.");
                  setSocialLoading("");
                }}
                width="600"
              />
            </div>
          </div>
        </div>

        <p className="signup-link">
          Don't have an account?{" "}
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage && setCurrentPage("signup");
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
