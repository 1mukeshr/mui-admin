# MUI Admin

MUI-based operations console for users, catalog, orders, and reports — built as a portfolio-ready React admin template. Data stays in the browser (`localStorage`); no backend required for the demo.

**Author:** Mukesh Rawat · showcase / interview project

> **GitHub:** https://github.com/1mukeshr/mui-admin  
> **Live demo:** https://mui-admin-seven.vercel.app

## Why this project

Hiring managers can evaluate:

- End-to-end product thinking (front marketing + authenticated console)
- Access control (roles + permission matrix + route guards)
- Dense UI craft (dashboards, lists, forms, system states, theme customizer)
- Power-user UX (**Ctrl/⌘ K** command palette)
- Bulk actions on users (select → deactivate / delete)

## Run locally

```bash
npm install
npm run dev
```

## Deploy (Vercel) — ~5 minutes

1. Push this repo to GitHub  
2. [vercel.com/new](https://vercel.com/new) → import the repo  
3. Framework: **Vite** (auto). Build: `npm run build`, output: `dist`  
4. Deploy → copy the URL into the **Live demo** line above  

SPA routing is covered by `vercel.json`.

Optional CLI:

```bash
npm i -g vercel
vercel
```

## Demo script (2 minutes)

1. Open `/login` → **Super Admin** (`admin@demo.com` / `Admin@123`)  
2. Dashboard → note stat cards + charts  
3. Press **Ctrl+K** (Mac **⌘K**) → jump to Orders / a user  
4. **Users** → select rows → **Deactivate** or **Delete** bulk bar  
5. Open floating **palette** (right edge) → change color / menu  
6. Logout → login as **Viewer** → show limited nav / no edits  

## Screenshots

Add three images under `docs/` (or root) and link them here:

| Shot | File | What to capture |
| --- | --- | --- |
| 1 | `docs/landing.png` | Landing hero |
| 2 | `docs/dashboard.png` | Overview dashboard |
| 3 | `docs/command-palette.png` | Ctrl+K open |

```md
![Landing](docs/landing.png)
![Dashboard](docs/dashboard.png)
![Command palette](docs/command-palette.png)
```

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Super Admin | admin@demo.com | Admin@123 |
| Admin | priya@demo.com | Admin@123 |
| Viewer | viewer@demo.com | Viewer@123 |

Roles: **Super Admin**, **Admin**, **Viewer**. Obsolete manager/staff sessions remap on load.

## Stack

- React 19 + Vite
- Material UI 6 + Emotion
- React Router 7
- Recharts
- Semantic HTML + CSS design tokens (hybrid MUI + custom shell)

## Architecture (demo)

```
Front pages (public)     Auth (guest)          Console (protected)
Landing / Pricing /  →   Login / Register  →   DashboardLayout
Payment / Checkout /     Forgot / Reset        RoleGuard + modules
Help
         └──────── localStorage seed + contexts ────────┘
```

- `AuthContext` — session, users, permission checks  
- `AppDataContext` — customers, products, orders, roles  
- `ThemeModeContext` — light/dark + template customizer  
- `NAV_GROUPS` — permission-aware sidebar / command palette  

## Included modules

- Auth, RBAC, settings
- Dashboards: overview, CRM, ecommerce, analytics
- Users (with bulk actions), customers, products, categories, orders
- Reports (CSV / PDF), notifications, chat
- UI kit: forms, tables, FAQ, tabs, icons, popups
- System states: 404 / 403 / 500 / loading / empty / error
- Template customizer (logged-in floating control)

## Interview talking points

1. **RBAC** — permission keys drive nav, routes, and search results  
2. **Command palette** — keyboard-first navigation over pages + entities  
3. **Bulk actions** — multi-select with guarded deletes (super admin protected)  
4. **Theme customizer** — skin, color, menu, navbar without rebuild  
5. **Honest scope** — intentional browser demo; next step would be API + React Query + tests  

## License

Private portfolio project unless you decide otherwise.
