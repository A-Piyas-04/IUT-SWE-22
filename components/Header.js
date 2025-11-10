/**
 * Responsive Header component with project title and navigation menu.
 * Styled using the Dark Neon theme.
 */
import Link from "next/link";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md border-b border-white/10 bg-dark/70"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-lime bg-clip-text text-transparent">
            IUT SWE 22
          </span>
          <span className="block h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-accent-cyan/60" />
        </Link>
        </div>
        {/* New modular navbar */}
        <div className="mt-3">
          <Navbar />
        </div>
      </div>
    </header>
  );
}