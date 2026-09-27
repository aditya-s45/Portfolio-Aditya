import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import './Loading.css';

const Loading = () => {
  const { progress, setProgress, setIsLoaded } = useLoading();
  const [showEnter, setShowEnter] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8 + 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 100);
    return () => clearInterval(interval);
  }, [setProgress]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setShowEnter(true), 500);
    }
  }, [progress]);

  const handleEnter = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
  };

  return (
    <div className={`loading-container ${animatingOut ? 'animating-out' : ''}`}>
      {/* Marquee text - pure CSS infinite scroll */}
      <div className="marquee-track">
        <div className="marquee-inner">
          <span className="marquee-text">SOFTWARE ENGINEER&nbsp;•&nbsp;FULL STACK DEVELOPER&nbsp;•&nbsp;EXPERT @ CODEFORCES&nbsp;•&nbsp;AI/ML ENGINEER&nbsp;•&nbsp;</span>
          <span className="marquee-text">SOFTWARE ENGINEER&nbsp;•&nbsp;FULL STACK DEVELOPER&nbsp;•&nbsp;EXPERT @ CODEFORCES&nbsp;•&nbsp;AI/ML ENGINEER&nbsp;•&nbsp;</span>
        </div>
      </div>

      <div className="marquee-track marquee-track-reverse">
        <div className="marquee-inner marquee-reverse">
          <span className="marquee-text">REACT&nbsp;•&nbsp;THREE.JS&nbsp;•&nbsp;SPRING BOOT&nbsp;•&nbsp;NEXT.JS&nbsp;•&nbsp;PYTHON&nbsp;•&nbsp;WEB3&nbsp;•&nbsp;DOCKER&nbsp;•&nbsp;</span>
          <span className="marquee-text">REACT&nbsp;•&nbsp;THREE.JS&nbsp;•&nbsp;SPRING BOOT&nbsp;•&nbsp;NEXT.JS&nbsp;•&nbsp;PYTHON&nbsp;•&nbsp;WEB3&nbsp;•&nbsp;DOCKER&nbsp;•&nbsp;</span>
        </div>
      </div>

      <div className="center-content">
        <div className="loader-name">AS</div>
        <div className="neon-circle">
          <div className="circle-inner">
            <span className="progress-text">{Math.floor(progress)}%</span>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="loading-label">
          {progress < 100 ? 'Loading portfolio...' : 'Ready!'}
        </div>

        {showEnter && (
          <button className="enter-button" onClick={handleEnter}>
            <span className="enter-text">Enter</span>
            <span className="enter-arrow">→</span>
          </button>
        )}
      </div>

      <div className={`expansion-circle ${animatingOut ? 'expand' : ''}`} />
    </div>
  );
};

export default Loading;
