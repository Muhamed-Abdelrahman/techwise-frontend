import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";          // ← أضف ده
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProfilePage.css";
import { AuthService } from "../services/authService";
import { TokenService } from "../services/authService";
import { ProfileService } from "../services/ProfileService";
import { FavoritesService } from "../services/FavoritesService";
import { NotificationService } from "../services/NotificationService";

// ── Default SVG Avatar ──
const DEFAULT_AVATAR = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
    '<circle cx="50" cy="50" r="50" fill="#e8f0fb"/>' +
    '<circle cx="50" cy="36" r="17" fill="#4a90d9"/>' +
    '<path d="M50 60c-19 0-34 11-34 24v2h68v-2c0-13-15-24-34-24z" fill="#4a90d9"/>' +
  "</svg>"
)}`;

const BASE_URL = "https://techwiseapp.runasp.net/api";

const ProfilePage = ({ setCurrentPage, setIsLoggedIn }) => {
  const navigate = useNavigate();                           // ← أضف ده
  const [activeTab, setActiveTab] = useState("personal");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Changed Saved Successfully");

  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    profilePhoto: null,
    isVerified: false,
    memberSince: "",
  });

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailUpdates: true,
    priceDropAlerts: false,
  });
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);

  const [security, setSecurity] = useState({
    current: "",
    newPass: "",
    confirm: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityError, setSecurityError] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(null);

  // ✅ Orders state — مش محتاج selectedOrder أو orderDetailsLoading تاني
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [orderNavigating, setOrderNavigating] = useState(null);   // ← spinning على الكارت

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile();
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          location: data.location || "",
          profilePhoto: data.profilePhoto || null,
          isVerified: data.isVerified || false,
          memberSince: data.memberSince || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const triggerSuccess = (msg = "Changed Saved Successfully") => {
    setSuccessMessage(msg);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2500);
  };

  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const data = await NotificationService.getSettings();
      setNotifications({
        pushNotifications: data.pushNotifications ?? true,
        emailUpdates: data.emailUpdates ?? true,
        priceDropAlerts: data.priceDropAlerts ?? false,
      });
      setNotificationsLoaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setError("");
    setSaving(true);
    try {
      const data = await NotificationService.updateSettings(notifications);
      setNotifications({
        pushNotifications: data.pushNotifications ?? notifications.pushNotifications,
        emailUpdates: data.emailUpdates ?? notifications.emailUpdates,
        priceDropAlerts: data.priceDropAlerts ?? notifications.priceDropAlerts,
      });
      triggerSuccess("Changed Saved Successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const fetchFavorites = async () => {
    setFavoritesLoading(true);
    try {
      const data = await FavoritesService.getFavorites();
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const token = TokenService.getToken();
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json().catch(() => []);
      if (!response.ok) throw new Error(data.errorMessage || data.message || "Failed to load orders.");
      setOrders(data);
      setOrdersLoaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  // ✅ ✅ ✅  ده اللي هيوديك لصفحة الـ OrderSuccessPage
  const handleOrderClick = async (orderId) => {
    setOrderNavigating(orderId);
    setError("");
    try {
      const token = TokenService.getToken();
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.errorMessage || data.message || "Failed to load order details.");
      // ← navigate لصفحة الـ order success ومرر الـ data
      navigate("/order-success", { state: { orderData: data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setOrderNavigating(null);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    setSecurityError("");
    if (tab === "saved") fetchFavorites();
    if (tab === "notifications" && !notificationsLoaded) fetchNotifications();
    if (tab === "orders" && !ordersLoaded) fetchOrders();
  };

  const handleRemoveFavorite = async (productId) => {
    setRemoveLoading(productId);
    try {
      await FavoritesService.removeFavorite(productId);
      setFavorites((prev) => prev.filter((item) => item.productId !== productId));
      if (selectedItem?.productId === productId) setSelectedItem(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setRemoveLoading(null);
    }
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const data = await ProfileService.updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        location: profile.location,
      });
      setProfile((prev) => ({
        ...prev,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        location: data.location,
        profilePhoto: data.profilePhoto,
        isVerified: data.isVerified,
        memberSince: data.memberSince,
      }));
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...stored,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        })
      );
      triggerSuccess("Changed Saved Successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoClick = () => fileInputRef.current?.click();
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSaving(true);
    try {
      const data = await ProfileService.uploadProfilePhoto(file);
      setProfile((prev) => ({ ...prev, profilePhoto: data.profilePhoto }));
      triggerSuccess("Profile Photo Updated Successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setSecurityError("");
    if (security.newPass !== security.confirm) {
      setSecurityError("Passwords do not match!");
      return;
    }
    setSecurityLoading(true);
    try {
      const token = TokenService.getToken();
      const response = await fetch(`${BASE_URL}/Auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: security.current,
          newPassword: security.newPass,
          confirmNewPassword: security.confirm,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.errorMessage || data.message || "Failed to change password.");
      }
      triggerSuccess("Password Changed Successfully");
      setSecurity({
        current: "",
        newPass: "",
        confirm: "",
        showCurrent: false,
        showNew: false,
        showConfirm: false,
      });
    } catch (err) {
      setSecurityError(err.message);
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleLogoutConfirm = () => {
    AuthService.logout();
    setIsLoggedIn && setIsLoggedIn(false);
    setShowLogoutModal(false);
    setCurrentPage && setCurrentPage("home");
  };

  const handleDeleteConfirm = async () => {
    try {
      await ProfileService.deleteAccount();
      AuthService.logout();
      setIsLoggedIn && setIsLoggedIn(false);
      setShowDeleteModal(false);
      setCurrentPage && setCurrentPage("home");
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryLabel = (cat) =>
    cat ? cat.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "";

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return { bg: "#dcfce7", text: "#166534", dot: "#22c55e" };
      case "Processing": return { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" };
      case "Shipped": return { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" };
      case "Delivered": return { bg: "#d1fae5", text: "#065f46", dot: "#10b981" };
      case "Cancelled": return { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" };
      case "Refunded": return { bg: "#f3e8ff", text: "#6b21a8", dot: "#a855f7" };
      default: return { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" };
    }
  };

  // ── SVG Icons ──
  const PersonIcon = ({ color }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
  const GearIcon = ({ color }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
  const LockIcon2 = ({ color }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
  const HistoryIcon = ({ color }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </svg>
  );
  const OrdersIcon = ({ color }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
  const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 17l5-5-5-5" /><line x1="21" y1="12" x2="9" y2="12" /><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    </svg>
  );
  const SaveIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
    </svg>
  );
  const MailIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
  const PinIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
  const CalIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  const VerifyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
  const InfoIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
  const ModalLogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 17l5-5-5-5" /><line x1="21" y1="12" x2="9" y2="12" /><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    </svg>
  );
  const TrashIcon = ({ color = "#e74c3c" }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
  const StarIcon = ({ filled }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
  const MonitorIcon = ({ color = "#4a90d9" }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
  const SpecsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
  const ChartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
  const TruckIcon = ({ color = "#6b7280" }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
  const CreditCardIcon = ({ color = "#6b7280" }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
  const PackageIcon = ({ color = "#6b7280" }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );

  const ActionRow = ({ onSave }) => (
    <div className="action-row">
      <div className="action-row-left">
        <button onClick={onSave || handleSave} className="save-btn" disabled={saving || notificationsLoading}>
          {saving || notificationsLoading ? "Saving..." : <><SaveIcon /> Save Changes</>}
        </button>
        <button className="cancel-btn">Cancel</button>
      </div>
      <button onClick={() => setShowLogoutModal(true)} className="logout-btn">
        <LogoutIcon /> Logout
      </button>
    </div>
  );

  const tabs = [
    { key: "personal", Icon: PersonIcon, label: "Personal Info" },
    { key: "notifications", Icon: GearIcon, label: "Notification Settings" },
    { key: "security", Icon: LockIcon2, label: "Security" },
    { key: "orders", Icon: OrdersIcon, label: "My Orders" },
    { key: "saved", Icon: HistoryIcon, label: "Saved Items" },
  ];

  if (loading) {
    return (
      <div className="profile-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="spinner-border" role="status" style={{ color: "#4a90d9" }}><span className="visually-hidden">Loading...</span></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handlePhotoChange} />

      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-page-title">User Profile</h2>
          <p className="profile-page-subtitle">Manage your account settings and preferences</p>
          {error && <p style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{error}</p>}

          {/* Avatar */}
          <div className="avatar-row">
            <div className="avatar-wrapper" onClick={handlePhotoClick} style={{ cursor: "pointer" }}>
              <img src={profile.profilePhoto || DEFAULT_AVATAR} alt="avatar" className="avatar-img" />
              <span className="edit-badge">
                <svg width="11" height="11" fill="white" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
              </span>
            </div>
            <div className="avatar-info">
              <div className="user-name">{profile.firstName} {profile.lastName}</div>
              <div className="user-meta"><MailIcon /> {profile.email}</div>
              {profile.location && <div className="user-meta"><PinIcon /> {profile.location}</div>}
              {profile.memberSince && <div className="user-meta"><CalIcon /> Member since {profile.memberSince}</div>}
            </div>
            {profile.isVerified && <span className="verified-badge"><VerifyIcon /> Verified User</span>}
          </div>

          {/* Tabs */}
          <div className="tab-bar">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => handleTabChange(tab.key)} className={`tab-btn${activeTab === tab.key ? " active" : ""}`}>
                <tab.Icon color={activeTab === tab.key ? "#4a90d9" : "#888"} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* ═══ Personal Tab ═══ */}
          {activeTab === "personal" && (
            <div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-control form-input" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-control form-input" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                </div>
              </div>
              <div className="form-field-full">
                <label className="form-label">Email</label>
                <input className="form-control form-input" value={profile.email} disabled />
              </div>
              <div className="form-field-full">
                <label className="form-label">Phone Number</label>
                <input className="form-control form-input" value={profile.phoneNumber} placeholder="Enter your phone number" onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} />
              </div>
              <div className="form-field-full">
                <label className="form-label">Location</label>
                <input className="form-control form-input" value={profile.location} placeholder="Enter your location" onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
              </div>
              <ActionRow />
            </div>
          )}

          {/* ═══ Notifications Tab ═══ */}
          {activeTab === "notifications" && (
            <div>
              <div className="tab-section">
                <div className="tab-section-header">
                  <span className="tab-section-icon"><GearIcon color="#4a90d9" /></span>
                  <div>
                    <div className="tab-section-title">Notification Settings</div>
                    <div className="tab-section-sub">Manage how you receive updates and alerts</div>
                  </div>
                </div>
                {notificationsLoading ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div className="spinner-border spinner-border-sm" role="status" style={{ color: "#4a90d9" }}><span className="visually-hidden">Loading...</span></div>
                  </div>
                ) : (
                  <>
                    <div className="toggle-row">
                      <div><div className="toggle-label">Push Notifications</div><div className="toggle-sub">Receive real-time notifications</div></div>
                      <div className={`toggle-switch${notifications.pushNotifications ? " on" : ""}`} onClick={() => setNotifications({ ...notifications, pushNotifications: !notifications.pushNotifications })}><div className="toggle-thumb" /></div>
                    </div>
                    <div className="toggle-row">
                      <div><div className="toggle-label">Email Updates</div><div className="toggle-sub">Get weekly PC recommendation updates</div></div>
                      <div className={`toggle-switch${notifications.emailUpdates ? " on" : ""}`} onClick={() => setNotifications({ ...notifications, emailUpdates: !notifications.emailUpdates })}><div className="toggle-thumb" /></div>
                    </div>
                    <div className="toggle-row">
                      <div><div className="toggle-label">Price Drop Alerts</div><div className="toggle-sub">Get notified when prices drop on saved items</div></div>
                      <div className={`toggle-switch${notifications.priceDropAlerts ? " on" : ""}`} onClick={() => setNotifications({ ...notifications, priceDropAlerts: !notifications.priceDropAlerts })}><div className="toggle-thumb" /></div>
                    </div>
                  </>
                )}
              </div>
              <ActionRow onSave={handleSaveNotifications} />
            </div>
          )}

          {/* ═══ Security Tab ═══ */}
          {activeTab === "security" && (
            <div>
              <div className="tab-section">
                <div className="tab-section-header">
                  <span className="tab-section-icon"><LockIcon2 color="#4a90d9" /></span>
                  <div>
                    <div className="tab-section-title">Security Settings</div>
                    <div className="tab-section-sub">Manage your password and security preferences</div>
                  </div>
                </div>
                {[
                  { key: "current", showKey: "showCurrent", label: "Current Password", placeholder: "Enter Your Current Password" },
                  { key: "newPass", showKey: "showNew", label: "New Password", placeholder: "Enter Your New Password" },
                  { key: "confirm", showKey: "showConfirm", label: "Confirm Password", placeholder: "Confirm Your New Password" },
                ].map((item) => (
                  <div key={item.key} className="form-group mb-3">
                    <label className="form-label">{item.label}</label>
                    <div className="password-wrapper">
                      <span className="password-icon-left"><LockIcon2 color="#aaa" /></span>
                      <input className="form-control form-input password-input" type={security[item.showKey] ? "text" : "password"} placeholder={item.placeholder} value={security[item.key]} onChange={(e) => setSecurity({ ...security, [item.key]: e.target.value })} />
                      <button type="button" className="password-toggle-btn" onClick={() => setSecurity({ ...security, [item.showKey]: !security[item.showKey] })}><EyeIcon /></button>
                    </div>
                  </div>
                ))}
                {securityError && <p style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{securityError}</p>}
                <div className="requirements-box">
                  <div className="requirements-title"><InfoIcon /> Password Requirements:</div>
                  {["At least 8 characters long", "Include uppercase and lowercase letters", "Include at least one number", "Include at least one special character"].map((r) => (
                    <div key={r} className="requirements-item">• {r}</div>
                  ))}
                </div>
              </div>
              <div className="action-row">
                <div className="action-row-left">
                  <button onClick={handleChangePassword} className="save-btn" disabled={securityLoading}>{securityLoading ? "Saving..." : <><SaveIcon /> Save Changes</>}</button>
                  <button className="cancel-btn">Cancel</button>
                </div>
                <button className="delete-account-btn" onClick={() => setShowDeleteModal(true)}><TrashIcon /> Delete Account</button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════
              ✅  ORDERS TAB  —  Click navigates to OrderSuccessPage
              ═══════════════════════════════════════════════════════ */}
          {activeTab === "orders" && (
            <div>
              <div className="saved-section-header">
                <span className="saved-section-icon"><OrdersIcon color="#4a90d9" /></span>
                <div>
                  <div className="saved-section-title">My Orders</div>
                  <div className="saved-section-sub">View your order history and track deliveries</div>
                </div>
              </div>

              {ordersLoading ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div className="spinner-border" role="status" style={{ color: "#4a90d9" }}><span className="visually-hidden">Loading...</span></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="saved-empty-state">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p>No orders yet.</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => {
                    const sc = getStatusColor(order.status);
                    const isNavigating = orderNavigating === order.id;
                    return (
                      <div
                        key={order.id}
                        className={`order-card${isNavigating ? " order-card-navigating" : ""}`}
                        onClick={() => !isNavigating && handleOrderClick(order.id)}
                      >
                        <div className="order-card-top">
                          <div className="order-card-left">
                            <div className="order-number-row">
                              <span className="order-number-label">Order</span>
                              <span className="order-number-value">#{order.orderNumber}</span>
                            </div>
                            <div className="order-date-row">{formatDate(order.createdAt)}</div>
                          </div>
                          <div className="order-card-right">
                            <span className="order-status-badge" style={{ background: sc.bg, color: sc.text }}>
                              <span className="order-status-dot" style={{ background: sc.dot }} />
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="order-card-items-preview">
                          {order.items?.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="order-item-preview">
                              <img src={item.imageUrl || "https://via.placeholder.com/40x40?text=N/A"} alt="" className="order-item-preview-img" />
                              <span className="order-item-preview-title">
                                {item.productTitle?.length > 50 ? item.productTitle.substring(0, 50) + "..." : item.productTitle}
                              </span>
                              <span className="order-item-preview-qty">×{item.quantity}</span>
                            </div>
                          ))}
                          {order.items?.length > 2 && (
                            <span className="order-items-more">+{order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}</span>
                          )}
                        </div>

                        <div className="order-card-bottom">
                          <div className="order-meta-pills">
                            <span className="order-meta-pill"><TruckIcon color="#9ca3af" /> {order.deliveryMethod}</span>
                            <span className="order-meta-pill"><CreditCardIcon color="#9ca3af" /> {order.paymentMethod === "CreditCard" ? "Credit Card" : order.paymentMethod}</span>
                            <span className="order-meta-pill"><PackageIcon color="#9ca3af" /> {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}</span>
                          </div>
                          <div className="order-total-section">
                            <span className="order-total-label">Total</span>
                            <span className="order-total-value">${order.total?.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="order-card-action">
                          {isNavigating ? (
                            <span className="order-loading-text">
                              <span className="spinner-border spinner-border-sm" role="status" style={{ color: "#4a90d9", width: 13, height: 13, marginRight: 6 }} />
                              Loading...
                            </span>
                          ) : (
                            <span className="order-view-details-text">View Details →</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ═══ Saved Items Tab ═══ */}
          {activeTab === "saved" && (
            <div>
              <div className="saved-section-header">
                <span className="saved-section-icon"><HistoryIcon color="#4a90d9" /></span>
                <div>
                  <div className="saved-section-title">Saved Recommendations</div>
                  <div className="saved-section-sub">View & manage your saved PC recommendations & comparisons</div>
                </div>
              </div>
              {favoritesLoading ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div className="spinner-border" role="status" style={{ color: "#4a90d9" }}><span className="visually-hidden">Loading...</span></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="saved-empty-state">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p>No saved items yet.</p>
                </div>
              ) : (
                <div className="saved-list">
                  {favorites.map((item) => (
                    <div key={item.productId} className="saved-item-card" onClick={() => setSelectedItem(item)}>
                      <div className="saved-item-icon"><MonitorIcon /></div>
                      <div className="saved-item-info">
                        <div className="saved-item-title">{item.title}</div>
                        <div className="saved-item-meta">
                          <span className="saved-item-category">{getCategoryLabel(item.category)}</span>
                          <span className="saved-item-price">${item.price?.toFixed(2)}</span>
                          <span className="saved-item-date">Saved {formatDate(item.savedAt)}</span>
                        </div>
                      </div>
                      <div className="saved-item-actions">
                        <button className="saved-view-btn" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}>View Details</button>
                        <button className="saved-delete-btn" onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(item.productId); }} disabled={removeLoading === item.productId}>
                          {removeLoading === item.productId ? (
                            <span className="spinner-border spinner-border-sm" role="status" style={{ color: "#e74c3c", width: 14, height: 14 }} />
                          ) : <TrashIcon />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <ActionRow />
            </div>
          )}
        </div>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup-box">
            <div className="success-popup-circle">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="success-popup-text">{successMessage}</div>
          </div>
        </div>
      )}

      {/* View Details Modal (Saved Items) */}
      {selectedItem && (
        <div className="details-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="details-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="details-modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <div className="details-modal-grid">
              <div className="details-modal-left">
                <h6 className="details-modal-list-title">Saved Recommendations</h6>
                <div className="details-modal-list">
                  {favorites.map((item) => (
                    <div key={item.productId} onClick={() => setSelectedItem(item)} className={`details-modal-item${selectedItem.productId === item.productId ? " active" : ""}`}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: selectedItem.productId === item.productId ? "#4a90d9" : "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <MonitorIcon color={selectedItem.productId === item.productId ? "#fff" : "#4a90d9"} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                          <span style={{ fontSize: 10, background: "#e0e7ff", color: "#4338ca", padding: "1px 6px", borderRadius: 3, fontWeight: 500 }}>{getCategoryLabel(item.category)}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#155DFC" }}>${item.price?.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="details-modal-right">
                <div className="details-modal-img">
                  <img src={selectedItem.imageUrl || "https://via.placeholder.com/300x180?text=PC"} alt={selectedItem.title} />
                </div>
                <h5 className="details-modal-product-title">{selectedItem.title}</h5>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#155DFC" }}>${selectedItem.price?.toFixed(2)}</span>
                  <span style={{ fontSize: 11, background: "#e0e7ff", color: "#4338ca", padding: "3px 10px", borderRadius: 5, fontWeight: 500 }}>{getCategoryLabel(selectedItem.category)}</span>
                </div>
                <div className="details-modal-section">
                  <div className="details-modal-section-header"><SpecsIcon /><span>Specifications</span></div>
                  <div className="details-modal-specs">
                    {selectedItem.keySpecs && Object.entries(selectedItem.keySpecs).map(([key, value], i) => (
                      <div key={key} className="details-modal-spec-row" style={{ background: i % 2 === 0 ? "#fff" : "#f0f7ff" }}>
                        <span className="details-modal-spec-key">{key}</span>
                        <span className="details-modal-spec-val">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="details-modal-section">
                  <div className="details-modal-section-header"><ChartIcon /><span>Performance</span></div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["Gaming", "Productivity", "Rendering"].map((label) => (
                      <div key={label} className="details-modal-badge">
                        <div className={`details-modal-badge-dot ${label === "Gaming" ? "green" : label === "Productivity" ? "yellow" : "blue"}`} />
                        <span className="details-modal-badge-label">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="details-modal-section">
                  <div className="details-modal-section-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    <span>Rating</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= Math.round(selectedItem.ratingAvg || 0)} />
                      ))}
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{(selectedItem.ratingAvg || 0).toFixed(1)}/5</span>
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: "10px 14px", background: "#f0f7ff", borderRadius: 8, fontSize: 12, color: "#4a90d9" }}>
                  <strong>Saved on:</strong> {formatDate(selectedItem.savedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={() => setShowLogoutModal(false)} className="modal-close-btn">✕</button>
            <div className="modal-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L1 21h22L12 2z" fill="#e74c3c" opacity="0.15" />
                <path d="M12 2L1 21h22L12 2z" stroke="#e74c3c" strokeWidth="2" strokeLinejoin="round" />
                <line x1="12" y1="9" x2="12" y2="14" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="1" fill="#e74c3c" />
              </svg>
            </div>
            <h5 style={{ fontWeight: 700, marginBottom: 4 }}>Oh NO !</h5>
            <h6 style={{ fontWeight: 700, marginBottom: 10 }}>You are Leaving</h6>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Are you sure you want to logout from TechWise?</p>
            <div className="modal-actions">
              <button onClick={handleLogoutConfirm} className="modal-logout-btn"><ModalLogoutIcon /> Yes, Logout</button>
              <button onClick={() => setShowLogoutModal(false)} className="modal-cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={() => setShowDeleteModal(false)} className="modal-close-btn">✕</button>
            <div className="modal-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <polyline points="3 6 5 6 21 6" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 11v6M14 11v6" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h5 style={{ fontWeight: 700, marginBottom: 4 }}>Delete Account</h5>
            <h6 style={{ fontWeight: 600, marginBottom: 10, color: "#6b7280" }}>This Cannot Be Undone</h6>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Are you sure you want to permanently delete your TechWise account?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteConfirm} className="modal-logout-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                {" "}Yes, Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="modal-cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;