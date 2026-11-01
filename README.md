# Aravindh & Karthiga — Modern Parallax Wedding Invitation

An interactive, modern, editorial wedding invitation website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, pre-configured for **Static Site Generation (`output: 'export'`)**.

---

## 💍 Design Direction & Theme

- **Theme:** Modern Romantic / Elegant Wedding
- **Aesthetic:** Minimalist, editorial typography, generous luxury whitespace, soft ivory (`#FAF7F2`), champagne gold (`#C5A059`), warm sand, and muted floral blush accents.
- **Typography:** Refined serif headings (`Cormorant Garamond`, `Playfair Display`), flowing script accents (`Great Vibes`), and clean sans-serif body (`Plus Jakarta Sans`).

---

## 🏛️ Page Structure & Interactive Features

1. **Full-Screen Parallax Hero**
   - Editorial typography displaying **Aravindh & Karthiga**
   - Main tagline: *"Two Hearts... One Journey..."*
   - Supporting text: *"With the blessings of our loved ones."*
   - Layered parallax background with soft golden lighting
   - Animated floral divider & interactive scroll indicator
   - Optional music toggle with clear play/pause control & visualizer

2. **Wedding Countdown**
   - Live JavaScript countdown to **15 November 2026, 8:00 AM (IST)** (`Asia/Kolkata`)
   - Animated flip cards for Days, Hours, Minutes, and Seconds
   - Dynamic wedding-day celebration banner when countdown reaches zero

3. **Couple Introduction**
   - Symmetrical editorial two-column layout
   - **Groom**: Aravindh (*Son of Manikandan & Selvamary*)
   - **Bride**: Karthiga (*Daughter of Balamurugan & Chitra*)
   - Connecting central golden heart emblem and monogram frames

4. **Wedding Events Itinerary**
   - **Engagement Ceremony**: Saturday, 14th November 2026, 7:00 PM onwards
   - **Wedding Ceremony (Muhurtham)**: Sunday, 15th November 2026, 8:00 AM – 9:15 AM
   - Individual visual identities (rings & temple finial motifs)
   - One-click **Google Calendar** button + **Download .ICS** button

5. **Interactive Masonry Gallery**
   - **Dynamic JSON rendering**: Powered by `src/data/galleryData.ts` (no hardcoded images)
   - **Fisher-Yates Shuffle Algorithm**: Automatically randomizes photo order on initial page load
   - Filter by categories: *All, Couple, Moments, Celebration, Ceremony*
   - **Fullscreen Interactive Lightbox**: Next / Previous buttons, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), and image counter

6. **Wedding Location & Directions**
   - **Venue**: Aaryan Thirumana Mahal
   - **Address**: `1/237, Alagar Kovil Main Road, Janki Nagar, Kathakinaru, Madurai, Tamil Nadu 625104`
   - Responsive embedded Google Map
   - **Get Directions** button linking to live Google Maps navigation
   - **Copy Address** button with instant feedback toast

7. **Footer — Romantic Poetry**
   - Original romantic closing poem:
     > *"Two souls, two dreams, one beautiful beginning.*  
     > *A thousand memories waiting to unfold.*  
     > *With love in our hearts and blessings around us,*  
     > *We begin forever, together."*
   - Couple signature, date tag, and *"Made with Love"* badge

8. **Ambient Micro-Interactions**
   - 60fps HTML5 Canvas particle system (delicate rose petals, jasmine florets, champagne gold dust)
   - Desktop champagne cursor with trailing glow (disabled on touch)
   - Top champagne gold scroll progress vine
   - Smooth Lenis inertial scrolling

---

## 📁 Architecture & File Structure

```text
ak-wedding-invitation/
├── src/
│   ├── app/
│   │   ├── globals.css         # Custom editorial grain, gradients, scrollbars
│   │   ├── layout.tsx          # Google Fonts & Open Graph metadata
│   │   └── page.tsx            # Main page assembling all sections & Lenis
│   ├── components/
│   │   ├── hero/
│   │   │   └── HeroSection.tsx
│   │   ├── countdown/
│   │   │   └── CountdownSection.tsx
│   │   ├── couple/
│   │   │   └── CoupleSection.tsx
│   │   ├── events/
│   │   │   └── EventsSection.tsx
│   │   ├── gallery/
│   │   │   ├── GallerySection.tsx   # Fisher-Yates shuffle & masonry layout
│   │   │   └── GalleryLightbox.tsx  # Fullscreen modal with next/prev navigation
│   │   ├── location/
│   │   │   └── LocationSection.tsx
│   │   ├── footer/
│   │   │   └── FooterSection.tsx
│   │   └── ui/
│   │       ├── AudioPlayer.tsx      # Floating audio controller + Web Audio synth
│   │       ├── CustomCursor.tsx     # Desktop refined gold cursor
│   │       ├── FloatingPetals.tsx   # 60fps canvas particles
│   │       ├── FloralDivider.tsx    # Filigree floral & heart ornaments
│   │       ├── MonogramBadge.tsx    # Elegant A & K monogram
│   │       └── ScrollProgress.tsx   # Top scroll completion line
│   └── data/
│       ├── weddingData.ts      # Central configuration for names, dates, parents, venue, poem
│       └── galleryData.ts      # JSON array of gallery items with shuffle utility
├── next.config.mjs             # Configured for static export (output: 'export')
├── tailwind.config.ts          # Custom editorial palette & typography
└── tsconfig.json
```

---

## 🛠️ How to Customize

1. **Wedding Details**:
   Edit [`src/data/weddingData.ts`](file:///g:/Development/ak-wedding-invitation/src/data/weddingData.ts) to update names, dates, parents, venue, or calendar links.

2. **Gallery Photos**:
   Edit [`src/data/galleryData.ts`](file:///g:/Development/ak-wedding-invitation/src/data/galleryData.ts). Simply add your photo files to `/public/images/gallery/` and set their `src` path in the JSON array.

3. **Background Music**:
   Drop your preferred wedding instrumental mp3 at `/public/audio/wedding-ambient.mp3`. If no file is provided, the website includes an ambient Web Audio drone synth that plays automatically.

---

## 🚀 Running & Deploying

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Build Static Site (Generates `/out` folder)
```bash
npm run build
```
The static HTML/CSS/JS export in `out/` is ready to deploy directly to **Vercel**, **Netlify**, **GitHub Pages**, or **Cloudflare Pages**.
