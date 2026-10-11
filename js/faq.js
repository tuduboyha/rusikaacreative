/* =========================================================
   Rusikaa Creative — FAQ page script
   Topic filter, search and accordion. Edit QA below to add
   or change questions (answers are plain text).
   ========================================================= */
(function () {
  'use strict';

  var TOPICS = { all: 'All', order: 'Ordering', design: 'Design & Customising', delivery: 'Delivery & Shop', products: 'Products & Services' };

  var QA = [
    { t: 'order', q: 'How do I place an order?',
      a: 'Send us a message on WhatsApp (78701 40750) with what you need, or tap "Enquire on WhatsApp" on any product — your choices are filled in for you. We reply with a design preview and price, and once you approve it, we make it.' },
    { t: 'order', q: 'Do I need to create an account or pay online to enquire?',
      a: 'No. There is no sign-up and no online payment on this website. You simply chat with us on WhatsApp and we guide you from there.' },
    { t: 'order', q: 'How will I know the price?',
      a: 'The price depends on the item, size, quantity and design. Tell us these on WhatsApp and we reply with the price before you approve anything.' },
    { t: 'order', q: 'Can I place a bulk order for a school, office or event?',
      a: 'Yes. We print ID cards, badges, certificates, mementos, T-shirts, banners and more for schools, offices and events. Tell us the quantity and the date you need it by, and we will confirm the details.' },
    { t: 'design', q: 'Will I see the design before it is printed?',
      a: 'Yes. We share a design preview with you first, and we print only after you approve it.' },
    { t: 'design', q: 'What photo or logo should I send?',
      a: 'Send a JPG or PNG that is as clear and high-quality as possible. You can attach it on the product page, but please also send the file on WhatsApp in the same chat so we can use it.' },
    { t: 'design', q: 'I do not have a design. Can you make one for me?',
      a: 'Yes. Tell us your idea on the Custom Orders form or on WhatsApp and we will design it for you.' },
    { t: 'design', q: 'Can I get something that is not on the website?',
      a: 'We make most items to order, so please ask. Message us what you are looking for and we will tell you if we can make it.' },
    { t: 'design', q: 'What can I customise on a T-shirt?',
      a: 'You can choose the colour, size and where to print (front, back or both), and add your name, text, photo or logo. Kids and custom sizes are available on request.' },
    { t: 'design', q: 'What do you need for a phone cover?',
      a: 'Your phone brand and exact model, plus the photo or design you want printed. The exact model is needed to get the fit right.' },
    { t: 'delivery', q: 'Where is your shop?',
      a: 'Near EGL Chowk, Sarjamda, Jamshedpur, Jharkhand. You can find a map and directions on our Contact page.' },
    { t: 'delivery', q: 'Do you deliver, or do I have to pick up?',
      a: 'You can pick up from our shop. If you would like delivery, ask us on WhatsApp and we will tell you what is possible for your area.' },
    { t: 'delivery', q: 'How long will my order take?',
      a: 'It depends on the item, the quantity and how quickly the design is approved. We confirm the time together with the price, before you approve the order.' },
    { t: 'delivery', q: 'How can I contact you?',
      a: 'WhatsApp or call 78701 40750 or 70335 60221, or visit the shop. Our Contact page has all the details.' },
    { t: 'products', q: 'What do you print and make?',
      a: 'Printing and event stationery (flex, banners, wedding and other cards, flyers), custom apparel and merchandise (T-shirts, phone covers, badges), business branding (letterheads, bill books, stamps, stickers, ID cards, mementos, certificates), photo frames and premium art (LED frames, acrylic, 3D and resin art), signage and wall decor, and binding and lamination.' },
    { t: 'products', q: 'Do you make LED photo frames and acrylic prints?',
      a: 'Yes. LED photo frames glow with a backlit photo, and acrylic prints give a sharp, glossy finish. Both are made to order from your photo.' },
    { t: 'products', q: 'Do you do project and thesis binding or lamination?',
      a: 'Yes. We offer project and thesis binding, and lamination of cards and documents.' },
    { t: 'products', q: 'Can you make wedding and function invitation cards?',
      a: 'Yes. We design and print wedding invitations, naming ceremony cards, shradh cards and other invitation cards. Send us the matter and the style you like, and we share a preview.' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var filter = 'all', query = '';

  function renderChips() {
    $('faqChips').innerHTML = Object.keys(TOPICS).map(function (k) {
      var on = k === filter;
      return '<button type="button" data-ft="' + k + '" aria-pressed="' + on + '" style="min-height: 44px; padding: 0 18px; border-radius: 999px; border: 2px solid #06285F; background: ' + (on ? '#06285F' : '#FFFFFF') + '; color: ' + (on ? '#FFFFFF' : '#06285F') + '; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer">' + TOPICS[k] + '</button>';
    }).join('');
  }

  function renderList() {
    var q = query.trim().toLowerCase();
    var list = QA.filter(function (x) {
      return (filter === 'all' || x.t === filter) && (!q || x.q.toLowerCase().indexOf(q) >= 0 || x.a.toLowerCase().indexOf(q) >= 0);
    });
    $('faqList').innerHTML = list.map(function (x) {
      return '<details><summary><span>' + esc(x.q) + '</span><span class="rc-faq-icon" aria-hidden="true"></span></summary>' +
        '<div class="rc-faq-a"><p style="margin: 0">' + esc(x.a) + '</p></div></details>';
    }).join('');
    $('faqEmpty').hidden = list.length > 0;
    $('faqCount').textContent = list.length + (list.length === 1 ? ' question' : ' questions');
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-ft]');
    if (!el) return;
    filter = el.getAttribute('data-ft');
    renderChips(); renderList();
    var again = document.querySelector('[data-ft="' + filter + '"]'); if (again) again.focus();
  });
  $('faqSearch').addEventListener('input', function () { query = this.value; renderList(); });

  // structured data so search engines can show these answers
  var ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.text = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: QA.map(function (x) { return { '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } }; })
  });
  document.head.appendChild(ld);

  renderChips();
  renderList();
})();
