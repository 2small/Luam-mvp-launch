/* Luam "one question" module. No dependencies. Everything stays on the visitor's device.

   Pipeline per pillar, one consistent rhythm:
     question -> answer -> a fact that speaks to that question (key ...a) -> a one-line bridge to the short post (key ...w) -> read link -> next steps.
   Key names are unchanged so the logic below needs no new branches.

   SOURCES (verify wording against each report before publishing):
   - Work follows people home (85 in 100 constantly connected, global 72); highest stress of 16 countries (93%) with
     disrupted sleep and trouble concentrating; 95 in 100 with at least one burnout symptom; social health 63.9 vs 62.9:
     Cigna 360 Global Well-Being Survey, Kenya report (8th annual edition). Add the year from the report.
   - Vitality 79.3, third globally, global average 63.2: Cigna International Health Study 2025, Kenya findings.
   - 87 in 100 Kenyan workers report workplace stress: Niche Human Capital Advisory survey, July 2026.
   - Colleagues: Gallup workplace research, US data (about 2 in 10 employees have a best friend at work).
   - Saving: FinAccess Household Survey 2024 (CBK, KNBS, FSD Kenya): retirement saving doubled since 2021;
     36 / 28 / 13 in 100 save for day-to-day needs / emergencies / retirement; formal financial access 84.8% in 2024
     vs 26.7% in 2006.
   Note: Cigna and Niche figures are company-commissioned, self-reported surveys. FinAccess is the official national survey. */
(function () {
  'use strict';

  var root = document.getElementById('start');
  if (!root) return;

  var D = {
    en: {
      'kicker': '',
      'q': 'Are you building a life or just making a living?',
      'sub': 'Pick one part of your life. One question, one small step.',
      'o.connection.l': 'Connection', 'o.connection.s': 'The people in your life',
      'o.vitality.l': 'Vitality', 'o.vitality.s': 'My body',
      'o.attunement.l': 'Attunement', 'o.attunement.s': 'Understanding how you are really doing.',
      'o.purpose.l': 'Purpose', 'o.purpose.s': 'Deciding what makes life worthwhile',
      'x.unsure': 'Not sure', 'x.ok': 'Things are going well', 'x.help': 'It is heavier than this',
      'twoMin': 'Worth knowing',
      'doneBtn': 'Take me further',
      'watch': 'Watch the scene',
      'watchAll': 'Explore the four pillars',
      'read': 'Find out in the short post',
      'doneMsg': 'Good. Each small step leads to the next. The short post is the best one to take now.',
      'nextLead': 'Want to go further?',
      'nextSym': 'Track how you feel over time with Symmetry',
      'nextCare': 'Talk with a licensed psychologist',
      'privacy': 'Nothing you tap here leaves your device.',
      'steps': ' Small steps taken on this device: ',
      'helpTag': 'Please talk to a person',
      'helpLead': 'Thank you for saying so. A tip is not enough for this.',
      'helpBody': 'Reach someone now: a person you trust, a clinician, or your nearest health facility. You do not have to explain it perfectly.',
      'helpDanger': 'In danger or thinking of ending your life? Call 999 or 112 now.',
      'helpBtn': 'Open the Emergency page',

      'r.connection.label': 'Connection',
      'm.connection.q': 'You reach home after a long matatu ride. How long before the day stops following you through the door?',
      'm.connection.y': 'A few minutes', 'm.connection.n': 'It stays all evening',
      'm.connection.ya': 'You switch off faster than most. 85 in 100 Kenyan workers say they feel constantly connected to work. Globally it is 72. (Cigna 360° survey)',
      'm.connection.yw': 'Evenings are for people. The short post is about the message you keep meaning to send.',
      'm.connection.na': 'You are not carrying it home alone. 85 in 100 Kenyan workers say they feel constantly connected to work. Globally it is 72. (Cigna 360° survey)',
      'm.connection.nw': 'Evenings are for people. The short post is about the one message that makes room for a person.',

      'r.vitality.label': 'Vitality',
      'm.vitality.q': 'By evening, where does the day sit in your body: shoulders, jaw, stomach, hands?',
      'm.vitality.y': 'Somewhere, yes', 'm.vitality.n': 'I cannot tell',
      'm.vitality.ya': 'You are reading a real signal. In Cigna\'s 360° survey Kenya had the highest stress of 16 countries (93%), and people reported disrupted sleep and trouble concentrating. (Cigna 360° survey)',
      'm.vitality.yw': 'The short post is about sleep, and why everything feels harder without it.',
      'm.vitality.na': 'Kenya ranked third in the world for vitality in Cigna\'s 2025 study, scoring 79.3 against a global average of 63.2. A strong body is worth listening to. (Cigna, 2025)',
      'm.vitality.nw': 'The short post is about what four hours of sleep does to a day.',

      'r.attunement.label': 'Attunement',
      'm.attunement.q': 'Think of the hardest moment at work this week. Can you say in a few words what it did to you?',
      'm.attunement.y': 'I can', 'm.attunement.n': 'I just moved on',
      'm.attunement.ya': 'Naming it is worth doing. 87 in 100 Kenyan workers report stress at work. (Niche Human Capital Advisory, 2026)',
      'm.attunement.yw': 'The short post is about one word, and what it does to the noise in your head.',
      'm.attunement.na': 'Moving on is a skill. So is having someone at work who gets it: only about 2 in 10 employees say they have a best friend there. (Gallup, US data)',
      'm.attunement.nw': 'The short post shows which word.',

      'r.purpose.label': 'Purpose',
      'm.purpose.q': 'If someone asked who you are without mentioning your job, what would you say?',
      'm.purpose.y': 'I have an answer', 'm.purpose.n': 'I would struggle',
      'm.purpose.ya': 'Planning beyond the job is catching on. The number of Kenyans saving for retirement doubled between 2021 and 2024. (FinAccess 2024)',
      'm.purpose.yw': 'The short post is about the next step, where purpose becomes real.',
      'm.purpose.na': 'Most savings go to now. 36 in 100 Kenyans save for day-to-day needs, 28 for emergencies, 13 for retirement. (FinAccess 2024)',
      'm.purpose.nw': 'The short post shows where a small step starts.',

      'r.unsure.label': 'Not sure',
      'm.unsure.q': 'Is there one work task you are still carrying in your head, long after you left it?',
      'm.unsure.y': 'Yes, one', 'm.unsure.n': 'No, I let it go',
      'm.unsure.ya': 'Carrying work around is common. In one Cigna survey, 95 in 100 Kenyans reported at least one symptom of burnout. (Cigna 360° survey)',
      'm.unsure.yw': 'The four pillars show where to start.',
      'm.unsure.na': 'Letting go is a skill. Kenya also scored above the global average for social health, 63.9 against 62.9. (Cigna 360° survey)',
      'm.unsure.nw': 'The four pillars show where it fits in a good life.',

      'r.ok.label': 'Going well',
      'r.ok.action': 'Good weeks are the ones to build on. Formal financial access in Kenya rose from 26.7% in 2006 to 84.8% in 2024. (FinAccess 2024)',
      'r.ok.why': 'Pick above the part of your life you would give two more hours to.'
    },
    sw: {
      'kicker': '',
      'q': 'Je, unajenga maisha au unapata tu riziki?',
      'sub': 'Chagua sehemu moja ya maisha yako. Swali moja, hatua moja ndogo.',
      'o.connection.l': 'Muunganiko', 'o.connection.s': 'Watu katika maisha yako',
      'o.vitality.l': 'Nguvu', 'o.vitality.s': 'Mwili wangu',
      'o.attunement.l': 'Kujisikiliza', 'o.attunement.s': 'Kuelewa jinsi unavyoendelea kweli.',
      'o.purpose.l': 'Lengo', 'o.purpose.s': 'Kuamua ni nini kinachofanya maisha yawe na thamani',
      'x.unsure': 'Sina uhakika', 'x.ok': 'Mambo yanaenda vizuri', 'x.help': 'Ni nzito kuliko hii',
      'twoMin': 'Jambo la kujua',
      'doneBtn': 'Nipeleke mbele',
      'watch': 'Tazama onyesho',
      'watchAll': 'Gundua nguzo nne',
      'read': 'Gundua kwenye makala fupi',
      'doneMsg': 'Vizuri. Kila hatua ndogo huongoza kwenye inayofuata. Makala fupi ndiyo bora kuchukua sasa.',
      'nextLead': 'Unataka kuendelea?',
      'nextSym': 'Fuatilia unavyojisikia kwa muda kupitia Symmetry',
      'nextCare': 'Ongea na mwanasaikolojia mwenye leseni',
      'privacy': 'Chochote unachogusa hapa hakiondoki kwenye kifaa chako.',
      'steps': ' Hatua ndogo ulizochukua kwenye kifaa hiki: ',
      'helpTag': 'Tafadhali ongea na mtu',
      'helpLead': 'Asante kwa kusema. Kidokezo hakitoshi kwa hili.',
      'helpBody': 'Mfikie mtu sasa: mtu unayemwamini, mhudumu wa afya, au kituo cha afya kilicho karibu. Si lazima uelezee kikamilifu.',
      'helpDanger': 'Ukiwa hatarini au unafikiria kujiua? Piga 999 au 112 sasa.',
      'helpBtn': 'Fungua ukurasa wa Dharura',

      'r.connection.label': 'Muunganiko',
      'm.connection.q': 'Umefika nyumbani baada ya safari ndefu ya matatu. Ni baada ya muda gani siku inaacha kukufuata mlangoni?',
      'm.connection.y': 'Baada ya dakika chache', 'm.connection.n': 'Inabaki jioni nzima',
      'm.connection.ya': 'Unajitenga na kazi haraka kuliko wengi. Wafanyakazi 85 kati ya 100 nchini Kenya wanasema wanahisi wameunganishwa na kazi kila wakati. Duniani ni 72. (Utafiti wa Cigna 360°)',
      'm.connection.yw': 'Jioni ni kwa ajili ya watu. Makala fupi inahusu ujumbe unaoendelea kusema utatuma.',
      'm.connection.na': 'Hubebi peke yako. Wafanyakazi 85 kati ya 100 nchini Kenya wanasema wanahisi wameunganishwa na kazi kila wakati. Duniani ni 72. (Utafiti wa Cigna 360°)',
      'm.connection.nw': 'Jioni ni kwa ajili ya watu. Makala fupi inahusu ujumbe mmoja unaotoa nafasi kwa mtu.',

      'r.vitality.label': 'Nguvu',
      'm.vitality.q': 'Kufikia jioni, siku inakaa wapi mwilini mwako: mabegani, kwenye taya, tumboni, mikononi?',
      'm.vitality.y': 'Mahali fulani, ndiyo', 'm.vitality.n': 'Siwezi kujua',
      'm.vitality.ya': 'Unasoma ishara halisi. Katika utafiti wa Cigna 360°, Kenya ilikuwa na msongo wa juu zaidi kati ya nchi 16 (93%), na watu waliripoti kukatika kwa usingizi na ugumu wa kuzingatia. (Utafiti wa Cigna 360°)',
      'm.vitality.yw': 'Makala fupi inahusu usingizi, na kwa nini kila kitu huwa kigumu bila huo.',
      'm.vitality.na': 'Kenya ilishika nafasi ya tatu duniani kwa nguvu katika utafiti wa Cigna wa 2025, ikipata alama 79.3 dhidi ya wastani wa dunia wa 63.2. Mwili imara unastahili kusikilizwa. (Cigna, 2025)',
      'm.vitality.nw': 'Makala fupi inahusu kile saa nne za usingizi hufanya kwa siku.',

      'r.attunement.label': 'Kujisikiliza',
      'm.attunement.q': 'Fikiria wakati mgumu zaidi kazini wiki hii. Unaweza kusema kwa maneno machache ulikufanya nini?',
      'm.attunement.y': 'Naweza', 'm.attunement.n': 'Nilipita tu',
      'm.attunement.ya': 'Kuutaja kuna thamani. Wafanyakazi 87 kati ya 100 nchini Kenya wanaripoti msongo kazini. (Niche Human Capital Advisory, 2026)',
      'm.attunement.yw': 'Makala fupi inahusu neno moja, na linachofanya kwa kelele kichwani.',
      'm.attunement.na': 'Kupita ni ujuzi. Kuwa na mtu kazini anayekuelewa pia ni ujuzi: ni wafanyakazi 2 tu kati ya 10 wanaosema wana rafiki wa karibu huko. (Gallup, data ya Marekani)',
      'm.attunement.nw': 'Makala fupi inaonyesha neno hilo ni lipi.',

      'r.purpose.label': 'Lengo',
      'm.purpose.q': 'Kama mtu angekuuliza wewe ni nani bila kutaja kazi yako, ungesema nini?',
      'm.purpose.y': 'Nina jibu', 'm.purpose.n': 'Ningekwama',
      'm.purpose.ya': 'Kupanga zaidi ya kazi kunazidi kuenea. Idadi ya Wakenya wanaoweka akiba ya kustaafu iliongezeka maradufu kati ya 2021 na 2024. (FinAccess 2024)',
      'm.purpose.yw': 'Makala fupi inahusu hatua inayofuata, mahali ambapo lengo huwa halisi.',
      'm.purpose.na': 'Akiba nyingi huenda kwa leo. Wakenya 36 kati ya 100 huweka akiba kwa mahitaji ya kila siku, 28 kwa dharura, 13 kwa kustaafu. (FinAccess 2024)',
      'm.purpose.nw': 'Makala fupi inaonyesha hatua ndogo inaanzia wapi.',

      'r.unsure.label': 'Sina uhakika',
      'm.unsure.q': 'Kuna kazi moja unayoendelea kuibeba kichwani muda mrefu baada ya kuiacha?',
      'm.unsure.y': 'Ndiyo, moja', 'm.unsure.n': 'Hapana, naiachilia',
      'm.unsure.ya': 'Kubeba kazi akilini ni jambo la kawaida. Katika utafiti mmoja wa Cigna, Wakenya 95 kati ya 100 waliripoti angalau dalili moja ya uchovu wa kazi. (Utafiti wa Cigna 360°)',
      'm.unsure.yw': 'Nguzo nne zinaonyesha pa kuanza.',
      'm.unsure.na': 'Kuachilia ni ujuzi. Kenya pia ilipata alama za juu kuliko wastani wa dunia kwa afya ya kijamii, 63.9 dhidi ya 62.9. (Utafiti wa Cigna 360°)',
      'm.unsure.nw': 'Nguzo nne zinaonyesha unavyofaa katika maisha mazuri.',

      'r.ok.label': 'Mambo yanaenda vizuri',
      'r.ok.action': 'Wiki nzuri ndizo za kujengea juu yake. Upatikanaji wa huduma rasmi za kifedha nchini Kenya ulipanda kutoka 26.7% mwaka 2006 hadi 84.8% mwaka 2024. (FinAccess 2024)',
      'r.ok.why': 'Chagua hapo juu sehemu ya maisha ungeipa saa mbili zaidi.'
    }
  };

  var LINKS = {
    connection: 'pillars.html#s1',
    vitality: 'pillars.html#s2',
    attunement: 'pillars.html#s3',
    purpose: 'pillars.html#s4',
    unsure: 'pillars.html',
    ok: 'pillars.html'
  };

  var READS = {
    connection: 'blog/the-message-you-keep-meaning-to-send.html',
    vitality: 'blog/why-everything-feels-harder-on-four-hours-of-sleep.html',
    attunement: 'blog/one-word-to-turn-down-the-kelele.html',
    purpose: 'blog/you-need-a-next-step.html'
  };

  var state = { lang: 'en', picked: null, ans: null, done: false, count: 0 };
  try {
    var l = localStorage.getItem('lq_lang');
    if (l === 'sw' || l === 'en') state.lang = l;
    var n = parseInt(localStorage.getItem('lq_steps') || '0', 10);
    if (n > 0) state.count = n;
  } catch (e) { /* storage blocked: the module still works */ }

  var action = document.getElementById('lq-action');
  var help = document.getElementById('lq-help');
  var next = document.getElementById('lq-next');
  var watch = document.getElementById('lq-watch');
  var watchText = watch.querySelector('span');
  var read = document.getElementById('lq-read');
  var count = document.getElementById('lq-count');
  var whyEl = action.querySelector('[data-r="why"]');
  var mainRow = action.querySelector('.lq-row');

  // Two-answer mirror, built here so index.html does not need to change.
  var mirror = document.createElement('div');
  mirror.className = 'lq-row';
  mirror.hidden = true;
  var mirrorY = document.createElement('button');
  var mirrorN = document.createElement('button');
  [['y', mirrorY], ['n', mirrorN]].forEach(function (p) {
    p[1].type = 'button';
    p[1].className = 'lq-pill';
    p[1].setAttribute('data-m', p[0]);
    mirror.appendChild(p[1]);
  });
  action.insertBefore(mirror, mainRow);

  function t(key) {
    var d = D[state.lang];
    return (d && d[key]) || D.en[key] || '';
  }

  function hasMirror(k) { return !!D.en['m.' + k + '.q']; }

  function render() {
    var k = state.picked;
    var showAction = k && k !== 'help';
    var mirrored = !!showAction && hasMirror(k);
    var asking = mirrored && !state.ans;
    action.hidden = !showAction;
    help.hidden = k !== 'help';
    mirror.hidden = !asking;
    mainRow.hidden = asking;
    next.hidden = !(showAction && !asking && state.done);

    if (showAction) {
      var text = { label: t('r.' + k + '.label') };
      if (asking) {
        text.action = t('m.' + k + '.q');
        text.why = '';
        mirrorY.textContent = t('m.' + k + '.y');
        mirrorN.textContent = t('m.' + k + '.n');
      } else if (mirrored) {
        text.action = t('m.' + k + '.' + state.ans + 'a');
        text.why = t('m.' + k + '.' + state.ans + 'w');
      } else {
        text.action = t('r.' + k + '.action');
        text.why = t('r.' + k + '.why');
      }
      action.querySelectorAll('[data-r]').forEach(function (el) {
        el.textContent = text[el.getAttribute('data-r')] || '';
      });
      whyEl.hidden = !text.why;
      watch.setAttribute('href', LINKS[k]);
      watchText.textContent = t(k === 'unsure' || k === 'ok' ? 'watchAll' : 'watch');
      read.hidden = !READS[k];
      if (READS[k]) read.setAttribute('href', READS[k]);
    }
    root.querySelectorAll('[data-k]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-k') === k ? 'true' : 'false');
    });
    count.textContent = state.count > 0 ? t('steps') + state.count : '';
  }

  function applyLang() {
    root.setAttribute('lang', state.lang === 'sw' ? 'sw' : 'en');
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === state.lang ? 'true' : 'false');
    });
    render();
  }

  root.addEventListener('click', function (e) {
    // Track clicks on the short-post link (it is an anchor, so the button handling below ignores it).
    var link = e.target.closest('a');
    if (link && link.id === 'lq-read' && window.luamTrack) luamTrack('read_click', state.picked + ':' + (state.ans || ''));

    var btn = e.target.closest('button');
    if (!btn || !root.contains(btn)) return;

    var k = btn.getAttribute('data-k');
    var lang = btn.getAttribute('data-lang');
    var m = btn.getAttribute('data-m');

    if (k) {
      if (window.luamTrack) { if (/^(connection|vitality|attunement|purpose)$/.test(k)) luamTrack('checkin_pick', k); else luamTrack('checkin_alt'); }
      state.picked = k;
      state.ans = null;
      state.done = false;
      render();
    } else if (m) {
      if (window.luamTrack) luamTrack('mirror_answer', state.picked + ':' + m);
      state.ans = m === 'y' ? 'y' : 'n';
      state.done = false;
      render();
    } else if (lang) {
      if (window.luamTrack) luamTrack('lang_switch', lang);
      state.lang = lang;
      try { localStorage.setItem('lq_lang', lang); } catch (err) { /* ignore */ }
      applyLang();
    } else if (btn.id === 'lq-done') {
      if (window.luamTrack) luamTrack('checkin_done');
      state.done = true;
      state.count += 1;
      try { localStorage.setItem('lq_steps', String(state.count)); } catch (err) { /* ignore */ }
      render();
    }
  });

  root.classList.add('lq-js');
  applyLang();
})();
