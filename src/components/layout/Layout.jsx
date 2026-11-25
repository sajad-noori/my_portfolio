import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ScrollEnhancements from "./ScrollEnhancements";

const Layout = ({ children }) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="portfolio">
      <Header />
      <ScrollEnhancements />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
