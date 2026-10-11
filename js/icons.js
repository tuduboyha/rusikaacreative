/* =========================================================
   Rusikaa Creative — category illustrations (original artwork)
   Flat, outlined, multi-colour icons drawn on a 64 x 64 grid, one per
   category. Use RC.illus('tshirts', 60) to get an <svg> string.
   Needs js/data.js first.
   ========================================================= */
(function () {
  'use strict';

  var K = '#1E2A4A';                       // outline ink
  var S = 'stroke="' + K + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';

  var ART = {
    // gift box with a yellow ribbon and bow
    gifts:
      '<rect x="10" y="30" width="44" height="26" rx="3" fill="#FF5CA8" ' + S + '/>' +
      '<rect x="7" y="22" width="50" height="11" rx="3" fill="#E60070" ' + S + '/>' +
      '<rect x="28" y="22" width="8" height="34" fill="#FFC93C" ' + S + '/>' +
      '<path d="M32 22C24 9 11 13 20 22Z" fill="#FFC93C" ' + S + '/>' +
      '<path d="M32 22C40 9 53 13 44 22Z" fill="#FFC93C" ' + S + '/>',

    // blue T-shirt with a yellow heart print
    tshirts:
      '<path d="M22 8L8 15l5 12 8-4v31h22V23l8 4 5-12-14-7c-2 5-6 7-10 7s-8-2-10-7Z" fill="#4C8DFF" ' + S + '/>' +
      '<path d="M25 9.5C27 13 29 14 32 14s5-1 7-4.5" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="M32 46c-6-4-7-9-3.500-10.500 2-.8 3.500.5 3.500 1.500 0-1 1.500-2.300 3.500-1.500C39 37 38 42 32 46Z" fill="#FFC93C" ' + S + '/>',

    // purple phone case with a camera and a photo
    covers:
      '<rect x="17" y="6" width="30" height="52" rx="6" fill="#7B4DFF" ' + S + '/>' +
      '<rect x="21" y="10" width="11" height="14" rx="3" fill="' + K + '"/>' +
      '<circle cx="26.500" cy="14.500" r="2" fill="#8FC0FF"/><circle cx="26.500" cy="20" r="2" fill="#8FC0FF"/>' +
      '<rect x="21" y="30" width="22" height="20" rx="3" fill="#FFFFFF" ' + S + '/>' +
      '<path d="M22 49l7-9 5 5 4-4 4 8Z" fill="#2FBF71"/>' +
      '<circle cx="37" cy="35" r="2.500" fill="#FFC93C"/>',

    // wooden photo frame with a landscape
    frames:
      '<rect x="8" y="10" width="48" height="44" rx="2" fill="#C98A4B" ' + S + '/>' +
      '<rect x="14" y="16" width="36" height="32" fill="#FFFFFF" ' + S + '/>' +
      '<rect x="16" y="18" width="32" height="28" fill="#BFE0FF"/>' +
      '<circle cx="40" cy="26" r="4" fill="#FFC93C"/>' +
      '<path d="M16 46l10-14 7 9 5-5 10 10Z" fill="#2FBF71"/>',

    // glowing LED frame with a heart
    led:
      '<path d="M6 6l5 5M58 6l-5 5M6 58l5-5M58 58l-5-5M32 1.500v5.500M32 57v5.500M1.500 32H7M57 32h5.500" stroke="#FFC93C" stroke-width="2.800" stroke-linecap="round"/>' +
      '<rect x="11" y="11" width="42" height="42" rx="3" fill="' + K + '" ' + S + '/>' +
      '<rect x="16" y="16" width="32" height="32" rx="2" fill="#FFF1B8" stroke="#FFC93C" stroke-width="2"/>' +
      '<path d="M32 42c-8-6-10-12-5.500-14.500 3-1.500 5.500.5 5.500 2.500 0-2 2.500-4 5.500-2.500C42 30 40 36 32 42Z" fill="#FF5CA8" ' + S + '/>',

    // glossy acrylic print with stand-off pins
    acrylic:
      '<rect x="13" y="16" width="44" height="34" rx="3" fill="' + K + '" opacity=".16"/>' +
      '<rect x="9" y="11" width="44" height="34" rx="3" fill="#E8F4FF" ' + S + '/>' +
      '<circle cx="42" cy="20" r="4" fill="#FFC93C"/>' +
      '<path d="M11 43l12-15 8 10 6-7 14 12Z" fill="#2FBF71"/>' +
      '<path d="M14 13h13L14 29Z" fill="#FFFFFF" opacity=".7"/>' +
      '<circle cx="13" cy="15" r="2" fill="#9AA7C2" ' + S + '/><circle cx="49" cy="15" r="2" fill="#9AA7C2" ' + S + '/>' +
      '<circle cx="13" cy="41" r="2" fill="#9AA7C2" ' + S + '/><circle cx="49" cy="41" r="2" fill="#9AA7C2" ' + S + '/>',

    // wall art canvas with a plant
    decor:
      '<rect x="10" y="7" width="36" height="42" rx="2" fill="#FFFFFF" ' + S + '/>' +
      '<circle cx="24" cy="21" r="8" fill="#FF8A00"/>' +
      '<path d="M15 44c0-11 22-11 22 0Z" fill="#4C8DFF"/>' +
      '<path d="M44 44h14l-2 12H46Z" fill="#FF5CA8" ' + S + '/>' +
      '<path d="M51 44c-6-4-7-12-3-16 4 4 5 10 3 16Z" fill="#2FBF71" ' + S + '/>' +
      '<path d="M51 44c6-4 8-10 5-15-5 4-6 9-5 15Z" fill="#1FA463" ' + S + '/>',

    // invitation card peeking out of an envelope
    wedding:
      '<rect x="14" y="8" width="36" height="32" rx="2" fill="#FFFFFF" ' + S + '/>' +
      '<path d="M20 16h24M22 22h20" stroke="#E60070" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M8 27l24 18 24-18v27a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3Z" fill="#FF8A00" ' + S + '/>' +
      '<path d="M8 27l24 18 24-18" fill="none" ' + S + '/>' +
      '<path d="M32 51c-5-3.500-6-7.500-3-8.500 1.500-.5 3 .5 3 1.500 0-1 1.500-2 3-1.500 3 1 2 5-3 8.500Z" fill="#E60070" ' + S + '/>',

    // letterhead page with a pen
    stationery:
      '<rect x="12" y="6" width="36" height="48" rx="2" fill="#FFFFFF" ' + S + '/>' +
      '<rect x="12" y="6" width="36" height="13" fill="#4C8DFF" ' + S + '/>' +
      '<circle cx="21" cy="12.500" r="3" fill="#FFFFFF"/><path d="M27 12.500h15" stroke="#FFFFFF" stroke-width="2.500" stroke-linecap="round"/>' +
      '<path d="M18 27h24M18 33h24M18 39h16" stroke="#9AA7C2" stroke-width="2.200" stroke-linecap="round"/>' +
      '<path d="M38 57l17-17" stroke="' + K + '" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M38 57l17-17" stroke="#FF8A00" stroke-width="4.500" stroke-linecap="round"/>',

    // ID card on a lanyard
    idcards:
      '<path d="M21 2h7l4 12 4-12h7l-7 17h-8Z" fill="#FF5CA8" ' + S + '/>' +
      '<rect x="28" y="16" width="8" height="6" rx="1" fill="#9AA7C2" ' + S + '/>' +
      '<rect x="10" y="22" width="44" height="36" rx="4" fill="#FFFFFF" ' + S + '/>' +
      '<circle cx="24" cy="36" r="6" fill="#FFC9A8" ' + S + '/>' +
      '<path d="M14 53c0-9 20-9 20 0Z" fill="#4C8DFF" ' + S + '/>' +
      '<path d="M38 32h10M38 38h8M38 44h10" stroke="' + K + '" stroke-width="2.200" stroke-linecap="round"/>',

    // golden trophy with a star
    awards:
      '<path d="M18 12H9c0 10 4 14 11 15M46 12h9c0 10-4 14-11 15" fill="none" ' + S + '/>' +
      '<rect x="20" y="52" width="24" height="7" rx="1.500" fill="#7B4DFF" ' + S + '/>' +
      '<rect x="28" y="43" width="8" height="10" fill="#FFC93C" ' + S + '/>' +
      '<path d="M18 7h28v15c0 11-6 21-14 21S18 33 18 22Z" fill="#FFC93C" ' + S + '/>' +
      '<path d="M32 14l2.600 5.400 6 .8-4.400 4.200 1.100 5.900L32 27.400 26.700 30.300l1.100-5.900-4.400-4.200 6-.8Z" fill="#FFFFFF" ' + S + ' stroke-width="1.600"/>',

    // stickers
    merch:
      '<circle cx="28" cy="32" r="22" fill="#FF5CA8" ' + S + '/>' +
      '<path d="M28 17l4 8.500 9 1-6.700 6 1.900 9L28 37l-8.200 4.500 1.900-9-6.700-6 9-1Z" fill="#FFC93C" ' + S + '/>' +
      '<g transform="rotate(10 47 46)"><rect x="36" y="35" width="22" height="22" rx="5" fill="#4C8DFF" ' + S + '/><circle cx="47" cy="46" r="5" fill="#FFFFFF"/><circle cx="47" cy="46" r="1.800" fill="' + K + '"/></g>'
  };

  RC.ICONS = ART;
  // an <svg> string for a category key; size in px (default 60)
  RC.illus = function (key, size) {
    var n = size || 60;
    return '<svg viewBox="0 0 64 64" width="' + n + '" height="' + n + '" aria-hidden="true" focusable="false">' + (ART[key] || '') + '</svg>';
  };
})();
