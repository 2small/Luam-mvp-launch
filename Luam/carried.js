/* Luam "Carried together" section. No dependencies. No styling of its own (uses start.css lq-* classes).

   1. Norm correction : calm statements. No statistics, no testimonials.
   2. Reciprocity     : send a kind note via WhatsApp / SMS / copy / share. The note is never stored or sent to Luam.
   3. Co-ownership    : two votes + a question by email.

   TO CONFIRM BEFORE PUBLISHING
   - Votes are kept on the device. If window.luamTrack exists, the FIRST choice per group is also sent anonymously
     ('carried_vote'). Make sure Privacy.html says so, or remove that call.
   - Optional real counts: set window.LUAM_COUNTS = { topic: {sleep: n, ...}, tool: {...} }. Shown only after a vote and
     only if the group total is at least MIN_SHOW. Nothing is shown otherwise.
   - Swahili needs a native-speaker review.
   - Topic and tool options should match what you will really build. */
(function () {
  'use strict';

  var root = document.getElementById('carried');
  if (!root) return;

  var MIN_SHOW = 20;
  var SHARE_URL = '';
  try { SHARE_URL = location.origin && location.origin !== 'null' ? location.origin + '/' : location.href; } catch (e) { /* ignore */ }

  var D = {
    en: {
      title: 'Carried together',
      sub: 'People look after each other, one small message at a time.',
      t1: 'People reach out', another: 'Another',
      t2: 'Pass it on', p2: 'Send someone a kind note. Change it to sound like you.',
      yourNote: 'Your note', addLink: 'Include a link to Luam',
      wa: 'WhatsApp', sms: 'SMS', copy: 'Copy', share: 'Share',
      copied: 'Copied.', linkIntro: 'From Luam: ',
      t3: 'Shape it with us',
      q1: 'What should we write about next?', q2: 'What should Symmetry help with first?',
      thanksSent: 'Thank you. Your choice was counted without your name.',
      thanksLocal: 'Thank you. Your choice is saved on this device.',
      ask: 'A question for us?', askLink: 'Write to us', askSubject: 'A question for Luam',
      people: 'chose this',
      privacy: 'Nothing you type here is stored or sent to us.',
      t4: 'A small discovery', again: 'Another discovery', tryIt: 'Pass a note on', src: 'Research: ',
      disc: [
        { q: 'When you message someone out of the blue, how do they feel?',
          o: ['A little bothered', 'Glad to hear from me', 'Not much either way'],
          r: 'People appreciate it more than the sender expects. A small message lands bigger than it feels to send.',
          s: 'Liu et al., 2023' },
        { q: 'After a first conversation, how much did the other person like you?',
          o: ['Less than I liked them', 'About the same', 'More than I think'],
          r: 'People tend to be liked more than they believe. Researchers call this the liking gap.',
          s: 'Boothby et al., 2018' },
        { q: 'Would a short chat with a stranger on your commute make it better or worse?',
          o: ['Worse', 'No difference', 'Better'],
          r: 'Commuters expected to prefer solitude. Those who chatted reported a more pleasant trip.',
          s: 'Epley and Schroeder, 2014' },
        { q: 'You thank someone in writing. How will they feel?',
          o: ['Awkward', 'Warm', 'Unsure'],
          r: 'Recipients felt warmer than the writers expected. Thanks is received better than it feels to give.',
          s: 'Kumar and Epley, 2018' }
      ],
      lines: [
        'Every day, people check in on each other.',
        'A short message can lift a whole day.',
        'Reaching out is something people do for one another.',
        'You can begin with a single sentence.'
      ],
      notes: [
        'Thinking of you. No need to reply.',
        'How are you, really? I am glad to listen.',
        'Shall we check in with each other this week?'
      ],
      topic: { sleep: 'Sleep', family: 'Family conversations', work: 'Work and rest', money: 'Money and planning' },
      tool: { checkin: 'Daily check-in', nudge: 'Gentle reminders', sleeplog: 'Sleep log', circle: 'Sharing with someone I trust' }
    },
    sw: {
      title: 'Tunabebana pamoja',
      sub: 'Watu hutunzana, kwa ujumbe mdogo mmoja kwa wakati.',
      t1: 'Watu hufikiana', another: 'Jingine',
      t2: 'Peleka mbele', p2: 'Mtumie mtu ujumbe mwema. Ubadilishe uwe kama wewe.',
      yourNote: 'Ujumbe wako', addLink: 'Weka kiungo cha Luam',
      wa: 'WhatsApp', sms: 'SMS', copy: 'Nakili', share: 'Shiriki',
      copied: 'Imenakiliwa.', linkIntro: 'Kutoka Luam: ',
      t3: 'Tusaidie kuiunda',
      q1: 'Tuandike kuhusu nini baadaye?', q2: 'Symmetry ianze kusaidia kwa nini?',
      thanksSent: 'Asante. Chaguo lako limehesabiwa bila jina lako.',
      thanksLocal: 'Asante. Chaguo lako limehifadhiwa kwenye kifaa hiki.',
      ask: 'Una swali kwetu?', askLink: 'Tuandikie', askSubject: 'Swali kwa Luam',
      people: 'wamechagua hili',
      privacy: 'Chochote unachoandika hapa hakihifadhiwi wala hakitumwi kwetu.',
      t4: 'Ugunduzi mdogo', again: 'Ugunduzi mwingine', tryIt: 'Peleka ujumbe mbele', src: 'Utafiti: ',
      disc: [
        { q: 'Ukimtumia mtu ujumbe bila taarifa, anahisije?',
          o: ['Amekwazika kidogo', 'Anafurahi kusikia kutoka kwangu', 'Si sana kwa vyovyote'],
          r: 'Watu huthamini zaidi ya mtumaji anavyotarajia. Ujumbe mdogo hugusa kuliko unavyohisi kuutuma.',
          s: 'Liu et al., 2023' },
        { q: 'Baada ya mazungumzo ya kwanza, mtu mwingine alikupenda kiasi gani?',
          o: ['Chini ya nilivyompenda', 'Sawa tu', 'Zaidi ya ninavyodhani'],
          r: 'Watu hupendwa zaidi ya wanavyoamini. Watafiti huita hili pengo la kupendwa.',
          s: 'Boothby et al., 2018' },
        { q: 'Mazungumzo mafupi na mgeni njiani yangefanya safari kuwa bora au mbaya zaidi?',
          o: ['Mbaya zaidi', 'Hakuna tofauti', 'Bora zaidi'],
          r: 'Wasafiri walitarajia kupendelea kukaa peke yao. Waliozungumza waliripoti safari yenye raha zaidi.',
          s: 'Epley and Schroeder, 2014' },
        { q: 'Unamshukuru mtu kwa maandishi. Atajisikiaje?',
          o: ['Aibu', 'Joto moyoni', 'Sina uhakika'],
          r: 'Waliopokea walihisi joto zaidi kuliko waandishi walivyotarajia. Shukrani hupokelewa vizuri kuliko inavyohisi kuitoa.',
          s: 'Kumar and Epley, 2018' }
      ],
      lines: [
        'Kila siku, watu hujulia hali wenzao.',
        'Ujumbe mfupi unaweza kuinua siku nzima.',
        'Kufikiana ni jambo watu hufanyiana.',
        'Unaweza kuanza na sentensi moja.'
      ],
      notes: [
        'Nakufikiria. Si lazima unijibu.',
        'Hujambo kweli? Nafurahi kukusikiliza.',
        'Tujulishane hali wiki hii?'
      ],
      topic: { sleep: 'Usingizi', family: 'Mazungumzo ya familia', work: 'Kazi na mapumziko', money: 'Pesa na mipango' },
      tool: { checkin: 'Kujitathmini kila siku', nudge: 'Vikumbusho vya upole', sleeplog: 'Rekodi ya usingizi', circle: 'Kushiriki na mtu ninayemwamini' }
    }
  };

  var KEYS = { topic: ['sleep', 'family', 'work', 'money'], tool: ['checkin', 'nudge', 'sleeplog', 'circle'] };

  var state = { lang: 'en', line: 0, disc: 0, note: 0, edited: false, votes: { topic: null, tool: null }, sent: { topic: false, tool: false } };
  try {
    var l = localStorage.getItem('lq_lang');
    if (l === 'sw' || l === 'en') state.lang = l;
    var v = JSON.parse(localStorage.getItem('cr_votes') || 'null');
    if (v && typeof v === 'object') {
      if (KEYS.topic.indexOf(v.topic) > -1) state.votes.topic = v.topic;
      if (KEYS.tool.indexOf(v.tool) > -1) state.votes.tool = v.tool;
      state.sent.topic = !!v.sentTopic;
      state.sent.tool = !!v.sentTool;
    }
  } catch (e) { /* storage blocked: still works */ }

  var $ = function (id) { return document.getElementById(id); };
  var lineEl = $('cr-line'), notesEl = $('cr-notes'), msg = $('cr-msg'), linkChk = $('cr-link');
  var wa = $('cr-wa'), sms = $('cr-sms'), shareBtn = $('cr-share'), status = $('cr-status');
  var vstatus = $('cr-vstatus'), ask = $('cr-ask');
  var dq = $('cr-dq'), dopts = $('cr-dopts'), dreveal = $('cr-dreveal'), dr = $('cr-dr'), ds = $('cr-ds');
  var boxes = { topic: $('cr-topic'), tool: $('cr-tool') };

  function d() { return D[state.lang] || D.en; }
  function track(name, label) { if (window.luamTrack) luamTrack(name, label); }

  function fullMessage() {
    var text = (msg.value || '').trim();
    if (linkChk.checked && SHARE_URL) text += '\n\n' + d().linkIntro + SHARE_URL;
    return text;
  }

  function updateLinks() {
    var text = fullMessage();
    wa.setAttribute('href', 'https://wa.me/?text=' + encodeURIComponent(text));
    sms.setAttribute('href', 'sms:?&body=' + encodeURIComponent(text));
  }

  function buildNotes() {
    notesEl.textContent = '';
    d().notes.forEach(function (n, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lq-opt';
      b.setAttribute('data-note', String(i));
      b.setAttribute('aria-pressed', i === state.note ? 'true' : 'false');
      var s = document.createElement('span');
      s.className = 't';
      s.textContent = n;
      b.appendChild(s);
      notesEl.appendChild(b);
    });
  }

  function buildVotes(group) {
    var box = boxes[group], keys = KEYS[group];
    var counts = (window.LUAM_COUNTS && window.LUAM_COUNTS[group]) || null;
    var total = 0;
    if (counts) keys.forEach(function (k) { total += Number(counts[k]) || 0; });
    box.textContent = '';
    keys.forEach(function (k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lq-alt';
      b.setAttribute('data-group', group);
      b.setAttribute('data-key', k);
      b.setAttribute('aria-pressed', state.votes[group] === k ? 'true' : 'false');
      var label = d()[group][k];
      if (counts && total >= MIN_SHOW && state.votes[group]) label += ' (' + (Number(counts[k]) || 0) + ' ' + d().people + ')';
      b.textContent = label;
      box.appendChild(b);
    });
  }

  function thanks() {
    if (!state.votes.topic && !state.votes.tool) return '';
    return (state.sent.topic || state.sent.tool) ? d().thanksSent : d().thanksLocal;
  }

  function discItem() { var list = d().disc; return list[state.disc % list.length]; }

  function renderDisc() {
    var item = discItem();
    dq.textContent = item.q;
    dopts.textContent = '';
    item.o.forEach(function (o, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lq-alt';
      b.setAttribute('data-dopt', String(i));
      b.setAttribute('aria-pressed', 'false');
      b.textContent = o;
      dopts.appendChild(b);
    });
    dreveal.hidden = true;
  }

  function applyLang() {
    root.setAttribute('lang', state.lang === 'sw' ? 'sw' : 'en');
    root.querySelectorAll('[data-ci]').forEach(function (el) {
      var val = d()[el.getAttribute('data-ci')];
      if (typeof val === 'string') el.textContent = val;
    });
    msg.setAttribute('aria-label', d().yourNote);
    buildNotes();
    if (!state.edited) msg.value = d().notes[state.note];
    buildVotes('topic');
    buildVotes('tool');
    ask.setAttribute('href', 'mailto:hello@luam.co.ke?subject=' + encodeURIComponent(d().askSubject));
    lineEl.textContent = d().lines[state.line % d().lines.length];
    status.textContent = '';
    vstatus.textContent = thanks();
    renderDisc();
    updateLinks();
  }

  function saveVotes() {
    try {
      localStorage.setItem('cr_votes', JSON.stringify({
        topic: state.votes.topic, tool: state.votes.tool,
        sentTopic: state.sent.topic, sentTool: state.sent.tool
      }));
    } catch (e) { /* ignore */ }
  }

  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta); done();
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }

  root.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (a && a.id === 'cr-wa') track('carried_send', 'whatsapp');
    if (a && a.id === 'cr-sms') track('carried_send', 'sms');

    var btn = e.target.closest('button');
    if (!btn || !root.contains(btn)) return;

    if (btn.id === 'cr-next') {
      state.line += 1;
      lineEl.textContent = d().lines[state.line % d().lines.length];
    } else if (btn.hasAttribute('data-note')) {
      state.note = parseInt(btn.getAttribute('data-note'), 10) || 0;
      state.edited = false;
      msg.value = d().notes[state.note];
      notesEl.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      updateLinks();
    } else if (btn.id === 'cr-copy') {
      track('carried_send', 'copy');
      copyText(fullMessage(), function () { status.textContent = d().copied; });
    } else if (btn.id === 'cr-share') {
      track('carried_send', 'share');
      try { navigator.share({ text: fullMessage() }).catch(function () {}); } catch (err) { /* ignore */ }
    } else if (btn.hasAttribute('data-dopt')) {
      var item = discItem();
      dopts.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      dr.textContent = item.r;
      ds.textContent = d().src + item.s;
      dreveal.hidden = false;
      track('carried_discovery', String(state.disc % d().disc.length));
    } else if (btn.id === 'cr-dmore') {
      state.disc += 1;
      renderDisc();
    } else if (btn.hasAttribute('data-group')) {
      var g = btn.getAttribute('data-group'), k = btn.getAttribute('data-key');
      state.votes[g] = k;
      if (!state.sent[g] && window.luamTrack) {
        luamTrack('carried_vote', g + ':' + k);
        state.sent[g] = true;
      }
      saveVotes();
      buildVotes(g);
      vstatus.textContent = thanks();
    }
  });

  msg.addEventListener('input', function () { state.edited = true; updateLinks(); });
  linkChk.addEventListener('change', updateLinks);

  // Follow the language chosen in the section above.
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-lang]');
    if (!b || root.contains(b)) return;
    setTimeout(function () {
      try {
        var l2 = localStorage.getItem('lq_lang');
        if ((l2 === 'sw' || l2 === 'en') && l2 !== state.lang) { state.lang = l2; applyLang(); }
      } catch (err) { /* ignore */ }
    }, 0);
  });

  if (navigator.share) shareBtn.hidden = false;
  applyLang();
})();
