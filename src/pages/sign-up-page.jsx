import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signup.css";
import logo from "../assets/logo.svg";
import UserIcon from "../assets/User.svg";
import LetterIcon from "../assets/Letter.svg";
import LockIcon from "../assets/Lock.svg";
import EyeClosedIcon from "../assets/Eye_Closed.svg";
import { AuthService } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";

const SignUpPage = ({ setCurrentPage, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [googleHovered, setGoogleHovered] = useState(false);

  // ================= دالة مساعدة لاستخراج نص الخطأ من الباك إند =================
  // ================= دالة مساعدة لاستخراج نص الخطأ من الباك إند =================
  const getErrorMessage = (err) => {
    // 1. التعامل مع شكل الباك إند الخاص بيك بالظبط
    if (err.response && err.response.data) {
      return (
        err.response.data.errorMessege || // متطابق مع الباك إند
        err.response.data.message ||
        err.response.data.error ||
        JSON.stringify(err.response.data)
      );
    }
    // 2. إذا كنت تستخدم Fetch API
    if (err.data) {
      return err.data.errorMessege || err.data.message || "An error occurred";
    }
    // 3. إذا كان الخطأ عبارة عن نص عادي (String)
    if (typeof err === "string") {
      return err;
    }
    // 4. الرجوع للرسالة الافتراضية
    return err.message || "An unexpected error occurred. Please try again.";
  };

  // ================= Google Sign Up =================
  const handleGoogleSuccess = async (credentialResponse) => {
    setSocialLoading("google");
    setError("");
    try {
      await AuthService.googleLogin(credentialResponse.credential);
      setIsLoggedIn && setIsLoggedIn(true);
      setCurrentPage && setCurrentPage("home");
    } catch (err) {
      setError(getErrorMessage(err)); // استخدام الدالة الجديدة
    } finally {
      setSocialLoading("");
    }
  };

  // ================= Normal Sign Up =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms.");
      return;
    }

    setLoading(true);

    try {
      await AuthService.signup(formData);
      // احفظ الإيميل وروح لصفحة الفيرفاي المنفصلة
      localStorage.setItem("signupEmail", formData.email);
      setCurrentPage && setCurrentPage("signup-verify");
    } catch (err) {
      setError(getErrorMessage(err)); // استخدام الدالة الجديدة
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-logo">
          <img src={logo} alt="TECHWISE Logo" />
        </div>

        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">
          Sign up to get started with Smart PC Advisor
        </p>

        <form onSubmit={handleSubmit}>
          {/* First + Last Name */}
          <div className="name-row">
            <div className="input-group">
              <span className="input-group-text">
                <img src={UserIcon} alt="User" width="24" />
              </span>
              <input
                type="text"
                className="form-control signup-input"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control signup-input signup-input-no-icon"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <img src={LetterIcon} alt="Email" width="24" />
              </span>
              <input
                type="email"
                className="form-control signup-input"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <img src={LockIcon} alt="Password" width="24" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control signup-input"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className={`password-toggle ${
                  showPassword ? "open" : "closed"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={EyeClosedIcon}
                  alt="Toggle Password"
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <img src={LockIcon} alt="Password" width="24" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control signup-input"
                placeholder="Repeat Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              <button
                type="button"
                className={`password-toggle ${
                  showConfirmPassword ? "open" : "closed"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img
                  src={EyeClosedIcon}
                  alt="Toggle Password"
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>

          {/* ===== تحسين شكل عرض الأيرور هنا ===== */}
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center py-2 px-3 mb-3"
              role="alert"
              style={{ fontSize: "14px", borderRadius: "8px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <div>{error}</div>
            </div>
          )}

          <div className="signup-terms">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
              id="termsCheck"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            className="signup-btn w-100 mt-3"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Creating Account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="divider">or</div>

        {/* ── Google Full Width Button ── */}
        <div
          className="mb-3"
          onMouseEnter={() => setGoogleHovered(true)}
          onMouseLeave={() => setGoogleHovered(false)}
          style={{ position: "relative" }}
        >
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
                setError("Google sign up was cancelled or failed.");
                setSocialLoading("");
              }}
              width="600"
            />
          </div>
        </div>

        <p className="login-link">
          Already have an account?{" "}
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage("login");
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
