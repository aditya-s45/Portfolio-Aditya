import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: string | number;
  label: string;
  sublabel: string;
  isDecimal?: boolean;
}

const StatCard: React.FC<StatProps> = ({ value, label, sublabel, isDecimal }) => {
  const [count, setCount] = useState(typeof value === 'number' ? 0 : value);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof value !== 'number') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [value]);

  const displayValue = typeof value === 'number' 
    ? (isDecimal ? (count as number).toFixed(2) : Math.floor(count as number))
    : value;

  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-value">{displayValue}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-sublabel">{sublabel}</div>
    </div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = textRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.fromTo(paragraphs, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            stagger: 0.2,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={containerRef}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">~/about $</span>
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-content">
          <div className="about-text" ref={textRef}>
            <p>
              Hey! I'm Aditya Shingare, a pre-final year B.Tech Information Technology student at IIIT Lucknow. I'm passionate about building robust, scalable software — from enterprise backend systems with Spring Boot to real-time platforms with Next.js and WebSockets.
            </p>
            <p>
              When I'm not shipping features, I'm grinding algorithms. With an Expert rating on Codeforces and 4★ on CodeChef, competitive programming is where I sharpen my problem-solving instincts — having solved over 1,000+ problems across 90+ contests.
            </p>
            <p>
              I believe great engineers are built at the intersection of strong fundamentals and real-world building. Every project I take on is an excuse to learn something new and push the boundaries of what I can create.
            </p>
          </div>
          
          <div className="stats-grid">
            <StatCard value={1708} label="Codeforces" sublabel="Expert" />
            <StatCard value={1873} label="LeetCode" sublabel="Knight" />
            <StatCard value={"1000+"} label="Problems" sublabel="Solved" />
            <StatCard value={8.65} label="CGPA" sublabel="IIIT Lucknow" isDecimal={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
