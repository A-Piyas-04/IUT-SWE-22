"use client";
import Link from "next/link";
import styles from "./CyberLogo.module.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], display: "swap", weight: ["600", "700"] });

export default function CyberLogo() {
  return (
    <Link href="/" className={`${styles.logoWrap} ${orbitron.className}`} aria-label="Go to homepage">
      <svg
        className={`${styles.svg} ${styles.glitch}`}
        viewBox="0 0 280 80"
        role="img"
        aria-label="IUT SWE 22 cyberpunk logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00EAFF" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A5FF2B" />
          </linearGradient>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0   0 0 0 0 1   0 0 0 0 1   0 0 0 1 0" result="cyan" />
            <feMerge>
              <feMergeNode in="cyan" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circuit baseline */}
        <path d="M10 60 H270" stroke="url(#cyberGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <circle cx="40" cy="60" r="3" fill="#00f7ff" opacity="0.6" />
        <circle cx="120" cy="60" r="3" fill="#ff2df1" opacity="0.6" />
        <circle cx="200" cy="60" r="3" fill="#a8ff00" opacity="0.6" />

        {/* Logo text */}
        <g filter="url(#neonGlow)">
          <text x="10" y="40" fontFamily="'Orbitron', sans-serif" fontWeight="700" fontSize="28" fill="url(#cyberGradient)">IUT</text>
          <text x="90" y="40" fontFamily="'Orbitron', sans-serif" fontWeight="700" fontSize="28" fill="url(#cyberGradient)">SWE</text>
          <text x="190" y="40" fontFamily="'Orbitron', sans-serif" fontWeight="700" fontSize="28" fill="url(#cyberGradient)">22</text>
        </g>
      </svg>
    </Link>
  );
}