/* ================================================
   WEVERTON COELHO — PORTFOLIO
   JavaScript Principal
   ================================================ */

'use strict';

/* ---- LOADER ---- */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            // Animar entrada dos elementos Home
            triggerHomeAnimations();
        }
    }, 1900);
});

/* ---- CURSOR PERSONALIZADO ---- */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .goal-card, .social-pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        if (cursorFollower) cursorFollower.style.opacity = '.3';
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        if (cursorFollower) cursorFollower.style.opacity = '.6';
    });
});

/* ---- NAVBAR ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
    showBackToTop();
});

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('open');
        navLinks?.classList.remove('open');
    });
});

/* ---- ACTIVE NAV ---- */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

/* ---- PARTICLES (Home) ---- */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 20;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 6 + 2;
        p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 20 - 20}%;
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 8}s;
    `;
        container.appendChild(p);
    }
}
createParticles();

/* ---- HOME ANIMATIONS ---- */
function triggerHomeAnimations() {
    const homeItems = document.querySelectorAll('#home .reveal-up, #home .reveal-right');
    homeItems.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, i * 180);
    });
}

/* ---- COUNTER ANIMATION ---- */
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const start = performance.now();
        function update(time) {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }
        requestAnimationFrame(update);
    });
}

let countersAnimated = false;
function checkCounters() {
    if (countersAnimated) return;
    const stats = document.querySelector('.home-stats');
    if (!stats) return;
    const rect = stats.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
        countersAnimated = true;
        animateCounters();
    }
}

/* ---- SKILL BARS ---- */
function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width + '%';
    });
}

let skillsAnimated = false;
function checkSkills() {
    if (skillsAnimated) return;
    const section = document.getElementById('skills');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
        skillsAnimated = true;
        animateSkillBars();
    }
}

/* ---- INTERSECTION OBSERVER (Reveal) ---- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    // Home elements são controlados manualmente
    if (!el.closest('#home')) {
        revealObserver.observe(el);
    }
});

/* ---- SCROLL EVENTS ---- */
window.addEventListener('scroll', () => {
    checkSkills();
    checkCounters();
});

// Verificar na carga também
setTimeout(() => {
    checkSkills();
    checkCounters();
}, 2100);

/* ---- BACK TO TOP ---- */
const backToTop = document.getElementById('back-to-top');

function showBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-send');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;
    }
    setTimeout(() => {
        if (btn) {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            btn.disabled = false;
        }
        formSuccess?.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
            formSuccess?.classList.remove('show');
        }, 4000);
    }, 1500);
});

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ---- PARALLAX SUTIL NOS RINGS ---- */
window.addEventListener('mousemove', (e) => {
    const rings = document.querySelectorAll('.avatar-bg-ring');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    rings.forEach((ring, i) => {
        const factor = (i + 1) * 4;
        ring.style.transform = `rotate(${dx * factor}deg) rotate(${dy * factor}deg)`;
    });
});

/* ---- TYPING EFFECT no subtítulo ---- */
(function () {
    const words = [
        'Fullstack',
        'Front-end',
        'Back-end',
        'Web',
    ];
    const el = document.getElementById('typing-word');
    if (!el) return;

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
        const current = words[wordIdx];

        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(type, 2200);
                return;
            }
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                wordIdx = (wordIdx + 1) % words.length;
            }
        }
        setTimeout(type, deleting ? 60 : 90);
    }

    // Só roda após o loader sumir
    setTimeout(type, 2300);
})();

/* ---- PROJECT CARD TILT (efeito 3D) ---- */
function addTilt(cards) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -8;
            const rotY = ((x - cx) / cx) * 8;
            card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
addTilt(document.querySelectorAll('.project-card'));
