/**
 * Homepage: Displays the project title and the ClassRoutine component.
 */
import ClassRoutine from "../components/ClassRoutine";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-neon-magenta text-glow-magenta shadow-neon-magenta">
        IUT SWE 22
      </h1>
      <ClassRoutine />
    </div>
  );
}