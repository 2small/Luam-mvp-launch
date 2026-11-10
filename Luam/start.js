/* Luam "one question" module. No dependencies. Everything stays on the visitor's device. */
(function () {
  'use strict';

  var root = document.getElementById('start');
  if (!root) return;

  var D = {
    en: {
      'kicker': 'Not sure where to start?',
      'q': 'You look after what matters. Which one needs you today?',
      'sub': 'Tap one. There is no wrong answer, and nothing to fill in.',
      'o.connection.l': 'Connection', 'o.connection.s': 'I feel alone or cut off',
      'o.vitality.l': 'Vitality', 'o.vitality.s': 'My body is running on empty',
      'o.attunement.l': 'Attunement', 'o.attunement.s': 'My head is loud or tense',
      'o.purpose.l': 'Purpose', 'o.purpose.s': 'I feel stuck or without direction',
      'x.unsure': 'Not sure', 'x.ok': 'I am fine today', 'x.help': 'It is heavier than this',
      'twoMin': 'Two minutes',
      'doneBtn': 'I did it',
      'watch': 'Watch the scene',
      'watchAll': 'Explore the four pillars',
      'read': 'Read the short post',
      'doneMsg': 'Done. That is what someone who looks after their mind does. Come back whenever you like.',
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
      'r.connection.action': 'Send one message to someone you trust. It can be as short as: Thinking of you. How are you?',
      'r.connection.why': 'Brief contact with one trusted person tends to ease stress more than coping alone.',
      'r.vitality.label': 'Vitality',
      'r.vitality.action': 'Drink a glass of water. Then stand up and stretch or walk for two minutes.',
      'r.vitality.why': 'Water, movement and sleep are the base the other pillars sit on.',
      'r.attunement.label': 'Attunement',
      'r.attunement.action': 'Breathe in for 4, out for 6, five times. Then put one word on what you feel.',
      'r.attunement.why': 'A longer out-breath settles the body, and naming a feeling tends to lower its intensity.',
      'r.purpose.label': 'Purpose',
      'r.purpose.action': 'Write one sentence: the one thing that would make today count. Then pick its first two-minute step.',
      'r.purpose.why': 'A small, specific aim turns a vague weight into something you can move.',
      'r.unsure.label': 'Not sure',
      'r.unsure.action': 'Do three tiny things: sip water, breathe out slowly three times, and name one thing you got done today.',
      'r.unsure.why': 'When you cannot tell what is wrong, the body basics help most.',
      'r.ok.label': 'Fine today',
      'r.ok.action': 'Good. Look through the pillars so you know where to start on a harder day.',
      'r.ok.why': 'Knowing where to begin before you need it makes it easier to use.'
    },
    sw: {
      'kicker': 'Huna uhakika wa pa kuanzia?',
      'q': 'Unajali yaliyo muhimu. Ni kipi kinakuhitaji leo?',
      'sub': 'Gusa kimoja. Hakuna jibu baya, na hakuna cha kujaza.',
      'o.connection.l': 'Muunganiko', 'o.connection.s': 'Najihisi peke yangu',
      'o.vitality.l': 'Nguvu', 'o.vitality.s': 'Mwili wangu umechoka',
      'o.attunement.l': 'Kujisikiliza', 'o.attunement.s': 'Kichwa changu kina kelele au mvutano',
      'o.purpose.l': 'Lengo', 'o.purpose.s': 'Nimekwama au sina mwelekeo',
      'x.unsure': 'Sina uhakika', 'x.ok': 'Niko sawa leo', 'x.help': 'Ni nzito kuliko hii',
      'twoMin': 'Dakika mbili',
      'doneBtn': 'Nimefanya',
      'watch': 'Tazama onyesho',
      'watchAll': 'Gundua nguzo nne',
      'read': 'Soma makala fupi',
      'doneMsg': 'Imekamilika. Hivyo ndivyo anavyofanya mtu anayejali akili yake. Rudi wakati wowote.',
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
      'r.connection.action': 'Mtumie ujumbe mtu unayemwamini. Unaweza kuwa mfupi: Nakukumbuka. Hujambo?',
      'r.connection.why': 'Mawasiliano mafupi na mtu mmoja unayemwamini mara nyingi hupunguza msongo kuliko kukabiliana peke yako.',
      'r.vitality.label': 'Nguvu',
      'r.vitality.action': 'Kunywa glasi ya maji. Kisha simama na unyooshe mwili au utembee kwa dakika mbili.',
      'r.vitality.why': 'Maji, mwendo na usingizi ni msingi wa nguzo nyingine.',
      'r.attunement.label': 'Kujisikiliza',
      'r.attunement.action': 'Vuta pumzi kwa hesabu ya 4, toa kwa hesabu ya 6, mara tano. Kisha taja kwa neno moja unachohisi.',
      'r.attunement.why': 'Kutoa pumzi kwa muda mrefu hutuliza mwili, na kutaja hisia mara nyingi hupunguza nguvu yake.',
      'r.purpose.label': 'Lengo',
      'r.purpose.action': 'Andika sentensi moja: jambo moja litakalofanya leo iwe na maana. Kisha chagua hatua yake ya kwanza ya dakika mbili.',
      'r.purpose.why': 'Lengo dogo na mahususi hubadilisha mzigo usio wazi kuwa kitu unachoweza kusogeza.',
      'r.unsure.label': 'Sina uhakika',
      'r.unsure.action': 'Fanya mambo madogo matatu: kunywa maji, toa pumzi polepole mara tatu, na taja jambo moja ulilokamilisha leo.',
      'r.unsure.why': 'Usipojua tatizo ni nini, mambo ya msingi ya mwili husaidia zaidi.',
      'r.ok.label': 'Niko sawa',
      'r.ok.action': 'Vizuri. Pitia nguzo hizi ili ujue pa kuanzia siku ngumu zaidi.',
      'r.ok.why': 'Kujua pa kuanzia kabla ya kuhitaji hurahisisha kutumia.'
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

  var state = { lang: 'en', picked: null, done: false, count: 0 };
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

  function t(key) {
    var d = D[state.lang];
    return (d && d[key]) || D.en[key] || '';
  }

  function render() {
    var k = state.picked;
    var showAction = k && k !== 'help';
    action.hidden = !showAction;
    help.hidden = k !== 'help';
    next.hidden = !(showAction && state.done);

    if (showAction) {
      action.querySelectorAll('[data-r]').forEach(function (el) {
        el.textContent = t('r.' + k + '.' + el.getAttribute('data-r'));
      });
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
    var btn = e.target.closest('button');
    if (!btn || !root.contains(btn)) return;

    var k = btn.getAttribute('data-k');
    var lang = btn.getAttribute('data-lang');

    if (k) {
      if (window.luamTrack) { if (/^(connection|vitality|attunement|purpose)$/.test(k)) luamTrack('checkin_pick', k); else luamTrack('checkin_alt'); }
      state.picked = k;
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
