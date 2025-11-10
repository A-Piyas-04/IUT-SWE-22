import Image from "next/image";
import styles from "./About.module.css";
import aboutImage from "./image.png";

export default function AboutPage() {
  return (
    <section aria-labelledby="about-title" className={styles.aboutSection}>
      <header>
        <h2 id="about-title" className="text-3xl font-semibold">About</h2>
        <p className="text-slate-400">A cyberpunk-styled overview with a bold visual focal and interactive tiles.</p>
      </header>

      {/* Visual focal: optimized local image */}
      <div className={styles.hero} aria-label="About hero">
        <div className={styles.heroMedia}>
          <Image
            src={aboutImage}
            alt="About hero image"
            className={styles.heroImg}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </div>

      {/* 2x2 grid of large buttons */}
      <nav aria-label="About actions" className={styles.gridWrap}>
        {[
          { label: "Profile", href: "/profile" },
          { label: "Projects", href: "/projects" },
          { label: "Contacts", href: "/contacts" },
          { label: "Achievements", href: "/achievements" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={styles.tileButton}
            aria-label={item.label}
          >
            <span className={styles.tileLabel}>{item.label}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}