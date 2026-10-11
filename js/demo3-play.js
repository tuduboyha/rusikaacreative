/* =========================================================
   Rusikaa Creative — demo 3 "Try it live"
   Design a T-shirt, keyring, acrylic photo frame or acrylic wall clock.
   Text, colour, style and size/shape update a live preview, and the same
   choices fill the WhatsApp message.
   ========================================================= */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  if (!$('dzForm')) return;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var DARK = '#1E2A4A', LIGHT = '#FFFFFF';
  var STYLES = [
    { n: 'Bold', apply: function (t, ink) { t.setAttribute('font-family', 'Inter, sans-serif'); t.setAttribute('font-weight', '800'); t.setAttribute('font-style', 'normal'); t.setAttribute('fill', ink); t.setAttribute('stroke', 'none'); t.setAttribute('letter-spacing', '0'); } },
    { n: 'Outline', apply: function (t, ink) { t.setAttribute('font-family', 'Inter, sans-serif'); t.setAttribute('font-weight', '800'); t.setAttribute('font-style', 'normal'); t.setAttribute('fill', 'none'); t.setAttribute('stroke', ink); t.setAttribute('stroke-width', '0.8'); t.setAttribute('letter-spacing', '0.5'); } },
    { n: 'Classic', apply: function (t, ink) { t.setAttribute('font-family', 'Georgia, serif'); t.setAttribute('font-weight', '700'); t.setAttribute('font-style', 'italic'); t.setAttribute('fill', ink); t.setAttribute('stroke', 'none'); t.setAttribute('letter-spacing', '0'); } }
  ];

  var KEY_SHAPES = {
    Round: { d: 'M26 92a54 54 0 1 0 108 0a54 54 0 1 0-108 0Z', hole: 52, ty: 98, w: 70 },
    Heart: { d: 'M80 146C20 104 24 52 56 44C70 40 80 50 80 58C80 50 90 40 104 44C136 52 140 104 80 146Z', hole: 72, ty: 94, w: 56 },
    Rectangle: { d: 'M42 44H118a14 14 0 0 1 14 14V126a14 14 0 0 1-14 14H42a14 14 0 0 1-14-14V58a14 14 0 0 1 14-14Z', hole: 58, ty: 100, w: 84 }
  };
  var FRAME_LAYOUTS = {
    Portrait: { body: [38, 14, 84, 118], photo: [48, 24, 64, 84], ty: 120, stand: 'M62 130L80 150L98 130Z', sun: [64, 46, 6], hill: 'M48 108V88L66 70L82 86L92 78L112 96V108Z', w: 74 },
    Landscape: { body: [18, 34, 124, 92], photo: [28, 44, 104, 56], ty: 113, stand: 'M62 124L80 146L98 124Z', sun: [46, 58, 5], hill: 'M28 100V82L48 62L66 82L80 70L132 86V100Z', w: 114 }
  };
  var CLOCK_SHAPES = {
    Round: 'M16 80a64 64 0 1 0 128 0a64 64 0 1 0-128 0Z',
    Square: 'M32 18H128a14 14 0 0 1 14 14V128a14 14 0 0 1-14 14H32a14 14 0 0 1-14-14V32a14 14 0 0 1 14-14Z'
  };

  var PRODUCTS = [
    { id: 'tshirt', n: 'T-shirt', h2: 'Design your own T-shirt', sub: 'Type a name, pick a colour and a style. We make it after you approve the preview.',
      ph: 'e.g. TEAM RUSIKAA', def: 'YOUR NAME', colourLabel: 'Colour', optLabel: 'Size', opts: ['S', 'M', 'L', 'XL', 'XXL', 'Kids'], optDef: 'M', max: 18, group: 'gShirt', text: 'dzPrint',
      colours: [
        { n: 'White', hex: '#FFFFFF', ink: DARK }, { n: 'Black', hex: '#1B1B1F', ink: LIGHT }, { n: 'Navy', hex: '#06285F', ink: LIGHT },
        { n: 'Magenta', hex: '#E60070', ink: LIGHT }, { n: 'Sunny Yellow', hex: '#FFC93C', ink: DARK }, { n: 'Sky Blue', hex: '#8FC8F5', ink: DARK }] },
    { id: 'keyring', n: 'Keyring', h2: 'Design your own keyring', sub: 'Pick an acrylic colour and a shape, and add a name. Send us your photo on WhatsApp if you want it printed too.',
      ph: 'e.g. RIYA', def: 'YOUR NAME', colourLabel: 'Acrylic colour', optLabel: 'Shape', opts: ['Round', 'Heart', 'Rectangle'], optDef: 'Round', max: 14, group: 'gKey', text: 'kText',
      colours: [
        { n: 'Clear', hex: '#DDEFFB', ink: DARK }, { n: 'Pink', hex: '#FF9CC9', ink: DARK }, { n: 'Blue', hex: '#6FB2F5', ink: DARK },
        { n: 'Yellow', hex: '#FFD54A', ink: DARK }, { n: 'Green', hex: '#63D9A5', ink: DARK }, { n: 'Black', hex: '#1B1B1F', ink: LIGHT }] },
    { id: 'frame', n: 'Acrylic photo frame', h2: 'Design your own acrylic photo frame', sub: 'Pick a frame colour and layout, and add a caption. Send your photo on WhatsApp and we place it in the preview.',
      ph: 'e.g. RIYA & ARJUN', def: 'OUR MEMORIES', colourLabel: 'Frame colour', optLabel: 'Layout', opts: ['Portrait', 'Landscape'], optDef: 'Portrait', max: 22, group: 'gFrame', text: 'fText',
      colours: [
        { n: 'Clear', hex: '#EAF4FB', ink: DARK }, { n: 'Black', hex: '#1B1B1F', ink: LIGHT }, { n: 'Gold', hex: '#E8C468', ink: DARK },
        { n: 'Rose', hex: '#F4A6C0', ink: DARK }, { n: 'Blue', hex: '#7DB6F0', ink: DARK }] },
    { id: 'clock', n: 'Acrylic wall clock', h2: 'Design your own acrylic wall clock', sub: 'Pick a face colour and a shape, and add a name or message. Send your photo on WhatsApp if you want it on the clock.',
      ph: 'e.g. SHARMA FAMILY', def: 'HOME SWEET HOME', colourLabel: 'Face colour', optLabel: 'Shape', opts: ['Round', 'Square'], optDef: 'Round', max: 22, group: 'gClock', text: 'cText',
      colours: [
        { n: 'White', hex: '#FFFFFF', ink: DARK }, { n: 'Black', hex: '#1B1B1F', ink: LIGHT }, { n: 'Navy', hex: '#06285F', ink: LIGHT },
        { n: 'Pink', hex: '#FFC1DC', ink: DARK }, { n: 'Yellow', hex: '#FFE27A', ink: DARK }, { n: 'Mint', hex: '#BDEFD8', ink: DARK }] }
  ];
  var st = { p: 0, colour: 0, style: 0, opt: 'M', photo: '' };

  // clock ticks never change, so draw them once
  (function () {
    var out = '';
    for (var i = 0; i < 12; i++) {
      var a = i * Math.PI / 6, major = i % 3 === 0, r1 = major ? 44 : 49, r2 = 56;
      out += '<line x1="' + (80 + Math.sin(a) * r1).toFixed(1) + '" y1="' + (80 - Math.cos(a) * r1).toFixed(1) + '" x2="' + (80 + Math.sin(a) * r2).toFixed(1) + '" y2="' + (80 - Math.cos(a) * r2).toFixed(1) + '" stroke-width="' + (major ? 3.5 : 2) + '"/>';
    }
    $('cTicks').innerHTML = out;
  })();

  $('dzProducts').innerHTML = PRODUCTS.map(function (p, i) {
    return '<label><input type="radio" name="dzp" value="' + i + '"' + (i === 0 ? ' checked' : '') + '>' + p.n + '</label>';
  }).join('');
  $('dzStyles').innerHTML = STYLES.map(function (s, i) {
    return '<label><input type="radio" name="dzs" value="' + i + '"' + (i === 0 ? ' checked' : '') + '>' + s.n + '</label>';
  }).join('');

  function buildChoices() {
    var p = PRODUCTS[st.p];
    $('dzColours').innerHTML = p.colours.map(function (c, i) {
      return '<label title="' + c.n + '"><input type="radio" name="dzc" value="' + i + '"' + (i === st.colour ? ' checked' : '') + '><span class="dot" style="background: ' + c.hex + '"></span><span class="sr">' + c.n + '</span></label>';
    }).join('');
    $('dzSizes').innerHTML = p.opts.map(function (z) {
      return '<label><input type="radio" name="dzz" value="' + z + '"' + (z === st.opt ? ' checked' : '') + '>' + z + '</label>';
    }).join('');
    $('dzColourLabel').textContent = p.colourLabel;
    $('dzSizeLabel').textContent = p.optLabel;
    $('dzH').textContent = p.h2;
    document.querySelector('.dz-sub').textContent = p.sub;
    $('dzText').placeholder = p.ph;
    $('dzText').maxLength = p.max;
  }

  // long text is split on the space nearest the middle so it stays inside the printable area
  function setText(el, shown, maxW, maxSize, ink) {
    if (!shown) { el.textContent = ''; return; }
    var lines = [shown];
    if (shown.length > 8 && shown.indexOf(' ') > 0) {
      var mid = shown.length / 2, best = -1, i;
      for (i = 0; i < shown.length; i++) if (shown.charAt(i) === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
      lines = [shown.slice(0, best), shown.slice(best + 1)];
    }
    var x = el.getAttribute('x');
    var longest = Math.max.apply(null, lines.map(function (l) { return l.length; }));
    var size = Math.max(4, Math.min(maxSize, maxW / (longest * 0.74 + 0.3)));
    el.innerHTML = lines.map(function (l, n) {
      return '<tspan x="' + x + '" dy="' + (lines.length === 1 ? 0 : (n === 0 ? -0.55 : 1.1)) + 'em">' + esc(l) + '</tspan>';
    }).join('');
    STYLES[st.style].apply(el, ink);
    el.setAttribute('font-size', String(size));
  }

  // photo shown in the preview only; it stays in this browser and is never uploaded
  function showImg(id, on) {
    var im = $(id);
    im.style.display = on && st.photo ? '' : 'none';
    if (on && st.photo) { im.setAttribute('href', st.photo); }
  }
  function pill(rectId, textEl, on) {
    var r = $(rectId);
    r.style.display = on ? '' : 'none';
    if (!on) return;
    var bb = textEl.getBBox();
    r.setAttribute('x', bb.x - 3); r.setAttribute('y', bb.y - 1.5); r.setAttribute('width', bb.width + 6); r.setAttribute('height', bb.height + 3);
  }

  function draw(p, c, shown) {
    var el = $(p.text), ph0 = !!st.photo;
    if (p.id === 'tshirt') {
      $('dzBody').setAttribute('fill', c.hex);
      showImg('sImg', true);
      el.setAttribute('y', ph0 ? 114 : 94);
      setText(el, shown, ph0 ? 50 : 54, ph0 ? 9 : 15, c.ink);
    } else if (p.id === 'keyring') {
      var k = KEY_SHAPES[st.opt];
      $('kBody').setAttribute('d', k.d);
      $('kClipP').setAttribute('d', k.d);
      $('kBody').setAttribute('fill', c.hex);
      showImg('kImg', true);
      $('kHole').setAttribute('cy', k.hole);
      $('kRing').setAttribute('cy', k.hole - 14);
      $('kShine').setAttribute('d', st.opt === 'Heart' ? 'M38 78c0-12 6-22 16-26' : st.opt === 'Rectangle' ? 'M40 70c2-10 8-16 18-18' : 'M42 78c4-16 14-26 30-30');
      el.setAttribute('y', ph0 ? k.ty + (st.opt === 'Heart' ? 12 : 18) : k.ty);
      setText(el, shown, ph0 ? k.w - 14 : k.w, ph0 ? 10 : 15, ph0 ? DARK : c.ink);
      pill('kPill', el, ph0 && !!shown);
    } else if (p.id === 'frame') {
      var f = FRAME_LAYOUTS[st.opt], b = f.body, ph = f.photo;
      $('fBody').setAttribute('x', b[0]); $('fBody').setAttribute('y', b[1]); $('fBody').setAttribute('width', b[2]); $('fBody').setAttribute('height', b[3]);
      $('fBody').setAttribute('fill', c.hex);
      $('fStand').setAttribute('d', f.stand);
      $('fPhoto').setAttribute('x', ph[0]); $('fPhoto').setAttribute('y', ph[1]); $('fPhoto').setAttribute('width', ph[2]); $('fPhoto').setAttribute('height', ph[3]);
      ['x', 'y', 'width', 'height'].forEach(function (a, i) { $('fClipR').setAttribute(a, ph[i]); $('fImg').setAttribute(a, ph[i]); });
      $('fSun').setAttribute('cx', f.sun[0]); $('fSun').setAttribute('cy', f.sun[1]); $('fSun').setAttribute('r', f.sun[2]);
      $('fHill').setAttribute('d', f.hill);
      $('fIcon').style.display = ph0 ? 'none' : '';
      showImg('fImg', true);
      el.setAttribute('y', f.ty);
      setText(el, shown, f.w, 9, c.ink);
    } else {
      $('cBody').setAttribute('d', CLOCK_SHAPES[st.opt]);
      $('cClipP').setAttribute('d', CLOCK_SHAPES[st.opt]);
      $('cBody').setAttribute('fill', c.hex);
      showImg('cImg', true);
      $('cTicks').setAttribute('stroke', c.ink);
      $('gClock').querySelectorAll('path[stroke-linecap]').forEach(function (h) { h.setAttribute('stroke', c.ink); });
      $('cBody').setAttribute('stroke', c.hex === '#FFFFFF' ? DARK : c.ink);
      setText(el, shown, 56, 11, ph0 ? DARK : c.ink);
      pill('cPill', el, ph0 && !!shown);
    }
  }

  function render() {
    var p = PRODUCTS[st.p], c = p.colours[st.colour], raw = $('dzText').value.toUpperCase().slice(0, p.max), shown = raw.trim() ? raw : '';
    PRODUCTS.forEach(function (q) { $(q.group).style.display = q === p ? '' : 'none'; });
    draw(p, c, shown);
    $('dzColourName').textContent = c.n;
    $('dzCap').textContent = c.n + ' ' + p.n.toLowerCase() + ', ' + st.opt.toLowerCase() + (p.id === 'tshirt' ? '' : ' ' + p.optLabel.toLowerCase()) + ', ' + STYLES[st.style].n.toLowerCase() + ' style';
    if (p.id === 'tshirt') $('dzCap').textContent = c.n + ' T-shirt, size ' + st.opt + ', ' + STYLES[st.style].n.toLowerCase() + ' style';
    $('dzShirt').setAttribute('aria-label', 'Preview of a ' + c.n.toLowerCase() + ' ' + p.n.toLowerCase() + (shown ? ' that says ' + shown : ''));
    var msg = 'Hi Rusikaa Creative, I want this ' + p.n.toLowerCase() + ':' + (raw.trim() ? '\nText: ' + raw.trim() : '') + '\n' + p.colourLabel + ': ' + c.n + '\nStyle: ' + STYLES[st.style].n + '\n' + p.optLabel + ': ' + st.opt + (st.photo ? '\nPhoto: I will send it in this chat' : '');
    $('dzWa').href = 'https://wa.me/917033560221?text=' + encodeURIComponent(msg);
  }

  $('dzText').addEventListener('input', render);
  $('dzForm').addEventListener('change', function (e) {
    if (e.target.name === 'dzp') {
      st.p = +e.target.value; st.colour = 0; st.opt = PRODUCTS[st.p].optDef;
      $('dzText').value = '';
      buildChoices();
    } else if (e.target.name === 'dzc') st.colour = +e.target.value;
    else if (e.target.name === 'dzs') st.style = +e.target.value;
    else if (e.target.name === 'dzz') st.opt = e.target.value;
    render();
  });
  $('dzPhoto').addEventListener('change', function () {
    var f = this.files && this.files[0];
    if (st.photo) { URL.revokeObjectURL(st.photo); st.photo = ''; }
    if (f && /^image\//.test(f.type) && f.size <= 15 * 1024 * 1024) st.photo = URL.createObjectURL(f);
    else if (f) { this.value = ''; alert('Please choose an image file smaller than 15 MB.'); }
    $('dzPhotoClear').hidden = !st.photo;
    render();
  });
  $('dzPhotoClear').addEventListener('click', function () {
    if (st.photo) URL.revokeObjectURL(st.photo);
    st.photo = ''; $('dzPhoto').value = ''; this.hidden = true; render();
  });
  $('dzForm').addEventListener('submit', function (e) { e.preventDefault(); });
  buildChoices();
  render();
})();
