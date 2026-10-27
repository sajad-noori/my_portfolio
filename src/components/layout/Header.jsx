import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
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

const GITHUB_URL = "https://github.com/sajad-noori";

const SPARK_COUNT = 10;
const SPARK_COLORS = [
  "var(--primary-color)",
  "var(--accent-color)",
  "#f59e0b",
  "#ec4899",
];
const EFFECT_LIFETIME = 900; // ms before a click effect is removed from the DOM

/**
 * Animated GitHub button.
 *
 * Hover:  spinning gradient ring, gradient fill that grows from the centre,
 *         cursor-following spotlight, light sheen sweep, icon wiggle,
 *         "GitHub" rolls up into "Visit ↗".
 * Click:  press-down squish, ripple from the click point, icon spin-pop,
 *         and a burst of colourful sparks.
 */
const GitHubLink = ({ variant = "desktop", onActivate }) => {
  const [effects, setEffects] = useState([]);
  const iconControls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const timeouts = useRef([]);

  // Clear any pending cleanup timers on unmount
  useEffect(() => {
    const pending = timeouts.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Feed the cursor position to CSS so the spotlight can follow it
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const handleClick = (event) => {
    if (!prefersReducedMotion) {
      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      // event.detail === 0 means the click came from the keyboard,
      // so start the ripple from the centre instead of (0, 0)
      const fromKeyboard = event.detail === 0;
      const x = fromKeyboard ? rect.width / 2 : event.clientX - rect.left;
      const y = fromKeyboard ? rect.height / 2 : event.clientY - rect.top;
      const id = `${Date.now()}-${Math.random()}`;

      setEffects((prev) => [...prev, { id, x, y, size }]);
      timeouts.current.push(
        setTimeout(() => {
          setEffects((prev) => prev.filter((fx) => fx.id !== id));
        }, EFFECT_LIFETIME)
      );

      iconControls.start({
        rotate: [0, 360],
        scale: [1, 1.45, 1],
        transition: { duration: 0.7, ease: "easeInOut" },
      });
    }

    if (onActivate) onActivate();
  };

  return (
    <motion.a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`github-link${variant === "mobile" ? " mobile-github" : ""}`}
      aria-label="GitHub Profile"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.04 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.93 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
    >
      {/* Background effects (clipped to the pill shape) */}
      <span className="github-fx" aria-hidden="true">
        <span className="github-sheen" />
        {effects.map((fx) => (
          <span
            key={fx.id}
            className="github-ripple"
            style={{
              width: fx.size,
              height: fx.size,
              left: fx.x - fx.size / 2,
              top: fx.y - fx.size / 2,
            }}
          />
        ))}
      </span>

      {/* Icon + spark burst */}
      <span className="github-icon-slot">
        <motion.span className="github-icon-wrap" animate={iconControls}>
          <FiGithub className="github-icon" />
        </motion.span>

        {effects.map((fx) =>
          Array.from({ length: SPARK_COUNT }, (_, i) => {
            const angle = (i / SPARK_COUNT) * Math.PI * 2;
            const distance = 28 + (i % 3) * 10;
            const color = SPARK_COLORS[i % SPARK_COLORS.length];
            return (
              <motion.span
                key={`${fx.id}-${i}`}
                className="github-spark"
                style={{ background: color, color }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            );
          })
        )}
      </span>

      {/* Text that rolls from "GitHub" to "Visit ↗" on hover */}
      <span className="github-text">
        <span className="github-text-line">GitHub</span>
        <span className="github-text-line github-text-line--alt" aria-hidden="true">
          Visit
          <FiArrowUpRight className="github-arrow" />
        </span>
      </span>
    </motion.a>
  );
};

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
            <GitHubLink />
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
            {/* Close the menu after the click animation has had time to play */}
            <GitHubLink
              variant="mobile"
              onActivate={() => setTimeout(() => setIsMenuOpen(false), 800)}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
