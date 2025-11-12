"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Trigger enter animation on route change with RAF to avoid FOUC
    setVisible(false);
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setVisible(true));
      // store id2 on id1 for cleanup
      (window.__ptRafIds ||= new Set()).add(id2);
    });
    return () => {
      cancelAnimationFrame(id1);
      if (window.__ptRafIds) {
        for (const id of window.__ptRafIds) cancelAnimationFrame(id);
        window.__ptRafIds.clear();
      }
    };
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      className={`page-transition ${visible ? "pt-enter" : "pt-pre"}`}
      style={{ visibility: visible ? "visible" : "hidden", willChange: "transform, opacity" }}
      key={pathname}
    >
      {children}
    </div>
  );
}