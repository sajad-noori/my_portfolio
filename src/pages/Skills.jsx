import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiDatabase, FiCpu, FiTool, FiLayers } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiRedux, SiGraphql, SiMongodb, SiPostgresql, SiRedis, SiFirebase, SiDjango, SiFlask, SiJest, SiCypress, SiWebpack, SiBabel } from 'react-icons/si';
import '../styles/Skills.css';

const Skills = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: <FiCode />,
      items: [
        { name: 'React', icon: <FaReact />, level: 90 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 90 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
        { name: 'HTML5', icon: <SiHtml5 />, level: 85 },
        { name: 'CSS3', icon: <SiCss3 />, level: 85 },
        { name: 'Redux', icon: <SiRedux />, level: 85 },
      ]
    },
    {
      category: 'Backend',
      icon: <FiServer />,
      items: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
        { name: 'Express', icon: <FiServer />, level: 85 },
        { name: 'Python', icon: <FaPython />, level: 80 },
        { name: 'Django', icon: <SiDjango />, level: 75 },
        { name: 'Flask', icon: <SiFlask />, level: 70 },
        { name: 'GraphQL', icon: <SiGraphql />, level: 80 },
      ]
    },
    {
      category: 'Database',
      icon: <FiDatabase />,
      items: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 85 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 80 },
        { name: 'Redis', icon: <SiRedis />, level: 75 },
        { name: 'Firebase', icon: <SiFirebase />, level: 80 },
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: <FiCpu />,
      items: [
        { name: 'Docker', icon: <FaDocker />, level: 80 },
        { name: 'AWS', icon: <FaAws />, level: 75 },
        { name: 'Git', icon: <FaGitAlt />, level: 85 },
        { name: 'Jest', icon: <SiJest />, level: 80 },
        { name: 'Cypress', icon: <SiCypress />, level: 75 },
        { name: 'Webpack', icon: <SiWebpack />, level: 70 },
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <div className="skills-container">
      <div className="background-pattern"></div>
      
      <div className="skills-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="skills-header"
        >
          <h1>My <span>Skills</span></h1>
          <p>Here's a comprehensive overview of my technical expertise and the tools I work with on a daily basis.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="skills-grid"
        >
          {skills.map((category, index) => (
            <motion.div 
              key={category.category}
              variants={item}
              className="skill-category"
            >
              <h2>
                {React.cloneElement(category.icon, { className: 'category-icon' })}
                {category.category}
              </h2>
              <ul className="skills-list">
                {category.items.map((skill, skillIndex) => (
                  <motion.li 
                    key={skill.name}
                    className="skill-item"
                    data-level={skill.level}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-level"></div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="additional-info"
        >
          <h2>Additional Expertise</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <FiLayers />
              </div>
              <div className="info-content">
                <h3>Responsive Design</h3>
                <p>Creating layouts that work seamlessly across all devices and screen sizes.</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiTool />
              </div>
              <div className="info-content">
                <h3>Performance Optimization</h3>
                <p>Improving load times and overall application performance.</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiCpu />
              </div>
              <div className="info-content">
                <h3>API Development</h3>
                <p>Building robust and scalable RESTful and GraphQL APIs.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
