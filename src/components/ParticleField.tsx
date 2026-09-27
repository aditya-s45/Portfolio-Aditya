import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './ParticleField.css';

const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorA = new THREE.Color('#00ffc8');
    const colorB = new THREE.Color('#a855f7');
    const colorC = new THREE.Color('#4d7cfe');
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Distribute points in a wide spherical volume
      const r = 20 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 10; // Offset z to be mostly behind

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradient
      const mixRatio = Math.random();
      if (mixRatio < 0.33) {
        tempColor.copy(colorA).lerp(colorB, mixRatio * 3);
      } else if (mixRatio < 0.66) {
        tempColor.copy(colorB).lerp(colorC, (mixRatio - 0.33) * 3);
      } else {
        tempColor.copy(colorC).lerp(colorA, (mixRatio - 0.66) * 3);
      }
      
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const ParticleField: React.FC = () => {
  return (
    <div className="particle-field-container">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleField;
