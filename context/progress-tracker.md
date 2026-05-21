# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Auth (complete)

## Current Goal

- Feature 04 (TBD from feature-specs).

## Completed

- Feature 01: Design System — shadcn/ui (Tailwind v4) initialized, Button/Card/Dialog/Input/Tabs/Textarea/ScrollArea added to `components/ui/`, lucide-react installed, `lib/utils.ts` cn() helper created, dark-only theme wired in `globals.css`.
- Feature 02: Editor Chrome — `components/editor/editor-navbar.tsx` (fixed navbar, sidebar toggle with PanelLeftOpen/PanelLeftClose) and `components/editor/project-sidebar.tsx` (floating overlay, slides in from left, Projects header, My Projects/Shared tabs with empty states, New Project button). Dialog pattern ready via existing `components/ui/dialog.tsx` wired to design tokens.
- Feature 03: Auth — `@clerk/ui` installed; `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars added; `proxy.ts` at root using `clerkMiddleware` + `createRouteMatcher` (all routes protected except `/sign-in` and `/sign-up`); `ClerkProvider` with `dark` theme from `@clerk/ui/themes` and CSS-variable-based appearance overrides wraps root layout; two-panel sign-in/sign-up pages at `app/(auth)/sign-in/[[...sign-in]]/` and `app/(auth)/sign-up/[[...sign-up]]/`; root `/` redirects authenticated users to `/editor`, unauthenticated to `/sign-in`; `app/editor/page.tsx` wires existing EditorNavbar + ProjectSidebar; `UserButton` added to EditorNavbar right section.

## In Progress

- None.

## Next Up

- Feature 04 (TBD from feature-specs)


## Open Questions

- None yet.

## Architecture Decisions

- shadcn/ui on Tailwind v4 — CSS variables defined in globals.css via `@theme inline`; no tailwind.config.js.
- Dark-only theme: no light mode. All shadcn CSS variable mappings set to dark values directly (no `.dark` class toggle needed).
- Auth uses Clerk v7 with Next.js 16 `proxy.ts` convention (renamed from `middleware.ts`). Clerk appearance uses `theme` key (not deprecated `baseTheme`) from `@clerk/ui/themes`.

## Session Notes

- Next.js 16.2.6, React 19.2.4, Tailwind v4 (`@tailwindcss/postcss`).
- shadcn components live in `components/ui/` — do not modify after generation.
- Theme colors defined in `context/ui-context.md`, implemented as CSS custom properties in `globals.css`.
- Node.js 12 is the system default but Next.js 16 requires Node 18+. Use `nvm use 20` before running `npm run build`.
