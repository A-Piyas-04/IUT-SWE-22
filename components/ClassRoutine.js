/**
 * ClassRoutine component
 * Modern, accessible weekly schedule card with subtle neon accents.
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

// Map each day to a softer accent color for variety
const dayAccent = {
  Monday: "cyan",
  Tuesday: "magenta",
  Wednesday: "lime",
  Thursday: "cyan",
  Friday: "magenta",
};

function headerAccentClasses(day) {
  switch (dayAccent[day]) {
    case "magenta":
      return "text-accent-magenta border-accent-magenta/40";
    case "lime":
      return "text-accent-lime border-accent-lime/40";
    default:
      return "text-accent-cyan border-accent-cyan/40";
  }
}

function cellAccentClasses(day) {
  switch (dayAccent[day]) {
    case "magenta":
      return "ring-1 ring-accent-magenta/40 hover:ring-accent-magenta/60";
    case "lime":
      return "ring-1 ring-accent-lime/40 hover:ring-accent-lime/60";
    default:
      return "ring-1 ring-accent-cyan/40 hover:ring-accent-cyan/60";
  }
}

export default function ClassRoutine() {
  return (
    <section aria-labelledby="routine-title" className="space-y-4">
      <div className="card">
        <div className="flex items-end justify-between p-4 sm:p-6 border-b border-white/10">
          <div>
            <h2 id="routine-title" className="text-xl sm:text-2xl font-semibold text-slate-100">
              Weekly Class Routine
            </h2>
            <p className="text-sm text-slate-400">Organized schedule with accessible, calm neon accents.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-accent-cyan" />
            <span>Cyan</span>
            <span className="inline-block h-2 w-2 rounded-full bg-accent-magenta ml-3" />
            <span>Magenta</span>
            <span className="inline-block h-2 w-2 rounded-full bg-accent-lime ml-3" />
            <span>Lime</span>
          </div>
        </div>

        {/* Grid container: 1 time column + 5 day columns */}
        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-[110px_repeat(5,_1fr)]">
            {/* Header row */}
            <div className="p-3 font-medium text-slate-300 border-b border-white/10 bg-dark/60 sticky left-0 backdrop-blur-sm">
              Time
            </div>
            {days.map((day) => (
              <div
                key={`hdr-${day}`}
                className={`p-3 font-medium border-b bg-dark/40 ${headerAccentClasses(day)}`}
              >
                {day}
              </div>
            ))}

            {/* Body rows */}
            {times.map((time) => (
              <Fragment key={time}>
                <div className="p-3 text-slate-300 border-t border-white/5 bg-dark/60 sticky left-0 backdrop-blur-sm">
                  {time}
                </div>
                {days.map((day) => {
                  const course = schedule[day]?.[time] || "—";
                  return (
                    <div key={`${day}-${time}`} className="p-3 border-t border-white/5">
                      {course === "—" ? (
                        <div className="text-slate-500 text-sm">—</div>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 bg-dark/70 ${cellAccentClasses(
                            day
                          )} transition-colors`}
                        >
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              dayAccent[day] === "magenta"
                                ? "bg-accent-magenta"
                                : dayAccent[day] === "lime"
                                ? "bg-accent-lime"
                                : "bg-accent-cyan"
                            }`}
                          />
                          <span className="text-sm sm:text-base text-slate-200">{course}</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}