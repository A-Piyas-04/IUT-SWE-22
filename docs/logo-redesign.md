# Logo Redesign — Crete Round, Cyan, Glitch

## Goals
- Use a distinctive typeface (Crete Round) with proper kerning and readability.
- Apply a single cyan color (`#00FFFF`) consistently across the logo.
- Remove decorative dots and any surrounding box/border.
- Add a tasteful glitch effect that triggers randomly every 2–5s for 0.3–0.5s, with horizontal and vertical displacements that maintain readability.
- Keep the logo vector-based and scalable across devices.

## Implementation
- Component: `components/CyberLogo/CyberLogo.js`
  - Loads `Crete_Round` via `next/font/google` for reliable SSR and FOUT-free rendering.
  - SVG uses pure `<text>` elements with `fontFamily: 'Crete Round', serif` and fill `#00FFFF`.
  - All prior baseline line and three dots were removed.
  - No wrapper box or border; the container is transparent.

- Glitch Effect
  - Random scheduling is implemented in React via `useEffect`, toggling a CSS class.
  - Interval: randomly selected 2–5 seconds; Duration: randomly selected 300–500ms.
  - The CSS animation (`glitchXY`) applies small X/Y displacements to preserve legibility.
  - Respects `prefers-reduced-motion: reduce` by disabling scheduling and animations.

- Assets
  - Editable SVG: `public/logo/creta-logo.svg` (includes title and comments).
  - Optimized SVG: `public/logo/creta-logo.optimized.svg` (minimal markup; production-ready).

## Accessibility & Performance
- Color contrast: Cyan `#00FFFF` on dark backgrounds meets WCAG AA for text of this size.
- Motion: Reduced motion respected via media query and JS guard.
- Performance: Only transform-based animation; random scheduling avoids constant GPU use.

## Maintenance Notes
- Font changes: Adjust `Crete_Round` weights or swap typeface by editing `components/CyberLogo/CyberLogo.js`.
- Animation tuning: Edit `glitchXY` keyframes in `components/CyberLogo/CyberLogo.module.css` and the timing logic in the component.
- Vector-first: Keep SVG text or convert to paths for full font independence if required by the distribution channel.

## Version Control
- All changes were implemented via structured patches for easy review.
- Suggested commit structure:
  - feat(logo): switch to Crete Round, cyan-only, remove dots/boxes
  - feat(logo): add randomized glitch effect with reduced-motion support
  - feat(routine): increase box height by 20% with proportional content scaling
  - docs(logo): add redesign documentation and assets