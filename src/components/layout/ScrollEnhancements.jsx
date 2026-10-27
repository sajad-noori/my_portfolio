import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/ScrollEnhancements.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ScrollEnhancements = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Update the progress line and button state without doing layout work
  // on every scroll event.
  useEffect(() => {
    let animationFrameId = null;

    const updateScrollState = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress =
          scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

        setProgress(Math.min(100, Math.max(0, nextProgress)));
        setShowBackToTop(window.scrollY > 420);
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  // Each route behaves like a new page and starts at the top.
  // Respect the visitor's reduced-motion preference.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [location.pathname]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div className="scroll-enhancements" data-theme={theme}>
      <div
        className="scroll-progress-track"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-valuetext={`${Math.round(progress)}%`}
      >
        <span
          className="scroll-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        className={`scroll-top-button ${showBackToTop ? "is-visible" : ""}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <FiArrowUp aria-hidden="true" />
      </button>
    </div>
  );
};

export default ScrollEnhancements;
