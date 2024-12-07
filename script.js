// Three.js Implementation
let scene, camera, renderer, objects = [];

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('heroCanvas'),
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add floating objects
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x64FFDA,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });

    // Create multiple floating objects
    for(let i = 0; i < 3; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            Math.random() * 4 - 2,
            Math.random() * 4 - 2,
            Math.random() * 4 - 2
        );
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        objects.push(mesh);
        scene.add(mesh);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x64FFDA, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    objects.forEach((obj, index) => {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
        obj.position.y = Math.sin(Date.now() * 0.001 + index) * 0.5;
    });

    renderer.render(scene, camera);
}

// Initialize Three.js scene
window.addEventListener('load', initThree);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse interaction with floating objects
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    objects.forEach(obj => {
        obj.rotation.x += mouseY * 0.01;
        obj.rotation.y += mouseX * 0.01;
    });
});

// Particle background effect
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#64FFDA"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#64FFDA",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true
};

// Initialize particles
particlesJS("particles-js", particlesConfig);

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced intersection observer for feature cards with glow effect
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.add('animate-glow');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach((card) => {
    observer.observe(card);
});

// Copy code functionality with enhanced animation
function copyCode(button) {
    const code = button.parentElement.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const icon = button.querySelector('i');
        icon.classList.remove('ph-copy');
        icon.classList.add('ph-check');
        button.classList.add('text-neon-green');
        
        // Add glow effect
        button.style.textShadow = '0 0 10px rgba(100,255,218,0.5)';
        
        setTimeout(() => {
            icon.classList.remove('ph-check');
            icon.classList.add('ph-copy');
            button.classList.remove('text-neon-green');
            button.style.textShadow = 'none';
        }, 2000);
    });
}

// Update the boxen theme configuration
const boxenConfig = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'magenta',
    title: 'CSCC Auto-Deploy',
    titleAlignment: 'center',
    backgroundColor: '#1F2937',
    dimBorder: true
};

// Update the ora spinner colors
const spinner = ora({
    text: 'Starting deployment...',
    color: 'magenta'
}).start();

// Update chalk colors for better visibility on dark theme
console.log(
    chalk.magentaBright('Command:'),
    chalk.gray('web-deploy deploy')
);

// Update success/error colors
spinner.succeed(chalk.greenBright('Deployment successful!'));
spinner.fail(chalk.redBright('Deployment failed'));

// Add loading animation for code blocks
document.querySelectorAll('.code-block').forEach(block => {
    block.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 500);
    });
});