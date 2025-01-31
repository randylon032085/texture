import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const light = new THREE.AmbientLight(0xffffff);
light.position.set(5, 5, 5);
light.castShadow = true;
scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: 100 });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app").appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();

const baseTexture = loader.load("Texture/brick.jpg");

const bumpMap = loader.load("Texture/bump_map.jpg");
const normalMap = loader.load("Texture/normal_map.jpg");
const displacementMap = loader.load("Texture/displacement_map.jpg");
const specularMap = loader.load("Texture/specular_map.jpg");
const metalnesMap = loader.load("Texture/metalness_map.jpg");
const roughnesMap = loader.load("Texture/roughness_map.jpg");
const aoMap = loader.load("Texture/ambient_occlusion_map.jpg");

const alphaMap = loader.load("Texture/alpha_map.jpg");

const emissiveMap = loader.load("Texture/emissive_map.jpg");
const envMap = loader.load("Texture/env_map.jpg");

const material = new THREE.MeshStandardMaterial({
  map: baseTexture,
  bumpMap: bumpMap,
  normalMap: normalMap,
  displacementMap: displacementMap,
  displacementScale: 0.1,
  specularMap: specularMap,
  metalnessMap: metalnesMap,
  roughnessMap: roughnesMap,
  aoMap: aoMap,
  alphaMap: alphaMap,
  emissiveMap: emissiveMap,
  emissive: new THREE.Color(0xff0000),
  envMap: envMap,
  transparent: true,
});

const geometry = new THREE.BoxGeometry(2, 2, 2);

const box = new THREE.Mesh(geometry, material);

scene.add(box);

const video = document.createElement("video");
video.src = "Texture/fire.mp4";
video.loop = true;
video.play();

const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

material.map = videoTexture;

function animation() {
  control.update();
  // box.rotation.x += 0.01;
  // box.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

animation();
