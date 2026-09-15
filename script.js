/* ============================================
   SUJAL DEV — Portfolio Script
   Progressive enhancement only.
   All content is static HTML — this adds:
   - Theme toggle (dark/light)
   - Scroll-reveal animations
   - Mobile menu toggle
   - Sticky nav shadow
   ============================================ */

(function () {
  'use strict';

  /* ---------- Theme Toggle ---------- */
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // Apply saved preference on load
  const saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      let next;
      if (current === 'dark') {
        next = 'light';
      } else if (current === 'light') {
        next = 'dark';
      } else {
        // No explicit theme set — check system preference
        next = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
      }
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Mobile Menu Toggle ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.querySelector('.topnav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    var navLinks = nav.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Sticky Nav Shadow ---------- */
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

})();
