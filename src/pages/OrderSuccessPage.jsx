import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle, Package, Truck, Home,
  MapPin, Phone, Mail, CreditCard, Banknote, X,
} from "lucide-react";
import FeedbackModal from "./FeedbackModal";
import "../styles/OrderSuccessPage.css";

/* ── CONFIG ── */
const USE_MOCK = false;
const SUPPORT_EMAIL = "support@techwise.com";

const MOCK_ORDER = {
  id: 13,
  orderNumber: "PC20260408132842",
  status: "Delivered",
  subtotal: 1960.17,
  shippingCost: 29.99,
  tax: 156.81,
  total: 2146.98,
  deliveryMethod: "Express",
  paymentMethod: "cach",
  createdAt: new Date().toISOString(),
  fullName: "Ali Mohamed",
  email: "john@gmail.com",
  phone: "+1 555 123 1234",
  country: "Egypt",
  city: "Cairo",
  street: "123 Main Street",
  clientSecret: null,
  isPaid: true,
  items: [
    {
      productId: 4,
      productTitle:
        'HP - Victus 15.6" 144Hz Full HD Gaming Laptop - AMD Ryzen 7 7445HS - 16GB Memory - NVIDIA GeForce RTX 4050 - 512GB SSD - Mica Silver',
      imageUrl:
        "https://c1.neweggimages.com/productimage/nb640/BWXMS25081410EXZYC4.jpg",
      price: 789.0,
      quantity: 2,
      itemTotal: 1578.0,
    },
    {
      productId: 50,
      productTitle: "Patriot Viper Elite 5 16GB 288-Pin PC RAM DDR5 6000 CL30",
      imageUrl:
        "https://c1.neweggimages.com/productimage/nb640/20-225-357-06.jpg",
      price: 199.99,
      quantity: 3,
      itemTotal: 599.97,
    },
  ],
};

/* ── Status map (matches backend enum) ── */
const STATUS_MAP = {
  Confirmed: 1,
  Processing: 2,
  Shipped: 3,
  Delivered: 4,
  Cancelled: 5,
};

const getStatusNum = (status) => {
  if (typeof status === "number") return status;
  return STATUS_MAP[status] ?? 0;
};

const getStatusLabel = (status) => {
  if (typeof status === "string") return status;
  return Object.keys(STATUS_MAP).find((k) => STATUS_MAP[k] === status) ?? "Unknown";
};

/* ── helpers ── */
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDeliveryDate = (iso, days) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/* ── status steps ── */
const getSteps = (order) => {
  const statusNum = getStatusNum(order.status);
  const isCancelled = statusNum === 5;

  return [
    {
      key: "confirmed",
      icon: <CheckCircle size={20} />,
      label: "Order Confirmed",
      desc: "Your order has been received and confirmed",
      time: formatDate(order.createdAt),
      done: statusNum >= 1,
      cancelled: false,
    },
    {
      key: "processing",
      icon: <Package size={20} />,
      label: "Processing",
      desc: isCancelled
        ? "Order was cancelled before processing"
        : "We're preparing your order for shipment",
      time: "Expected: Within 24 hours",
      done: statusNum >= 2 && !isCancelled,
      cancelled: isCancelled,
    },
    {
      key: "shipped",
      icon: <Truck size={20} />,
      label: "Shipped",
      desc: "Your order is on its way",
      time: "Expected: Within 2–3 days",
      done: statusNum >= 3,
      cancelled: false,
    },
    {
      key: "delivered",
      icon: <Home size={20} />,
      label: "Delivered",
      desc: "Your order will arrive at your doorstep",
      time: `Expected: ${formatDeliveryDate(
        order.createdAt,
        order.deliveryMethod === "Express" ? 3 : 7
      )}`,
      done: statusNum >= 4,
      cancelled: false,
    },
  ];
};

/* ════════════════════════════════════════════ */
const OrderSuccessPage = ({ setCurrentPage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const order = USE_MOCK ? MOCK_ORDER : location.state?.orderData || null;

  // ✅ Email Support — يفتح الـ email client ببيانات الاوردر
  const handleEmailSupport = () => {
    if (!order) return;

    const subject = encodeURIComponent(
      `Order Support Request — #${order.orderNumber}`
    );

    const itemsList = (order.items || [])
      .map(
        (item, idx) =>
          `  ${idx + 1}. ${item.productTitle}\n     Qty: ${item.quantity} × $${item.price?.toFixed(2)} = $${item.itemTotal?.toFixed(2)}`
      )
      .join("\n");

    const body = encodeURIComponent(
      [
        `Hello TechWise Support,`,
        ``,
        `I need help with my order. Here are the details:`,
        ``,
        `Order Number: #${order.orderNumber}`,
        `Order Date: ${formatDate(order.createdAt)}`,
        `Status: ${getStatusLabel(order.status)}`,
        `Total: $${order.total?.toFixed(2)}`,
        `Delivery Method: ${order.deliveryMethod}`,
        `Payment Method: ${order.paymentMethod === "CreditCard" || order.paymentMethod === 1 ? "Credit Card" : "Cash on Delivery"}`,
        ``,
        `Shipping Address:`,
        `  ${order.fullName}`,
        `  ${order.street}`,
        `  ${order.city}, ${order.country}`,
        `  ${order.phone}`,
        ``,
        `Order Items:`,
        itemsList,
        ``,
        `---`,
        `My issue / question:`,
        ``,
        ``,
      ].join("\n")
    );

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

  if (!order) {
    return (
      <div className="os-page">
        <div className="os-empty">
          <p>No order data found.</p>
          <button className="os-feedback-btn" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const steps = getSteps(order);
  const statusLabel = getStatusLabel(order.status);
  const isCreditCard =
    order.paymentMethod === "CreditCard" || order.paymentMethod === 1;

  return (
    <div className="os-page">

      {/* ── Success Hero ── */}
      <div className="os-hero">
        <div className="os-check-circle">
          <CheckCircle size={36} color="#16a34a" strokeWidth={2.5} />
        </div>
        <h1 className="os-title">Order Placed Successfully!</h1>
        <p className="os-subtitle">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <p className="os-order-meta">
          Order #{order.orderNumber} &bull; {formatDate(order.createdAt)}
        </p>
      </div>

      <div className="os-content">

        {/* ── Order Status Timeline ── */}
        <div className="os-card">
          <h3 className="os-card-title">
            Order Status
            <span className={`os-status-badge os-status-${statusLabel.toLowerCase()}`}>
              {statusLabel}
            </span>
          </h3>
          <div className="os-timeline">
            {steps.map((step, idx) => (
              <div key={step.key} className="os-step">
                <div className="os-step-left">
                  <div
                    className={`os-step-icon ${
                      step.cancelled ? "cancelled" : step.done ? "done" : "pending"
                    }`}
                  >
                    {step.cancelled ? <X size={20} /> : step.icon}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`os-step-line ${
                        steps[idx + 1].done ? "done" : "pending"
                      }`}
                    />
                  )}
                </div>
                <div className="os-step-body">
                  <div className="os-step-label">{step.label}</div>
                  <div className="os-step-desc">{step.desc}</div>
                  <div className="os-step-time">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Order Details ── */}
        <div className="os-card">
          <h3 className="os-card-title">Order Details</h3>
          <div className="os-items-list">
            {order.items?.map((item) => (
              <div key={item.productId} className="os-item">
                <div className="os-item-img">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productTitle} />
                  ) : (
                    <div className="os-item-img-placeholder">
                      <Package size={24} color="#94a3b8" />
                    </div>
                  )}
                </div>
                <div className="os-item-info">
                  <div className="os-item-title">{item.productTitle}</div>
                  {item.quantity > 1 && (
                    <div className="os-item-qty">Qty: {item.quantity}</div>
                  )}
                </div>
                <div className="os-item-price">${item.itemTotal?.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="os-totals">
            <div className="os-total-row">
              <span>Subtotal</span>
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="os-total-row">
              <span>Shipping ({order.deliveryMethod})</span>
              <span>${order.shippingCost?.toFixed(2)}</span>
            </div>
            <div className="os-total-row">
              <span>Taxes</span>
              <span>${order.tax?.toFixed(2)}</span>
            </div>
            <div className="os-total-divider" />
            <div className="os-total-row os-total-final">
              <span>Total Paid</span>
              <span>${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ── Address + Payment ── */}
        <div className="os-two-col">

          {/* Shipping Address */}
          <div className="os-card">
            <h3 className="os-card-title">Shipping Address</h3>
            <div className="os-address">
              <div className="os-address-name">
                <MapPin size={16} color="#6b7280" />
                <div>
                  <div className="os-addr-main">{order.fullName}</div>
                  <div className="os-addr-line">{order.street}</div>
                  <div className="os-addr-line">
                    {order.city}, {order.country}
                  </div>
                </div>
              </div>
              <div className="os-addr-divider" />
              <div className="os-addr-contact">
                <Phone size={15} color="#6b7280" />
                <span>{order.phone}</span>
              </div>
              <div className="os-addr-contact">
                <Mail size={15} color="#6b7280" />
                <span>{order.email}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="os-card">
            <h3 className="os-card-title">Payment Method</h3>
            <div className="os-payment">
              <div className="os-payment-row">
                {isCreditCard ? (
                  <>
                    <div className="os-card-icon">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                        alt="Mastercard"
                        width="36"
                      />
                    </div>
                    <div>
                      <div className="os-pay-label">Credit Card</div>
                      <div className="os-pay-sub">•••• •••• •••• 3456</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="os-card-icon">
                      <Banknote size={28} color="#16a34a" />
                    </div>
                    <div>
                      <div className="os-pay-label">Cash on Delivery</div>
                      <div className="os-pay-sub">Pay when your order arrives</div>
                    </div>
                  </>
                )}
              </div>
              <div className="os-payment-confirmed">✓ Payment confirmed</div>
            </div>
          </div>

        </div>

        {/* ── Feedback button ── */}
        <button className="os-feedback-btn" onClick={() => setFeedbackOpen(true)}>
          Give us Your Feedback About Purchasing Experience
        </button>

        {/* ── Need Help ── */}
        <div className="os-help-card">
          <h4 className="os-help-title">Need Help?</h4>
          <p className="os-help-sub">
            Our customer support team is available 24/7 to assist you
          </p>
          <div className="os-help-btns">
            {/* ✅ Email Support — شغال */}
            <button className="os-help-btn" onClick={handleEmailSupport}>
              <Mail size={16} /> Email Support
            </button>
            <button
              className="os-help-btn"
              onClick={() =>
                setCurrentPage ? setCurrentPage("contact") : navigate("/contact")
              }
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>

      {/* ── Feedback Modal ── */}
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />

    </div>
  );
};

export default OrderSuccessPage;