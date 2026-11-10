/* Luam Library: shelf tabs with scroll-spy, pillar filter, saved list, rail arrows, Surprise me, spiral field.
   No dependencies. The page is fully readable without this file. Saved items stay in this browser only. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('lb-js');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || doc).querySelectorAll(s)); };

  /* ---------- state ---------- */
  var cards = $$('.lb-card');
  var state = { pillar: 'all', savedOnly: false };
  var saved = {};
  try { JSON.parse(localStorage.getItem('lq_lib') || '[]').forEach(function (id) { saved[id] = 1; }); } catch (e) { saved = {}; }
  function persist() { try { localStorage.setItem('lq_lib', JSON.stringify(Object.keys(saved))); } catch (e) { /* storage blocked: still works this visit */ } }

  var tbR = $('#lb-tb-r'), sel = $('#lb-pillar'), svBtn = $('#lb-saved'), svN = $('#lb-sn');
  var live = $('#lb-count'), toast = $('#lb-toast'), surprise = $('#lb-surprise');
  if (tbR) tbR.hidden = false;
  if (surprise) surprise.hidden = false;
  $$('.lb-arrows').forEach(function (a) { a.hidden = false; });

  function savedCount() { return Object.keys(saved).length; }
  function syncSaveUI() {
    cards.forEach(function (c) {
      var b = $('.lb-save', c); if (!b) return;
      var on = !!saved[b.getAttribute('data-id')];
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('aria-label', (on ? 'Remove from saved: ' : 'Save ') + b.getAttribute('data-t'));
    });
    if (svN) svN.textContent = savedCount();
  }

  function apply(announce) {
    var shown = 0;
    cards.forEach(function (c) {
      var b = $('.lb-save', c), id = b && b.getAttribute('data-id');
      var ok = (state.pillar === 'all' || c.getAttribute('data-p') === state.pillar) && (!state.savedOnly || (id && saved[id]));
      c.hidden = !ok; if (ok) shown++;
    });
    $$('.lb-shelf').forEach(function (s) {
      var any = !!$('.lb-card:not([hidden])', s);
      $('.lb-rail', s).hidden = !any; $('.lb-empty', s).hidden = any;
      var d = $('.lb-disc', s); if (d) d.parentNode.hidden = !any;
      var ar = $('.lb-arrows', s); if (ar) ar.style.visibility = any ? '' : 'hidden';
      railState(s);
    });
    if (announce && live) {
      live.textContent = state.savedOnly && !savedCount() ? 'Nothing saved yet.' : 'Showing ' + shown + ' of ' + cards.length + ' items.';
    }
  }

  if (sel) sel.addEventListener('change', function () { state.pillar = sel.value; if (state.pillar !== 'all' && window.luamTrack) luamTrack('library_filter', state.pillar); apply(true); });
  if (svBtn) svBtn.addEventListener('click', function () {
    state.savedOnly = !state.savedOnly;
    svBtn.setAttribute('aria-pressed', state.savedOnly ? 'true' : 'false');
    apply(true);
    if (state.savedOnly && !savedCount()) showToast('Tap the bookmark on anything to keep it here. Saved on this device only.');
  });
  doc.addEventListener('click', function (e) {
    var sv = e.target.closest('.lb-save');
    if (sv) {
      var id = sv.getAttribute('data-id');
      if (saved[id]) delete saved[id]; else { saved[id] = 1; if (window.luamTrack) luamTrack('library_save', id); }
      persist(); syncSaveUI();
      if (state.savedOnly) apply(true);
      return;
    }
    if (e.target.closest('[data-reset]')) {
      state.pillar = 'all'; state.savedOnly = false;
      if (sel) sel.value = 'all';
      if (svBtn) svBtn.setAttribute('aria-pressed', 'false');
      apply(true);
    }
  });

  /* ---------- toast + Surprise me ---------- */
  var tt;
  function showToast(html, action) {
    if (!toast) return;
    toast.innerHTML = '<span></span>';
    $('span', toast).innerHTML = html;
    if (action) { var b = doc.createElement('button'); b.type = 'button'; b.textContent = action.label; b.addEventListener('click', action.fn); toast.appendChild(b); }
    toast.hidden = false; clearTimeout(tt); tt = setTimeout(function () { toast.hidden = true; }, 7000);
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pick() {
    var pool = cards.filter(function (c) { return !c.hidden; });
    if (!pool.length) { showToast('Nothing to pick from. Clear the filter first.'); return; }
    var c = pool[Math.floor(Math.random() * pool.length)];
    var h = $('.lb-pt, h3, .lb-sw', c), shelf = $('h2', c.closest('.lb-shelf'));
    c.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center', inline: 'center' });
    c.classList.remove('lb-hit'); void c.offsetWidth; c.classList.add('lb-hit');
    showToast('Try <b>' + esc(h ? h.textContent : '') + '</b> <span style="color:#b9c7c4">in ' + esc(shelf ? shelf.textContent : '') + '</span>', { label: 'Another', fn: pick });
  }
  if (surprise) surprise.addEventListener('click', function () { if (window.luamTrack) luamTrack('library_surprise'); pick(); });

  /* ---------- rails: arrows + edge state ---------- */
  function railState(shelf) {
    var r = $('.lb-rail', shelf), ar = $$('.lb-arr', shelf);
    if (!r || !ar.length) return;
    ar[0].disabled = r.scrollLeft <= 4;
    ar[1].disabled = r.scrollLeft + r.clientWidth >= r.scrollWidth - 4;
  }
  $$('.lb-shelf').forEach(function (s) {
    var r = $('.lb-rail', s), t = 0;
    r.addEventListener('scroll', function () { if (t) return; t = requestAnimationFrame(function () { t = 0; railState(s); }); }, { passive: true });
    $$('.lb-arr', s).forEach(function (b) {
      b.addEventListener('click', function () {
        var c = $('.lb-card:not([hidden])', r), step = (c ? c.getBoundingClientRect().width + 16 : 300) * 2;
        r.scrollBy({ left: step * parseInt(b.getAttribute('data-dir'), 10), behavior: reduce ? 'auto' : 'smooth' });
      });
    });
    railState(s);
  });
  window.addEventListener('resize', function () { $$('.lb-shelf').forEach(railState); });

  /* ---------- scroll-spy on the shelf tabs ---------- */
  var tabs = $$('#lb-tabs a');
  function setTab(id) {
    tabs.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      if (on) { var box = a.parentNode; box.scrollTo({ left: a.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' }); }
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) setTab(en.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.lb-shelf').forEach(function (s) { io.observe(s); });
  }
  var tbw = $('#lb-tbw');
  function measure() { if (tbw) root.style.setProperty('--tb', tbw.offsetHeight + 'px'); }
  measure(); window.addEventListener('resize', measure);

  syncSaveUI(); apply(false);

  /* ---------- spiral field ----------
     Golden-angle spirals on a grid, slowly turning. Strongest in the hero, it settles back behind the shelves
     and drifts with the scroll, so it frames the content instead of competing with it. */
  var canvas = $('#fractal-bg');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var mouse = { x: -9999, y: -9999 }, cur = { x: -9999, y: -9999 };
  var SP = 300, SC = 6, N = 800, R = SC * Math.sqrt(N) + 4;
  var sprite = doc.createElement('canvas'); sprite.width = sprite.height = Math.ceil(R * 2);
  (function () {
    var s = sprite.getContext('2d'); s.translate(R, R); s.fillStyle = 'rgba(148, 234, 220, 0.2)';
    for (var i = 0; i < N; i++) { var a = i * 137.5 * Math.PI / 180, r = SC * Math.sqrt(i); s.beginPath(); s.arc(r * Math.cos(a), r * Math.sin(a), 3, 0, Math.PI * 2); s.fill(); }
  })();
  function resize() { w = innerWidth; h = innerHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  window.addEventListener('resize', resize); resize();
  window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  var last = 0;
  function frame(t) {
    var sy = window.scrollY || 0, k = Math.min(1, sy / (h * 0.85));
    canvas.style.opacity = (1 - 0.72 * k).toFixed(3);
    if (k > 0.98 && t - last < 33) { schedule(); return; }  /* ~30fps behind the shelves */
    last = t;
    ctx.clearRect(0, 0, w, h);
    var ang = (t * 0.00005) % (2 * Math.PI), off = (sy * 0.12) % SP;
    for (var y = -SP - off; y < h + SP; y += SP) {
      for (var x = -SP; x < w + SP; x += SP) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.drawImage(sprite, -R, -R); ctx.restore(); }
    }
    cur.x += (mouse.x - cur.x) * 0.08; cur.y += (mouse.y - cur.y) * 0.08;
    var g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, 200);
    g.addColorStop(0, 'rgba(255, 193, 94, 0.2)'); g.addColorStop(1, 'rgba(255, 193, 94, 0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    if (!reduce) schedule();
  }
  var running = false;
  function schedule() { if (!doc.hidden) requestAnimationFrame(frame); else running = false; }
  doc.addEventListener('visibilitychange', function () { if (!doc.hidden && !reduce) requestAnimationFrame(frame); });
  if (reduce) window.addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true });
  requestAnimationFrame(frame);
})();
