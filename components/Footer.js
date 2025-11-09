/**
 * Footer component with subtle accents and accessible contrast.
 */
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-dark/70 backdrop-blur-md">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} IUT SWE 22. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="#"
            className="text-slate-300 hover:text-accent-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-md px-1"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-slate-300 hover:text-accent-magenta transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-magenta rounded-md px-1"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-slate-300 hover:text-accent-lime transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime rounded-md px-1"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}