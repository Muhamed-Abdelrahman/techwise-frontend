import { TokenService } from "./authService";

const BASE_URL = "https://techwiseapp.runasp.net/api";

// ══════════════════════════════════════════════════════════════
// 🔧 MOCK MODE — غيّر لـ false لما الباك اند يشتغل
const MOCK = false;
// ══════════════════════════════════════════════════════════════

const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

// ── Mock Notifications Data (matches the reference image) ──
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "upgrade",
    title: "New Upgrade Recommendation Available",
    message:
      "Based on your recent analysis, we recommend upgrading your GPU to improve performance by 35%. Check out the NVIDIA RTX 4070 Super as a top match.",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: "analysis",
    title: "System Analysis Complete",
    message:
      "Your performance analysis has been completed successfully. View the detailed report to see your PC's strengths and bottlenecks.",
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    type: "performance",
    title: "Performance Score Declined",
    message:
      "Your PC performance score has decreased by 5% compared to last month. This may be due to storage fragmentation or thermal throttling.",
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    type: "price",
    title: "Price Drop Alert!",
    message:
      "The ASUS ROG Strix G16 Gaming Laptop you saved is now $150 off — save 12% before the deal ends.",
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    type: "match",
    title: "New Device Match Found",
    message:
      "HP Spectre x360 matches your preferences perfectly based on your profile and usage patterns.",
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const NotificationListService = {
  // ✅ GET /api/Notifications
  getAll: async () => {
    if (MOCK) {
      await delay();
      return [...MOCK_NOTIFICATIONS];
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => []);
    if (!response.ok)
      throw new Error(
        data.errorMessage || data.message || "Failed to fetch notifications."
      );
    return Array.isArray(data) ? data : data.notifications || [];
  },

  // ✅ GET /api/Notifications/unread-count
  getUnreadCount: async () => {
    if (MOCK) {
      await delay(200);
      return { unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Notifications/unread-count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({ unreadCount: 0 }));
    if (!response.ok) return { unreadCount: 0 };
    return data;
  },

  // ✅ PUT /api/Notifications/{id}/read
  markAsRead: async (id) => {
    if (MOCK) {
      await delay(300);
      const idx = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
      if (idx !== -1) MOCK_NOTIFICATIONS[idx].isRead = true;
      return { message: "Marked as read" };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Notifications/${id}/read`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(
        data.errorMessage || data.message || "Failed to mark as read."
      );
    return data;
  },

  // ✅ PUT /api/Notifications/mark-all-read
  markAllAsRead: async () => {
    if (MOCK) {
      await delay(300);
      MOCK_NOTIFICATIONS.forEach((n) => (n.isRead = true));
      return { message: "All marked as read" };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Notifications/mark-all-read`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(
        data.errorMessage || data.message || "Failed to mark all as read."
      );
    return data;
  },

  // ✅ DELETE /api/Notifications/{id}
  delete: async (id) => {
    if (MOCK) {
      await delay(300);
      const idx = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
      if (idx !== -1) MOCK_NOTIFICATIONS.splice(idx, 1);
      return { message: "Notification deleted" };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Notifications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(
        data.errorMessage || data.message || "Failed to delete notification."
      );
    return data;
  },
};