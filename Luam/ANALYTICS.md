# Luam analytics

Free, cookie-free event counting. Data goes to a Google Sheet you own. `analytics.html` is the dashboard.

## What is recorded
Event name, page path, a short label, a random per-tab id, referrer site, `utm_source`, device class (mobile/tablet/desktop), language. Nothing typed by a visitor, no names, no IP addresses, no cross-visit id.
Not tracked at all: `dashboard.html`, `reflection.html`, `cognitive-exercises.html`, `therapychart.html` (personal tools), and `analytics.html`.
Skipped for anyone with Do Not Track or Global Privacy Control on, or `lq_notrack=1` in their browser.

## Setup (about 10 minutes, free)
1. New Google Sheet, then Extensions > Apps Script. Paste `tools/analytics-collector.gs`.
2. Change `READ_KEY` (your dashboard password) and, if you like, `SITE_TOKEN`.
3. Deploy > New deployment > Web app. Execute as: Me. Access: Anyone. Copy the `/exec` URL.
4. In `track-config.js` set `endpoint` to that URL and `token` to your `SITE_TOKEN`. Publish the site.
5. Open `/analytics.html`, paste the URL and read key. That browser is then excluded from your own stats.

Until step 4, events are kept in the visitor's own browser (last 500). "This browser only" on the dashboard shows them; "Demo data" shows the layout.

## Events
| Event | Where | Label |
|---|---|---|
| page_view, scroll_75 | all tracked pages | |
| cta_click | home hero button | button name |
| practitioner_book | provider "Book" links | practitioner name |
| booking_click | any link to ServiceBooking | |
| booking_step | booking form step reached | step number |
| booking_whatsapp | booking request sent | |
| call_click, email_click, whatsapp_click | auto | number (digits only) |
| emergency_click | any link to Emergency | |
| checkin_pick / checkin_alt / checkin_done / checkin_next | home check-in | pillar (alt answers are not labelled) |
| lang_switch | English / Kiswahili | language |
| blog_click | links to blog posts | post slug |
| event_filter / event_going / event_calendar / event_invite / event_details | events page | identity or event title |
| library_save / library_filter / library_surprise | library page | item id or pillar |
| outbound_click | links to other sites | domain only |

Track anything new: add `data-track="my_event" data-track-label="x"` to an element, then add `my_event` to `ALLOWED` in the collector script and redeploy.

## Notes
- The dashboard reads the newest 20,000 rows. A Google Sheet holds about a million events; archive old rows when it fills.
- `SITE_TOKEN` is visible in page source. It only blocks casual spam. Someone determined could still add fake rows, never read data.
- `Privacy.html` was updated: it previously said the site used no trackers.
- Kenya DPA 2019: counts without identifiers are low risk, but have your adviser confirm the wording.
