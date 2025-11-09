/**
 * Responsive Header component with project title and navigation menu.
 * Styled using the Dark Neon theme.
 */
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md border-b border-white/10 bg-dark/70"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-lime bg-clip-text text-transparent">
            IUT SWE 22
          </span>
          <span className="block h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-accent-cyan/60" />
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="text-slate-200 hover:text-accent-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-md px-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-slate-200 hover:text-accent-magenta transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-magenta rounded-md px-1"
              >
                Assignments
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-slate-200 hover:text-accent-lime transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime rounded-md px-1"
              >
                Resources
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}