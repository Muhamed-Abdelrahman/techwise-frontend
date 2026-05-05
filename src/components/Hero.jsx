import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import laptop1 from "../assets/hero_img/laptop1.svg";
import laptop2 from "../assets/hero_img/laptop2.svg";
import laptop3 from "../assets/hero_img/laptop3.svg";
import starIcon from "../assets/hero_img/star.svg";
import lernIcon from "../assets/hero_img/learn_more.svg";
import trueIcon from "../assets/hero_img/true.svg";
import "../styles/hero.css";

const images = [laptop1, laptop2, laptop3];
const directions = [1, 1, -1];

const Hero = ({ setCurrentPage }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(directions[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ✅ بيتحقق من الـ localStorage مباشرة من غير prop
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        setDirection(directions[next]);
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-wrapper">

      {/* ---------- HERO MAIN ---------- */}
      <section className="hero-main-section">
        <div className="hero-container-custom">

          {/* Welcome Badge */}
          <div className="hero-welcome-badge">
            <img src={starIcon} alt="icon" width="16" height="16" />
            Welcome to the Future of Intelligence
          </div>

          {/* Row */}
          <div className="hero-row-custom">

            {/* Text Column */}
            <div className="hero-text-column">
              <h1 className="hero-heading">
                Make PC Decisions <br />
                <span className="hero-heading-blue">Smart & Evaluate</span>
              </h1>
              <p className="hero-subheading">
                Revolutionary AI-powered platform that transforms how you{" "}
                <strong className="hero-bold-blue">Buy</strong>,{" "}
                <strong className="hero-bold-blue">Sell</strong> and{" "}
                <strong className="hero-bold-blue">Upgrade</strong> PCs
              </p>

              <div className="hero-buttons-wrapper">
                <button
                  className="hero-button-primary"
                  onClick={() => setCurrentPage(isLoggedIn ? "chatbot" : "signup")}
                >
                  <img src={starIcon} alt="" width="20" height="20" />
                  {isLoggedIn ? "Start Exploring" : "Get Started Now"}
                </button>

                <button
                  className="hero-button-secondary"
                  onClick={() => setCurrentPage("learnmore")}
                >
                  <img src={lernIcon} alt="" width="20" height="20" />
                  Learn More
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="hero-image-column">
              <div className="hero-laptop-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={index}
                    src={images[index]}
                    className="hero-laptop-img"
                    initial={{ x: direction * 100, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      rotateX: mousePos.y,
                      rotateY: mousePos.x,
                    }}
                    exit={{ x: direction * -100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HERO INFO ---------- */}
      <section className="hero-info-section">
        <div className="hero-info-container">

          <p className="hero-info-text">
            Powered by advanced machine learning algorithms, real-time market
            data, and cutting-edge computer vision technology
          </p>

          {/* Icons Grid */}
          <div className="hero-icons-grid">
            {[
              "Real-time Analysis",
              "AI-Powered",
              "Market Intelligence",
              "High Level Accuracy",
            ].map((label) => (
              <div className="hero-icon-box" key={label}>
                <img src={trueIcon} alt="" width="16" height="16" />
                {label}
              </div>
            ))}
          </div>

          {/* Brands Slider */}
          <div className="hero-brands-slider">
            <div className="hero-brands-track">
              {[1, 2, 3, 4, 5].map((i) => (
                <div className="hero-brands-group" key={i}>
                  <div className="hero-brand">
                    <svg className="brand-apple-logo" viewBox="0 0 50 60">
                      <path
                        d="M 25 5 Q 20 0 15 5 Q 10 10 15 15 Q 18 18 20 15 Q 22 12 25 15 Z M 25 15 Q 15 18 12 28 Q 10 38 15 45 Q 20 52 28 50 Q 32 49 35 45 Q 38 41 38 35 Q 38 28 32 22 Q 28 18 25 15 Z"
                        fill="#000"
                      />
                    </svg>
                  </div>
                  <div className="hero-brand">
                    <span className="brand-asus">ASUS</span>
                  </div>
                  <div className="hero-brand">
                    <span className="brand-acer">acer</span>
                  </div>
                  <div className="hero-brand">
                    <span className="brand-msi">msi</span>
                  </div>
                  <div className="hero-brand">
                    <svg className="brand-lg-logo" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="#a50034" />
                      <text
                        x="50"
                        y="63"
                        textAnchor="middle"
                        fill="white"
                        fontSize="32"
                        fontWeight="700"
                        fontFamily="Arial, sans-serif"
                      >
                        LG
                      </text>
                    </svg>
                  </div>
                  <div className="hero-brand">
                    <span className="brand-samsung">SAMSUNG</span>
                  </div>
                  <div className="hero-brand">
                    <svg className="brand-dell-logo" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#007DB8"
                        strokeWidth="4"
                      />
                      <text
                        x="50"
                        y="60"
                        textAnchor="middle"
                        fill="#007DB8"
                        fontSize="28"
                        fontWeight="700"
                        fontFamily="Arial, sans-serif"
                      >
                        DELL
                      </text>
                    </svg>
                  </div>
                  <div className="hero-brand">
                    <svg className="brand-hp-logo" viewBox="0 0 100 60">
                      <circle cx="30" cy="30" r="25" fill="#0096D6" />
                      <circle cx="70" cy="30" r="25" fill="#0096D6" />
                      <path
                        d="M30 15 L30 45 M25 25 L35 25 M25 35 L35 35"
                        stroke="white"
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d="M65 15 L65 30 L75 30 L75 45 M65 30 L75 15"
                        stroke="white"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="hero-brand">
                    <span className="brand-lenovo">Lenovo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="hero-wave-wrapper">
          <svg
            viewBox="0 0 1440 250"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,120 C200,40 200,180 360,120 C540,40 540,180 720,120 C900,40 900,180 1080,120 C1200,60 1320,60 1440,120 L1440,250 L0,250 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Hero;