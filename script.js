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

// ── 2. Typewriter Animation ───────────────────────────────────────────────
function initTypewriter() {
    const textEl = document.getElementById('typewriter-text');
    if (!textEl) return;

    const phrases = [
        "Building scalable enterprise systems.",
        "Engineering real-time web platforms.",
        "Developing AI & Web3 applications.",
        "Turning caffeine into clean code."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30; // Delete faster
        } else {
            textEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 60; // Type normal
        }

        let delay = typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 2000; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500; // Pause before next phrase
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 1000);
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
    initTypewriter();
    initScrollReveal();
    initStatCounters();
    initNavigation();
    initProjectCards();
});
