
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from 'https://cdn.skypack.dev/gsap';
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;
camera.position.x = 50;
camera.position.y = 50;

// Create a Three.JS Scene
const scene = new THREE.Scene();

let eye;

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

let mixer;
// Load the "eye" model (car)
loader.load('assets/eye.glb',
  function (gltf) {
    console.log('Loaded Eye GLTF:', gltf);
    eye = gltf.scene;
    eye.position.y = 0;
    eye.rotation.y = 0.5;
    eye.rotation.x = 0;
    eye.position.x = 85;
    eye.rotation.z = 0;
    eye.position.z = 0;
    eye.scale.x = 2;
    eye.scale.y =  2;
    eye.scale.z = 2;
    scene.add(eye);
  

  }

);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Add lights to the scene, so we can actually see the 3D model
const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2); // (color, intensity)
topLight.position.set(-500, -500, -500); // top-left-ish
scene.add(topLight);



const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);

};
reRender3D();

let arrPositionModel = [
  {
    id: 'first',
    position: {x: 85, y: 0, z: 0},
    rotation: {x: 0, y: 0.5, z: 0}
  },
  {
    id: 'second',
    position: {x: 85, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0}
  },
  {
    id: 'third',
    position: {x: 85, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0}
  },
  {
    id: 'fourth',
    position: {x: 85, y: 0, z: 0},
    rotation: {x: 0, y: -0.5, z: 0}
  }
];

const modelMove = () => {
  const segments = document.querySelectorAll('.segment');
  let currentSegment;
  segments.forEach((segment) => {
    const rect = segment.getBoundingClientRect();
    if(rect.top <= window.innerHeight/3){
        currentSegment = segment.id;
    }
  });

  let position_active = arrPositionModel.findIndex(
      (val) => val.id == currentSegment
  );
  if (position_active >= 0) {
    let new_coordinates = arrPositionModel[position_active];
    gsap.to(eye.position, {
      x: new_coordinates.position.x,
      y: new_coordinates.position.y,
      z: new_coordinates.position.z,
      duration: 1,
      ease: "power1.out"
    })

    gsap.to(eye.rotation, {
      x: new_coordinates.rotation.x,
      y: new_coordinates.rotation.y,
      z: new_coordinates.rotation.z,
      duration: 1.3,
      ease: "power1.out"
    })

  }
}  

window.addEventListener('scroll', () => {
  if(eye) {
    modelMove();
  }
})

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth, window.innerHeight;
  camera.updateProjectionMatrix();
})

function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');  // Toggles the 'active' class to show/hide the menu
}


