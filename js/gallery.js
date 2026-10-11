/* =========================================================
   Rusikaa Creative — gallery script
   Polaroid wall with category filter and lightbox.
   Photos live in images/ — add or edit items in ITEMS below.
   ========================================================= */
(function () {
  'use strict';

  var WA = 'https://wa.me/917870140750?text=';
  var GROUPS = { all: 'All', wear: 'Wearables', art: 'Frames & Art', print: 'Print & Stationery', award: 'Awards' };

  // ratio = card photo shape, rot = tilt in degrees, tape = colour of the tape strip
  var ITEMS = [
    { src: 'images/p1.jpg', cap: 'Custom T-Shirts', note: 'Names, logos and designs on tees for teams and events.', group: 'wear', ratio: '4 / 5', rot: -3, tape: '#FF8A00' },
    { src: 'images/p5.jpg', cap: 'Wedding Invitations', note: 'Cards designed and printed to your taste.', group: 'print', ratio: '1 / 1', rot: 2.5, tape: '#E60070' },
    { src: 'images/p3.jpg', cap: 'LED Photo Frames', note: 'Glowing backlit frames for your favourite memories.', group: 'art', ratio: '4 / 3', rot: -2, tape: '#0878E8' },
    { src: 'images/p8.jpg', cap: 'Mementos & Awards', note: 'Trophies and mementos for schools, offices and events.', group: 'award', ratio: '3 / 4', rot: 3, tape: '#7137C8' },
    { src: 'images/p2.jpg', cap: 'Phone Covers', note: 'Your photo or design on a cover for your model.', group: 'wear', ratio: '1 / 1', rot: -2.5, tape: '#159447' },
    { src: 'images/p6.jpg', cap: 'Photo Frames', note: 'Classic frames for prints, portraits and certificates.', group: 'art', ratio: '4 / 5', rot: 2, tape: '#FF8A00' },
    { src: 'images/p4.jpg', cap: 'Acrylic Prints', note: 'Sharp, glossy photo prints on clear acrylic.', group: 'art', ratio: '4 / 3', rot: -3, tape: '#E60070' },
    { src: 'images/p7.jpg', cap: 'Business Stationery', note: 'Letterheads, bill books and envelopes with your brand.', group: 'print', ratio: '1 / 1', rot: 3, tape: '#0878E8' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var grid = $('galleryGrid');
  if (!grid) return;
  var filter = 'all', cur = -1, lastFocus = null;

  function visible() {
    return ITEMS.filter(function (it) { return !it.broken && (filter === 'all' || it.group === filter); });
  }

  function renderChips() {
    $('galleryChips').innerHTML = Object.keys(GROUPS).map(function (k) {
      var on = k === filter;
      return '<button type="button" data-gf="' + k + '" aria-pressed="' + on + '" style="min-height: 44px; padding: 0 18px; border-radius: 999px; border: 2px solid #06285F; background: ' + (on ? '#06285F' : '#FFFFFF') + '; color: ' + (on ? '#FFFFFF' : '#06285F') + '; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer">' + GROUPS[k] + '</button>';
    }).join('');
  }

  function renderGrid() {
    grid.innerHTML = visible().map(function (it) {
      var i = ITEMS.indexOf(it);
      return '<li class="rc-pol-li"><button type="button" class="rc-pol" data-gi="' + i + '" aria-label="Open photo: ' + esc(it.cap) + '" style="--r: ' + it.rot + 'deg">' +
        '<span class="rc-pol-tape" aria-hidden="true" style="background: ' + it.tape + '"></span>' +
        '<span class="rc-pol-photo" style="aspect-ratio: ' + it.ratio + '"><img src="' + it.src + '" alt="' + esc(it.cap) + '" loading="lazy" data-gi="' + i + '"></span>' +
        '<span class="rc-pol-cap">' + esc(it.cap) + '</span></button></li>';
    }).join('');
    Array.prototype.forEach.call(grid.querySelectorAll('img'), function (img) {
      img.addEventListener('error', function () {
        ITEMS[+this.getAttribute('data-gi')].broken = true;
        var li = this.closest('li'); if (li) li.remove();
      });
    });
  }

  // ---------- Lightbox ----------
  function show(it) {
    cur = ITEMS.indexOf(it);
    $('lbImg').src = it.src;
    $('lbImg').alt = it.cap;
    $('lbCap').textContent = it.cap;
    $('lbNote').textContent = it.note;
    $('lbAsk').href = WA + encodeURIComponent('Hi Rusikaa Creative, I saw "' + it.cap + '" in your gallery and want something similar.');
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(ITEMS[i]);
    $('lightbox').hidden = false;
    document.body.classList.add('rc-modal-open');
    $('lbClose').focus();
  }
  function closeLb() {
    cur = -1;
    $('lightbox').hidden = true;
    document.body.classList.remove('rc-modal-open');
    if (lastFocus) lastFocus.focus();
  }
  function step(d) {
    var list = visible(), pos = list.indexOf(ITEMS[cur]);
    if (!list.length) return;
    show(list[(pos + d + list.length) % list.length]);
  }

  document.addEventListener('click', function (e) {
    var el;
    if ((el = e.target.closest('[data-gf]'))) {
      filter = el.getAttribute('data-gf');
      renderChips(); renderGrid();
      var again = document.querySelector('[data-gf="' + filter + '"]'); if (again) again.focus();
    } else if ((el = e.target.closest('.rc-pol'))) {
      openLb(+el.getAttribute('data-gi'));
    }
  });
  $('lbClose').addEventListener('click', closeLb);
  $('lbPrev').addEventListener('click', function () { step(-1); });
  $('lbNext').addEventListener('click', function () { step(1); });
  $('lightbox').addEventListener('click', function (e) { if (e.target === this) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if ($('lightbox').hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });

  renderChips();
  renderGrid();
})();
