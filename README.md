# Rusikaa Creative

Website for Rusikaa Creative — printing, personalised gifts and custom products, near EGL Chowk, Sarjamda, Jamshedpur.

Plain HTML, CSS and JavaScript (no build step). Orders and enquiries go to WhatsApp.

## Pages
`index.html` (home), `product.html?id=p1…p8`, `category.html?cat=…`, `services.html`, `how-it-works.html`, `search.html`, `contact.html`, `faq.html`, `testimonials.html`, `privacy.html`, `terms.html`, `shipping.html`, `404.html`.

## Run locally
```
python -m http.server 8123
```
then open http://localhost:8123

## Editing
- Products and services: `js/data.js`; per-product options: `js/product.js`
- FAQ: `js/faq.js`; reviews: `js/testimonials.js`
- Product photos: `images/p1.jpg` … `p8.jpg` (see `images/README.txt`)
- Placeholders still to fill in: prices (`[PRICE]`), shop timings, delivery and refund rules (highlighted `[…]` text on the Terms and Shipping pages)
