const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Partikel-Klasse
class Particle {
    constructor(x, y, size, color, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
    }

    // Zeichne Partikel
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Aktualisiere Partikel-Position
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Verkleinere Partikel über Zeit
        if (this.size > 0.2) this.size -= 0.1;
    }
}

// Erstelle Partikel
function createParticles() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 5 + 2;
    const color = `rgba(138, 43, 226, ${Math.random()})`; // Violette Farbe
    const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
    };
    particlesArray.push(new Particle(x, y, size, color, velocity));
}

// Animations-Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Erstelle kontinuierlich Partikel
    if (particlesArray.length < 100) {
        createParticles();
    }

    // Zeichne und aktualisiere Partikel
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Entferne Partikel, wenn sie zu klein sind
        if (particle.size <= 0.2) {
            particlesArray.splice(index, 1);
        }
    });
}

animate();

// Fenstergröße anpassen
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
