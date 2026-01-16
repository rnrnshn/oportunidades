# AGENTS.md - Project Context & Best Practices

This document provides context, standards, and best practices for AI agents and developers working on the `oportunidades` project.

## 1. Technology Stack

*   **Core**: React 19, TypeScript
*   **Build Tool**: Vite 7
*   **Routing**: TanStack Router (File-based routing in `src/routes`)
*   **Data Fetching**: TanStack Query
*   **Server/SSR**: TanStack Start / Nitro
*   **Styling**: TailwindCSS v4
*   **Validation**: Zod
*   **Forms**: React Hook Form

## 2. Component Architecture

*   **File Structure**:
    *   Place reusable UI components in `src/components/ui`.
    *   Feature-specific components should live near their routes if possible, or in `src/components` if shared.
*   **Size Limit**: Aim for components under **250 lines**. If a file grows larger, break it down into smaller sub-components.
*   **Exports**: Use **Named Exports** (e.g., `export function MyComponent`) instead of default exports to ensure consistent naming.
*   **Pattern**: Follow patterns similar to **shadcn/ui**.
    *   Use composition over configuration.
    *   Keep components accessible and flexible.
*   **Props**: Define prop types explicitly using interfaces or types.

## 3. Coding Standards

*   **TypeScript**: Strict mode is enabled. No `any`. Use strict typing for all props and state.
*   **Imports**: Use absolute imports with the `@/` alias for `src` (e.g., `importButton from "@/components/ui/button"`).
*   **Validation**: Use **Zod** for schema validation, especially for API responses and form inputs.
*   **Control Flow**: Prefer **Early Returns** to avoid deep nesting.
*   **Naming**:
    *   Components: PascalCase (e.g., `UserProfile.tsx`)
    *   Functions/Variables: camelCase
    *   Constants: UPPER_SNAKE_CASE

## 4. Performance

*   **Code Splitting**: TanStack Router handles route-based code splitting automatically. Use `React.lazy` for heavy components below the fold if necessary.
*   **Images**:
    *   Always specify `width` and `height` attributes to prevent layout shifts (CLS).
    *   Use modern formats (WebP/AVIF) where possible.
    *   Lazy load images that are not in the viewport.
*   **Data Fetching**:
    *   Leverage **TanStack Query** for caching and background updates.
    *   Avoid waterfall requests; prefetch data where appropriate (e.g., in route loaders).

## 5. SEO & Accessibility

*   **Semantic HTML**: Use correct tags (`<header>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<nav>`) to provide structure.
*   **Meta Tags**: Ensure every route has appropriate title and description metatags.
*   **Accessibility (a11y)**:
    *   Ensure all interactive elements are keyboard accessible.
    *   Use proper `aria-*` attributes when semantic HTML is insufficient.
    *   Ensure sufficissent color contrast.
    *   All `img` tags must have a meaningful `alt` attribute.

## 6. Project Structure

*   `src/routes`: File-based routing definitions. `__root.tsx` is the root layout.
*   `src/components`: Shared components.
*   `src/utils`: Helper functions and utilities.
*   `src/lib`: Configuration and third-party library setups.

## 7. Environment & Configuration

*   **Node Version**: Specify exact version (e.g., Node 20.x LTS).
*   **Package Manager**: pnpm / npm / yarn (pick one).
*   **Environment Variables**:
    *   Use `.env` and `.env.local`.
    *   Never commit secrets.
*   **Runtime Targets**:
    *   Client
    *   Server (Nitro)
*   **Feature Flags** (if any): Describe how they are toggled.

## 8. Data Layer Conventions

*   **API Location**: All API calls live in `src/lib/api`.
*   **Query Keys**:
    *   Must be defined as constants.
    *   Use hierarchical keys: ['opportunities', 'list']
*   **Error Handling**:
    *   Normalize API errors.
    *   UI components must not handle raw API responses.
*   **Mutation Rules**:
    *   Always invalidate related queries.

## 9. State Management Guidelines

*   **Server State** → TanStack Query
*   **URL State** → Router search params
*   **Form State** → React Hook Form
*   **UI State** (modals, toggles) → Local component state
*   Avoid global client state unless strictly necessary.

## 10. Routing Guidelines

*   Use file-based routes exclusively.
*   Prefer route loaders for data fetching.
*   Avoid fetching data inside deeply nested components.
*   Redirect logic must live in route files, not components.

## 11. UI States

Every data-driven view must handle:
*   Loading state
*   Error state
*   Empty state

Use shared components from `src/components/ui` where possible.

## 12. Styling Guidelines

*   Use Tailwind utility classes only (no inline styles).
*   Use design tokens (spacing, colors, font sizes) consistently.
*   Avoid arbitrary values unless necessary.
*   Dark mode support: clarify if required.

## 13. Testing

*   Unit tests for utilities.
*   Component tests for complex UI.
*   Prefer testing behavior over implementation.
*   Avoid snapshot-only tests.

## 14. Git Conventions

*   Use conventional commits:
    *   feat:
    *   fix:
    *   refactor:
    *   chore:
*   One feature per commit.
*   No unrelated changes in the same commit.

## 15. AI Agent Rules

*   Do not introduce new libraries without approval.
*   Do not refactor unrelated code.
*   Preserve existing behavior unless explicitly instructed.
*   Prefer small, incremental chsanges.
*   Ask before making architectural changes.

## 16. Feature-Based Separation (UI vs Hooks vs API)

* Feature code lives in `src/features/<featureName>/...`.

* **Presentational components** → `src/features/<feature>/components`
  * Props in → UI out.
  * No TanStack Query usage here.
  * No API calls here.

* **Hooks (feature logic)** → `src/features/<feature>/hooks`
  * Owns TanStack Query calls, derived state, handlers, side effects.
  * Returns a “view-model” object for UI components.
  * Avoid returning raw API responses if transformation is needed.

* **API clients / server calls** → `src/features/<feature>/api`
  * Fetchers only (no React).
  * Keep request/response typing strict.
  * Validate responses with Zod schemas from `schemas/`.

* **Route files** (`src/routes/**`)
  * Keep thin: assemble feature pieces.
  * Call feature hooks and render feature components.

