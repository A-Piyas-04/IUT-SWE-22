# Logo Redesign — Audiowide, Cyan Neon, Intense Purple Glitch

## Goals
- Use a distinctive geometric typeface (Audiowide) with proper kerning and readability.
- Apply a single cyan color (`#00FFFF`) consistently across the logo.
- Remove decorative dots and any surrounding box/border.
- Add a glitch effect that triggers randomly every 2–5s for 0.3–0.5s, with larger horizontal and vertical displacements that maintain readability.
- Keep the logo vector-based and scalable across devices.
 - Update copy to `IUT SWE’22`.

## Implementation
- Component: `components/CyberLogo/CyberLogo.js`
  - Loads `Audiowide` via `next/font/google` for reliable SSR and FOUT-free rendering.
  - SVG uses pure `<text>` elements with `fontFamily: 'Audiowide', sans-serif` and fill `#00FFFF`.
  - All prior baseline line and three dots were removed.
  - No wrapper box or border; the container is transparent.
  - Cyan neon glow added via SVG filter `neonGlow` (Gaussian blur + color matrix).

- Glitch Effect
  - Random scheduling is implemented in React via `useEffect`, toggling a CSS class.
  - Interval: randomly selected 2–5 seconds; Duration: randomly selected 300–500ms.
  - The CSS animation (`glitchXY`) uses larger X/Y displacements plus subtle skew for a more intense look while maintaining legibility.
  - A pinkish‑purple overlay layer (`.glitchPurple`, color `#FF3EF2`) animates only during glitches.
  - Respects `prefers-reduced-motion: reduce` by disabling scheduling and animations.

- Assets
  - Editable SVG: `public/logo/creta-logo.svg` (includes title and comments).
  - Optimized SVG: `public/logo/creta-logo.optimized.svg` (minimal markup; production-ready).

## Accessibility & Performance
- Color contrast: Cyan `#00FFFF` on dark backgrounds meets WCAG AA for text of this size.
- Motion: Reduced motion respected via media query and JS guard.
- Performance: Only transform-based animation; random scheduling avoids constant GPU use.

## Maintenance Notes
- Font changes: Adjust `Audiowide` or swap typeface by editing `components/CyberLogo/CyberLogo.js`.
- Animation tuning: Edit `glitchXY` keyframes in `components/CyberLogo/CyberLogo.module.css` and the timing logic in the component.
- Vector-first: Keep SVG text or convert to paths for full font independence if required by the distribution channel.

## Version Control
- All changes were implemented via structured patches for easy review.
- Suggested commit structure:
  - feat(logo): switch to Audiowide, cyan-only, remove dots/boxes
  - feat(logo): add cyan neon glow + randomized purple glitch overlay
  - feat(routine): adjust box height by -10% and scale contents
  - docs(logo): update redesign documentation and assets