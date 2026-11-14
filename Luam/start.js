/* Luam "one question" module. No dependencies. Everything stays on the visitor's device.

   Pipeline per pillar, one consistent rhythm:
     question -> answer
       -> key ...a : a mirror of their answer, then the fact as a supporting line
       -> key ...w : an open loop that points to the short post
       -> read link (always) + booking link and reassurance (only on high-signal answers, see BOOK below).
   Key names are unchanged so the logic below needs no new branches, apart from the booking element.

   SOURCES (verify wording against each report before publishing):
   - Work follows people home (85 in 100 constantly connected, global 72); highest stress of 16 countries (93%) with
     disrupted sleep; 95 in 100 with at least one burnout symptom; social health 63.9 vs 62.9:
     Cigna 360 Global Well-Being Survey, Kenya report (8th annual edition). Add the year from the report.
   - Vitality 79.3, third globally, global average 63.2: Cigna International Health Study 2025, Kenya findings.
   - 87 in 100 Kenyan workers report workplace stress: Niche Human Capital Advisory survey, July 2026.
   - Colleagues: Gallup workplace research, US data (about 2 in 10 employees have a best friend at work).
   - Saving: FinAccess Household Survey 2024 (CBK, KNBS, FSD Kenya): retirement saving doubled since 2021;
     36 / 28 / 13 in 100 save for day-to-day needs / emergencies / retirement; formal financial access 84.8% in 2024
     vs 26.7% in 2006.
   Note: Cigna and Niche figures are company-commissioned, self-reported surveys. FinAccess is the official national survey.

   BOOKING: the 'book' and 'bookNote' strings are placeholders. Confirm every claim in them (for example that no
   preparation is needed) matches what actually happens at a first session before publishing. */
(function () {
  'use strict';

  var root = document.getElementById('start');
  if (!root) return;

  var D = {
    en: {
      'kicker': '',
      'q': 'How to build supportive connections',
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
      'book': 'Book a first conversation',
      'bookNote': 'Pick a day and time. You do not need to prepare or explain it perfectly.',
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
      'm.connection.q': 'You’re home now. What can wait until tomorrow?',
      'm.connection.y': 'Most of it can wait', 'm.connection.n': 'Almost nothing can wait',
      'm.connection.ya': 'Leaving work is easy. Getting your mind to leave with you is another matter. If work follows you home, then the people and things you work for get less of you. And tomorrow, you start with less energy. (Cigna 360° survey: 85 in 100 Kenyan workers report feeling constantly connected to work, compared with 72 globally.)',
      'm.connection.yw': 'There is a small step that makes room for people at the end of a day. The short post is about the message you keep meaning to send.',
      'm.connection.na': 'It can be difficult to leave work behind, and you are not alone: 85 in 100 Kenyan workers report feeling constantly connected to work, compared with 72 globally. If work keeps taking up your evenings, then there is less time and energy left for the people and things you work for. (Cigna 360° survey)',
      'm.connection.nw': 'There is a smaller step than switching off completely. The short post is about the message you keep meaning to send.',

      'r.vitality.label': 'Vitality',
      'm.vitality.q': 'As the day winds down, can you notice where your body is holding tension?',
      'm.vitality.y': 'A little, yes', 'm.vitality.n': 'Not really',
      'm.vitality.ya': 'You have noticed a signal from your body. In Cigna’s 360° survey, 93 in 100 Kenyan respondents reported stress, the highest share among 16 countries; disrupted sleep was also reported. If stress keeps following you into the night, then restful sleep can become harder to protect. (Cigna 360° survey)',
      'm.vitality.yw': 'One thing makes every body signal louder. The short post is about sleep, and why everything feels harder without it.',
      'm.vitality.na': 'That is fine; you do not have to identify anything right away. Kenya’s vitality score was 79.3 in Cigna’s 2025 study, compared with a global average of 63.2. If you give yourself a quiet moment to check in, then you may notice what helps you feel restored. (Cigna, 2025)',
      'm.vitality.nw': 'There is an easier place to look first. The short post is about what four hours of sleep does to a day.',

      'r.attunement.label': 'Attunement',
      'm.attunement.q': 'Take a breath. Is there anything from this week at work you would like to make sense of?',
      'm.attunement.y': 'I can put it into words', 'm.attunement.n': 'Not just yet',
      'm.attunement.ya': 'Putting an experience into words can make it easier to understand what affected you. A July 2026 survey found that 87 in 100 Kenyan workers reported workplace stress. If you can name what is weighing on you, then you have a clearer starting point for deciding what might help. (Niche Human Capital Advisory, 2026)',
      'm.attunement.yw': 'Once you can name it, there is one more word worth knowing. The short post is about it, and what it does to the noise in your head.',
      'm.attunement.na': 'You do not have to find the words immediately. If there is someone you trust enough to talk things through with, then you do not have to carry every difficult moment alone. Gallup’s workplace research found that about 2 in 10 employees in the US have a best friend at work. (Gallup, US data)',
      'm.attunement.nw': 'One word is usually enough to settle it. The short post shows which.',

      'r.purpose.label': 'Purpose',
      'm.purpose.q': 'Beyond work and responsibilities, what would you like to make more room for in your life?',
      'm.purpose.y': 'Something comes to mind', 'm.purpose.n': 'I’m still figuring it out',
      'm.purpose.ya': 'You have something beyond work that matters to you. If you make small, regular room for it, then your time can reflect what you value, not only what demands your attention. The number of Kenyans saving for retirement doubled between 2021 and 2024. (FinAccess 2024)',
      'm.purpose.yw': 'An answer is the start; what you do with it is the rest. The short post is about the next step, where purpose becomes real.',
      'm.purpose.na': 'It is all right not to have a clear answer yet. If daily demands take up all your attention, then longer-term priorities can keep getting pushed aside: 36 in 100 Kenyans save for day-to-day needs, 28 for emergencies and 13 for retirement. (FinAccess 2024)',
      'm.purpose.nw': 'The way in is smaller than a big answer. The short post shows where a small step starts.',

      'r.unsure.label': 'Not sure',
      'm.unsure.q': 'Before the evening gets going, is there anything from work you would like to set down for now?',
      'm.unsure.y': 'Yes, something is still there', 'm.unsure.n': 'No, I can leave it for now',
      'm.unsure.ya': 'If work keeps occupying your thoughts after hours, then it can leave less room for rest and the rest of your life. In one Cigna survey, 95 in 100 Kenyan respondents reported at least one symptom of burnout. (Cigna 360° survey)',
      'm.unsure.yw': 'There is an easy place to start. The four pillars show where.',
      'm.unsure.na': 'Being able to set work aside is worth protecting. If you make space for the people in your life after work, then you are investing in another part of your wellbeing too. Kenya’s social-health score was 63.9, compared with 62.9 globally. (Cigna 360° survey)',
      'm.unsure.nw': 'That skill has a place in a good life. The four pillars show where.',

      'r.ok.label': 'Going well',
      'r.ok.action': 'Things are going well, so this is the time to build. Formal financial access in Kenya rose from 26.7% in 2006 to 84.8% in 2024. (FinAccess 2024)',
      'r.ok.why': 'Pick above the part of your life you would give two more hours to.'
    },
    sw: {
      'kicker': '',
      'q': 'Ni sehemu gani ya maisha yako ungependa kuipa nafasi kidogo leo?',
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
      'book': 'Weka miadi ya mazungumzo ya kwanza',
      'bookNote': 'Chagua siku na saa. Si lazima ujiandae au uelezee kikamilifu.',
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
      'm.connection.q': 'Umefika nyumbani sasa. Ni mambo gani yanaweza kusubiri hadi kesho?',
      'm.connection.y': 'Mengi yanaweza kusubiri', 'm.connection.n': 'Karibu hakuna linaloweza kusubiri',
      'm.connection.ya': 'Kuondoka kazini ni rahisi. Kuiacha kazi akilini ni jambo tofauti. Ikiwa kazi inakufuata nyumbani, basi watu na mambo unayofanyia kazi wanapata muda na nguvu zako kidogo. Na kesho unaanza ukiwa na nguvu chache. (Utafiti wa Cigna 360°: wafanyakazi 85 kati ya 100 nchini Kenya wanasema wanahisi wameunganishwa na kazi kila wakati, ikilinganishwa na 72 duniani.)',
      'm.connection.yw': 'Kuna hatua ndogo inayotoa nafasi kwa watu mwishoni mwa siku. Makala fupi inahusu ujumbe unaoendelea kusema utatuma.',
      'm.connection.na': 'Si rahisi kila mara kuiacha kazi nyuma, na hauko peke yako: wafanyakazi 85 kati ya 100 nchini Kenya wanasema wanahisi wameunganishwa na kazi kila wakati, ikilinganishwa na 72 duniani. Ikiwa kazi inaendelea kuchukua jioni zako, basi muda na nguvu zinazobaki kwa watu na mambo unayofanyia kazi hupungua. (Utafiti wa Cigna 360°)',
      'm.connection.nw': 'Kuna hatua ndogo kuliko kujitenga kabisa. Makala fupi inahusu ujumbe unaoendelea kusema utatuma.',

      'r.vitality.label': 'Nguvu',
      'm.vitality.q': 'Siku inapokaribia kuisha, unaweza kutambua sehemu ambayo mwili wako umekaza?',
      'm.vitality.y': 'Ndiyo, kidogo', 'm.vitality.n': 'Si sana',
      'm.vitality.ya': 'Umetambua ishara kutoka kwa mwili wako. Katika utafiti wa Cigna 360°, washiriki 93 kati ya 100 nchini Kenya waliripoti msongo wa mawazo, kiwango cha juu zaidi kati ya nchi 16; pia waliripoti matatizo ya usingizi. Ikiwa msongo unaendelea hadi usiku, basi inaweza kuwa vigumu zaidi kulinda usingizi wa kupumzika. (Utafiti wa Cigna 360°)',
      'm.vitality.yw': 'Kuna kitu kimoja kinachofanya kila ishara ya mwili iwe kubwa zaidi. Makala fupi inahusu usingizi, na kwa nini kila kitu huwa kigumu bila huo.',
      'm.vitality.na': 'Ni sawa kama huwezi kutambua mara moja. Alama ya Kenya ya vitality ilikuwa 79.3 katika utafiti wa Cigna wa 2025, ikilinganishwa na wastani wa dunia wa 63.2. Ukijipa muda mfupi wa kujisikiliza, unaweza kugundua kinachokusaidia kupata nguvu tena. (Cigna, 2025)',
      'm.vitality.nw': 'Kuna mahali rahisi zaidi pa kutazama kwanza. Makala fupi inahusu kile saa nne za usingizi hufanya kwa siku.',

      'r.attunement.label': 'Kujisikiliza',
      'm.attunement.q': 'Vuta pumzi. Kuna jambo lolote la kazini wiki hii ambalo ungependa kulielewa vizuri zaidi?',
      'm.attunement.y': 'Naweza kulieleza', 'm.attunement.n': 'Bado sijapata maneno',
      'm.attunement.ya': 'Kuweka jambo katika maneno kunaweza kurahisisha kulielewa na kuona lilivyokuathiri. Utafiti wa Julai 2026 ulipata kuwa wafanyakazi 87 kati ya 100 nchini Kenya waliripoti msongo kazini. Ukiweza kutambua kinachokusumbua, basi unakuwa na mwanzo ulio wazi wa kutafuta kinachoweza kusaidia. (Niche Human Capital Advisory, 2026)',
      'm.attunement.yw': 'Ukishaweza kuutaja, kuna neno moja zaidi la kujua. Makala fupi inalihusu, na linachofanya kwa kelele kichwani.',
      'm.attunement.na': 'Si lazima upate maneno mara moja. Ikiwa kuna mtu unayemwamini wa kuzungumza naye, basi huhitaji kubeba kila wakati mgumu peke yako. Utafiti wa Gallup ulipata kuwa takriban wafanyakazi 2 kati ya 10 nchini Marekani wana rafiki wa karibu kazini. (Gallup, data ya Marekani)',
      'm.attunement.nw': 'Neno moja kwa kawaida linatosha kuutuliza. Makala fupi inaonyesha ni lipi.',

      'r.purpose.label': 'Lengo',
      'm.purpose.q': 'Mbali na kazi na majukumu, ungependa kupata nafasi zaidi ya kufanya nini maishani?',
      'm.purpose.y': 'Kuna jambo linanijia akilini', 'm.purpose.n': 'Bado nalitafakari',
      'm.purpose.ya': 'Kuna jambo muhimu kwako nje ya kazi. Ukilitengenezea nafasi kidogo mara kwa mara, basi muda wako unaweza kuonyesha mambo unayothamini, si yale yanayohitaji umakini wako pekee. Idadi ya Wakenya wanaoweka akiba ya kustaafu iliongezeka maradufu kati ya 2021 na 2024. (FinAccess 2024)',
      'm.purpose.yw': 'Jibu ni mwanzo; unachofanya nalo ndicho kilichobaki. Makala fupi inahusu hatua inayofuata, mahali ambapo lengo huwa halisi.',
      'm.purpose.na': 'Ni sawa kama bado huna jibu lililo wazi. Ikiwa mahitaji ya kila siku yanachukua umakini wako wote, basi mipango ya muda mrefu inaweza kuendelea kusogezwa mbele: Wakenya 36 kati ya 100 huweka akiba kwa mahitaji ya kila siku, 28 kwa dharura na 13 kwa kustaafu. (FinAccess 2024)',
      'm.purpose.nw': 'Njia ya kuingia ni ndogo kuliko jibu kubwa. Makala fupi inaonyesha hatua ndogo inaanzia wapi.',

      'r.unsure.label': 'Sina uhakika',
      'm.unsure.q': 'Kabla jioni haijaendelea, kuna jambo lolote la kazini ambalo ungependa kuliweka pembeni kwa sasa?',
      'm.unsure.y': 'Ndiyo, bado lipo akilini', 'm.unsure.n': 'Hapana, naweza kuliacha kwa sasa',
      'm.unsure.ya': 'Ikiwa kazi inaendelea kuchukua nafasi akilini mwako baada ya saa za kazi, basi inabaki nafasi ndogo kwa mapumziko na maisha yako mengine. Katika utafiti mmoja wa Cigna, washiriki 95 kati ya 100 nchini Kenya waliripoti angalau dalili moja ya burnout. (Utafiti wa Cigna 360°)',
      'm.unsure.yw': 'Kuna mahali rahisi pa kuanzia. Nguzo nne zinaonyesha ni wapi.',
      'm.unsure.na': 'Kuweza kuweka kazi pembeni ni jambo la kulinda. Ukipata nafasi ya kuwa pamoja na watu wako baada ya kazi, basi unajenga pia sehemu nyingine ya ustawi wako. Alama ya Kenya ya afya ya kijamii ilikuwa 63.9, ikilinganishwa na 62.9 duniani. (Utafiti wa Cigna 360°)',
      'm.unsure.nw': 'Ujuzi huo una nafasi katika maisha mazuri. Nguzo nne zinaonyesha ni wapi.',

      'r.ok.label': 'Mambo yanaenda vizuri',
      'r.ok.action': 'Mambo yanaenda vizuri, kwa hiyo huu ndio wakati wa kujenga. Upatikanaji wa huduma rasmi za kifedha nchini Kenya ulipanda kutoka 26.7% mwaka 2006 hadi 84.8% mwaka 2024. (FinAccess 2024)',
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

  // Booking is offered only on the answers that signal the load is not lifting. Not after every answer.
  var BOOK_URL = 'ServiceBooking.html';
  var BOOK = { 'connection:n': true, 'vitality:n': true };

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

  // Booking link and reassurance, also built here: the link borrows the read link's look, the note borrows the why line's.
  var book = read.cloneNode(true);
  book.id = 'lq-book';
  book.removeAttribute('data-i18n');
  book.setAttribute('href', BOOK_URL);
  book.hidden = true;
  read.parentNode.insertBefore(book, read.nextSibling);
  var bookNote = whyEl.cloneNode(false);
  bookNote.removeAttribute('data-r');
  bookNote.hidden = true;
  book.parentNode.insertBefore(bookNote, book.nextSibling);

  function setText(el, value) {
    var inner = el.querySelector('span');
    (inner || el).textContent = value;
  }

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
    var showBook = !!(mirrored && state.ans && BOOK[k + ':' + state.ans]);
    action.hidden = !showAction;
    help.hidden = k !== 'help';
    mirror.hidden = !asking;
    mainRow.hidden = asking;
    next.hidden = !(showAction && !asking && state.done);
    book.hidden = !showBook;
    bookNote.hidden = !showBook;

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
      if (showBook) {
        setText(book, t('book'));
        bookNote.textContent = t('bookNote');
      }
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
    // Track clicks on the post and booking links (anchors, so the button handling below ignores them).
    var link = e.target.closest('a');
    if (link && window.luamTrack) {
      if (link.id === 'lq-read') luamTrack('read_click', state.picked + ':' + (state.ans || ''));
      if (link.id === 'lq-book') luamTrack('book_click', state.picked + ':' + (state.ans || ''));
    }

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
