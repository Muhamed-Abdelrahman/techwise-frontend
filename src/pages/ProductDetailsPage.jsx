import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  CheckCircle,
  Truck,
  Shield,
  Loader,
  Trash2,
  Edit3,
  Send,
  Cpu,
  Monitor,
} from "lucide-react";
import "../styles/ProductDetailsPage.css";

const BASE_URL = "https://techwiseapp.runasp.net";
const USE_MOCK = false;

// ============================================================
// MOCK RESPONSES
// ============================================================
const MOCK_PRODUCT = {
  productId: 200,
  reason: "Fastest gaming CPU per dollar.",
  operationType: "suggest_upgrade",
  purpose: "Gaming",
  budget: "500-1000",
  title: "AMD Ryzen 7 9850X3D AMD cpu - Intel Core i7 - Nvidia RTX - 16GB RAM",
  brand: "AMD",
  category: "cpu",
  price: 499.0,
  wasPrice: 699.0,
  ratingAvg: 4.8,
  ratingCount: 2,
  matchPercent: 92,
  imageUrl: "https://c1.neweggimages.com/productimage/nb640/19-113-934-01.png",
  productUrl: "https://www.newegg.com/amd-ryzen-7-9850x3d/p/N82E16819113934",
  inStock: true,
  keySpecs: { Series: "Ryzen 9000 Series", "Processors Type": "Desktop", Model: "100-100001973WOF" },
  allSpecs: [
    { specKey: "Model", specValue: "100-100001973WOF" },
    { specKey: "Series", specValue: "Ryzen 9000 Series" },
    { specKey: "Processors Type", specValue: "Desktop" },
  ],
  specIcons: [{ label: "AMD Ryzen 7 5800H", icon: "cpu" }, { label: "RTX 3060", icon: "monitor" }],
};

const MOCK_REVIEWS_RESPONSE = {
  productId: 200,
  averageRating: 4.5,
  totalReviews: 2,
  reviews: [
    { id: 101, userId: "user_002", productId: 200, rating: 5, comment: "Best CPU!", createdAt: "2026-03-20T10:00:00Z", updatedAt: null },
    { id: 102, userId: "user_001", productId: 200, rating: 4, comment: "Great performance.", createdAt: "2026-04-01T15:30:00Z", updatedAt: null },
  ],
};

// ============================================================
// HELPERS
// ============================================================
const getToken = () => {
  const directToken = localStorage.getItem("accessToken");
  if (directToken) return directToken;
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.token || user.accessToken || null;
  } catch { return null; }
};

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.userId || user.id || null;
  } catch { return null; }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

// ============================================================
// COMPONENT
// ============================================================
const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [ratingInput, setRatingInput] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [shareText, setShareText] = useState("Share");

  // ═══ تحويل الـ ID لـ State عشان نحدثه لو الـ API رجع ID مختلف ═══
  const [currentUserId, setCurrentUserId] = useState(() => getUserId());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let currentProduct = null;

        if (USE_MOCK) {
          await new Promise((r) => setTimeout(r, 600));
          currentProduct = { ...MOCK_PRODUCT, productId: Number(id) || 200 };
          setProduct(currentProduct);
        } else {
          const token = getToken();
          const res = await fetch(`${BASE_URL}/api/products/recommendations/${id}?userReqNumber=3`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) {
            let errorMsg = "Something went wrong";
            try {
              const errData = await res.json();
              errorMsg = errData.errorMessege || errData.message || errData.title || `Error ${res.status}`;
            } catch { errorMsg = `Request failed with status ${res.status}`; }
            throw new Error(errorMsg);
          }
          currentProduct = await res.json();
          setProduct(currentProduct);
        }

        // التحقق لو المنتج ده مداس عليه كـ Favorite
        if (!USE_MOCK && currentProduct?.productId) {
          const token = getToken();
          if (token) {
            try {
              const favRes = await fetch(`${BASE_URL}/api/Favorites/${currentProduct.productId}/is-saved`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (favRes.ok) {
                const favData = await favRes.json();
                setIsFavorite(favData.isSaved === true);
              }
            } catch (err) { console.error("Check fav error:", err); }
          }
        }

        // Reviews
        if (USE_MOCK) {
          await new Promise((r) => setTimeout(r, 300));
          const mockData = { ...MOCK_REVIEWS_RESPONSE, productId: Number(id) || 200 };
          setAverageRating(mockData.averageRating);
          setTotalReviews(mockData.totalReviews);
          setReviews(mockData.reviews);
        } else {
          const res = await fetch(`${BASE_URL}/api/Reviews/${id}`);
          if (res.ok) {
            const data = await res.json();
            setAverageRating(data.averageRating);
            setTotalReviews(data.totalReviews);
            setReviews(data.reviews);
            
            // ═══ تحديث الـ ID من الريفيو لو الـ localStorage فاضي أو غلط ═══
            if (data.reviews && data.reviews.length > 0) {
              const myId = String(currentUserId ?? "");
              const apiId = String(data.reviews[0].userId ?? "");
              if (apiId && myId !== apiId) {
                setCurrentUserId(apiId);
                try {
                  const user = JSON.parse(localStorage.getItem("user") || "{}");
                  user.userId = data.reviews[0].userId;
                  localStorage.setItem("user", JSON.stringify(user));
                } catch {}
              }
            }
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const userReview = reviews.find((r) => String(r.userId ?? "") === String(currentUserId ?? ""));

  // ── Favorite ──
  const toggleFavorite = async () => {
    if (favLoading || !product) return;
    const token = getToken();
    if (!token) return navigate("/login");
    setFavLoading(true);
    try {
      if (!USE_MOCK) {
        await fetch(`${BASE_URL}/api/Favorites/${product.productId}`, {
          method: isFavorite ? "DELETE" : "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Favorite error:", err.message);
    } finally {
      setFavLoading(false);
    }
  };

  // ── Add to Cart ──
  const addToCart = async () => {
    if (cartLoading || !product) return;
    const token = getToken();
    if (!token) return navigate("/login");
    setCartLoading(true);
    try {
      if (!USE_MOCK) {
        const res = await fetch(`${BASE_URL}/api/cart/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ productId: product.productId, quantity: 1 }),
        });
        if (!res.ok) throw new Error("Failed to add to cart");
      }
      window.dispatchEvent(new Event("cart-updated"));
      navigate("/cart");
    } catch (err) {
      console.error("Cart error:", err.message);
    } finally {
      setCartLoading(false);
    }
  };

  // ── Share Logic ──
  const handleShare = async () => {
    const urlToCopy = window.location.href;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setShareText("Copied!");
      setTimeout(() => setShareText("Share"), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = urlToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShareText("Copied!");
      setTimeout(() => setShareText("Share"), 2000);
    }
  };

  // ── Reviews ──
  const submitReview = async () => {
    if (reviewLoading || ratingInput === 0 || !commentInput.trim()) return;
    const token = getToken();
    if (!token) return navigate("/login");
    setReviewLoading(true);
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 500));
        const newReview = {
          id: Date.now(), userId: currentUserId, productId: product.productId,
          rating: ratingInput, comment: commentInput,
          createdAt: new Date().toISOString(), updatedAt: isEditing ? new Date().toISOString() : null,
        };
        if (isEditing) {
          setReviews(reviews.map((r) => (String(r.userId ?? "") === String(currentUserId ?? "") ? newReview : r)));
        } else {
          setReviews([newReview, ...reviews]);
          setTotalReviews(totalReviews + 1);
        }
      } else {
        const method = isEditing ? "PUT" : "POST";
        const res = await fetch(`${BASE_URL}/api/Reviews/${product.productId}`, {
          method,
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ rating: ratingInput, comment: commentInput }),
        });
        const data = await res.json();
        
        const apiUserId = String(data.userId ?? "");
        const myId = String(currentUserId ?? "");

        // تحديث الـ ID الحقيقي لو الـ API رجع ID مختلف عن اللي في الـ localStorage
        if (apiUserId && apiUserId !== myId) {
          setCurrentUserId(apiUserId);
          try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            user.userId = data.userId;
            localStorage.setItem("user", JSON.stringify(user));
          } catch {}
        }

        const finalId = apiUserId || myId;
        const isMyReview = apiUserId === myId;

        if (isEditing && isMyReview) {
          setReviews(reviews.map((r) => (String(r.userId ?? "") === finalId ? data : r)));
        } else if (!isEditing && isMyReview) {
          setReviews([data, ...reviews.filter((r) => String(r.userId ?? "") !== finalId)]);
          setTotalReviews(totalReviews + 1);
        } else {
          const myNewReview = { ...data, userId: data.userId || currentUserId };
          if (isEditing) {
            setReviews(reviews.map((r) => (String(r.userId ?? "") === finalId ? myNewReview : r)));
          } else {
            setReviews([myNewReview, ...reviews]);
            setTotalReviews(totalReviews + 1);
          }
        }
      }
      setRatingInput(0);
      setCommentInput("");
      setIsEditing(false);
    } catch (err) {
      console.error("Review error:", err.message);
    } finally {
      setReviewLoading(false);
    }
  };

  const deleteReview = async () => {
    const token = getToken();
    if (!token) return navigate("/login");
    setReviewLoading(true);
    try {
      if (!USE_MOCK) {
        await fetch(`${BASE_URL}/api/Reviews/${product.productId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setReviews(reviews.filter((r) => String(r.userId ?? "") !== String(currentUserId ?? "")));
      setTotalReviews(totalReviews - 1);
      setIsEditing(false);
    } catch (err) {
      console.error("Delete review error:", err.message);
    } finally {
      setReviewLoading(false);
    }
  };

  const startEditing = () => {
    if (userReview) {
      setRatingInput(userReview.rating);
      setCommentInput(userReview.comment);
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setRatingInput(0);
    setCommentInput("");
    setIsEditing(false);
  };

  // ── Render Stars ──
  const renderStars = (rating, size = 18) =>
    [1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={size} fill={i <= Math.round(rating) ? "#f59e0b" : "transparent"} color="#f59e0b" />
    ));

  const renderStarSelector = () =>
    [1, 2, 3, 4, 5].map((star) => (
      <Star key={star} size={24} fill={star <= ratingInput ? "#f59e0b" : "transparent"} color="#f59e0b" className="pd-star-selector" onClick={() => setRatingInput(star)} />
    ));

  // ── Loading / Error ──
  if (loading) {
    return (
      <div className="pd-loading-screen">
        <Loader size={40} className="spin-icon" />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd-error-screen">
        <p>{error || "Product not found"}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // تنظيف التايتل (يقطع من أول فاصلة أو علامة - )
  let shortTitle = product.title;
  if (shortTitle.includes(",")) {
    shortTitle = shortTitle.split(",")[0].trim();
  } else if (shortTitle.includes(" - ")) {
    shortTitle = shortTitle.split(" - ")[0].trim();
  }

  // حساب الخصم (لو مفيش خصم أو السعر قديم غلط مبيظهرش حاجة)
  const hasDiscount = product.wasPrice && product.wasPrice > product.price;
  const savings = hasDiscount ? (product.wasPrice - product.price).toFixed(0) : null;

  return (
    <div className="pd-container">
      <button className="pd-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back to Results
      </button>

      <h1 className="pd-page-title">{shortTitle}</h1>

      <div className="pd-layout">
        {/* LEFT: Image */}
        <div className="pd-image-section">
          <div className="pd-main-image">
            <div className="pd-most-popular-badge">Most Popular</div>
            <img src={product.imageUrl} alt={shortTitle} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"; }} />
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="pd-info-section">
          <div className="pd-price-match-row">
            <span className="pd-current-price">${product.price?.toFixed(0)}</span>
            {product.matchPercent && <span className="pd-match-badge">{product.matchPercent}% Match</span>}
          </div>

          {hasDiscount && (
            <div className="pd-old-save-row">
              <span className="pd-old-price">${product.wasPrice.toFixed(0)}</span>
              <span className="pd-save">Save ${savings}</span>
            </div>
          )}

          {/* النجوم والكاونت من الـ Reviews API */}
          <div className="pd-rating">
            <div className="pd-stars">{renderStars(averageRating, 20)}</div>
            <span className="pd-rating-num">{averageRating?.toFixed(1)}</span>
          </div>

          <button className="pd-buy-btn" onClick={addToCart} disabled={cartLoading}>
            {cartLoading ? <Loader size={18} className="spin-icon-white" /> : <ShoppingCart size={18} />}
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>

          <div className="pd-secondary-actions">
            <button className={`pd-secondary-btn ${isFavorite ? "pd-fav-active" : ""}`} onClick={toggleFavorite} disabled={favLoading}>
              {favLoading ? <Loader size={16} className="spin-icon" /> : <Heart size={16} fill={isFavorite ? "#ef4444" : "none"} color={isFavorite ? "#ef4444" : "#374151"} />}
              Save
            </button>
            
            <button className="pd-secondary-btn" onClick={handleShare}>
              <Share2 size={16} />
              {shareText}
            </button>
          </div>

          <div className="pd-features-card">
            <div className={`pd-feature-row ${!product.inStock ? "out-stock" : ""}`}>
              <CheckCircle size={18} />
              <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>
            <div className="pd-feature-row"><Truck size={18} /><span>Free standard shipping</span></div>
            <div className="pd-feature-row"><Shield size={18} /><span>1-year manufacturer warranty</span></div>
          </div>

          {product.specIcons && product.specIcons.length > 0 && (
            <div className="pd-specs-icons-row">
              {product.specIcons.map((s, i) => (
                <div key={i} className="pd-spec-icon-item">
                  {s.icon === "cpu" ? <Cpu size={28} /> : <Monitor size={28} />}
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {product.reason && (
            <div className="pd-ai-reason">
              <p className="pd-ai-title">💡 Why we recommend this:</p>
              <p>{product.reason}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Specs Table ── */}
      {product.allSpecs && product.allSpecs.length > 0 && (
        <div className="pd-specs-section">
          <h2>Specifications</h2>
          <div className="pd-specs-grid">
            {product.allSpecs.map((spec, idx) => (
              <div key={idx} className="pd-spec-item">
                <span className="pd-spec-key">{spec.specKey}</span>
                <span className="pd-spec-value">{spec.specValue}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Reviews ── */}
      <div className="pd-reviews-section">
        <h2>Customer Reviews ({totalReviews})</h2>

        <div className="pd-review-form-box">
          <h3>
            {userReview && !isEditing ? "Your Review" : isEditing ? "Edit Your Review" : "Write a Review"}
          </h3>

          {!userReview || isEditing ? (
            <>
              <div className="pd-star-selector-row">{renderStarSelector()}</div>
              <textarea className="pd-review-textarea" placeholder="Share your experience with this product..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)} rows={4} />
              <div className="pd-review-form-actions">
                {isEditing && <button className="pd-cancel-btn" onClick={cancelEditing}>Cancel</button>}
                <button className="pd-submit-btn" onClick={submitReview} disabled={ratingInput === 0 || !commentInput.trim() || reviewLoading}>
                  {reviewLoading ? <Loader size={15} className="spin-icon-white" /> : <Send size={15} />}
                  {isEditing ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </>
          ) : (
            <div className="pd-user-review-card">
              <div className="pd-review-top">
                <div className="pd-review-stars">{renderStars(userReview.rating)}</div>
                <div className="pd-review-actions-btns">
                  <button onClick={startEditing} className="pd-review-act-btn edit"><Edit3 size={13} /> Edit</button>
                  <button onClick={deleteReview} className="pd-review-act-btn delete"><Trash2 size={13} /> Delete</button>
                </div>
              </div>
              <p className="pd-review-comment">{userReview.comment}</p>
              <span className="pd-review-date">
                {userReview.updatedAt ? `Updated on ${formatDate(userReview.updatedAt)}` : `Reviewed on ${formatDate(userReview.createdAt)}`}
              </span>
            </div>
          )}
        </div>

        {reviews.filter((r) => String(r.userId ?? "") !== String(currentUserId ?? "")).length > 0 && (
          <div className="pd-others-reviews">
            {reviews.filter((r) => String(r.userId ?? "") !== String(currentUserId ?? "")).map((rev) => (
              <div key={rev.id} className="pd-review-card">
                <div className="pd-review-top"><div className="pd-review-stars">{renderStars(rev.rating)}</div></div>
                <p className="pd-review-comment">{rev.comment}</p>
                <span className="pd-review-date">Reviewed on {formatDate(rev.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;