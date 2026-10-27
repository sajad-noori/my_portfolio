import React from "react";
import {
  FaCode,
  FaServer,
  FaMobileAlt,
  FaLaptopCode,
  FaDatabase,
  FaTools,
  FaArrowRight,
  FaRegLightbulb,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import "../styles/About.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const About = () => {
  const { theme } = useTheme();

  const skills = [
    {
      name: "Frontend Development",
      icon: <FaLaptopCode />,
      items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    },
    {
      name: "Backend Development",
      icon: <FaServer />,
      items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    },
    {
      name: "Databases",
      icon: <FaDatabase />,
      items: ["MySQL", "MongoDB"],
    },
    {
      name: "Tools & Workflow",
      icon: <FaTools />,
      items: ["Git", "GitHub", "Vite", "Webpack", "API Integration"],
    },
  ];

  const experiences = [
    {
      role: "Full Stack Developer — Personal Projects",
      company: "Independent Projects",
      period: "2023 – Present",
      description:
        "Building full-stack applications with React, Next.js, Node.js, and MySQL. Project work includes content management, image uploads, JWT authentication, and interactive user features.",
    },
    {
      role: "Frontend Developer — Learning & Building",
      company: "Portfolio & Practice Projects",
      period: "2022 – 2023",
      description:
        "Created responsive web interfaces with React and Material UI, practicing CRUD workflows, authentication, reusable components, and API integration.",
    },
    {
      role: "Networking Fundamentals",
      company: "Independent Learning",
      period: "Ongoing",
      description:
        "Studying networking fundamentals and CCNA topics to strengthen my understanding of networks and how web applications communicate.",
    },
  ];

  const services = [
    {
      title: "Frontend Development",
      icon: <FaCode />,
      description:
        "Responsive, accessible interfaces built with React, Next.js, and modern JavaScript.",
    },
    {
      title: "Backend & APIs",
      icon: <FaServer />,
      description:
        "Practical REST APIs and server-side features using Node.js, Express, and databases.",
    },
    {
      title: "Responsive UI",
      icon: <FaMobileAlt />,
      description:
        "Clean layouts that adapt smoothly to mobile, tablet, and desktop screens.",
    },
  ];

  return (
    <motion.section
      className={`about-section ${theme === "dark" ? "theme-dark" : "theme-light"}`}
      data-theme={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about-background" aria-hidden="true">
        <span className="about-orb about-orb-one" />
        <span className="about-orb about-orb-two" />
        <span className="about-grid-pattern" />
      </div>

      <div className="about-container">
        {/* Intro / profile hero */}
        <motion.header
          className="about-hero"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="about-hero-copy" variants={fadeInUp}>
            <span className="about-eyebrow">
              <span className="eyebrow-dot" />
              A little about me
            </span>
            <h1>
              Building useful digital
              <span className="gradient-text"> experiences.</span>
            </h1>
            <p className="about-lead">
              I’m <strong>Sajad Noori</strong>, a web developer focused on
              creating modern, responsive, and user-friendly applications. I
              enjoy turning ideas into reliable products through thoughtful UI,
              clean code, and practical problem-solving.
            </p>

            <div className="about-hero-actions">
              <a className="about-primary-link" href="/projects">
                Explore my work <FaArrowRight aria-hidden="true" />
              </a>
              <a className="about-secondary-link" href="/contact">
                Let’s connect
              </a>
            </div>

            <div className="about-quick-facts">
              <div className="quick-fact">
                <span className="quick-fact-icon"><FaCode /></span>
                <span><strong>Web development</strong><small>Frontend + backend</small></span>
              </div>
              <div className="quick-fact">
                <span className="quick-fact-icon"><FaRegLightbulb /></span>
                <span><strong>Always learning</strong><small>Curious by nature</small></span>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-hero-visual" variants={fadeInUp}>
            <div className="profile-photo-frame">
              <div className="profile-photo-accent" />
              <img
                src="/sajad-profile.jpg"
                alt="Sajad Noori outdoors"
                className="profile-image"
                fetchPriority="high"
              />
              <div className="profile-photo-caption">
                <span className="caption-status" />
                <span><strong>Sajad Noori</strong><small>Web Developer</small></span>
              </div>
            </div>
            <div className="floating-code-card" aria-hidden="true">
              <span className="code-card-dots"><i /><i /><i /></span>
              <code><span>const</span> developer = {"{"}<br />&nbsp; passion: <b>"building"</b>,<br />&nbsp; mindset: <b>"growth"</b><br />{"}"};</code>
            </div>
            <div className="floating-tech-chip">React · Node.js · MySQL</div>
          </motion.div>
        </motion.header>

        {/* Story */}
        <motion.section
          className="about-story section-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="section-heading">
            <span className="section-kicker">MY STORY</span>
            <h2>Curiosity turned into <span className="gradient-text">craft.</span></h2>
            <p>How I approach development, learning, and solving problems.</p>
          </div>
          <div className="story-card">
            <div className="story-icon"><FaGraduationCap /></div>
            <div className="story-copy">
              <h3>Who I am</h3>
              <p>
                I’m a self-motivated developer who likes breaking complex
                challenges into clear, manageable solutions. My work spans
                frontend interfaces and backend functionality, with an emphasis
                on maintainable code and a smooth user experience.
              </p>
              <p>
                Through personal and practical projects, I’ve explored
                authentication, file uploads, dashboards, database operations,
                and API integration. I keep improving by building, testing,
                learning from mistakes, and exploring tools that make my work
                better.
              </p>
              <p>
                I’m also learning networking fundamentals, including CCNA
                topics, to broaden my understanding of the systems behind web
                applications.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="skills-container section-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          <div className="section-heading">
            <span className="section-kicker">MY TOOLKIT</span>
            <h2>Skills & <span className="gradient-text">technologies</span></h2>
            <p>The tools I use to design, build, and improve web applications.</p>
          </div>
          <div className="skills-grid">
            {skills.map((category) => (
              <motion.article
                key={category.name}
                className="skill-category"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="skill-card-heading">
                  <span className="skill-category-icon">{category.icon}</span>
                  <h3>{category.name}</h3>
                </div>
                <div className="skill-list">
                  {category.items.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          className="experience-container section-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
        >
          <div className="section-heading">
            <span className="section-kicker">THE JOURNEY</span>
            <h2>Learning by <span className="gradient-text">building.</span></h2>
            <p>A snapshot of my development journey and ongoing learning.</p>
          </div>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.role}
                className="timeline-item"
                variants={fadeInUp}
              >
                <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="timeline-content">
                  <div className="timeline-topline">
                    <span className="timeline-company">{exp.company}</span>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <h3>{exp.role}</h3>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          className="services-container section-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          <div className="section-heading">
            <span className="section-kicker">WHAT I CAN DO</span>
            <h2>Turning ideas into <span className="gradient-text">products.</span></h2>
            <p>Practical development support from interface to API.</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <motion.article
                key={service.title}
                className="service-card"
                variants={fadeInUp}
                whileHover={{ y: -6 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.footer
          className="about-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div>
            <span className="section-kicker">HAVE A PROJECT IN MIND?</span>
            <h2>Let’s build something <span className="gradient-text">meaningful.</span></h2>
            <p>I’m always open to discussing web projects, collaboration, and new ideas.</p>
          </div>
          <a className="about-primary-link" href="/contact">
            Contact me <FaArrowRight aria-hidden="true" />
          </a>
        </motion.footer>
      </div>
    </motion.section>
  );
};

export default About;
