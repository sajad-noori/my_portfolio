
import { useTheme } from "../../hooks/useTheme";

const styles = `
  .animated-theme-toggle {
    --toggle-width: 72px;
    --toggle-height: 38px;
    --toggle-thumb: 30px;
    --toggle-gap: 4px;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--toggle-width);
    height: var(--toggle-height);
    padding: 0;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    overflow: hidden;
    cursor: pointer;
    isolation: isolate;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 250ms ease,
      background 350ms ease,
      border-color 350ms ease,
      box-shadow 350ms ease;
  }

  .animated-theme-toggle.is-light {
    background: #e8edf7;
    border-color: #d5deed;
    box-shadow: inset 0 2px 5px #1e293b12;
  }

  .animated-theme-toggle.is-dark {
    background: #15172b;
    border-color: #39365e;
    box-shadow:
      inset 0 2px 5px #0005,
      0 0 14px #7c3aed20;
  }

  .animated-theme-toggle:hover {
    transform: translateY(-1px) scale(1.04);
  }

  .animated-theme-toggle:active {
    transform: scale(.95);
  }

  .animated-theme-toggle:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 4px;
  }

  .animated-theme-toggle__track {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
  }

  .animated-theme-toggle__thumb {
    position: absolute;
    z-index: 2;
    top: var(--toggle-gap);
    left: var(--toggle-gap);
    width: var(--toggle-thumb);
    height: var(--toggle-thumb);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #f59e0b;
    background: #fff;
    box-shadow:
      0 2px 7px #0f172a25,
      0 0 12px #f59e0b15;
    transition:
      left 550ms cubic-bezier(.22, 1, .36, 1),
      color 350ms ease,
      background 350ms ease,
      box-shadow 400ms ease;
  }

  .animated-theme-toggle.is-dark .animated-theme-toggle__thumb {
    left: calc(
      var(--toggle-width) - var(--toggle-thumb) - var(--toggle-gap)
    );
    color: #fff;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    box-shadow:
      0 2px 8px #0005,
      0 0 16px #8b5cf680;
  }

  .animated-theme-toggle__icon {
    position: absolute;
    width: 17px;
    height: 17px;
    transition:
      transform 550ms cubic-bezier(.22, 1, .36, 1),
      opacity 250ms ease;
  }

  .animated-theme-toggle__sun {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .animated-theme-toggle__moon {
    opacity: 0;
    transform: rotate(-90deg) scale(.35);
  }

  .animated-theme-toggle.is-dark .animated-theme-toggle__sun {
    opacity: 0;
    transform: rotate(100deg) scale(.35);
  }

  .animated-theme-toggle.is-dark .animated-theme-toggle__moon {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .animated-theme-toggle__stars {
    position: absolute;
    inset: 0;
    color: #d8d4ff;
    pointer-events: none;
  }

  .animated-theme-toggle__star {
    position: absolute;
    opacity: 0;
    transform: scale(.2) rotate(-35deg);
    transition:
      opacity 300ms ease,
      transform 450ms ease;
  }

  .animated-theme-toggle__star--one {
    top: 4px;
    left: 10px;
    font-size: 10px;
  }

  .animated-theme-toggle__star--two {
    left: 21px;
    bottom: 3px;
    font-size: 11px;
    transition-delay: 50ms;
  }

  .animated-theme-toggle__star--three {
    top: 3px;
    right: 10px;
    font-size: 12px;
    transition-delay: 100ms;
  }

  .animated-theme-toggle__star--four {
    right: 8px;
    bottom: 3px;
    font-size: 9px;
    transition-delay: 150ms;
  }

  .animated-theme-toggle.is-dark .animated-theme-toggle__star {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .animated-theme-toggle__label {
    display: none;
  }

  /* Full-width version for the existing mobile navigation */
  .animated-theme-toggle--mobile {
    width: 100%;
    height: 48px;
    padding: 0 12px;
    justify-content: space-between;
    gap: 12px;
    border-radius: 12px;
    color: var(--text-color);
    background: var(--hover-bg);
    border-color: var(--border-color);
    box-shadow: none;
  }

  .animated-theme-toggle--mobile .animated-theme-toggle__label {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font: inherit;
    font-size: .95rem;
    font-weight: 500;
  }

  .animated-theme-toggle--mobile .animated-theme-toggle__track {
    position: relative;
    flex: 0 0 var(--toggle-width);
    width: var(--toggle-width);
    height: var(--toggle-height);
  }

  .animated-theme-toggle--mobile:hover {
    transform: translateX(3px);
    border-color: #8b5cf6;
  }

  @media (prefers-reduced-motion: reduce) {
    .animated-theme-toggle,
    .animated-theme-toggle *,
    .animated-theme-toggle::before,
    .animated-theme-toggle::after {
      transition: none !important;
      animation: none !important;
    }
  }
`;

export default function AnimatedThemeToggle({ variant = "desktop", onToggle }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const mobile = variant === "mobile";

  const handleToggle = () => {
    toggleTheme();
    onToggle?.();
  };

  return (
    <>
      <style>{styles}</style>

      <button
        type="button"
        className={[
          "animated-theme-toggle",
          isDark ? "is-dark" : "is-light",
          mobile ? "animated-theme-toggle--mobile" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        aria-pressed={isDark}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {mobile && (
          <span className="animated-theme-toggle__label">
            {isDark ? "Dark appearance" : "Light appearance"}
          </span>
        )}

        <span className="animated-theme-toggle__track" aria-hidden="true">
          <span className="animated-theme-toggle__stars">
            <span className="animated-theme-toggle__star animated-theme-toggle__star--one">
              ✦
            </span>
            <span className="animated-theme-toggle__star animated-theme-toggle__star--two">
              ✧
            </span>
            <span className="animated-theme-toggle__star animated-theme-toggle__star--three">
              ·
            </span>
            <span className="animated-theme-toggle__star animated-theme-toggle__star--four">
              ✦
            </span>
          </span>

          <span className="animated-theme-toggle__thumb">
            <svg
              className="animated-theme-toggle__icon animated-theme-toggle__sun"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <g
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2" />
                <path d="m4.93 4.93 1.42 1.42 M17.65 17.65l1.42 1.42" />
                <path d="m4.93 19.07 1.42-1.42 M17.65 6.35l1.42-1.42" />
              </g>
            </svg>

            <svg
              className="animated-theme-toggle__icon animated-theme-toggle__moon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.3 15.4A8.5 8.5 0 0 1 8.6 3.7 8.5 8.5 0 1 0 20.3 15.4Z"
                fill="currentColor"
              />
              <path
                d="m16.5 4 .5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </span>
      </button>
    </>
  );
}
