/* =========================================================
   Rusikaa Creative — homepage script
   Shop filter/sort/search, wishlist, WhatsApp enquiry,
   quick view, mobile menu and custom-order form.
   ========================================================= */
(function () {
  'use strict';

  // ---------- Settings ----------
  var WHATSAPP_NUMBER = '917870140750';
  var WA = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=';

  var TINTS = RC.TINTS, ROTS = RC.ROTS, CATS = RC.CATS, PRODUCTS = RC.PRODUCTS, ART = RC.ART;

  // ---------- State ----------
  var state = { filter: 'all', sort: 'new', query: '', wish: [], quickId: null };

  // ---------- Helpers ----------
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function tintOf(p) { return TINTS[PRODUCTS.indexOf(p) % TINTS.length]; }
  function enquiryLink(p) { return WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + p.name); }
  var WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 19z"/></svg>';

  // ---------- Filter chips (slider) ----------
  var ALL_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>';
  var lastChip = null;

  function chipColors(k) {
    var info = RC.cards && RC.cards.INFO[k];
    return k === 'all' || !info ? { c: '#06285F', ci: '#FFFFFF' } : { c: info.icon, ci: info.iconInk };
  }

  function renderChips() {
    var el = $('chips'), keep = el.scrollLeft;
    var keys = ['all'];
    PRODUCTS.forEach(function (p) { if (keys.indexOf(p.cat) < 0) keys.push(p.cat); });
    if (state.filter !== 'all' && keys.indexOf(state.filter) < 0) keys.push(state.filter);
    el.innerHTML = keys.map(function (k) {
      var on = state.filter === k, col = chipColors(k);
      var ico = k === 'all' ? ALL_ICON : (RC.cards ? RC.cards.icon(k, 16) : '');
      return '<button type="button" class="rc-chip" data-chip="' + k + '" aria-pressed="' + on + '" style="--c: ' + col.c + '; --ci: ' + col.ci + '">' +
        '<span class="rc-chip-ico">' + ico + '</span><span>' + esc(k === 'all' ? 'All products' : CATS[k]) + '</span></button>';
    }).join('');
    el.scrollLeft = keep;                         // keep the slider where the visitor left it
    if (lastChip !== null && lastChip !== state.filter) {   // a new chip was picked: bring it to the middle
      var on = el.querySelector('[aria-pressed="true"]');
      if (on) el.scrollTo({ left: on.offsetLeft - (el.clientWidth - on.offsetWidth) / 2, behavior: 'smooth' });
    }
    lastChip = state.filter;
    updateSlider();
  }

  function updateSlider() {
    var el = $('chips'), max = el.scrollWidth - el.clientWidth;
    var left = el.scrollLeft > 2, right = el.scrollLeft < max - 2;
    el.classList.toggle('rc-fade-l', left);
    el.classList.toggle('rc-fade-r', right);
    $('chipPrev').disabled = !left;
    $('chipNext').disabled = !right;
    $('chipsWrap').classList.toggle('rc-no-scroll', max <= 2);
  }

  function initSlider() {
    var el = $('chips'), down = false, moved = false, sx = 0, sl = 0;
    el.addEventListener('scroll', updateSlider, { passive: true });
    window.addEventListener('resize', updateSlider);
    $('chipPrev').addEventListener('click', function () { el.scrollBy({ left: -el.clientWidth * 0.7, behavior: 'smooth' }); });
    $('chipNext').addEventListener('click', function () { el.scrollBy({ left: el.clientWidth * 0.7, behavior: 'smooth' }); });
    // drag to scroll with the mouse (touch screens already swipe)
    el.addEventListener('mousedown', function (e) { if (e.button !== 0) return; down = true; moved = false; sx = e.pageX; sl = el.scrollLeft; });
    window.addEventListener('mousemove', function (e) {
      if (!down) return;
      var dx = e.pageX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; el.classList.add('rc-dragging'); }
      if (moved) el.scrollLeft = sl - dx;
    });
    window.addEventListener('mouseup', function () { down = false; el.classList.remove('rc-dragging'); });
    el.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  }

  // ---------- Product grid ----------
  function productCard(p) {
    var i = PRODUCTS.indexOf(p), t = tintOf(p), wished = state.wish.indexOf(p.id) >= 0;
    return '' +
      '<article class="rc-card rc-pcard" style="background: #FFFFFF; border: 2px solid #06285F; border-radius: 26px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 6px 6px 0 ' + t.shadow + '">' +
        '<div class="rc-pcard-img" style="position: relative; overflow: hidden; height: 230px; background: ' + t.tint + '; display: flex; align-items: center; justify-content: center; border-bottom: 2px solid #06285F">' +
          '<div style="width: 62%; transform: rotate(' + ROTS[i % ROTS.length] + ')"><svg viewBox="0 0 160 160" width="100%" aria-hidden="true">' + ART[p.kind] + '</svg></div>' +
          '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover">' +
          '<span style="position: absolute; top: 14px; left: 14px; padding: 5px 11px; border-radius: 999px; background: #FFFFFF; border: 2px solid #06285F; font-size: 12px; font-weight: 800; color: #06285F">Made to order</span>' +
          '<button type="button" data-wish="' + p.id + '" aria-pressed="' + wished + '" aria-label="' + (wished ? 'Remove ' : 'Add ') + esc(p.name) + (wished ? ' from' : ' to') + ' wishlist" style="position: absolute; top: 8px; right: 8px; width: 46px; height: 46px; border-radius: 999px; border: 2px solid #06285F; background: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: #E60070">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="' + (wished ? '#E60070' : 'none') + '" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>' +
          '</button>' +
          '<button type="button" data-view="' + p.id + '" style="position: absolute; bottom: 12px; right: 12px; height: 38px; padding: 0 14px; border-radius: 999px; border: 0; background: #06285F; color: #FFFFFF; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer">Quick view</button>' +
        '</div>' +
        '<div class="rc-pcard-body" style="padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 6px; flex: 1">' +
          '<span style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; color: ' + t.ink + '">' + esc(CATS[p.cat].toUpperCase()) + '</span>' +
          '<h3 style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-size: 20px; font-weight: 800; line-height: 1.2; letter-spacing: -0.01em"><a href="product.html?id=' + p.id + '" style="color: #06285F; text-decoration: none">' + esc(p.name) + '</a></h3>' +
          '<div style="display: flex; align-items: baseline; gap: 8px; margin-top: 2px">' +
            '<span style="font-size: 21px; font-weight: 800; color: #06285F">₹ [PRICE]</span>' +
            '<span style="font-size: 13px; color: #6B7891; text-decoration: line-through">₹ [MRP]</span>' +
          '</div>' +
          '<div class="rc-pcard-actions" style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px">' +
            '<a href="' + enquiryLink(p) + '" target="_blank" rel="noopener" aria-label="Enquire about ' + esc(p.name) + ' on WhatsApp" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 48px; border-radius: 999px; background: #0E7A3A; color: #FFFFFF; font-size: 15px; font-weight: 800; text-decoration: none; box-shadow: 0 5px 0 #0A5A2A">' + WA_ICON + 'Enquire on WhatsApp</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderProducts() {
    var q = state.query.trim().toLowerCase();
    var list = PRODUCTS.filter(function (p) {
      var inCat = state.filter === 'all' || p.cat === state.filter;
      var match = !q || p.name.toLowerCase().indexOf(q) >= 0 || CATS[p.cat].toLowerCase().indexOf(q) >= 0;
      return inCat && match;
    });
    var key = state.sort === 'popular' ? 'popRank' : (state.sort === 'new' ? 'newRank' : 'priceRank');
    list.sort(function (a, b) { return state.sort === 'high' ? b[key] - a[key] : a[key] - b[key]; });

    $('productGrid').innerHTML = list.map(productCard).join('');
    $('noResults').hidden = list.length > 0;
  }

  // ---------- Wishlist ----------
  function renderCounts() {
    $('wishCount').textContent = state.wish.length;
  }

  function toggleWish(id) {
    var i = state.wish.indexOf(id);
    if (i >= 0) state.wish.splice(i, 1); else state.wish.push(id);
    refresh();
  }

  // ---------- Quick view ----------
  var lastFocus = null;
  function openQuick(id) {
    var p = byId(id), t = tintOf(p);
    state.quickId = id;
    $('qvArt').style.background = t.tint;
    $('qvArt').style.color = t.ink;
    $('qvShort').textContent = p.short;
    $('qvShort').hidden = $('qvNote').hidden = false;
    $('qvImg').hidden = false;
    $('qvImg').alt = p.name;
    $('qvImg').src = p.img;
    $('qvCat').textContent = CATS[p.cat].toUpperCase();
    $('qvCat').style.color = t.ink;
    $('qvName').textContent = p.name;
    $('qvCustom').href = enquiryLink(p);
    lastFocus = document.activeElement;
    $('quickView').hidden = false;
    document.body.classList.add('rc-modal-open');
    $('qvClose').focus();
  }
  function closeQuick() {
    state.quickId = null;
    $('quickView').hidden = true;
    document.body.classList.remove('rc-modal-open');
    if (lastFocus) lastFocus.focus();
  }

  function refresh() {
    renderChips();
    renderProducts();
    renderCounts();
  }

  // ---------- Custom order form ----------
  function updateFormLink() {
    var text = 'Hi Rusikaa Creative, custom order request:' +
      '\nName: ' + ($('rc-name').value || '-') +
      '\nMobile: ' + ($('rc-phone').value || '-') +
      '\nItem: ' + $('rc-item').value +
      '\nDetails: ' + ($('rc-msg').value || '-');
    $('formLink').href = WA + encodeURIComponent(text);
  }

  // ---------- Events ----------
  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-cat]'))) { state.filter = el.getAttribute('data-cat'); state.query = ''; $('rc-search').value = ''; refresh(); }
    else if ((el = e.target.closest('[data-chip]'))) { state.filter = el.getAttribute('data-chip'); refresh(); }
    else if ((el = e.target.closest('[data-wish]'))) { toggleWish(el.getAttribute('data-wish')); }
    else if ((el = e.target.closest('[data-view]'))) { openQuick(el.getAttribute('data-view')); }
    else if ((el = e.target.closest('[data-close-menu]'))) { setMenu(false); }
  });

  function setMenu(open) {
    $('mobileMenu').hidden = !open;
    $('menuToggle').setAttribute('aria-expanded', open);
    $('menuToggle').setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  $('menuToggle').addEventListener('click', function () { setMenu($('mobileMenu').hidden); });

  $('searchToggle').addEventListener('click', function () {
    var open = $('searchBox').hidden;
    $('searchBox').hidden = !open;
    this.setAttribute('aria-expanded', open);
    if (open) $('rc-search').focus();
  });
  $('rc-search').addEventListener('input', function () {
    state.query = this.value; state.filter = 'all'; refresh();
  });
  $('rc-search').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { var v = this.value.trim(); if (v) location.href = 'search.html?q=' + encodeURIComponent(v); else $('shop').scrollIntoView(); }
  });

  $('rc-sort').addEventListener('change', function () { state.sort = this.value; renderProducts(); });

  $('qvImg').addEventListener('load', function () { $('qvShort').hidden = $('qvNote').hidden = true; });
  $('qvClose').addEventListener('click', closeQuick);
  $('quickView').addEventListener('click', function (e) { if (e.target === this) closeQuick(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.quickId) closeQuick(); });

  $('customForm').addEventListener('submit', function (e) { e.preventDefault(); });
  ['rc-name', 'rc-phone', 'rc-item', 'rc-msg'].forEach(function (id) {
    $(id).addEventListener('input', updateFormLink);
    $(id).addEventListener('change', updateFormLink);
  });

  // ---------- Start ----------
  initSlider();
  refresh();
  updateFormLink();
})();
