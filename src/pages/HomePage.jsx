import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import PerfectForEveryone from "../components/Perfectforeveryone";
import Howitworks from "../components/Howitworks";
import WhyChoose from "../components/WhyChoose";
import QuickTips from "../components/QuickTips";
import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";

const HomePage = ({ setCurrentPage }) => {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <Features />
      <PerfectForEveryone />
      <Howitworks />
      <WhyChoose />
      <QuickTips />
      <Testimonials />
      <FAQSection />
    </>
  );
};

export default HomePage;
