# Project Rules — Vyas Real Estate

- Framework: Next.js App Router + TypeScript + Tailwind + shadcn/ui.
- This is UI-ONLY. No backend, no real API calls, no database. Use static dummy data from 
  src/data/*.ts files.
- Source material: `figma_desgin/` contains Figma-exported React (Vite-style) code — App.tsx, 
  main.tsx, index.css, and pages/components using React Router conventions. This folder is 
  REFERENCE ONLY. Never import from it directly in the final app. Convert its JSX/logic into 
  proper Next.js files under src/app and src/components, then once a page is confirmed working, 
  you may delete the migrated source file from figma_desgin/.
- Do NOT bring over React Router's <Routes>/<Route>/useNavigate — replace with Next.js file-based 
  routing (app/ folders + page.tsx) and next/link / next/navigation.
- Do NOT bring over figma_desgin/App.tsx, main.tsx, or index.css directly — Next.js already has 
  src/app/layout.tsx and src/app/globals.css for that role. Merge relevant styles/fonts into 
  globals.css instead of keeping a separate file.
- Reuse existing shadcn components from src/components/ui — do not recreate button, card, table, etc.
- Keep design tokens (colors, fonts, spacing) centralized in globals.css / tailwind config — 
  never hardcode hex colors inside page components.
- Folder conventions:
  - src/app/(public)/...        → Home, About, Listings, Property Detail, Contact
  - src/app/(auth)/...          → Login, Signup
  - src/app/(broker)/...        → Dashboard, Properties, Clients, Visits, Revenue, Settings
  - src/app/(customer)/...      → Portal, Saved, Visits
  - src/components/shared/      → Navbar, Footer, shared UI not tied to one role
  - src/components/public/      → components only used on public pages
  - src/components/broker/      → components only used on broker dashboard
  - src/components/customer/    → components only used on customer portal
  - src/data/                   → dummy data files (properties.ts, clients.ts, visits.ts, etc.)
  - src/types/                  → shared TypeScript types/interfaces
- After migrating each page, verify it renders with no console/type errors before moving to the next.