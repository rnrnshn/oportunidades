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
    *   Ensure sufficient color contrast.
    *   All `img` tags must have a meaningful `alt` attribute.

## 6. Project Structure

*   `src/routes`: File-based routing definitions. `__root.tsx` is the root layout.
*   `src/components`: Shared components.
*   `src/utils`: Helper functions and utilities.
*   `src/lib`: Configuration and third-party library setups.
