# Three.js 3D/VR Project

![Three.js](https://img.shields.io/badge/Three.js-0.150.1-black?logo=three.js)
![Vite](https://img.shields.io/badge/Vite-4.1.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

A Three.js project featuring GLTF/GLB model loading, skeletal animation, VR support, and interactive 3D scenes. Built with Vite for fast development.

## Features

- **GLTF/GLB Model Loading** - Load and display 3D models in GLTF and GLB formats using GLTFLoader
- **Skeletal Animation** - Play back embedded animations from GLTF files with AnimationMixer
- **VR Support** - WebXR integration for immersive VR experiences with controller interaction
- **Orbit Controls** - Interactive camera rotation, panning, and zooming
- **Avatar Customization** - Swap clothing/outfit meshes on 3D avatar models in real-time
- **Draco Compression** - Support for Draco-compressed GLTF files via DRACOLoader
- **Responsive Design** - Automatically adapts to window resizing
- **dat.GUI Controls** - Debug panel for adjusting model position, rotation, and lighting

## Project Structure

```
three_js_ex/
|-- main.js              # Vite entry point: loads GLTF model with animation + OrbitControls
|-- check.html           # VR interactive cubes demo (WebXR)
|-- gltf.html            # Avatar viewer with clothing swap, camera controls, dat.GUI
|-- style.css            # Styles for main.js (Vite)
|-- main.css             # Styles for VR demo (check.html)
|-- index.html           # [not present - use gltf.html or check.html]
|
|-- GLTFLoader.js        # Three.js GLTF/GLB loader
|-- DRACOLoader.js       # Draco mesh decoder for compressed GLTF
|-- OrbitControls.js     # Mouse/touch orbit camera controls
|-- VRButton.js          # WebXR VR session button
|-- webvr.js             # VR session utilities
|-- vrstats.js           # VR performance stats
|-- SkeletonUtils.js     # Skeleton cloning/retargeting utilities
|-- counter.js           # Vite counter template (unused)
|
|-- jsm/                 # Three.js addon modules (controls, loaders, webxr, etc.)
|
|-- model_m.gltf         # Primary GLTF model with animations
|-- model_m.glb          # Binary GLTF version of primary model
|-- model_m_anim_2.glb   # Secondary animation file
|-- model_c.glb          # GLB model variant
|-- cube.glb / cube.gltf # Test cube models
|-- Anim_golf.glb        # Golf animation model
|-- Avatar_Sushil.glb    # Avatar model
|-- RobotExpressive.glb  # Robot model with expressive animations
|
|-- *.jpg / *.png        # Textures and UI button icons
|-- package.json         # Project config (Vite + Three.js + GSAP)
|-- LICENSE              # MIT License
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd three_js_ex

# Install dependencies
npm install
```

## Usage

### Development Server (Vite)

```bash
npm run dev
```

Opens the project at `http://localhost:5173` by default. The Vite entry point loads `main.js` which displays a GLTF model with animation and orbit controls.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### VR Demo

Open `check.html` in a WebXR-capable browser (e.g., Meta Quest Browser, Chrome with VR headset). This demo renders 200 interactive cubes in a room that can be launched with a VR controller.

### Avatar Viewer

Open `gltf.html` in a browser to view the avatar model with:
- **Clothing swap buttons** - Switch between different outfit meshes
- **Zoom in/out** - Camera distance controls
- **Camera reset** - Reset camera to default position
- **dat.GUI panel** - Fine-tune position, rotation, and lighting

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| three   | ^0.150.1 | 3D rendering engine |
| gsap    | ^3.11.4 | Animation library |
| vite    | ^4.1.0 (dev) | Build tool and dev server |

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
