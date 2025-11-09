/**
 * Root layout for the Next.js App Router.
 * - Imports global styles
 * - Applies dark neon theme to the <body>
 * - Renders a shared Header above page content
 */
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "IUT SWE 22",
  description: "IUT SWE 22 — Modern, soothing UI with professional styling",
};

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-soft min-h-screen text-slate antialiased`}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}