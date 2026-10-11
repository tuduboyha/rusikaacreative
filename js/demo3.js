/* =========================================================
   Rusikaa Creative — home page demo 3 script (directory style)
   Search with suggestions (opens the search page), category grid,
   popular products, services, Call / WhatsApp.
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC, C = RC.cards, D3 = window.D3;
  var WA = 'https://wa.me/917033560221?text=';
  var PHONE = '70335 60221';
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // ---------- category grid ----------
  $('cats').innerHTML = Object.keys(RC.CATS).map(function (k) {
    var info = C.INFO[k], n = C.productsIn(k).length;
    return '<a class="cat" href="category.html?cat=' + k + '"><span class="ic">' + RC.illus(k, 60) + '</span>' +
      '<span class="nm">' + esc(RC.CATS[k]) + '</span><small>' + (n ? n + (n === 1 ? ' product' : ' products') : 'Made to order') + '</small></a>';
  }).join('');

  var CALL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></svg>';
  var WAI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 19z"></path><path d="M9 9.5c.3 2 2.2 4.2 4.5 4.8l1.2-1.2 1.8.8"></path></svg>';

  // ---------- services ----------
  var SV_ICON = {
    printing: '<rect x="3" y="9" width="18" height="8" rx="1.5"/><path d="M6 9V3h12v6M7 14h10v7H7z"/>',
    apparel: '<path d="M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3c-1 2-2 3-4 3S9 5 8 3z"/>',
    branding: '<rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M8 7V4h8v3M3 12h18"/>',
    frames: '<rect x="3" y="3" width="18" height="18" rx="1"/><rect x="7" y="7" width="10" height="10"/><path d="M7 15l3-3 2 2 2-2 3 3"/>',
    signage: '<rect x="2" y="5" width="20" height="10" rx="1.5"/><path d="M8 15v5M16 15v5M6 10h12"/>',
    institutional: '<path d="M5 3h11l3 3v15H5z"/><path d="M5 7h2M5 11h2M5 15h2M10 9h6M10 13h6"/>'
  };
  $('svc').innerHTML = RC.SERVICES.map(function (s) {
    return '<article class="sv" style="--c: ' + s.bg + '; --ci: ' + s.ink + '; --t: ' + s.tint + '">' +
      '<div class="sv-top"><span class="sv-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (SV_ICON[s.id] || '') + '</svg></span><span class="sv-n" aria-hidden="true">' + s.n + '</span></div>' +
      '<div class="sv-body"><h3>' + esc(s.name) + '</h3><p>' + esc(s.desc) + '</p>' +
      '<ul>' + s.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
      '<div class="sv-act"><a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, please share a quote for: ' + s.name) + '" target="_blank" rel="noopener">' + WAI + 'Get a quote</a>' +
      '<a class="sv-more" href="services.html#' + s.id + '">Details</a></div></div></article>';
  }).join('');

  // ---------- popular products ----------
  function card(p) {
    var i = RC.PRODUCTS.indexOf(p), t = RC.TINTS[i % RC.TINTS.length];
    var tags = '<span class="tag b">' + esc(RC.CATS[p.cat]) + '</span>' + (p.custom ? '<span class="tag o">Can be customised</span>' : '') + '<span class="tag g">Made to order</span>';
    return '<article class="card"><a class="ph" href="product.html?id=' + p.id + '" style="--tint: ' + t.tint + '" aria-label="' + esc(p.name) + '">' +
        '<svg viewBox="0 0 160 160" aria-hidden="true">' + RC.ART[p.kind] + '</svg>' +
        '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()">' + (p.popRank <= 3 ? '<span class="badge">Popular</span>' : '') + '</a>' +
      '<div class="body"><h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
        '<div class="tags">' + tags + '</div>' +
        '<p class="price"><span>Ask for price</span> on call or WhatsApp</p>' +
        '<div class="cta">' +
          '<a class="btn btn-call" href="tel:+917033560221" aria-label="Call ' + esc(PHONE) + '">' + CALL + 'Call</a>' +
          '<a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + p.name) + '" target="_blank" rel="noopener">' + WAI + 'WhatsApp</a>' +
        '</div></div></article>';
  }
  $('list').innerHTML = RC.PRODUCTS.slice().sort(function (a, b) { return a.popRank - b.popRank; }).map(card).join('');

  // ---------- search: suggestions, then the search page ----------
  D3.attach($('hSearch'), $('hq'), $('hSug'));
  D3.attach($('bSearch'), $('bq'), $('bSug'));

  // ---------- enquiry form on the page ----------
  function eLink() {
    var t = 'Hi Rusikaa Creative, I have an enquiry.\nName: ' + ($('e-name').value || '-') + '\nMobile: ' + ($('e-phone').value || '-') + '\nMessage: ' + ($('e-msg').value || '-');
    $('eSend').href = WA + encodeURIComponent(t);
  }
  ['e-name', 'e-phone', 'e-msg'].forEach(function (id) { $(id).addEventListener('input', eLink); });
  $('eForm').addEventListener('submit', function (e) { e.preventDefault(); });
  eLink();
})();
