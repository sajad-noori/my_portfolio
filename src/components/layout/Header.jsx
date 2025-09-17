import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiGithub, FiMenu, FiX } from 'react-icons/fi';
import '../../styles/Header.css';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav-brand">
          <NavLink to="/" className="logo">
            <span className="logo-text">Sajad Noori</span>
          </NavLink>
        </div>
        
        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink></li>
          <li><NavLink to="/skills" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Skills</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink></li>
        </ul>
        
        <div className="github-container">
          <a 
            href="https://github.com/sajad-noori" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-link"
            aria-label="GitHub Profile"
          >
            <FiGithub className="github-icon" />
            <span className="github-text">GitHub</span>
          </a>
        </div>

        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-links">
            <li>
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/skills" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          
          <div className="mobile-social">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-github"
              aria-label="GitHub Profile"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiGithub className="github-icon" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;