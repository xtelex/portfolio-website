# 3D Model Integration Guide

## ✅ What's Already Installed
- `three` - Core Three.js library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers and abstractions
- `gsap` - Animation library
- `lenis` - Smooth scrolling
- `framer-motion` - Animation library

## 🎨 How to Add 3D Models

### Option 1: Use the Example Component (Already Created)
I've created `src/components/Scene3D.jsx` with a rotating cube example.

**To use it in your hero section:**
```jsx
import Scene3D from './components/Scene3D';

// In your hero section, add:
<div className="w-[400px] h-[400px]">
  <Scene3D />
</div>
```

### Option 2: Load Your Own 3D Models

#### Step 1: Get a 3D Model
Download 3D models from:
- [Sketchfab](https://sketchfab.com/) - Free & paid models
- [TurboSquid](https://www.turbosquid.com/) - Professional models
- [CGTrader](https://www.cgtrader.com/) - Marketplace
- [Poly Pizza](https://poly.pizza/) - Free low-poly models

**Supported formats:**
- `.gltf` / `.glb` (Recommended - best for web)
- `.fbx`
- `.obj`

#### Step 2: Add Model to Your Project
1. Create a folder: `frontend/public/models/`
2. Place your model file there (e.g., `model.glb`)

#### Step 3: Load the Model in React

**Install the GLTF loader:**
```bash
npm install @react-three/drei --legacy-peer-deps
```

**Create a model component:**
```jsx
import { useGLTF } from '@react-three/drei';

function MyModel() {
  const { scene } = useGLTF('/models/model.glb');
  
  return <primitive object={scene} scale={1} />;
}

// Preload the model
useGLTF.preload('/models/model.glb');

export default MyModel;
```

#### Step 4: Use in Your Scene
```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MyModel from './MyModel';

function Scene3D() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <MyModel />
      <OrbitControls />
    </Canvas>
  );
}
```

## 🎭 Common 3D Objects You Can Create

### 1. Sphere
```jsx
<mesh>
  <sphereGeometry args={[1, 32, 32]} />
  <meshStandardMaterial color="#ffffff" />
</mesh>
```

### 2. Torus (Donut)
```jsx
<mesh>
  <torusGeometry args={[1, 0.4, 16, 100]} />
  <meshStandardMaterial color="#ffffff" />
</mesh>
```

### 3. Cone
```jsx
<mesh>
  <coneGeometry args={[1, 2, 32]} />
  <meshStandardMaterial color="#ffffff" />
</mesh>
```

### 4. Custom Shape with Text
```jsx
import { Text3D, Center } from '@react-three/drei';

<Center>
  <Text3D
    font="/fonts/helvetiker_regular.typeface.json"
    size={0.5}
    height={0.2}
  >
    Hello 3D
    <meshStandardMaterial color="#ffffff" />
  </Text3D>
</Center>
```

## 🎬 Adding Animations

### Rotate on Scroll (with GSAP)
```jsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function AnimatedModel() {
  const meshRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(meshRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}
```

### Auto-Rotate
```jsx
function RotatingModel() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}
```

## 🎨 Styling Tips for Black & White Theme

```jsx
// Metallic white
<meshStandardMaterial 
  color="#ffffff" 
  metalness={0.9} 
  roughness={0.1}
/>

// Matte white
<meshStandardMaterial 
  color="#ffffff" 
  metalness={0.1} 
  roughness={0.8}
/>

// Glass effect
<meshPhysicalMaterial 
  color="#ffffff" 
  transmission={0.9}
  thickness={0.5}
  roughness={0.1}
/>

// Wireframe
<meshBasicMaterial 
  color="#ffffff" 
  wireframe={true}
/>
```

## 📦 Example: Add 3D Model to Hero Section

```jsx
// In App.jsx
import Scene3D from './components/Scene3D';

// In your hero section:
<div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8 md:px-12 pt-24">
  {/* Left - Text */}
  <motion.div>
    {/* Your existing text content */}
  </motion.div>

  {/* Right - 3D Model */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="hidden lg:block w-full h-[500px]"
  >
    <Scene3D />
  </motion.div>
</div>
```

## 🔧 Performance Tips

1. **Use `.glb` format** - Compressed and optimized
2. **Reduce polygon count** - Use tools like Blender to simplify
3. **Optimize textures** - Compress images, use smaller sizes
4. **Use `useGLTF.preload()`** - Preload models before rendering
5. **Limit lights** - Use 2-3 lights max for performance
6. **Use `<Suspense>`** - Show loading state while model loads

```jsx
import { Suspense } from 'react';

<Canvas>
  <Suspense fallback={null}>
    <MyModel />
  </Suspense>
</Canvas>
```

## 🎯 Where to Place 3D Models in Your Portfolio

1. **Hero Section** - Floating 3D object next to text
2. **About Section** - Animated 3D avatar or icon
3. **Skills Section** - 3D icons for each technology
4. **Background** - Subtle animated particles or shapes
5. **Project Cards** - 3D preview of projects

## 📚 Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Examples](https://threejs.org/examples/)
- [Sketchfab](https://sketchfab.com/) - Download models
- [Ready Player Me](https://readyplayer.me/) - Create 3D avatars

---

Need help? Just ask me to:
- Create a specific 3D component
- Add animations
- Load a custom model
- Optimize performance
