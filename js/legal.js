/* Builds the "On this page" list from the h2 headings of a legal page. */
(function () {
  'use strict';
  var toc = document.getElementById('toc');
  var heads = document.querySelectorAll('.rc-prose h2[id]');
  if (!toc || !heads.length) return;
  var items = '';
  Array.prototype.forEach.call(heads, function (h) {
    var a = document.createElement('span'); a.textContent = h.textContent;
    items += '<li><a href="#' + h.id + '">' + a.innerHTML.replace(/^\d+\.\s*/, '') + '</a></li>';
  });
  toc.innerHTML = '<p style="margin: 0 0 10px; font-size: 13px; font-weight: 800; letter-spacing: 0.12em; color: #4A5875">ON THIS PAGE</p>' +
    '<ol style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 2px">' + items + '</ol>';
})();
