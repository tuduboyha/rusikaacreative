/* =========================================================
   Rusikaa Creative — testimonials page script

   HOW TO ADD A REAL REVIEW
   Add an object to REVIEWS with the customer's permission:
     { name: 'Customer name', place: 'Area / school / business',
       product: 'What they ordered', text: 'Their words.',
       stars: 5, photo: 'images/reviews/name.jpg' }   // stars and photo optional
   While REVIEWS is empty the page shows clearly-marked sample cards.
   Never publish a review that a real customer did not write.
   ========================================================= */
(function () {
  'use strict';

  var REVIEWS = [];

  var SAMPLES = [
    { name: '[Customer name]', place: '[Area / school / business]', product: '[Product ordered]', text: '[Paste the customer\'s review here — what they ordered and how it turned out.]' },
    { name: '[Customer name]', place: '[Area / school / business]', product: '[Product ordered]', text: '[Paste the customer\'s review here.]' },
    { name: '[Customer name]', place: '[Area / school / business]', product: '[Product ordered]', text: '[Paste the customer\'s review here — a longer review can sit here too, it will fit.]' },
    { name: '[Customer name]', place: '[Area / school / business]', product: '[Product ordered]', text: '[Paste the customer\'s review here.]' },
    { name: '[Customer name]', place: '[Area / school / business]', product: '[Product ordered]', text: '[Paste the customer\'s review here.]' },
    { name: '[Customer name]', place: '[Area / school / business]', product: '[Product ordered]', text: '[Paste the customer\'s review here.]' }
  ];

  var TINTS = ['#FFE1EE', '#E3F0FD', '#EEE7FA', '#FFF0DA', '#E2F4E9', '#FFE1EE'];
  var ROTS = [-1.5, 1, -0.8, 1.4, -1.2, 0.8];
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var sample = REVIEWS.length === 0;
  var list = sample ? SAMPLES : REVIEWS;
  $('tNote').hidden = !sample;

  function stars(n) {
    var s = '';
    for (var i = 1; i <= 5; i++) s += '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style="color: ' + (i <= n ? '#FF8A00' : '#D5CCBC') + '"><path fill="currentColor" d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.9z"/></svg>';
    return '<span role="img" aria-label="' + n + ' out of 5 stars" style="display: inline-flex; gap: 2px">' + s + '</span>';
  }
  function initial(name) { var m = /[A-Za-zऀ-ॿ]/.exec(name); return m ? m[0].toUpperCase() : '★'; }

  $('tGrid').innerHTML = list.map(function (r, i) {
    var tint = TINTS[i % TINTS.length];
    var avatar = r.photo
      ? '<img src="' + esc(r.photo) + '" alt="" loading="lazy" onerror="this.remove()" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%">'
      : esc(initial(r.name));
    return '<li class="rc-review-li"><figure class="rc-review" style="--r: ' + ROTS[i % ROTS.length] + 'deg; background: ' + tint + '">' +
      '<span class="rc-review-q" aria-hidden="true">“</span>' +
      (r.stars ? stars(r.stars) : '') +
      '<blockquote style="margin: 0; font-size: 16px; line-height: 1.6; color: #06285F">' + esc(r.text) + '</blockquote>' +
      '<figcaption style="display: flex; align-items: center; gap: 12px; margin-top: auto; padding-top: 6px">' +
        '<span style="flex-shrink: 0; width: 46px; height: 46px; border-radius: 50%; background: #06285F; color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: 20px">' + avatar + '</span>' +
        '<span style="display: flex; flex-direction: column; line-height: 1.3"><strong style="font-size: 15px">' + esc(r.name) + '</strong>' +
        '<span style="font-size: 13px; color: #3B4A68">' + esc(r.place) + (r.product ? ' · ' + esc(r.product) : '') + '</span></span>' +
      '</figcaption></figure></li>';
  }).join('');
})();
