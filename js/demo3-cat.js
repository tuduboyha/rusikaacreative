/* =========================================================
   Rusikaa Creative — demo 3 category page
   category.html?cat=tshirts  -> one category (listing)
   category.html              -> all 12 categories
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC, C = RC.cards, D3 = window.D3, esc = D3.esc;
  var WA = 'https://wa.me/917033560221?text=';
  var $ = function (id) { return document.getElementById(id); };

  var CALL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></svg>';
  var WAI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 19z"></path><path d="M9 9.5c.3 2 2.2 4.2 4.5 4.8l1.2-1.2 1.8.8"></path></svg>';
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>';

  var key = (/[?&]cat=([^&#]+)/.exec(location.search) || [])[1];
  var info = key ? C.INFO[key] : null;
  if (key && !info) { location.replace('404.html?from=' + encodeURIComponent('category.html' + location.search)); return; }

  var state = { sort: 'rel', view: 'list' };
  try { var sv = localStorage.getItem('rcView'); if (sv === 'grid' || sv === 'list') state.view = sv; } catch (e) { /* storage blocked: keep the default */ }

  D3.attach($('hSearch'), $('hq'), $('hSug'));

  function catCard(k) {
    var i = C.INFO[k], n = C.productsIn(k).length;
    return '<a class="cat" href="category.html?cat=' + k + '"><span class="ic">' + RC.illus(k, 60) + '</span>' +
      '<span class="nm">' + esc(RC.CATS[k]) + '</span><small>' + (n ? n + (n === 1 ? ' product' : ' products') : 'Made to order') + '</small></a>';
  }

  function card(p) {
    var i = RC.PRODUCTS.indexOf(p), t = RC.TINTS[i % RC.TINTS.length];
    var tags = '<span class="tag g">Made to order</span>' + (p.custom ? '<span class="tag o">Can be customised</span>' : '') + '<span class="tag">Design preview first</span>';
    return '<article class="card"><a class="ph" href="product.html?id=' + p.id + '" style="--tint: ' + t.tint + '" aria-label="' + esc(p.name) + '">' +
        '<svg viewBox="0 0 160 160" aria-hidden="true">' + RC.ART[p.kind] + '</svg>' +
        '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()">' + (p.popRank <= 3 ? '<span class="badge">Popular</span>' : '') + '</a>' +
      '<div class="body"><h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
        '<div class="tags">' + tags + '</div>' +
        '<p style="font-size: 14px; color: #3C4658">' + esc(D3.BLURB[p.id] || '') + '</p>' +
        '<div class="meta"><span>' + PIN + 'Near EGL Chowk, Sarjamda, Jamshedpur</span></div>' +
        '<p class="price"><span>Ask for price</span> on call or WhatsApp</p>' +
        '<div class="cta">' +
          '<a class="btn btn-call" href="tel:+917033560221" aria-label="Call about ' + esc(p.name) + '">' + CALL + 'Call</a>' +
          '<a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + p.name) + '" target="_blank" rel="noopener">' + WAI + 'WhatsApp</a>' +
        '</div></div></article>';
  }

  function applyView() {
    $('list').classList.toggle('grid', state.view === 'grid');
    Array.prototype.forEach.call(document.querySelectorAll('.vt button'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-view') === state.view); });
  }

  // ---------- all categories ----------
  if (!info) {
    document.title = 'All categories — Rusikaa Creative';
    $('crumbName').textContent = 'All categories'; $('crumbAll').removeAttribute('href');
    $('cheadIn').innerHTML = '<div class="chtxt"><h1>Browse all categories</h1><p>12 categories of printing and custom products, all made to order in Jamshedpur. Pick one to see what we make.</p></div>';
    document.body.classList.add('cat-all');
    $('catBody').hidden = true; $('allBody').hidden = false;
    $('cats').innerHTML = Object.keys(RC.CATS).map(catCard).join('');
    return;
  }

  // ---------- one category ----------
  var name = RC.CATS[key], list = C.productsIn(key);
  document.title = name + ' in Jamshedpur — Rusikaa Creative';
  $('crumbName').textContent = name;
  $('ctaT').textContent = 'Want ' + name.toLowerCase() + ' made for you?';
  $('ctaWa').href = WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + name);

  $('cheadIn').innerHTML =
    '<span class="chico">' + RC.illus(key, 64) + '</span>' +
    '<div class="chtxt"><h1>' + esc(name) + ' in Jamshedpur</h1><p>' + esc(info.desc) + '</p>' +
    '<p class="chmeta"><span>' + (list.length ? list.length + (list.length === 1 ? ' product' : ' products') : 'Made to order') + '</span><span>' + PIN + 'Near EGL Chowk, Sarjamda</span><span>Design preview before printing</span></p></div>' +
    '<div class="chbtn"><a class="btn btn-call" href="tel:+917033560221">' + CALL + 'Call</a>' +
    '<a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + name) + '" target="_blank" rel="noopener">' + WAI + 'WhatsApp</a></div>';

  $('side').innerHTML = Object.keys(RC.CATS).map(function (k) {
    var n = C.productsIn(k).length;
    return '<a href="category.html?cat=' + k + '"' + (k === key ? ' aria-current="page"' : '') + '>' + esc(RC.CATS[k]) + '<small>' + (n || '·') + '</small></a>';
  }).join('');

  $('makes').innerHTML = '<p class="mk">What we make</p><div>' + info.makes.map(function (m) {
    return '<a href="' + WA + encodeURIComponent('Hi Rusikaa Creative, please share a quote for: ' + m) + '" target="_blank" rel="noopener">' + esc(m) + '</a>';
  }).join('') + '</div>';

  function render() {
    var items = list.slice();
    if (state.sort === 'new') items.sort(function (a, b) { return a.newRank - b.newRank; });
    else if (state.sort === 'az') items.sort(function (a, b) { return a.name.localeCompare(b.name); });
    else items.sort(function (a, b) { return a.popRank - b.popRank; });
    $('count').innerHTML = items.length ? '<b>' + items.length + '</b> ' + (items.length === 1 ? 'product' : 'products') + ' in ' + esc(name) : 'No listed products yet';
    $('list').innerHTML = items.length ? items.map(card).join('') :
      '<div class="empty"><h3>Made to order for you</h3><p>We have not listed ' + esc(name.toLowerCase()) + ' as products yet, but we make them to order. Call or message us and we will share a design preview and price.</p>' +
      '<div class="btns"><a class="btn btn-call" href="tel:+917033560221">' + CALL + 'Call</a><a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I am looking for: ' + name) + '" target="_blank" rel="noopener">' + WAI + 'WhatsApp</a></div></div>';
    applyView();
  }

  $('sortS').addEventListener('change', function () { state.sort = this.value; render(); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.vt [data-view]');
    if (!b) return;
    state.view = b.getAttribute('data-view');
    try { localStorage.setItem('rcView', state.view); } catch (err) { /* ignore */ }
    applyView();
  });
  render();
})();
