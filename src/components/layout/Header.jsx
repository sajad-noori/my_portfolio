import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiGithub,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiArrowUpRight,
} from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/Header.css";

const links = [
  { to: "/", text: "Home", end: true, number: "01" },
  { to: "/about", text: "About", number: "02" },
  { to: "/projects", text: "Projects", number: "03" },
  { to: "/skills", text: "Skills", number: "04" },
  { to: "/contact", text: "Contact", number: "05" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const themeLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <header className={`header ${theme === "dark" ? "theme-dark" : "theme-light"}`} data-theme={theme}>
      <nav className="nav container" aria-label="Main navigation">
        <NavLink to="/" className="nav-brand" aria-label="Sajad Noori — Home" onClick={() => setIsMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">S<span>.</span></span>
          <span className="brand-copy">
            <span className="logo-text">Sajad Noori</span>
            <span className="brand-caption">FULL-STACK DEVELOPER</span>
          </span>
        </NavLink>

        <ul className="nav-links">
          {links.map(({ to, text, end, number }) => (
            <motion.li key={to} className="nav-item" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <NavLink to={to} end={end} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
                {({ isActive }) => (
                  <>
                    <span className="nav-link-label">{text}</span>
                    <span className="nav-link-number" aria-hidden="true">{number}</span>
                    {isActive && <motion.span className="nav-link-indicator" layoutId="nav-active-indicator" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            <motion.span key={theme} initial={{ rotate: -35, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.22 }}>
              {theme === "light" ? <FiMoon size={17} /> : <FiSun size={17} />}
            </motion.span>
          </button>
          <a href="https://github.com/sajad-noori" target="_blank" rel="noopener noreferrer" className="github-link">
            <FiGithub className="github-icon" />
            <span className="github-text">GitHub</span>
            <FiArrowUpRight className="github-arrow" aria-hidden="true" />
          </a>
        </div>

        <button
          className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={isMenuOpen ? "close" : "open"} initial={{ opacity: 0, rotate: -45, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 45, scale: 0.8 }} transition={{ duration: 0.15 }}>
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button className="mobile-backdrop" aria-label="Close navigation menu" onClick={() => setIsMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              id="mobile-navigation"
              className={`mobile-menu ${theme === "dark" ? "theme-dark" : "theme-light"}`}
              data-theme={theme}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mobile-menu-heading">
                <span>Explore</span>
                <span className="mobile-menu-count">0{links.length} PAGES</span>
              </div>
              <ul className="mobile-links">
                {links.map(({ to, text, end, number }, index) => (
                  <motion.li key={to} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045, duration: 0.2 }}>
                    <NavLink to={to} end={end} className={({ isActive }) => `mobile-nav-link${isActive ? " active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                      <span className="mobile-link-number">{number}</span>
                      <span>{text}</span>
                      <FiArrowUpRight className="mobile-link-arrow" aria-hidden="true" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mobile-menu-footer">
                <button onClick={toggleTheme} className="mobile-theme-toggle" aria-label={themeLabel}>
                  {theme === "light" ? <FiMoon size={17} /> : <FiSun size={17} />}
                  <span>{theme === "light" ? "Dark appearance" : "Light appearance"}</span>
                </button>
                <a href="https://github.com/sajad-noori" target="_blank" rel="noopener noreferrer" className="mobile-github" onClick={() => setIsMenuOpen(false)}>
                  <FiGithub size={17} /> GitHub <FiArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
