import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdArrowOutward } from 'react-icons/md';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <span className="section-label">~/contact $</span>
        <h2 className="section-title">Get In Touch</h2>
        
        <p className="contact-body">
          I'm currently looking for software engineering internship opportunities. Whether you have a role that fits, a project idea, or just want to say hi — my inbox is always open.
        </p>

        <a href="mailto:workaholicaditya4518@gmail.com" className="email-button" data-cursor="hover">
          <span className="email-text">workaholicaditya4518@gmail.com</span>
          <MdArrowOutward className="email-icon" />
        </a>

        <div className="social-links">
          <a href="https://github.com/aditya-s45" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/aditya-shingare" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="mailto:workaholicaditya4518@gmail.com" className="social-icon" aria-label="Email">
            <MdEmail />
          </a>
        </div>

        <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-download-btn">
          <HiOutlineDocumentDownload className="btn-icon" />
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Contact;
