/* =========================================================
   Rusikaa Creative — smooth open and close for the FAQ accordions.
   Without this script (or with reduced motion) they still open instantly.
   ========================================================= */
(function () {
  'use strict';
  if (!window.Element || !Element.prototype.animate) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function boxExtra(el) {
    var s = getComputedStyle(el);
    return parseFloat(s.paddingTop) + parseFloat(s.paddingBottom) + parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth);
  }

  document.addEventListener('click', function (e) {
    var sum = e.target.closest && e.target.closest('.faq summary');
    if (!sum || reduce.matches) return;
    var d = sum.parentElement;
    e.preventDefault();
    if (d._anim) { d._anim.cancel(); d._anim = null; }
    d.style.overflow = 'hidden';
    var from = d.offsetHeight, to;
    var closing = d.open;
    if (!closing) {
      d.open = true;
      to = d.offsetHeight;
    } else {
      to = sum.offsetHeight + boxExtra(d);
    }
    var anim = d.animate({ height: [from + 'px', to + 'px'] }, { duration: 320, easing: 'cubic-bezier(.4, 0, .2, 1)' });
    d._anim = anim;
    anim.onfinish = function () {
      if (closing) d.open = false;
      d.style.overflow = '';
      d._anim = null;
    };
    anim.oncancel = function () { d.style.overflow = ''; };
  });
})();
