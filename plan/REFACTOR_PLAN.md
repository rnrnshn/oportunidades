# Oportunidades Refactor & Architecture Plan

Last updated: 2025-11-18

## Goals

1. Align the codebase with a scalable architecture for TanStack Start + Supabase.
2. Normalize UI and styling using the shared design system (shadcn + Tailwind tokens).
3. Unlock SSR-ready data flows so every page can be hydrated from Supabase without duplication.
4. Ensure developer experience (DX) with clear boundaries, testing strategy, and automation.

## Guiding Principles

- **Feature modularity**: group routes, server functions, and UI pieces by domain (e.g., `opportunities`, `universities`, `account`).
- **UI primitives first**: all visual elements leverage shadcn components or documented tokens—no one-off Tailwind color/radius.
- **Data contracts**: define typed API hooks and server loaders that mirror Supabase policies to avoid duplicated SQL.
- **SSR friendly**: every route exports a loader that feeds TanStack Query caches; client hooks only use cached data.
- **Progressive enhancement**: forms and mutating actions have server functions with optimistic UI fallbacks.

## Refactor Phases

### Phase 1 – Foundation (Week 1)
- [ ] **Folder realignment**
  - Create `src/features/{feature}` folders containing `routes`, `components`, `api`, `types`.
  - Move shared UI to `src/components/ui` and layout pieces to `src/components/layout`.
- [ ] **Design tokens enforcement**
  - Replace remaining hard-coded colors with `var(--brand-*)` tokens.
  - Add lint rule or codemod check for Tailwind classes outside the palette.
- [ ] **Storybook or preview playground**
  - Add a simple component gallery route to preview shadcn components with project tokens.

### Phase 2 – Data Layer (Week 2-3)
- [ ] **Supabase service module**
  - Create `src/lib/supabase.server.ts` exporting typed clients, Row Level Security helpers, and error mappers.
- [ ] **Loader & mutation patterns**
  - Each feature exports `loader.ts` + `actions.ts` that wrap Supabase queries/mutations.
  - Introduce Zod schemas for request validation (e.g., account update, saved opportunities).
- [ ] **Centralized caching**
  - Configure TanStack Query defaults (stale times, retries) in one provider.
  - Add suspense boundaries or skeletons around every loader-driven section.

### Phase 3 – Feature Hardening (Week 4-5)
- [ ] **Universities module**
  - Move `/universities/$slug` data into `src/features/universities`.
  - Add reusable components (`UniversitySummary`, `ProgramList`, `FeeTable`, `ScholarshipCard`).
- [ ] **Accounts module**
  - Build profile form using `react-hook-form` + Zod for validation.
  - Wire to Supabase auth updates and synchronize saved preferences.
- [ ] **Home/About reuse**
  - Extract hero, stats, and CTA blocks into `src/features/marketing`.
  - Power stats from real metrics tables or a CMS endpoint.

### Phase 4 – Automation & Testing (Week 6)
- [ ] **Testing strategy**
  - Unit: UI components (Vitest + Testing Library).
  - Integration: server functions with Supabase test database.
  - E2E: Playwright smoke tests for core flows (home, login, view university).
- [ ] **CI/CD**
  - Add GitHub Actions pipeline: lint → test → build.
  - Preview deploys (Vercel) for every PR branch.

## Best Practices Checklist

- **Component boundaries**: prefer `features/<domain>/components` that consume primitive UI only.
- **Styling**: no `rounded-*` beyond `rounded-md`; colors must use palette tokens.
- **Accessibility**: verify headless shadcn components have ARIA labels, focus styles.
- **Performance**: use `ImagePlaceholder` only during development; replace with `<img loading="lazy">`.
- **Content sourcing**: longform copy (About, University detail) should come from CMS JSON or Supabase tables, not hardcoded.
- **Internationalization**: keep copy in `src/locales` (future step) to support Portuguese/English.

## Open Questions

1. Where will the CMS live (Supabase table, external API)? Required before dynamic about/university content.
2. What auth providers will be enabled (email, phone, OAuth)? Impacts account refactor.
3. Are we storing user avatars in Supabase Storage or an external CDN?

## Next Actions

1. Approve folder structure proposal and create tracking tickets for Phase 1 tasks.
2. Set up Supabase CLI and generate typed queries to avoid manual SQL strings.
3. Identify metrics required for the homepage stats and model them in the database.
