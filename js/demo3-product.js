/* =========================================================
   Rusikaa Creative — demo 3 product page
   product.html?id=p1 … p8
   Photos, options, quantity, and Call / WhatsApp buttons.
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC, C = RC.cards, D3 = window.D3, esc = D3.esc;
  var WA = 'https://wa.me/917033560221?text=';
  var $ = function (id) { return document.getElementById(id); };

  var CALL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></svg>';
  var WAI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 19z"></path><path d="M9 9.5c.3 2 2.2 4.2 4.5 4.8l1.2-1.2 1.8.8"></path></svg>';

  // ---------- pick the product from ?id= ----------
  var idParam = (/[?&]id=([^&#]+)/.exec(location.search) || [])[1];
  var P = null;
  RC.PRODUCTS.forEach(function (p) { if (p.id === idParam) P = p; });
  if (!P) {
    if (idParam) { location.replace('404.html?from=' + encodeURIComponent('product.html' + location.search)); return; }
    P = RC.PRODUCTS[0];
  }
  var D = RC.DETAILS[P.id], info = C.INFO[P.cat], catName = RC.CATS[P.cat];
  var idx = RC.PRODUCTS.indexOf(P), tint = RC.TINTS[idx % RC.TINTS.length];

  D3.attach($('hSearch'), $('hq'), $('hSug'));

  document.title = P.name + ' in Jamshedpur — Rusikaa Creative';
  $('crumbCat').textContent = catName; $('crumbCat').href = 'category.html?cat=' + P.cat;
  $('crumbName').textContent = P.name;
  $('pdCatLink').textContent = catName; $('pdCatLink').href = 'category.html?cat=' + P.cat;
  $('pdName').textContent = P.name;
  $('pdIntro').textContent = D.intro;
  $('pdDesc').textContent = D.desc;
  $('pdTags').innerHTML = (P.custom ? '<span class="tag o">Can be customised</span>' : '') + '<span class="tag g">Made to order</span><span class="tag">Design preview first</span>';

  // details: values still waiting for real shop information read "Ask us on WhatsApp"
  $('pdSpecs').innerHTML = D.specs.map(function (r) {
    var v = /^\[/.test(r[1]) ? 'Ask us on WhatsApp' : r[1];
    return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(v) + '</dd></div>';
  }).join('');

  // ---------- gallery ----------
  var pics = [
    { k: 'photo', label: 'Photo', html: '<img src="' + P.img + '" alt="' + esc(P.name) + '" onerror="this.parentNode.classList.add(\'nophoto\'); this.remove()">' },
    { k: 'art', label: 'Illustration', html: '<svg viewBox="0 0 160 160" role="img" aria-label="Illustration of ' + esc(P.name) + '">' + RC.ART[P.kind] + '</svg>' }
  ];
  var cur = 0;
  function showPic(i) {
    cur = i;
    $('pdMain').style.setProperty('--tint', tint.tint);
    $('pdMain').className = 'pd-main' + (pics[i].k === 'art' ? ' art' : '');
    $('pdMain').innerHTML = pics[i].html + '<svg class="fallback" viewBox="0 0 160 160" aria-hidden="true">' + RC.ART[P.kind] + '</svg>';
    Array.prototype.forEach.call($('pdThumbs').children, function (b, n) { b.setAttribute('aria-pressed', n === i); });
  }
  $('pdThumbs').innerHTML = pics.map(function (p, i) {
    return '<button type="button" data-i="' + i + '" aria-label="' + p.label + '" aria-pressed="false" style="--tint: ' + tint.tint + '">' +
      (p.k === 'photo' ? '<img src="' + P.img + '" alt="" onerror="this.remove()">' : '<svg viewBox="0 0 160 160" aria-hidden="true">' + RC.ART[P.kind] + '</svg>') + '</button>';
  }).join('');
  $('pdThumbs').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) showPic(+b.getAttribute('data-i')); });
  showPic(0);

  // ---------- options -> WhatsApp message ----------
  var state = { choice: {}, text: '', qty: 1 };
  D.options.forEach(function (o) {
    state.choice[o.label] = o.kind === 'colors' ? RC.COLORS[0].name : o.kind === 'sizes' ? 'M' : o.values[0];
  });
  function hexOf(name) { var h = '#FFF'; RC.COLORS.forEach(function (c) { if (c.name === name) h = c.hex; }); return h; }

  function renderOpts() {
    $('pdOpts').innerHTML = D.options.map(function (o) {
      var vals = o.kind === 'colors' ? RC.COLORS.map(function (c) { return c.name; }) : o.values;
      return '<fieldset class="pd-group"><legend>' + esc(o.label) + ': <b>' + esc(state.choice[o.label]) + '</b></legend><div class="pd-chips">' +
        vals.map(function (v) {
          return '<label><input type="radio" name="o-' + esc(o.label) + '" value="' + esc(v) + '" data-o="' + esc(o.label) + '"' + (state.choice[o.label] === v ? ' checked' : '') + '>' +
            (o.kind === 'colors' ? '<span class="sw" style="background: ' + hexOf(v) + '"></span>' : '') + esc(v) + '</label>';
        }).join('') + '</div>' + (o.note ? '<p class="note">' + esc(o.note) + '</p>' : '') + '</fieldset>';
    }).join('');
  }
  $('pdTextL').textContent = D.textLabel;
  $('pdText').placeholder = D.textPlaceholder; $('pdText').maxLength = D.textMax;
  $('pdHint').textContent = D.textHint;

  function link() {
    var lines = D.options.map(function (o) { return o.label + ': ' + state.choice[o.label]; });
    var t = 'Hi Rusikaa Creative, I want to enquire about:\n' + P.name + '\n' + lines.join('\n') + '\n' + D.textLabel + ': ' + (state.text.trim() || '-') + '\nQuantity: ' + state.qty;
    $('pdWa').href = WA + encodeURIComponent(t);
  }

  $('pdOpts').addEventListener('change', function (e) {
    var o = e.target.getAttribute('data-o');
    if (!o) return;
    state.choice[o] = e.target.value;
    var lg = e.target.closest('fieldset').querySelector('legend b'); if (lg) lg.textContent = e.target.value;
    link();
  });
  $('pdText').addEventListener('input', function () { state.text = this.value; link(); });
  $('qu').addEventListener('click', function () { state.qty = Math.min(state.qty + 1, 9999); $('qv').textContent = state.qty; link(); });
  $('qd').addEventListener('click', function () { state.qty = Math.max(state.qty - 1, 1); $('qv').textContent = state.qty; link(); });
  $('pdForm').addEventListener('submit', function (e) { e.preventDefault(); });
  renderOpts(); link();

  // ---------- share ----------
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(function () { t.hidden = true; }, 2400);
  }
  $('pdShare').addEventListener('click', function () {
    var url = location.href.split('#')[0];
    if (navigator.share) { navigator.share({ title: P.name + ' - Rusikaa Creative', url: url }).catch(function () { /* cancelled */ }); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(function () { toast('Link copied'); }, function () { toast('Copy this page address from the address bar'); }); }
    else toast('Copy this page address from the address bar');
  });

  // ---------- zoom the photo ----------
  var zoomBack = null;
  function closeZoom() { $('zoom').hidden = true; document.body.style.overflow = ''; if (zoomBack) zoomBack.focus(); }
  $('pdMain').addEventListener('click', function () {
    if (pics[cur].k !== 'photo' || $('pdMain').classList.contains('nophoto')) return;
    zoomBack = document.activeElement; $('zoomImg').src = P.img; $('zoomImg').alt = P.name;
    $('zoom').hidden = false; document.body.style.overflow = 'hidden'; $('zoomX').focus();
  });
  $('zoomX').addEventListener('click', closeZoom);
  $('zoom').addEventListener('click', function (e) { if (e.target === this) closeZoom(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('zoom').hidden) closeZoom(); });

  // ---------- more products ----------
  var others = RC.PRODUCTS.filter(function (p) { return p.id !== P.id; });
  others.sort(function (a, b) { return (b.cat === P.cat) - (a.cat === P.cat) || a.popRank - b.popRank; });
  $('more').innerHTML = others.slice(0, 4).map(function (p) {
    var i = RC.PRODUCTS.indexOf(p), t = RC.TINTS[i % RC.TINTS.length];
    return '<article class="card"><a class="ph" href="product.html?id=' + p.id + '" style="--tint: ' + t.tint + '" aria-label="' + esc(p.name) + '">' +
        '<svg viewBox="0 0 160 160" aria-hidden="true">' + RC.ART[p.kind] + '</svg><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()"></a>' +
      '<div class="body"><h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
        '<div class="tags"><span class="tag b">' + esc(RC.CATS[p.cat]) + '</span></div>' +
        '<p class="price"><span>Ask for price</span> on call or WhatsApp</p>' +
        '<div class="cta"><a class="btn btn-call" href="tel:+917033560221">' + CALL + 'Call</a>' +
        '<a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + p.name) + '" target="_blank" rel="noopener">' + WAI + 'WhatsApp</a></div></div></article>';
  }).join('');
})();
