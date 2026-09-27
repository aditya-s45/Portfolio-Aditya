import React, { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProject {
  title: string;
  accent: string;
  tagline: string;
  tags: string[];
  bullets: string[];
  github: string;
  demo?: string;
}

interface OtherProject {
  title: string;
  tags: string[];
  github: string;
  demo?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'IRCTC Tatkal Auto-Filler',
    accent: '#ff6b6b',
    tagline: "Automating India's fastest ticket race",
    tags: ['JavaScript', 'Chrome MV3', 'Angular DOM', 'CSS3'],
    bullets: [
      'Built a Chrome Extension (Manifest V3) that automates the entire IRCTC Tatkal booking flow — login to payment — in under 10 seconds, using zero npm dependencies for maximum execution speed.',
      "Reverse-engineered Angular + PrimeNG's change detection by simulating character-by-character input events and full mouse event sequences (mousedown → mouseup → click) without triggering bot detection."
    ],
    github: 'https://github.com/aditya-s45/Irctc-Tatkal-Automation'
  },
  {
    title: 'RubiksCV — Real-Time AR Solver',
    accent: '#4ecdc4',
    tagline: 'Scan. Solve. Overlay. In real time.',
    tags: ['Python', 'OpenCV', 'Flask', 'WebSockets', 'Kociemba'],
    bullets: [
      "Built a real-time computer vision pipeline using OpenCV and HSV color segmentation to detect a physical Rubik's Cube's face colors and map them into a virtual state matrix.",
      "Applied Kociemba's Two-Phase algorithm to compute optimal solutions in under 20 moves and streamed step-by-step AR overlay guidance to a live frontend via WebSockets."
    ],
    github: 'https://github.com/aditya-s45/RubiksCV',
    demo: 'https://rubikscv.onrender.com/'
  },
  {
    title: 'DineSync — Enterprise Dining System',
    accent: '#ffd93d',
    tagline: 'Enterprise-grade MVC with Spring Boot',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Docker'],
    bullets: [
      'Architected a scalable MVC application using Spring Boot 3.4 and Java 21, supporting seamless product cataloging, cart management, and real-time order tracking.',
      'Engineered robust authentication with Spring Security and OAuth2, enforcing RBAC and BCrypt password hashing. Containerized with Docker for cloud deployment.'
    ],
    github: 'https://github.com/aditya-s45/DineSync'
  },
  {
    title: 'Panthal — Full-Stack Social Platform',
    accent: '#6c5ce7',
    tagline: 'Real-time social platform with AI chatbot',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'Gemini API'],
    bullets: [
      'Developed a scalable content sharing platform merging video streaming and microblogging, utilizing Next.js for a responsive UI and Cloudinary for optimized media management.',
      'Engineered a real-time chat architecture with Socket.io, supporting live dynamic rooms, presence indicators, and instant messaging with sub-second latency.',
      'Designed complex MongoDB aggregation pipelines and integrated the Gemini API to power an intelligent platform chatbot.'
    ],
    github: 'https://github.com/aditya-s45/Panthal'
  },
  {
    title: 'PixelDeed — AI Land Tokenization',
    accent: '#00cec9',
    tagline: 'AI + Blockchain for land ownership',
    tags: ['PyTorch', 'Meta HQ-SAM', 'Next.js', 'Solidity', 'Ethereum'],
    bullets: [
      'Developed an AI-driven decentralized application allowing users to draw boundaries on satellite maps, instantly appraise land value, and mint ownership deeds as NFTs.',
      "Implemented an automated computer vision pipeline using Meta's Segment Anything Model (HQ-SAM) for pixel-perfect geodesic boundary segmentation.",
      'Engineered a spectral valuation engine (pseudo-NDVI) to classify land quality, bridging AI analysis into a custom ERC-721/ERC-20 ecosystem on Ethereum.'
    ],
    github: 'https://github.com/aditya-s45/PixelDeed'
  }
];

const otherProjects: OtherProject[] = [
  {
    title: 'STSMS - Smart Traffic & Street Safety System',
    tags: ['Python', 'YOLO', 'OpenCV', 'Flask'],
    github: 'https://github.com/aditya-s45/Smart-Traffic-Management'
  },
  {
    title: 'Drishya - Web3 Film Distribution Platform',
    tags: ['Next.js', 'Solidity', 'IPFS', 'Chainlink'],
    github: 'https://github.com/bansal-ishaan/Drishya',
    demo: 'https://drishya1.onrender.com/'
  },
  {
    title: 'DeepFake Detector - Video Authentication CNN',
    tags: ['PyTorch', 'OpenCV', 'React.js'],
    github: 'https://github.com/ayanokojix21/DeepDefend'
  },
  {
    title: 'Alles - AI-Powered Social Ecosystem',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/Samayyy96/Alles',
    demo: 'https://alles-iota.vercel.app'
  },
  {
    title: 'GeoSense - Web3 Geospatial Intelligence',
    tags: ['React', 'HQ-SAM', 'Solidity', 'Hardhat'],
    github: 'https://github.com/aditya-s45/GeoSense2'
  }
];

const TiltCard = ({ project, children }: { project: FeaturedProject; children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const rotateX = (0.5 - y) * 20; // max 10 deg
    const rotateY = (x - 0.5) * 20;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
      transition: 'transform 0.5s ease'
    });
  };

  return (
    <div 
      className="featured-card" 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, borderLeftColor: project.accent }}
    >
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal featured projects
      gsap.from('.featured-card', {
        scrollTrigger: {
          trigger: '.featured-projects',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Reveal other projects
      gsap.from('.other-card', {
        scrollTrigger: {
          trigger: '.other-projects-grid',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-label">~/projects $</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="featured-projects">
          {featuredProjects.map((project, idx) => (
            <TiltCard key={idx} project={project}>
              <div className="project-header">
                <h3 className="project-title" style={{ color: project.accent }}>{project.title}</h3>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Live Demo">
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="project-tagline">{project.tagline}</p>
              
              <ul className="project-bullets">
                {project.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
              
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">{tag}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="other-projects">
          <h3 className="other-projects-header">// other noteworthy projects</h3>
          <div className="other-projects-grid">
            {otherProjects.map((project, idx) => (
              <div key={idx} className="other-card">
                <div className="other-card-header">
                  <h4>{project.title}</h4>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                      <FaGithub />
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Live Demo">
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
                <div className="project-tags small">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
