import React, { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiCode, FiLayers, FiDatabase, FiGlobe, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with product listings, cart, and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      github: '#',
      live: '#',
      category: 'Full Stack',
      icon: <FiGlobe className="w-6 h-6 text-blue-500" />
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      tags: ['React', 'Firebase', 'Material-UI', 'Redux'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      github: '#',
      live: '#',
      category: 'Frontend',
      icon: <FiLayers className="w-6 h-6 text-green-500" />
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with React and Tailwind CSS.',
      tags: ['React', 'Tailwind CSS', 'Framer Motion'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      github: '#',
      live: '#',
      category: 'Frontend',
      icon: <FiCode className="w-6 h-6 text-purple-500" />
    },
    {
      id: 4,
      title: 'RESTful API Service',
      description: 'A scalable REST API with authentication and role-based access control.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      github: '#',
      live: '#',
      category: 'Backend',
      icon: <FiDatabase className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'A weather application showing current and forecasted weather data.',
      tags: ['React', 'OpenWeather API', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1601134467661-3d775b99c7b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1540&q=80',
      github: '#',
      live: '#',
      category: 'Frontend',
      icon: <FiGlobe className="w-6 h-6 text-blue-400" />
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'Real-time chat application with private messaging and group chats.',
      tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      github: '#',
      live: '#',
      category: 'Full Stack',
      icon: <FiMessageSquare className="w-6 h-6 text-indigo-500" />
    },
  ];

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="projects-container">
      <div className="background-pattern"></div>

      <div className="content-wrapper">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <h1>Featured <span>Projects</span></h1>
          <p>Here's a collection of my recent work. Each project represents a unique challenge and solution I've crafted with care.</p>
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
              className={`filter-button ${activeFilter === category ? 'active' : ''}`}
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
                className="project-card"
              >
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                  />
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
                    <div className="project-icon">
                      {project.icon}
                    </div>
                    <h3 className="project-title">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="project-description">
                    {project.description}
                  </p>
                  
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
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link live-demo"
                    >
                      <FiExternalLink /> Live Demo
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
          className="cta-section"
        >
          <h3>Have a project in mind?</h3>
          <p>
            I'm always open to discussing product design work or partnership opportunities.
          </p>
          <div className="cta-buttons">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="primary-button"
            >
              <FiGithub className="icon" /> View on GitHub
            </a>
            <a 
              href="#contact" 
              className="secondary-button"
            >
              <FiMessageSquare className="icon" /> Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
