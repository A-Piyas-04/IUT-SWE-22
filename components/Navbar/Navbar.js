"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { getNavItems, isActivePath } from "./nav.helpers";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = getNavItems();

  return (
    <nav role="navigation" aria-label="Primary navigation" className={styles.navbar}>
      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="navbar-mobile-panel"
        className={styles.menuButton}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Simple icon */}
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Desktop list */}
      <ul className={styles.navList}>
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                title={item.label}
                className={`${styles.link} ${active ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile panel */}
      <div id="navbar-mobile-panel" className={styles.mobilePanel} data-open={open}>
        <div className={styles.mobileList}>
          {items.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link key={`m-${item.href}`} href={item.href} aria-current={active ? "page" : undefined} title={item.label} className={`${styles.link} ${active ? styles.active : ""}`}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}