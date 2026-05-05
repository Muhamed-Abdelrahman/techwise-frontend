import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SignupVerifyPage from "./pages/SignupVerifyPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// ✅ FIXED IMPORT
import NewPasswordPage from "./pages/Newpasswordpage";

import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import ChatbotPage from "./pages/ChatbotPage";
import DashboardPage from "./pages/DashboardPage";
import CompareDevicesPage from "./pages/CompareDevicesPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import UsedDevicesEvaluation from "./pages/UsedDevicesEvaluation";
import UpgradeDevice from "./pages/UpgradeDevice";
import PerformanceAnalysis from "./pages/PerformanceAnalysis";
import LearnMore from "./pages/LearnMore";
import SmartTips from "./pages/SmartTips";
import MarketAlerts from "./pages/MarketAlerts";

import UpgradeResultsPage from "./pages/UpgradeResultsPage";
import LaptopResultsPage from "./pages/Laptopresultspage";

import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

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
            path="/new-device"
            element={<RecommendationsPage setCurrentPage={setCurrentPage} />}
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
            path="/upgrade"
            element={<UpgradeDevice setCurrentPage={setCurrentPage} />}
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
