/**
 * Responsive Header component with project title and navigation menu.
 * Styled using the Dark Neon theme.
 */
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-sm border-b border-neon-magenta/40 shadow-neon-magenta bg-dark/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <span className="text-xl sm:text-2xl font-semibold text-neon-cyan text-glow-cyan">
            IUT SWE 22
          </span>
          <span className="block h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-neon-cyan/60 shadow-neon-cyan" />
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="text-neon-cyan hover:text-neon-lime transition-colors text-glow-cyan hover:shadow-neon-lime"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-neon-magenta hover:text-neon-lime transition-colors text-glow-magenta hover:shadow-neon-lime"
              >
                Assignments
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-neon-lime hover:text-neon-cyan transition-colors text-glow-lime hover:shadow-neon-cyan"
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