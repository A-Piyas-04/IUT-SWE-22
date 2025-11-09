/**
 * Homepage: Displays the project title and the ClassRoutine component.
 */
import ClassRoutine from "../components/ClassRoutine";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-lime bg-clip-text text-transparent">
          IUT SWE 22
        </h1>
        <p className="max-w-2xl text-slate-400">
          A clean and modern weekly routine dashboard designed with a calm Dark Neon accent palette.
        </p>
      </section>

      <ClassRoutine />
    </div>
  );
}