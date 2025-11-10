"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation on route change
    setVisible(false);
    const id = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      className={`page-transition ${visible ? "pt-enter" : "pt-pre"}`}
      key={pathname}
    >
      {children}
    </div>
  );
}