// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (heroSection) {
        const scrolled = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Observe sections and cards for animations
document.querySelectorAll('section > div, .feature-card').forEach(element => {
    element.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(element);
});

// Command hover effect
document.querySelectorAll('.command-text').forEach(command => {
    command.addEventListener('mouseover', () => {
        command.style.transform = 'scale(1.02)';
        command.style.transition = 'all 0.3s ease';
    });
    command.addEventListener('mouseout', () => {
        command.style.transform = 'scale(1)';
    });
});

// Header transparency on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('bg-opacity-95');
    } else {
        header.classList.remove('bg-opacity-95');
    }
});

// Globe Animation
let scene, camera, renderer, globe;

function initGlobe() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    document.getElementById('globe-container').appendChild(renderer.domElement);
    
    // Create globe
    const geometry = new THREE.SphereGeometry(8, 64, 64);
    const material = new THREE.MeshBasicMaterial({
        color: 0x2997FF,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    camera.position.z = 20;
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 25;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0xA855F7,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth rotation based on mouse position
        globe.rotation.y += 0.001;
        globe.rotation.x += (mouseY * 0.01 - globe.rotation.x) * 0.1;
        globe.rotation.y += (mouseX * 0.01 - globe.rotation.y) * 0.1;
        
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Copy Command Function
function copyCommand(commandText) {
    navigator.clipboard.writeText(commandText).then(() => {
        const copyButton = event.currentTarget;
        const originalText = copyButton.innerHTML;
        
        // Show feedback
        copyButton.innerHTML = `
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
        `;
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyButton.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Initialize globe when document is loaded
document.addEventListener('DOMContentLoaded', initGlobe);
