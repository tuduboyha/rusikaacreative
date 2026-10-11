/* =========================================================
   Rusikaa Creative — category page script
   category.html?cat=tshirts  → one category
   category.html              → all categories
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC;
  var WA = 'https://wa.me/917870140750?text=';

  // n = card number, bg = soft tint, icon = icon tile colour, ink = text accent, dark = dark card
  var C = RC.cards, INFO = C.INFO, icon = C.icon, productsIn = C.productsIn, catCard = C.catCard, productCard = C.productCard, WA_ICON = C.WA_ICON;
  var KEYS = Object.keys(RC.CATS);
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var key = (/[?&]cat=([^&#]+)/.exec(location.search) || [])[1];
  var one = INFO[key] ? key : null;
  if (key && !one) { location.replace('404.html?from=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)); return; }  // unknown category

  // ---------- Page ----------
  if (one) {
    var c = INFO[one], name = RC.CATS[one], list = productsIn(one);
    var fg = c.dark ? '#FFFFFF' : '#06285F', sub = c.dark ? '#E9EEF8' : '#3B4A68';
    document.title = name + ' — Rusikaa Creative';
    $('crumbName').textContent = name;

    var hero = list[0];
    $('catHero').innerHTML =
      '<div class="rc-dots-light" style="position: relative; overflow: hidden; border-radius: 36px; background-color: ' + c.bg + '; color: ' + fg + '; padding: clamp(28px, 5vw, 64px); display: grid; grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr)); gap: 40px; align-items: center">' +
        '<span aria-hidden="true" style="position: absolute; right: 20px; top: -10px; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: 150px; line-height: 1; color: transparent; -webkit-text-stroke: 2px ' + (c.dark ? 'rgba(255,255,255,.3)' : 'rgba(6,40,95,.14)') + '">' + c.n + '</span>' +
        '<div style="position: relative; display: flex; flex-direction: column; gap: 18px">' +
          '<span style="align-self: flex-start; transform: rotate(-2deg); padding: 6px 14px; border-radius: 10px; background: ' + (c.dark ? '#FFFFFF' : '#06285F') + '; color: ' + (c.dark ? '#06285F' : '#FFFFFF') + '; font-size: 13px; font-weight: 800; letter-spacing: 0.1em">CATEGORY ' + c.n + '</span>' +
          '<h1 style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: clamp(2.4rem, 5vw, 4rem); line-height: 1; letter-spacing: -0.035em">' + esc(name) + '</h1>' +
          '<p style="margin: 0; font-size: 18px; line-height: 1.6; color: ' + sub + '; max-width: 520px">' + esc(c.desc) + '</p>' +
          '<ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px">' + c.makes.map(function (m) {
            return '<li style="padding: 7px 14px; border-radius: 999px; background: ' + (c.dark ? 'rgba(255,255,255,.16)' : '#FFFFFF') + '; font-size: 13px; font-weight: 700; border: 1px solid ' + (c.dark ? 'rgba(255,255,255,.3)' : 'rgba(6,40,95,.12)') + '">' + esc(m) + '</li>';
          }).join('') + '</ul>' +
          '<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 4px">' +
            '<a href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + name) + '" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 10px; height: 54px; padding: 0 26px; border-radius: 999px; background: #0E7A3A; color: #FFFFFF; font-weight: 800; text-decoration: none; box-shadow: 0 6px 0 #0A5A2A">' + WA_ICON + 'Enquire on WhatsApp</a>' +
            '<a href="index.html#custom" style="display: inline-flex; align-items: center; min-height: 44px; font-family: \'Caveat\', cursive; font-size: 26px; font-weight: 700; color: ' + (c.dark ? '#FFC066' : c.ink) + '; text-decoration: none">or, request a custom design →</a>' +
          '</div>' +
        '</div>' +
        '<div style="position: relative; justify-self: center; width: 100%; max-width: 340px; aspect-ratio: 1 / 1; border-radius: 32px; background: ' + c.icon + '; color: ' + c.iconInk + '; transform: rotate(4deg); border: 3px solid #FFFFFF; box-shadow: 0 22px 44px rgba(6,40,95,.25); display: flex; align-items: center; justify-content: center; overflow: hidden">' +
          icon(one, 120) +
          (hero ? '<img src="' + hero.img + '" alt="' + esc(name) + '" onerror="this.remove()" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover">' : '') +
        '</div>' +
      '</div>';

    if (list.length) {
      $('catProductsTitle').textContent = list.length === 1 ? '1 product in ' + name : list.length + ' products in ' + name;
      $('catProducts').innerHTML = list.map(productCard).join('');
    } else {
      $('catProductsTitle').textContent = 'Made to order for you';
      $('catProducts').innerHTML =
        '<div style="grid-column: 1 / -1; padding: 44px 24px; border: 2px dashed #C9BFAE; border-radius: 26px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; background: #FFFFFF">' +
          '<span style="width: 72px; height: 72px; border-radius: 22px; background: ' + c.icon + '; color: ' + c.iconInk + '; display: flex; align-items: center; justify-content: center; transform: rotate(-6deg)">' + icon(one, 36) + '</span>' +
          '<p style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-size: 24px; font-weight: 800">Products are coming soon</p>' +
          '<p style="margin: 0; color: #4A5875; max-width: 460px; line-height: 1.55">We make ' + esc(name.toLowerCase()) + ' to order. Tell us what you need and we will share a design preview and price on WhatsApp.</p>' +
          '<a href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I am looking for: ' + name) + '" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 10px; height: 50px; padding: 0 24px; border-radius: 999px; background: #0E7A3A; color: #FFFFFF; font-weight: 800; text-decoration: none; box-shadow: 0 5px 0 #0A5A2A">' + WA_ICON + 'Ask on WhatsApp</a>' +
        '</div>';
    }

    $('othersTitle').textContent = 'Other categories you may like';
    $('catOthers').innerHTML = KEYS.filter(function (k) { return k !== one; }).map(catCard).join('');
  } else {
    // overview of all categories
    document.title = 'All Categories — Rusikaa Creative';
    $('crumbName').textContent = 'All categories';
    $('crumbAll').removeAttribute('href');
    $('catHero').innerHTML =
      '<div style="display: flex; flex-direction: column; gap: 12px; max-width: 720px">' +
        '<span style="align-self: flex-start; transform: rotate(-3deg); padding: 6px 14px; border-radius: 10px; background: #FFE1EE; color: #B0005A; font-size: 13px; font-weight: 800; letter-spacing: 0.1em">SHOP BY CATEGORY</span>' +
        '<h1 style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: clamp(2.4rem, 5vw, 4rem); line-height: 1; letter-spacing: -0.035em">Find the <span class="rc-mark-p">perfect thing</span> to personalise</h1>' +
        '<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3B4A68">Pick a category to see what we make — everything is made to order and you can enquire on WhatsApp.</p>' +
      '</div>';
    $('catProductsWrap').hidden = true;
    $('othersTag').textContent = 'ALL ' + KEYS.length + ' CATEGORIES';
    $('othersTitle').textContent = 'Choose a category';
    $('catOthers').innerHTML = KEYS.map(catCard).join('');
  }
})();
