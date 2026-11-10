/* Luam analytics settings. Edit this file only.
   endpoint: the Web App URL from tools/analytics-collector.gs (see README, "Analytics").
   Leave it empty and events are kept in THIS browser only (analytics.html > "This browser"). */
window.LUAM_TRACK = {
  endpoint: "",
  token: "luam-public-1"   // must match SITE_TOKEN in the collector script. Not a secret; it only blocks casual spam.
};
