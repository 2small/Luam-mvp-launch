/* Luam homepage behaviour: scroll reveal, carousel, accordion, off-canvas menus. No dependencies. */
(function () {
  'use strict';

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  function show(el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.transitionDelay = d + 'ms';
    el.classList.add('is-visible');
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.target.offsetParent !== null) { show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(show);
  }

  /* ---- carousel ---- */
  var carousel = document.getElementById('carousel');
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.slide'));
    var interval = parseInt(carousel.getAttribute('data-interval'), 10) || 15000;
    var current = 0, timer = null;

    function go(n) {
      slides[current].classList.remove('is-active');
      current = (n + slides.length) % slides.length;
      var s = slides[current];
      s.classList.add('is-active', 'is-entering');
      s.addEventListener('animationend', function done() { s.classList.remove('is-entering'); s.removeEventListener('animationend', done); });
      s.querySelectorAll('[data-reveal]').forEach(function (el) {
        el.classList.remove('is-visible');
        void el.offsetWidth;
        show(el);
      });
    }
    function start() { stop(); timer = setInterval(function () { go(current + 1); }, interval); }
    function stop() { if (timer) clearInterval(timer); timer = null; }

    carousel.querySelectorAll('[data-slide-nav]').forEach(function (b) {
      b.addEventListener('click', function () { go(current + (b.getAttribute('data-slide-nav') === 'next' ? 1 : -1)); start(); });
    });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
  }

  /* ---- accordion (one open at a time, click again to close) ---- */
  var items = document.querySelectorAll('#faq .acc-item');
  items.forEach(function (item) {
    item.querySelector('.acc-link').addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      items.forEach(function (i) {
        i.classList.remove('is-open');
        i.querySelector('.acc-link').setAttribute('aria-selected', 'false');
      });
      if (!open) { item.classList.add('is-open'); item.querySelector('.acc-link').setAttribute('aria-selected', 'true'); }
    });
  });

  /* ---- off-canvas menus ---- */
  document.querySelectorAll('[data-menu-open]').forEach(function (b) {
    b.addEventListener('click', function () { document.getElementById(b.getAttribute('data-menu-open')).classList.remove('hidden'); });
  });
  document.querySelectorAll('[data-menu-close]').forEach(function (b) {
    b.addEventListener('click', function () { b.closest('[role="dialog"]').classList.add('hidden'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('[role="dialog"]').forEach(function (d) { d.classList.add('hidden'); });
  });
})();
