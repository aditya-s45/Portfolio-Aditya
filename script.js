/**
 * script.js — Aditya Shingare Portfolio
 * Particles, typing animation, scroll reveals, stat counters, nav, card tilt
 */

// ── 1. Particle Canvas Background ──────────────────────────────────────────
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const mouse = { x: null, y: null };
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.3 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const angle = Math.atan2(dy, dx);
                    const push = (100 - dist) * 0.015;
                    this.x -= Math.cos(angle) * push;
                    this.y -= Math.sin(angle) * push;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 200, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 200, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ── 2. Terminal Typing Animation ───────────────────────────────────────────
function initTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    const lines = [
        { prompt: '$ ', command: 'whoami', type: 'command' },
        { output: 'Aditya Shingare', type: 'output' },
        { empty: true },
        { prompt: '$ ', command: 'cat tagline.txt', type: 'command' },
        { output: 'Expert @ Codeforces · 4★ @ CodeChef · Full-Stack Developer', type: 'output' },
        { empty: true },
        { prompt: '$ ', command: 'cat about.txt', type: 'command' },
        { output: 'B.Tech IT @ IIIT Lucknow | 1000+ Problems Solved | Building cool stuff.', type: 'output' }
    ];

    setTimeout(async () => {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineEl = document.createElement('div');
            lineEl.className = 'terminal-line';
            terminalBody.appendChild(lineEl);

            if (line.empty) {
                lineEl.innerHTML = '&nbsp;';
                await new Promise(r => setTimeout(r, 100));
            } else if (line.type === 'command') {
                const promptSpan = document.createElement('span');
                promptSpan.className = 'terminal-prompt';
                promptSpan.textContent = line.prompt;
                lineEl.appendChild(promptSpan);

                const cmdSpan = document.createElement('span');
                cmdSpan.className = 'terminal-command';
                lineEl.appendChild(cmdSpan);

                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '';
                lineEl.appendChild(cursor);

                for (let j = 0; j < line.command.length; j++) {
                    cmdSpan.textContent += line.command[j];
                    await new Promise(r => setTimeout(r, 40));
                }
                cursor.remove();
                await new Promise(r => setTimeout(r, 300));
            } else if (line.type === 'output') {
                const promptSpan = document.createElement('span');
                promptSpan.className = 'terminal-prompt';
                promptSpan.textContent = '> ';
                lineEl.appendChild(promptSpan);

                const outSpan = document.createElement('span');
                outSpan.className = 'terminal-output';
                lineEl.appendChild(outSpan);

                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '';
                lineEl.appendChild(cursor);

                for (let j = 0; j < line.output.length; j++) {
                    outSpan.textContent += line.output[j];
                    await new Promise(r => setTimeout(r, 20));
                }
                if (i !== lines.length - 1) {
                    cursor.remove();
                }
                await new Promise(r => setTimeout(r, 300));
            }
        }
    }, 500);
}

// ── 3. Scroll Reveal Animation ─────────────────────────────────────────────
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ── 4. Animated Stat Counters ──────────────────────────────────────────────
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const aboutSection = document.getElementById('about');

    if (!aboutSection || stats.length === 0) return;

    let animated = false;

    const animateStats = () => {
        if (animated) return;
        animated = true;

        stats.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const start = performance.now();

            const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

            const update = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const current = target * easeOutExpo(progress);

                if (isDecimal) {
                    stat.textContent = current.toFixed(2) + suffix;
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    stat.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
                }
            };
            requestAnimationFrame(update);
        });
    };

    const observer = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
            animateStats();
            obs.unobserve(entries[0].target);
        }
    }, { threshold: 0.2 });

    observer.observe(aboutSection);
}

// ── 5. Navigation Features ─────────────────────────────────────────────────
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Scroll spy + navbar state
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.classList.add('active');
            } else {
                if (navLink) navLink.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }
}

// ── 6. Project Card Hover Tilt Effect ──────────────────────────────────────
function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 1024) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            card.style.transition = 'none';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.transition = 'transform 0.5s ease, background-color 0.3s ease, box-shadow 0.3s ease';
        });
    });
}

// ── 7. Initialization ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTerminal();
    initScrollReveal();
    initStatCounters();
    initNavigation();
    initProjectCards();
});
