const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
const maxDistance = 100;

const techIcons = [
  'assets/tech-icons/ruby.svg',
  'assets/tech-icons/rails.svg',
  'assets/tech-icons/react.svg',
  'assets/tech-icons/javascript.svg',
  'assets/tech-icons/typescript.svg',
  'assets/tech-icons/html5.svg',
  'assets/tech-icons/css3.svg',
  'assets/tech-icons/git.svg',
  'assets/tech-icons/docker.svg'
];

const loadedImages = [];
let imagesLoaded = 0;

function preloadImages(callback) {
  if (techIcons.length === 0) {
    callback();
    return;
  }

  techIcons.forEach((src, index) => {
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === techIcons.length) {
        callback();
      }
    };
    img.onerror = () => {
      console.warn(`Failed to load icon: ${src}`);
      imagesLoaded++;
      if (imagesLoaded === techIcons.length) {
        callback();
      }
    };
    img.src = src;
    loadedImages[index] = img;
  });
}

class Particle {
  constructor(x, y, forceDot = false) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.vx = Math.random() - 0.5;
    this.vy = Math.random() - 0.5;

    this.isIcon = !forceDot && Math.random() < 0.3 && loadedImages.length > 0;

    if (this.isIcon) {
      this.iconIndex = Math.floor(Math.random() * loadedImages.length);
      this.size = 20;
    } else {
      this.radius = 2;
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    if (this.isIcon && loadedImages[this.iconIndex]) {
      ctx.save();
      ctx.filter = 'brightness(0) invert(1)';
      ctx.drawImage(
        loadedImages[this.iconIndex],
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("click", (event) => {
  particles.push(new Particle(event.clientX, event.clientY, true));
});

window.addEventListener("touchend", (event) => {
  particles.push(
    new Particle(
      event.changedTouches[0].clientX,
      event.changedTouches[0].clientY,
      true
    )
  );
});

preloadImages(() => {
  initParticles();
  animate();
});
