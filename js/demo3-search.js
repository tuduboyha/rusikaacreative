/* =========================================================
   Rusikaa Creative — demo 3 shared search (used by the home page
   and the category page). Suggestions, then the search page.
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC, C = RC.cards;
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var BLURB = {
    p1: 'Your name, photo, logo or design printed on a comfortable T-shirt, for you, your team, school or event.',
    p2: 'A cover made for your exact phone model, with your photo or design printed on it.',
    p3: 'A glowing backlit photo frame that lights up your favourite memory.',
    p4: 'Sharp, glossy photo prints on clear acrylic, for walls and gifts.',
    p5: 'Wedding and function invitation cards, designed and printed to your taste.',
    p6: 'A classic photo frame for portraits, prints and certificates.',
    p7: 'Letterheads, envelopes, bill books and more with your business details.',
    p8: 'Mementos and trophies for awards, farewells, corporate events and school functions.'
  };

  // ---------- matching (same rules as the search page) ----------
  function words(q) { return q.toLowerCase().split(/[^a-z0-9ऀ-ॿ]+/).filter(Boolean); }
  function has(text, w) {
    var t = text.toLowerCase(), tc = t.replace(/[^a-z0-9ऀ-ॿ]/g, '');
    var forms = [w]; if (w.length > 3 && w.charAt(w.length - 1) === 's') forms.push(w.slice(0, -1));
    return forms.some(function (f) { return t.indexOf(f) >= 0 || tc.indexOf(f) >= 0; });
  }
  function hits(text, ws) { return ws.every(function (w) { return has(text, w); }); }
  function pText(p) { return [p.name, p.short, RC.CATS[p.cat], BLURB[p.id] || ''].join(' '); }

  // ---------- search: suggestions, then the search page ----------
  function suggestions(q) {
    var ws = words(q), out = [];
    if (!ws.length) return out;
    RC.PRODUCTS.forEach(function (p) { if (hits(pText(p), ws)) out.push({ type: 'product', label: p.name, sub: RC.CATS[p.cat], art: RC.ART[p.kind], href: 'product.html?id=' + p.id }); });
    Object.keys(RC.CATS).forEach(function (k) {
      var info = C.INFO[k]; if (hits([RC.CATS[k], info.desc, info.makes.join(' ')].join(' '), ws))
        out.push({ type: 'cat', label: RC.CATS[k], sub: 'Category', icon: C.icon(k, 20), href: 'category.html?cat=' + k });
    });
    RC.SERVICES.forEach(function (s) {
      s.items.forEach(function (it) { if (hits(it, ws)) out.push({ type: 'service', label: it, sub: s.name, href: 'services.html#' + s.id }); });
    });
    return out.slice(0, 8);
  }

  function attach(form, input, box) {
    var items = [], idx = -1;
    function close() { box.hidden = true; input.setAttribute('aria-expanded', 'false'); idx = -1; }
    function show() {
      items = suggestions(input.value);
      if (!input.value.trim()) { close(); return; }
      box.innerHTML = items.length ? items.map(function (s, i) {
        var ico = s.art ? '<svg viewBox="0 0 160 160" aria-hidden="true">' + s.art + '</svg>' : (s.icon || '');
        return '<button type="button" role="option" data-i="' + i + '"><span class="ico">' + ico + '</span><b>' + esc(s.label) + '</b><small>' + esc(s.sub) + '</small></button>';
      }).join('') + '<button type="button" role="option" data-all="1"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg></span><b>See all results for “' + esc(input.value.trim()) + '”</b></button>'
        : '<div class="none">No suggestions. Press Search to look anyway.</div>';
      box.hidden = false; input.setAttribute('aria-expanded', 'true');
    }
    function go(q) { location.href = 'search.html' + (q.trim() ? '?q=' + encodeURIComponent(q.trim()) : ''); }
    input.addEventListener('input', show);
    input.addEventListener('focus', show);
    input.addEventListener('keydown', function (e) {
      var btns = box.querySelectorAll('button');
      if (e.key === 'ArrowDown' && btns.length) { e.preventDefault(); idx = (idx + 1) % btns.length; }
      else if (e.key === 'ArrowUp' && btns.length) { e.preventDefault(); idx = (idx - 1 + btns.length) % btns.length; }
      else if (e.key === 'Enter' && idx >= 0 && btns[idx]) { e.preventDefault(); btns[idx].click(); return; }
      else if (e.key === 'Escape') { close(); return; }
      else return;
      Array.prototype.forEach.call(btns, function (b, i) { b.setAttribute('aria-selected', i === idx); });
    });
    box.addEventListener('mousedown', function (e) { e.preventDefault(); });
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.getAttribute('data-all')) go(input.value); else location.href = items[+b.getAttribute('data-i')].href;
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    document.addEventListener('click', function (e) { if (!form.contains(e.target)) close(); });
  }


  window.D3 = { esc: esc, attach: attach, BLURB: BLURB };
})();
