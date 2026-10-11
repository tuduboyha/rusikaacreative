/* =========================================================
   Rusikaa Creative — back-to-top button (all pages)
   Appears after scrolling down; hides while a popup is open.
   ========================================================= */
(function () {
  'use strict';

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'rc-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.hidden = true;
  btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"></path></svg>';
  document.body.appendChild(btn);

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;

  function update() {
    ticking = false;
    var show = (window.pageYOffset || document.documentElement.scrollTop) > 400;
    if (show === btn.hidden) {
      btn.hidden = !show;
      if (show) { requestAnimationFrame(function () { btn.classList.add('rc-top-in'); }); }
      else btn.classList.remove('rc-top-in');
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // move keyboard focus to the top of the page so the next Tab starts there
    var skip = document.querySelector('header a, header button');
    if (skip) skip.focus({ preventScroll: true });
  });

  update();
})();
