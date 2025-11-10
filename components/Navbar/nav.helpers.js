export const navItems = [
  { label: "Home", href: "/" },
  { label: "Notice Board", href: "/notice-board" },
  { label: "Quizzes", href: "/quizzes" },
  { label: "Faculty Contacts", href: "/faculty-contacts" },
  { label: "Student List", href: "/student-list" },
  { label: "About", href: "/about" },
];

export function isActivePath(pathname, href) {
  if (!pathname || !href) return false;
  // Exact match, except Home matches root
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function getNavItems() {
  return navItems.slice();
}