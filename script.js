document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // Установка размера холста (адаптивно)
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Функция создания формы сердца
    function heartShape(t) {
        return {
            x: 16 * Math.pow(Math.sin(t), 3),
            y: - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        };
    }

    // Создание частиц
    const particles = [];
    for (let i = 0; i < 500; i++) {
        const angle = Math.random() * 2 * Math.PI;
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            target: heartShape(Math.random() * Math.PI * 2),
            vx: 0,
            vy: 0,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
    }

    // Обновление частиц
    function updateParticles() {
        particles.forEach(p => {
            const targetX = canvas.width / 2 + p.target.x * 15;
            const targetY = canvas.height / 2 - p.target.y * 15;
            p.vx += (targetX - p.x) * 0.01;
            p.vy += (targetY - p.y) * 0.01;
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.x += p.vx;
            p.y += p.vy;
        });
    }

    // Отрисовка
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    }

    // Основной цикл
    function loop() {
        updateParticles();
        draw();
        requestAnimationFrame(loop);
    }
    loop();
});
