# Route Transition System

This project uses a production-grade page transition system based on Framer Motion and Next.js App Router.

## Design System Spec

- Duration: `300ms` (allowed variance ±50ms)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Properties: `transform`, `opacity` only
- Hinting: `will-change: transform, opacity`
- Synchronization: all page-level animations complete simultaneously

## Components

- `components/RouteTransition.js` wraps the page content and animates on route changes.
- Variants supported: `fade-slide` (default) and `fade-scale`.
- Duration is configurable: `duration={0.35}` (seconds).

## Usage

In `app/layout.js`:

```jsx
import RouteTransition from "../components/RouteTransition";

<main className="container mx-auto px-4 py-10">
  <RouteTransition duration={0.35} type="fade-slide">
    {children}
  </RouteTransition>
</main>
```

## Behavior

- Detects forward/back navigation via `window.history.state.idx` and adjusts slide direction.
- Uses transform/opacity-only animations for 60fps.
- Respects `prefers-reduced-motion` and disables effects when requested.
- No layout shift: container is relatively positioned and animations do not change layout.
- Graceful fallback: with JavaScript disabled, content renders without animation.

## Accessibility

- The wrapper uses `role="region"` and `aria-live="polite"` to announce content updates.
- Links and buttons retain default focus behavior; transitions do not interfere.

## Configuration

- Duration range: 300ms default (±50ms where needed).
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Variant types can be extended with additional motion patterns.

## Notes

- Scroll restoration: Next.js preserves scroll on back/forward; transitions do not override this.
- Async content: `AnimatePresence` with `mode="wait"` ensures exit completes before enter.
 
## Performance Targets

- First Contentful Paint < 1s
- Cumulative Layout Shift < 0.1
- Total Blocking Time < 200ms

See `components/PerfMonitor.js` for dev-time monitors and `lib/rafDebounce.js` for RAF-based debouncing helpers.