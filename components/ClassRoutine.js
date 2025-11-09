/**
 * ClassRoutine component
 * Renders a neon-styled weekly schedule grid with placeholder data.
 */
import { Fragment } from "react";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["09:00", "10:00", "11:00", "12:00", "14:00", "16:00"];

// Placeholder schedule data: { [day]: { [time]: course } }
const schedule = {
  Monday: {
    "09:00": "Algorithms",
    "11:00": "Database Systems",
    "14:00": "Software Engineering Lab",
  },
  Tuesday: {
    "10:00": "Operating Systems",
    "12:00": "Discrete Math",
    "16:00": "Web Development",
  },
  Wednesday: {
    "09:00": "Computer Networks",
    "11:00": "Human-Computer Interaction",
    "14:00": "AI Fundamentals",
  },
  Thursday: {
    "10:00": "Compiler Design",
    "12:00": "Probability & Statistics",
    "16:00": "Project Workshop",
  },
  Friday: {
    "09:00": "Data Structures",
    "11:00": "Cybersecurity",
    "14:00": "DevOps Basics",
  },
};

// Map each day to a neon accent for variety
const dayAccent = {
  Monday: "cyan",
  Tuesday: "magenta",
  Wednesday: "lime",
  Thursday: "cyan",
  Friday: "magenta",
};

function cellAccentClasses(day) {
  switch (dayAccent[day]) {
    case "magenta":
      return "border-neon-magenta/50 shadow-neon-magenta text-neon-magenta";
    case "lime":
      return "border-neon-lime/50 shadow-neon-lime text-neon-lime";
    default:
      return "border-neon-cyan/50 shadow-neon-cyan text-neon-cyan";
  }
}

export default function ClassRoutine() {
  return (
    <section aria-labelledby="routine-title" className="space-y-4">
      <h2
        id="routine-title"
        className="text-2xl font-semibold text-neon-cyan text-glow-cyan"
      >
        Weekly Class Routine
      </h2>

      {/* Grid container: 1 time column + 5 day columns */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-[120px_repeat(5,_1fr)] border border-neon-cyan/30 rounded-lg shadow-neon-cyan bg-dark/40">
          {/* Header row */}
          <div className="p-3 font-bold border-b border-neon-cyan/40 text-neon-cyan text-glow-cyan">
            Time
          </div>
          {days.map((day) => (
            <div
              key={`hdr-${day}`}
              className={`p-3 font-bold border-b ${cellAccentClasses(day)} text-glow-cyan`}
            >
              {day}
            </div>
          ))}

          {/* Body rows */}
          {times.map((time) => (
            <Fragment key={time}>
              <div className="p-3 border-t border-neon-cyan/20 text-neon-cyan">
                {time}
              </div>
              {days.map((day) => {
                const course = schedule[day]?.[time] || "—";
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`p-3 border-t ${cellAccentClasses(day)} bg-dark/30`}
                  >
                    <span className="text-sm sm:text-base">{course}</span>
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}