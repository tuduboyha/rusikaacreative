/* =========================================================
   Rusikaa Creative — scripts for the inner pages
   contact, services, how it works, FAQ, testimonials, search, legal pages.
   Each block runs only on the page that has its elements.
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC, C = RC.cards, D3 = window.D3;
  var WA = 'https://wa.me/917033560221?text=';
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function quote(text) { return WA + encodeURIComponent('Hi Rusikaa Creative, please share a quote for: ' + text); }
  var CALL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></svg>';
  var WAI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 19z"></path><path d="M9 9.5c.3 2 2.2 4.2 4.5 4.8l1.2-1.2 1.8.8"></path></svg>';
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>';

  if (D3 && $('hSearch')) D3.attach($('hSearch'), $('hq'), $('hSug'));

  // ---------- contact ----------
  if ($('contactForm')) {
    var upd = function () {
      var text = 'Hi Rusikaa Creative, I have a message for you.' +
        '\nTopic: ' + $('ct-topic').value + '\nName: ' + ($('ct-name').value || '-') +
        '\nMobile: ' + ($('ct-phone').value || '-') + '\nMessage: ' + ($('ct-msg').value || '-');
      $('ctLink').href = WA + encodeURIComponent(text);
    };
    $('contactForm').addEventListener('submit', function (e) { e.preventDefault(); });
    ['ct-name', 'ct-phone', 'ct-topic', 'ct-msg'].forEach(function (id) { $(id).addEventListener('input', upd); $(id).addEventListener('change', upd); });
    upd();
  }

  // ---------- services ----------
  if ($('svcList')) {
    $('svcNav').innerHTML = RC.SERVICES.map(function (s) {
      return '<a href="#' + s.id + '" style="--c: ' + s.bg + '; --ci: ' + s.ink + '"><span>' + s.n + '</span>' + esc(s.name) + '</a>';
    }).join('');
    $('svcList').innerHTML = RC.SERVICES.map(function (s) {
      var cats = s.cats.map(function (k) { return '<a href="category.html?cat=' + k + '">' + esc(RC.CATS[k]) + '</a>'; }).join('');
      var items = s.items.map(function (it) {
        return '<a href="' + quote(it) + '" target="_blank" rel="noopener" aria-label="Get a quote for ' + esc(it) + '"><span>' + esc(it) + '</span><span aria-hidden="true">Quote</span></a>';
      }).join('');
      return '<article class="sx" id="' + s.id + '" style="--c: ' + s.bg + '; --ci: ' + s.ink + '; --t: ' + s.tint + '">' +
        '<div class="sx-top"><span class="sx-n">' + s.n + '</span><div><h2>' + esc(s.name) + '</h2><p>' + esc(s.desc) + '</p></div></div>' +
        '<div class="sx-body"><div class="sx-items">' + items + '</div>' +
        '<div class="sx-foot"><div class="sx-cats"><b>See products</b>' + cats + '</div>' +
        '<a class="btn btn-wa" href="' + quote(s.name) + '" target="_blank" rel="noopener">' + WAI + 'Get a quote</a></div></div></article>';
    }).join('');
  }

  // ---------- how it works ----------
  if ($('steps')) {
    var STEPS = [
      { c: '#E5007D', title: 'Tell us what you need', text: 'Message us on WhatsApp, call us or drop by the shop. You can also tap WhatsApp on any product.', link: ['Contact us', 'contact.html'] },
      { c: '#7137C8', title: 'Share your photo, logo or idea', text: 'Send your photo, logo or reference design in the same WhatsApp chat, along with any text, size, colour and quantity. No design? We will create one for you.', link: ['Try the live designer', 'index.html#design'] },
      { c: '#1665D8', title: 'Get a design preview and price', text: 'We reply with a design preview and the price. Prices depend on the item, size, quantity and design, so you always know the cost before going ahead.', link: ['Our services', 'services.html'] },
      { c: '#FF8A00', title: 'Approve the design', text: 'Check the spelling, colours and layout carefully. Ask for changes if you need them. We print only after you approve.', link: ['Read our terms', 'terms.html'] },
      { c: '#0E9F5A', title: 'We make it', text: 'Once approved, we print and prepare your order. Every product is made to order, just for you.', link: ['See what we make', 'category.html'] },
      { c: '#14213D', title: 'Pick up or get it delivered', text: 'Collect your order from our shop near EGL Chowk, Sarjamda, or ask us about delivery to your area.', link: ['Shipping and delivery', 'shipping.html'] }
    ];
    $('steps').innerHTML = STEPS.map(function (s, i) {
      return '<li style="--c: ' + s.c + '"><span class="n">' + (i + 1) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p><a href="' + s.link[1] + '">' + esc(s.link[0]) + ' &rarr;</a></li>';
    }).join('');
  }

  // ---------- FAQ ----------
  if ($('faqList')) {
    var TOPICS = { all: 'All', order: 'Ordering', design: 'Design and customising', delivery: 'Delivery and shop', products: 'Products and services' };
    var QA = [
      { t: 'order', q: 'How do I place an order?', a: 'Send us a message on WhatsApp (70335 60221) with what you need, or tap WhatsApp on any product. Your choices are filled in for you. We reply with a design preview and price, and once you approve it, we make it.' },
      { t: 'order', q: 'Do I need to create an account or pay online to enquire?', a: 'No. There is no sign-up and no online payment on this website. You simply chat with us on WhatsApp and we guide you from there.' },
      { t: 'order', q: 'How will I know the price?', a: 'The price depends on the item, size, quantity and design. Tell us these on WhatsApp and we reply with the price before you approve anything.' },
      { t: 'order', q: 'Can I place a bulk order for a school, office or event?', a: 'Yes. We print ID cards, badges, certificates, mementos, T-shirts, banners and more for schools, offices and events. Tell us the quantity and the date you need it by, and we will confirm the details.' },
      { t: 'design', q: 'Will I see the design before it is printed?', a: 'Yes. We share a design preview with you first, and we print only after you approve it.' },
      { t: 'design', q: 'What photo or logo should I send?', a: 'Send a JPG or PNG that is as clear and high-quality as possible. Please send the file on WhatsApp in the same chat so we can use it.' },
      { t: 'design', q: 'I do not have a design. Can you make one for me?', a: 'Yes. Tell us your idea on WhatsApp and we will design it for you.' },
      { t: 'design', q: 'Can I get something that is not on the website?', a: 'We make most items to order, so please ask. Message us what you are looking for and we will tell you if we can make it.' },
      { t: 'design', q: 'What can I customise on a T-shirt?', a: 'You can choose the colour, size and where to print (front, back or both), and add your name, text, photo or logo. Kids and custom sizes are available on request.' },
      { t: 'design', q: 'What do you need for a phone cover?', a: 'Your phone brand and exact model, plus the photo or design you want printed. The exact model is needed to get the fit right.' },
      { t: 'delivery', q: 'Where is your shop?', a: 'Near EGL Chowk, Sarjamda, Jamshedpur, Jharkhand. You can find a map and directions on our Contact page.' },
      { t: 'delivery', q: 'Do you deliver, or do I have to pick up?', a: 'You can pick up from our shop. If you would like delivery, ask us on WhatsApp and we will tell you what is possible for your area.' },
      { t: 'delivery', q: 'How long will my order take?', a: 'It depends on the item, the quantity and how quickly the design is approved. We confirm the time together with the price, before you approve the order.' },
      { t: 'delivery', q: 'How can I contact you?', a: 'WhatsApp or call 70335 60221, or visit the shop. Our Contact page has all the details.' },
      { t: 'products', q: 'What do you print and make?', a: 'Printing and event stationery (flex, banners, wedding and other cards, flyers), custom apparel and merchandise (T-shirts, phone covers, badges), business branding (letterheads, bill books, stamps, stickers, ID cards, mementos, certificates), photo frames and premium art (LED frames, acrylic, 3D and resin art), signage and wall decor, and binding and lamination.' },
      { t: 'products', q: 'Do you make LED photo frames and acrylic prints?', a: 'Yes. LED photo frames glow with a backlit photo, and acrylic prints give a sharp, glossy finish. Both are made to order from your photo.' },
      { t: 'products', q: 'Do you do project and thesis binding or lamination?', a: 'Yes. We offer project and thesis binding, and lamination of cards and documents.' },
      { t: 'products', q: 'Can you make wedding and function invitation cards?', a: 'Yes. We design and print wedding invitations, naming ceremony cards, shradh cards and other invitation cards. Send us the matter and the style you like, and we share a preview.' }
    ];
    var filter = 'all', query = '';
    var chips = function () {
      $('faqChips').innerHTML = Object.keys(TOPICS).map(function (k) {
        return '<button type="button" class="fq-chip" data-ft="' + k + '" aria-pressed="' + (k === filter) + '">' + TOPICS[k] + '</button>';
      }).join('');
    };
    var list = function () {
      var q = query.trim().toLowerCase();
      var out = QA.filter(function (x) { return (filter === 'all' || x.t === filter) && (!q || x.q.toLowerCase().indexOf(q) >= 0 || x.a.toLowerCase().indexOf(q) >= 0); });
      $('faqList').innerHTML = out.map(function (x) { return '<details><summary>' + esc(x.q) + '</summary><p>' + esc(x.a) + '</p></details>'; }).join('');
      $('faqEmpty').hidden = out.length > 0;
      $('faqCount').textContent = out.length + (out.length === 1 ? ' question' : ' questions');
    };
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-ft]'); if (!el) return;
      filter = el.getAttribute('data-ft'); chips(); list();
      var again = document.querySelector('[data-ft="' + filter + '"]'); if (again) again.focus();
    });
    $('faqSearch').addEventListener('input', function () { query = this.value; list(); });
    var ld = document.createElement('script'); ld.type = 'application/ld+json';
    ld.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: QA.map(function (x) { return { '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } }; }) });
    document.head.appendChild(ld);
    chips(); list();
  }

  // ---------- testimonials ----------
  if ($('tGrid')) {
    // Add real reviews here, with the customer's permission:
    // { name: 'Customer name', place: 'Area / school / business', product: 'What they ordered', text: 'Their words.' }
    // While REVIEWS is empty the page shows clearly marked sample cards. Never publish a review a real customer did not write.
    var REVIEWS = [];
    var SAMPLE = { name: '[Customer name]', place: '[Area / school / business]', product: '[Product ordered]', text: '[Paste the customer\'s review here. What they ordered and how it turned out.]' };
    var sample = REVIEWS.length === 0;
    var rv = sample ? [SAMPLE, SAMPLE, SAMPLE, SAMPLE, SAMPLE, SAMPLE] : REVIEWS;
    var COL = ['#E5007D', '#1665D8', '#FF8A00', '#7137C8', '#0E9F5A', '#D4A100'];
    $('tNote').hidden = !sample;
    $('tGrid').innerHTML = rv.map(function (r, i) {
      var ini = (/[A-Za-z]/.exec(r.name) || ['★'])[0].toUpperCase();
      return '<li style="--c: ' + COL[i % COL.length] + '"><figure class="rv"><span class="rv-q" aria-hidden="true">&ldquo;</span><blockquote>' + esc(r.text) + '</blockquote>' +
        '<figcaption><span class="rv-a">' + esc(ini) + '</span><span><b>' + esc(r.name) + '</b><small>' + esc(r.place) + (r.product ? ' &middot; ' + esc(r.product) : '') + '</small></span></figcaption></figure></li>';
    }).join('');
  }

  // ---------- search ----------
  if ($('sResults')) {
    var words = function (q) { return q.toLowerCase().split(/[^a-z0-9ऀ-ॿ]+/).filter(Boolean); };
    var has = function (text, w) {
      var t = text.toLowerCase(), tc = t.replace(/[^a-z0-9ऀ-ॿ]/g, '');
      var forms = [w]; if (w.length > 3 && w.charAt(w.length - 1) === 's') forms.push(w.slice(0, -1));
      return forms.some(function (f) { return t.indexOf(f) >= 0 || tc.indexOf(f) >= 0; });
    };
    var hits = function (text, ws) { return ws.every(function (w) { return has(text, w); }); };
    var score = function (title, text, ws) { var n = 0; ws.forEach(function (w) { if (has(title, w)) n += 2; }); return n + (hits(text, ws) ? 1 : 0); };
    var BL = (D3 && D3.BLURB) || {};
    var find = function (q) {
      var ws = words(q), res = { products: [], cats: [], services: [] };
      if (!ws.length) return res;
      RC.PRODUCTS.forEach(function (p) { var text = [p.name, p.short, RC.CATS[p.cat], BL[p.id] || ''].join(' '); if (hits(text, ws)) res.products.push({ p: p, s: score(p.name, text, ws) }); });
      Object.keys(RC.CATS).forEach(function (k) { var info = C.INFO[k], text = [RC.CATS[k], info.desc, info.makes.join(' ')].join(' '); if (hits(text, ws)) res.cats.push({ k: k, s: score(RC.CATS[k], text, ws) }); });
      RC.SERVICES.forEach(function (sv) {
        var text = [sv.name, sv.desc, sv.items.join(' ')].join(' ');
        if (hits(text, ws)) { var m = sv.items.filter(function (it) { return hits(it, ws); }); res.services.push({ sv: sv, matched: m, s: score(sv.name + ' ' + m.join(' '), text, ws) }); }
      });
      ['products', 'cats', 'services'].forEach(function (key) { res[key].sort(function (a, b) { return b.s - a.s; }); });
      return res;
    };
    var catCard = function (k) {
      var n = C.productsIn(k).length;
      return '<a class="cat" href="category.html?cat=' + k + '"><span class="ic">' + RC.illus(k, 60) + '</span><span class="nm">' + esc(RC.CATS[k]) + '</span><small>' + (n ? n + (n === 1 ? ' product' : ' products') : 'Made to order') + '</small></a>';
    };
    var card = function (p) {
      var i = RC.PRODUCTS.indexOf(p), t = RC.TINTS[i % RC.TINTS.length];
      var tags = '<span class="tag b">' + esc(RC.CATS[p.cat]) + '</span>' + (p.custom ? '<span class="tag o">Can be customised</span>' : '') + '<span class="tag g">Made to order</span>';
      return '<article class="card"><a class="ph" href="product.html?id=' + p.id + '" style="--tint: ' + t.tint + '" aria-label="' + esc(p.name) + '"><svg viewBox="0 0 160 160" aria-hidden="true">' + RC.ART[p.kind] + '</svg><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()"></a>' +
        '<div class="body"><h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3><div class="tags">' + tags + '</div><p class="price"><span>Ask for price</span> on call or WhatsApp</p>' +
        '<div class="cta"><a class="btn btn-call" href="tel:+917033560221">' + CALL + 'Call</a><a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + p.name) + '" target="_blank" rel="noopener">' + WAI + 'WhatsApp</a></div></div></article>';
    };
    var svcCard = function (r) {
      var sv = r.sv;
      var chips = r.matched.map(function (it) { return '<a href="' + quote(it) + '" target="_blank" rel="noopener">' + esc(it) + ' &middot; Quote</a>'; }).join('');
      return '<article class="sr-svc" style="--c: ' + sv.bg + '; --t: ' + sv.tint + '"><b>Service ' + sv.n + '</b><h3><a href="services.html#' + sv.id + '">' + esc(sv.name) + '</a></h3><p>' + esc(sv.desc) + '</p>' + (chips ? '<div class="sr-ch">' + chips + '</div>' : '') + '<a class="sv-more" href="services.html#' + sv.id + '">View service</a></article>';
    };
    var block = function (title, count, inner, cls) { return '<div><div class="hd"><div><h2>' + title + ' <span class="cnt">(' + count + ')</span></h2></div></div>' + inner + '</div>'; };
    var allCats = function () { return '<div class="cats" id="cats">' + Object.keys(RC.CATS).map(catCard).join('') + '</div>'; };
    var render = function (q) {
      var ws = words(q), out = $('sResults');
      document.title = (q ? 'Search: ' + q + ' — ' : 'Search — ') + 'Rusikaa Creative';
      if (!ws.length) { $('sSummary').textContent = 'Type a product, category or service to get started.'; out.innerHTML = block('Popular categories', 12, allCats()); return; }
      var r = find(q), total = r.products.length + r.cats.length + r.services.length;
      $('sSummary').innerHTML = total ? total + (total === 1 ? ' result' : ' results') + ' for <b>“' + esc(q.trim()) + '”</b>' : 'No results for <b>“' + esc(q.trim()) + '”</b>';
      if (!total) {
        out.innerHTML = '<div class="empty"><h3>We could not find that yet</h3><p>We make most items to order, so it may still be possible. Tell us what you need and we will let you know.</p><div class="btns"><a class="btn btn-wa" href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I am looking for: ' + q.trim()) + '" target="_blank" rel="noopener">' + WAI + 'WhatsApp</a></div></div>' + block('Try a category', 12, allCats());
        return;
      }
      var html = '';
      if (r.products.length) html += block('Products', r.products.length, '<div class="list grid home">' + r.products.map(function (x) { return card(x.p); }).join('') + '</div>');
      if (r.cats.length) html += block('Categories', r.cats.length, '<div class="cats" id="cats">' + r.cats.map(function (x) { return catCard(x.k); }).join('') + '</div>');
      if (r.services.length) html += block('Services', r.services.length, '<div class="sr-grid">' + r.services.map(svcCard).join('') + '</div>');
      out.innerHTML = html;
    };
    var q0 = '';
    try { q0 = decodeURIComponent(((/[?&]q=([^&#]*)/.exec(location.search) || [])[1] || '').replace(/\+/g, ' ')); } catch (e) { q0 = ''; }
    $('sInput').value = q0; render(q0);
    var sync = function () {
      var q = $('sInput').value; render(q);
      if (window.history && history.replaceState) history.replaceState(null, '', q.trim() ? 'search.html?q=' + encodeURIComponent(q.trim()) : 'search.html');
    };
    $('sInput').addEventListener('input', sync);
    $('sForm').addEventListener('submit', function (e) { e.preventDefault(); sync(); });
  }

  // ---------- legal pages: "On this page" list ----------
  if ($('toc')) {
    var heads = document.querySelectorAll('.prose h2[id]'), items = '';
    Array.prototype.forEach.call(heads, function (h) { items += '<li><a href="#' + h.id + '">' + esc(h.textContent.replace(/^\d+\.\s*/, '')) + '</a></li>'; });
    $('toc').innerHTML = '<h3>On this page</h3><ol>' + items + '</ol>';
  }
})();
