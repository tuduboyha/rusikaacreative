/* =========================================================
   Rusikaa Creative — How It Works page script
   Renders the six order steps. Edit STEPS to change the text.
   ========================================================= */
(function () {
  'use strict';

  var STEPS = [
    { c: '#E60070', tint: '#FFE1EE', title: 'Tell us what you need',
      text: 'Message us on WhatsApp, fill in the Custom Order form, call us or drop by the shop. You can also tap "Enquire on WhatsApp" on any product.',
      link: ['Contact us', 'contact.html'] },
    { c: '#7137C8', tint: '#EEE7FA', title: 'Share your photo, logo or idea',
      text: 'Send your photo, logo or reference design in the same WhatsApp chat, along with any text, size, colour and quantity. No design? We will create one for you.',
      link: ['Custom orders', 'index.html#custom'] },
    { c: '#0866C4', tint: '#E3F0FD', title: 'Get a design preview and price',
      text: 'We reply with a design preview and the price. Prices depend on the item, size, quantity and design, so you always know the cost before going ahead.',
      link: ['Our services', 'services.html'] },
    { c: '#FF8A00', ink: '#8A4300', tint: '#FFF0DA', title: 'Approve the design',
      text: 'Check the spelling, colours and layout carefully. Ask for changes if you need them. We print only after you approve.',
      link: ['Read our terms', 'terms.html'] },
    { c: '#0E7A3A', tint: '#E2F4E9', title: 'We make it',
      text: 'Once approved, we print and prepare your order. Every product is made to order, just for you.',
      link: ['See what we make', 'category.html'] },
    { c: '#06285F', tint: '#F0F2F7', title: 'Pick up or get it delivered',
      text: 'Collect your order from our shop near EGL Chowk, Sarjamda, or ask us about delivery to your area.',
      link: ['Shipping & delivery', 'shipping.html'] }
  ];

  function esc(s) { return String(s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }

  document.getElementById('steps').innerHTML = STEPS.map(function (s, i) {
    var last = i === STEPS.length - 1;
    return '<li class="rc-step">' +
      '<div class="rc-step-rail" aria-hidden="true">' +
        '<span class="rc-step-num" style="background: ' + s.c + '; transform: rotate(' + (i % 2 ? 6 : -6) + 'deg)">' + (i + 1) + '</span>' +
        (last ? '' : '<span class="rc-step-line"></span>') +
      '</div>' +
      '<div class="rc-step-card" style="background: ' + s.tint + '">' +
        '<h2>' + esc(s.title) + '</h2>' +
        '<p>' + esc(s.text) + '</p>' +
        '<a href="' + s.link[1] + '" style="color: ' + (s.ink || s.c) + '">' + esc(s.link[0]) + ' →</a>' +
      '</div></li>';
  }).join('');
})();
