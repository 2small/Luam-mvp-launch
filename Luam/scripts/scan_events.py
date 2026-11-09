#!/usr/bin/env python3
"""Scan the sources in data/sources.json for wellness events in Kenya and update data/events.json + data/events.js.
Standard library only. Run:  python3 scripts/scan_events.py   (from the site folder)
Rules it follows: reads only listed sources, obeys robots.txt, waits 2s between requests, identifies itself,
keeps a short snippet (not the full text), links back to the source, and never marks a found event as confirmed."""
import json, re, sys, time, hashlib, datetime as dt, html, urllib.request, urllib.parse, urllib.robotparser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / 'data'
UA = 'LuamEventsBot/1.0 (+https://luam.co.ke; wellness event listing)'
TZ = dt.timezone(dt.timedelta(hours=3))  # East Africa Time
TODAY = dt.datetime.now(TZ).date()

CITIES = ['nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'naivasha', 'nanyuki', 'diani', 'kilifi', 'malindi', 'machakos', 'kiambu', 'karen', 'westlands', 'kitengela', 'ngong', 'lamu', 'kenya']
WELLNESS = ['yoga', 'meditat', 'mindful', 'wellness', 'wellbeing', 'well-being', 'mental health', 'retreat', 'therap', 'healing', 'breathwork', 'sound bath', 'sound healing', 'support group', 'self-care', 'self care', 'burnout', 'grief', 'trauma', 'stress', 'pilates', 'hike', 'forest walk', 'run club', 'fitness', 'counsel', 'psycholog', 'wellbeing']
BLOCK = ['casino', 'betting', 'forex', 'crypto', 'miracle cure', 'weight loss pills']
CATS = [('reset', ['retreat', 'meditat', 'mindful', 'breathwork', 'sound', 'silence', 'spa', 'healing', 'self-care', 'self care']),
        ('move', ['yoga', 'run', 'walk', 'hike', 'fitness', 'gym', 'pilates', 'dance', 'cycling', 'swim']),
        ('connect', ['circle', 'support group', 'community', 'meetup', 'social', 'club', 'men', 'women', 'family', 'friends']),
        ('learn', ['talk', 'workshop', 'seminar', 'webinar', 'class', 'training', 'conference', 'summit', 'expo', 'masterclass', 'panel'])]

def log(*a): print('[scan]', *a, file=sys.stderr)

def fetch(url):
    if url.startswith('file://'):
        return Path(urllib.parse.urlparse(url).path).read_text(encoding='utf-8', errors='replace')
    p = urllib.parse.urlparse(url)
    if p.scheme not in ('http', 'https'): raise ValueError('bad scheme')
    rp = urllib.robotparser.RobotFileParser()
    try:
        rp.set_url(f'{p.scheme}://{p.netloc}/robots.txt'); rp.read()
        if not rp.can_fetch(UA, url): raise PermissionError('robots.txt disallows ' + url)
    except PermissionError: raise
    except Exception: pass  # no robots.txt reachable: carry on politely
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': 'text/calendar,text/html,application/xhtml+xml,*/*;q=0.5'})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read(1_500_000).decode(r.headers.get_content_charset() or 'utf-8', errors='replace')

def parse_dt(v):
    """-> (iso string, is_date_only) or (None, False)"""
    if not v: return None, False
    v = v.strip()
    m = re.match(r'^(\d{4})-?(\d{2})-?(\d{2})$', v)
    if m: return f'{m[1]}-{m[2]}-{m[3]}', True
    m = re.match(r'^(\d{4})-?(\d{2})-?(\d{2})[T ](\d{2}):?(\d{2}):?(\d{2})?(Z|[+-]\d{2}:?\d{2})?$', v)
    if not m: return None, False
    y, mo, d, h, mi, s, z = m.groups(); s = s or '00'
    if z == 'Z': z = '+00:00'
    elif z and ':' not in z: z = z[:3] + ':' + z[3:]
    d0 = dt.datetime(int(y), int(mo), int(d), int(h), int(mi), int(s), tzinfo=dt.timezone.utc if z == '+00:00' else (TZ if not z else dt.timezone(dt.timedelta(hours=int(z[:3]), minutes=int(z[0] + z[4:])))))
    return d0.astimezone(TZ).strftime('%Y-%m-%dT%H:%M:%S+03:00'), False

def clean(t, n=160):
    t = re.sub(r'<[^>]+>', ' ', html.unescape(t or '')); t = re.sub(r'\s+', ' ', t).strip()
    return t if len(t) <= n else t[:n - 1].rsplit(' ', 1)[0] + '…'

def parse_ics(text, src):
    text = re.sub(r'\r?\n[ \t]', '', text)  # unfold
    out = []
    for blk in re.findall(r'BEGIN:VEVENT(.*?)END:VEVENT', text, re.S):
        g = lambda k: (re.search(r'^' + k + r'[^:\n]*:(.*)$', blk, re.M) or [None, ''])[1].replace('\\,', ',').replace('\\n', ' ').replace('\\;', ';').strip()
        s, sd = parse_dt(g('DTSTART')); e, _ = parse_dt(g('DTEND'))
        if sd and e:  # ICS all-day DTEND is exclusive
            e = (dt.date.fromisoformat(e) - dt.timedelta(days=1)).isoformat()
        out.append(dict(title=clean(g('SUMMARY'), 120), start=s, end=e, loc=g('LOCATION'), url=g('URL'), desc=clean(g('DESCRIPTION'))))
    return out

def walk(o):
    if isinstance(o, list):
        for i in o: yield from walk(i)
    elif isinstance(o, dict):
        t = o.get('@type'); t = t if isinstance(t, list) else [t]
        if any(isinstance(x, str) and x.endswith('Event') for x in t): yield o
        for v in o.values(): yield from walk(v)

def parse_jsonld(text, src):
    out = []
    for raw in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', text, re.S | re.I):
        try: data = json.loads(raw)
        except Exception: continue
        for ev in walk(data):
            loc = ev.get('location'); loc = loc[0] if isinstance(loc, list) and loc else loc
            ltxt = ''
            if isinstance(loc, dict):
                a = loc.get('address'); a = ' '.join(str(v) for v in a.values() if isinstance(v, str)) if isinstance(a, dict) else (a or '')
                ltxt = ' '.join(x for x in [loc.get('name', ''), a] if isinstance(x, str))
            elif isinstance(loc, str): ltxt = loc
            online = 'online' in str(ev.get('eventAttendanceMode', '')).lower()
            s, _ = parse_dt(str(ev.get('startDate', ''))); e, _ = parse_dt(str(ev.get('endDate', '')))
            offers = ev.get('offers'); offers = offers[0] if isinstance(offers, list) and offers else offers
            price = ''
            if isinstance(offers, dict) and offers.get('price') not in (None, ''):
                price = ('Free' if str(offers['price']) in ('0', '0.0', '0.00') else f"{offers.get('priceCurrency', '')} {offers['price']}".strip())
            out.append(dict(title=clean(str(ev.get('name', '')), 120), start=s, end=e, loc=ltxt, url=str(ev.get('url', '')), desc=clean(str(ev.get('description', ''))), online=online, price=price))
    return out

def classify(text):
    t = text.lower()
    for c, kws in CATS:
        if any(k in t for k in kws): return c
    return 'learn'

def normalise(raw, src):
    t = (raw.get('title') or '').strip()
    if not t or not raw.get('start'): return None
    blob = ' '.join([t, raw.get('desc', ''), raw.get('loc', '')]).lower()
    if any(b in blob for b in BLOCK): return None
    if not any(w in blob for w in WELLNESS): return None
    end = raw.get('end') or raw['start']
    if dt.date.fromisoformat(end[:10]) < TODAY or dt.date.fromisoformat(raw['start'][:10]) > TODAY + dt.timedelta(days=365): return None
    online = bool(raw.get('online')) or 'online' in blob or 'zoom' in blob
    loc = raw.get('loc', '')
    hit = next((c.title() for c in CITIES if c in loc.lower()), '')
    if not online and loc.strip() and not hit: return None   # a place is given and it is not in Kenya
    city = hit or ('' if online else src.get('city', ''))
    url = raw.get('url') or src['url']
    if not url.startswith(('http://', 'https://')): url = src['url']
    price = raw.get('price', '')
    key = hashlib.sha1((re.sub(r'\W+', '', t.lower()) + raw['start'][:10] + city.lower()).encode()).hexdigest()[:10]
    return dict(id=key, title=t, start=raw['start'], end=raw.get('end') or '', city=city, venue=clean(loc, 80), online=online,
                free=price.lower() == 'free' or bool(re.search(r'\bfree\b', t.lower())), price=price, category=classify(blob), organiser='', source=src['name'], url=url,
                found=TODAY.isoformat(), last_seen=TODAY.isoformat(), status='unconfirmed', note=raw.get('desc', ''))

def main():
    sources = json.loads((DATA / 'sources.json').read_text(encoding='utf-8')).get('sources', [])
    old = json.loads((DATA / 'events.json').read_text(encoding='utf-8')).get('events', [])
    by_id = {e['id']: e for e in old}
    added = updated = 0
    for src in sources:
        if not src.get('enabled'): continue
        try:
            text = fetch(src['url'])
            raws = parse_ics(text, src) if src['type'] == 'ics' else parse_jsonld(text, src)
        except Exception as ex:
            log('FAILED', src['name'], ex); continue
        n = 0
        for r in raws:
            e = normalise(r, src)
            if not e: continue
            n += 1
            if e['id'] in by_id:
                cur = by_id[e['id']]; cur['last_seen'] = TODAY.isoformat()
                if not cur.get('locked'):
                    for k in ('title', 'start', 'end', 'venue', 'price', 'url', 'note'):
                        if e[k] and cur.get(k) != e[k]: cur[k] = e[k]; updated += 1
                    if e['free']: cur['free'] = True
            else:
                by_id[e['id']] = e; added += 1
        log(src['name'], 'kept', n, 'of', len(raws))
        time.sleep(2)
    keep = []
    for e in by_id.values():
        end = (e.get('end') or e['start'])[:10]
        if dt.date.fromisoformat(end) < TODAY: continue                       # finished
        if e.get('last_seen') and e['status'] != 'confirmed' and not e.get('locked') and not str(e.get('id', '')).startswith('seed-'):
            if (TODAY - dt.date.fromisoformat(e['last_seen'])).days > 14: continue  # vanished from its source
        keep.append(e)
    keep.sort(key=lambda e: e['start'])
    out = {'updated': TODAY.isoformat(), 'events': keep}
    (DATA / 'events.json').write_text(json.dumps(out, indent=1, ensure_ascii=False) + '\n', encoding='utf-8')
    (DATA / 'events.js').write_text('window.LUAM_EVENTS = ' + json.dumps(out, indent=1, ensure_ascii=False) + ';\n', encoding='utf-8')
    log(f'done: {len(keep)} upcoming, {added} added, {updated} fields updated')

if __name__ == '__main__':
    main()
