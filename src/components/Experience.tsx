import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "PayPal",
    role: "Mentee — Career Academy Program",
    duration: "Mar 2026 — Aug 2026 · Remote",
    bullets: [
      "Selected for an exclusive 6-month software engineering mentorship program under senior PayPal engineers.",
      "Upskilling in system architecture, enterprise coding standards, and production-grade code review practices.",
      "Engaging with real-world distributed systems concepts and fintech engineering patterns."
    ]
  },
  {
    company: "E-Cell, IIIT Lucknow",
    role: "Coordinator",
    duration: "Jun 2026 — Present",
    bullets: [
      "Coordinated the Annual Startup Expo with 500+ attendees and 20+ corporate sponsors.",
      "Led cross-functional teams for event logistics, outreach, and corporate engagement."
    ]
  }
];

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        gsap.fromTo(item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="experience-section" id="experience" ref={containerRef}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">~/experience $</span>
          <h2 className="section-title">Experience</h2>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {experiences.map((exp, index) => (
            <div 
              className="timeline-item" 
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
            >
              <div className="timeline-dot"></div>
              <div className="experience-card">
                <div className="experience-header">
                  <h3 className="company-name">{exp.company}</h3>
                  <span className="duration">{exp.duration}</span>
                </div>
                <h4 className="role">{exp.role}</h4>
                <ul className="experience-bullets">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
