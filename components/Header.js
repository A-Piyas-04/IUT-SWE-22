/**
 * Responsive Header component with project title and navigation menu.
 * Styled using a professional, soothing palette.
 */
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 border border-white/20 text-sm font-bold">
            IUT
          </span>
          <span className="text-xl sm:text-2xl font-semibold tracking-tight">SWE 22</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-accent transition-colors">About</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-accent transition-colors">Services</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-accent transition-colors">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}