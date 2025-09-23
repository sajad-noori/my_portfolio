import React, { useState, useEffect } from "react";
import {
  FiGithub,
  FiExternalLink,
  FiCode,
  FiLayers,
  FiDatabase,
  FiGlobe,
  FiMessageSquare,
} from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import "../styles/Projects.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = useCallback((e) => {
    e.preventDefault();
    // Navigate to the contact page
    navigate('/contact');
    
    // Scroll to top of the contact page after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [navigate]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Department of Quality Assurance",
      description:
        "A website designed for the Department of Quality Assurance of TVETA",
      tags: ["React", "Node.js", "MySQL"],
      image: "/department of quality assurance.png",
      github: "https://github.com/sajad-noori/department-of-quality-assurance",
      category: "Full Stack",
      icon: <FiGlobe className="w-6 h-6 text-blue-500" />,
    },
    {
      id: 2,
      title: "BLog",
      description: "A blog website",
      tags: ["Next.js", "MySQL"],
      image: "/blog.png",
      github: "https://github.com/sajad-noori/blog",
      category: "Full Stack",
      icon: <FiGlobe className="w-6 h-6 text-blue-500" />,
    },
  ];

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      className={`projects-container ${
        theme === "dark" ? "theme-dark" : "theme-light"
      }`}
      data-theme={theme}
    >
      <div className="background-pattern"></div>

      <div className="content-wrapper">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <h1>
            Featured <span>Projects</span>
          </h1>
          <p>
            Here's a collection of my recent work. Each project represents a
            unique challenge and solution I've crafted with care.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="filter-buttons"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(category)}
              className={`filter-button ${
                activeFilter === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={container}
            initial="hidden"
            animate={isMounted ? "show" : "hidden"}
            className="projects-grid"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className={`project-card ${
                  theme === "dark" ? "project-card-dark" : "project-card-light"
                }`}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label="View on GitHub"
                    >
                      <FiGithub /> Code
                    </a>
                  </div>
                  <span className="project-category">{project.category}</span>
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <div className="project-icon">{project.icon}</div>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiGithub /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`cta-section ${
            theme === "dark" ? "cta-dark" : "cta-light"
          }`}
        >
          <h3>Have a project in mind?</h3>
          <p>
            I'm always open to discussing product design work or partnership
            opportunities.
          </p>
          <div className="cta-buttons">
            <a
              href="https://github.com/sajad-noori"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              <FiGithub className="icon" /> View on GitHub
            </a>
            <motion.button 
              className="secondary-button cursor-pointer"
              onClick={handleContactClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{
                scale: isHovered ? 1.05 : 1,
                transition: { duration: 0.2 }
              }}
            >
              <motion.span 
                animate={{
                  x: isHovered ? [0, 5, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isHovered ? Infinity : 0,
                  repeatType: 'reverse'
                }}
              >
                <FiMessageSquare className="icon" />
              </motion.span>
              <span>Contact Me</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
