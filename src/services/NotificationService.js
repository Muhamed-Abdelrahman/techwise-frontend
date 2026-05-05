import { TokenService } from "./authService";

const BASE_URL = "https://techwiseapp.runasp.net/api";

export const NotificationService = {
  // GET /api/Notifications/settings
  getSettings: async () => {
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Notifications/settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.errorMessage || data.message || "Failed to fetch notification settings.");
    }
    return data;
  },

  // PUT /api/Notifications/settings
  updateSettings: async (settings) => {
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Notifications/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pushNotifications: settings.pushNotifications,
        emailUpdates: settings.emailUpdates,
        priceDropAlerts: settings.priceDropAlerts,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.errorMessage || data.message || "Failed to update notification settings.");
    }
    return data;
  },
};