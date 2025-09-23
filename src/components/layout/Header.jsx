import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGithub, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header
      className={`header ${theme === "dark" ? "theme-dark" : "theme-light"}`}
      data-theme={theme}
    >
      <nav className="nav container">
        <div className="nav-brand">
          <NavLink to="/" className="logo">
            <span className="logo-text">Sajad Noori</span>
          </NavLink>
        </div>

        <ul className="nav-links">
          {[
            { to: "/", text: "Home", end: true },
            { to: "/about", text: "About" },
            { to: "/projects", text: "Projects" },
            { to: "/skills", text: "Skills" },
            { to: "/contact", text: "Contact" },
          ].map(({ to, text, end = false }) => (
            <motion.li
              key={to}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="nav-item"
            >
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {text}
                <motion.span
                  className="nav-link-underline"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX:
                      location.pathname === to ||
                      (to === "/" && location.pathname === "/")
                        ? 1
                        : 0,
                    opacity:
                      location.pathname === to ||
                      (to === "/" && location.pathname === "/")
                        ? 1
                        : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </NavLink>
            </motion.li>
          ))}
        </ul>

        <div className="github-container">
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "light" ? "Activate dark mode" : "Activate light mode"
              }
              title={
                theme === "light" ? "Activate dark mode" : "Activate light mode"
              }
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <a
              href="https://github.com/sajad-noori"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              aria-label="GitHub Profile"
            >
              <FiGithub className="github-icon" />
              <span className="github-text">GitHub</span>
            </a>
          </div>
        </div>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu ${isMenuOpen ? "active" : ""} ${
            theme === "dark" ? "theme-dark" : "theme-light"
          }`}
          data-theme={theme}
        >
          <ul className="mobile-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/skills"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li className="mobile-theme-toggle">
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="theme-toggle"
                aria-label={
                  theme === "light"
                    ? "Activate dark mode"
                    : "Activate light mode"
                }
                title={
                  theme === "light"
                    ? "Activate dark mode"
                    : "Activate light mode"
                }
              >
                {theme === "light" ? (
                  <>
                    <FiMoon /> Dark Mode
                  </>
                ) : (
                  <>
                    <FiSun /> Light Mode
                  </>
                )}
              </button>
            </li>
          </ul>

          <div className="mobile-social">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-github"
              aria-label="GitHub Profile"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiGithub className="github-icon" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
