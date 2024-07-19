const canvas = document.getElementById('gardenCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flowers = [];
const butterflies = [];
const flowerColors = ['#FF69B4', '#FFD700', '#FF4500', '#8A2BE2', '#00FF00'];
const butterflyColors = ['#FF6347', '#FF8C00', '#1E90FF', '#9370DB', '#00FA9A'];

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.maxSize = Math.random() * 20 + 30;
        this.growthSpeed = Math.random() * 0.5 + 0.5;
        this.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    grow() {
        if (this.size < this.maxSize) {
            this.size += this.growthSpeed;
        }
    }
}

class Butterfly {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 10;
        this.color = butterflyColors[Math.floor(Math.random() * butterflyColors.length)];
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size / 2, this.angle, 0, Math.PI * 2);
        ctx.fill();
    }

    fly() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.angle += Math.PI;
        }
    }
}

function init() {
    animate();
}

function addFlower() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    flowers.push(new Flower(x, y));
}

function addButterfly() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    butterflies.push(new Butterfly(x, y));
}

function drawGarden() {
    flowers.forEach(flower => {
        flower.draw();
        flower.grow();
    });

    butterflies.forEach(butterfly => {
        butterfly.draw();
        butterfly.fly();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGarden();
    requestAnimationFrame(animate);
}

document.getElementById('addFlower').addEventListener('click', addFlower);
document.getElementById('clearGarden').addEventListener('click', () => {
    flowers.length = 0;
    butterflies.length = 0;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

for (let i = 0; i < 5; i++) {
    addButterfly();
}

init();
