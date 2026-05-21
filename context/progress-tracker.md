# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 04: Project Dialogs & Editor Home (complete)

## Completed

- Feature 01: Design System — shadcn/ui (Tailwind v4) initialized, Button/Card/Dialog/Input/Tabs/Textarea/ScrollArea added to `components/ui/`, lucide-react installed, `lib/utils.ts` cn() helper created, dark-only theme wired in `globals.css`.
- Feature 02: Editor Chrome — `components/editor/editor-navbar.tsx` (fixed navbar, sidebar toggle with PanelLeftOpen/PanelLeftClose) and `components/editor/project-sidebar.tsx` (floating overlay, slides in from left, Projects header, My Projects/Shared tabs with empty states, New Project button). Dialog pattern ready via existing `components/ui/dialog.tsx` wired to design tokens.
- Feature 03: Auth — `@clerk/ui` installed; `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars added; `proxy.ts` at root using `clerkMiddleware` + `createRouteMatcher` (all routes protected except `/sign-in` and `/sign-up`); `ClerkProvider` with `dark` theme from `@clerk/ui/themes` and CSS-variable-based appearance overrides wraps root layout; two-panel sign-in/sign-up pages at `app/(auth)/sign-in/[[...sign-in]]/` and `app/(auth)/sign-up/[[...sign-up]]/`; root `/` redirects authenticated users to `/editor`, unauthenticated to `/sign-in`; `app/editor/page.tsx` wires existing EditorNavbar + ProjectSidebar; `UserButton` added to EditorNavbar right section.
- Feature 04: Project Dialogs & Editor Home — `lib/slugify.ts` (slug generation), `lib/mock-projects.ts` (mock data with owned/shared projects), `hooks/use-project-dialogs.ts` (dialog/form/loading state + mock CRUD), `components/editor/create-project-dialog.tsx` (name input + live slug preview), `components/editor/rename-project-dialog.tsx` (prefilled input, auto-focus, Enter submits), `components/editor/delete-project-dialog.tsx` (destructive confirm only); `ProjectSidebar` updated with project items, hover-reveal rename/delete actions for owned projects, mobile backdrop scrim; `app/editor/page.tsx` updated with editor home content and all dialogs wired.

## In Progress

- None.

## Next Up

- Feature 05 (TBD from feature-specs)


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
