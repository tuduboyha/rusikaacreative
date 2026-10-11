/* =========================================================
   Rusikaa Creative — contact page script
   Builds the WhatsApp message from the contact form.
   ========================================================= */
(function () {
  'use strict';

  var WA = 'https://wa.me/917870140750?text=';
  var $ = function (id) { return document.getElementById(id); };

  function update() {
    var text = 'Hi Rusikaa Creative, I have a message for you.' +
      '\nTopic: ' + $('ct-topic').value +
      '\nName: ' + ($('ct-name').value || '-') +
      '\nMobile: ' + ($('ct-phone').value || '-') +
      '\nMessage: ' + ($('ct-msg').value || '-');
    $('ctLink').href = WA + encodeURIComponent(text);
  }

  $('contactForm').addEventListener('submit', function (e) { e.preventDefault(); });
  ['ct-name', 'ct-phone', 'ct-topic', 'ct-msg'].forEach(function (id) {
    $(id).addEventListener('input', update);
    $(id).addEventListener('change', update);
  });
  update();
})();
