/* =========================================================
   Rusikaa Creative — services page script
   Renders the six service groups from RC.SERVICES (js/data.js).
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC;
  var WA = 'https://wa.me/917870140750?text=';
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function quote(text) { return WA + encodeURIComponent('Hi Rusikaa Creative, please share a quote for: ' + text); }

  $('svcNav').innerHTML = RC.SERVICES.map(function (s) {
    return '<a href="#' + s.id + '" style="display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 2px solid #06285F; background: #FFFFFF; color: #06285F; font-size: 14px; font-weight: 700; text-decoration: none">' +
      '<span style="width: 22px; height: 22px; border-radius: 50%; background: ' + s.bg + '; color: ' + s.ink + '; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center">' + s.n + '</span>' + esc(s.name) + '</a>';
  }).join('');

  $('svcList').innerHTML = RC.SERVICES.map(function (s) {
    var cats = s.cats.map(function (k) {
      return '<a href="category.html?cat=' + k + '" style="display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px; border-radius: 999px; background: ' + s.tint + '; color: #06285F; font-size: 14px; font-weight: 700; text-decoration: none">' + esc(RC.CATS[k]) + ' →</a>';
    }).join('');
    var items = s.items.map(function (it) {
      return '<li><a href="' + quote(it) + '" target="_blank" rel="noopener" class="rc-card" aria-label="Get a quote for ' + esc(it) + '" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 64px; padding: 12px 18px; border-radius: 18px; background: ' + s.tint + '; color: #06285F; font-weight: 700; text-decoration: none">' +
        '<span>' + esc(it) + '</span><span aria-hidden="true" style="flex-shrink: 0; font-size: 13px; font-weight: 800; color: #0B6A32">Quote →</span></a></li>';
    }).join('');
    return '<article id="' + s.id + '" style="scroll-margin-top: 96px; border-radius: 30px; overflow: hidden; background: #FFFFFF; border: 2px solid #06285F; box-shadow: 8px 8px 0 ' + s.bg + '">' +
      '<div style="position: relative; overflow: hidden; background: ' + s.bg + '; color: ' + s.ink + '; padding: 28px clamp(20px, 4vw, 40px)">' +
        '<span aria-hidden="true" style="position: absolute; right: 18px; bottom: -26px; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: 120px; line-height: 1; color: transparent; -webkit-text-stroke: 2px ' + (s.ink === '#FFFFFF' ? 'rgba(255,255,255,.35)' : 'rgba(6,40,95,.25)') + '">' + s.n + '</span>' +
        '<h2 style="position: relative; margin: 0 0 6px; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: clamp(1.6rem, 3vw, 2.3rem); line-height: 1.05; letter-spacing: -0.02em">' + esc(s.name) + '</h2>' +
        '<p style="position: relative; margin: 0; font-size: 17px; line-height: 1.5; max-width: 560px">' + esc(s.desc) + '</p>' +
      '</div>' +
      '<div style="padding: clamp(20px, 4vw, 36px); display: flex; flex-direction: column; gap: 24px">' +
        '<div><p style="margin: 0 0 12px; font-size: 13px; font-weight: 800; letter-spacing: 0.12em; color: #4A5875">WHAT WE DO</p>' +
        '<ul style="margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr)); gap: 12px">' + items + '</ul></div>' +
        '<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">' +
          '<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px"><span style="font-size: 13px; font-weight: 800; letter-spacing: 0.12em; color: #4A5875; margin-right: 4px">SEE PRODUCTS</span>' + cats + '</div>' +
          '<a href="' + quote(s.name) + '" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px; height: 52px; padding: 0 26px; border-radius: 999px; background: #0E7A3A; color: #FFFFFF; font-weight: 800; text-decoration: none; box-shadow: 0 5px 0 #0A5A2A">Get a quote on WhatsApp</a>' +
        '</div>' +
      '</div></article>';
  }).join('');
})();
