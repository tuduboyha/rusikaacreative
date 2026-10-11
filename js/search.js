/* =========================================================
   Rusikaa Creative — search page script
   search.html?q=tshirt  → products, categories and services
   that match every word typed.
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC, C = RC.cards;
  var WA = 'https://wa.me/917870140750?text=';
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // ---------- Match ----------
  function words(q) { return q.toLowerCase().split(/[^a-z0-9ऀ-ॿ]+/).filter(Boolean); }
  // A word matches if it appears in the text, ignoring hyphens/spaces ("tshirt" = "T-Shirt") and a trailing "s" ("covers" = "cover")
  function has(text, w) {
    var t = text.toLowerCase(), tc = t.replace(/[^a-z0-9ऀ-ॿ]/g, '');
    var forms = [w]; if (w.length > 3 && w.charAt(w.length - 1) === 's') forms.push(w.slice(0, -1));
    return forms.some(function (f) { return t.indexOf(f) >= 0 || tc.indexOf(f) >= 0; });
  }
  function hits(text, ws) { return ws.every(function (w) { return has(text, w); }); }   // every word must match
  function score(title, text, ws) {  // title matches rank above description matches
    var n = 0;
    ws.forEach(function (w) { if (has(title, w)) n += 2; });
    return n + (hits(text, ws) ? 1 : 0);
  }

  function search(q) {
    var ws = words(q);
    var res = { products: [], cats: [], services: [] };
    if (!ws.length) return res;

    RC.PRODUCTS.forEach(function (p) {
      var text = [p.name, p.short, RC.CATS[p.cat]].join(' ');
      if (hits(text, ws)) res.products.push({ p: p, s: score(p.name, text, ws) });
    });
    Object.keys(RC.CATS).forEach(function (k) {
      var info = C.INFO[k], text = [RC.CATS[k], info.desc, info.makes.join(' ')].join(' ');
      if (hits(text, ws)) res.cats.push({ k: k, s: score(RC.CATS[k], text, ws) });
    });
    RC.SERVICES.forEach(function (sv) {
      var text = [sv.name, sv.desc, sv.items.join(' ')].join(' ');
      if (hits(text, ws)) {
        var matched = sv.items.filter(function (it) { return hits(it, ws); });
        res.services.push({ sv: sv, matched: matched, s: score(sv.name + ' ' + matched.join(' '), text, ws) });
      }
    });
    ['products', 'cats', 'services'].forEach(function (key) { res[key].sort(function (a, b) { return b.s - a.s; }); });
    return res;
  }

  // ---------- Render ----------
  function heading(tag, title, count) {
    return '<div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 24px"><span style="padding: 5px 12px; border-radius: 10px; background: #FFE1EE; color: #B0005A; font-size: 12px; font-weight: 800; letter-spacing: 0.1em">' + tag + '</span>' +
      '<h2 style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: clamp(1.6rem, 3vw, 2.2rem); letter-spacing: -0.02em">' + title + ' <span style="font-weight: 500; color: #4A5875; font-size: .7em">(' + count + ')</span></h2></div>';
  }
  function serviceCard(r) {
    var sv = r.sv;
    var chips = r.matched.map(function (it) {
      return '<a href="' + WA + encodeURIComponent('Hi Rusikaa Creative, please share a quote for: ' + it) + '" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px; border-radius: 999px; background: #FFFFFF; color: #06285F; font-size: 14px; font-weight: 700; text-decoration: none; border: 1px solid rgba(6,40,95,.15)">' + esc(it) + ' · Quote →</a>';
    }).join('');
    return '<article class="rc-card" style="background: ' + sv.tint + '; border-radius: 26px; padding: 24px; display: flex; flex-direction: column; gap: 10px">' +
      '<span style="align-self: flex-start; padding: 4px 10px; border-radius: 999px; background: ' + sv.bg + '; color: ' + sv.ink + '; font-size: 12px; font-weight: 800">SERVICE ' + sv.n + '</span>' +
      '<h3 style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: 21px; line-height: 1.15"><a href="services.html#' + sv.id + '" style="color: #06285F; text-decoration: none">' + esc(sv.name) + '</a></h3>' +
      '<p style="margin: 0; font-size: 14px; line-height: 1.5; color: #3B4A68">' + esc(sv.desc) + '</p>' +
      (chips ? '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px">' + chips + '</div>' : '') +
      '<a href="services.html#' + sv.id + '" style="margin-top: auto; display: inline-flex; align-items: center; min-height: 44px; font-weight: 800; font-size: 14px; color: #06285F">View service →</a></article>';
  }

  function render(q) {
    var ws = words(q), out = $('sResults');
    document.title = (q ? 'Search: ' + q + ' — ' : 'Search — ') + 'Rusikaa Creative';

    if (!ws.length) {
      $('sSummary').textContent = 'Type a product, category or service to get started.';
      out.innerHTML = '<div>' + heading('BROWSE', 'Popular categories', 12) +
        '<div class="rc-grid-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr)); gap: 16px">' +
        Object.keys(RC.CATS).map(C.catCard).join('') + '</div></div>';
      return;
    }

    var r = search(q), total = r.products.length + r.cats.length + r.services.length;
    $('sSummary').innerHTML = total
      ? total + (total === 1 ? ' result' : ' results') + ' for <strong>“' + esc(q.trim()) + '”</strong>'
      : 'No results for <strong>“' + esc(q.trim()) + '”</strong>';

    if (!total) {
      out.innerHTML = '<div style="padding: 48px 24px; border: 2px dashed #C9BFAE; border-radius: 26px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; background: #FFFFFF">' +
        '<p style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-size: 26px; font-weight: 800">We could not find that — yet!</p>' +
        '<p style="margin: 0; color: #4A5875; max-width: 480px; line-height: 1.55">We make most items to order, so it may still be possible. Tell us what you need and we will let you know.</p>' +
        '<a href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I am looking for: ' + q.trim()) + '" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 26px; border-radius: 999px; background: #0E7A3A; color: #FFFFFF; font-weight: 800; text-decoration: none; box-shadow: 0 5px 0 #0A5A2A">Ask on WhatsApp</a></div>' +
        '<div>' + heading('BROWSE', 'Try a category', 12) +
        '<div class="rc-grid-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr)); gap: 16px">' + Object.keys(RC.CATS).map(C.catCard).join('') + '</div></div>';
      return;
    }

    var html = '';
    if (r.products.length) {
      html += '<div>' + heading('PRODUCTS', 'Products', r.products.length) +
        '<div class="rc-grid-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(270px, 100%), 1fr)); gap: 24px">' + r.products.map(function (x) { return C.productCard(x.p); }).join('') + '</div></div>';
    }
    if (r.cats.length) {
      html += '<div>' + heading('CATEGORIES', 'Categories', r.cats.length) +
        '<div class="rc-grid-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr)); gap: 16px">' + r.cats.map(function (x) { return C.catCard(x.k); }).join('') + '</div></div>';
    }
    if (r.services.length) {
      html += '<div>' + heading('SERVICES', 'Services', r.services.length) +
        '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr)); gap: 20px">' + r.services.map(serviceCard).join('') + '</div></div>';
    }
    out.innerHTML = html;
  }

  // ---------- Events ----------
  var q0 = '';
  try { q0 = decodeURIComponent(((/[?&]q=([^&#]*)/.exec(location.search) || [])[1] || '').replace(/\+/g, ' ')); } catch (e) { q0 = ''; }
  $('sInput').value = q0;
  render(q0);

  function sync() {
    var q = $('sInput').value;
    render(q);
    if (window.history && history.replaceState) history.replaceState(null, '', q.trim() ? 'search.html?q=' + encodeURIComponent(q.trim()) : 'search.html');
  }
  $('sInput').addEventListener('input', sync);
  $('sForm').addEventListener('submit', function (e) { e.preventDefault(); sync(); });
})();
