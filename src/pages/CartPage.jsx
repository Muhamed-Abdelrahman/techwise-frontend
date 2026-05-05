import React, { useState, useEffect, useCallback } from "react";
import "../styles/CartPage.css";

const BASE_URL = "https://techwiseapp.runasp.net";
const USE_MOCK = false; // ← غيّرها لـ false لما الباك يشتغل

// ============================================================
// MOCK RESPONSES
// ============================================================
const MOCK_CART = {
  id: 1,
  items: [
    {
      productId: 3,
      title:
        'Acer Nitro V15 Gaming Laptop - Intel Core i7-13620H - Nvidia GeForce RTX 5050 GPU - 16GB RAM - 512GB SSD - 15.6" 165Hz IPS Display - Windows 11 Home (ANV15-52-778V)',
      brand: "Acer",
      category: "laptop_gaming",
      imageUrl:
        "https://c1.neweggimages.com/productimage/nb640/34-360-405-14.png",
      price: 800.0,
      quantity: 10,
      itemTotal: 8000.0,
    },
    {
      productId: 4,
      title:
        'HP - Victus 15.6" 144Hz Full HD Gaming Laptop - AMD Ryzen 7 7445HS - 16GB Memory - NVIDIA GeForce RTX 4050 - 512GB SSD - Mica Silver',
      brand: "HP",
      category: "laptop_gaming",
      imageUrl:
        "https://c1.neweggimages.com/productimage/nb640/BWXMS25081410EXZYC4.jpg",
      price: 789.0,
      quantity: 2,
      itemTotal: 1578.0,
    },
    {
      productId: 50,
      title:
        "Patriot Viper Elite 5 16GB 288-Pin PC RAM DDR5 6000 CL30(PC5 48000) Hynix Desktop Memory Model VEB516G6030W Compatible with AMD / Intel Gen14 Only",
      brand: "Patriot",
      category: "memory",
      imageUrl:
        "https://c1.neweggimages.com/productimage/nb640/20-225-357-06.jpg",
      price: 199.99,
      quantity: 3,
      itemTotal: 599.97,
    },
  ],
  total: 10177.97,
  totalItems: 15,
};

const MOCK_DELETE_RES = { message: "Item removed from cart" };

// ============================================================
// HELPERS
// ============================================================
const getToken = () => localStorage.getItem("accessToken");

const formatCategory = (cat = "") =>
  cat.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

/* ── API helpers ── */
const cartAPI = {
  getCart: async () => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 600));
      return JSON.parse(JSON.stringify(MOCK_CART));
    }
    const res = await fetch(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to load cart");
    return res.json();
  },

  updateQuantity: async (productId, quantity) => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      const mockCart = JSON.parse(JSON.stringify(MOCK_CART));
      const item = mockCart.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        item.itemTotal = Number((item.price * quantity).toFixed(2));
      }
      mockCart.totalItems = mockCart.items.reduce((s, i) => s + i.quantity, 0);
      mockCart.total = Number(
        mockCart.items.reduce((s, i) => s + i.itemTotal, 0).toFixed(2),
      );
      return mockCart;
    }
    const res = await fetch(`${BASE_URL}/api/cart/items/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error("Failed to update quantity");
    return res.json();
  },

  removeItem: async (productId) => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      return MOCK_DELETE_RES;
    }
    const res = await fetch(`${BASE_URL}/api/cart/items/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to remove item");
    return res.json();
  },
};

/* ════════════════════════════════════════════ */
const CartPage = ({ setCurrentPage }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  /* load cart */
  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  /* remove item */
  const handleRemove = async (productId) => {
    setRemovingId(productId);
    try {
      await cartAPI.removeItem(productId);
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.productId !== productId),
      }));
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      setError("Failed to remove item.");
    } finally {
      setRemovingId(null);
    }
  };

  /* update quantity */
  const handleQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    setUpdatingId(productId);
    try {
      const data = await cartAPI.updateQuantity(productId, newQty);
      setCart(data);
      window.dispatchEvent(new Event("cart-updated"));
    } catch {
      setError("Failed to update quantity.");
    } finally {
      setUpdatingId(null);
    }
  };

  const items = cart?.items || [];
  const total = cart?.total ?? 0;
  const totalItems = cart?.totalItems ?? 0;

  /* ── Loading ── */
  if (loading)
    return (
      <div className="cp-page">
        <div className="cp-loading">
          <div className="cp-spinner" />
          <p>Loading your cart...</p>
        </div>
      </div>
    );

  /* ── Error ── */
  if (error && !cart)
    return (
      <div className="cp-page">
        <div className="cp-loading">
          <p style={{ color: "#dc2626" }}>{error}</p>
          <button className="cp-browse-btn" onClick={loadCart}>
            Try Again
          </button>
        </div>
      </div>
    );

  /* ── Empty ── */
  if (!loading && items.length === 0)
    return (
      <div className="cp-page">
        <div className="cp-header">
          <button
            className="cp-back-btn"
            onClick={() => setCurrentPage("home")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          <h1 className="cp-title">Shopping Cart</h1>
          <p className="cp-subtitle">Your cart is empty</p>
        </div>
        <div className="cp-empty">
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h3>Your cart is empty</h3>
          <p>Browse our recommendations to find the perfect device.</p>
          <button
            className="cp-browse-btn"
            onClick={() => setCurrentPage("chatbot")}
          >
            Browse Recommendations
          </button>
        </div>
      </div>
    );

  /* ── Full cart ── */
  return (
    <div className="cp-page">
      {/* Header */}
      <div className="cp-header">
        <button className="cp-back-btn" onClick={() => setCurrentPage("home")}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <h1 className="cp-title">Shopping Cart</h1>
        <p className="cp-subtitle">
          {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      {error && <div className="cp-error">{error}</div>}

      <div className="cp-body">
        {/* ── Items ── */}
        <div className="cp-items-section">
          <div className="cp-section-head">
            <span className="cp-section-label">Cart Items</span>
          </div>

          <div className="cp-items-list">
            {items.map((item) => (
              <div key={item.productId} className="cp-item-card">
                {/* Image */}
                <div className="cp-item-img">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    <div className="cp-item-img-placeholder">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="cp-item-info">
                  <div className="cp-item-title">{item.title}</div>
                  <div className="cp-item-meta">
                    {item.brand && (
                      <span className="cp-item-brand">{item.brand}</span>
                    )}
                    {item.category && (
                      <span className="cp-item-cat">
                        {formatCategory(item.category)}
                      </span>
                    )}
                  </div>
                  <div className="cp-item-unit">
                    Unit price: <strong>${item.price?.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Quantity */}
                <div className="cp-item-qty">
                  <button
                    className="cp-qty-btn"
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={
                      updatingId === item.productId || item.quantity <= 1
                    }
                  >
                    −
                  </button>
                  <span className="cp-qty-val">
                    {updatingId === item.productId ? "…" : item.quantity}
                  </span>
                  <button
                    className="cp-qty-btn"
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity + 1)
                    }
                    disabled={updatingId === item.productId}
                  >
                    +
                  </button>
                </div>

                {/* Item total */}
                <div className="cp-item-total">
                  ${item.itemTotal?.toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  className="cp-item-remove"
                  onClick={() => handleRemove(item.productId)}
                  disabled={removingId === item.productId}
                  title="Remove item"
                >
                  {removingId === item.productId ? (
                    <div className="cp-spinner-sm" />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Summary ── */}
        <div className="cp-summary">
          <h5 className="cp-summary-title">Order Summary</h5>

          <div className="cp-summary-rows">
            <div className="cp-summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {/* <div className="cp-summary-row">
              <span>Shipping</span>
              <span className="cp-free">Free</span>
            </div> */}
            <div className="cp-summary-row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
          </div>

          <div className="cp-summary-divider" />

          <div className="cp-summary-row cp-total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="cp-checkout-btn"
            onClick={() => setCurrentPage("checkout")}
          >
            Proceed to Checkout
          </button>

          <button
            className="cp-continue-btn"
            onClick={() => setCurrentPage("chatbot")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
