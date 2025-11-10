"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";

/**
 * RouteTransition
 * - Production-ready page transition wrapper.
 * - Supports forward/backward navigation using the browser history index.
 * - Uses transform/opacity-only animations for 60fps performance.
 * - Respects reduced motion preferences.
 */
export default function RouteTransition({
  children,
  duration = 0.9,
  type = "fade-slide",
  restoreScrollOnBack = true,
  resetScrollOnForward = false,
}) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const prevIdxRef = useRef(typeof window !== "undefined" ? window.history.state?.idx ?? 0 : 0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(true); // gate visibility to prevent pre-animation flash
  const scrollMapRef = useRef(new Map());

  // Update direction before paint to avoid incorrect initial offset
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const currentIdx = window.history.state?.idx ?? prevIdxRef.current;
    const nextDirection = currentIdx > prevIdxRef.current ? 1 : -1;
    setDirection(nextDirection);
    prevIdxRef.current = currentIdx;
    // hide new page until animation starts
    setReady(false);
  }, [pathname]);

  const ease = "easeInOut"; // smooth, natural easing for gradual transitions

  const variants = useMemo(() => {
    if (prefersReduced) {
      return {
        initial: { opacity: 1 },
        enter: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    switch (type) {
      case "fade-scale":
        return {
          initial: { opacity: 0, scale: 0.975, filter: "saturate(0.96)", willChange: "opacity, transform" },
          enter: { opacity: 1, scale: 1, filter: "saturate(1)", transition: { duration, ease } },
          exit: { opacity: 0, scale: 0.975, filter: "saturate(0.96)", transition: { duration, ease } },
        };
      case "fade-slide":
      default:
        return {
          initial: { opacity: 0, x: direction * 24, willChange: "opacity, transform" },
          enter: { opacity: 1, x: 0, transition: { duration, ease } },
          exit: { opacity: 0, x: direction * -24, transition: { duration, ease } },
        };
    }
  }, [direction, prefersReduced, duration, type]);

  // Manage scroll restoration/reset depending on navigation direction
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prevPath = pathname;
    // store current scroll for route
    scrollMapRef.current.set(prevPath, window.scrollY || 0);
  }, []);

  const handleExitComplete = () => {
    if (typeof window === "undefined") return;
    // Apply scroll behavior post-exit, pre-enter
    if (direction === -1 && restoreScrollOnBack) {
      const y = scrollMapRef.current.get(pathname) ?? 0;
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    } else if (direction === 1 && resetScrollOnForward) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    }
    setBusy(false);
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      role="region"
      aria-busy={busy}
      style={{ position: "relative", visibility: ready ? "visible" : "hidden" }}
    >
      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.div
          key={pathname}
          onAnimationStart={() => { setBusy(true); setReady(true); }}
          onAnimationComplete={() => setBusy(false)}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={variants}
          style={{ willChange: "transform, opacity" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}