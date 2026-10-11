/* =========================================================
   Rusikaa Creative — gallery: two rows of photos that drift right to left.
   Each photo opens its product page.
   ========================================================= */
(function () {
  'use strict';
  var RC = window.RC, g = document.getElementById('galRows');
  if (!RC || !g) return;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var items = RC.PRODUCTS.filter(function (p) { return p.img; });
  var rowA = items.slice();
  var rowB = items.slice().reverse();
  rowB = rowB.slice(3).concat(rowB.slice(0, 3));

  function tile(p, hidden) {
    return '<a class="gal-i" href="product.html?id=' + p.id + '"' + (hidden ? ' tabindex="-1" aria-hidden="true"' : '') + '>' +
      '<img src="' + p.img + '" alt="' + (hidden ? '' : esc(p.name)) + '" loading="lazy" onerror="this.closest(\'.gal-i\').remove()">' +
      '<span>' + esc(p.name) + '</span></a>';
  }
  function row(list, cls) {
    var one = list.map(function (p) { return tile(p, false); }).join('');
    var two = list.map(function (p) { return tile(p, true); }).join('');
    return '<div class="gal-row ' + cls + '"><div class="gal-track">' + one + two + '</div></div>';
  }
  g.innerHTML = row(rowA, 'r1') + row(rowB, 'r2');
})();
