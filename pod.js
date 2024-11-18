let container, scene, camera, renderer, particles = [], mouseX = 0, mouseY = 0, isMobile = false;

init();
animate();

function init() {
    container = document.getElementById('container');

    // Detect if the device is mobile
    isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particle setup
    let particleCount = 300;  // Reduced number of particles
    let geometry = new THREE.BufferGeometry();
    let positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() * 2 - 1) * 200;
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 200;
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 200;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    let sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    let material = new THREE.PointsMaterial({
        color: 0xdddddd,
        size: 4,
        map: sprite,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    // Use mouse movement for PCs
    if (!isMobile) {
        document.addEventListener('mousemove', onDocumentMouseMove);
    } else {
        // Use gyro for mobile
        window.addEventListener('deviceorientation', onDeviceOrientation);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

let tiltX = 0, tiltY = 0;  // For gyro data
function onDeviceOrientation(event) {
    // Get rotation rates from the DeviceOrientation API
    tiltX = event.beta ? (event.beta / 90) : 0; // Forward/backward tilt (normalized)
    tiltY = event.gamma ? (event.gamma / 90) : 0; // Left/right tilt (normalized)
}

function animate() {
    requestAnimationFrame(animate);

    // Particle rotation for both PC and mobile
    if (isMobile) {
        // Use gyro input for mobile devices
        particles.rotation.x += (tiltX * 0.1 - particles.rotation.x) * 0.05;
        particles.rotation.y += (tiltY * 0.1 - particles.rotation.y) * 0.05;
    } else {
        // Use mouse input for PCs
        particles.rotation.x += 0.002;
        particles.rotation.y += 0.002;
        particles.rotation.x += (mouseY * 0.1 - particles.rotation.x) * 0.05;
        particles.rotation.y += (mouseX * 0.1 - particles.rotation.y) * 0.05;
    }

    renderer.render(scene, camera);
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active'); // Toggles the 'active' class to show/hide the menu
}
