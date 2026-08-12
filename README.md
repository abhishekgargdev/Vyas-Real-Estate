# Vyas Real Estate

A modern real estate web application built with Next.js. Vyas Real Estate provides a public marketing site, broker dashboard, customer portal, and authentication screens — all powered by static UI and dummy data (no backend required).

## Overview

This project is a **UI-only** front-end showcase for a premium real estate brand. It demonstrates property discovery, broker workflow management, and customer self-service flows using realistic layouts, interactions, and sample data.

**Key characteristics:**

- No API calls, database, or authentication backend
- All content comes from static files in `src/data/`
- Forms, buttons, and dialogs show toast feedback instead of persisting data
- Designed for portfolio demos, design reviews, and future backend integration

## Features

### Public site
- Home page with hero search and featured listings
- Property listings with filters (grid and list views)
- Property detail pages with gallery, amenities, and visit scheduling
- About and Contact pages

### Broker dashboard
- Dashboard with KPIs, charts, and recent leads
- Property management and add-property form
- Client CRM with kanban and table views
- Visit calendar
- Revenue tracking and transaction history
- Settings (profile, team, notifications, and more)

### Customer portal
- Personal dashboard with enquiries and saved properties
- Saved properties shortlist
- Visit history and upcoming appointments

### Authentication (UI only)
- Login and signup pages (no real auth)

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Base UI) |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Fonts | Inter (body), Playfair Display (headings) |

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Routes

| Area | Path | Description |
|------|------|-------------|
| Public | `/` | Home |
| Public | `/about` | About Vyas Real Estate |
| Public | `/listings` | Property listings |
| Public | `/properties/[id]` | Property detail |
| Public | `/contact` | Contact form |
| Auth | `/login` | Login (UI only) |
| Auth | `/signup` | Sign up (UI only) |
| Broker | `/dashboard` | Broker overview |
| Broker | `/properties` | Manage properties |
| Broker | `/properties/new` | Add property |
| Broker | `/clients` | Client CRM |
| Broker | `/visit-calendar` | Visit scheduling |
| Broker | `/revenue` | Revenue and transactions |
| Broker | `/settings` | Account settings |
| Customer | `/portal` | Customer dashboard |
| Customer | `/saved` | Saved properties |
| Customer | `/visits` | Visit history |

## Project structure

```
src/
├── app/
│   ├── (public)/          # Marketing pages
│   ├── (auth)/            # Login & signup
│   ├── (broker)/          # Broker dashboard
│   ├── (customer)/        # Customer portal
│   ├── globals.css        # Design tokens & utilities
│   ├── layout.tsx         # Root layout & metadata
│   ├── icon.svg           # Favicon
│   └── apple-icon.svg     # Apple touch icon
├── components/
│   ├── ui/                # shadcn primitives
│   ├── shared/            # Navbar, Footer, PageHeader
│   ├── public/            # Public-page components
│   ├── broker/            # Dashboard components
│   └── customer/          # Portal components
├── data/                  # Static dummy data
├── lib/                   # Utilities, navigation, status styles
└── types/                 # Shared TypeScript types
```

## Design system

Brand colors and typography are centralized in `src/app/globals.css`:

- **Navy** (`--primary`) — headers, navigation, primary actions
- **Gold** (`--accent`) — CTAs, highlights, accents
- **Off-white** (`--background` / `--surface`) — page backgrounds

Utility classes (`.page-title`, `.section-title`, `.surface-card`, etc.) keep spacing, headings, and card styles consistent across public, broker, and customer areas.

## Data

Dummy data lives in `src/data/`:

- `properties.ts` — listings and property details
- `clients.ts` — broker CRM clients
- `visits.ts` — scheduled visits
- `revenue.ts` — transactions and charts
- `customer.ts` — sample customer profile and enquiries

To add or edit content, update these files and the corresponding types in `src/types/`.

## License

Private project. All rights reserved.
