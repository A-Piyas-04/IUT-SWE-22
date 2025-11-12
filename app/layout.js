/**
 * Root layout for the Next.js App Router.
 * - Imports global styles
 * - Applies dark neon theme to the <body>
 * - Renders a shared Header above page content
 */
import "../globals.css";
import Header from "../components/Header";
import RouteTransition from "../components/RouteTransition";
import Footer from "../components/Footer";
import { Space_Grotesk } from "next/font/google";
import PerfMonitor from "../components/PerfMonitor";

export const metadata = {
  title: "IUT SWE 22",
  description: "IUT SWE 22 — Dark Neon themed Next.js application",
};

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} bg-dark min-h-screen text-slate-200 antialiased`}
      >
        <Header />
        <main className="container mx-auto px-4 py-10">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
        {/* Dev-only performance monitor */}
        <PerfMonitor />
      </body>
    </html>
  );
}