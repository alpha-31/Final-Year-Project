import React from "react";
import "./styles/index.css";
import Starter from "./sections/Starter";
import "antd/dist/antd.min.css";
import About from "./sections/About";
import Why from "./sections/Why";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import { motion } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";

const WelcomeSite = () => {
  return (
    <motion.div initial="hidden" animate="show">
      <ScrollToTop />
      <Starter />
      <About />
      <Why />
      <Testimonials />
      <Footer />
    </motion.div>
  );
};

export default WelcomeSite;
