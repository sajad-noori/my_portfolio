import React from "react";
import {
  FaCode,
  FaServer,
  FaMobileAlt,
  FaLaptopCode,
  FaDatabase,
  FaTools,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import "../styles/About.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Enhanced skills container animation with theme awareness
const skillsContainerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  const { theme } = useTheme();
  const skills = [
    {
      name: "Frontend Development",
      icon: <FaLaptopCode />,
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      name: "Backend Development",
      icon: <FaServer />,
      items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    },
    {
      name: "Database",
      icon: <FaDatabase />,
      items: ["MySQL", "MongoDB"],
    },
    {
      name: "Tools & Version Control",
      icon: <FaTools />,
      items: ["Git", "GitHub", "Vite", "Webpack"],
    },
  ];

  const experiences = [
    {
      role: "Full Stack Developer (Personal Projects)",
      company: "Self-driven & Freelance",
      period: "2023 - Present",
      description:
        "Building full-stack applications using React, Next.js, Node.js, and MySQL. Developed a news management system with image uploads, authentication with JWT, and video player features (likes, comments, views).",
    },
    {
      role: "Frontend Developer (Learning & Building)",
      company: "Portfolio & Practice Projects",
      period: "2022 - 2023",
      description:
        "Created responsive and modern web applications with React and Material UI. Learned authentication systems, CRUD operations, and API integration while working on real-world inspired projects.",
    },
    {
      role: "Networking Enthusiast",
      company: "Self-learning (CCNA)",
      period: "Ongoing",
      description:
        "Studying networking fundamentals (CCNA) to strengthen my understanding of infrastructure and backend communication systems.",
    },
  ];

  const services = [
    {
      title: "Web Development",
      icon: <FaCode />,
      description:
        "Creating responsive, modern, and user-friendly web applications using React.js, Next.js, and TypeScript.",
    },
    {
      title: "Backend Development",
      icon: <FaServer />,
      description:
        "Designing and implementing secure, scalable APIs with Node.js, Express, and MySQL or MongoDB.",
    },
    {
      title: "UI/UX & Responsive Design",
      icon: <FaMobileAlt />,
      description:
        "Building clean and interactive user interfaces with a mobile-first approach using Tailwind CSS and Bootstrap.",
    },
  ];

  return (
    <motion.section
      className={`about-section ${
        theme === "dark" ? "theme-dark" : "theme-light"
      }`}
      data-theme={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Blobs */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <div className="container">
        {/* About Me */}
        <motion.div
          className="about-me"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">
            I'm Sajad Noori, a dedicated Full Stack Developer passionate about
            building modern, efficient, and user-friendly web applications. I
            specialize in React.js, Next.js, Node.js, and MySQL, turning ideas
            into seamless and scalable digital experiences.
          </p>

          <div className="about-content">
            <div className="about-text">
              <h3>Who I Am</h3>
              <p>
                I'm a self-motivated developer who enjoys turning complex
                challenges into simple, beautiful, and effective solutions. With
                strong skills in both frontend and backend development, I focus
                on writing clean, efficient, and maintainable code.
              </p>
              <p>
                My journey started with curiosity about technology, which grew
                into a deep passion for creating web solutions. Over time, I’ve
                built full-stack projects, experimented with authentication,
                file uploads, and user dashboards, while always striving to
                learn more and improve my craft.
              </p>
              <p>
                Outside of coding, I enjoy learning networking concepts (CCNA)
                and exploring new tools that expand my knowledge as a developer.
              </p>
            </div>
            <div className="about-image">
              <motion.div
                className="profile-image-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Sajad Noori"
                  className="profile-image"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          className={`skills-container ${
            theme === "dark" ? "skills-dark" : "skills-light"
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={skillsContainerVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Skills
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            These are the tools and technologies I use to bring ideas to life:
          </motion.p>

          <motion.div
            className="skills-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {skills.map((category, index) => (
              <motion.div
                key={index}
                className="skill-category"
                variants={fadeInUp}
              >
                <h4>
                  {category.icon} {category.name}
                </h4>
                <div className="skill-list">
                  {category.items.map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience */}
        <motion.div
          className="experience-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            My journey as a developer and what I’ve worked on so far.
          </p>

          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                variants={fadeInUp}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>{exp.role}</h4>
                  <span className="timeline-company">{exp.company}</span>
                  <span className="timeline-period">{exp.period}</span>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          className="services-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">
            Here are the services I can provide.
          </p>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
