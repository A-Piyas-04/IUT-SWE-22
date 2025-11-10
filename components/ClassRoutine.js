/**
 * ClassRoutine component
 * Modern, accessible weekly schedule card with subtle neon accents.
 * Reads dynamic routine data from /data/routine.json in public.
 */
"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
// Days will be derived from JSON so all available days are shown

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

  const days = useMemo(() => {
    if (!data) return [];
    const keys = Object.keys(data.routine || {});
    const knownOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return keys.sort((a, b) => {
      const ia = knownOrder.indexOf(a);
      const ib = knownOrder.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
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

  function resolveCourseNameOnly(courseRaw, courseNamesMap, coursesList) {
    const parts = courseRaw.split("/").map((p) => p.trim());
    const names = parts.map((p) => {
      const norm = normalizeCode(p);
      const byMap = courseNamesMap?.[norm];
      if (byMap) return byMap;
      const found = coursesList?.find((c) => c.code === p || normalizeCode(c.code) === norm);
      return found ? found.title : p;
    });
    return names.join(" / ");
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

        {/* Grid container: 1 day column (left) + time range columns (top) */}
        <div className="w-full overflow-x-auto">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `120px repeat(${timeOrder.length}, minmax(160px, 1fr))`,
              gridTemplateRows: `auto repeat(${days.length}, var(--slotH))`,
              // Responsive, equal-height slots that adapt to viewport
              // without overlapping or mismatched dimensions
              ['--slotH']: 'clamp(72px, 10vw, 116px)'
            }}
          >
            {/* Header row */}
            <div className="p-3 font-medium text-slate-300 border-b border-white/10 bg-dark/60 sticky left-0 backdrop-blur-sm z-10">
              Day
            </div>
            {timeOrder.map((slotKey) => (
              <div key={`hdr-${slotKey}`} className="p-3 font-medium border-b bg-dark/40 text-slate-300">
                {data.time_slots[slotKey]}
              </div>
            ))}

            {/* Body rows: each row is a day */}
            {days.map((day) => (
              <Fragment key={`row-${day}`}>
                {/* Day header cell */}
                <div className={`p-3 font-medium text-slate-300 border-t border-white/10 bg-dark/60 sticky left-0 backdrop-blur-sm z-10 ${headerAccentClasses(day)}`}>
                  {day}
                </div>

                {/* Cells per time slot for this day with slot-range support */}
                {(() => {
                  const entries = (data.routine?.[day] || []).map((e) => {
                    if (Array.isArray(e.slot_range)) {
                      const [start, end] = e.slot_range;
                      return { ...e, start: String(start), end: String(end ?? start) };
                    }
                    if (e.slot != null) {
                      return { ...e, start: String(e.slot), end: String(e.slot) };
                    }
                    return e;
                  });

                  const cells = [];
                  for (let i = 0; i < timeOrder.length; i++) {
                    const slotKey = timeOrder[i];
                    if (slotKey === "break") {
                      cells.push(
                        <div key={`${day}-break`} className="p-3 border-t border-white/5">
                          <div className="h-full flex items-center justify-center rounded-md bg-dark/50 text-slate-400 text-sm">Break</div>
                        </div>
                      );
                      continue;
                    }

                    const starting = entries.filter((e) => e.start === slotKey);
                    const spanLen = starting.reduce((max, e) => {
                      const sidx = timeOrder.indexOf(e.start);
                      const eidx = timeOrder.indexOf(e.end);
                      const len = Math.max(1, eidx - sidx + 1);
                      return Math.max(max, len);
                    }, 1);

                    if (starting.length === 0) {
                      cells.push(
                        <div key={`${day}-${slotKey}`} className="p-3 border-t border-white/5">
                          <div className="h-full flex items-center justify-center text-slate-500 text-sm">—</div>
                        </div>
                      );
                      continue;
                    }

                    // Detect ML/CC combined slots (both tags present in the same slot)
                    const hasML = starting.some((e) => e.tag === "ML");
                    const hasCC = starting.some((e) => e.tag === "CC");
                    const isMLCCCombined = hasML && hasCC;

                    cells.push(
                      <div
                        key={`${day}-${slotKey}`}
                        className="p-3 border-t border-white/5"
                        style={{ gridColumn: `span ${spanLen}` }}
                      >
                        <div className={`flex flex-col h-full overflow-hidden gap-2 rounded-md px-3 py-2 bg-dark/70 ${cellAccentClasses(day)} transition-colors`}>
                          {starting.map((item, idx) => {
                            const courseName = resolveCourseNameOnly(item.course, data.course_names, data.courses);
                            const nameClass = isMLCCCombined
                              ? "text-[0.7rem] sm:text-[0.75rem] text-slate-200 font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                              : "text-sm sm:text-base text-slate-200 font-medium";
                            const roomClass = isMLCCCombined
                              ? "text-[0.7rem] sm:text-[0.75rem] text-accent-cyan font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                              : "text-sm sm:text-base text-accent-cyan font-semibold";
                            return (
                              <div key={`${day}-${slotKey}-item-${idx}`} className="flex flex-col">
                                <span className={nameClass} title={courseName}>{courseName}</span>
                                {item.room ? (
                                  <span className={roomClass} title={`Room: ${item.room}`}>Room: {item.room}</span>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );

                    i += spanLen - 1;
                  }

                  return cells;
                })()}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}