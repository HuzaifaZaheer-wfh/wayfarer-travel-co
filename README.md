# WAYFARER Travel Co.

A premium, production-quality **boutique travel agency website** built with Next.js, featuring curated journeys to the world's most beautiful destinations — Santorini, Bali, Kyoto, the Swiss Alps, and Dubai.

> All booking flows, search results, testimonials, and contact confirmations are **demo content**. No backend, payment processor, or external booking API is connected.

## Overview

WAYFARER Travel Co. is an editorial travel brand offering four core services — **Visa Assistance**, **Flight Reservations**, **Hotel Booking**, and **Car Rental** — wrapped in a refined, warm-ivory design language. The site presents a floating multi-tab travel search panel, animated statistics, destination cards, and an accessible, validated contact experience.

## Technology Stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 13 (App Router)                  |
| Language       | TypeScript                               |
| UI Library     | React 18                                 |
| Styling        | Tailwind CSS + tailwindcss-animate       |
| Components     | shadcn/ui (Radix UI primitives)          |
| Animation      | GSAP + GSAP ScrollTrigger                |
| Icons          | Lucide React                             |
| Photography    | Pexels (license-free, hot-linked)        |

## Features

- **Multi-page App Router architecture** — five dedicated routes, each a complete page:
  - `/` — Home: hero, search panel, services preview, destinations preview, why-choose-us, testimonials, contact
  - `/destinations` — full destination catalogue with image cards and trip details
  - `/services` — service cards, plus the interactive travel search panel and a CTA band
  - `/about` — agency story, animated statistics, trust highlights, testimonials
  - `/contact` — contact form with validation and demo success confirmation
- **Responsive navigation** — sticky, blur-on-scroll header with active-route highlighting and a full-screen mobile menu
- **Hero** with a full-bleed destination image, staggered GSAP entrance, and a floating search panel
- **Travel search panel** with four functional tabs (Visa, Flights, Hotels, Cars):
  - Per-tab input fields with tailored validation
  - Mock search results with a loading state and an editable result view
- **Services** — four professional cards with icons, feature lists, and CTA links
- **Popular Destinations** — Santorini, Bali, Kyoto, Swiss Alps, Dubai as image cards with ratings, pricing, and tags (one featured large card)
- **Why Choose Us** — GSAP count-up statistics, trust highlights, and a forest-toned trust panel
- **Testimonials** — clearly labelled sample/demo testimonials with star ratings
- **Contact** — accessible form (name, email, phone, service select, message) with full frontend validation and a demo success confirmation
- **Footer** — brand, navigation, services, contact details, social links, and copyright
- **GSAP animations** with `ScrollTrigger` for hero entrance, scroll reveals, animated counters, and card hover micro-interactions
- **Reduced-motion support** — all animations gracefully degrade when `prefers-reduced-motion: reduce` is set
- **Mobile-first responsive design** across mobile, tablet, and desktop

## Folder Structure

```
project/
├── app/
│   ├── globals.css          # Tailwind layers + WAYFARER theme tokens
│   ├── layout.tsx           # Root layout, fonts (Cormorant + Inter), metadata
│   ├── page.tsx             # / — Home (full landing)
│   ├── destinations/page.tsx  # /destinations
│   ├── services/page.tsx      # /services
│   ├── about/page.tsx         # /about
│   └── contact/page.tsx       # /contact
├── components/
│   ├── ui/                  # shadcn/ui primitives (Button, Input, Tabs, Select…)
│   ├── site/                # WAYFARER section + page components
│   │   ├── SiteShell.tsx      # Shared nav + footer wrapper, scroll-to-top
│   │   ├── Navigation.tsx     # Route-aware nav with active states
│   │   ├── PageHeader.tsx     # Reusable subpage hero header
│   │   ├── Hero.tsx
│   │   ├── SearchPanel.tsx    # 4-tab travel search with validation + mock results
│   │   ├── SearchPanelSection.tsx  # Search panel wrapped in a section
│   │   ├── Services.tsx
│   │   ├── Destinations.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── AboutStory.tsx     # Editorial agency story for /about
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── CtaBand.tsx        # Reusable call-to-action band
│   │   └── Footer.tsx
│   └── Logo.tsx             # Brand mark + wordmark
├── hooks/
│   ├── use-gsap.ts          # GSAP hooks: scroll reveal, hero intro, count-up
│   └── use-toast.ts
├── lib/
│   ├── data.ts              # Typed site data (nav, services, destinations, stats…)
│   ├── validation.ts        # Reusable form validation helpers
│   └── utils.ts             # cn() class merge helper
├── tailwind.config.ts       # WAYFARER color palette + font + shadow tokens
├── next.config.js
└── package.json
```

## Design System

| Token        | Value     | Usage                                |
| ------------ | --------- | ------------------------------------ |
| Ivory        | `#F4F1E9` | Page background                      |
| Deep Forest  | `#183D3B` | Headings, dark sections, primary     |
| Terracotta   | `#D87952` | Accents, CTAs, hover states          |
| Golden Sand  | `#E4B95F` | Highlights, star ratings, eyebrow    |
| Serif font   | Cormorant Garamond | Headings                     |
| Sans font    | Inter              | Body text                    |

## Installation & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open the site
#    http://localhost:3000
```

### Other scripts

```bash
npm run build       # Production build
npm run start       # Start the production server
npm run typecheck   # TypeScript type checking (tsc --noEmit)
npm run lint        # ESLint
```

## Notes

- Photography is served from Pexels CDN URLs and is license-free for editorial use.
- All testimonial content is sample/demo content and is labelled as such on the page.
- The contact form and travel search are frontend-only; submissions produce demo confirmations and never transmit data.

© WAYFARER Travel Co.
