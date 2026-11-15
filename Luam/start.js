/* Luam "Making room for supportive connections" module. No dependencies. Everything stays on the visitor's device.

   Flow (calm, one step at a time, no statistics, no urgency):
     pick the kind of support you need today
       -> a short, plain description of that kind of support
       -> a line on choosing a safe person
       -> a ready-made first sentence (copy it, or try another)
       -> "I will reach out" -> gentle close + optional next steps.
   'trained' also shows the booking link. 'help' shows the Emergency card.

   REVIEW BEFORE PUBLISHING:
   - Swahili strings were written without a native-speaker review. Have one read them for tone, not just accuracy.
   - Confirm the booking note matches what really happens at a first session.
   - Confirm 999 / 112 and the Emergency page are correct and current. */
(function () {
  'use strict';

  var root = document.getElementById('start');
  if (!root) return;

  var D = {
    en: {
      'kicker': 'Not sure where to start?',
      'q': 'Making room for supportive connections',
      'sub': 'You do not have to carry this alone, and you do not have to do it all at once. Start with one person, one honest sentence, one small step.',
      'pickLead': 'What kind of support would help most today?',
      'o.listen.l': 'Someone who listens', 'o.listen.s': 'No fixing, just company',
      'o.hand.l': 'Someone who helps', 'o.hand.s': 'A practical hand',
      'o.been.l': 'Someone who has been there', 'o.been.s': 'A person with a similar story',
      'o.trained.l': 'Someone trained to help', 'o.trained.s': 'A counsellor or psychologist',
      'x.unsure': 'Not sure', 'x.ok': 'Things are going well', 'x.help': 'It is heavier than this',
      'twoMin': 'One small step',
      'scriptLead': 'A first sentence you can borrow:',
      'copy': 'Copy this sentence',
      'copied': 'Copied. Paste it into a message, or say it out loud.',
      'swap': 'Another sentence',
      'doneBtn': 'I will reach out',
      'book': 'Book a first conversation',
      'bookNote': 'Pick a day and time. You do not need to prepare or explain it perfectly.',
      'doneMsg': 'Good. One honest sentence is enough for today. Come back whenever you like.',
      'nextLead': 'If you would like someone trained alongside the people you trust:',
      'nextSym': 'Track how you feel over time with Symmetry',
      'nextCare': 'Talk with a licensed psychologist',
      'privacy': 'Nothing you tap here leaves your device.',
      'steps': ' Small steps taken on this device: ',
      'helpTag': 'Please talk to a person',
      'helpLead': 'Thank you for saying so. A tip is not enough for this.',
      'helpBody': 'Reach someone now: a person you trust, a clinician, or your nearest health facility. You do not have to explain it perfectly.',
      'helpDanger': 'In danger or thinking of ending your life? Call 999 or 112 now.',
      'helpBtn': 'Open the Emergency page',

      'r.listen.label': 'Someone who listens',
      'r.listen.action': 'Choose the person who lets you finish your sentence. You do not need advice from them, only company while you say it.',
      'r.listen.why': 'A safe person keeps things private, does not rush to blame, and can sit through a quiet moment. Telling just one person is enough. It is also fine to wait until someone feels right.',
      'r.listen.s1': 'Can I sit with you for a bit? I have had a lot on my mind.',
      'r.listen.s2': 'I do not need advice. I just need someone to listen.',

      'r.hand.label': 'Someone who helps',
      'r.hand.action': 'Some of the weight is practical: a lift, a meal, an hour with the children. Asking for one concrete thing is a gentle way of reaching out.',
      'r.hand.why': 'Small and specific is easier to say yes to than a big, open request. A neighbour, a cousin or a friend from your chama can often do this well.',
      'r.hand.s1': 'Could you help me with one thing this week? I will tell you what it is.',
      'r.hand.s2': 'Would you check in on me on Thursday evening?',

      'r.been.label': 'Someone who has been there',
      'r.been.action': 'It can steady you to hear from a person who has walked a similar road. That might be a friend, someone from your church, mosque or chama, or an elder you respect.',
      'r.been.why': 'Faith and community are a natural part of your circle. They can sit beside professional care, not instead of it.',
      'r.been.s1': 'Have you ever gone through something like this? How did you get through it?',
      'r.been.s2': 'I think you understand this better than most. Can we talk?',

      'r.trained.label': 'Someone trained to help',
      'r.trained.action': 'A counsellor or psychologist is someone whose work is to listen well. You can begin with one conversation and decide your next step afterwards.',
      'r.trained.why': 'You do not need a name for what is disturbing you. You can take someone you trust with you, and you can go at your own pace.',
      'r.trained.s1': 'I have not felt like myself lately and I am not sure why. I would like to talk to someone.',
      'r.trained.s2': 'Would you come with me to talk to someone?',

      'r.unsure.label': 'Not sure',
      'r.unsure.action': 'That is a fine place to start. You do not have to explain it perfectly. Saying you are not sure is already a real sentence.',
      'r.unsure.why': 'Clarity tends to arrive during the conversation, not before it. Start with whoever feels easiest.',
      'r.unsure.s1': 'I am not sure what is going on, but I have not felt like myself.',
      'r.unsure.s2': 'Can we talk later? There is something I have been carrying.',

      'r.ok.label': 'Going well',
      'r.ok.action': 'Good. This is a calm time to strengthen your circle: send a short message to someone who matters, with no reason attached.',
      'r.ok.why': 'Small, regular contact is what makes a circle easy to lean on later.',
      'r.ok.s1': 'I was thinking of you. How are you?',
      'r.ok.s2': 'No reason, I just wanted to say hello.'
    },
    sw: {
      'kicker': 'Unatafuta pa kuanzia?',
      'q': 'Kutoa nafasi kwa miunganisho ya kusaidiana',
      'sub': 'Si lazima ubebe haya peke yako, wala kufanya yote kwa mara moja. Anza na mtu mmoja, sentensi moja ya kweli, hatua moja ndogo.',
      'pickLead': 'Ni msaada wa aina gani ungekusaidia zaidi leo?',
      'o.listen.l': 'Mtu wa kunisikiliza', 'o.listen.s': 'Si kutatua, ni kuwa pamoja',
      'o.hand.l': 'Mtu wa kunisaidia', 'o.hand.s': 'Msaada wa vitendo',
      'o.been.l': 'Mtu aliyepitia', 'o.been.s': 'Mtu mwenye hadithi inayofanana',
      'o.trained.l': 'Mtu aliyefunzwa kusaidia', 'o.trained.s': 'Mshauri au mwanasaikolojia',
      'x.unsure': 'Sina uhakika', 'x.ok': 'Mambo yanaenda vizuri', 'x.help': 'Ni nzito kuliko hii',
      'twoMin': 'Hatua moja ndogo',
      'scriptLead': 'Sentensi ya kwanza unayoweza kuazima:',
      'copy': 'Nakili sentensi hii',
      'copied': 'Imenakiliwa. Ibandike kwenye ujumbe, au iseme kwa sauti.',
      'swap': 'Sentensi nyingine',
      'doneBtn': 'Nitamfikia mtu',
      'book': 'Weka miadi ya mazungumzo ya kwanza',
      'bookNote': 'Chagua siku na saa. Si lazima ujiandae au uelezee kikamilifu.',
      'doneMsg': 'Vizuri. Sentensi moja ya kweli inatosha leo. Rudi wakati wowote.',
      'nextLead': 'Ukipenda mtu aliyefunzwa pamoja na watu unaowaamini:',
      'nextSym': 'Fuatilia unavyojisikia kwa muda kupitia Symmetry',
      'nextCare': 'Ongea na mwanasaikolojia mwenye leseni',
      'privacy': 'Chochote unachogusa hapa hakiondoki kwenye kifaa chako.',
      'steps': ' Hatua ndogo ulizochukua kwenye kifaa hiki: ',
      'helpTag': 'Tafadhali ongea na mtu',
      'helpLead': 'Asante kwa kusema. Kidokezo hakitoshi kwa hili.',
      'helpBody': 'Mfikie mtu sasa: mtu unayemwamini, mhudumu wa afya, au kituo cha afya kilicho karibu. Si lazima uelezee kikamilifu.',
      'helpDanger': 'Ukiwa hatarini au unafikiria kujiua? Piga 999 au 112 sasa.',
      'helpBtn': 'Fungua ukurasa wa Dharura',

      'r.listen.label': 'Mtu wa kunisikiliza',
      'r.listen.action': 'Chagua mtu anayekuacha umalize sentensi yako. Huhitaji ushauri kutoka kwake, ni kuwa naye tu unapozungumza.',
      'r.listen.why': 'Mtu salama huweka mambo siri, hakimbilii kulaumu, na anaweza kukaa kimya pamoja nawe. Kumwambia mtu mmoja tu kunatosha. Pia ni sawa kusubiri hadi mtu sahihi apatikane.',
      'r.listen.s1': 'Naweza kukaa nawe kidogo? Nina mengi akilini.',
      'r.listen.s2': 'Sihitaji ushauri. Nahitaji tu mtu wa kunisikiliza.',

      'r.hand.label': 'Mtu wa kunisaidia',
      'r.hand.action': 'Sehemu ya mzigo ni ya vitendo: usafiri, mlo, saa moja na watoto. Kuomba jambo moja mahususi ni njia nyepesi ya kuomba msaada.',
      'r.hand.why': 'Ombi dogo na mahususi ni rahisi kukubaliwa kuliko ombi kubwa lisilo wazi. Jirani, binamu au rafiki wa chama anaweza kulifanya vizuri.',
      'r.hand.s1': 'Unaweza kunisaidia kwa jambo moja wiki hii? Nitakuambia ni lipi.',
      'r.hand.s2': 'Unaweza kunijulia hali Alhamisi jioni?',

      'r.been.label': 'Mtu aliyepitia',
      'r.been.action': 'Inaweza kukutuliza kusikia kutoka kwa mtu aliyepita njia inayofanana. Anaweza kuwa rafiki, mtu wa kanisani, msikitini au chamani, au mzee unayemheshimu.',
      'r.been.why': 'Imani na jamii ni sehemu ya kawaida ya mzunguko wako. Vinaweza kwenda sambamba na huduma ya kitaalamu, si badala yake.',
      'r.been.s1': 'Umewahi kupitia jambo kama hili? Ulivuka vipi?',
      'r.been.s2': 'Nadhani unalielewa hili kuliko wengi. Tunaweza kuzungumza?',

      'r.trained.label': 'Mtu aliyefunzwa kusaidia',
      'r.trained.action': 'Mshauri au mwanasaikolojia ni mtu ambaye kazi yake ni kusikiliza vizuri. Unaweza kuanza na mazungumzo moja kisha uamue hatua inayofuata.',
      'r.trained.why': 'Huhitaji jina la kinachokusumbua. Unaweza kwenda na mtu unayemwamini, na kwenda kwa kasi yako mwenyewe.',
      'r.trained.s1': 'Sijajisikia kama mimi mwenyewe siku za karibuni na sijui kwa nini. Ningependa kuzungumza na mtu.',
      'r.trained.s2': 'Unaweza kuja nami kuzungumza na mtu?',

      'r.unsure.label': 'Sina uhakika',
      'r.unsure.action': 'Hapo ni mahali pazuri pa kuanzia. Si lazima uelezee kikamilifu. Kusema huna uhakika tayari ni sentensi kamili.',
      'r.unsure.why': 'Uwazi mara nyingi huja wakati wa mazungumzo, si kabla yake. Anza na yeyote anayeonekana rahisi zaidi.',
      'r.unsure.s1': 'Sijui nini kinaendelea, lakini sijajisikia kama mimi mwenyewe.',
      'r.unsure.s2': 'Tunaweza kuzungumza baadaye? Kuna jambo nimekuwa nikibeba.',

      'r.ok.label': 'Mambo yanaenda vizuri',
      'r.ok.action': 'Vizuri. Huu ni wakati tulivu wa kuimarisha mzunguko wako: mtumie ujumbe mfupi mtu muhimu kwako, bila sababu yoyote.',
      'r.ok.why': 'Mawasiliano madogo ya mara kwa mara ndiyo hufanya mzunguko uwe rahisi kuutegemea baadaye.',
      'r.ok.s1': 'Nilikuwa nakufikiria. Hujambo?',
      'r.ok.s2': 'Bila sababu, nilitaka tu kukusalimu.'
    }
  };

  var BOOK_URL = 'ServiceBooking.html';
  var BOOK = { trained: true };

  var state = { lang: 'en', picked: null, si: 1, done: false, count: 0 };
  try {
    var l = localStorage.getItem('lq_lang');
    if (l === 'sw' || l === 'en') state.lang = l;
    var n = parseInt(localStorage.getItem('lq_steps') || '0', 10);
    if (n > 0) state.count = n;
  } catch (e) { /* storage blocked: the module still works */ }

  var action = document.getElementById('lq-action');
  var help = document.getElementById('lq-help');
  var next = document.getElementById('lq-next');
  var count = document.getElementById('lq-count');
  var scriptEl = document.getElementById('lq-script');
  var copyBtn = document.getElementById('lq-copy');
  var swapBtn = document.getElementById('lq-swap');
  var copyMsg = document.getElementById('lq-copied');
  var book = document.getElementById('lq-book');
  var bookNote = document.getElementById('lq-booknote');

  function t(key) {
    var d = D[state.lang];
    return (d && d[key]) || D.en[key] || '';
  }

  function render() {
    var k = state.picked;
    var showAction = !!k && k !== 'help';
    action.hidden = !showAction;
    help.hidden = k !== 'help';
    next.hidden = !(showAction && state.done);
    var showBook = !!(showAction && BOOK[k]);
    book.hidden = !showBook;
    bookNote.hidden = !showBook;
    copyMsg.textContent = '';

    if (showAction) {
      var map = {
        label: t('r.' + k + '.label'),
        action: t('r.' + k + '.action'),
        why: t('r.' + k + '.why')
      };
      action.querySelectorAll('[data-r]').forEach(function (el) {
        el.textContent = map[el.getAttribute('data-r')] || '';
      });
      scriptEl.textContent = t('r.' + k + '.s' + state.si);
      if (showBook) {
        book.textContent = t('book');
        book.setAttribute('href', BOOK_URL);
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

  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
      done();
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
    } catch (e) { fallback(); }
  }

  root.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (link && window.luamTrack) {
      if (link.id === 'lq-book') luamTrack('book_click', state.picked || '');
    }

    var btn = e.target.closest('button');
    if (!btn || !root.contains(btn)) return;

    var k = btn.getAttribute('data-k');
    var lang = btn.getAttribute('data-lang');

    if (k) {
      if (window.luamTrack) {
        if (/^(listen|hand|been|trained)$/.test(k)) luamTrack('checkin_pick', k);
        else luamTrack('checkin_alt', k);
      }
      state.picked = k;
      state.si = 1;
      state.done = false;
      render();
    } else if (lang) {
      if (window.luamTrack) luamTrack('lang_switch', lang);
      state.lang = lang;
      try { localStorage.setItem('lq_lang', lang); } catch (err) { /* ignore */ }
      applyLang();
    } else if (btn.id === 'lq-swap') {
      state.si = state.si === 1 ? 2 : 1;
      scriptEl.textContent = t('r.' + state.picked + '.s' + state.si);
      copyMsg.textContent = '';
    } else if (btn.id === 'lq-copy') {
      if (window.luamTrack) luamTrack('script_copy', state.picked + ':' + state.si);
      copyText(scriptEl.textContent, function () { copyMsg.textContent = t('copied'); });
    } else if (btn.id === 'lq-done') {
      if (window.luamTrack) luamTrack('checkin_done', state.picked || '');
      state.done = true;
      state.count += 1;
      try { localStorage.setItem('lq_steps', String(state.count)); } catch (err) { /* ignore */ }
      render();
    }
  });

  root.classList.add('lq-js');
  applyLang();
})();
