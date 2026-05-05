// src/services/ProfileService.js
import { TokenService } from "./authService";

const BASE_URL = "https://techwiseapp.runasp.net/api";

// ══════════════════════════════════════════════════════════════
// 🔧 MOCK MODE — غيّر لـ false لما الباك اند يشتغل
const MOCK = false;
// ══════════════════════════════════════════════════════════════

const delay = (ms = 800) => new Promise((res) => setTimeout(res, ms));

export const ProfileService = {
  // ✅ GET /api/Profile
  getProfile: async () => {
    if (MOCK) {
      await delay();
      return {
        firstName: "Temp",
        lastName: "User",
        email: "test@example.com",
        phoneNumber: null,
        location: null,
        profilePhoto: null,
        isVerified: true,
        memberSince: "Apr 2026",
      };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to fetch profile.");
    return data;
  },

  // ✅ PUT /api/Profile
  updateProfile: async ({ firstName, lastName, phoneNumber, location }) => {
    if (MOCK) {
      await delay();
      return {
        firstName,
        lastName,
        email: "test@example.com",
        phoneNumber,
        location,
        profilePhoto: null,
        isVerified: true,
        memberSince: "Apr 2026",
      };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, phoneNumber, location }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to update profile.");
    return data;
  },

  // ✅ PUT /api/Profile/photo (form-data)
  uploadProfilePhoto: async (file) => {
    if (MOCK) {
      await delay(1500);
      return {
        firstName: "Temp",
        lastName: "User",
        email: "test@example.com",
        phoneNumber: null,
        location: null,
        profilePhoto: "https://i.pravatar.cc/90?img=47",
        isVerified: true,
        memberSince: "Apr 2026",
      };
    }
    const token = TokenService.getToken();
    const formData = new FormData();
    formData.append("photo", file);
    const response = await fetch(`${BASE_URL}/Profile/photo`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to upload photo.");
    return data;
  },

  // ✅ POST /api/auth/change-password
  changePassword: async ({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    if (MOCK) {
      await delay();
      return { message: "Password changed successfully" };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to change password.");
    return data;
  },

  // ✅ DELETE /api/Profile/DeleteAccount
  deleteAccount: async () => {
    if (MOCK) {
      await delay();
      return { message: "Account deleted successfully" };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Profile/DeleteAccount`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || "Failed to delete account.");
    return data;
  },
};
