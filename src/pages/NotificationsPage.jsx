import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/NotificationsPage.css";
import { NotificationListService } from "../services/NotificationListService";

// ── Relative time helper ──
const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now - past;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// ── Map notification type → icon SVG + color ──
const getNotifStyle = (type = "", title = "") => {
  const t = (type + " " + title).toLowerCase();
  if (t.includes("upgrade") || t.includes("recommend"))
    return { color: "#22c55e", bg: "#dcfce7", Icon: UpgradeIcon };
  if (t.includes("analysis") || t.includes("complete") || t.includes("system"))
    return { color: "#3b82f6", bg: "#dbeafe", Icon: CheckCircleIcon };
  if ((t.includes("performance") && (t.includes("decline") || t.includes("drop") || t.includes("decrease"))) || t.includes("warning"))
    return { color: "#f59e0b", bg: "#fef9c3", Icon: AlertIcon };
  if (t.includes("price") || t.includes("deal") || t.includes("discount"))
    return { color: "#22c55e", bg: "#dcfce7", Icon: PriceIcon };
  if (t.includes("match") || t.includes("device"))
    return { color: "#8b5cf6", bg: "#ede9fe", Icon: StarIcon };
  return { color: "#6b7280", bg: "#f3f4f6", Icon: InfoIcon };
};

// ── Inline SVG Icons ──
const UpgradeIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const CheckCircleIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const AlertIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const PriceIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);
const StarIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const InfoIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const CheckMarkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);
const EmptyBellIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await NotificationListService.getAll();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id) => {
    setActionLoading(id);
    try {
      await NotificationListService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    setActionLoading("markAll");
    try {
      await NotificationListService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      await NotificationListService.delete(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="notif-page">
      <div className="notif-body">
        {/* ── Page Header ── */}
        <div className="notif-page-header">
          <div className="notif-page-title-row">
            <div className="notif-title-group">
              <h1 className="notif-page-title">Notifications</h1>
              {unreadCount > 0 && (
                <span className="notif-count-badge">{unreadCount} new</span>
              )}
            </div>
            <button
              className="notif-mark-all-btn"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0 || actionLoading === "markAll"}
            >
              {actionLoading === "markAll" ? (
                <span className="spinner-border spinner-border-sm me-1" role="status" />
              ) : (
                <CheckMarkIcon />
              )}
              Mark all read
            </button>
          </div>
          <p className="notif-page-subtitle">Stay updated with your PC performance insights</p>
        </div>

        {error && (
          <div className="notif-error-bar">
            <span>{error}</span>
            <button onClick={() => setError("")}>✕</button>
          </div>
        )}

        {/* ── Loading ── */}
        {loading ? (
          <div className="notif-loading">
            <div className="spinner-border" role="status" style={{ color: "#2563eb" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="notif-empty">
            <EmptyBellIcon />
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          <div className="notif-list">
            {notifications.map((n) => {
              const style = getNotifStyle(n.type, n.title);
              const { Icon } = style;
              const isUnread = !n.isRead;
              const isActing = actionLoading === n.id;

              return (
                <div
                  key={n.id}
                  className={`notif-card${isUnread ? " unread" : ""}`}
                >
                  {/* Icon */}
                  <div
                    className="notif-card-icon"
                    style={{ background: style.bg }}
                  >
                    <Icon color={style.color} />
                  </div>

                  {/* Content */}
                  <div className="notif-card-content">
                    <div className="notif-card-top">
                      <div className="notif-card-title-group">
                        <h5 className={`notif-card-title${isUnread ? "" : " read"}`}>
                          {n.title}
                        </h5>
                        {isUnread && (
                          <span className="notif-new-badge">New</span>
                        )}
                      </div>
                      <span className="notif-card-time">
                        {timeAgo(n.createdAt || n.time)}
                      </span>
                    </div>

                    <p className="notif-card-message">{n.message}</p>

                    <div className="notif-card-actions">
                      {isUnread && (
                        <button
                          className="notif-action-btn read-btn"
                          onClick={() => handleMarkAsRead(n.id)}
                          disabled={isActing}
                        >
                          {isActing ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              style={{ width: 13, height: 13, borderWidth: 2 }}
                            />
                          ) : (
                            <CheckMarkIcon />
                          )}
                          Mark as Read
                        </button>
                      )}
                      <button
                        className="notif-action-btn delete-btn"
                        onClick={() => handleDelete(n.id)}
                        disabled={isActing}
                      >
                        <TrashIcon /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;