# How to Add Your 3D Model

## ✅ Folder Created!
I've created: `frontend/public/models/`

## 📥 Step 1: Add Your 3D Model
1. Download a 3D model (`.glb` or `.gltf` format recommended)
2. Place it in: `frontend/public/models/`
3. Name it: `model.glb` (or any name you want)

## 🎨 Step 2: Add to Your Portfolio

### Option A: Use Default Name (model.glb)
If your file is named `model.glb`, just add this to your hero section in `App.jsx`:

```jsx
import Model3D from './components/Model3D';

// In your hero section, add:
<div className="hidden lg:block w-[400px] h-[400px]">
  <Model3D />
</div>
```

### Option B: Use Custom Name
If your file has a different name (e.g., `avatar.glb`), specify it:

```jsx
<div className="hidden lg:block w-[400px] h-[400px]">
  <Model3D modelPath="/models/avatar.glb" />
</div>
```

## 🎯 Where to Download Free 3D Models

### Best Sites for .GLB Models:
1. **Sketchfab** - https://sketchfab.com/
   - Filter by "Downloadable" and "glTF"
   - Huge collection, many free models

2. **Poly Pizza** - https://poly.pizza/
   - All models are free
   - Low-poly style (good for web)

3. **Ready Player Me** - https://readyplayer.me/
   - Create your own 3D avatar
   - Export as .glb

4. **Quaternius** - http://quaternius.com/
   - Free low-poly models
   - Great for web performance

### How to Download from Sketchfab:
1. Go to https://sketchfab.com/
2. Search for what you want (e.g., "laptop", "robot", "abstract")
3. Filter: "Downloadable" + "Free"
4. Click on a model
5. Click "Download 3D Model"
6. Choose "glTF" format
7. Extract the .glb file
8. Place in `frontend/public/models/`

## 🎬 Customization Options

### Change Model Size:
In `Model3D.jsx`, adjust the `scale` value:
```jsx
<primitive 
  object={scene} 
  scale={2.0}  // Make it bigger (default is 1.5)
/>
```

### Change Auto-Rotation Speed:
```jsx
<OrbitControls 
  autoRotate={true}
  autoRotateSpeed={5}  // Faster rotation (default is 2)
/>
```

### Disable Auto-Rotation:
```jsx
<OrbitControls 
  autoRotate={false}  // Model won't rotate automatically
/>
```

### Change Position:
```jsx
<primitive 
  object={scene} 
  position={[0, -1, 0]}  // Move down
/>
```

## 🚀 Quick Test

Want to test it right now? I can:
1. Download a free 3D model for you
2. Add it to your portfolio
3. Show you how it looks

Just let me know! 🎨
