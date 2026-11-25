import React from "react";
import { FiCode, FiLayers, FiZap } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import HomeHero from "../components/home/HomeHero";
import "../styles/Home.css";

const features = [
  { icon: <FiCode className="feature-icon" />, title: "Thoughtful Engineering", description: "Maintainable code, clear structure, and practical solutions built to last.", color: "blue" },
  { icon: <FiLayers className="feature-icon" />, title: "Full-Stack Perspective", description: "Connecting responsive React interfaces with reliable APIs and data.", color: "purple" },
  { icon: <FiZap className="feature-icon" />, title: "Performance & Usability", description: "Fast, accessible experiences that feel natural across devices.", color: "red" },
];

const Home = () => {
  const { theme } = useTheme();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`home-container ${theme === "dark" ? "theme-dark" : "theme-light"}`}
        data-theme={theme}
      >
        <div className="content-container">
          <HomeHero />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="features-grid"
          >
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                className={`feature-card feature-${feature.color}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                  <div className="feature-icon-glow" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <motion.div className="feature-accent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 + index * 0.12, duration: 0.7 }} />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
