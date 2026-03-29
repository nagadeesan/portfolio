// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Mobile menu ──
const menuToggle = document.querySelector('.menu-toggle');
const navLinks   = document.querySelector('.nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// ── rAF-based smooth parallax ──
const heroText   = document.querySelector('.hero-text');
const heroImage  = document.querySelector('.hero-image');
const shapes     = document.querySelectorAll('.parallax-shape');

let currentScroll = 0;
let targetScroll  = 0;
const ease        = 0.08; // lower = smoother/slower lerp

function lerp(a, b, t) { return a + (b - a) * t; }

function parallaxLoop() {
    targetScroll = window.scrollY;
    currentScroll = lerp(currentScroll, targetScroll, ease);

    const s = currentScroll;
    const vh = window.innerHeight;

    if (s < vh * 1.2) {
        if (heroText)  heroText.style.transform  = `translateY(${s * 0.16}px)`;
        if (heroImage) heroImage.style.transform = `translateY(${s * 0.09}px)`;

        shapes.forEach((shape, i) => {
            const speeds = [0.22, 0.32, 0.13];
            const rotations = [20, 45, 30];
            const speed = speeds[i] || 0.2;
            const rot   = rotations[i] || 20;
            shape.style.transform = `translateY(${s * speed}px) rotate(${rot + s * 0.02}deg)`;
        });
    }

    requestAnimationFrame(parallaxLoop);
}
requestAnimationFrame(parallaxLoop);

// ── Staggered scroll-reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

// Cards with stagger delay
document.querySelectorAll('.skill-card').forEach((el, i) => {
    el.classList.add('reveal-card');
    el.style.transitionDelay = `${i * 0.1}s`;
    revealObserver.observe(el);
});

document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('reveal-card');
    el.style.transitionDelay = `${i * 0.12}s`;
    revealObserver.observe(el);
});

// Section titles and about body
document.querySelectorAll('.section-header, .about-body, .contact-left, .contact-form-wrapper, .stat').forEach(el => {
    el.classList.add('reveal-fade');
    revealObserver.observe(el);
});

// ── 3D Tilt: skill cards ──
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r  = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -10;
        const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  10;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// ── 3D Tilt: project cards ──
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r  = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6;
        const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// ── 3D Tilt: profile image ──
const imageWrapper = document.querySelector('.image-wrapper');
if (imageWrapper) {
    imageWrapper.addEventListener('mousemove', (e) => {
        const r  = imageWrapper.getBoundingClientRect();
        const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -8;
        const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  8;
        imageWrapper.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    imageWrapper.addEventListener('mouseleave', () => {
        imageWrapper.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}
