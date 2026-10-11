/* =========================================================
   Rusikaa Creative — home page demo 2 script
   Order builder -> live job ticket -> WhatsApp message.
   Edit TYPES to change the choices.
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC;
  var WA = 'https://wa.me/917870140750?text=';
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var COLOURS = { 'White': '#FFFFFF', 'Black': '#1B1B1F', 'Navy': '#06285F', 'Magenta': '#E60070', 'Sunny Yellow': '#FFC93C', 'Sky Blue': '#8FC8F5' };

  // simple icons for the choices that have no product illustration
  var ICON = {
    flex: '<rect x="14" y="40" width="132" height="70" rx="4" fill="#0078BF" stroke="#1C1B3A" stroke-width="5"/><circle cx="26" cy="50" r="4" fill="#FFE800"/><circle cx="134" cy="50" r="4" fill="#FFE800"/><circle cx="26" cy="100" r="4" fill="#FFE800"/><circle cx="134" cy="100" r="4" fill="#FFE800"/><path d="M40 75h80" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/><path d="M40 12v28M120 12v28" stroke="#1C1B3A" stroke-width="5"/>',
    idcard: '<rect x="18" y="34" width="124" height="92" rx="10" fill="#FFFFFF" stroke="#1C1B3A" stroke-width="5"/><circle cx="56" cy="76" r="16" fill="#FF48B0"/><path d="M34 112c4-16 40-16 44 0" fill="#FF48B0"/><path d="M92 66h34M92 82h26M92 98h30" stroke="#1C1B3A" stroke-width="6" stroke-linecap="round"/><path d="M64 34V16h32v18" fill="none" stroke="#1C1B3A" stroke-width="5"/>',
    stamp: '<rect x="44" y="108" width="72" height="26" rx="4" fill="#1C1B3A"/><path d="M60 108V68c0-12 40-12 40 0v40" fill="#FF48B0" stroke="#1C1B3A" stroke-width="5"/><rect x="68" y="22" width="24" height="46" rx="8" fill="#FFE800" stroke="#1C1B3A" stroke-width="5"/>',
    other: '<path d="M80 18l10 28 30 3-23 20 7 30-24-16-24 16 7-30-23-20 30-3z" fill="#FFE800" stroke="#1C1B3A" stroke-width="5" stroke-linejoin="round"/><circle cx="130" cy="30" r="8" fill="#FF48B0"/><circle cx="30" cy="120" r="10" fill="#0078BF"/>'
  };

  var TYPES = [
    { id: 'tshirt', name: 'T-shirt', art: RC.ART.tshirt, text: 'Name, number or text to print', ph: 'e.g. TEAM RUSIKAA',
      groups: [{ k: 'Colour', v: ['White', 'Black', 'Navy', 'Magenta', 'Sunny Yellow', 'Sky Blue'], sw: true }, { k: 'Size', v: ['S', 'M', 'L', 'XL', 'XXL', 'Kids'] }, { k: 'Print on', v: ['Front', 'Back', 'Front + Back'] }] },
    { id: 'cover', name: 'Phone cover', art: RC.ART.cover, text: 'Phone brand and model, and what to print', ph: 'e.g. iPhone 13 with my photo',
      groups: [{ k: 'Cover type', v: ['Hard', 'Soft / TPU', 'Glossy glass'] }] },
    { id: 'led', name: 'LED photo frame', art: RC.ART.led, text: 'Name or message (optional)', ph: 'e.g. Happy Anniversary',
      groups: [{ k: 'Size', v: ['6 x 8 in', '8 x 10 in', '10 x 12 in'] }, { k: 'Light', v: ['Warm white', 'Cool white', 'Multicolour'] }] },
    { id: 'acrylic', name: 'Acrylic print', art: RC.ART.acrylic, text: 'Caption (optional)', ph: 'e.g. Our first trip',
      groups: [{ k: 'Size', v: ['8 x 12 in', '12 x 18 in', '16 x 24 in'] }, { k: 'Thickness', v: ['3 mm', '5 mm'] }] },
    { id: 'invite', name: 'Wedding card', art: RC.ART.invite, text: 'Names, date and card matter', ph: 'e.g. Rahul & Priya, 12 December',
      groups: [{ k: 'Card style', v: ['Standard', 'Premium', 'Scroll / Box'] }, { k: 'Language', v: ['Hindi', 'English', 'Both'] }] },
    { id: 'frame', name: 'Photo frame', art: RC.ART.frame, text: 'Notes (optional)', ph: 'e.g. also print my photo',
      groups: [{ k: 'Size', v: ['6 x 8 in', '8 x 10 in', '12 x 16 in'] }, { k: 'Finish', v: ['Wooden', 'Black', 'Golden'] }] },
    { id: 'letter', name: 'Stationery', art: RC.ART.letter, text: 'Business name and details', ph: 'e.g. Sharma Traders, Sakchi',
      groups: [{ k: 'Item', v: ['Letterhead', 'Envelope', 'Bill / invoice book', 'Visiting card'] }, { k: 'Paper', v: ['Standard', 'Premium'] }] },
    { id: 'memento', name: 'Memento', art: RC.ART.memento, text: 'Name and message', ph: 'e.g. Best Teacher 2026',
      groups: [{ k: 'Material', v: ['Acrylic', 'Wooden', 'Metal finish'] }, { k: 'Occasion', v: ['Award', 'Farewell', 'Corporate', 'School / College'] }] },
    { id: 'flex', name: 'Flex & banner', art: ICON.flex, text: 'What should it say?', ph: 'e.g. Grand opening, 15 October',
      groups: [{ k: 'Type', v: ['Flex banner', 'Vinyl', 'Backlit', 'Sign board'] }], size: true },
    { id: 'idcard', name: 'ID cards & badges', art: ICON.idcard, text: 'Names, titles and design notes', ph: 'e.g. 120 student ID cards',
      groups: [{ k: 'Item', v: ['ID card', 'Program badge', 'Uniform badge', 'Lamination'] }] },
    { id: 'stamp', name: 'Stamps & stickers', art: ICON.stamp, text: 'Text for the stamp or sticker', ph: 'e.g. company name and address',
      groups: [{ k: 'Item', v: ['Rubber stamp', 'Stickers'] }] },
    { id: 'other', name: 'Something else', art: ICON.other, text: 'Tell us what you need', ph: 'e.g. wall decals for my shop', groups: [] }
  ];

  var state = { type: null, choice: {}, qty: 1, text: '', size: '', date: '', name: '', phone: '' };
  var fed = false;

  function typeOf(id) { for (var i = 0; i < TYPES.length; i++) if (TYPES[i].id === id) return TYPES[i]; return null; }

  // ---------- Step 1: types ----------
  $('types').innerHTML = TYPES.map(function (t) {
    return '<label><input type="radio" name="type" value="' + t.id + '"><svg viewBox="0 0 160 160" aria-hidden="true">' + t.art + '</svg><span>' + esc(t.name) + '</span></label>';
  }).join('');

  // ---------- Step 2: fields for the chosen type ----------
  function renderFields() {
    var t = typeOf(state.type), f = $('fields');
    if (!t) { f.innerHTML = '<p class="note">Pick something in step 1 and the options appear here.</p>'; $('step2').textContent = 'Choose your options'; return; }
    $('step2').textContent = 'Your ' + t.name.toLowerCase() + ' details';
    var html = t.groups.map(function (g) {
      return '<fieldset class="group"><legend>' + esc(g.k) + '</legend><div class="opts">' + g.v.map(function (v) {
        var on = state.choice[g.k] === v;
        return '<label>' + '<input type="radio" name="g-' + esc(g.k) + '" value="' + esc(v) + '" data-g="' + esc(g.k) + '"' + (on ? ' checked' : '') + '>' +
          (g.sw ? '<span class="sw" style="background: ' + COLOURS[v] + '"></span>' : '') + esc(v) + '</label>';
      }).join('') + '</div></fieldset>';
    }).join('');
    if (t.size) html += '<div class="field"><label class="l" for="f-size">Size</label><input id="f-size" type="text" placeholder="e.g. 4 x 6 ft" value="' + esc(state.size) + '"></div>';
    html += '<div class="field"><label class="l" for="f-text">' + esc(t.text) + '</label><textarea id="f-text" placeholder="' + esc(t.ph) + '">' + esc(state.text) + '</textarea></div>';
    html += '<div class="row2"><div><p class="l" style="font-weight:700;font-size:15px;margin-bottom:6px" id="qlab">How many?</p><div class="qty" role="group" aria-labelledby="qlab"><button type="button" id="qd" aria-label="Fewer">−</button><output id="qv" aria-live="polite">' + state.qty + '</output><button type="button" id="qu" aria-label="More">+</button></div></div>' +
      '<div class="field"><label class="l" for="f-date">Needed by</label><input id="f-date" type="date" value="' + esc(state.date) + '"></div></div>';
    f.innerHTML = html;
  }

  // ---------- Ticket + WhatsApp message ----------
  function lines() {
    var t = typeOf(state.type), out = [];
    out.push(['Product', t ? t.name : null]);
    if (t) {
      t.groups.forEach(function (g) { out.push([g.k, state.choice[g.k] || null]); });
      if (t.size) out.push(['Size', state.size.trim() || null]);
      out.push([t.text.replace(/ \(optional\)/, ''), state.text.trim() || null]);
      out.push(['Quantity', String(state.qty)]);
      out.push(['Needed by', state.date ? fmtDate(state.date) : null]);
    }
    out.push(['Name', state.name.trim() || null]);
    out.push(['Mobile', state.phone.trim() || null]);
    return out;
  }
  function fmtDate(iso) { var p = iso.split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso; }

  function render(feed) {
    var ls = lines();
    $('tList').innerHTML = ls.map(function (l) {
      return '<div><dt>' + esc(l[0]) + '</dt><dd' + (l[1] ? '' : ' class="empty"') + '>' + (l[1] ? esc(l[1]) : 'not chosen yet') + '</dd></div>';
    }).join('');
    $('tNo').textContent = state.type ? 'Ready to send' : 'Draft';
    if (feed) { var tk = $('ticket'); tk.classList.remove('feed'); void tk.offsetWidth; tk.classList.add('feed'); }

    var msg = state.type
      ? 'Hi Rusikaa Creative, I would like a quote:\n' + ls.map(function (l) { return l[0] + ': ' + (l[1] || '-'); }).join('\n')
      : 'Hi Rusikaa Creative, I want to place an order.';
    var href = WA + encodeURIComponent(msg);
    $('send').href = href; $('mSend').href = href;
  }

  // ---------- Events ----------
  function choose(id, scroll) {
    if (!typeOf(id)) return;
    state.type = id; state.choice = {}; state.text = ''; state.size = '';
    var r = document.querySelector('#types input[value="' + id + '"]'); if (r) r.checked = true;
    renderFields(); render(true);
    if (scroll) { $('quote').scrollIntoView(); var b = $('builder'); if (b.scrollIntoView) setTimeout(function () { b.scrollIntoView({ block: 'start' }); window.scrollBy(0, -86); }, 30); }
  }

  $('types').addEventListener('change', function (e) { if (e.target.name === 'type') choose(e.target.value, false); });

  $('fields').addEventListener('change', function (e) {
    var g = e.target.getAttribute('data-g');
    if (g) { state.choice[g] = e.target.value; render(true); }
    else if (e.target.id === 'f-date') { state.date = e.target.value; render(false); }
  });
  $('fields').addEventListener('input', function (e) {
    if (e.target.id === 'f-text') state.text = e.target.value;
    else if (e.target.id === 'f-size') state.size = e.target.value;
    else return;
    render(false);
  });
  $('fields').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.id === 'qu') state.qty = Math.min(state.qty + 1, 9999);
    else if (b.id === 'qd') state.qty = Math.max(state.qty - 1, 1);
    else return;
    $('qv').textContent = state.qty; render(false);
  });
  $('f-name').addEventListener('input', function () { state.name = this.value; render(false); });
  $('f-phone').addEventListener('input', function () { state.phone = this.value; render(false); });
  $('builder').addEventListener('submit', function (e) { e.preventDefault(); });

  document.addEventListener('click', function (e) {
    var p = e.target.closest('[data-pick]'); if (p) choose(p.getAttribute('data-pick'), true);
  });

  // ---------- Menu ----------
  var menu = $('menu'), openB = $('menuOpen');
  function setMenu(open) {
    menu.hidden = !open; openB.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('menuClose').focus(); else openB.focus();
  }
  openB.addEventListener('click', function () { setMenu(true); });
  $('menuClose').addEventListener('click', function () { setMenu(false); });
  menu.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) { menu.hidden = true; document.body.style.overflow = ''; openB.setAttribute('aria-expanded', false); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  // ---------- Sticky quote bar on small screens: show it once the builder is out of view ----------
  var mbar = $('mbar');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { mbar.classList.toggle('show', !en[0].isIntersecting); }, { threshold: 0.05 }).observe($('builder'));
  } else { mbar.classList.add('show'); }

  renderFields();
  render(false);
})();
