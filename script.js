const canvas = document.getElementById("bubbles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubblesArray = [];

// Blasen-Klasse
class Bubble {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.glow = 10; // Glow-Effekt
    }

    // Zeichne Blase mit Glow-Effekt
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        // Glow-Effekt
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glow;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Aktualisiere Blasen-Position
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Randkollision
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        // Blasen verschmelzen, wenn sie sich berühren
        bubblesArray.forEach((otherBubble) => {
            if (this !== otherBubble) {
                const dx = this.x - otherBubble.x;
                const dy = this.y - otherBubble.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.radius + otherBubble.radius) {
                    // Physikalisch korrektes Verschmelzen
                    const newRadius = Math.sqrt(this.radius * this.radius + otherBubble.radius * otherBubble.radius);
                    this.radius = newRadius;
                    otherBubble.radius = 0; // Entferne die andere Blase
                }
            }
        });
    }
}

// Erstelle Blasen
function createBubbles() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 50 + 20; // Zufällige Größe
    const color = `rgba(138, 43, 226, ${Math.random() * 0.5 + 0.3})`; // Violette Farbe
    const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
    };
    bubblesArray.push(new Bubble(x, y, radius, color, velocity));
}

// Animations-Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Erstelle kontinuierlich neue Blasen
    if (bubblesArray.length < 30) {
        createBubbles();
    }

    // Zeichne und aktualisiere Blasen
    bubblesArray.forEach((bubble, index) => {
        bubble.update();
        bubble.draw();

        // Entferne Blasen, wenn sie zu klein sind
        if (bubble.radius <= 0) {
            bubblesArray.splice(index, 1);
        }
    });
}

animate();

// Fenstergröße anpassen
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
