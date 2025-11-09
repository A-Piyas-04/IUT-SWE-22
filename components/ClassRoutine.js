/**
 * ClassRoutine component
 * Weekly schedule grid with a clean, professional palette.
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

function cellClasses() {
  return "border-border bg-card text-slate";
}

export default function ClassRoutine() {
  return (
    <section aria-labelledby="routine-title" className="space-y-4">
      <h2
        id="routine-title"
        className="text-2xl font-semibold text-primary"
      >
        Weekly Class Routine
      </h2>

      {/* Grid container: 1 time column + 5 day columns */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-[120px_repeat(5,_1fr)] border border-border rounded-lg bg-card shadow-soft-lg">
          {/* Header row */}
          <div className="p-3 font-bold border-b border-border bg-primary text-white">
            Time
          </div>
          {days.map((day) => (
            <div
              key={`hdr-${day}`}
              className={`p-3 font-bold border-b border-border bg-primary/90 text-white`}
            >
              {day}
            </div>
          ))}

          {/* Body rows */}
          {times.map((time) => (
            <Fragment key={time}>
              <div className="p-3 border-t border-border text-slate bg-card">
                {time}
              </div>
              {days.map((day) => {
                const course = schedule[day]?.[time] || "—";
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`p-3 border-t border-border ${cellClasses()}`}
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