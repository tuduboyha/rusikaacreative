/* Rusikaa Creative — shared product data (used by index + product pages) */
window.RC = (function () {
  var TINTS = [
    { tint: '#FFE1EE', ink: '#B0005A', shadow: '#E60070' },
    { tint: '#E3F0FD', ink: '#0659AE', shadow: '#0878E8' },
    { tint: '#EEE7FA', ink: '#5A26A8', shadow: '#7137C8' },
    { tint: '#FFF0DA', ink: '#8A4300', shadow: '#FF8A00' },
    { tint: '#E2F4E9', ink: '#0B6A32', shadow: '#159447' }
  ];
  var ROTS = ['-6deg', '5deg', '-3deg', '7deg', '-5deg', '4deg', '-7deg', '3deg'];

  var CATS = {
    gifts: 'Personalized Gifts', tshirts: 'Custom T-Shirts', covers: 'Phone Covers',
    frames: 'Photo Frames', led: 'LED Photo Frames', acrylic: 'Acrylic Prints',
    decor: 'Wall Art & Home Decor', wedding: 'Wedding Invitations', stationery: 'Business Stationery',
    idcards: 'ID Cards & Badges', awards: 'Certificates & Awards', merch: 'Printed Merchandise'
  };

  // ---------- Products (sample data — edit names here) ----------
  // newRank = newest order, popRank = popularity, priceRank = cheap (1) to costly
  var PRODUCTS = [
    { id: 'p1', name: 'Custom Printed T-Shirt', short: 'T-Shirt', kind: 'tshirt', cat: 'tshirts', custom: true, newRank: 1, popRank: 2, priceRank: 4 },
    { id: 'p2', name: 'Personalized Photo Phone Cover', short: 'Phone Cover', kind: 'cover', cat: 'covers', custom: true, newRank: 2, popRank: 1, priceRank: 3 },
    { id: 'p3', name: 'LED Photo Frame', short: 'LED Frame', kind: 'led', cat: 'led', custom: true, newRank: 3, popRank: 3, priceRank: 8 },
    { id: 'p4', name: 'Acrylic Photo Print', short: 'Acrylic Print', kind: 'acrylic', cat: 'acrylic', custom: true, newRank: 4, popRank: 5, priceRank: 7 },
    { id: 'p5', name: 'Wedding Invitation Card', short: 'Invitation', kind: 'invite', cat: 'wedding', custom: true, newRank: 5, popRank: 4, priceRank: 1 },
    { id: 'p6', name: 'Classic Wooden Photo Frame', short: 'Photo Frame', kind: 'frame', cat: 'frames', custom: false, newRank: 6, popRank: 6, priceRank: 5 },
    { id: 'p7', name: 'Business Letterhead Set', short: 'Letterhead', kind: 'letter', cat: 'stationery', custom: true, newRank: 7, popRank: 8, priceRank: 2 },
    { id: 'p8', name: 'Event Memento', short: 'Memento', kind: 'memento', cat: 'awards', custom: true, newRank: 8, popRank: 7, priceRank: 6 }
  ];

  // Product illustrations (replace with <img> tags once you have real photos)
  var ART = {
    tshirt: '<path d="M52 22 L28 34 L16 62 L36 70 L40 60 L40 140 L120 140 L120 60 L124 70 L144 62 L132 34 L108 22 C102 34 92 40 80 40 C68 40 58 34 52 22 Z" fill="#FFFFFF" stroke="#06285F" stroke-width="3" stroke-linejoin="round"/><path d="M60 84 C70 70 92 70 102 84" stroke="#E60070" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M58 104 C76 94 90 98 104 104" stroke="#FF8A00" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="98" cy="68" r="6" fill="#7137C8"/>',
    cover: '<rect x="50" y="14" width="60" height="132" rx="14" fill="#7137C8" stroke="#06285F" stroke-width="3"/><rect x="58" y="22" width="22" height="30" rx="7" fill="#06285F"/><circle cx="69" cy="31" r="4" fill="#3B4A68"/><circle cx="69" cy="44" r="4" fill="#3B4A68"/><circle cx="92" cy="92" r="13" fill="#FF8A00"/><path d="M51 128 L74 102 L90 118 L109 98 L109 132 C109 140 104 145 96 145 L64 145 C56 145 51 140 51 132 Z" fill="#E60070"/>',
    led: '<rect x="16" y="20" width="128" height="120" rx="10" fill="none" stroke="#FF8A00" stroke-width="5" opacity=".6"/><rect x="24" y="28" width="112" height="104" rx="6" fill="#06285F"/><rect x="34" y="38" width="92" height="84" rx="2" fill="#FFF1DF"/><path d="M80 108 C60 94 52 84 52 74 C52 64 64 58 72 64 L80 70 L88 64 C96 58 108 64 108 74 C108 84 100 94 80 108 Z" fill="#E60070"/><path d="M8 12l6 6M152 12l-6 6M8 148l6-6M152 148l-6-6" stroke="#FF8A00" stroke-width="4" stroke-linecap="round"/>',
    acrylic: '<rect x="26" y="30" width="108" height="96" rx="6" fill="#E3F0FD" stroke="#06285F" stroke-width="3"/><circle cx="104" cy="56" r="10" fill="#FF8A00"/><path d="M27.5 112 L62 72 L86 96 L104 80 L132.5 108 L132.5 120 C132.5 123 130 124.5 128 124.5 L32 124.5 C29.5 124.5 27.5 123 27.5 120 Z" fill="#159447"/><path d="M38 42 L58 42 M38 50 L48 50" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>',
    invite: '<rect x="20" y="64" width="120" height="76" rx="4" fill="#B0005A"/><rect x="40" y="20" width="80" height="96" rx="3" fill="#FFFFFF" stroke="#06285F" stroke-width="3"/><circle cx="80" cy="50" r="15" fill="none" stroke="#FF8A00" stroke-width="4"/><path d="M80 42 l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#E60070"/><path d="M58 78 H102 M64 90 H96" stroke="#06285F" stroke-width="4" stroke-linecap="round"/><path d="M20 84 L80 120 L140 84 L140 136 C140 138 138 140 136 140 L24 140 C22 140 20 138 20 136 Z" fill="#E60070"/>',
    frame: '<rect x="24" y="24" width="112" height="112" rx="4" fill="#A0622D" stroke="#06285F" stroke-width="3"/><rect x="38" y="38" width="84" height="84" fill="#FFE1EE"/><circle cx="64" cy="64" r="11" fill="#FF8A00"/><path d="M38 122 L38 104 L66 84 L90 102 L122 78 L122 122 Z" fill="#7137C8"/>',
    letter: '<rect x="34" y="16" width="92" height="128" rx="4" fill="#FFFFFF" stroke="#06285F" stroke-width="3"/><path d="M35.5 20 C35.5 18.5 36.5 17.5 38 17.5 L122 17.5 C123.5 17.5 124.5 18.5 124.5 20 L124.5 38 L35.5 38 Z" fill="#0878E8"/><circle cx="50" cy="28" r="6" fill="#FFFFFF"/><path d="M62 28 H96" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/><path d="M48 58 H112 M48 72 H112 M48 86 H100 M48 100 H108" stroke="#C9D3E3" stroke-width="5" stroke-linecap="round"/><path d="M82 124 C90 114 98 134 112 120" stroke="#E60070" stroke-width="3" fill="none" stroke-linecap="round"/>',
    memento: '<path d="M52 34 H36 C36 54 44 62 54 64 M108 34 H124 C124 54 116 62 106 64" fill="none" stroke="#06285F" stroke-width="4" stroke-linecap="round"/><path d="M52 24 H108 V60 C108 78 96 90 80 90 C64 90 52 78 52 60 Z" fill="#FF8A00" stroke="#06285F" stroke-width="3"/><path d="M80 40 l5 10 11 1-8 7 3 11-11-6-11 6 3-11-8-7 11-1z" fill="#FFFFFF"/><rect x="72" y="90" width="16" height="18" fill="#FF8A00" stroke="#06285F" stroke-width="3"/><rect x="50" y="108" width="60" height="28" rx="3" fill="#06285F"/><path d="M62 122 H98" stroke="#FFC066" stroke-width="4" stroke-linecap="round"/>'
  };
  // Product photos: drop images/p1.jpg … images/p8.jpg — missing files fall back to the illustration
  PRODUCTS.forEach(function (p) { p.img = 'images/' + p.id + '.jpg'; });

  // Services (same six groups as the homepage). cats = related category pages.
  var SERVICES = [
    { id: 'printing', n: '01', name: 'Printing & Event Stationery', bg: '#E60070', ink: '#FFFFFF', tint: '#FFE1EE',
      desc: 'Cards and prints for every occasion — from weddings to shop openings.',
      items: ['Flex & Banner Printing', 'Wedding Invitation Cards', 'Naming Ceremony Cards', 'Shradh Cards', 'Invitation Cards', 'Pamphlets & Flyers'],
      cats: ['wedding', 'merch'] },
    { id: 'apparel', n: '02', name: 'Custom Apparel & Merchandise', bg: '#0659AE', ink: '#FFFFFF', tint: '#E3F0FD',
      desc: 'Your photo, name or logo printed on things you use every day.',
      items: ['T-Shirt Printing', 'Customized Phone Cover Printing', 'School & College Uniform Badges'],
      cats: ['tshirts', 'covers', 'idcards'] },
    { id: 'branding', n: '03', name: 'Corporate & Business Branding', bg: '#FF8A00', ink: '#06285F', tint: '#FFF0DA',
      desc: 'Everything a shop, school or office needs to look professional.',
      items: ['Letterheads & Envelopes', 'Bill Books & Invoice Books', 'Rubber Stamps', 'Sticker Printing', 'ID Card Printing', 'Mementos', 'Program Badges', 'Certificates'],
      cats: ['stationery', 'idcards', 'awards', 'merch'] },
    { id: 'frames', n: '04', name: 'Photo Frames & Premium Art', bg: '#7137C8', ink: '#FFFFFF', tint: '#EEE7FA',
      desc: 'Turn your favourite photos into keepsakes that last.',
      items: ['Normal Photo Frames', 'LED Photo Frames', '3D Printing', 'Resin Art Printing', 'Acrylic Printing'],
      cats: ['frames', 'led', 'acrylic'] },
    { id: 'signage', n: '05', name: 'Signage & Wall Decor', bg: '#0E7A3A', ink: '#FFFFFF', tint: '#E2F4E9',
      desc: 'Boards that get your shop noticed and walls that tell a story.',
      items: ['Backlit Printing', 'Custom Wallpapers & Wall Decals', 'Vinyl Sign Boards', 'Glow Sign Boards'],
      cats: ['decor'] },
    { id: 'institutional', n: '06', name: 'Institutional & Utility Services', bg: '#06285F', ink: '#FFFFFF', tint: '#F0F2F7',
      desc: 'Neat, durable finishing for students, schools and offices.',
      items: ['Project & Thesis Binding', 'Lamination of Cards & Documents'],
      cats: ['idcards'] }
  ];

  return { TINTS: TINTS, ROTS: ROTS, CATS: CATS, PRODUCTS: PRODUCTS, ART: ART, SERVICES: SERVICES };
})();
