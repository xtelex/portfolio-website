import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

// Animated 3D Box Component
function RotatingBox() {
  const meshRef = useRef();

  // Rotate the box on every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#ffffff" 
        metalness={0.8} 
        roughness={0.2}
      />
    </mesh>
  );
}

// Main 3D Scene Component
export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        {/* 3D Object */}
        <RotatingBox />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Camera Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
