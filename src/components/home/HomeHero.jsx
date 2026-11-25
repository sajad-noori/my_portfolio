import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight, FiArrowRight, FiStar } from "react-icons/fi";

export default function HomeHero() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 22, mass: 0.55 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 22, mass: 0.55 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-13, 13]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], [9, -9]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const shineX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  const handleCardPointerMove = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetCardTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="cinema-hero" aria-labelledby="home-title">
      <div className="cinema-grain" aria-hidden="true" />
      <div className="cinema-orbit cinema-orbit--one" aria-hidden="true" />
      <div className="cinema-orbit cinema-orbit--two" aria-hidden="true" />

      <div className="cinema-copy">
        <motion.div className="cinema-eyebrow" {...reveal(0.08)}>
          <span className="cinema-eyebrow-line" />
          <FiStar aria-hidden="true" />
          <span>FULL STACK DEVELOPER</span>
          <span className="cinema-eyebrow-line" />
        </motion.div>

        <motion.p className="cinema-kicker" {...reveal(0.16)}>
          DIGITAL CRAFTSMANSHIP · ENGINEERED WITH INTENT
        </motion.p>

        <motion.h1 id="home-title" className="cinema-title" {...reveal(0.24)}>
          Sajad
          <span>Noori<span className="cinema-period">.</span></span>
        </motion.h1>

        <motion.div className="cinema-title-rule" {...reveal(0.32)}>
          <span />
          <span>CRAFTING DIGITAL EXPERIENCES</span>
        </motion.div>

        <motion.p className="cinema-intro" {...reveal(0.4)}>
          I'm <strong>Sajad Noori</strong>, a dedicated developer passionate
          about building modern, efficient, and user-friendly web applications.
          I specialize in React.js and Node.js, turning complex ideas into
          seamless and interactive digital experiences.
        </motion.p>

        <motion.div className="cinema-actions" {...reveal(0.48)}>
          <Link to="/contact" className="cinema-button cinema-button--primary">
            Get In Touch <FiArrowUpRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="cinema-button cinema-button--ghost"
            onClick={() => navigate("/projects")}
          >
            View My Work <FiArrowRight aria-hidden="true" />
          </button>
        </motion.div>

      </div>

      <motion.div className="cinema-portrait-stage" {...reveal(0.3)}>
        <div className="cinema-stage-label cinema-stage-label--top">
          <span>01 / THE DEVELOPER</span><span>BUILDING FOR THE WEB</span>
        </div>
        <div className="cinema-portrait-halo" aria-hidden="true" />
        <div className="cinema-chrome cinema-chrome--back" aria-hidden="true" />
        <div className="cinema-chrome cinema-chrome--front" aria-hidden="true" />
        <div className="cinema-glass-orb cinema-glass-orb--one" aria-hidden="true" />
        <div className="cinema-glass-orb cinema-glass-orb--two" aria-hidden="true" />
        <motion.div
          className="cinema-portrait-frame"
          onPointerMove={handleCardPointerMove}
          onPointerLeave={resetCardTilt}
          style={reduceMotion ? undefined : {
            rotateX,
            rotateY,
            transformPerspective: 1100,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div className="cinema-card-depth" style={reduceMotion ? undefined : { x: imageX, y: imageY }}>
          <div className="cinema-portrait-image">
            <img
              src="/sajad-profile.jpg"
              alt="Portrait of Sajad Noori"
              fetchPriority="high"
            />
          </div>
          <motion.div
            className="cinema-portrait-shine"
            aria-hidden="true"
            style={reduceMotion ? undefined : { "--shine-x": shineX, "--shine-y": shineY }}
          />
          <div className="cinema-frame-caption">
            <span>SAJAD NOORI</span>
            <span>DEVELOPER · CREATOR</span>
          </div>
          </motion.div>
          <div className="cinema-card-edge" aria-hidden="true" />
        </motion.div>
        <div className="cinema-floating-code" aria-hidden="true">
          <span className="code-dot" /><span className="code-dot" /><span className="code-dot" />
          <code><b>const</b> future = <em>"build"</em>;</code>
        </div>
        <div className="cinema-stage-label cinema-stage-label--bottom">
          <span>DESIGNING WHAT'S NEXT</span><span>REACT · NODE.JS</span>
        </div>
      </motion.div>
    </section>
  );
}
