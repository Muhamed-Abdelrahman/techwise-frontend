// src/services/authService.js
const BASE_URL = "https://techwiseapp.runasp.net/api";

// ══════════════════════════════════════════════════════════════
// 🔧 MOCK MODE — غيّر لـ false لما الباك اند يشتغل
const MOCK = false;
// ══════════════════════════════════════════════════════════════

const delay = (ms = 800) => new Promise((res) => setTimeout(res, ms));

// ── Mock Responses ────────────────────────────────────────────
const mockUser = {
  useId: "user_001",
  firstName: "mohamed",
  lastName: "User",
  email: "test@example.com",
  token: "mock-jwt-token-123",
};


// ── Token Helpers ─────────────────────────────────────────────
export const TokenService = {
  getToken: () => localStorage.getItem("accessToken"),
  setToken: (token) => localStorage.setItem("accessToken", token),
  decodeToken: (token) => {
    try {
      const base64Payload = token.split(".")[1];
      return JSON.parse(atob(base64Payload));
    } catch {
      return null;
    }
  },
  isTokenExpired: (token) => {
    const decoded = TokenService.decodeToken(token);
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now();
  },
  clearAll: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("resetToken");
    localStorage.removeItem("resetEmail");
  },
};

// ── Save User Data ────────────────────────────────────────────
const saveUserFromResponse = (data) => {
  TokenService.setToken(data.token);
  
  // ═══ محاولة جلب الـ ID ═══
  let finalUserId = data.useId || data.userId;
  
  // لو الـ API رجع null (باج في الـ Backend)، نستخرجه من جوا الـ JWT
  if (!finalUserId && data.token) {
    try {
      const decoded = TokenService.decodeToken(data.token);
      finalUserId = decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] 
                 || decoded?.sub 
                 || decoded?.userId 
                 || null;
    } catch (err) {
      console.error("Failed to decode token for userId:", err);
    }
  }

  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: finalUserId, // الـ ID الحقيقي من جوا التوكن
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    })
  );
  localStorage.setItem("isLoggedIn", "true");
};

// ── Auth API ──────────────────────────────────────────────────
export const AuthService = {
  // ✅ POST /api/Auth/SignIn
  login: async ({ email, password }) => {
    if (MOCK) {
      await delay();
      const data = { ...mockUser, email };
      saveUserFromResponse(data);
      return data;
    }
    const response = await fetch(`${BASE_URL}/Auth/SignIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || data.title || "Invalid email or password.");
    saveUserFromResponse(data);
    return data;
  },

  // ✅ POST /api/Auth/SignUp
  signup: async ({ firstName, lastName, email, password, confirmPassword }) => {
    if (MOCK) {
      await delay();
      return { message: "Registration successful. Please check your email to verify." };
    }
    const response = await fetch(`${BASE_URL}/Auth/SignUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isTermsAccepted: true,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || data.title || "Registration failed.");
    return data;
  },

  // ✅ POST /api/auth/verify-email (a صغير)
  verifyEmail: async (email, code) => {
    if (MOCK) {
      await delay();
      const data = { ...mockUser, email };
      saveUserFromResponse(data);
      return data;
    }
    const response = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || data.title || "Invalid verification code.");
    saveUserFromResponse(data);
    return data;
  },

  // ✅ POST /api/auth/resend-verification (a صغير)
  resendVerification: async (email) => {
    if (MOCK) {
      await delay();
      return { message: "Verification code sent" };
    }
    const response = await fetch(`${BASE_URL}/auth/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to resend code.");
    return data;
  },

  // ✅ POST /api/Auth/GoogleLogin
  googleLogin: async (idToken) => {
    if (MOCK) {
      await delay();
      const data = { ...mockUser };
      saveUserFromResponse(data);
      return data;
    }
    const response = await fetch(`${BASE_URL}/Auth/GoogleLogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Google login failed.");
    saveUserFromResponse(data);
    return data;
  },

  // ✅ POST /api/Auth/ForgetPassword
  forgetPassword: async (email) => {
    if (MOCK) {
      await delay();
      return { message: "Reset code sent to your email." };
    }
    const response = await fetch(`${BASE_URL}/Auth/ForgetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to send reset code.");
    return data;
  },

  // ✅ POST /api/Auth/VerifyResetCode
  verifyResetCode: async (code) => {
    if (MOCK) {
      await delay();
      const resetToken = "mock-reset-token-456";
      localStorage.setItem("resetToken", resetToken);
      return { resetToken };
    }
    const response = await fetch(`${BASE_URL}/Auth/VerifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Invalid reset code.");
    localStorage.setItem("resetToken", data.resetToken);
    return data;
  },

  // ✅ POST /api/Auth/ResetPassword
  resetPassword: async (newPassword, confirmNewPassword) => {
    if (MOCK) {
      await delay();
      TokenService.clearAll();
      return { message: "Password reset successfully." };
    }
    const resetToken = localStorage.getItem("resetToken");
    const response = await fetch(`${BASE_URL}/Auth/ResetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetToken, newPassword, confirmNewPassword }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to reset password.");
    TokenService.clearAll();
    return data;
  },

  // ✅ Logout
  logout: () => {
    TokenService.clearAll();
  },
};