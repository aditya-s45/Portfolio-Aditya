import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const achievementsData = [
  {
    icon: '💻',
    title: 'Google Big Code Challenge',
    desc: 'Ranked in Top 1,500 nationally.',
    color: 'rgba(66, 133, 244, 0.15)',
    borderColor: 'rgba(66, 133, 244, 0.4)'
  },
  {
    icon: '📊',
    title: 'Competitive Programming',
    desc: 'Codeforces Expert (1708) · CodeChef 4★ (1827) · LeetCode Knight (1873) — 1,000+ problems solved across 90+ rated contests.',
    color: 'rgba(255, 171, 0, 0.15)',
    borderColor: 'rgba(255, 171, 0, 0.4)'
  },
  {
    icon: '🌍',
    title: 'Linux Foundation LiFT Scholar',
    desc: '1 of only 500 recipients globally for the Shubhra Kar Linux Foundation Training Scholarship.',
    color: 'rgba(0, 150, 136, 0.15)',
    borderColor: 'rgba(0, 150, 136, 0.4)'
  },
  {
    icon: '🥇',
    title: 'Hack-o-Fiesta v6.1 Winner',
    desc: 'First prize (1st Place) at IIIT Lucknow\'s flagship 24-hour global AI/Web3 hackathon.',
    color: 'rgba(233, 30, 99, 0.15)',
    borderColor: 'rgba(233, 30, 99, 0.4)'
  },
  {
    icon: '🏆',
    title: 'Amazon ML Summer School Scholar',
    desc: 'Selected from 130,000+ applicants nationwide for Amazon\'s machine learning program.',
    color: 'rgba(255, 153, 0, 0.15)',
    borderColor: 'rgba(255, 153, 0, 0.4)'
  },
  {
    icon: '🚀',
    title: 'Rootstock AI BUIDL Hackathon Finalist',
    desc: 'Ranked in the Top 21 teams globally.',
    color: 'rgba(156, 39, 176, 0.15)',
    borderColor: 'rgba(156, 39, 176, 0.4)'
  },
  {
    icon: '🧮',
    title: 'IOQM 2023 Qualifier',
    desc: 'Top 1% of 88,000+ candidates in the Indian Olympiad Qualifier in Mathematics.',
    color: 'rgba(3, 169, 244, 0.15)',
    borderColor: 'rgba(3, 169, 244, 0.4)'
  },
  {
    icon: '🎓',
    title: 'Reliance Foundation Scholar',
    desc: 'Top 5% of 100,000+ applicants for India\'s prestigious merit scholarship.',
    color: 'rgba(76, 175, 80, 0.15)',
    borderColor: 'rgba(76, 175, 80, 0.4)'
  }
];

const Achievements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.achievement-card');
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="achievements" className="achievements-section" ref={containerRef}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">~/achievements $</span>
          <h2 className="section-title">Achievements</h2>
        </div>

        <div className="achievements-grid">
          {achievementsData.map((item, index) => (
            <div 
              key={index} 
              className="achievement-card"
              style={{ 
                background: `linear-gradient(135deg, ${item.color} 0%, rgba(20,20,30,0.8) 100%)`,
                borderColor: item.borderColor,
                boxShadow: `0 8px 32px 0 ${item.color}`
              }}
            >
              <div className="achievement-icon">{item.icon}</div>
              <div className="achievement-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
