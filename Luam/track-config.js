/* Luam analytics settings. Edit this file only.
   endpoint: the Web App URL from tools/analytics-collector.gs (see README, "Analytics").
   Leave it empty and events are kept in THIS browser only (analytics.html > "This browser"). */
window.LUAM_TRACK = {
  endpoint: "https://script.google.com/macros/s/AKfycbzVd_DY5yy6JeNjyaaCrO2ejwbIfQs93ipvhgXVVXQKF_3zQCjJ02i7ieSk2z6_AyH4uA/exec",
  token: "luam-public-1"   // must match SITE_TOKEN in the collector script. Not a secret; it only blocks casual spam.
};
