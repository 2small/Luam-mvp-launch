/* Luam analytics settings. Edit this file only.
   endpoint: "/collect" is the route in the Worker (src/worker.js), which relays to your Google Sheet. Use the Apps Script /exec URL here only if you are not using the Worker.
   Leave it empty and events are kept in THIS browser only (analytics.html > "This browser"). */
window.LUAM_TRACK = {
  endpoint: "/collect",
  token: "luam-public-1"   // must match SITE_TOKEN in the collector script. Not a secret; it only blocks casual spam.
};
