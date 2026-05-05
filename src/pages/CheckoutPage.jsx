import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  CreditCard,
  Banknote,
  Tag,
  CheckCircle,
  Loader,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import "../styles/CheckoutPage.css";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51TCAnOBomMKvghddS68fvCKlictviCypQ8sERSSuwcLCH19QzdjpW6IaXCm2yQq7rNw7PcA05rEV1xZvotTTwzIC00hli9Zj4n",
);

const BASE_URL = "https://techwiseapp.runasp.net";
const USE_MOCK = false;

const MOCK_CART = {
  id: 1,
  total: 2378.0,
  totalItems: 3,
  items: [
    {
      productId: 3,
      title: "Acer Nitro V15 Gaming Laptop",
      brand: "Acer",
      imageUrl:
        "https://c1.neweggimages.com/productimage/nb640/34-360-405-14.png",
      price: 800.0,
      quantity: 1,
      itemTotal: 800.0,
    },
    {
      productId: 4,
      title: 'HP - Victus 15.6" Gaming Laptop',
      brand: "HP",
      imageUrl:
        "https://c1.neweggimages.com/productimage/nb640/BWXMS25081410EXZYC4.jpg",
      price: 789.0,
      quantity: 2,
      itemTotal: 1578.0,
    },
  ],
};

const MOCK_CHECKOUT_RES = {
  id: 13,
  orderNumber: "PC20260408132842",
  status: "Confirmed",
  subtotal: 1960.17,
  shippingCost: 29.99,
  tax: 156.81,
  total: 2146.97,
  clientSecret: "pi_test_secret_12345",
};

const getToken = () => localStorage.getItem("accessToken");

const DeliveryOptions = [
  {
    id: 1,
    label: "Standard Delivery",
    price: 9.99,
    days: "5 - 7 business days",
    icon: <Truck size={18} />,
  },
  {
    id: 2,
    label: "Express Delivery",
    price: 29.99,
    days: "2 - 3 business days",
    icon: <Truck size={18} />,
  },
];

const PaymentOptions = [
  { id: 1, label: "Credit / Debit Card", icon: <CreditCard size={18} /> },
  { id: 2, label: "Cash on Delivery", icon: <Banknote size={18} /> },
];

// ═══════════════════════════════════════════════════════
// ✅  VALIDATION RULES
// ═══════════════════════════════════════════════════════
const validateField = (name, value) => {
  switch (name) {
    case "fullName": {
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 3) return "Name must be at least 3 characters";
      if (!/^[a-zA-Z\s'-]+$/.test(value.trim()))
        return "Name can only contain letters, spaces, hyphens, and apostrophes";
      if (value.trim().split(/\s+/).filter(Boolean).length < 2)
        return "Please enter your first and last name";
      return "";
    }
    case "email": {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Please enter a valid email address";
      return "";
    }
    case "phone": {
      if (!value.trim()) return "Phone number is required";
      const digits = value.replace(/[\s\-\+\(\)]/g, "");
      if (!/^\d+$/.test(digits)) return "Phone number can only contain digits";
      if (digits.length < 10) return "Phone number must be at least 10 digits";
      if (digits.length > 15) return "Phone number cannot exceed 15 digits";
      return "";
    }
    case "country": {
      if (!value.trim()) return "Country is required";
      if (value.trim().length < 2) return "Please enter a valid country name";
      if (!/^[a-zA-Z\s'-]+$/.test(value.trim()))
        return "Country can only contain letters and spaces";
      return "";
    }
    case "city": {
      if (!value.trim()) return "City is required";
      if (value.trim().length < 2) return "Please enter a valid city name";
      if (!/^[a-zA-Z\s'-]+$/.test(value.trim()))
        return "City can only contain letters and spaces";
      return "";
    }
    case "street": {
      if (!value.trim()) return "Street address is required";
      if (value.trim().length < 5)
        return "Please enter a complete street address";
      return "";
    }
    case "promoCode": {
      if (value.trim() && !/^[A-Za-z0-9]{4,20}$/.test(value.trim()))
        return "Invalid promo code format";
      return "";
    }
    default:
      return "";
  }
};

const validateAll = (data) => {
  const errors = {};
  ["fullName", "email", "phone", "country", "city", "street"].forEach((f) => {
    const msg = validateField(f, data[f]);
    if (msg) errors[f] = msg;
  });
  return errors;
};

// ═══════════════════════════════════════════════════════
// ✅  INPUT FILTERS — يمنع كتابة حاجات مش مسموحة
// ═══════════════════════════════════════════════════════
const inputFilters = {
  // التليفون: أرقام بس + - + ( ) ومسافة
  phone: (key) => {
    const allowed = /^[0-9\+\-\(\)\s]$/;
    return allowed.test(key);
  },
  // الاسم والبلد والمدينة: حروف بس + مسافة + ' -
  textOnly: (key) => {
    const allowed = /^[a-zA-Z\s\'\-]$/;
    return allowed.test(key);
  },
  // البرومو: أرقام وحروف بس بدون مسافات
  alphanumeric: (key) => {
    const allowed = /^[a-zA-Z0-9]$/;
    return allowed.test(key);
  },
};

// ═══════════════════════════════════════════════════════
//  STRIPE CARD FORM
// ═══════════════════════════════════════════════════════
const StripeCardForm = ({ clientSecret, total }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [payError, setPayError] = useState(null);
  const [isPayingStripe, setIsPayingStripe] = useState(false);

  const handleStripePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsPayingStripe(true);
    setPayError(null);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      setPayError(error.message);
      setIsPayingStripe(false);
    } else {
      window.dispatchEvent(new Event("cart-updated"));
      const pendingOrder = JSON.parse(
        sessionStorage.getItem("pendingOrder") || "{}",
      );
      navigate("/order-success", { state: { orderData: pendingOrder } });
    }
  };

  return (
    <div
      className="cko-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <CreditCard size={32} color="#2563eb" />
          <h2
            style={{
              margin: "10px 0 5px",
              fontSize: "1.4rem",
              color: "#1e293b",
            }}
          >
            Enter Card Details
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>
            Complete your payment securely
          </p>
        </div>
        {payError && (
          <div className="cp-error" style={{ marginBottom: "15px" }}>
            {payError}
          </div>
        )}
        <form onSubmit={handleStripePay}>
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <CardElement
              options={{
                style: { base: { fontSize: "16px", color: "#1e293b" } },
              }}
            />
          </div>
          <button
            type="submit"
            className="cp-checkout-btn"
            disabled={!stripe || isPayingStripe}
          >
            {isPayingStripe ? (
              <>
                <Loader size={18} className="ct-spin" /> Processing...
              </>
            ) : (
              <>Pay ${total.toFixed(2)}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
//  ✅  VALIDATED INPUT COMPONENT
// ═══════════════════════════════════════════════════════
const ValidatedInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  touched,
  onBlur,
  required = true,
  placeholder,
  filter, // ← اختياري: اسم الفلتر من inputFilters
}) => {
  const hasError = touched && error;
  const isValid = touched && !error && value.trim().length > 0;

  // ✅ يمنع كتابة أي حاجة مش مسموحة
  const handleKeyDown = (e) => {
    // يسمح بـ control keys (Backspace, Delete, Tab, Arrows, Ctrl+C, Ctrl+V...)
    const isControl = e.ctrlKey || e.metaKey || e.altKey;
    const isNav = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ].includes(e.key);
    if (isControl || isNav) return;

    // لو في فلتر محدد، يطبقه
    if (filter && inputFilters[filter]) {
      if (!inputFilters[filter](e.key)) {
        e.preventDefault();
      }
    }
  };

  // ✅ لما يلصق نص (paste)، ينضفه من أي حاجات مش مسموحة
  const handlePaste = (e) => {
    if (!filter || !inputFilters[filter]) return;

    const paste = e.clipboardData.getData("text");
    let cleaned = "";

    if (filter === "phone") {
      cleaned = paste.replace(/[^0-9\+\-\(\)\s]/g, "");
    } else if (filter === "textOnly") {
      cleaned = paste.replace(/[^a-zA-Z\s\'\-]/g, "");
    } else if (filter === "alphanumeric") {
      cleaned = paste.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (cleaned !== paste) {
      e.preventDefault();
      // يحط النص المنظف في الـ input
      const input = e.target;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const val = input.value;
      const newVal = val.substring(0, start) + cleaned + val.substring(end);
      // نستدعي onChange يدوياً بالقيمة المنظفة
      if (onChange) {
        const syntheticEvent = {
          target: { name, value: newVal },
        };
        onChange(syntheticEvent);
      }
      // نحافظ على cursor position
      requestAnimationFrame(() => {
        input.selectionStart = input.selectionEnd = start + cleaned.length;
      });
    }
  };

  return (
    <div
      className={`cp-field cp-v-field${hasError ? " cp-v-error" : ""}${isValid ? " cp-v-valid" : ""}`}
    >
      <label>
        {label} {required && <span className="cp-v-required">*</span>}
      </label>
      <div className="cp-v-input-wrap">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          className={hasError ? "cp-v-input-error" : ""}
          autoComplete={
            name === "email" ? "email" : name === "phone" ? "tel" : "on"
          }
        />
        {hasError && (
          <span className="cp-v-icon-error">
            <AlertCircle size={15} />
          </span>
        )}
        {isValid && (
          <span className="cp-v-icon-valid">
            <CheckCircle size={15} />
          </span>
        )}
      </div>
      {hasError && <span className="cp-v-error-msg">{error}</span>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════
//  MAIN CHECKOUT COMPONENT
// ═══════════════════════════════════════════════════════
const CheckoutPage = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  const getUserInfo = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return {
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.email || "",
    };
  };

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: getUserInfo().fullName,
    email: getUserInfo().email,
    phone: "",
    country: "",
    city: "",
    street: "",
    deliveryMethod: 2,
    paymentMethod: 1,
    promoCode: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [clientSecret, setClientSecret] = useState("");
  const [showStripeCard, setShowStripeCard] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 500));
        setCart(MOCK_CART);
      } else {
        try {
          const res = await fetch(`${BASE_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          });
          setCart(await res.json());
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "deliveryMethod" || name === "paymentMethod") {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
      return;
    }

    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const msg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }
  };

  const handleBlur = (e) => {
    const name = e.target.name;
    if (name === "deliveryMethod" || name === "paymentMethod") return;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const subtotal = cart?.total || 0;
  const selectedDelivery = DeliveryOptions.find(
    (d) => d.id === formData.deliveryMethod,
  );
  const shippingCost = selectedDelivery?.price || 0;
  const estimatedTax = subtotal * 0.08;
  const total = subtotal + shippingCost + estimatedTax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    const allTouched = {};
    ["fullName", "email", "phone", "country", "city", "street"].forEach((f) => {
      allTouched[f] = true;
    });
    setTouched(allTouched);

    const allErrors = validateAll(formData);
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      const firstErrField = Object.keys(allErrors)[0];
      const el = document.querySelector(`[name="${firstErrField}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      let resData;
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 1500));
        resData = MOCK_CHECKOUT_RES;
      } else {
        const res = await fetch(`${BASE_URL}/api/Orders/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.errorMessage || errData.message || "Failed to place order",
          );
        }
        resData = await res.json();
      }

      sessionStorage.setItem("pendingOrder", JSON.stringify(resData));

      if (formData.paymentMethod === 1 && resData.clientSecret) {
        setClientSecret(resData.clientSecret);
        setShowStripeCard(true);
      } else {
        window.dispatchEvent(new Event("cart-updated"));
        navigate("/order-success", { state: { orderData: resData } });
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ═══ RENDER ═══

  if (showStripeCard && clientSecret) {
    return (
      <div className="cko-page">
        <div className="cko-header">
          <button
            className="cp-back-btn"
            onClick={() => {
              setShowStripeCard(false);
              setClientSecret("");
            }}
          >
            <ArrowLeft size={16} /> Back to Details
          </button>
          <h1 className="cp-title">Complete Your Payment</h1>
        </div>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCardForm clientSecret={clientSecret} total={total} />
        </Elements>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cp-page">
        <div className="cp-loading">
          <div className="cp-spinner" />
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const hasFormErrors = Object.values(errors).some((e) => e);

  return (
    <div className="cko-page">
      <div className="cko-header">
        <button className="cp-back-btn" onClick={() => setCurrentPage("cart")}>
          <ArrowLeft size={16} /> Back to Cart
        </button>
        <h1 className="cp-title">Complete Your Purchase with TeckWise</h1>
      </div>

      {apiError && (
        <div
          className="cp-error"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <AlertCircle size={16} /> {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="cko-grid" noValidate>
        <div className="cko-form-section">
          {/* ── Shipping Information ── */}
          <div className="cko-card">
            <h3 className="cko-card-title">Shipping Information</h3>
            <div className="cko-fields-grid">
              {/* ✅ textOnly filter — حروف ومسافات وبس */}
              <ValidatedInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fullName}
                touched={touched.fullName}
                placeholder="e.g. Ali Mohamed"
                filter="textOnly"
              />

              {/* ✅ phone filter — أرقام و + - ( ) ومسافة بس */}
              <ValidatedInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
                placeholder="e.g. +1 555 123 4567"
                filter="phone"
              />

              <ValidatedInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                placeholder="e.g. ali@example.com"
              />

              {/* ✅ textOnly filter */}
              <ValidatedInput
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.country}
                touched={touched.country}
                placeholder="e.g. Egypt"
                filter="textOnly"
              />

              {/* ✅ textOnly filter */}
              <ValidatedInput
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.city}
                touched={touched.city}
                placeholder="e.g. Cairo"
                filter="textOnly"
              />

              <div className="cp-field cko-full-width">
                <ValidatedInput
                  label="Street Address"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.street}
                  touched={touched.street}
                  placeholder="e.g. 123 Main Street, Apt 4B"
                />
              </div>
            </div>
          </div>

          {/* ── Delivery Method ── */}
          <div className="cko-card">
            <h3 className="cko-card-title">Delivery Method</h3>
            <div className="cko-options-list">
              {DeliveryOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`cko-option-card${formData.deliveryMethod === opt.id ? " active" : ""}`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={opt.id}
                    checked={formData.deliveryMethod === opt.id}
                    onChange={handleChange}
                    className="cko-radio-input"
                  />
                  <div className="cko-option-icon">{opt.icon}</div>
                  <div className="cko-option-info">
                    <span className="cko-option-label">{opt.label}</span>
                    <span className="cko-option-desc">
                      Estimated {opt.days}
                    </span>
                  </div>
                  <span className="cko-option-price">
                    ${opt.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Payment Method ── */}
          <div className="cko-card">
            <h3 className="cko-card-title">Payment Method</h3>
            <div className="cko-options-list">
              {PaymentOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`cko-option-card${formData.paymentMethod === opt.id ? " active" : ""}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.id}
                    checked={formData.paymentMethod === opt.id}
                    onChange={handleChange}
                    className="cko-radio-input"
                  />
                  <div className="cko-option-icon">{opt.icon}</div>
                  <div className="cko-option-info">
                    <span className="cko-option-label">{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* ── Promo Code — alphanumeric filter */}
          <div className="cko-card cko-promo-card">
            <div className="cko-promo-row">
              <div className="cp-field cko-promo-field" style={{ flex: 1 }}>
                <div className="cp-v-field" style={{ marginBottom: 0 }}>
                  <div className="cp-v-input-wrap">
                    <input
                      type="text"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter promo code"
                      className={
                        touched.promoCode && errors.promoCode
                          ? "cp-v-input-error"
                          : ""
                      }
                      onKeyDown={(e) => {
                        const isControl = e.ctrlKey || e.metaKey || e.altKey;
                        const isNav = [
                          "Backspace",
                          "Delete",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "Home",
                          "End",
                        ].includes(e.key);
                        if (isControl || isNav) return;
                        if (!/^[a-zA-Z0-9]$/.test(e.key)) e.preventDefault();
                      }}
                      onPaste={(e) => {
                        const paste = e.clipboardData.getData("text");
                        const cleaned = paste.replace(/[^a-zA-Z0-9]/g, "");
                        if (cleaned !== paste) {
                          e.preventDefault();
                          const input = e.target;
                          const start = input.selectionStart;
                          const end = input.selectionEnd;
                          const val = input.value;
                          const newVal =
                            val.substring(0, start) +
                            cleaned +
                            val.substring(end);
                          setFormData((prev) => ({
                            ...prev,
                            promoCode: newVal,
                          }));
                          requestAnimationFrame(() => {
                            input.selectionStart = input.selectionEnd =
                              start + cleaned.length;
                          });
                        }
                      }}
                    />
                    {touched.promoCode && errors.promoCode && (
                      <span className="cp-v-icon-error">
                        <AlertCircle size={15} />
                      </span>
                    )}
                  </div>
                  {touched.promoCode && errors.promoCode && (
                    <span className="cp-v-error-msg">{errors.promoCode}</span>
                  )}
                </div>
              </div>
              <button type="button" className="cko-promo-btn">
                <Tag size={16} /> Apply
              </button>
            </div>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className="cko-summary">
          <h5 className="cp-summary-title">Order Summary</h5>
          <div className="cp-items-list cko-summary-items">
            {items.map((item) => (
              <div key={item.productId} className="cko-summary-item">
                <div className="cp-item-img cko-sm-img">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <div className="cko-sm-info">
                  <div className="cp-item-title">{item.title}</div>
                  <div className="cko-sm-meta">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="cp-item-total cko-sm-total">
                  ${item.itemTotal.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cp-summary-divider" />
          <div className="cp-summary-rows">
            <div className="cp-summary-row">
              <span>Subtotal ({cart?.totalItems || 0} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cp-summary-row">
              <span>Shipping ({selectedDelivery?.label})</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="cp-summary-row">
              <span>Estimated Tax</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>
          </div>
          <div className="cp-summary-divider" />
          <div className="cp-summary-row cp-total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {hasFormErrors && touched.fullName && (
            <div className="cp-v-form-error">
              <AlertCircle size={15} />
              <span>
                Please fix the errors above before placing your order.
              </span>
            </div>
          )}

          <button
            type="submit"
            className="cp-checkout-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader size={18} className="ct-spin" /> Processing...
              </>
            ) : (
              <>
                <ShieldCheck size={18} /> Place Order
              </>
            )}
          </button>

          <div className="cko-secure-note">
            <ShieldCheck size={14} /> Secure 256-bit SSL Encryption
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
