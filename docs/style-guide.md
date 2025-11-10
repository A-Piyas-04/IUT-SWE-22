# IUT SWE 22 — Cyberpunk Header Style Guide

## Color Palette (Modern)
- Background `#0D0221` (dark space)
- Accent Cyan `#00EAFF`
- Accent Violet `#8B5CF6`
- Accent Lime `#A5FF2B`
- Text Primary `#E2E8F0` (slate-200)
- Text Secondary `#94A3B8` (slate-400)
- Borders `rgba(255,255,255,0.08)`

## Typography
- Body Font: Space Grotesk (400/500/700)
- Logo Font: Orbitron (600/700), distinctive and sophisticated
- Body line-height: 1.6
- Header logo text: 28px bold in SVG
- Navbar link text: 14–16px, single-line with ellipsis on overflow

## Spacing
- Header padding: `px-4 py-4`
- Logo container: 6px 10px internal padding, 0.75rem border-radius
- Spacing between logo and navbar: `gap-8` (≈32px)
- Navbar item gap: `gap-3` equivalent (0.75rem)
- Right placeholder: `w-20 h-10`

## Effects & Motion
- Neon gradient across text: cyan → magenta → lime
- Subtle glow via filter (SVG) with 2px blur
- Hover scale: `1.02` using `transform`, 200ms ease
- Easing: cubic-bezier `(0.22, 1, 0.36, 1)`
- Reduced motion: disable animations

## Accessibility
- Contrast: Ensure text remains legible against dark background
- Focus: Visible outlines remain on interactive elements
- ARIA: Logo link `aria-label` set to “Go to homepage”