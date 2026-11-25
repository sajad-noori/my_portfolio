import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiCode,
  FiGithub,
  FiHeart,
  FiMail,
  FiPhone,
  FiStar,
} from "react-icons/fi";

const technologies = [
  "React",
  "Node.js",
  "Next.js",
  "TypeScript",
  "Express.js",
  "MongoDB",
  "MySQL",
  "Git",
  "JWT",
  "Tailwind CSS",
  "Bootstrap",
  "GitHub",
];

const stats = [
  { value: "3+", label: "Years experience" },
  { value: "50+", label: "Projects completed" },
  { value: "100%", label: "Client satisfaction" },
];

export default function HomeHero() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

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

        <motion.div className="cinema-stats" {...reveal(0.56)}>
          {stats.map((stat) => (
            <div className="cinema-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="cinema-tech" {...reveal(0.64)}>
          <div className="cinema-section-label"><FiCode /> TECH STACK</div>
          <div className="cinema-tech-list">
            {technologies.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </motion.div>

        <motion.div className="cinema-connect" {...reveal(0.72)}>
          <div className="cinema-section-label"><FiHeart /> CONNECT</div>
          <div className="cinema-contact-list">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
              <FiGithub /> GitHub
            </a>
            <a href="tel:+93778558968"><FiPhone /> +937 78 558 968</a>
            <a href="mailto:sajadnooribayany@gmail.com"><FiMail /> sajadnooribayany@gmail.com</a>
          </div>
        </motion.div>
      </div>

      <motion.div className="cinema-portrait-stage" {...reveal(0.3)}>
        <div className="cinema-stage-label cinema-stage-label--top">
          <span>01 / THE DEVELOPER</span><span>BASED IN AFGHANISTAN</span>
        </div>
        <div className="cinema-portrait-halo" aria-hidden="true" />
        <div className="cinema-chrome cinema-chrome--back" aria-hidden="true" />
        <div className="cinema-chrome cinema-chrome--front" aria-hidden="true" />
        <div className="cinema-glass-orb cinema-glass-orb--one" aria-hidden="true" />
        <div className="cinema-glass-orb cinema-glass-orb--two" aria-hidden="true" />
        <div className="cinema-portrait-frame">
          <div className="cinema-portrait-image">
            <img
              src="/sajad-profile.jpg"
              alt="Portrait of Sajad Noori"
              fetchPriority="high"
            />
          </div>
          <div className="cinema-portrait-shine" aria-hidden="true" />
          <div className="cinema-frame-caption">
            <span>SAJAD NOORI</span>
            <span>DEVELOPER · CREATOR</span>
          </div>
        </div>
        <div className="cinema-floating-code" aria-hidden="true">
          <span className="code-dot" /><span className="code-dot" /><span className="code-dot" />
          <code><b>const</b> future = <em>"build"</em>;</code>
        </div>
        <div className="cinema-stage-label cinema-stage-label--bottom">
          <span>DESIGNING WHAT'S NEXT</span><span>EST. 2024</span>
        </div>
      </motion.div>
    </section>
  );
}
