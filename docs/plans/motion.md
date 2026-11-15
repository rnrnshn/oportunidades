# Plan: transitions, animations and hover effects (public site)

Status: **done** (approved and built 2026-11-15). Videos for review: `../review/motion/` (outside the repo).

## Decisions (product owner)

| Topic | Decision |
|---|---|
| Intensity | Subtle, Linear-like. Nothing moves unless the user acts. No scroll reveals, no page transitions. |
| Card hover | Lift 2px + soft shadow; image zooms 3% inside its frame. |
| Delivery | Plan first, then build. |

## Rules (from `.claude/skills/ui-skills` and `AGENTS.md` §12.1)

- Move things with `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left`, `margin` or `padding`.
- Colour transitions are allowed only on small controls (buttons, links, fields, menu items, icons).
- Interaction feedback: **150ms**. Entrances (menus, dialogs): **200ms**. Exits: **150ms**. Nothing longer.
- Easing: Tailwind defaults only — `ease-out` for entrances and hover, `ease-in` for exits. No custom curves.
- `prefers-reduced-motion: reduce` → all transitions and animations become instant (one global rule).
- No `will-change`, no blur or backdrop-filter animation, no glow, no looping animation (except the existing loading pulse).
- Hover styles apply only on devices that can hover. Tailwind v4 `hover:` already uses `@media (hover: hover)`, so a tap on a phone does not leave a card "lifted".
- No new library. `tw-animate-css` is already installed; `motion/react` is not needed.

## Today

| Area | Now |
|---|---|
| Hover states | 139 `hover:` classes, only 40 elements have a `transition` → most hovers snap |
| Cards (6 types) | Mixed: 5 add a shadow, 1 (ArticleCard) also lifts; durations 200ms/300ms/default |
| Buttons | `transition-all` (animates every property, including layout) |
| Popover menus | Fade + zoom 95% in and out (tw-animate-css) — keep |
| Header mega-menu, mobile menu | Appear instantly |
| Dialogs (login, sign-up, report, alert) | Appear and disappear instantly |
| Filter sections (`<details>`) | Chevron rotates on some; content appears instantly |
| Reduced motion | Not handled |

## Spec per component

| Component | Hover | Press | Enter | Exit |
|---|---|---|---|---|
| Button (all variants) | Background/colour, 150ms ease-out | `translate-y-px` | — | — |
| Text links, nav links | Colour, 150ms | — | — | — |
| Menu and list items (nav, dropdown options, filter rows) | Background, 150ms | — | — | — |
| Fields | Border colour, 150ms (already) | — | — | — |
| Chevrons (selects, `<details>`, nav) | — | — | Rotate 180°, 200ms ease-out | Same, reversed |
| **Cards** (Scholarship, Course, Opportunity, University, Article, Mentor) | `-translate-y-0.5` + `shadow-md`, 200ms ease-out; image `scale-[1.03]` inside `overflow-hidden` | Back to rest (`active:translate-y-0`) | — | — |
| Bookmark button | Colour, 150ms; icon fill changes on toggle | — | — | — |
| Popover menus (selects, sort, hero type) | — | — | Fade + zoom-in-95, 200ms (already; set duration) | Fade + zoom-out-95, 150ms |
| Header mega-menu | — | — | Fade + slide-in-from-top-1, 200ms | Instant |
| Mobile menu | — | — | Fade + slide-in-from-top-2, 200ms | Instant |
| Dialog overlay | — | — | Fade, 200ms | Fade, 150ms |
| Dialog panel | — | — | Fade + zoom-in-95, 200ms ease-out | Fade + zoom-out-95, 150ms ease-in |
| Filter `<details>` content | — | — | Fade-in, 150ms (no height animation) | Instant |
| Status messages ("Dados guardados.", alert created, form sent) | — | — | Fade-in, 150ms | — |

Dialog exit needs the panel to stay mounted for 150ms after `open` becomes false. The shared `Dialog` (`src/components/ui/dialog.tsx`) gets a `closing` state that unmounts on `animationend`. Focus return and scroll lock stay as they are.

## Implementation

1. `src/styles.css`: global reduced-motion rule; comment with the durations above.
2. `src/components/ui/card.tsx`: export `interactiveCardClass` (lift, shadow, image zoom via `group`). Apply it to the 6 card components and remove their own hover/transition classes.
3. `src/components/ui/button.tsx`: `transition-all` → `transition-colors duration-150 ease-out` + `active:translate-y-px` (needs `transform` in the transition list).
4. Sweep: every element with a `hover:` colour change gets `transition-colors duration-150` (scripted, then reviewed per file).
5. `dialog.tsx`, `Header.tsx` (mega-menu, mobile menu), `filter-disclosure.tsx`, `popover.tsx`: enter/exit animations from the table.
6. `AGENTS.md` §12.3 Motion: the rules and table, short form.

## Verification

- Script: list elements with `hover:` but no `transition` → must be 0.
- Playwright, per card type: computed `transform` and `box-shadow` at rest and on hover; layout does not move (`getBoundingClientRect` of neighbours unchanged).
- Playwright: every `transition-duration` and `animation-duration` on the page ≤ 200ms.
- Playwright with `reducedMotion: 'reduce'`: durations ≈ 0.
- Short screen recordings (WebM) of: card hover, dialog open/close, mega-menu, mobile menu, filter section — for review.
- `tsc`, `pnpm build`, and the existing size/contrast/125% audit still pass.
- Commit per step; no push.

## Out of scope

Scroll-triggered reveals, page/route transitions, staggered lists, parallax, animated counters, hover effects on non-interactive elements.
