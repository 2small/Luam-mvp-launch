/* Luam "one question" module. No dependencies. Everything stays on the visitor's device. */
(function () {
  'use strict';

  var root = document.getElementById('start');
  if (!root) return;

  /* Flow per pillar: question -> answer -> a fact (key ...a) -> a nudge toward the post (key ...w) -> read link.
     Key names are unchanged so the logic below needs no new branches. */
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
      'm.connection.ya': 'Researchers call this stepping away from work in your head. It is one of the habits most consistently linked to waking up rested. You have a skill many hard workers lose.',
      'm.connection.yw': 'The short post shows what the best at it do differently.',
      'm.connection.na': 'That is very common among people who care about their work. Research suggests what ends the day for the mind is often a smaller signal than rest.',
      'm.connection.nw': 'The short post names the one most people overlook.',
      'r.vitality.label': 'Vitality',
      'm.vitality.q': 'By evening, where does the day sit in your body: shoulders, jaw, stomach, hands?',
      'm.vitality.y': 'Somewhere, yes', 'm.vitality.n': 'I cannot tell',
      'm.vitality.ya': 'Noticing where stress sits in your body is a real skill, and researchers link it to handling stress better. Most people only notice when it starts to hurt.',
      'm.vitality.yw': 'The short post shows the next step once you have found it.',
      'm.vitality.na': 'That is normal. The body is easiest to read when you stop moving. Many people only feel the tension on a quiet evening, or when the matatu finally stops.',
      'm.vitality.nw': 'The short post explains where to look first.',
      'r.attunement.label': 'Attunement',
      'm.attunement.q': 'Think of the hardest moment at work this week. Can you say in a few words what it did to you?',
      'm.attunement.y': 'I can', 'm.attunement.n': 'I just moved on',
      'm.attunement.ya': 'Brain imaging studies show that putting a feeling into words calms the part of the brain that sounds the alarm. You have already done the hard part.',
      'm.attunement.yw': 'The short post is about one word, and what it does to the noise in your head.',
      'm.attunement.na': 'Moving on fast is a strength in a tough hustle. The same research shows a feeling that is named tends to quiet down, and it takes a single word.',
      'm.attunement.nw': 'The short post shows which word.',
      'r.purpose.label': 'Purpose',
      'm.purpose.q': 'If someone asked who you are without mentioning your job, what would you say?',
      'm.purpose.y': 'I have an answer', 'm.purpose.n': 'I would struggle',
      'm.purpose.ya': 'Large studies link having a sense of purpose with better health and a lower risk of dying early. Having an answer ready is a good sign.',
      'm.purpose.yw': 'The short post is about the next step, where purpose becomes real.',
      'm.purpose.na': 'Many hard workers cannot answer it, because the job has answered for them for years. Research suggests purpose tends to grow from small steps, not from one big revelation.',
      'm.purpose.nw': 'The short post shows where that small step starts.',
      'r.unsure.label': 'Not sure',
      'm.unsure.q': 'Is there one work task you are still carrying in your head, long after you left it?',
      'm.unsure.y': 'Yes, one', 'm.unsure.n': 'No, I let it go',
      'm.unsure.ya': 'The mind keeps unfinished tasks open, which is why they follow you home. Researchers have documented this, and it is easier to switch off than most people think.',
      'm.unsure.yw': 'The four pillars show where to start.',
      'm.unsure.na': 'Letting work go at the end of the day is linked to sleeping better and feeling more recovered. That is a skill worth noticing.',
      'm.unsure.nw': 'The four pillars show where it fits in a good life.',
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
      'm.connection.ya': 'Watafiti huita hili kujitenga na kazi akilini. Ni mojawapo ya tabia zinazohusishwa zaidi na kuamka ukiwa umepumzika. Una ujuzi ambao wachapakazi wengi hupoteza.',
      'm.connection.yw': 'Makala fupi inaonyesha wanaoujua vizuri hufanya nini tofauti.',
      'm.connection.na': 'Hilo ni la kawaida kwa watu wanaojali kazi yao. Utafiti unaonyesha kinachomaliza siku akilini mara nyingi ni ishara ndogo kuliko mapumziko.',
      'm.connection.nw': 'Makala fupi inataja ishara ambayo wengi huikosa.',
      'r.vitality.label': 'Nguvu',
      'm.vitality.q': 'Kufikia jioni, siku inakaa wapi mwilini mwako: mabegani, kwenye taya, tumboni, mikononi?',
      'm.vitality.y': 'Mahali fulani, ndiyo', 'm.vitality.n': 'Siwezi kujua',
      'm.vitality.ya': 'Kutambua mahali msongo unapokaa mwilini ni ujuzi halisi, na watafiti wanauhusisha na kukabiliana vizuri na msongo. Wengi huugundua unapoanza kuuma tu.',
      'm.vitality.yw': 'Makala fupi inaonyesha hatua inayofuata ukishaupata.',
      'm.vitality.na': 'Hilo ni la kawaida. Mwili husomeka kwa urahisi zaidi unapotulia. Wengi huhisi mvutano jioni tulivu, au matatu inaposimama hatimaye.',
      'm.vitality.nw': 'Makala fupi inaeleza pa kuanza kutazama.',
      'r.attunement.label': 'Kujisikiliza',
      'm.attunement.q': 'Fikiria wakati mgumu zaidi kazini wiki hii. Unaweza kusema kwa maneno machache ulikufanya nini?',
      'm.attunement.y': 'Naweza', 'm.attunement.n': 'Nilipita tu',
      'm.attunement.ya': 'Picha za ubongo zimeonyesha kwamba kutaja hisia kwa maneno hutuliza sehemu ya ubongo inayopiga kengele ya hatari. Umeshafanya sehemu ngumu.',
      'm.attunement.yw': 'Makala fupi inahusu neno moja, na linachofanya kwa kelele kichwani.',
      'm.attunement.na': 'Kupita haraka ni nguvu katika kuhangaika kwa bidii. Utafiti huohuo unaonyesha hisia iliyotajwa hutulia, na inahitaji neno moja tu.',
      'm.attunement.nw': 'Makala fupi inaonyesha neno hilo ni lipi.',
      'r.purpose.label': 'Lengo',
      'm.purpose.q': 'Kama mtu angekuuliza wewe ni nani bila kutaja kazi yako, ungesema nini?',
      'm.purpose.y': 'Nina jibu', 'm.purpose.n': 'Ningekwama',
      'm.purpose.ya': 'Tafiti kubwa zinahusisha kuwa na lengo maishani na afya bora na hatari ndogo ya kufa mapema. Kuwa na jibu tayari ni ishara nzuri.',
      'm.purpose.yw': 'Makala fupi inahusu hatua inayofuata, mahali ambapo lengo huwa halisi.',
      'm.purpose.na': 'Wachapakazi wengi hawawezi kulijibu, kwa sababu kazi imewajibia kwa miaka. Utafiti unaonyesha lengo mara nyingi hukua kutokana na hatua ndogo, si ufunuo mmoja mkubwa.',
      'm.purpose.nw': 'Makala fupi inaonyesha hatua hiyo ndogo inaanzia wapi.',
      'r.unsure.label': 'Sina uhakika',
      'm.unsure.q': 'Kuna kazi moja unayoendelea kuibeba kichwani muda mrefu baada ya kuiacha?',
      'm.unsure.y': 'Ndiyo, moja', 'm.unsure.n': 'Hapana, naiachilia',
      'm.unsure.ya': 'Akili huweka kazi ambazo hazijakamilika wazi, ndiyo maana hukufuata nyumbani. Watafiti wameliandika hili, na ni rahisi kulizima kuliko watu wengi wanavyodhani.',
      'm.unsure.yw': 'Nguzo nne zinaonyesha pa kuanza.',
      'm.unsure.na': 'Kuiachia kazi mwisho wa siku kunahusishwa na usingizi bora na kujisikia umepumzika zaidi. Huo ni ujuzi wa kuuthamini.',
      'm.unsure.nw': 'Nguzo nne zinaonyesha unavyofaa katika maisha mazuri.',
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
