# Trimboli Finance — Website

Built by [Validate and Innovate](https://www.validateinnovate.com.au).

---

## Stack
- Vanilla HTML5 / CSS3 / JS — no frameworks, no build step
- Hosted on **Vercel** (free tier)
- Forms via **Formspree** (endpoint: `xzdaqgjd`)

## Folder structure
```
/trimboli-finance
├── index.html
├── vercel.json          ← security headers, cache rules
├── robots.txt
├── sitemap.xml
├── README.md
├── /assets
│   ├── /css
│   │   ├── tokens.css   ← ALL brand values — edit here to rebrand
│   │   ├── base.css     ← reset, typography
│   │   ├── components.css ← buttons, nav, modal, footer
│   │   └── layout.css   ← hero, services, process, about, etc.
│   ├── /js
│   │   └── main.js
│   └── /images
│       ├── /webp        ← WebP versions (primary)
│       └── /fallback    ← PNG/JPG fallbacks
└── /pages
    ├── privacy-policy.html
    ├── terms-of-use.html
    └── credit-guide.html
```

## Local development
Open `index.html` in VS Code + Live Server extension (right-click → Open with Live Server).
Handles the relative CSS paths correctly — opening the file directly in a browser will not.

## Deployment
Drag the `trimboli-finance` folder to [vercel.com/new](https://vercel.com/new).
Done. Live in ~30 seconds.

## Before going live — image assets needed
Drop these files into the correct folders and uncomment the `<picture>` blocks in `index.html`:

| File | Location | Used in |
|------|----------|---------|
| `logo.webp` | `/assets/images/webp/` | Nav, footer (WebP version of logo) |
| `rocky-caricature.webp` | `/assets/images/webp/` | About section |
| `rocky-caricature.png` | `/assets/images/fallback/` | About section fallback |
| `bank-logos.webp` | `/assets/images/webp/` | Lender panel section |
| `bank-logos.png` | `/assets/images/fallback/` | Lender panel fallback |
| `og-image.webp` | `/assets/images/webp/` | Social share image |
| `favicon.png` | `/assets/images/fallback/` | Browser tab |
| `apple-touch-icon.png` | `/assets/images/fallback/` | iOS home screen |

## Design tokens
All brand variables are in `/assets/css/tokens.css`.
To change any colour, font, or spacing: **edit tokens.css only**.

Key values:
- Navy: `#0d1f2d`
- Gold accent: `#c9a84c`
- Cream bg: `#f5f0e8`
- Heading font: Playfair Display
- Body font: DM Sans

## Forms
Both forms (modal callback + contact section) post to Formspree `xzdaqgjd`.
View submissions at [formspree.io](https://formspree.io) → Forms → xzdaqgjd.

## Compliance notes
- Credit Representative Number: **478816**
- ABN: **96 849 943 641**
- MFAA member — update accreditation badges if membership status changes
- Credit guide is a legal requirement — keep `/pages/credit-guide.html` current
