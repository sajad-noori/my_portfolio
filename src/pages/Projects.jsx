import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiGlobe, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import "../styles/Projects.css";

const projects = [
  {
    id: "01",
    title: "Quality Assurance Portal",
    subtitle: "A digital workspace for institutional quality assurance.",
    description: "A full-stack platform built for the Quality Assurance Directorate at TVETA. It brings resources, institutional workflows, and digital services into one place, helping teams move away from fragmented, paper-heavy processes.",
    image: "/department of quality assurance.png",
    tags: ["React", "Node.js", "MySQL"],
    category: "Full-stack platform",
    github: "https://github.com/sajad-noori/department-of-quality-assurance",
    live: "https://qa.tveta.edu.af",
    accent: "#a9d94e",
  },
  {
    id: "02",
    title: "Personal Blog",
    subtitle: "A clean space for publishing ideas.",
    description: "A content-focused web application with a simple reading experience and a database-backed publishing workflow.",
    image: "/blog.png",
    tags: ["Next.js", "MySQL"],
    category: "Content platform",
    github: "https://github.com/sajad-noori/blog",
    accent: "#a8b8e8",
  },
  {
    id: "03",
    title: "Don't Forget",
    subtitle: "Reminders connected to time and place.",
    description: "A mobile application concept designed to help people remember tasks in the context that matters: at a specific time, place, or situation.",
    image: "/dontforget.png",
    tags: ["React Native", "Expo"],
    category: "Mobile application",
    github: "https://github.com/sajad-noori/dont_forget",
    accent: "#e6b47c",
  },
];

const TiltPreview = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 22 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div className="project-focus__visual" onMouseMove={handleMove} onMouseLeave={reset} style={{ rotateX, rotateY, transformPerspective: 1200 }}>
      <div className="project-focus__image">
        <img src={project.image} alt={project.title + " interface preview"} />
        <div className="project-focus__image-shade" />
        <span className="project-focus__visual-index">PROJECT / {project.id}</span>
        <span className="project-focus__visual-stamp"><FiLayers /> INTERACTIVE PREVIEW</span>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find((project) => project.id === activeId) || projects[0];

  return (
    <main className={"project-experience " + (theme === "dark" ? "theme-dark" : "theme-light")} data-theme={theme}>
      <div className="project-experience__noise" aria-hidden="true" />
      <div className="project-experience__inner">
        <motion.header className="project-experience__header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="project-experience__eyebrow"><span /> THE WORK INDEX <span className="project-experience__year">SELECTED PROJECTS / 2026</span></div>
          <h1>Ideas made <em>real.</em></h1>
          <p>A selection of products and experiments I've worked on — each shaped by a different problem, constraint, and opportunity.</p>
        </motion.header>

        <section className="project-experience__layout">
          <div className="project-index" aria-label="Select a project">
            <div className="project-index__heading"><span>INDEX</span><span>0{projects.length} ENTRIES</span></div>
            {projects.map((project) => (
              <button type="button" key={project.id} className={"project-index__item " + (activeId === project.id ? "is-active" : "")} onClick={() => setActiveId(project.id)} aria-pressed={activeId === project.id}>
                <span className="project-index__number">{project.id}</span>
                <span className="project-index__text"><strong>{project.title}</strong><small>{project.category}</small></span>
                <FiArrowUpRight className="project-index__arrow" />
                <i className="project-index__indicator" />
              </button>
            ))}
            <div className="project-index__note"><FiGlobe /> Built for people, not just pixels.</div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article key={activeProject.id} className="project-focus" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .35, ease: "easeOut" }}>
              <TiltPreview project={activeProject} />
              <div className="project-focus__body">
                <div className="project-focus__meta"><span>{activeProject.category}</span><span>NO. {activeProject.id}</span></div>
                <h2>{activeProject.title}</h2>
                <h3>{activeProject.subtitle}</h3>
                <p>{activeProject.description}</p>
                <div className="project-focus__tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-focus__actions">
                  <a href={activeProject.github} target="_blank" rel="noreferrer" className="project-action project-action--primary"><FiGithub /> View source <FiArrowUpRight /></a>
                  {activeProject.live && <a href={activeProject.live} target="_blank" rel="noreferrer" className="project-action"><FiGlobe /> Visit live site <FiArrowUpRight /></a>}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </section>

        <footer className="project-experience__footer">
          <span>MORE THAN A SCREEN — A SOLUTION.</span>
          <Link to="/contact">Have something in mind? <FiArrowUpRight /></Link>
        </footer>
      </div>
    </main>
  );
};

export default Projects;
