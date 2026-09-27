import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          <span className="terminal-prompt">$ echo</span> "Designed & Built by aditya-s45 · © 2026"
        </p>
      </div>
    </footer>
  );
};

export default Footer;
