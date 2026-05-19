import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Footer from "./components/footerr.jsx";
import Navbar from "./components/nav-bar.jsx";
import HomePage from "./pages/home-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import SignUpPage from "./pages/sign-up-page.jsx";
import SignupVerifyPage from "./pages/signup-verify-page.jsx";
import VerifyEmailPage from "./pages/verify-email-page.jsx";
import ResetPasswordPage from "./pages/reset-password-page.jsx";
import NewPasswordPage from "./pages/new-password-page.jsx";

import AboutPage from "./pages/about-page.jsx";
import ContactPage from "./pages/contact-page.jsx";
import FAQPage from "./pages/faq-page.jsx";
import ChatbotPage from "./pages/chatbot-page.jsx";
import DashboardPage from "./pages/dashboard-pag.jsx";
import CompareDevicesPage from "./pages/compare-devices-page.jsx";
import NotificationsPage from "./pages/notifications-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";
import UsedDevicesEvaluation from "./pages/used-devices-evaluation.jsx";
import PerformanceAnalysis from "./pages/performance-analysis.jsx";
import LearnMore from "./pages/learn-more.jsx";
import SmartTips from "./pages/smart-tips.jsx";
import MarketAlerts from "./pages/market-alerts.jsx";

import UpgradeResultsPage from "./pages/upgrade-results-page.jsx";
import LaptopResultsPage from "./pages/laptop-results-page.jsx";

import CartPage from "./pages/cart-page.jsx";
import ProductDetailsPage from "./pages/product-details-page.jsx";
import CheckoutPage from "./pages/checkout-page.jsx";
import OrderSuccessPage from "./pages/order-success-page.jsx";

const authPages = [
  "/login",
  "/signup",
  "/verify",
  "/signup-verify",
  "/reset",
  "/newpassword",
];

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const setCurrentPage = (page) => navigate(`/${page}`);
  const showNavAndFooter = !authPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavAndFooter && (
        <Navbar
          currentPage={location.pathname.replace("/", "")}
          setCurrentPage={setCurrentPage}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/home"
            element={<HomePage setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="/login"
            element={
              <LoginPage
                setCurrentPage={setCurrentPage}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <SignUpPage
                setCurrentPage={setCurrentPage}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />

          <Route
            path="/signup-verify"
            element={
              <SignupVerifyPage
                setCurrentPage={setCurrentPage}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />

          <Route
            path="/verify"
            element={<VerifyEmailPage setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="/reset"
            element={<ResetPasswordPage setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="/newpassword"
            element={<NewPasswordPage setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="/about"
            element={<AboutPage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/contact"
            element={<ContactPage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/faq"
            element={<FAQPage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/smart-tips"
            element={<SmartTips setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/market-alerts"
            element={<MarketAlerts setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/chatbot"
            element={<ChatbotPage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/compare"
            element={<CompareDevicesPage setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/performance"
            element={<PerformanceAnalysis setCurrentPage={setCurrentPage} />}
          />
          <Route
            path="/used-device"
            element={<UsedDevicesEvaluation setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="/notifications"
            element={<NotificationsPage setCurrentPage={setCurrentPage} />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage setCurrentPage={setCurrentPage} />}
          />
          <Route path="/order-success" element={<OrderSuccessPage />} />

          <Route
            path="/profile"
            element={
              <ProfilePage
                setCurrentPage={setCurrentPage}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />

          <Route
            path="/learnmore"
            element={<LearnMore setCurrentPage={setCurrentPage} />}
          />

          <Route path="/results/upgrade" element={<UpgradeResultsPage />} />
          <Route path="/results/laptop" element={<LaptopResultsPage />} />

          <Route
            path="/cart"
            element={<CartPage setCurrentPage={setCurrentPage} />}
          />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <DashboardPage setCurrentPage={setCurrentPage} />
              ) : (
                <LoginPage
                  setCurrentPage={setCurrentPage}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )
            }
          />

          <Route
            path="*"
            element={<HomePage setCurrentPage={setCurrentPage} />}
          />
        </Routes>
      </main>

      {showNavAndFooter && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
