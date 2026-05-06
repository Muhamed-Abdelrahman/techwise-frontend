import React from "react";

import Hero from "../components/heroo.jsx";
import Features from "../components/featuress.jsx";
import PerfectForEveryone from "../components/perfect-for-everyone.jsx";
import HowItWorks from "../components/how-it-works.jsx";
import WhyChoose from "../components/why-choose.jsx";
import QuickTips from "../components/quick-tips.jsx";
import FAQSection from "../components/faq-section.jsx";
import Testimonials from "../components/test-monials.jsx";

const HomePage = ({ setCurrentPage }) => {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <Features />
      <PerfectForEveryone />
      <HowItWorks />
      <WhyChoose />
      <QuickTips />
      <Testimonials />
      <FAQSection />
    </>
  );
};

export default HomePage;