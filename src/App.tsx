import React, { Suspense, lazy } from 'react';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import './App.css';

const Loading = lazy(() => import('./components/Loading'));
const Cursor = lazy(() => import('./components/Cursor'));
const ParticleField = lazy(() => import('./components/ParticleField'));
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const TechStack3D = lazy(() => import('./components/TechStack3D'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const MainContent: React.FC = () => {
  const { isLoaded } = useLoading();

  return (
    <>
      <Suspense fallback={<div className="global-fallback" />}>
        {!isLoaded && <Loading />}

        <div className={`app-container ${isLoaded ? 'fade-in' : 'hidden'}`}>
          <Cursor />
          <ParticleField />
          <Navbar />
          <main className="main-content">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <TechStack3D />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </div>
      </Suspense>
    </>
  );
};

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <MainContent />
    </LoadingProvider>
  );
};

export default App;
