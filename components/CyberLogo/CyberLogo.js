"use client";
import Link from "next/link";
import styles from "./CyberLogo.module.css";
import { useEffect, useMemo, useState } from "react";
import { Audiowide } from "next/font/google";

// Geometric, sci‑fi style close to the sample
const audiowide = Audiowide({ subsets: ["latin"], display: "swap", weight: "400" });

export default function CyberLogo() {
  // Randomized glitch scheduling: 2–5s intervals, 0.3–0.5s duration
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchDurationMs, setGlitchDurationMs] = useState(400);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let mounted = true;
    let timeoutId;

    const schedule = () => {
      // Random delay 2–5 seconds
      const delay = Math.floor(2000 + Math.random() * 3000);
      timeoutId = setTimeout(() => {
        if (!mounted) return;
        // Random duration 300–500ms
        const dur = Math.floor(300 + Math.random() * 200);
        setGlitchDurationMs(dur);
        setGlitchActive(true);
        setTimeout(() => {
          if (!mounted) return;
          setGlitchActive(false);
          schedule();
        }, dur);
      }, delay);
    };

    schedule();
    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  return (
    <Link href="/" className={`${styles.logoWrap} ${audiowide.className}`} aria-label="Go to homepage">
      <svg
        className={`${styles.svg} ${glitchActive ? styles.glitchActive : ""}`}
        viewBox="0 0 320 100"
        role="img"
        aria-label="IUT SWE 22 logo"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          // Pass glitch duration via CSS variable for precise timing
          ["--glitch-duration"]: `${glitchDurationMs}ms`,
        }}
      >
        <defs>
          {/* <!-- Cyan neon glow filter --> */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="0 0 0 0 0   0 0 0 0 1   0 0 0 0 1   0 0 0 1 0" result="cyan" />
            <feMerge>
              <feMergeNode in="cyan" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Clean vector-only text without borders or dots */}

        {/* Logo text */}
        {/* Base cyan layer (always visible, with neon glow) */}
        <g filter="url(#neonGlow)">
          <text x="12" y="58" fontFamily="'Audiowide', sans-serif" fontWeight="400" fontSize="44" fill="#00FFFF">IUT</text>
          <text x="116" y="58" fontFamily="'Audiowide', sans-serif" fontWeight="400" fontSize="44" fill="#00FFFF">SWE</text>
          <text x="232" y="58" fontFamily="'Audiowide', sans-serif" fontWeight="400" fontSize="44" fill="#00FFFF">'22</text>
        </g>

        {/* Pinkish purple overlay layer (only animates during glitch) */}
        <g className={styles.glitchPurple} aria-hidden="true">
          <text x="12" y="58" fontFamily="'Audiowide', sans-serif" fontWeight="400" fontSize="44" fill="#FF3EF2">IUT</text>
          <text x="116" y="58" fontFamily="'Audiowide', sans-serif" fontWeight="400" fontSize="44" fill="#FF3EF2">SWE</text>
          <text x="232" y="58" fontFamily="'Audiowide', sans-serif" fontWeight="400" fontSize="44" fill="#FF3EF2">'22</text>
        </g>
      </svg>
    </Link>
  );
}