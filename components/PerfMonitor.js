"use client";
// Minimal performance monitor for FCP, CLS, and TBT thresholds
// Logs warnings in dev if thresholds are exceeded and exposes metrics on window.__perfMetrics

import { useEffect } from "react";

export default function PerfMonitor({
  thresholds = { fcp: 1000, cls: 0.1, tbt: 200 },
}) {
  useEffect(() => {
    const metrics = { fcp: null, cls: 0, tbt: 0 };
    const observers = [];

    if (typeof PerformanceObserver !== "undefined") {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntriesByName("first-contentful-paint")) {
            metrics.fcp = entry.startTime;
          }
        });
        paintObserver.observe({ type: "paint", buffered: true });
        observers.push(paintObserver);
      } catch {}

      try {
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) metrics.cls += entry.value;
          }
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
        observers.push(clsObserver);
      } catch {}

      try {
        const tbtObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const blocking = Math.max(0, entry.duration - 50); // TBT contribution
            metrics.tbt += blocking;
          }
        });
        tbtObserver.observe({ type: "longtask", buffered: true });
        observers.push(tbtObserver);
      } catch {}
    }

    window.__perfMetrics = metrics;

    const report = () => {
      const { fcp, cls, tbt } = metrics;
      if (process.env.NODE_ENV !== "production") {
        if (fcp !== null && fcp > thresholds.fcp) {
          console.warn(`[Perf] FCP ${Math.round(fcp)}ms exceeded ${thresholds.fcp}ms`);
        }
        if (cls > thresholds.cls) {
          console.warn(`[Perf] CLS ${cls.toFixed(3)} exceeded ${thresholds.cls}`);
        }
        if (tbt > thresholds.tbt) {
          console.warn(`[Perf] TBT ${Math.round(tbt)}ms exceeded ${thresholds.tbt}ms`);
        }
      }
    };

    const id = setTimeout(report, 3000); // allow page to settle
    return () => {
      clearTimeout(id);
      for (const o of observers) {
        try { o.disconnect(); } catch {}
      }
    };
  }, [thresholds]);

  return null;
}