import React from "react";
import {
  FiCode,
  FiLayers,
  FiZap,
  FiStar,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import HomeHero from "../components/home/HomeHero";
import "../styles/Home.css"; // Import the CSS file for this component

const Home = () => {
  const { theme } = useTheme();
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
        <div className="content-container">
          <HomeHero />

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
