/**
 * ClassRoutine component
 * Modern, accessible weekly schedule card with subtle neon accents.
 * Reads dynamic routine data from /data/routine.json in public.
 */
"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/data/routine.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load routine: ${res.status}`);
        const json = await res.json();
        if (active) setData(json);
      } catch (e) {
        if (active) setError(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const timeOrder = useMemo(() => {
    if (!data) return [];
    const keys = Object.keys(data.time_slots);
    const order = ["1", "2", "3", "4", "break", "5", "6"].filter((k) => keys.includes(k));
    return order;
  }, [data]);

  function normalizeCode(code) {
    return code.replace(/\s+/g, "");
  }

  function resolveCourseLabel(courseRaw, courseNamesMap, coursesList) {
    // Handle multiple codes separated by '/'
    const parts = courseRaw.split("/").map((p) => p.trim());
    const mapped = parts.map((p) => {
      const norm = normalizeCode(p);
      const name = courseNamesMap?.[norm];
      if (name) return `${p} — ${name}`;
      const found = coursesList?.find((c) => c.code === p || normalizeCode(c.code) === norm);
      return found ? `${p} — ${found.title}` : p;
    });
    return mapped.join(" / ");
  }

  function resolveInstructors(ids, teachersMap) {
    if (!ids) return [];
    return ids.map((id) => teachersMap?.[id] || id);
  }

  if (loading) {
    return (
      <section aria-labelledby="routine-title" className="space-y-4">
        <div className="bg-surface/80 border border-white/10 rounded-xl shadow-card backdrop-blur-sm">
          <div className="p-6">
            <div className="h-6 w-48 bg-white/10 rounded mb-4" />
            <div className="h-4 w-full bg-white/5 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-4">
        <div className="bg-surface/80 border border-white/10 rounded-xl shadow-card backdrop-blur-sm p-6">
          <p className="text-red-300">{String(error)}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="routine-title" className="space-y-4">
      <div className="bg-surface/80 border border-white/10 rounded-xl shadow-card backdrop-blur-sm">
        <div className="flex items-end justify-between p-4 sm:p-6 border-b border-white/10">
          <div>
            <h2 id="routine-title" className="text-xl sm:text-2xl font-semibold text-slate-100">
              Weekly Class Routine
            </h2>
            {data?.institution ? (
              <p className="text-sm text-slate-400">
                {data.institution.name} • {data.institution.department} — {data.institution.program}
              </p>
            ) : (
              <p className="text-sm text-slate-400">Organized schedule with accessible, calm neon accents.</p>
            )}
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
            {timeOrder.map((slotKey) => (
              <Fragment key={slotKey}>
                <div className="p-3 text-slate-300 border-t border-white/5 bg-dark/60 sticky left-0 backdrop-blur-sm">
                  {data.time_slots[slotKey]}
                </div>
                {days.map((day) => {
                  // Break row spans all columns visually
                  if (slotKey === "break") {
                    return (
                      <div key={`${day}-break`} className="p-3 border-t border-white/5">
                        <div className="text-slate-400 text-sm">Break</div>
                      </div>
                    );
                  }

                  const entries = data.routine?.[day] || [];
                  const item = entries.find((e) => String(e.slot) === slotKey);
                  if (!item) {
                    return (
                      <div key={`${day}-${slotKey}`} className="p-3 border-t border-white/5">
                        <div className="text-slate-500 text-sm">—</div>
                      </div>
                    );
                  }

                  const label = resolveCourseLabel(item.course, data.course_names, data.courses);
                  const instructorNames = resolveInstructors(item.instructors, data.teachers);
                  return (
                    <div key={`${day}-${slotKey}`} className="p-3 border-t border-white/5">
                      <div
                        className={`inline-flex flex-col gap-1 rounded-md px-3 py-2 bg-dark/70 ${cellAccentClasses(
                          day
                        )} transition-colors`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              dayAccent[day] === "magenta"
                                ? "bg-accent-magenta"
                                : dayAccent[day] === "lime"
                                ? "bg-accent-lime"
                                : "bg-accent-cyan"
                            }`}
                          />
                          <span className="text-sm sm:text-base text-slate-200 font-medium">
                            {label}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                          {instructorNames?.length ? (
                            <span title="Instructors">{instructorNames.join(", ")}</span>
                          ) : null}
                          {item.room ? <span title="Room">Room: {item.room}</span> : null}
                          {item.section ? <span title="Section">Section: {item.section}</span> : null}
                          {item.duration ? <span title="Duration">{item.duration}</span> : null}
                          {item.tag ? (
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] bg-white/5 text-slate-300"
                              title="Tag"
                            >
                              {item.tag}
                            </span>
                          ) : null}
                        </div>
                      </div>
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