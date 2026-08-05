/**
 * main.js - Three.js GLTF Model Viewer
 *
 * Entry point for the Vite-based Three.js application.
 * Loads a GLTF model with skeletal animation and renders it
 * in a WebGL canvas with OrbitControls for interactive camera movement.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/dracoloader';
import './style.css';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ─── Scene Setup ───────────────────────────────────────────────────────────────

const scene = new THREE.Scene();

// ─── Viewport Dimensions ───────────────────────────────────────────────────────

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Handle window resize: update camera aspect ratio and renderer size
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

// ─── Lighting ──────────────────────────────────────────────────────────────────

// Point light positioned above and to the right of the model
const light = new THREE.PointLight(0xfffff8, 100, 100);
light.position.set(50, 50, 50);
scene.add(light);

// ─── Camera ────────────────────────────────────────────────────────────────────

const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
camera.position.z = 60;
camera.position.x = 10;
scene.add(camera);

// ─── Renderer ──────────────────────────────────────────────────────────────────

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true   // Transparent background
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// ─── GLTF Model Loading & Animation ────────────────────────────────────────────

let loader = new GLTFLoader();
let mixer;      // Animation mixer for playing skeletal animations
let player1;    // Stores the loaded GLTF data for access in the render loop

// Load the GLTF model and set up its animation
loader.load("model_m.gltf", function (gltf) {
  player1 = gltf;
  console.log("Loaded animation:", gltf.animations[0].name);

  const model = gltf.scene;
  scene.add(model);

  // Create an AnimationMixer and play the 'ArmatureAction' clip in a loop
  mixer = new THREE.AnimationMixer(model);
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, 'ArmatureAction');
  const action = mixer.clipAction(clip);
  action.play();
  action.loop = THREE.LoopRepeat;
}, undefined, function (error) {
  console.error("Error loading GLTF model:", error);
});

// ─── Animation Loop ────────────────────────────────────────────────────────────

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  // Update the animation mixer each frame using elapsed time
  if (player1 && mixer) {
    mixer.update(clock.getDelta());
  }

  renderer.render(scene, camera);
}

animate();

// ─── Orbit Controls ────────────────────────────────────────────────────────────

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;     // Smooth inertia on camera movement
controls.enablePan = false;        // Disable panning to keep model centered
controls.enableZoom = false;       // Disable zoom (fixed distance view)
controls.autoRotate = true;        // Auto-rotate the camera around the model
controls.autoRotateSpeed = 5;      // Rotation speed

// Separate render loop for OrbitControls (handles damping updates)
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
