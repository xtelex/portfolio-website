import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';

// Component to load and display the 3D model
function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  
  return (
    <primitive 
      object={scene} 
      scale={1.5} 
      position={[0, 0, 0]}
    />
  );
}

// Main 3D Scene Component
export default function Model3D({ modelPath = '/models/model.glb' }) {
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows 
        gl={{ alpha: true }} 
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <spotLight 
          position={[0, 5, 0]} 
          intensity={0.5} 
          angle={0.3}
          penumbra={1}
          castShadow
        />

        {/* 3D Model with Suspense for loading */}
        <Suspense fallback={null}>
          <Model modelPath={modelPath} />
        </Suspense>

        {/* Environment for realistic reflections */}
        <Environment preset="city" />

        {/* Camera Controls - allows user to rotate/zoom */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={2}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}

// Preload the model for better performance
// Uncomment this line once you add your model file
// useGLTF.preload('/models/model.glb');
