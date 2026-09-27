import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Environment, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './TechStack3D.css';

const categories = [
  { name: 'Languages', color: '#00ffc8', skills: ['C++', 'Java', 'Python', 'JavaScript', 'SQL', 'Solidity', 'C', 'HTML/CSS'] },
  { name: 'Frameworks', color: '#4d7cfe', skills: ['Spring Boot', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'Socket.io', 'Spring Security', 'Thymeleaf'] },
  { name: 'Databases & DevOps', color: '#a855f7', skills: ['PostgreSQL', 'MongoDB', 'Docker', 'Git', 'GitHub Actions', 'Linux'] },
  { name: 'AI/ML & Vision', color: '#ff6b6b', skills: ['OpenCV', 'YOLO', 'PyTorch', 'Meta HQ-SAM', 'Gemini API', 'Kociemba'] },
  { name: 'Core', color: '#ffd93d', skills: ['DSA', 'OOD', 'DBMS', 'OS', 'CN'] },
];

const SkillNode = ({ position, skill, color }: { position: [number, number, number], skill: string, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial color={color} envMapIntensity={1} clearcoat={1} clearcoatRoughness={0.1} metalness={0.8} roughness={0.2} distort={0.3} speed={2} />
      </mesh>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill}
      </Text>
    </Float>
  );
};

const TechGalaxy = () => {
  const nodes = useMemo(() => {
    const items: React.ReactNode[] = [];
    let idx = 0;
    
    categories.forEach((cat, catIdx) => {
      const radius = 3 + catIdx * 2;
      const count = cat.skills.length;
      
      cat.skills.forEach((skill, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = (Math.random() - 0.5) * 4;
        const z = Math.sin(angle) * radius;
        
        items.push(
          <SkillNode
            key={`skill-${idx}`}
            position={[x, y, z]}
            skill={skill}
            color={cat.color}
          />
        );
        idx++;
      });
    });
    
    return items;
  }, []);

  return (
    <group>
      {nodes}
    </group>
  );
};

const TechStack3D: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="skills" className="tech-stack-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">~/skills $</span>
          <h2 className="section-title">Tech Stack</h2>
        </div>

        {isMobile ? (
          <div className="skills-grid">
            {categories.map((category, idx) => (
              <div key={idx} className="skill-category">
                <h3 style={{ color: category.color }}>{category.name}</h3>
                <div className="skill-tags">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="skill-tag" style={{ borderColor: category.color, color: category.color }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="canvas-container">
            <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -10]} color="#00ffc8" intensity={2} />
              
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <TechGalaxy />
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStack3D;
