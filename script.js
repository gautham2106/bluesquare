/* ============================================================
   BLUESQUARE TECHNOLOGIES – Main Script
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navbar: scroll shadow + active state ---- */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- Scroll-reveal animations ---- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .sector-card, .why-item, .about-card, .stat, .meta-item'
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) {
      el.classList.add('reveal-pending');
      io.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealTargets.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---- Contact form: client-side validation + simulated submit ---- */
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name   = form.querySelector('#name');
      const org    = form.querySelector('#org');
      const phone  = form.querySelector('#phone');
      const sector = form.querySelector('#sector');

      let valid = true;

      [name, org, phone, sector].forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        }
      });

      if (!valid) {
        const firstError = form.querySelector('[style*="ef4444"]');
        if (firstError) firstError.focus();
        return;
      }

      // Disable button during "submit"
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled   = true;
      submitBtn.textContent = 'Sending…';

      // Simulate async submission (replace with real API call)
      setTimeout(function () {
        submitBtn.disabled   = false;
        submitBtn.textContent = originalText;
        successMsg.classList.add('show');
        form.reset();

        // Scroll success message into view
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide success after 8 seconds
        setTimeout(function () {
          successMsg.classList.remove('show');
        }, 8000);
      }, 1200);
    });

    // Clear individual field error on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
      });
    });
  }

  /* ---- Smooth active nav link highlight on scroll ---- */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    let currentId = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + currentId) {
        a.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

})();
