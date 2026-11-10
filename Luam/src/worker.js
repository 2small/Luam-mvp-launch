/* Luam: serves the static site and relays analytics to the Google Sheet collector.
   /collect  POST  events from track.js  -> forwarded to Apps Script (same-origin for the browser, so no CORS)
   /stats    GET   dashboard read        -> forwarded to Apps Script
   Everything else is served from the assets folder. */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/collect') {
      if (request.method !== 'POST') return new Response(null, { status: 405 });
      const origin = request.headers.get('Origin');
      if (origin) { try { if (new URL(origin).host !== url.host) return new Response(null, { status: 403 }); } catch (e) { return new Response(null, { status: 403 }); } }
      const text = await request.text();
      if (text.length > 20000) return new Response(null, { status: 413 });
      let body;
      try { body = JSON.parse(text); } catch (e) { return new Response(null, { status: 400 }); }
      if (!body || !Array.isArray(body.ev)) return new Response(null, { status: 400 });
      if (env.SITE_TOKEN) body.k = env.SITE_TOKEN;
      if (!env.COLLECTOR_URL) return new Response(null, { status: 503 });
      // Answer the visitor at once; finish the hand-off in the background.
      ctx.waitUntil(fetch(env.COLLECTOR_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(body), redirect: 'follow' }).catch(() => {}));
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
    }

    if (url.pathname === '/stats') {
      if (request.method !== 'GET' || !env.COLLECTOR_URL) return new Response(null, { status: 405 });
      const k = url.searchParams.get('k') || '', days = url.searchParams.get('days') || '30';
      const target = env.COLLECTOR_URL + '?k=' + encodeURIComponent(k) + '&days=' + encodeURIComponent(days);
      try {
        const r = await fetch(target, { redirect: 'follow' });
        return new Response(await r.text(), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
      } catch (e) { return new Response('{"ok":false,"error":"upstream"}', { status: 502, headers: { 'Content-Type': 'application/json' } }); }
    }

    return env.ASSETS.fetch(request);
  }
};
