/**
 * Homepage: Professional redesign with hero, CTAs, feature cards, and routine.
 */
import ClassRoutine from "../components/ClassRoutine";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
          IUT SWE 22
        </h1>
        <p className="text-muted max-w-3xl">
          A clean, modern homepage with a professional palette and clear organization.
          Thoughtful spacing and simple accents keep the interface comfortable and readable.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href="#features" className="btn btn-primary" title="Explore features">
            Explore Features
          </a>
          <a href="#contact" className="btn btn-outline" title="Get in touch">
            Get in Touch
          </a>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="space-y-6">
        <h2 className="text-2xl font-semibold text-primary">Key Highlights</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="bg-card border border-border rounded-xl p-6 shadow-soft-lg hover:shadow-soft-hover transition">
            <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent grid place-items-center mb-3">
              {/* Shield icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Reliable Architecture</h3>
            <p className="text-muted">Best practices ensure performance, security, and scalability.</p>
          </article>

          <article className="bg-card border border-border rounded-xl p-6 shadow-soft-lg hover:shadow-soft-hover transition">
            <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent grid place-items-center mb-3">
              {/* Rocket icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M14 3l7 7-9 9H3v-9l9-7z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Fast & Responsive</h3>
            <p className="text-muted">Adapts seamlessly across desktop, tablet, and mobile.</p>
          </article>

          <article className="bg-card border border-border rounded-xl p-6 shadow-soft-lg hover:shadow-soft-hover transition">
            <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent grid place-items-center mb-3">
              {/* Puzzle icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 3h12v12H9zM3 9h6v12H3z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Thoughtful Integrations</h3>
            <p className="text-muted">Clear UI patterns to elevate the experience.</p>
          </article>
        </div>
      </section>

      {/* Existing routine, restyled to match new palette */}
      <section className="space-y-4">
        <ClassRoutine />
      </section>
    </div>
  );
}