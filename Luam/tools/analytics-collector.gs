/**
 * Luam analytics collector. Free: Google Sheets + Google Apps Script.
 *
 * SETUP (10 minutes)
 * 1. Make a new Google Sheet. Name it "Luam analytics". Leave it empty.
 * 2. Extensions > Apps Script. Delete the sample code and paste this whole file.
 * 3. Edit SITE_TOKEN and READ_KEY below. READ_KEY is your dashboard password: long and random.
 *    SITE_TOKEN must equal "token" in track-config.js.
 * 4. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy, and allow access.
 * 5. Copy the Web app URL (ends in /exec) into track-config.js ("endpoint"), then publish the site.
 * 6. Open analytics.html on your site, paste the URL and READ_KEY once.
 *
 * Changing this file later: Deploy > Manage deployments > edit > New version.
 * Data stays in your Google account. Nothing here stores IP addresses.
 */
var SITE_TOKEN = 'luam-public-1';
var READ_KEY = 'CHANGE-ME-to-a-long-random-string';
var SHEET = 'events';
var MAX_ROWS_RETURNED = 20000;          // newest rows sent to the dashboard
var TZ = 'Africa/Nairobi';
var ALLOWED = /^(page_view|scroll_75|cta_click|booking_click|booking_step|booking_whatsapp|practitioner_book|call_click|email_click|whatsapp_click|emergency_click|outbound_click|blog_click|checkin_pick|checkin_alt|checkin_done|checkin_next|lang_switch|event_going|event_calendar|event_invite|event_details|event_filter|library_save|library_surprise|library_filter)$/;

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(['time (EAT)', 'event', 'path', 'label', 'session', 'referrer', 'utm', 'device', 'lang']);
    sh.getRange('A:I').setNumberFormat('@');   // plain text, so Sheets never turns times or labels into dates/numbers
    sh.setFrozenRows(1);
  }
  return sh;
}
function clip_(v, n) { return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').slice(0, n); }
// Stops a cell being read as a formula if someone sends text starting with = + - @
function safe_(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; }

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.k !== SITE_TOKEN || !Array.isArray(body.ev)) return out_({ ok: false });
    var now = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
    var rows = [];
    body.ev.slice(0, 50).forEach(function (x) {
      var name = clip_(x.e, 40);
      if (!ALLOWED.test(name)) return;
      rows.push([now, name, safe_(clip_(x.p, 120)), safe_(clip_(x.l, 60)), clip_(x.s, 12), safe_(clip_(x.r, 60)),
        safe_(clip_(x.u, 30)), /^[mtd]$/.test(x.d) ? x.d : '', clip_(x.g, 2)]);
    });
    if (rows.length) {
      var lock = LockService.getScriptLock();
      lock.waitLock(10000);
      try {
        var sh = sheet_();
        sh.getRange(sh.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
      } finally { lock.releaseLock(); }
    }
    return out_({ ok: true });
  } catch (err) { return out_({ ok: false }); }
}

// Dashboard read: ?k=READ_KEY&days=60  ->  {ok, rows:[[time,event,path,label,session,referrer,utm,device,lang],...]}
function doGet(e) {
  var p = (e && e.parameter) || {};
  CB_ = /^[A-Za-z0-9_]{1,40}$/.test(p.callback || '') ? p.callback : '';
  if (p.k !== READ_KEY) return out_({ ok: false, error: 'key' });
  var days = Math.min(Math.max(parseInt(p.days, 10) || 30, 1), 400);
  var sh = sheet_(), last = sh.getLastRow();
  if (last < 2) return out_({ ok: true, rows: [] });
  var n = Math.min(last - 1, MAX_ROWS_RETURNED), start = last - n + 1;
  var vals = sh.getRange(start, 1, n, 9).getValues();
  var cut = Utilities.formatDate(new Date(Date.now() - days * 864e5), TZ, 'yyyy-MM-dd');
  var rows = vals.filter(function (r) { return String(r[0]).slice(0, 10) >= cut; }).map(function (r) {
    return r.map(String);
  });
  return out_({ ok: true, rows: rows, capped: n === MAX_ROWS_RETURNED });
}

// If the request has ?callback=name the reply is a script call, which browsers load without cross-origin limits.
var CB_ = '';
function out_(o) {
  var j = JSON.stringify(o);
  if (CB_) return ContentService.createTextOutput(CB_ + '(' + j + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(j).setMimeType(ContentService.MimeType.JSON);
}

