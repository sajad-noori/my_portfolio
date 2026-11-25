import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiCode, FiGithub, FiLayers } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import "../styles/ExperimentalHome.css";

const featuredProjects = [
  {
    number: "01",
    title: "Quality Assurance Portal",
    type: "Digital transformation",
    description: "A full-stack platform that brings quality assurance workflows, resources, and institutional services into one accessible digital space.",
    image: "/department of quality assurance.png",
    stack: ["React", "Node.js", "MySQL"],
    github: "https://github.com/sajad-noori/department-of-quality-assurance",
    live: "https://qa.tveta.edu.af",
  },
  {
    number: "02",
    title: "Personal Blog",
    type: "Content platform",
    description: "A focused publishing experience built around readable content and a straightforward content workflow.",
    image: "/blog.png",
    stack: ["Next.js", "MySQL"],
    github: "https://github.com/sajad-noori/blog",
  },
  {
    number: "03",
    title: "Don't Forget",
    type: "Mobile application",
    description: "A reminder app concept for remembering the right thing at the right time, place, and situation.",
    image: "/dontforget.png",
    stack: ["React Native", "Expo"],
    github: "https://github.com/sajad-noori/dont_forget",
  },
];

const Home = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featuredProjects[activeIndex];

  return (
    <div className={"experiment-home " + (theme === "dark" ? "theme-dark" : "theme-light")} data-theme={theme}>
      <div className="experiment-home__grid" aria-hidden="true" />
      <div className="experiment-home__orb experiment-home__orb--one" aria-hidden="true" />
      <div className="experiment-home__orb experiment-home__orb--two" aria-hidden="true" />

      <div className="experiment-home__inner">
        <section className="experiment-hero">
          <motion.div
            className="experiment-hero__copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="experiment-kicker">
              <span className="experiment-kicker__line" />
              <span>Frontend / Full-stack developer</span>
              <span className="experiment-kicker__index">PORTFOLIO — 2026</span>
            </div>

            <h1 className="experiment-hero__title">
              I build
              <span className="experiment-title-outline"> digital</span>
              <span className="experiment-title-accent"> experiences.</span>
            </h1>

            <p className="experiment-hero__lead">
              I'm <strong>Sajad Noori</strong> — a developer focused on turning complex ideas into useful, thoughtful web products. I work across the interface and the systems behind it.
            </p>

            <div className="experiment-hero__actions">
              <Link to="/projects" className="experiment-button experiment-button--solid">
                Explore my work <FiArrowUpRight />
              </Link>
              <Link to="/contact" className="experiment-button experiment-button--text">
                Let's talk <FiArrowRight />
              </Link>
            </div>

            <div className="experiment-hero__footnote">
              <span className="experiment-availability"><i /> Open to meaningful opportunities</span>
              <span className="experiment-hero__location">Building from ideas to interfaces</span>
            </div>
          </motion.div>

          <motion.div
            className="experiment-stage"
            initial={{ opacity: 0, y: 36, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="experiment-stage__topline">
              <span><i /> SELECTED WORK</span>
              <span>0{activeIndex + 1} / 03</span>
            </div>

            <div className="experiment-stage__window">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.number}
                  className="experiment-stage__image-wrap"
                  initial={{ opacity: 0, scale: 1.045, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -8 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                >
                  <img src={activeProject.image} alt={activeProject.title + " project preview"} />
                </motion.div>
              </AnimatePresence>
              <div className="experiment-stage__scanline" aria-hidden="true" />
              <div className="experiment-stage__floating-label">
                <FiLayers />
                <span>Selected project</span>
              </div>
              <div className="experiment-stage__corner-mark">SN<span>®</span></div>
            </div>

            <div className="experiment-stage__details">
              <div>
                <span className="experiment-stage__eyebrow">{activeProject.type}</span>
                <h2>{activeProject.title}</h2>
              </div>
              <a href={activeProject.github} target="_blank" rel="noreferrer" aria-label={"Open " + activeProject.title + " on GitHub"}>
                <FiArrowUpRight />
              </a>
            </div>

            <div className="experiment-stage__selector" aria-label="Choose featured project">
              {featuredProjects.map((project, index) => (
                <button
                  type="button"
                  key={project.number}
                  className={activeIndex === index ? "is-active" : ""}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                >
                  <span>{project.number}</span>
                  <span>{project.title}</span>
                  <i />
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="experiment-marquee" aria-label="Core technologies">
          <div className="experiment-marquee__label"><FiCode /> TOOLKIT</div>
          <div className="experiment-marquee__items">
            <span>React</span><b>✳</b><span>JavaScript</span><b>✳</b><span>Node.js</span><b>✳</b><span>MySQL</span><b>✳</b><span>TypeScript</span><b>✳</b><span>Express</span>
          </div>
        </div>

        <section className="experiment-bottom">
          <div>
            <span className="experiment-section-index">01 / APPROACH</span>
            <p>Good work is more than code. It's clarity, craft, and the small details that make a product feel effortless.</p>
          </div>
          <Link to="/about" className="experiment-bottom__link">A little more about me <FiArrowUpRight /></Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
