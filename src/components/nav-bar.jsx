import React, { useState, useEffect } from "react";
import { FaRegBell, FaTimes, FaBars, FaShoppingCart } from "react-icons/fa";
import {
  Cpu,
  Search,
  TrendingUp,
  Columns2,
  Activity,
  ChevronRight,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.css";
import logo from "../assets/image 8.svg";
import chat from "../assets/ChatBotButton.svg";
import { ProfileService } from "../services/ProfileService";
import { NotificationListService } from "../services/NotificationListService";

const BASE_URL = "https://techwiseapp.runasp.net";

const DEFAULT_AVATAR = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
    '<circle cx="50" cy="50" r="50" fill="#e8f0fb"/>' +
    '<circle cx="50" cy="36" r="17" fill="#4a90d9"/>' +
    '<path d="M50 60c-19 0-34 11-34 24v2h68v-2c0-13-15-24-34-24z" fill="#4a90d9"/>' +
    "</svg>",
)}`;

const Navbar = ({ setCurrentPage, currentPage, isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);
  const [cartCount, setCartCount] = useState(0);

  const fetchAvatar = async () => {
    if (!isLoggedIn) { setAvatarSrc(DEFAULT_AVATAR); return; }
    try {
      const data = await ProfileService.getProfile();
      setAvatarSrc(data.profilePhoto || DEFAULT_AVATAR);
    } catch { setAvatarSrc(DEFAULT_AVATAR); }
  };

  const fetchUnreadCount = async () => {
    if (!isLoggedIn) { setUnreadCount(0); return; }
    try {
      const data = await NotificationListService.getUnreadCount();
      setUnreadCount(data.unreadCount || 0);
    } catch { setUnreadCount(0); }
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const res = await fetch(`${BASE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setCartCount(data.totalItems || 0);
          return;
        }
      }
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(Array.isArray(cart) ? cart.length : 0);
    } catch { setCartCount(0); }
  };

  useEffect(() => {
    fetchAvatar();
    fetchUnreadCount();
    fetchCartCount();
  }, [isLoggedIn]);

  useEffect(() => {
    const h = () => fetchCartCount();
    window.addEventListener("cart-updated", h);
    return () => window.removeEventListener("cart-updated", h);
  }, []);

  useEffect(() => {
    const h = () => {
      if (document.visibilityState === "visible") {
        fetchUnreadCount();
        fetchAvatar();
        fetchCartCount();
      }
    };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [isLoggedIn]);

  const closeMenu = (page) => { setCurrentPage(page); setMenuOpen(false); };
  const goToChatbot = () => { setMenuOpen(false); setCurrentPage("chatbot"); };

  const isActive = (page) => currentPage === page;
  const toolPages = ["used-device", "compare", "performance", "new-device", "upgrade"];
  const isToolsActive = toolPages.includes(currentPage);

  const aiFeatures = [
    {
      key: "new-device",
      label: "New Device Recommendation",
      sub: "Get AI-powered PC suggestions based on your needs",
      icon: <Cpu size={18} />,
      iconClass: "blue",
      isChat: true,
    },
    {
      key: "used-device",
      label: "Used Device Evaluation",
      sub: "Know the fair market value of used devices before selling.",
      icon: <Search size={18} />,
      iconClass: "blue",
      isChat: false,
    },
    {
      key: "upgrade",
      label: "Upgrade Suggestions",
      sub: "Find the best components to upgrade your PC",
      icon: <TrendingUp size={18} />,
      iconClass: "blue",
      isChat: true,
    },
  ];

  const analysisTools = [
    {
      key: "compare",
      label: "Compare 2 Devices",
      sub: "Side-by-side detailed specs comparison",
      icon: <Columns2 size={18} />,
      iconClass: "indigo",
      isChat: false,
    },
    {
      key: "performance",
      label: "Performance Analysis",
      sub: "Benchmark your device against the latest hardware",
      icon: <Activity size={18} />,
      iconClass: "indigo",
      isChat: false,
    },
  ];

  const handleDropdownClick = (item) => {
    item.isChat ? goToChatbot() : setCurrentPage(item.key);
  };

  return (
    <nav className="navbar sticky-top">
      <div
        className="container-fluid navbar-container"
        style={{ flexWrap: "nowrap", alignItems: "center" }}
      >
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => setCurrentPage("home")}
          style={{ cursor: "pointer", flexShrink: 0 }}
        >
          <img src={logo} alt="Logo" />
        </div>

        {/* Desktop Links */}
        <ul className="navbar-links mx-auto d-none d-lg-flex mb-0" style={{ listStyle: "none" }}>
          <li className="nav-item">
            <button
              className={`navbar-btn${isActive("home") ? " nav-link-active" : ""}`}
              onClick={() => setCurrentPage("home")}
            >
              Home
            </button>
          </li>

          {isLoggedIn && (
            <li className="nav-item dropdown">
              <button
                className={`navbar-btn dropdown-toggle${isToolsActive ? " nav-link-active" : ""}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Main Features
              </button>
              <ul className="dropdown-menu">
                <li className="dropdown-section-label">AI-Powered</li>
                {aiFeatures.map((item) => (
                  <li key={item.key}>
                    <button className="dropdown-item" onClick={() => handleDropdownClick(item)}>
                      <span className={`dd-icon dd-icon-${item.iconClass}`}>{item.icon}</span>
                      <span className="dd-text">
                        <span className="dd-title">{item.label}</span>
                        <span className="dd-sub">{item.sub}</span>
                      </span>
                      <ChevronRight size={14} className="dd-arrow" />
                    </button>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-section-label">Analysis Tools</li>
                {analysisTools.map((item) => (
                  <li key={item.key}>
                    <button className="dropdown-item" onClick={() => handleDropdownClick(item)}>
                      <span className={`dd-icon dd-icon-${item.iconClass}`}>{item.icon}</span>
                      <span className="dd-text">
                        <span className="dd-title">{item.label}</span>
                        <span className="dd-sub">{item.sub}</span>
                      </span>
                      <ChevronRight size={14} className="dd-arrow" />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {[
            { label: "Market Alerts", page: "market-alerts" },
            { label: "Smart Tips", page: "smart-tips" },
            { label: "About", page: "about" },
            { label: "Contact", page: "contact" },
            { label: "FAQ", page: "faq" },
          ].map(({ label, page }) => (
            <li className="nav-item" key={label}>
              <button
                className={`navbar-btn${isActive(page) ? " nav-link-active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="navbar-actions d-none d-lg-flex" style={{ flexShrink: 0 }}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setCurrentPage("profile")}
                className={`nav-icon-btn avatar-btn${isActive("profile") ? " nav-icon-active" : ""}`}
              >
                <img src={avatarSrc} alt="profile" className="avatar" />
              </button>
              <button
                className={`nav-icon-btn position-relative${isActive("notifications") ? " nav-icon-active" : ""}`}
                onClick={() => setCurrentPage("notifications")}
                title="Notifications"
              >
                <FaRegBell className="nav-icon" />
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
              </button>
              {/* ✅ Cart - logged in فقط */}
              <button
                className={`nav-icon-btn position-relative${isActive("cart") ? " nav-icon-active" : ""}`}
                onClick={() => setCurrentPage("cart")}
                title="Cart"
              >
                <FaShoppingCart className="nav-icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
              <button className="chat" onClick={() => setCurrentPage("chatbot")}>
                <img src={chat} alt="ChatBot" />
                <span className="chat-online-dot" />
              </button>
            </>
          ) : (
            <>
              {/* ✅ Cart اتشالت من هنا */}
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => setCurrentPage("signup")}
              >
                Sign Up
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="d-flex d-lg-none align-items-center" style={{ gap: "6px", flexShrink: 0 }}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setCurrentPage("profile")}
                className={`nav-icon-btn avatar-btn${isActive("profile") ? " nav-icon-active" : ""}`}
              >
                <img src={avatarSrc} alt="profile" className="avatar avatar-sm" />
              </button>
              <button
                className={`nav-icon-btn position-relative${isActive("notifications") ? " nav-icon-active" : ""}`}
                onClick={() => { setCurrentPage("notifications"); setMenuOpen(false); }}
                title="Notifications"
              >
                <FaRegBell className="nav-icon-sm" />
                {unreadCount > 0 && <span className="notif-badge notif-badge-sm">{unreadCount}</span>}
              </button>
              {/* ✅ Cart - logged in فقط */}
              <button
                className={`nav-icon-btn position-relative${isActive("cart") ? " nav-icon-active" : ""}`}
                onClick={() => { setCurrentPage("cart"); setMenuOpen(false); }}
                title="Cart"
              >
                <FaShoppingCart className="nav-icon-sm" />
                {cartCount > 0 && <span className="cart-badge cart-badge-sm">{cartCount}</span>}
              </button>
              <button
                className="chat chat-sm"
                onClick={() => { setCurrentPage("chatbot"); setMenuOpen(false); }}
              >
                <img src={chat} alt="ChatBot" />
                <span className="chat-online-dot" />
              </button>
            </>
          ) : (
            <>
              {/* ✅ Cart اتشالت من هنا */}
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setCurrentPage("signup")}
              >
                Sign Up
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </button>
            </>
          )}
          <button
            style={{ border: "none", background: "transparent", cursor: "pointer", padding: "4px 8px" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu-dropdown d-lg-none">
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li>
              <button
                className={`mob-menu-link${isActive("home") ? " active" : ""}`}
                onClick={() => closeMenu("home")}
              >
                Home
              </button>
            </li>

            {isLoggedIn && (
              <>
                <li className="mob-section-label">AI-Powered</li>
                {aiFeatures.map((item) => (
                  <li key={item.key}>
                    <button
                      className={`mob-menu-link mob-menu-rich${isActive(item.key) ? " active" : ""}`}
                      onClick={() => item.isChat ? goToChatbot() : closeMenu(item.key)}
                    >
                      <span className={`mob-link-icon mob-link-icon-${item.iconClass}`}>{item.icon}</span>
                      <span className="mob-link-text">
                        <span className="mob-link-title">{item.label}</span>
                        <span className="mob-link-sub">{item.sub}</span>
                      </span>
                    </button>
                  </li>
                ))}

                <li className="mob-section-label">Analysis Tools</li>
                {analysisTools.map((item) => (
                  <li key={item.key}>
                    <button
                      className={`mob-menu-link mob-menu-rich${isActive(item.key) ? " active" : ""}`}
                      onClick={() => closeMenu(item.key)}
                    >
                      <span className={`mob-link-icon mob-link-icon-${item.iconClass}`}>{item.icon}</span>
                      <span className="mob-link-text">
                        <span className="mob-link-title">{item.label}</span>
                        <span className="mob-link-sub">{item.sub}</span>
                      </span>
                    </button>
                  </li>
                ))}

                {/* ✅ Cart في المobile menu - logged in فقط */}
                <li>
                  <button
                    className={`mob-menu-link${isActive("cart") ? " active" : ""}`}
                    onClick={() => closeMenu("cart")}
                  >
                    Cart
                  </button>
                </li>
              </>
            )}

            {[
              { label: "Market Alerts", page: "market-alerts" },
              { label: "Smart Tips", page: "smart-tips" },
              { label: "About", page: "about" },
              { label: "Contact", page: "contact" },
              { label: "FAQ", page: "faq" },
            ].map(({ label, page }) => (
              <li key={label}>
                <button
                  className={`mob-menu-link${isActive(page) ? " active" : ""}`}
                  onClick={() => closeMenu(page)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;