/* Shared product options and descriptions (original product page + demo 3). Needs js/data.js first. */
(function () {
  'use strict';
  var RC = window.RC;

  var COLORS = [
    { name: 'White', hex: '#FFFFFF', ink: '#06285F' },
    { name: 'Black', hex: '#1B1B1F', ink: '#FFFFFF' },
    { name: 'Navy', hex: '#06285F', ink: '#FFFFFF' },
    { name: 'Magenta', hex: '#E60070', ink: '#FFFFFF' },
    { name: 'Sunny Yellow', hex: '#FFC93C', ink: '#06285F' },
    { name: 'Sky Blue', hex: '#8FC8F5', ink: '#06285F' }
  ];

  var DETAILS = {
    p1: {
      intro: 'Your name, photo, logo or design printed on a comfortable T-shirt — for yourself, your team, your school or your event.',
      options: [
        { label: 'Colour', kind: 'colors' },
        { label: 'Size', kind: 'sizes', values: ['S', 'M', 'L', 'XL', 'XXL'], note: 'Kids and custom sizes available on request.' },
        { label: 'Print on', kind: 'chips', values: ['Front', 'Back', 'Front + Back'] }
      ],
      textLabel: 'Name or text to print', textPlaceholder: 'e.g. TEAM RUSIKAA', textHint: 'Up to 18 characters — see it on the preview.', textMax: 18,
      desc: 'Print anything you love — a name and number for your sports team, a logo for your shop staff, a photo for a birthday, or matching tees for a family event.',
      specs: [['Fabric', '[e.g. cotton / polyester]'], ['Print method', '[e.g. sublimation / DTF / vinyl]'], ['Sizes', 'S, M, L, XL, XXL (others on request)'], ['Print area', 'Front, back or both'], ['Minimum order', '[e.g. 1 piece]'], ['Wash care', '[Care instructions]']]
    },
    p2: {
      intro: 'Your favourite photo, name or design printed on a phone cover made for your exact phone model.',
      options: [
        { label: 'Cover type', kind: 'chips', values: ['Hard', 'Soft / TPU', 'Glossy glass'] }
      ],
      textLabel: 'Phone brand & model', textPlaceholder: 'e.g. iPhone 13 / Redmi Note 12', textHint: 'We need the exact model to get the fit right.', textMax: 30,
      desc: 'Turn a photo, a quote or a design into a cover you will actually enjoy using. Send us your phone model and picture and we take care of the rest.',
      specs: [['Cover material', '[e.g. hard polycarbonate / TPU]'], ['Print method', '[e.g. sublimation]'], ['Fits', 'Most popular phone models — tell us yours'], ['Minimum order', '[e.g. 1 piece]'], ['Care', '[Care instructions]']]
    },
    p3: {
      intro: 'A glowing backlit frame that lights up your photo — a gift that stands out on any shelf or desk.',
      options: [
        { label: 'Size', kind: 'chips', values: ['6 x 8 in', '8 x 10 in', '10 x 12 in'] },
        { label: 'Light', kind: 'chips', values: ['Warm white', 'Cool white', 'Multicolour'] }
      ],
      textLabel: 'Name or message (optional)', textPlaceholder: 'e.g. Happy Anniversary', textHint: 'Up to 24 characters.', textMax: 24,
      desc: 'Send us a photo and we print it on a backlit panel that glows when switched on. Great for birthdays, anniversaries and home decor.',
      specs: [['Frame material', '[e.g. acrylic / wood]'], ['Light type', '[e.g. LED strip, USB powered]'], ['Sizes', '6 x 8, 8 x 10, 10 x 12 in (others on request)'], ['Minimum order', '[e.g. 1 piece]'], ['Care', '[Care instructions]']]
    },
    p4: {
      intro: 'Sharp, glossy photo prints on clear acrylic — vivid colour and a premium look for walls and gifts.',
      options: [
        { label: 'Size', kind: 'chips', values: ['8 x 12 in', '12 x 18 in', '16 x 24 in'] },
        { label: 'Thickness', kind: 'chips', values: ['3 mm', '5 mm'] }
      ],
      textLabel: 'Caption (optional)', textPlaceholder: 'e.g. Our First Trip', textHint: 'Up to 24 characters.', textMax: 24,
      desc: 'Your photo printed behind clear acrylic for a deep, glossy finish. Send the best quality photo you have for the sharpest result.',
      specs: [['Material', '[e.g. clear acrylic]'], ['Print method', '[e.g. UV / direct print]'], ['Sizes', '8 x 12, 12 x 18, 16 x 24 in (others on request)'], ['Mounting', '[e.g. standoff pins / stand]'], ['Minimum order', '[e.g. 1 piece]']]
    },
    p5: {
      intro: 'Wedding and function invitation cards, designed and printed to your taste.',
      options: [
        { label: 'Card style', kind: 'chips', values: ['Standard', 'Premium', 'Scroll / Box'] },
        { label: 'Language', kind: 'chips', values: ['Hindi', 'English', 'Both'] }
      ],
      textLabel: 'Names & event date', textPlaceholder: 'e.g. Rahul & Priya, 12 Dec', textHint: 'Up to 30 characters — full matter can be sent on WhatsApp.', textMax: 30,
      desc: 'Weddings, naming ceremonies and other functions. Tell us the style and send the matter, and we share a design preview before printing.',
      specs: [['Paper / board', '[e.g. 300 GSM art board]'], ['Printing', '[e.g. offset / digital, foil options]'], ['Card sizes', '[Available sizes]'], ['Minimum order', '[e.g. 100 cards]'], ['Turnaround', '[Delivery time]']]
    },
    p6: {
      intro: 'A classic frame for portraits, prints and certificates, ready to hang or stand.',
      options: [
        { label: 'Size', kind: 'chips', values: ['6 x 8 in', '8 x 10 in', '12 x 16 in'] },
        { label: 'Finish', kind: 'chips', values: ['Wooden', 'Black', 'Golden'] }
      ],
      textLabel: 'Notes (optional)', textPlaceholder: 'e.g. need printing of my photo too', textHint: 'Up to 30 characters.', textMax: 30,
      desc: 'Simple, sturdy photo frames. We can also print and fit your photo or certificate so it arrives ready to display.',
      specs: [['Frame material', '[e.g. wood / MDF]'], ['Glass', '[e.g. clear glass / acrylic]'], ['Sizes', '6 x 8, 8 x 10, 12 x 16 in (others on request)'], ['Minimum order', '[e.g. 1 piece]']]
    },
    p7: {
      intro: 'Letterheads, envelopes, bill books and more — everything a shop, school or office needs to look professional.',
      options: [
        { label: 'Item', kind: 'chips', values: ['Letterhead', 'Envelope', 'Bill / Invoice book', 'Visiting card'] },
        { label: 'Paper', kind: 'chips', values: ['Standard', 'Premium'] }
      ],
      textLabel: 'Business name', textPlaceholder: 'e.g. Sharma Traders', textHint: 'Up to 30 characters — send your logo on WhatsApp.', textMax: 30,
      desc: 'Branded stationery for your business. Send your logo and details; we design the layout, share a preview and print in the quantity you need.',
      specs: [['Items', 'Letterheads, envelopes, bill books, visiting cards'], ['Paper', '[e.g. 100 GSM / 300 GSM]'], ['Printing', '[e.g. single / multi colour]'], ['Minimum order', '[e.g. 100 pieces]'], ['Turnaround', '[Delivery time]']]
    },
    p8: {
      intro: 'Mementos and trophies for awards, farewells, corporate events and school functions.',
      options: [
        { label: 'Material', kind: 'chips', values: ['Acrylic', 'Wooden', 'Metal finish'] },
        { label: 'Occasion', kind: 'chips', values: ['Award', 'Farewell', 'Corporate', 'School / College'] }
      ],
      textLabel: 'Name & message to engrave / print', textPlaceholder: 'e.g. Best Teacher 2026', textHint: 'Up to 30 characters.', textMax: 30,
      desc: 'A memento people keep for years. Tell us the occasion and the text, and we make one or many with matching design.',
      specs: [['Material', '[e.g. acrylic / wood / metal finish]'], ['Printing / engraving', '[e.g. UV print / laser]'], ['Sizes', '[Available sizes]'], ['Minimum order', '[e.g. 1 piece]'], ['Turnaround', '[Delivery time]']]
    }
  };

  RC.COLORS = COLORS;
  RC.DETAILS = DETAILS;
})();
