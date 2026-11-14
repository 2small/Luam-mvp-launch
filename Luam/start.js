/* Luam "one question" module. No dependencies. Everything stays on the visitor's device. */
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
      'twoMin': 'Two minutes',
      'doneBtn': 'I did it',
      'watch': 'Watch the scene',
      'watchAll': 'Explore the four pillars',
      'read': 'Read the short post',
      'doneMsg': 'Done. That is one small piece of building a life, not just a living. Come back whenever you like.',
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
      'm.connection.ya': 'Notice what does it for you: chai, a shower, a greeting. Do it on purpose tomorrow, before you touch the phone.',
      'm.connection.yw': 'A small ritual tells your mind the day is over. The work will still be there tomorrow, and you will meet it fresher.',
      'm.connection.na': 'Make a doorstep ritual: wash your face, change clothes, then greet one person by name before you open WhatsApp.',
      'm.connection.nw': 'Your mind needs a signal that the day is over. Without one, the job keeps sitting at the table with you.',
      'r.vitality.label': 'Vitality',
      'm.vitality.q': 'By evening, where does the day sit in your body: shoulders, jaw, stomach, hands?',
      'm.vitality.y': 'Somewhere, yes', 'm.vitality.n': 'I cannot tell',
      'm.vitality.ya': 'Rest a hand there. Breathe in for 4, out slowly for 6, three times.',
      'm.vitality.yw': 'The body often lets go of the day before the mind does. A slow breath out is one of the easiest ways to tell it so.',
      'm.vitality.na': 'Next time you sit down, in the matatu or at home, check your shoulders, jaw and hands. Loosen each one.',
      'm.vitality.nw': 'Stress often hides in the body until you stop. Looking for it is the first step to setting it down.',
      'r.attunement.label': 'Attunement',
      'm.attunement.q': 'Think of the hardest moment at work this week. Can you say in a few words what it did to you?',
      'm.attunement.y': 'I can', 'm.attunement.n': 'I just moved on',
      'm.attunement.ya': 'Say it out loud or write it down, then add one line: "And I handled it."',
      'm.attunement.yw': 'Putting a feeling into words tends to turn its volume down. Adding what you handled reminds you the moment is over.',
      'm.attunement.na': 'Finish one sentence: "That moment made me feel..." The first word that comes is enough.',
      'm.attunement.nw': 'Moving on is a real skill in a hard hustle. A feeling you skipped is still around, and one word tends to settle it.',
      'r.purpose.label': 'Purpose',
      'm.purpose.q': 'If someone asked who you are without mentioning your job, what would you say?',
      'm.purpose.y': 'I have an answer', 'm.purpose.n': 'I would struggle',
      'm.purpose.ya': 'Say it to yourself on the way home. That is the person walking through the door.',
      'm.purpose.yw': 'When work is not your whole name, a bad day at work is just a bad day, not a verdict on you.',
      'm.purpose.na': 'Write three lines: someone you are to someone, something you enjoy, something you are good at that nobody pays for.',
      'm.purpose.nw': 'When the hustle takes the whole day, the job can start to feel like the whole self. Three lines are enough to widen it.',
      'r.unsure.label': 'Not sure',
      'm.unsure.q': 'Is there one work task you are still carrying in your head, long after you left it?',
      'm.unsure.y': 'Yes, one', 'm.unsure.n': 'No, I let it go',
      'm.unsure.ya': 'Write it down with the next step and a time: "Tomorrow, 8am, call the supplier."',
      'm.unsure.yw': 'An unfinished task keeps nagging until it has a plan. Once it is written, your head can stop holding it.',
      'm.unsure.na': 'Notice what let you drop it: a list, a person, a ritual. Use it again tomorrow.',
      'm.unsure.nw': 'Dropping work at the end of the day is a skill, and people who have it tend to rest better.',
      'r.ok.label': 'Going well',
      'r.ok.action': 'A good week is the time to build. Pick above the part of your life you would give two more hours to.',
      'r.ok.why': 'Looking after what works is easier than repairing it later.'
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
      'twoMin': 'Dakika mbili',
      'doneBtn': 'Nimefanya',
      'watch': 'Tazama onyesho',
      'watchAll': 'Gundua nguzo nne',
      'read': 'Soma makala fupi',
      'doneMsg': 'Imekamilika. Hicho ni kipande kidogo cha kujenga maisha, si riziki tu. Rudi wakati wowote.',
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
      'm.connection.ya': 'Angalia ni kipi kinakusaidia: chai, kuoga, salamu. Kifanye kwa makusudi kesho, kabla ya kugusa simu.',
      'm.connection.yw': 'Desturi ndogo huiambia akili kwamba siku imekwisha. Kazi itakuwepo kesho, nawe utaikabili ukiwa umeburudika.',
      'm.connection.na': 'Tengeneza desturi ya mlangoni: nawa uso, badilisha nguo, kisha msalimie mtu mmoja kwa jina kabla ya kufungua WhatsApp.',
      'm.connection.nw': 'Akili inahitaji ishara kwamba siku imekwisha. Bila ishara, kazi huendelea kukaa mezani pamoja nawe.',
      'r.vitality.label': 'Nguvu',
      'm.vitality.q': 'Kufikia jioni, siku inakaa wapi mwilini mwako: mabegani, kwenye taya, tumboni, mikononi?',
      'm.vitality.y': 'Mahali fulani, ndiyo', 'm.vitality.n': 'Siwezi kujua',
      'm.vitality.ya': 'Weka mkono hapo. Vuta pumzi kwa hesabu ya 4, toa polepole kwa hesabu ya 6, mara tatu.',
      'm.vitality.yw': 'Mwili mara nyingi huachilia siku kabla ya akili. Kutoa pumzi polepole ni njia rahisi ya kuuambia hivyo.',
      'm.vitality.na': 'Wakati ujao ukikaa, kwenye matatu au nyumbani, angalia mabega, taya na mikono yako. Yalegeze kimoja baada ya kingine.',
      'm.vitality.nw': 'Msongo wa mawazo mara nyingi hujificha mwilini hadi utakapotulia. Kuutafuta ni hatua ya kwanza ya kuuweka chini.',
      'r.attunement.label': 'Kujisikiliza',
      'm.attunement.q': 'Fikiria wakati mgumu zaidi kazini wiki hii. Unaweza kusema kwa maneno machache ulikufanya nini?',
      'm.attunement.y': 'Naweza', 'm.attunement.n': 'Nilipita tu',
      'm.attunement.ya': 'Sema kwa sauti au andika, kisha ongeza mstari mmoja: "Na niliushughulikia."',
      'm.attunement.yw': 'Kutaja hisia kwa maneno mara nyingi hupunguza sauti yake. Kuongeza ulichoshughulikia hukukumbusha kwamba wakati huo umepita.',
      'm.attunement.na': 'Kamilisha sentensi moja: "Wakati ule ulinifanya nihisi..." Neno la kwanza linalokuja linatosha.',
      'm.attunement.nw': 'Kupita haraka ni ujuzi halisi katika kuhangaika kwa bidii. Hisia uliyoruka bado ipo, na neno moja mara nyingi huituliza.',
      'r.purpose.label': 'Lengo',
      'm.purpose.q': 'Kama mtu angekuuliza wewe ni nani bila kutaja kazi yako, ungesema nini?',
      'm.purpose.y': 'Nina jibu', 'm.purpose.n': 'Ningekwama',
      'm.purpose.ya': 'Jiambie hivyo njiani kurudi nyumbani. Huyo ndiye anayeingia mlangoni.',
      'm.purpose.yw': 'Kazi ikiwa si jina lako lote, siku mbaya kazini ni siku mbaya tu, si hukumu juu yako.',
      'm.purpose.na': 'Andika mistari mitatu: wewe ni nani kwa mtu fulani, kitu unachofurahia, kitu unachokiweza ambacho hakuna anayekulipia.',
      'm.purpose.nw': 'Kuhangaika kukichukua siku nzima, kazi inaweza kuanza kuonekana kama nafsi nzima. Mistari mitatu inatosha kuipanua.',
      'r.unsure.label': 'Sina uhakika',
      'm.unsure.q': 'Kuna kazi moja unayoendelea kuibeba kichwani muda mrefu baada ya kuiacha?',
      'm.unsure.y': 'Ndiyo, moja', 'm.unsure.n': 'Hapana, naiachilia',
      'm.unsure.ya': 'Iandike pamoja na hatua inayofuata na wakati: "Kesho, saa mbili asubuhi, mpigie msambazaji."',
      'm.unsure.yw': 'Kazi ambayo haijakamilika huendelea kusumbua hadi iwe na mpango. Ukiiandika, kichwa chako kinaweza kuiachilia.',
      'm.unsure.na': 'Angalia ni kipi kilikusaidia kuiacha: orodha, mtu, desturi. Kitumie tena kesho.',
      'm.unsure.nw': 'Kuiachia kazi mwisho wa siku ni ujuzi, na wanaoujua mara nyingi hupumzika vizuri zaidi.',
      'r.ok.label': 'Mambo yanaenda vizuri',
      'r.ok.action': 'Wiki nzuri ni wakati wa kujenga. Chagua hapo juu sehemu ya maisha ungeipa saa mbili zaidi.',
      'r.ok.why': 'Kutunza kinachofanya kazi ni rahisi kuliko kukirekebisha baadaye.'
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
