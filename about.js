// Function to handle section animations
function handleScrollReveal() {
  const overviewSection = document.querySelector('.overview');
  const institutionSection = document.querySelector('.institution');
  const windowHeight = window.innerHeight;

  // Get the positions of both sections
  const overviewTop = overviewSection.getBoundingClientRect().top;
  const institutionTop = institutionSection.getBoundingClientRect().top;

  // When Overview section is near the top of the viewport, reveal it (on page load)
  if (overviewTop <= windowHeight) {
    overviewSection.classList.add('active');
  }

  // When Institution section comes into view, reveal it (on scroll)
  if (institutionTop < windowHeight - 100) {
    institutionSection.classList.add('active');
  }
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollReveal);

// Call the function initially to handle Overview section reveal
handleScrollReveal();

// Scroll interactive 3D gradient background effect using Three.js
function initThreeJs() {
  const canvas = document.getElementById('threejs-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Ensure the canvas fills the entire background
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1'; // Set the canvas behind the content

  // Add gradient effect to the background
  const geometry = new THREE.SphereGeometry(100, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      void main() {
        vec3 color = vec3(0.5 + 0.5 * cos(time + vUv.x * 10.0), 0.5 + 0.5 * cos(time + vUv.y * 10.0), 0.5);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.05; // Animate the background
    renderer.render(scene, camera);
  }
  animate();
}

// Call the 3D background setup function
initThreeJs();
  