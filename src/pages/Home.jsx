import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowRight,
  FiCode,
  FiLayers,
  FiZap,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import "../styles/Home.css"; // Import the CSS file for this component

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [controls, isInView]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`home-container ${
          theme === "dark" ? "theme-dark" : "theme-light"
        }`}
        data-theme={theme}
      >
        {/* Animated Background Elements */}
        <div className="background-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>

        <div className="content-container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Hero Content */}
            <motion.div variants={itemVariants} className="hero-content">
              <motion.div variants={itemVariants} className="badge">
                <span className="badge-text">Full Stack Developer</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="main-heading">
                Crafting Digital{" "}
                <span className="gradient-text">Experiences</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="intro-text">
                I'm <span className="highlight">Sajad Noori</span>, a dedicated
                developer passionate about building modern, efficient, and
                user-friendly web applications. I specialize in React.js and
                Node.js, turning complex ideas into seamless and interactive
                digital experiences.{" "}
              </motion.p>

              <motion.div variants={itemVariants} className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">
                  <span className="btn-text">Get In Touch</span>
                  <span className="btn-icon">
                    <FiArrowRight className="icon" />
                  </span>
                  <span className="btn-hover-bg"></span>
                </Link>

                <a href="#projects" className="btn btn-secondary">
                  <span>View My Work</span>
                  <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="tech-stack">
                <p className="section-title">Tech Stack</p>
                <div className="tech-tags">
                  {[
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
                  ].map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="contact-links">
                <p className="section-title">Connect</p>
                <div className="contact-methods">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                  >
                    <FiGithub className="contact-icon" />
                    <span>GitHub</span>
                  </a>
                  <a href="tel:+93778558968" className="contact-item">
                    <FiPhone className="contact-icon" />
                    <span>+937 78 558 968</span>
                  </a>
                  <a
                    href="mailto:sajadnooribayany@gmail.com"
                    className="contact-item"
                  >
                    <FiMail className="contact-icon" />
                    <span>sajadnooribayany@gmail.com</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Code Window */}
            <motion.div variants={itemVariants} className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <span className="window-btn close"></span>
                  <span className="window-btn minimize"></span>
                  <span className="window-btn maximize"></span>
                </div>
                <div className="window-title">portfolio.jsx</div>
              </div>

              <div className="code-content">
                <pre className="code-block">
                  <code>
                    <span className="code-keyword">const</span>{" "}
                    <span className="code-variable">SajadNoori</span> = {"{"}
                    <br />
                    <span className="code-property"> role</span>:{" "}
                    <span className="code-string">'Full Stack Developer'</span>,
                    <br />
                    <span className="code-property"> technologies</span>: [
                    <br />
                    <span className="code-string"> 'React'</span>,{" "}
                    <span className="code-string">'Node.js'</span>,{" "}
                    <span className="code-string">'JavaScript'</span>,
                    <br />
                    <span className="code-string"> 'Mysql'</span>,{" "}
                    <span className="code-string">'Tailwind CSS'</span>,{" "}
                    <span className="code-string">'Express.js'</span>
                    <br />
                    <span className="code-property"> ]</span>,<br />
                    <span className="code-property"> passion</span>:{" "}
                    <span className="code-string">
                      'Creating exceptional digital experiences'
                    </span>
                    <br />
                    {"}"};
                  </code>
                </pre>
                <div className="code-status">
                  <FiCode className="code-icon" />
                  <div className="code-progress"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="features-grid"
          >
            {[
              {
                icon: <FiCode className="feature-icon" />,
                title: "Clean Code",
                description:
                  "Writing maintainable and scalable code following best practices and design patterns.",
              },
              {
                icon: <FiLayers className="feature-icon" />,
                title: "Modern Stack",
                description:
                  "Leveraging the latest technologies to build fast, responsive, and scalable applications.",
              },
              {
                icon: <FiZap className="feature-icon" />,
                title: "Performance",
                description:
                  "Optimized solutions that load quickly and run smoothly across all devices.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
