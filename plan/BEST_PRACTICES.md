# React Project Best Practices

Last updated: 2025-11-18

## Code Style

- **Line length**: 100 characters max per line; break props across lines when necessary.
- **File length**: aim for <250 lines. Extract subcomponents/helpers when a file grows beyond this.
- **Imports**: group by type (3rd party → internal features → shared components → styles). Use absolute aliases (`@/features/...`) to avoid relative path hell.
- **Type safety**: prefer explicit types for function props/hooks. Avoid `any`; use `zod` schemas for runtime validation.

## Component Structure

- **Folder by feature**: `src/features/<domain>` contains `components/`, `routes/`, `api/`, `types/`.
- **Public/shared UI**: keep primitive shadcn components in `src/components/ui`. Higher-level layout pieces (Header, Footer) live in `src/components`.
- **Naming**: use `PascalCase` for components and `camelCase` for helper functions. Subcomponents should have clear prefixes (e.g., `AccountForm`, `AccountCTA`).
- **Props**: create `type Props = { ... }` near component definition; pass minimal props down the tree.
- **State**: prefer hooks (React or custom) over local component state balloons. If a component holds more than 3 separate state slices, consider extracting a hook.

## Hooks/Utilities

- **Custom hooks**: place in `src/hooks`. Prefix with `use` and document expected behavior. Hooks should coordinate state/effects, not render JSX.
- **Utilities**: keep shared helpers in `src/lib`. Group by domain (e.g., `supabase.ts`, `formatters.ts`). Avoid dumping everything into a single `utils.ts`.
- **Side effects**: wrap asynchronous logic in hooks or `useEffect` with proper dependency arrays; no async logic directly inside render.

## Styling & Tokens

- Use Tailwind classes + the project tokens defined in `src/styles.css`. No raw hex values or arbitrary radii beyond `rounded-md`.
- Create utility classes in `styles.css` (e.g., `.text-brand`, `.bg-soft`) for repeated combinations.
- For complex layouts, extract CSS (using Tailwind’s `@layer components`) rather than verbose class strings in JSX.

## Forms & Validation

- Standardize on `react-hook-form` + `zod`. Each form gets a schema, resolver, and typed `FormValues`.
- Show inline errors via helper components (`Field` wrapper) and keep submit handlers in feature-specific action files.
- Keep form components pure; data fetching/mutations should live in feature hooks or server functions.

## Data & API

- Use feature-level data modules (e.g., `features/universities/api.ts`) to wrap Supabase calls. Expose typed loaders/actions.
- Centralize Supabase client setup in `src/lib/supabase.server.ts`. No direct `createClient` in components.
- Cache data with TanStack Query; define default options (stale time, retries) in the provider within `src/router.tsx` or the corresponding context.

## Testing & QA

- Unit tests for components/hooks sit alongside the feature (`component.test.tsx`). Use Vitest + Testing Library.
- Integration tests for server actions or Supabase calls live under `features/<domain>/__tests__/`.
- Add smoke E2E tests (Playwright) for critical flows (home, login, account update once ready).

## Accessibility & UX

- All interactive elements require accessible labels. Buttons triggering dialogs should use the `button` element, not `div`.
- Dialogs/modals must trap focus and close via ESC/backdrop (current custom dialog handles overlay click + close button; extend if needed).
- Ensure keyboard navigation works for all forms; no reliance on hover-only cues.

## Git & Workflow

- Feature branches per ticket (`feat/account-form`). Avoid mixing UI + backend changes unless the ticket requires it.
- Commit in logical chunks (component creation, data wiring, styling tweaks). Keep messages imperative (`Add signup modal`).
- Run `pnpm run build` locally before opening PRs to guarantee SSR/client bundles compile.

## Documentation

- Each feature should have a short README or Notion entry describing routes, data dependencies, and pending tasks.
- Update `plan/BEST_PRACTICES.md` as conventions evolve; treat it as living documentation referenced in onboarding.
