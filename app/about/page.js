import Image from "next/image";

export default function AboutPage() {
  return (
    <section aria-labelledby="about-title" className="space-y-8">
      <header className="space-y-2">
        <h2 id="about-title" className="text-3xl font-semibold">About</h2>
        <p className="text-slate-400">Learn about the project and the team behind it.</p>
      </header>

      {/* Profile */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-dark/40 ring-1 ring-white/10 rounded-xl p-6">
        <div className="shrink-0">
          <Image
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            alt="Profile photo"
            width={128}
            height={128}
            className="rounded-full ring-2 ring-accent-cyan/50"
            priority
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Your Name</h3>
          <p className="text-slate-400">Software Engineering student at IUT with interests in web development and systems design.</p>
        </div>
      </div>

      {/* Social links */}
      <div aria-label="Social links" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {[
          { label: "Facebook", href: "https://facebook.com", color: "text-accent-cyan" },
          { label: "LinkedIn", href: "https://linkedin.com", color: "text-accent-magenta" },
          { label: "Email", href: "mailto:example@example.com", color: "text-accent-lime" },
          { label: "GitHub", href: "https://github.com", color: "text-accent-cyan" },
          { label: "Website", href: "https://example.com", color: "text-accent-magenta" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-2 px-4 py-3 rounded-lg ring-1 ring-white/10 bg-dark/50 hover:bg-dark/60 transition-all duration-300`}
            aria-label={item.label}
          >
            {/* Icon */}
            <svg aria-hidden="true" className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-slate-200">{item.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}