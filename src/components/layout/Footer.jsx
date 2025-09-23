import React from "react";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/Footer.css";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`footer ${theme === "dark" ? "theme-dark" : "theme-light"}`}
      data-theme={theme}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">Sajad Noori</h3>
          <p className="footer-description">
            Full Stack Developer passionate about creating innovative digital
            solutions.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/" className="footer-link">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="footer-link">
                About
              </a>
            </li>
            <li>
              <a href="/projects" className="footer-link">
                Projects
              </a>
            </li>
            <li>
              <a href="/skills" className="footer-link">
                Skills
              </a>
            </li>
            <li>
              <a href="/contact" className="footer-link">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Connect</h4>
          <div className="footer-social">
            <a
              href="https://github.com/sajad-noori"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <FiGithub className="social-icon" />
            </a>
            <a
              href="mailto:sajadnooribayany@gmail.com"
              className="social-link"
              aria-label="Email"
            >
              <FiMail className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>
            &copy; {currentYear} Sajad Noori. Made with{" "}
            <FiHeart className="heart-icon" /> using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
