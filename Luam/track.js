/* Luam event tracker. No cookies, no IP, no names, no free text.
   Sends: event name, page path, a short label, a per-tab random id, referrer host, utm_source, device class, language.
   Skips: Do Not Track, Global Privacy Control, and any browser that opted out (localStorage lq_notrack=1).
   Use: add data-track="event_name" [data-track-label="x"] to any element, or call luamTrack('event_name','label'). */
(function () {
  'use strict';
  var C = window.LUAM_TRACK || {}, doc = document, nav = navigator;

  function off() {
    try { if (localStorage.getItem('lq_notrack') === '1') return true; } catch (e) { /* storage blocked */ }
    return nav.doNotTrack === '1' || window.doNotTrack === '1' || nav.globalPrivacyControl === true;
  }
  if (off() || /^\/?analytics\.html$/i.test(location.pathname.replace(/^.*\//, ''))) { window.luamTrack = function () {}; return; }

  /* ---------- context ---------- */
  var sid;
  try { sid = sessionStorage.getItem('lq_sid'); } catch (e) { /* ignore */ }
  if (!sid) {
    sid = Math.random().toString(36).slice(2, 10);
    try { sessionStorage.setItem('lq_sid', sid); } catch (e) { /* memory only */ }
  }
  var w = window.innerWidth || 1024;
  var dev = w < 640 ? 'm' : w < 1024 ? 't' : 'd';
  var lang = (doc.documentElement.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
  var path = location.pathname.replace(/index\.html$/i, '').slice(0, 120) || '/';
  var ref = '';
  try { var rh = new URL(doc.referrer).hostname.replace(/^www\./, ''); if (rh && rh !== location.hostname.replace(/^www\./, '')) ref = rh.slice(0, 60); } catch (e) { /* no referrer */ }
  var utm = '';
  try { utm = (new URLSearchParams(location.search).get('utm_source') || '').toLowerCase().replace(/[^a-z0-9_.-]/g, '').slice(0, 30); } catch (e) { /* ignore */ }

  /* ---------- queue ---------- */
  var q = [], timer = 0, MAX = 40;
  function clean(s, n) { return String(s == null ? '' : s).replace(/[\r\n\t]+/g, ' ').trim().slice(0, n); }

  function track(name, label) {
    name = clean(name, 40).toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!name) return;
    q.push({ e: name, p: path, l: clean(label, 60), s: sid, r: ref, u: utm, d: dev, g: lang, t: Date.now() });
    if (q.length >= MAX) flush(); else if (!timer) timer = setTimeout(flush, 2500);
  }
  window.luamTrack = track;

  function flush() {
    clearTimeout(timer); timer = 0;
    if (!q.length) return;
    var batch = q.splice(0, MAX);
    if (!C.endpoint) { local(batch); return; }
    var body = JSON.stringify({ k: C.token || '', ev: batch });
    // no-cors + no cookies: the reply is never read, so Google's redirect cannot raise a CORS error. keepalive lets it finish as the page closes.
    try {
      fetch(C.endpoint, { method: 'POST', mode: 'no-cors', credentials: 'omit', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: body });
      return;
    } catch (e) { /* fall through */ }
    try { nav.sendBeacon && nav.sendBeacon(C.endpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' })); } catch (e) { /* drop */ }
  }

  /* No endpoint yet: keep the last 500 events in this browser so analytics.html can show them. */
  function local(batch) {
    try {
      var all = JSON.parse(localStorage.getItem('lq_trk_buf') || '[]').concat(batch);
      localStorage.setItem('lq_trk_buf', JSON.stringify(all.slice(-500)));
    } catch (e) { /* storage blocked */ }
  }

  doc.addEventListener('visibilitychange', function () { if (doc.visibilityState === 'hidden') flush(); });
  window.addEventListener('pagehide', flush);

  /* ---------- automatic events ---------- */
  track('page_view');

  var deep = false;
  function onScroll() {
    if (deep) return;
    var h = doc.documentElement, max = h.scrollHeight - window.innerHeight;
    if (max > 400 && (window.pageYOffset || h.scrollTop) / max >= 0.75) { deep = true; track('scroll_75'); window.removeEventListener('scroll', onScroll); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- click rules ----------
     Explicit data-track always wins. The rules below catch links nobody tagged. */
  function rule(a) {
    var href = a.getAttribute('href') || '';
    if (/^tel:/i.test(href)) return ['call_click', href.replace(/^tel:/i, '').replace(/[^\d+]/g, '').slice(0, 15)];
    if (/^mailto:/i.test(href)) return ['email_click', ''];
    if (/(^|\/\/)(wa\.me|api\.whatsapp\.com)/i.test(href)) return ['whatsapp_click', ''];
    if (/emergency\.html/i.test(href)) return ['emergency_click', ''];
    if (/servicebooking\.html/i.test(href)) return ['booking_click', ''];
    var m = href.match(/blog\/([a-z0-9-]+)\.html/i);
    if (m) return ['blog_click', m[1]];
    if (/^https?:/i.test(href)) {
      try { var h = new URL(href, location.href).hostname.replace(/^www\./, ''); if (h !== location.hostname.replace(/^www\./, '')) return ['outbound_click', h]; } catch (e) { /* ignore */ }
    }
    return null;
  }

  doc.addEventListener('click', function (ev) {
    var t = ev.target && ev.target.closest ? ev.target.closest('[data-track], a[href]') : null;
    if (!t) return;
    var n = t.getAttribute('data-track');
    if (n) { track(n, t.getAttribute('data-track-label') || ''); return; }
    var r = rule(t);
    if (r) track(r[0], r[1]);
  }, true);
})();
