/* ============================================================
   TRAVEL WITH SAADI — SHARED CINEMATIC JS ENHANCEMENTS
   ============================================================ */
(function () {
    'use strict';

    /* ── Page Transition ── */
    var overlay = document.getElementById('page-transition');

    function showOverlayThen(href) {
        if (!overlay) { window.location.href = href; return; }
        overlay.classList.add('out');
        setTimeout(function () { window.location.href = href; }, 480);
    }

    if (overlay) {
        /* Reveal on entry */
        overlay.classList.add('in');
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                overlay.classList.remove('in');
                overlay.classList.add('done');
            });
        });

        /* Intercept internal navigation */
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href]');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') ||
                href.startsWith('mailto') || href.startsWith('tel') ||
                link.target === '_blank' || e.ctrlKey || e.metaKey) return;
            e.preventDefault();
            showOverlayThen(href);
        });
    }

    /* ── Scroll progress bar ── */
    var progressBar = document.getElementById('scroll-progress');
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        var total = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar && total > 0) progressBar.style.width = ((window.scrollY / total) * 100) + '%';
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ── Cursor glow ── */
    var glow = document.getElementById('cursorGlow');
    if (glow) {
        document.addEventListener('mousemove', function (e) {
            glow.style.left = e.clientX + 'px';
            glow.style.top  = e.clientY + 'px';
        }, { passive: true });
    }

    /* ── Reveal on scroll ── */
    var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal-up').forEach(function (el) { revealObs.observe(el); });

    /* ── Section title underline ── */
    var titleObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('animated');
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.section-title-animated').forEach(function (el) { titleObs.observe(el); });

    /* ── Animated counter ── */
    function animateCount(el) {
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '';
        var duration = 2000;
        var start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    var counterObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.dataset.done) {
                entry.target.dataset.done = '1';
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter-value').forEach(function (el) { counterObs.observe(el); });

    /* ── Hero floating particles ── */
    var hero = document.querySelector('.hero-header');
    if (hero) {
        function spawnParticle() {
            var p = document.createElement('div');
            p.className = 'hero-particle';
            var size = Math.random() * 18 + 5;
            p.style.cssText = [
                'width:' + size + 'px', 'height:' + size + 'px',
                'left:' + (Math.random() * 100) + '%',
                'animation-duration:' + (Math.random() * 12 + 8) + 's',
                'animation-delay:' + (Math.random() * 3) + 's',
                'opacity:' + (Math.random() * 0.25 + 0.05)
            ].join(';');
            hero.appendChild(p);
            setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 25000);
        }
        for (var i = 0; i < 10; i++) setTimeout(spawnParticle, i * 200);
        setInterval(spawnParticle, 1800);
    }

    /* ── 3D tilt on cards (desktop only) ── */
    var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (!isTouch) {
        document.querySelectorAll('.dest-cine-card, .svc-cine-card, .about-img-3d, .package-item').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                var rx = ((e.clientY - r.top)  - r.height / 2) / (r.height / 2) * -4;
                var ry = ((e.clientX - r.left) - r.width  / 2) / (r.width  / 2) *  4;
                card.style.transition = 'transform 0.08s linear';
                card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(8px)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transition = 'transform 0.55s cubic-bezier(0.25,0.8,0.25,1)';
                card.style.transform = '';
            });
        });
    }

    /* ── Stagger destination cards on load ── */
    document.querySelectorAll('.dest-cine-card').forEach(function (card, idx) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(function () {
            card.style.opacity = '';
            card.style.transform = '';
        }, 300 + idx * 80);
    });

    /* ── Logo tilt on hover ── */
    var logoLink = document.querySelector('.brand-logo-link');
    var logoImg  = document.querySelector('.logo-img');
    if (logoLink && logoImg && !isTouch) {
        logoLink.addEventListener('mousemove', function (e) {
            var r = logoLink.getBoundingClientRect();
            var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            var angleX = ((e.clientY - cy) / 30).toFixed(1);
            var angleY = ((e.clientX - cx) / 30).toFixed(1);
            logoImg.style.transform = 'rotateX(' + (-angleX) + 'deg) rotateY(' + angleY + 'deg) scale(1.1)';
        });
        logoLink.addEventListener('mouseleave', function () {
            logoImg.style.transform = '';
        });
    }

    /* ── Smooth scroll for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();
