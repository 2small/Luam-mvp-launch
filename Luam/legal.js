/* Luam legal pages: shared behaviour. Everything that repeats across Privacy, Terms and Disclaimer lives here.
   - SITE: contact details, written once. Any element with data-site="email|phone|city" is filled from it.
   - DOCS: the three legal pages. Add a page here and it appears in the tabs and the footer.
   - The contents list is built from the <h2> of each <section id> inside .lg-body. */
(function () {
  'use strict';
  var SITE = { email: 'hello@luam.co.ke', phone: '+254 113 111 931', phoneHref: '+254113111931', city: 'Nairobi, Kenya', year: '2026' };
  var DOCS = [
    { t: 'Privacy', h: 'Privacy.html' },
    { t: 'Terms', h: 'Terms.html' },
    { t: 'Disclaimer', h: 'disclaimer.html' }
  ];
  var MORE = [
    { t: 'Blog', h: 'FromLuam.html' },
    { t: 'Emergency', h: 'Emergency.html' },
    { t: 'Help', h: 'index.html#help' }
  ];

  var here = location.pathname.replace(/^.*\//, '').toLowerCase();
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function link(l, cur) { return '<a href="' + l.h + '"' + (cur && l.h.toLowerCase() === here ? ' aria-current="page"' : '') + '>' + l.t + '</a>'; }

  /* contact details */
  $$('[data-site]').forEach(function (el) {
    var k = el.getAttribute('data-site');
    if (k === 'email') { el.textContent = SITE.email; if (el.tagName === 'A') el.href = 'mailto:' + SITE.email; }
    else if (k === 'phone') { el.textContent = SITE.phone; if (el.tagName === 'A') el.href = 'tel:' + SITE.phoneHref; }
    else if (SITE[k]) el.textContent = SITE[k];
  });

  /* tabs between the three documents */
  var tabs = $('#lg-tabs');
  if (tabs) tabs.innerHTML = DOCS.map(function (d) { return link(d, true); }).join('');

  /* footer */
  var foot = $('#lg-foot');
  if (foot) foot.innerHTML =
    '<div class="lg-wrap"><div class="lg-foot-grid">' +
    '<div>' + DOCS.map(function (d) { return link(d); }).join('') + '</div>' +
    '<div>' + MORE.map(function (d) { return link(d); }).join('') + '</div>' +
    '<div><p>Reach us: ' + SITE.email + '</p><p>' + SITE.phone + '</p><p>' + SITE.city + '</p></div></div>' +
    '<p class="lg-fine">' + SITE.year + ' Luam. Patterns of mind. This site does not replace emergency medical care.</p></div>';

  /* contents list */
  var body = $('.lg-body'), holder = $('#lg-toc');
  if (!body || !holder) return;
  var secs = $$('.lg-body > section[id]');
  if (secs.length < 3) { holder.hidden = true; return; }
  holder.innerHTML = '<nav class="lg-toc" aria-label="On this page"><details><summary>On this page</summary><ol>' +
    secs.map(function (s) { return '<li><a href="#' + s.id + '">' + $('h2', s).textContent + '</a></li>'; }).join('') + '</ol></details></nav>';
  var det = $('details', holder), wide = window.matchMedia('(min-width: 992px)');
  function sync() { det.open = wide.matches; $('summary', det).style.pointerEvents = wide.matches ? 'none' : ''; }
  sync(); (wide.addEventListener ? wide.addEventListener('change', sync) : wide.addListener(sync));

  /* mark the section being read */
  var links = {}; $$('a', holder).forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        $$('a[aria-current]', holder).forEach(function (a) { a.removeAttribute('aria-current'); });
        links[e.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-90px 0px -65% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }
  /* close the phone contents list after choosing a section */
  holder.addEventListener('click', function (e) { if (e.target.closest('a') && !wide.matches) det.open = false; });
})();
