/**
 * Responsive Header component with project title and navigation menu.
 * Styled using the Dark Neon theme.
 */
import Navbar from "./Navbar/Navbar";
import CyberLogo from "./CyberLogo/CyberLogo";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md border-b border-white/10 bg-dark/70"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 py-4">
        {/* Left: Cyberpunk logo | Middle: Navbar | Right: reserved */}
        <div className="flex items-center gap-8">
          {/* Left corner logo */}
          <div className="shrink-0">
            <CyberLogo />
          </div>

          {/* Middle navbar (flex-grow, centered) */}
          <div className="flex-1 flex justify-center">
            <Navbar />
          </div>

          {/* Right corner reserved space */}
          <div className="shrink-0" aria-hidden="true">
            <div className="w-20 h-10" />
          </div>
        </div>
      </div>
    </header>
  );
}