# PulsePuzzle Assets

Central folder for all static assets used across the site. Drop your own images, icons, and illustrations here.

## Structure

```
public/assets/
├── icons/            # SVG icons (cart, check, shipping, heart, search, menu, arrow-right, close, plus, minus)
├── images/           # General product & marketing images
│   └── products/     # Product photography (pulsepuzzle-hero, pulsepuzzle-side, pulsepuzzle-chambers)
└── illustrations/    # Empty-state & decorative illustrations
```

## Usage

Images:
```tsx
import Image from "next/image";
<Image src="/assets/images/products/pulsepuzzle-hero.svg" alt="..." fill priority />
```

Icons (inline SVGs or as ``):
```tsx
<img src="/assets/icons/cart.svg" alt="Cart" width="24" height="24" />
```

## Replacing placeholders

Replace the placeholder SVGs in `public/assets/images/products/` with your own product photos (JPG/WebP/PNG) and update the filenames in `lib/products.ts` if you change the names.
