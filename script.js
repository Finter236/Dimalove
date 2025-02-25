const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 500;
const heartShape = [];
const textParticles = [];
const timeParticles = [];
const TEXT = "42";
const TIME_TEXT = "11:11";

// Функция для создания сердца
function generateHeartShape() {
    for (let t = 0; t < Math.PI * 2; t += 0.01) {
        let x = 200 * (16 * Math.pow(Math.sin(t), 3));
        let y = -200 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        heartShape.push({ x: canvas.width / 2 + x, y: canvas.height / 2 + y });
    }
}

generateHeartShape();

// Генерация частиц
function generateParticles() {
    for (let i = 0; i < numParticles; i++) {
        let target = heartShape[Math.floor(Math.random() * heartShape.length)];
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: target.x,
            targetY: target.y,
            color: "white",
            state: "moving"
        });
    }
}

generateParticles();

// Функция анимации
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p) => {
        if (p.state === "moving") {
            p.x += (p.targetX - p.x) * 0.05;
            p.y += (p.targetY - p.y) * 0.05;
            if (Math.hypot(p.targetX - p.x, p.targetY - p.y) < 2) {
                p.state = "final";
            }
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(animate);
}

animate();
