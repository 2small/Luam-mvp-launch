/* Luam navigation: one source for every page.
   Put  <script src="nav.js"></script>  where the old <header> and off-canvas menus were, and add nav.css to <head>.
   Edit LINKS below to change the menu everywhere. */
(function () {
  'use strict';
  var LINKS = [
    { t: 'Therapy', h: 'therapy.html' },
    { t: 'Mental health care', h: 'ClinicalPractice.html' },
    { t: 'Resources', sub: [
      { t: 'Blog', h: 'blog/index.html' },
      { t: 'Library', h: 'library.html' },
      { t: 'Events', h: 'events.html' },
      { t: 'Emergency', h: 'Emergency.html' }
    ] },
    { t: 'Help', h: 'index.html#help' }
  ];

  var here = location.pathname.replace(/^.*\//, '').toLowerCase() || 'index.html';
  function cur(h) { return h.split('#')[0].toLowerCase() === here && h.indexOf('#') < 0 ? ' aria-current="page"' : ''; }
  function a(l) { return '<a href="' + l.h + '"' + cur(l.h) + '>' + l.t + '</a>'; }

  var items = LINKS.map(function (l) {
    if (!l.sub) return '<li>' + a(l) + '</li>';
    return '<li class="lnav-group"><button type="button" aria-expanded="false">' + l.t + '</button><ul>' +
      l.sub.map(function (s) { return '<li>' + a(s) + '</li>'; }).join('') + '</ul></li>';
  }).join('');

  var html =
    '<header class="lnav"><div class="lnav-bar">' +
    '<a class="lnav-logo" href="index.html" aria-label="Luam home"><img src="images/luamline.png" alt="Luam"></a>' +
    '<button type="button" class="lnav-burger" aria-label="Open menu" aria-expanded="false" aria-controls="lnav-menu"><svg viewBox="0 0 16 16" aria-hidden="true"><rect y="1" width="16" height="2"/><rect y="7" width="16" height="2"/><rect y="13" width="16" height="2"/></svg></button>' +
    '<nav id="lnav-menu" class="lnav-menu" aria-label="Main"><ul>' + items + '</ul></nav>' +
    '</div><div class="lnav-scrim"></div></header>';

  var me = document.currentScript;
  if (me) me.insertAdjacentHTML('beforebegin', html); else document.body.insertAdjacentHTML('afterbegin', html);

  var root = document.querySelector('.lnav'), burger = root.querySelector('.lnav-burger');
  function setOpen(o) {
    root.classList.toggle('is-open', o);
    burger.setAttribute('aria-expanded', o);
    burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('lnav-lock', o);
  }
  burger.addEventListener('click', function () { setOpen(!root.classList.contains('is-open')); });
  root.querySelector('.lnav-scrim').addEventListener('click', function () { setOpen(false); });
  root.querySelectorAll('.lnav-group > button').forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.parentNode, o = !g.classList.contains('is-open');
      g.classList.toggle('is-open', o); b.setAttribute('aria-expanded', o);
    });
  });
  root.addEventListener('click', function (e) { if (e.target.closest('.lnav-menu a')) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setOpen(false);
    root.querySelectorAll('.lnav-group.is-open').forEach(function (g) { g.classList.remove('is-open'); g.firstChild.setAttribute('aria-expanded', 'false'); });
  });
})();
