import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiCodeforces, SiLeetcode, SiCodechef } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const TypewriterText: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = [
    "Building scalable enterprise systems.",
    "Engineering real-time web platforms.",
    "Developing AI & Web3 applications.",
    "Turning caffeine into clean code."
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000); // pause at end
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // pause before start
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <span className="typewriter">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" ref={heroRef} id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="status-badge">
            <span className="pulse-dot"></span>
            Available for Internships
          </div>
          
          <h1 className="hero-name">Aditya Shingare</h1>
          
          <div className="terminal-card">
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-body">
              <span className="prompt">~/developer $</span>
              <TypewriterText />
            </div>
          </div>
          
          <div className="hero-subtitles">
            <p>Pre-final year B.Tech IT @ IIIT Lucknow</p>
            <p className="achievements">Expert @ Codeforces · 4★ @ CodeChef</p>
          </div>
          
          <div className="hero-ctas">
            <button className="cta-primary" onClick={scrollToProjects}>Explore Work</button>
            <a href="https://github.com/aditya-s45" target="_blank" rel="noopener noreferrer" className="cta-secondary">GitHub</a>
          </div>
          
          <div className="social-links">
            <a href="https://github.com/aditya-s45" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/adityashingare" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://codeforces.com/profile/aditya_shingare" target="_blank" rel="noopener noreferrer"><SiCodeforces /></a>
            <a href="https://leetcode.com/u/adityaoncode/" target="_blank" rel="noopener noreferrer"><SiLeetcode /></a>
            <a href="https://www.codechef.com/users/codeninja45" target="_blank" rel="noopener noreferrer"><SiCodechef /></a>
            <a href="mailto:workaholicaditya4518@gmail.com"><MdEmail /></a>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrows">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
