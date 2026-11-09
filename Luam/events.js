/* Luam events page. Reads window.LUAM_EVENTS (written daily by scripts/scan_events.py).
   Event text comes from the web, so it is only ever written with textContent, and links must be http(s). */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var data = window.LUAM_EVENTS || { events: [] };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var PAGE = 6;
  var IDS = { move: 'I move', connect: 'I connect', learn: 'I learn', reset: 'I reset' };
  var TZ = 'Africa/Nairobi';

  /* ---------- time helpers (all in Nairobi time) ---------- */
  var ymdF = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  var dayF = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' });
  var timeF = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true });
  var monF = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, month: 'short' });
  var dnF = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, day: 'numeric' });
  function dateOnly(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || ''); }
  function parse(s, end) {
    if (!s) return null;
    var d = dateOnly(s) ? new Date(s + (end ? 'T23:59:59+03:00' : 'T00:00:00+03:00')) : new Date(s);
    return isNaN(d) ? null : d;
  }
  function dayNum(d) { var p = ymdF.format(d).split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 864e5; }
  function norm(ev) {
    var s = parse(ev.start), e = parse(ev.end || ev.start, true);
    if (!s) return null;
    if (!e || e < s) e = new Date(s.getTime() + (dateOnly(ev.start) ? 864e5 - 1 : 2 * 36e5));
    return { s: s, e: e, allday: dateOnly(ev.start) };
  }
  function when(ev, t) {
    var sd = dayF.format(t.s), ed = dayF.format(t.e), same = dayNum(t.s) === dayNum(t.e);
    if (t.allday) return same ? sd : sd + ' to ' + ed;
    var tm = timeF.format(t.s).replace(' am', ' am').replace(/\./g, '');
    return same ? sd + ', ' + tm : sd + ' to ' + ed;
  }
  function rel(t, now) {
    var a = dayNum(t.s) - dayNum(now), b = dayNum(t.e) - dayNum(now);
    if (a < 0 && b >= 0) return 'on now';
    if (a === 0) return 'today';
    if (a === 1) return 'tomorrow';
    if (a > 1 && a <= 7) return 'in ' + a + ' days';
    return '';
  }
  function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : ''; }

  /* ---------- mood colour: the spiral and accents drift to the colour of the chosen identity ---------- */
  var MOODS = { all: [148, 234, 220], move: [159, 211, 86], connect: [255, 158, 138], learn: [108, 180, 255], reset: [185, 167, 255] };
  var curRGB = MOODS.all.slice(), tween = 0, recolor = null;
  function darkOf(c) { /* the mood colour's own hue, very dark: the ground the spiral sits on */
    var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, h = 0;
    if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = Math.round(h * 60); if (h < 0) h += 360; }
    return 'hsl(' + h + ',42%,12%)';
  }
  function applyRGB(c) { curRGB = c; root.style.setProperty('--acc', 'rgb(' + c.join(',') + ')'); root.style.setProperty('--ground', c === MOODS.all || (c[0] === 148 && c[1] === 234 && c[2] === 220) ? '#0c2a31' : darkOf(c)); if (recolor) recolor(c); }
  function setMood(name) {
    var to = MOODS[name] || MOODS.all;
    cancelAnimationFrame(tween);
    if (reduce) { applyRGB(to); return; }
    var from = curRGB.slice(), t0 = null;
    (function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / 700), e = k * (2 - k);
      applyRGB(from.map(function (f, i) { return Math.round(f + (to[i] - f) * e); }));
      if (k < 1) tween = requestAnimationFrame(step);
    })(performance.now());
  }

  /* ---------- state ---------- */
  var now = new Date();
  var events = (data.events || []).map(function (ev) { var t = norm(ev); return t && t.e >= now ? { ev: ev, t: t } : null; }).filter(Boolean)
    .sort(function (a, b) { return a.t.s - b.t.s; });
  var going = {};
  try { JSON.parse(localStorage.getItem('lq_ev_going') || '[]').forEach(function (id) { going[id] = 1; }); } catch (e) { going = {}; }
  function persist() { try { localStorage.setItem('lq_ev_going', JSON.stringify(Object.keys(going))); } catch (e) { /* storage blocked */ } }
  var st = { id: 'all', city: 'all', free: false, plans: false, shown: PAGE };

  var out = $('#ev-out'), emptyEl = $('#ev-empty'), moreBtn = $('#ev-more'), live = $('#ev-live'), toast = $('#lb-toast');
  var idsEl = $('#ev-ids'), tools = $('#ev-tools'), citySel = $('#ev-city'), freeBtn = $('#ev-free'), plansBtn = $('#ev-plans'), clearBtn = $('#ev-clear'), pn = $('#ev-pn');
  if (idsEl) idsEl.hidden = false;
  if (tools) tools.hidden = false;

  var upd = $('#ev-upd');
  if (upd && data.updated) {
    var u = parse(data.updated);
    upd.textContent = 'Last scan: ' + (u ? dayF.format(u) + ' ' + new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric' }).format(u) : data.updated) + '. ' + events.length + ' upcoming.';
  }
  var cities = {};
  events.forEach(function (x) { if (x.ev.online) cities.Online = 1; if (x.ev.city) cities[x.ev.city] = 1; });
  Object.keys(cities).sort().forEach(function (c) { var o = doc.createElement('option'); o.value = c; o.textContent = c; citySel.appendChild(o); });

  /* ---------- small DOM helpers ---------- */
  function el(tag, cls, text) { var n = doc.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function showToast(msg) {
    toast.textContent = msg; toast.hidden = false;
    clearTimeout(showToast.t); showToast.t = setTimeout(function () { toast.hidden = true; }, 5000);
  }

  /* ---------- calendar file + share ---------- */
  function ics(x) {
    var esc = function (s) { return String(s || '').replace(/\\/g, '\\\\').replace(/[,;]/g, '\\$&').replace(/\r?\n/g, '\\n'); };
    var z = function (d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Luam//Events//EN', 'BEGIN:VEVENT', 'UID:' + x.ev.id + '@luam.co.ke', 'DTSTAMP:' + z(new Date())];
    if (x.t.allday) {
      var nxt = new Date(x.t.e.getTime() + 1000), p = ymdF.format(nxt).replace(/-/g, '');
      lines.push('DTSTART;VALUE=DATE:' + x.ev.start.replace(/-/g, ''), 'DTEND;VALUE=DATE:' + p);
    } else lines.push('DTSTART:' + z(x.t.s), 'DTEND:' + z(x.t.e));
    lines.push('SUMMARY:' + esc(x.ev.title), 'LOCATION:' + esc([x.ev.venue, x.ev.city].filter(Boolean).join(', ')), 'URL:' + safeUrl(x.ev.url), 'DESCRIPTION:' + esc('Details: ' + safeUrl(x.ev.url) + ' (confirm with the organiser). Saved from luam.co.ke'), 'END:VEVENT', 'END:VCALENDAR');
    return lines.join('\r\n');
  }
  function download(x) {
    var b = new Blob([ics(x)], { type: 'text/calendar' }), a = doc.createElement('a');
    a.href = URL.createObjectURL(b); a.download = x.ev.id + '.ics'; doc.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    showToast('Saved. Open the file to add it to your calendar.');
  }
  function waLink(x) {
    var msg = "I'm going to " + x.ev.title + ' (' + when(x.ev, x.t) + '). Come with me? ' + safeUrl(x.ev.url);
    return 'https://wa.me/?text=' + encodeURIComponent(msg);
  }

  /* ---------- card ---------- */
  function card(x) {
    var ev = x.ev, li = el('li', 'ev-card' + (IDS[ev.category] ? ' ev-c-' + ev.category : '') + (going[ev.id] ? ' is-going' : '')); li.setAttribute('data-id', ev.id);
    var date = el('div', 'ev-date'); date.setAttribute('aria-hidden', 'true');
    date.appendChild(el('span', 'ev-d', dnF.format(x.t.s))); date.appendChild(el('span', 'ev-m', monF.format(x.t.s)));
    var body = el('div', 'ev-body');
    var tags = el('div', 'ev-tags');
    if (ev.free) tags.appendChild(el('span', 'ev-tag ev-free', 'Free'));
    if (IDS[ev.category]) tags.appendChild(el('span', 'ev-tag ev-id', IDS[ev.category]));
    tags.appendChild(ev.status === 'confirmed' ? el('span', 'ev-tag ev-ok', 'Confirmed') : el('span', 'ev-tag ev-un', 'Not yet confirmed'));
    body.appendChild(tags);
    body.appendChild(el('h3', '', ev.title));
    var r = rel(x.t, now), w = when(ev, x.t) + (r ? ' · ' + r : '');
    body.appendChild(el('p', 'ev-line', w));
    var parts = [ev.venue]; if (ev.city && (ev.venue || '').toLowerCase().indexOf(ev.city.toLowerCase()) < 0) parts.push(ev.city);
    var place = ev.online && !ev.city ? 'Online' : parts.filter(Boolean).join(', ') + (ev.online && ev.city ? ' (or online)' : '');
    if (place) body.appendChild(el('p', 'ev-line', place));
    if (!ev.free && ev.price) body.appendChild(el('p', 'ev-line', ev.price));
    if (ev.note) body.appendChild(el('p', 'ev-note' + (ev.sensitive ? ' ev-sens' : ''), ev.note));
    if (ev.status !== 'confirmed') body.appendChild(el('p', 'ev-note', 'We found this online. Check with the organiser before you go.'));
    var acts = el('div', 'ev-acts');
    var go = el('button', 'ev-go', "I'm going"); go.type = 'button'; go.setAttribute('aria-pressed', going[ev.id] ? 'true' : 'false'); go.setAttribute('data-act', 'go');
    go.setAttribute('aria-label', "I'm going to " + ev.title);
    acts.appendChild(go);
    var href = safeUrl(ev.url);
    if (href) { var a = el('a', 'ev-link', 'Details'); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.appendChild(el('span', 'lb-sr', ' (opens in a new tab)')); a.insertAdjacentText('beforeend', ' ↗'); acts.appendChild(a); }
    body.appendChild(acts);
    var after = el('div', 'ev-after'); after.hidden = !going[ev.id];
    var cal = el('button', '', 'Add to calendar'); cal.type = 'button'; cal.setAttribute('data-act', 'cal'); after.appendChild(cal);
    if (href) { var wa = el('a', 'lb-go', 'Invite a friend'); wa.href = waLink(x); wa.target = '_blank'; wa.rel = 'noopener noreferrer'; after.appendChild(wa); }
    body.appendChild(after);
    var src = ev.source ? 'Found on ' + ev.source + (ev.found ? ', ' + ev.found : '') : '';
    if (src) body.appendChild(el('p', 'ev-src', src));
    li.appendChild(date); li.appendChild(body);
    return li;
  }

  /* ---------- filter + render ---------- */
  function match(x) {
    var ev = x.ev;
    if (st.plans && !going[ev.id]) return false;
    if (st.id !== 'all' && ev.category !== st.id) return false;
    if (st.free && !ev.free) return false;
    if (st.city !== 'all' && !(st.city === 'Online' ? ev.online : ev.city === st.city)) return false;
    return true;
  }
  function render(announce) {
    var list = events.filter(match), shown = list.slice(0, st.shown);
    out.textContent = '';
    var groups = [['This week', []], ['Coming up', []]];
    shown.forEach(function (x) { (dayNum(x.t.s) - dayNum(now) <= 7 ? groups[0][1] : groups[1][1]).push(x); });
    groups.forEach(function (g) {
      if (!g[1].length) return;
      var h = el('h2', 'ev-grp', g[0]); out.appendChild(h);
      var ul = el('ul', 'ev-list'); ul.setAttribute('role', 'list');
      g[1].forEach(function (x) { ul.appendChild(card(x)); });
      out.appendChild(ul);
    });
    emptyEl.hidden = list.length > 0;
    if (!list.length && !events.length) { emptyEl.querySelector('h2').textContent = 'No upcoming events yet.'; emptyEl.querySelector('p').textContent = 'New ones are added every day. Know one? Use the form below.'; }
    moreBtn.hidden = list.length <= st.shown;
    if (!moreBtn.hidden) moreBtn.textContent = 'Show more (' + (list.length - st.shown) + ')';
    pn.textContent = Object.keys(going).length;
    clearBtn.hidden = st.id === 'all' && st.city === 'all' && !st.free && !st.plans;
    if (announce) live.textContent = list.length + (list.length === 1 ? ' event' : ' events') + ' found.';
  }
  function setFilter(fn) { fn(); st.shown = PAGE; syncUI(); setMood(st.id); render(true); }
  function syncUI() {
    [].forEach.call(idsEl.querySelectorAll('button'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-id') === st.id ? 'true' : 'false'); });
    freeBtn.setAttribute('aria-pressed', st.free ? 'true' : 'false');
    plansBtn.setAttribute('aria-pressed', st.plans ? 'true' : 'false');
    citySel.value = st.city;
  }
  function reset() { st.id = 'all'; st.city = 'all'; st.free = false; st.plans = false; st.shown = PAGE; syncUI(); setMood('all'); render(true); }

  idsEl.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var id = b.getAttribute('data-id');
    setFilter(function () { st.id = st.id === id ? 'all' : id; });
    var t = $('#list'); if (t && st.id !== 'all') t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });
  citySel.addEventListener('change', function () { setFilter(function () { st.city = citySel.value; }); });
  freeBtn.addEventListener('click', function () { setFilter(function () { st.free = !st.free; }); });
  plansBtn.addEventListener('click', function () {
    if (!st.plans && !Object.keys(going).length) { showToast('Tap "I\'m going" on an event to see it here. Saved on this device only.'); return; }
    setFilter(function () { st.plans = !st.plans; });
  });
  clearBtn.addEventListener('click', reset);
  moreBtn.addEventListener('click', function () { st.shown += PAGE; render(false); });
  doc.addEventListener('click', function (e) { if (e.target.closest('[data-reset]')) reset(); });

  out.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-act]'); if (!b) return;
    var li = b.closest('.ev-card'), id = li.getAttribute('data-id');
    var x = events.filter(function (y) { return y.ev.id === id; })[0]; if (!x) return;
    if (b.getAttribute('data-act') === 'cal') { download(x); return; }
    if (going[id]) { delete going[id]; } else { going[id] = 1; showToast("You're in. Add it to your calendar so it happens."); }
    persist();
    if (st.plans) { render(false); return; }
    var on = !!going[id];
    li.classList.toggle('is-going', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); $('.ev-after', li).hidden = !on;
    pn.textContent = Object.keys(going).length;
  });

  var tbw = $('#lb-tbw');
  function measure() { if (tbw) root.style.setProperty('--tb', tbw.offsetHeight + 'px'); }
  measure(); window.addEventListener('resize', measure);
  render(false);

  /* ---------- spiral field (same as the Library) ---------- */
  var canvas = $('#fractal-bg');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d'), w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var mouse = { x: -9999, y: -9999 }, cur = { x: -9999, y: -9999 }, SP = 300, SC = 6, N = 800, R = SC * Math.sqrt(N) + 4;
  var sprite = doc.createElement('canvas'); sprite.width = sprite.height = Math.ceil(R * 2);
  function paint(c) { var s = sprite.getContext('2d'); s.setTransform(1, 0, 0, 1, 0, 0); s.clearRect(0, 0, sprite.width, sprite.height); s.translate(R, R); s.fillStyle = 'rgba(' + c.join(',') + ', 0.15)';
    for (var i = 0; i < N; i++) { var a = i * 137.5 * Math.PI / 180, r = SC * Math.sqrt(i); s.beginPath(); s.arc(r * Math.cos(a), r * Math.sin(a), 3, 0, Math.PI * 2); s.fill(); } }
  paint(curRGB);
  recolor = function (c) { paint(c); if (reduce) requestAnimationFrame(frame); };
  function resize() { w = innerWidth; h = innerHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  window.addEventListener('resize', resize); resize();
  window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  var last = 0;
  function frame(t) {
    var sy = window.scrollY || 0, k = Math.min(1, sy / (h * 0.6));
    canvas.style.opacity = (1 - 0.8 * k).toFixed(3);
    if (k > 0.98 && t - last < 33) { next(); return; }
    last = t; ctx.clearRect(0, 0, w, h);
    var ang = (t * 0.00005) % (2 * Math.PI), off = (sy * 0.12) % SP;
    for (var y = -SP - off; y < h + SP; y += SP) for (var x = -SP; x < w + SP; x += SP) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.drawImage(sprite, -R, -R); ctx.restore(); }
    cur.x += (mouse.x - cur.x) * 0.08; cur.y += (mouse.y - cur.y) * 0.08;
    var g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, 200); g.addColorStop(0, 'rgba(255,193,94,0.2)'); g.addColorStop(1, 'rgba(255,193,94,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    if (!reduce) next();
  }
  function next() { if (!doc.hidden) requestAnimationFrame(frame); }
  doc.addEventListener('visibilitychange', function () { if (!doc.hidden && !reduce) requestAnimationFrame(frame); });
  if (reduce) window.addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true });
  requestAnimationFrame(frame);
})();
