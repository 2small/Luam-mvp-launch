/* Language toggle for blog posts. Shares the homepage choice. Nothing leaves the device. */
(function () {
  'use strict';
  var wraps = document.querySelectorAll('[data-l]');
  var btns = document.querySelectorAll('[data-lang]');
  function set(l) {
    wraps.forEach(function (w) { w.hidden = w.getAttribute('data-l') !== l; });
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false'); });
    document.documentElement.setAttribute('lang', l === 'sw' ? 'sw' : 'en');
  }
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var l = b.getAttribute('data-lang');
      set(l);
      try { localStorage.setItem('lq_lang', l); } catch (e) { /* ignore */ }
    });
  });
  var saved = 'en';
  try { var s = localStorage.getItem('lq_lang'); if (s === 'sw' || s === 'en') saved = s; } catch (e) { /* ignore */ }
  set(saved);
})();
