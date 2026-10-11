/* =========================================================
   Rusikaa Creative — product page script
   One page for every product: product.html?id=p1 … p8
   Options, live preview, quantity, wishlist, tabs and
   WhatsApp enquiry message.
   ========================================================= */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '917870140750';
  var RC = window.RC;

  // ---------- Per-product details (sample options — edit freely) ----------
  var COLORS = [
    { name: 'White', hex: '#FFFFFF', ink: '#06285F' },
    { name: 'Black', hex: '#1B1B1F', ink: '#FFFFFF' },
    { name: 'Navy', hex: '#06285F', ink: '#FFFFFF' },
    { name: 'Magenta', hex: '#E60070', ink: '#FFFFFF' },
    { name: 'Sunny Yellow', hex: '#FFC93C', ink: '#06285F' },
    { name: 'Sky Blue', hex: '#8FC8F5', ink: '#06285F' }
  ];

  var DETAILS = {
    p1: {
      intro: 'Your name, photo, logo or design printed on a comfortable T-shirt — for yourself, your team, your school or your event.',
      options: [
        { label: 'Colour', kind: 'colors' },
        { label: 'Size', kind: 'sizes', values: ['S', 'M', 'L', 'XL', 'XXL'], note: 'Kids and custom sizes available on request.' },
        { label: 'Print on', kind: 'chips', values: ['Front', 'Back', 'Front + Back'] }
      ],
      textLabel: 'Name or text to print', textPlaceholder: 'e.g. TEAM RUSIKAA', textHint: 'Up to 18 characters — see it on the preview.', textMax: 18,
      desc: 'Print anything you love — a name and number for your sports team, a logo for your shop staff, a photo for a birthday, or matching tees for a family event.',
      specs: [['Fabric', '[e.g. cotton / polyester]'], ['Print method', '[e.g. sublimation / DTF / vinyl]'], ['Sizes', 'S, M, L, XL, XXL (others on request)'], ['Print area', 'Front, back or both'], ['Minimum order', '[e.g. 1 piece]'], ['Wash care', '[Care instructions]']]
    },
    p2: {
      intro: 'Your favourite photo, name or design printed on a phone cover made for your exact phone model.',
      options: [
        { label: 'Cover type', kind: 'chips', values: ['Hard', 'Soft / TPU', 'Glossy glass'] }
      ],
      textLabel: 'Phone brand & model', textPlaceholder: 'e.g. iPhone 13 / Redmi Note 12', textHint: 'We need the exact model to get the fit right.', textMax: 30,
      desc: 'Turn a photo, a quote or a design into a cover you will actually enjoy using. Send us your phone model and picture and we take care of the rest.',
      specs: [['Cover material', '[e.g. hard polycarbonate / TPU]'], ['Print method', '[e.g. sublimation]'], ['Fits', 'Most popular phone models — tell us yours'], ['Minimum order', '[e.g. 1 piece]'], ['Care', '[Care instructions]']]
    },
    p3: {
      intro: 'A glowing backlit frame that lights up your photo — a gift that stands out on any shelf or desk.',
      options: [
        { label: 'Size', kind: 'chips', values: ['6 x 8 in', '8 x 10 in', '10 x 12 in'] },
        { label: 'Light', kind: 'chips', values: ['Warm white', 'Cool white', 'Multicolour'] }
      ],
      textLabel: 'Name or message (optional)', textPlaceholder: 'e.g. Happy Anniversary', textHint: 'Up to 24 characters.', textMax: 24,
      desc: 'Send us a photo and we print it on a backlit panel that glows when switched on. Great for birthdays, anniversaries and home decor.',
      specs: [['Frame material', '[e.g. acrylic / wood]'], ['Light type', '[e.g. LED strip, USB powered]'], ['Sizes', '6 x 8, 8 x 10, 10 x 12 in (others on request)'], ['Minimum order', '[e.g. 1 piece]'], ['Care', '[Care instructions]']]
    },
    p4: {
      intro: 'Sharp, glossy photo prints on clear acrylic — vivid colour and a premium look for walls and gifts.',
      options: [
        { label: 'Size', kind: 'chips', values: ['8 x 12 in', '12 x 18 in', '16 x 24 in'] },
        { label: 'Thickness', kind: 'chips', values: ['3 mm', '5 mm'] }
      ],
      textLabel: 'Caption (optional)', textPlaceholder: 'e.g. Our First Trip', textHint: 'Up to 24 characters.', textMax: 24,
      desc: 'Your photo printed behind clear acrylic for a deep, glossy finish. Send the best quality photo you have for the sharpest result.',
      specs: [['Material', '[e.g. clear acrylic]'], ['Print method', '[e.g. UV / direct print]'], ['Sizes', '8 x 12, 12 x 18, 16 x 24 in (others on request)'], ['Mounting', '[e.g. standoff pins / stand]'], ['Minimum order', '[e.g. 1 piece]']]
    },
    p5: {
      intro: 'Wedding and function invitation cards, designed and printed to your taste.',
      options: [
        { label: 'Card style', kind: 'chips', values: ['Standard', 'Premium', 'Scroll / Box'] },
        { label: 'Language', kind: 'chips', values: ['Hindi', 'English', 'Both'] }
      ],
      textLabel: 'Names & event date', textPlaceholder: 'e.g. Rahul & Priya, 12 Dec', textHint: 'Up to 30 characters — full matter can be sent on WhatsApp.', textMax: 30,
      desc: 'Weddings, naming ceremonies and other functions. Tell us the style and send the matter, and we share a design preview before printing.',
      specs: [['Paper / board', '[e.g. 300 GSM art board]'], ['Printing', '[e.g. offset / digital, foil options]'], ['Card sizes', '[Available sizes]'], ['Minimum order', '[e.g. 100 cards]'], ['Turnaround', '[Delivery time]']]
    },
    p6: {
      intro: 'A classic frame for portraits, prints and certificates, ready to hang or stand.',
      options: [
        { label: 'Size', kind: 'chips', values: ['6 x 8 in', '8 x 10 in', '12 x 16 in'] },
        { label: 'Finish', kind: 'chips', values: ['Wooden', 'Black', 'Golden'] }
      ],
      textLabel: 'Notes (optional)', textPlaceholder: 'e.g. need printing of my photo too', textHint: 'Up to 30 characters.', textMax: 30,
      desc: 'Simple, sturdy photo frames. We can also print and fit your photo or certificate so it arrives ready to display.',
      specs: [['Frame material', '[e.g. wood / MDF]'], ['Glass', '[e.g. clear glass / acrylic]'], ['Sizes', '6 x 8, 8 x 10, 12 x 16 in (others on request)'], ['Minimum order', '[e.g. 1 piece]']]
    },
    p7: {
      intro: 'Letterheads, envelopes, bill books and more — everything a shop, school or office needs to look professional.',
      options: [
        { label: 'Item', kind: 'chips', values: ['Letterhead', 'Envelope', 'Bill / Invoice book', 'Visiting card'] },
        { label: 'Paper', kind: 'chips', values: ['Standard', 'Premium'] }
      ],
      textLabel: 'Business name', textPlaceholder: 'e.g. Sharma Traders', textHint: 'Up to 30 characters — send your logo on WhatsApp.', textMax: 30,
      desc: 'Branded stationery for your business. Send your logo and details; we design the layout, share a preview and print in the quantity you need.',
      specs: [['Items', 'Letterheads, envelopes, bill books, visiting cards'], ['Paper', '[e.g. 100 GSM / 300 GSM]'], ['Printing', '[e.g. single / multi colour]'], ['Minimum order', '[e.g. 100 pieces]'], ['Turnaround', '[Delivery time]']]
    },
    p8: {
      intro: 'Mementos and trophies for awards, farewells, corporate events and school functions.',
      options: [
        { label: 'Material', kind: 'chips', values: ['Acrylic', 'Wooden', 'Metal finish'] },
        { label: 'Occasion', kind: 'chips', values: ['Award', 'Farewell', 'Corporate', 'School / College'] }
      ],
      textLabel: 'Name & message to engrave / print', textPlaceholder: 'e.g. Best Teacher 2026', textHint: 'Up to 30 characters.', textMax: 30,
      desc: 'A memento people keep for years. Tell us the occasion and the text, and we make one or many with matching design.',
      specs: [['Material', '[e.g. acrylic / wood / metal finish]'], ['Printing / engraving', '[e.g. UV print / laser]'], ['Sizes', '[Available sizes]'], ['Minimum order', '[e.g. 1 piece]'], ['Turnaround', '[Delivery time]']]
    }
  };

  var TABS = [
    { key: 'desc', label: 'Description' },
    { key: 'spec', label: 'Specifications' },
    { key: 'how', label: 'How to Order' }
  ];

  // ---------- Pick product from ?id= ----------
  var idParam = (/[?&]id=([^&#]+)/.exec(location.search) || [])[1];
  var P = null;
  RC.PRODUCTS.forEach(function (p) { if (p.id === idParam) P = p; });
  if (!P) {
    if (idParam) { location.replace('404.html?from=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)); return; }  // unknown product id
    P = RC.PRODUCTS[0];
  }
  var D = DETAILS[P.id];
  var idx = RC.PRODUCTS.indexOf(P);
  var T = RC.TINTS[idx % RC.TINTS.length];
  var IS_TSHIRT = P.kind === 'tshirt';

  var VIEWS = IS_TSHIRT
    ? [{ key: 'front', label: 'Front', sub: 'preview' }, { key: 'back', label: 'Back', sub: 'preview' }, { key: 'photo', label: 'Photo', sub: 'real product' }]
    : [{ key: 'front', label: 'Design', sub: 'preview' }, { key: 'photo', label: 'Photo', sub: 'real product' }];

  var state = { choices: {}, view: 'front', text: '', fileName: '', qty: 1, wished: false, tab: 'desc' };
  D.options.forEach(function (o) {
    state.choices[o.label] = o.kind === 'colors' ? COLORS[0].name : o.kind === 'sizes' ? 'M' : o.values[0];
  });

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function colorOf(name) { for (var i = 0; i < COLORS.length; i++) if (COLORS[i].name === name) return COLORS[i]; return COLORS[0]; }

  // ---------- Static page content ----------
  document.title = P.name + ' — Rusikaa Creative';
  $('crumbCat').textContent = RC.CATS[P.cat];
  $('crumbCat').href = 'category.html?cat=' + P.cat;
  $('crumbName').textContent = P.name;
  $('catChip').textContent = RC.CATS[P.cat].toUpperCase();
  $('catChip').style.background = T.tint;
  $('catChip').style.color = T.ink;
  $('pName').textContent = P.name;
  $('photoImg').alt = P.name;
  $('photoImg').addEventListener('load', function () { $('photoNote').hidden = true; });
  $('photoImg').src = P.img;
  $('pIntro').textContent = D.intro;
  $('stage').style.backgroundColor = T.tint;
  $('stage').style.boxShadow = '10px 10px 0 ' + T.shadow;
  $('textLabel').textContent = D.textLabel;
  $('pd-text').placeholder = D.textPlaceholder;
  $('pd-text').maxLength = D.textMax;
  $('textHint').textContent = D.textHint;
  $('tab-desc').innerHTML = '<div style="display: flex; flex-direction: column; gap: 12px"><p style="margin: 0">' + esc(D.desc) + '</p><p style="margin: 0">[Add details about material, print quality and finish here.]</p></div>';
  $('tab-spec').innerHTML = '<dl style="margin: 0; display: grid; grid-template-columns: minmax(140px, max-content) 1fr; gap: 12px 28px">' +
    D.specs.map(function (r) { return '<dt style="font-weight: 800">' + esc(r[0]) + '</dt><dd style="margin: 0">' + esc(r[1]) + '</dd>'; }).join('') + '</dl>';

  // related products (next four, wrapping around)
  var rel = '';
  for (var k = 1; k <= 4; k++) {
    var q = RC.PRODUCTS[(idx + k) % RC.PRODUCTS.length], qi = RC.PRODUCTS.indexOf(q), qt = RC.TINTS[qi % RC.TINTS.length];
    rel += '<a href="product.html?id=' + q.id + '" class="rc-card rc-rel" style="text-decoration: none; color: #06285F; background: #FFFFFF; border: 2px solid #06285F; border-radius: 24px; overflow: hidden; box-shadow: 6px 6px 0 ' + qt.shadow + '; display: flex; flex-direction: column">' +
      '<div style="position: relative; height: 170px; background: ' + qt.tint + '; display: flex; align-items: center; justify-content: center; border-bottom: 2px solid #06285F"><svg viewBox="0 0 160 160" width="52%" aria-hidden="true" style="transform: rotate(' + RC.ROTS[qi % RC.ROTS.length] + ')">' + RC.ART[q.kind] + '</svg>' +
        '<img src="' + q.img + '" alt="" loading="lazy" onerror="this.remove()" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover"></div>' +
      '<div style="padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 4px"><strong style="font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-size: 17px">' + esc(q.name) + '</strong><span style="font-weight: 700">₹ [PRICE]</span></div></a>';
  }
  $('related').innerHTML = rel;

  // ---------- Option buttons ----------
  var BTN = 'min-height: 46px; padding: 0 18px; border-radius: 999px; border: 2px solid #06285F; font: inherit; font-weight: 700; font-size: 14px; cursor: pointer;';

  function renderOptions() {
    $('views').innerHTML = VIEWS.map(function (v) {
      var on = v.key === state.view;
      return '<button type="button" data-view="' + v.key + '" aria-pressed="' + on + '" style="height: 96px; border-radius: 20px; border: 2px solid ' + (on ? '#E60070' : '#E2D8C6') + '; background: ' + (on ? '#FFFFFF' : '#F6F1E8') + '; color: #06285F; font: inherit; font-weight: 700; font-size: 14px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px">' +
        '<span style="font-family: \'Caveat\', cursive; font-size: 24px">' + v.label + '</span>' +
        '<span style="font-size: 12px; color: #4A5875">' + v.sub + '</span></button>';
    }).join('');

    $('options').innerHTML = D.options.map(function (o) {
      var cur = state.choices[o.label], inner;
      if (o.kind === 'colors') {
        inner = '<div style="display: flex; flex-wrap: wrap; gap: 10px">' + COLORS.map(function (c) {
          var on = c.name === cur;
          return '<button type="button" data-opt="' + esc(o.label) + '" data-val="' + esc(c.name) + '" aria-pressed="' + on + '" aria-label="' + esc(c.name) + '" style="width: 48px; height: 48px; border-radius: 999px; background: ' + c.hex + '; border: 2px solid #06285F; box-shadow: ' + (on ? '0 0 0 4px #FFFDF8, 0 0 0 7px #E60070' : 'none') + '; cursor: pointer"></button>';
        }).join('') + '</div>';
      } else if (o.kind === 'sizes') {
        inner = '<div style="display: flex; flex-wrap: wrap; gap: 8px">' + o.values.map(function (z) {
          var on = z === cur;
          return '<button type="button" data-opt="' + esc(o.label) + '" data-val="' + esc(z) + '" aria-pressed="' + on + '" style="min-width: 56px; height: 48px; padding: 0 14px; border-radius: 14px; border: 2px solid #06285F; background: ' + (on ? '#06285F' : '#FFFFFF') + '; color: ' + (on ? '#FFFFFF' : '#06285F') + '; font: inherit; font-weight: 800; font-size: 15px; cursor: pointer">' + esc(z) + '</button>';
        }).join('') + '</div>';
      } else {
        inner = '<div style="display: flex; flex-wrap: wrap; gap: 8px">' + o.values.map(function (z) {
          var on = z === cur;
          return '<button type="button" data-opt="' + esc(o.label) + '" data-val="' + esc(z) + '" aria-pressed="' + on + '" style="' + BTN + ' background: ' + (on ? '#E60070' : '#FFFFFF') + '; color: ' + (on ? '#FFFFFF' : '#06285F') + '">' + esc(z) + '</button>';
        }).join('') + '</div>';
      }
      return '<fieldset style="margin: 0; padding: 0; border: 0"><legend style="padding: 0; margin-bottom: 10px; font-weight: 800; font-size: 15px">' + esc(o.label) + ': <span style="font-weight: 500">' + esc(cur) + '</span></legend>' + inner +
        (o.note ? '<p style="margin: 10px 0 0; font-size: 13px; color: #4A5875">' + esc(o.note) + '</p>' : '') + '</fieldset>';
    }).join('');

    $('tabs').innerHTML = TABS.map(function (t) {
      var on = t.key === state.tab;
      return '<button type="button" role="tab" data-tab="' + t.key + '" aria-selected="' + on + '" aria-controls="tabPanel" style="flex-shrink: 0; height: 52px; padding: 0 22px; border: 2px solid ' + (on ? '#06285F' : '#E2D8C6') + '; border-bottom: 0; border-radius: 18px 18px 0 0; background: ' + (on ? '#06285F' : '#FFFFFF') + '; color: ' + (on ? '#FFFFFF' : '#06285F') + '; font: inherit; font-weight: 800; font-size: 15px; cursor: pointer; margin-bottom: -2px">' + t.label + '</button>';
    }).join('');
  }

  // ---------- Preview ----------
  function previewMarkup() {
    var text = state.text ? state.text.toUpperCase() : '';
    if (IS_TSHIRT) {
      var c = colorOf(state.choices.Colour), shown = text || 'YOUR NAME';
      if (state.view === 'back') {
        return '<svg viewBox="0 0 160 160" width="100%" role="img" aria-label="Back preview of the T-shirt in ' + esc(c.name) + '">' +
          '<path d="M52 22 L28 34 L16 62 L36 70 L40 60 L40 140 L120 140 L120 60 L124 70 L144 62 L132 34 L108 22 C100 28 92 30 80 30 C68 30 60 28 52 22 Z" fill="' + c.hex + '" stroke="#06285F" stroke-width="2.5" stroke-linejoin="round"/>' +
          '<text x="80" y="80" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="16" fill="' + c.ink + '">' + esc(shown) + '</text>' +
          '<text x="80" y="104" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="26" fill="#E60070">07</text></svg>';
      }
      return '<svg viewBox="0 0 160 160" width="100%" role="img" aria-label="Front preview of the T-shirt in ' + esc(c.name) + '">' +
        '<path d="M52 22 L28 34 L16 62 L36 70 L40 60 L40 140 L120 140 L120 60 L124 70 L144 62 L132 34 L108 22 C102 34 92 40 80 40 C68 40 58 34 52 22 Z" fill="' + c.hex + '" stroke="#06285F" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<path d="M60 78 C70 64 92 64 102 78" stroke="#E60070" stroke-width="9" stroke-linecap="round" fill="none"/>' +
        '<path d="M58 96 C76 86 90 90 104 96" stroke="#FF8A00" stroke-width="7" stroke-linecap="round" fill="none"/>' +
        '<circle cx="98" cy="62" r="5" fill="#7137C8"/>' +
        '<text x="80" y="118" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="11" fill="' + c.ink + '">' + esc(shown) + '</text></svg>';
    }
    return '<div style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%">' +
      '<svg viewBox="0 0 160 160" width="100%" role="img" aria-label="Illustration of ' + esc(P.name) + '" style="transform: rotate(' + RC.ROTS[idx % RC.ROTS.length] + ')">' + RC.ART[P.kind] + '</svg>' +
      (text ? '<span style="font-family: \'Caveat\', cursive; font-size: 30px; font-weight: 700; color: ' + T.ink + '; text-align: center; overflow-wrap: anywhere">' + esc(state.text) + '</span>' : '') + '</div>';
  }

  function render() {
    renderOptions();

    $('viewMain').innerHTML = previewMarkup();
    $('viewMain').hidden = state.view === 'photo';
    $('viewMain').style.display = state.view === 'photo' ? 'none' : 'flex';
    $('viewPhoto').hidden = state.view !== 'photo';
    $('stageBadge').textContent = state.view === 'photo' ? 'REAL PHOTO' : 'LIVE PREVIEW';

    $('qty').textContent = state.qty;
    $('wishBtn').setAttribute('aria-pressed', state.wished);
    $('wishBtn').setAttribute('aria-label', state.wished ? 'Remove from wishlist' : 'Add to wishlist');
    $('wishHeart').setAttribute('fill', state.wished ? '#E60070' : 'none');
    $('fileNote').textContent = state.fileName
      ? 'Selected: ' + state.fileName + ' — send it on WhatsApp after ordering.'
      : 'JPG or PNG — you can also send it on WhatsApp.';

    ['desc', 'spec', 'how'].forEach(function (key) { $('tab-' + key).hidden = state.tab !== key; });

    var lines = D.options.map(function (o) { return o.label + ': ' + state.choices[o.label]; });
    var msg = 'Hi Rusikaa Creative, I want to enquire about:\n' + P.name + '\n' + lines.join('\n') +
      '\n' + D.textLabel + ': ' + (state.text || '-') + '\nQuantity: ' + state.qty +
      (state.fileName ? '\nI will send my photo/logo here.' : '');
    $('waLink').href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  // ---------- Events ----------
  document.addEventListener('click', function (e) {
    var el, attr, val, opt;
    if ((el = e.target.closest('[data-opt]'))) { opt = el.getAttribute('data-opt'); state.choices[opt] = el.getAttribute('data-val'); attr = 'data-val'; }
    else if ((el = e.target.closest('[data-view]'))) { state.view = el.getAttribute('data-view'); attr = 'data-view'; }
    else if ((el = e.target.closest('[data-tab]'))) { state.tab = el.getAttribute('data-tab'); attr = 'data-tab'; }
    else return;
    val = el.getAttribute(attr);
    // "Print on: Back" shows the back of the shirt; the others show the front
    if (IS_TSHIRT && opt === 'Print on') state.view = val === 'Back' ? 'back' : 'front';
    render();
    var all = document.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < all.length; i++) {
      if (all[i].getAttribute(attr) === val && (!opt || all[i].getAttribute('data-opt') === opt)) { all[i].focus(); break; }
    }
  });

  $('pd-text').addEventListener('input', function () { state.text = this.value.slice(0, D.textMax); render(); });
  $('pd-file').addEventListener('change', function () { var f = this.files && this.files[0]; state.fileName = f ? f.name : ''; render(); });
  $('qtyInc').addEventListener('click', function () { state.qty = Math.min(state.qty + 1, 999); render(); });
  $('qtyDec').addEventListener('click', function () { state.qty = Math.max(state.qty - 1, 1); render(); });
  $('wishBtn').addEventListener('click', function () { state.wished = !state.wished; render(); });

  render();
})();
