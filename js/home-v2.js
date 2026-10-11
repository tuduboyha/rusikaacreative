/* =========================================================
   Rusikaa Creative — home page v2 (demo) script
   Renders the product rail and service rows from RC (js/data.js),
   runs the product arrows, ribbon loop and mobile menu.
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC;
  var WA = 'https://wa.me/917870140750?text=';
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // ---------- Products ----------
  $('rail').innerHTML = RC.PRODUCTS.map(function (p, i) {
    var t = RC.TINTS[i % RC.TINTS.length];
    return '<article class="item">' +
      '<a class="item-img" href="product.html?id=' + p.id + '" aria-label="' + esc(p.name) + '" style="--tint: ' + t.tint + '">' +
        '<svg viewBox="0 0 160 160" aria-hidden="true">' + RC.ART[p.kind] + '</svg>' +
        '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()">' +
      '</a>' +
      '<h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
      '<p class="cat">' + esc(RC.CATS[p.cat]) + '</p>' +
      '<a class="ask" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + p.name) + '" target="_blank" rel="noopener">Ask for a price on WhatsApp</a>' +
    '</article>';
  }).join('');

  var rail = $('rail'), prev = $('railPrev'), next = $('railNext');
  function railState() {
    var max = rail.scrollWidth - rail.clientWidth;
    prev.disabled = rail.scrollLeft < 4;
    next.disabled = rail.scrollLeft > max - 4;
  }
  prev.addEventListener('click', function () { rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: 'smooth' }); });
  next.addEventListener('click', function () { rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: 'smooth' }); });
  rail.addEventListener('scroll', railState, { passive: true });
  window.addEventListener('resize', railState);
  railState();

  // ---------- Services ----------
  $('rows').innerHTML = RC.SERVICES.map(function (s) {
    return '<article class="row">' +
      '<div><h3>' + esc(s.name) + '</h3><p class="desc">' + esc(s.desc) + '</p></div>' +
      '<p class="what">' + s.items.map(esc).join(', ') + '.</p>' +
      '<a class="go" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, please share a quote for: ' + s.name) + '" target="_blank" rel="noopener">Get a quote</a>' +
    '</article>';
  }).join('');

  // ---------- Ribbon: repeat the words once so the loop is seamless ----------
  var rb = $('ribbon');
  rb.innerHTML += rb.innerHTML;

  // ---------- Mobile menu ----------
  var burger = $('burger'), drawer = $('drawer');
  function setMenu(open) {
    drawer.hidden = !open;
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(drawer.hidden); });
  drawer.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) { setMenu(false); burger.focus(); } });
})();
