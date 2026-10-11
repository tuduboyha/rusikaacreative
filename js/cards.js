/* =========================================================
   Rusikaa Creative — shared cards (category + search pages)
   Exposes RC.cards: INFO, icon, productsIn, catCard, productCard
   ========================================================= */
(function () {
  'use strict';

  var RC = window.RC;
  var WA = 'https://wa.me/917870140750?text=';

  var INFO = {
    gifts: { n: '01', bg: '#FFE1EE', icon: '#E60070', iconInk: '#FFFFFF', shadow: '#9E004D', ink: '#B0005A',
      desc: 'Name, photo or message on gifts for every occasion — birthdays, anniversaries, farewells and festivals.',
      makes: ['Customized Phone Covers', 'Printed T-Shirts', 'LED Photo Frames', 'Acrylic Prints'],
      svg: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M12 8C10 4 6 4 7 7c.6 1.5 5 1 5 1s4.4.5 5-1c1-3-3-3-5 1"/>' },
    tshirts: { n: '02', bg: '#E3F0FD', icon: '#0866C4', iconInk: '#FFFFFF', shadow: '#064A8E', ink: '#0659AE',
      desc: 'Printed tees for individuals, teams, schools and events — your name, photo or logo on a comfortable T-shirt.',
      makes: ['T-Shirt Printing', 'School & College Uniform Badges'],
      svg: '<path d="M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3c-1 2-2 3-4 3S9 5 8 3z"/>' },
    covers: { n: '03', bg: '#EEE7FA', icon: '#7137C8', iconInk: '#FFFFFF', shadow: '#4E2391', ink: '#5A26A8',
      desc: 'Your photo or design printed on a phone cover made for your exact phone model.',
      makes: ['Customized Phone Cover Printing'],
      svg: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><circle cx="12" cy="6.5" r="1.4"/>' },
    frames: { n: '04', bg: '#FFF0DA', icon: '#FF8A00', iconInk: '#06285F', shadow: '#C46A00', ink: '#8A4300',
      desc: 'Classic frames for prints, portraits and certificates — we can print and fit your photo too.',
      makes: ['Normal Photo Frames'],
      svg: '<rect x="3" y="3" width="18" height="18" rx="1"/><rect x="7" y="7" width="10" height="10"/>' },
    led: { n: '05', bg: '#06285F', icon: '#FFC066', iconInk: '#06285F', shadow: '#FFC066', ink: '#FFC066', dark: true,
      desc: 'Glowing backlit frames that light up your memories — a gift that stands out on any shelf or desk.',
      makes: ['LED Photo Frames'],
      svg: '<rect x="5" y="5" width="14" height="14" rx="1"/><rect x="8.5" y="8.5" width="7" height="7"/><path d="M12 1v2M12 21v2M1 12h2M21 12h2"/>' },
    acrylic: { n: '06', bg: '#E2F4E9', icon: '#0E7A3A', iconInk: '#FFFFFF', shadow: '#0A5A2A', ink: '#0B6A32',
      desc: 'Sharp, glossy photo prints on clear acrylic — vivid colour and a premium finish for walls and gifts.',
      makes: ['Acrylic Printing', 'Resin Art Printing'],
      svg: '<path d="M12 2l9 10-9 10-9-10z"/><path d="M3 12h18"/>' },
    decor: { n: '07', bg: '#FFE1EE', icon: '#E60070', iconInk: '#FFFFFF', shadow: '#9E004D', ink: '#B0005A',
      desc: 'Wallpapers, decals and art that make homes and shops look like yours.',
      makes: ['Custom Wallpapers & Wall Decals', 'Backlit Printing', 'Vinyl Sign Boards', 'Glow Sign Boards'],
      svg: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 17l5-5 4 4 3-3 6 6"/><circle cx="16" cy="9" r="1.8"/>' },
    wedding: { n: '08', bg: '#FFF0DA', icon: '#FF8A00', iconInk: '#06285F', shadow: '#C46A00', ink: '#8A4300',
      desc: 'Invitation cards designed and printed to your taste, for weddings and every other function.',
      makes: ['Wedding Invitation Cards', 'Naming Ceremony Cards', 'Shradh Cards', 'Invitation Cards'],
      svg: '<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="M10 6l2-3 2 3"/>' },
    stationery: { n: '09', bg: '#E3F0FD', icon: '#0866C4', iconInk: '#FFFFFF', shadow: '#064A8E', ink: '#0659AE',
      desc: 'Letterheads, bill books, envelopes and stamps — everything a shop, school or office needs to look professional.',
      makes: ['Letterheads & Envelopes', 'Bill Books & Invoice Books', 'Rubber Stamps', 'Pamphlets & Flyers'],
      svg: '<path d="M5 3h10l4 4v14H5z"/><path d="M15 3v4h4M8 12h8M8 16h5"/>' },
    idcards: { n: '10', bg: '#EEE7FA', icon: '#7137C8', iconInk: '#FFFFFF', shadow: '#4E2391', ink: '#5A26A8',
      desc: 'ID cards, program badges and uniform badges for schools, colleges, offices and events.',
      makes: ['ID Card Printing', 'Program Badges', 'School & College Uniform Badges', 'Lamination of Cards & Documents'],
      svg: '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.2"/><path d="M6 17c.8-1.6 5.2-1.6 6 0M14 11h4M14 14h3M10 6V3h4v3"/>' },
    awards: { n: '11', bg: '#E2F4E9', icon: '#0E7A3A', iconInk: '#FFFFFF', shadow: '#0A5A2A', ink: '#0B6A32',
      desc: 'Certificates and mementos for schools, offices and events — a keepsake people hold on to.',
      makes: ['Mementos', 'Certificates'],
      svg: '<circle cx="12" cy="15" r="5"/><path d="M8 3l4 7 4-7M12 13v4"/>' },
    merch: { n: '12', bg: '#E60070', icon: '#FFFFFF', iconInk: '#E60070', shadow: '#9E004D', ink: '#FFFFFF', dark: true,
      desc: 'Stickers and branded items that put your business name in people\'s hands.',
      makes: ['Sticker Printing', 'Pamphlets & Flyers', 'Flex & Banner Printing'],
      svg: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>' }
  };

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function productsIn(k) { return RC.PRODUCTS.filter(function (p) { return p.cat === k; }); }
  function icon(k, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + INFO[k].svg + '</svg>';
  }
  var WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 19z"/></svg>';

  // ---------- Category cards (used for "other categories" / overview) ----------
  function catCard(k) {
    var c = INFO[k], n = productsIn(k).length;
    var fg = c.dark ? '#FFFFFF' : '#06285F', sub = c.dark ? (k === 'merch' ? '#FFFFFF' : '#D9E2F2') : '#3B4A68';
    return '<a href="category.html?cat=' + k + '" class="rc-card rc-ccard" style="text-decoration: none; color: ' + fg + '; position: relative; overflow: hidden; background: ' + c.bg + '; border-radius: 26px; padding: 22px; display: flex; flex-direction: column; gap: 8px; min-height: 190px">' +
      '<span style="width: 56px; height: 56px; border-radius: 18px; background: ' + c.icon + '; color: ' + c.iconInk + '; display: flex; align-items: center; justify-content: center; transform: rotate(-6deg); box-shadow: 0 5px 0 ' + c.shadow + '">' + icon(k, 28) + '</span>' +
      '<span style="font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-weight: 800; font-size: 20px; margin-top: 6px">' + esc(RC.CATS[k]) + '</span>' +
      '<span style="font-size: 14px; line-height: 1.45; color: ' + sub + '; flex: 1">' + (n ? n + (n === 1 ? ' product' : ' products') : 'Made to order') + '</span>' +
      '<span style="font-weight: 700; font-size: 14px; color: ' + c.ink + '">Explore →</span></a>';
  }

  // ---------- Product card ----------
  function productCard(p) {
    var i = RC.PRODUCTS.indexOf(p), t = RC.TINTS[i % RC.TINTS.length];
    return '<article class="rc-card rc-pcard" style="background: #FFFFFF; border: 2px solid #06285F; border-radius: 26px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 6px 6px 0 ' + t.shadow + '">' +
      '<a href="product.html?id=' + p.id + '" aria-label="' + esc(p.name) + '" class="rc-pcard-img" style="position: relative; display: flex; align-items: center; justify-content: center; height: 230px; background: ' + t.tint + '; border-bottom: 2px solid #06285F">' +
        '<span style="width: 62%; transform: rotate(' + RC.ROTS[i % RC.ROTS.length] + ')"><svg viewBox="0 0 160 160" width="100%" aria-hidden="true">' + RC.ART[p.kind] + '</svg></span>' +
        '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover">' +
        '<span style="position: absolute; top: 14px; left: 14px; padding: 5px 11px; border-radius: 999px; background: #FFFFFF; border: 2px solid #06285F; font-size: 12px; font-weight: 800">Made to order</span>' +
      '</a>' +
      '<div class="rc-pcard-body" style="padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 6px; flex: 1">' +
        '<h3 style="margin: 0; font-family: \'Bricolage Grotesque\', system-ui, sans-serif; font-size: 20px; font-weight: 800; line-height: 1.2"><a href="product.html?id=' + p.id + '" style="color: #06285F; text-decoration: none">' + esc(p.name) + '</a></h3>' +
        '<div style="display: flex; align-items: baseline; gap: 8px"><span style="font-size: 21px; font-weight: 800">₹ [PRICE]</span><span style="font-size: 13px; color: #6B7891; text-decoration: line-through">₹ [MRP]</span></div>' +
        '<div class="rc-pcard-actions" style="display: flex; gap: 8px; margin-top: auto; padding-top: 14px">' +
          '<a href="' + WA + encodeURIComponent('Hi Rusikaa Creative, I want to enquire about: ' + p.name) + '" target="_blank" rel="noopener" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 48px; border-radius: 999px; background: #0E7A3A; color: #FFFFFF; font-size: 15px; font-weight: 800; text-decoration: none; box-shadow: 0 5px 0 #0A5A2A">' + WA_ICON + 'Enquire</a>' +
          '<a href="product.html?id=' + p.id + '" style="display: inline-flex; align-items: center; justify-content: center; height: 48px; padding: 0 16px; border-radius: 999px; background: #FFE1EE; color: #B0005A; font-size: 15px; font-weight: 800; text-decoration: none">Details</a>' +
        '</div></div></article>';
  }


  RC.cards = { INFO: INFO, icon: icon, productsIn: productsIn, catCard: catCard, productCard: productCard, WA_ICON: WA_ICON };
})();
