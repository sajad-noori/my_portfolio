import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FiStar,
  FiHeart,
  FiCoffee,
  FiTerminal,
  FiDatabase,
  FiGlobe,
  FiMonitor,
  FiSmartphone,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import "../styles/Home.css"; // Import the CSS file for this component

// Enhanced Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const typingVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const Home = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("show");
      // Start typing animation after a delay
      setTimeout(() => setIsTyping(true), 1000);
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleViewWorkClick = () => {
    navigate("/projects");
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  // Floating particles data
  const particles = [
    { icon: FiCode, delay: 0, x: 10, y: 20 },
    { icon: FiDatabase, delay: 0.5, x: 85, y: 15 },
    { icon: FiGlobe, delay: 1, x: 15, y: 80 },
    { icon: FiMonitor, delay: 1.5, x: 80, y: 75 },
    { icon: FiSmartphone, delay: 2, x: 50, y: 10 },
    { icon: FiTerminal, delay: 2.5, x: 20, y: 50 },
  ];

  // Experience data
  const experiences = [
    {
      id: 1,
      company: "Technical and Vocational Education and Training Authority",
      position: "Web Developer",
      duration: "2025 - Present",
      location: "On-site",
      description:
        "I work as a Web Developer at the Technical and Vocational Education and Training Authority (TVETA), where I design, develop, and maintain modern, responsive, and scalable web applications. I focus on creating high-quality user interfaces, integrating secure APIs, and implementing efficient backend logic to support the Quality Assurance Directorate's digital transformation.",
      type: "current",
      achievements: [
        "Developed and deployed a complete Quality Assurance web application",
        "Remote access to the services of Quality Assurance Directorate",
        "Collaborated closely with QA and directorate teams",
      ],
      color: "blue",
    },
    {
      id: 2,
      company: "Minstry of Transport & Aviation",
      position: "System Implementation Specialist",
      duration: "2024 - 2025",
      location: "Mazar-e-Sharif, Afghanistan",
      description:
        "As a System Implementation Officer at the Ministry of Transport & Civil Aviation, I was responsible for implementing and Transportation Management System across relevant departments. My role included coordinating with technical teams, preparing the environment for system rollout, training end-users, and ensuring the system was successfully adopted and used effectively. I worked to support daily system operations, troubleshoot user issues, and ensure smooth integration of the system into the ministry's workflow and procedures",
      type: "previous",
      achievements: [
        "Successfully transitioned the transportation management process from a paper-based system to a fully electronic system, improving efficiency and accuracy in terminal operations.",
        "Reduced manual paperwork and human error by introducing a digital workflow for data entry, verification, and record-keeping",
        "Improved operational speed and transparency by enabling faster access to information and real-time data tracking.",
      ],
      color: "purple",
    },
  ];

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
        {/* Enhanced Background Elements */}
        <div className="background-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        {/* Floating Particles */}
        <div className="particles-container">
          {particles.map((particle, index) => (
            <motion.div
              key={index}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: particle.delay }}
            >
              <particle.icon className="particle-icon" />
            </motion.div>
          ))}
        </div>

        {/* Mouse Cursor Trail */}
        <motion.div
          className="cursor-trail"
          animate={{
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />

        <div className="content-container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Enhanced Hero Content */}
            <motion.div variants={itemVariants} className="hero-content">
              <motion.div variants={itemVariants} className="badge-container">
                <motion.div
                  className="badge"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiStar className="badge-icon" />
                  <span className="badge-text">Full Stack Developer</span>
                  <div className="badge-glow"></div>
                </motion.div>
              </motion.div>

              <motion.h1 variants={itemVariants} className="main-heading">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Crafting Digital{" "}
                </motion.span>
                <motion.span
                  className="gradient-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Experiences
                </motion.span>
                <motion.div
                  className="heading-underline"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.h1>

              <motion.div variants={itemVariants} className="intro-container">
                <motion.p className="intro-text">
                  I'm <span className="highlight">Sajad Noori</span>, a
                  dedicated developer passionate about building modern,
                  efficient, and user-friendly web applications. I specialize in
                  React.js and Node.js, turning complex ideas into seamless and
                  interactive digital experiences.
                </motion.p>
                <motion.div
                  className="stats-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="stat-item">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="cta-buttons">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact" className="btn btn-primary">
                    <span className="btn-text">Get In Touch</span>
                    <span className="btn-icon">
                      <FiArrowRight className="icon" />
                    </span>
                    <span className="btn-hover-bg"></span>
                    <div className="btn-glow"></div>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={handleViewWorkClick}
                    className="btn btn-secondary"
                  >
                    <span>View My Work</span>
                    <svg
                      className="icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div className="btn-ripple"></div>
                  </button>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="tech-stack">
                <motion.div
                  className="section-header"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <FiCode className="section-icon" />
                  <p className="section-title">Tech Stack</p>
                </motion.div>
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
                  ].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="tech-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -2, 2, 0],
                        transition: { duration: 0.3 },
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="contact-links">
                <motion.div
                  className="section-header"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <FiHeart className="section-icon" />
                  <p className="section-title">Connect</p>
                </motion.div>
                <div className="contact-methods">
                  <motion.a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiGithub className="contact-icon" />
                    <span>GitHub</span>
                    <div className="contact-glow"></div>
                  </motion.a>
                  <motion.a
                    href="tel:+93778558968"
                    className="contact-item"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiPhone className="contact-icon" />
                    <span>+937 78 558 968</span>
                    <div className="contact-glow"></div>
                  </motion.a>
                  <motion.a
                    href="mailto:sajadnooribayany@gmail.com"
                    className="contact-item"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiMail className="contact-icon" />
                    <span>sajadnooribayany@gmail.com</span>
                    <div className="contact-glow"></div>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Code Window */}
            <motion.div variants={itemVariants} className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <span className="window-btn close"></span>
                  <span className="window-btn minimize"></span>
                  <span className="window-btn maximize"></span>
                </div>
                <div className="window-title">
                  <FiTerminal className="terminal-icon" />
                  portfolio.jsx
                </div>
                <div className="window-status">
                  <div className="status-dot"></div>
                  <span>Live</span>
                </div>
              </div>

              <div className="code-content">
                <motion.pre
                  className="code-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <code>
                    <motion.span
                      className="code-keyword"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      const
                    </motion.span>{" "}
                    <motion.span
                      className="code-variable"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      SajadNoori
                    </motion.span>{" "}
                    = {"{"}
                    <br />
                    <motion.span
                      className="code-property"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      role
                    </motion.span>
                    :{" "}
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7 }}
                    >
                      'Full Stack Developer'
                    </motion.span>
                    ,
                    <br />
                    <motion.span
                      className="code-property"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      technologies
                    </motion.span>
                    : [
                    <br />
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.9 }}
                    >
                      'React'
                    </motion.span>
                    ,{" "}
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.0 }}
                    >
                      'Node.js'
                    </motion.span>
                    ,{" "}
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.1 }}
                    >
                      'JavaScript'
                    </motion.span>
                    ,
                    <br />
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      'Mysql'
                    </motion.span>
                    ,{" "}
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.3 }}
                    >
                      'Tailwind CSS'
                    </motion.span>
                    ,{" "}
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4 }}
                    >
                      'Express.js'
                    </motion.span>
                    <br />
                    <motion.span
                      className="code-property"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                    >
                      ]
                    </motion.span>
                    ,<br />
                    <motion.span
                      className="code-property"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.6 }}
                    >
                      passion
                    </motion.span>
                    :{" "}
                    <motion.span
                      className="code-string"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.7 }}
                    >
                      'Creating exceptional digital experiences'
                    </motion.span>
                    <br />
                    {"}"};
                  </code>
                </motion.pre>
                <motion.div
                  className="code-status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 }}
                >
                  <FiCode className="code-icon" />
                  <div className="code-progress">
                    <motion.div
                      className="progress-bar"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 3, duration: 2 }}
                    />
                  </div>
                  <span className="progress-text">
                    Building amazing things...
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="features-grid"
          >
            {[
              {
                icon: <FiCode className="feature-icon" />,
                title: "Clean Code",
                description:
                  "Writing maintainable and scalable code following best practices and design patterns.",
                color: "blue",
                delay: 0.1,
              },
              {
                icon: <FiLayers className="feature-icon" />,
                title: "Modern Stack",
                description:
                  "Leveraging the latest technologies to build fast, responsive, and scalable applications.",
                color: "purple",
                delay: 0.2,
              },
              {
                icon: <FiZap className="feature-icon" />,
                title: "Performance",
                description:
                  "Optimized solutions that load quickly and run smoothly across all devices.",
                color: "red",
                delay: 0.3,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`feature-card feature-${feature.color}`}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: feature.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="feature-icon-wrapper"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                  <div className="feature-icon-glow"></div>
                </motion.div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <motion.div
                  className="feature-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay + 0.3, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="experience-section"
          >
            <motion.div
              className="section-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <FiBriefcase className="section-icon" />
              <h2 className="section-title">Professional Experience</h2>
              <motion.div
                className="section-underline"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>

            <div className="experience-timeline">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  className={`experience-card experience-${experience.color}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="experience-header">
                    <div className="experience-icon-wrapper">
                      <FiBriefcase className="experience-icon" />
                      <div className="experience-icon-glow"></div>
                    </div>
                    <div className="experience-info">
                      <h3 className="experience-position">
                        {experience.position}
                      </h3>
                      <h4 className="experience-company">
                        {experience.company}
                      </h4>
                      <div className="experience-meta">
                        <div className="experience-duration">
                          <FiCalendar className="meta-icon" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="experience-location">
                          <FiMapPin className="meta-icon" />
                          <span>{experience.location}</span>
                        </div>
                        {experience.type === "current" && (
                          <div className="current-badge">
                            <FiTrendingUp className="meta-icon" />
                            <span>Current</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="experience-description">
                    {experience.description}
                  </p>

                  <div className="experience-achievements">
                    <h5 className="achievements-title">
                      <FiAward className="achievement-icon" />
                      Key Achievements
                    </h5>
                    <ul className="achievements-list">
                      {experience.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          className="achievement-item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.2 + index * 0.2 + idx * 0.1 }}
                        >
                          <FiStar className="achievement-bullet" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    className="experience-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.6 + index * 0.2, duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
