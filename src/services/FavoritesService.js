// src/services/FavoritesService.js
import { TokenService } from "./authService";

const BASE_URL = "https://techwiseapp.runasp.net/api";

// ══════════════════════════════════════════════════════════════
// 🔧 MOCK MODE — غيّر لـ false لما الباك اند يشتغل
const MOCK = false;
// ══════════════════════════════════════════════════════════════

const delay = (ms = 800) => new Promise((res) => setTimeout(res, ms));

export const FavoritesService = {
  getFavorites: async () => {
    if (MOCK) {
      await delay();
      return [
        {
          productId: 3,
          title: "Acer Nitro V15 Gaming Laptop - Intel Core i7-13620H - Nvidia GeForce RTX 5050 GPU - 16GB RAM - 512GB SSD - 15.6\" 165Hz IPS Display",
          category: "laptop_gaming",
          price: 800.0,
          imageUrl: "https://c1.neweggimages.com/productimage/nb640/34-360-405-14.png",
          savedAt: "2026-03-15T19:34:25.8231439",
          ratingAvg: 4.5,
          keySpecs: {
            "CPU Type": "Intel Core i7 13th Gen",
            "GPU/VPU": "GeForce RTX 5050 Laptop GPU",
            Memory: "16GB DDR4",
            SSD: "512GB PCIe",
          },
        },
        {
          productId: 4,
          title: "HP - Victus 15.6\" 144Hz Full HD Gaming Laptop - AMD Ryzen 7 7445HS - 16GB Memory - NVIDIA GeForce RTX 4050 - 512GB SSD",
          category: "laptop_gaming",
          price: 789.0,
          imageUrl: "https://c1.neweggimages.com/productimage/nb640/BWXMS25081410EXZYC4.jpg",
          savedAt: "2026-03-15T19:25:47.6936339",
          ratingAvg: 4.2,
          keySpecs: {
            "CPU Type": "AMD Ryzen 7 7000 Series",
            "GPU/VPU": "GeForce RTX 4050 Laptop GPU",
            Memory: "16GB DDR4",
            SSD: "512GB PCIe",
          },
        },
        {
          productId: 7,
          title: "MSI Thin GF63 15.6\" 144Hz Gaming Laptop - Intel Core i5-12450H - 8GB Memory - NVIDIA GeForce RTX 4050 - 256GB SSD",
          category: "laptop_gaming",
          price: 649.0,
          imageUrl: "https://c1.neweggimages.com/productimage/nb640/83YVX08404-V01.png",
          savedAt: "2026-03-10T12:00:00",
          ratingAvg: 4.0,
          keySpecs: {
            "CPU Type": "Intel Core i5 12th Gen",
            "GPU/VPU": "GeForce RTX 4050 Laptop GPU",
            Memory: "8GB DDR4",
            SSD: "256GB NVMe",
          },
        },
      ];
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => []);
    if (!response.ok)
      throw new Error(data.errorMessage || data.message || "Failed to fetch favorites.");
    return data;
  },

  toggleSave: async (productId) => {
    if (MOCK) {
      await delay(300);
      return { message: "Product saved successfully" };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Favorites/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.errorMessage || data.message || "Failed to save product.");
    return data;
  },

  removeFavorite: async (productId) => {
    if (MOCK) {
      await delay(300);
      return { message: "Product removed from favorites" };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Favorites/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.errorMessage || data.message || "Failed to remove product.");
    return data;
  },

  isSaved: async (productId) => {
    if (MOCK) {
      await delay(200);
      return { isSaved: false };
    }
    const token = TokenService.getToken();
    const response = await fetch(`${BASE_URL}/Favorites/${productId}/is-saved`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({ isSaved: false }));
    if (!response.ok) return { isSaved: false };
    return data;
  },
};