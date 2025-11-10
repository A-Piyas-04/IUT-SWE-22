/**
 * ClassRoutine component
 * Modern, accessible weekly schedule card with subtle neon accents.
 * Reads dynamic routine data from /data/routine.json in public.
 */
"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Orbitron } from "next/font/google";

// Next.js font loaders must be initialized at module scope
const orbitron = Orbitron({ subsets: ["latin"], weight: "700", display: "swap" });
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
  const [group, setGroup] = useState("A");
  const [rotation, setRotation] = useState(0); // 0 or 90
  const [animating, setAnimating] = useState(false);

  // Measure routine card to compute safe space when rotated
  const rotatorRef = useRef(null);
  const cardRef = useRef(null);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!cardRef.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setCardSize({ width: Math.ceil(cr.width), height: Math.ceil(cr.height) });
      }
    });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute wrapper minHeight and translate to prevent visual overlap when rotated
  const wrapperMinHeight = rotation === 90 ? (cardSize.width || undefined) : undefined;
  const translationY = rotation === 90 ? Math.max(0, Math.floor((cardSize.width - cardSize.height) / 2)) : 0;
  const rotatorStyle = rotation === 90
    ? { transform: `translateY(${translationY}px) rotate(90deg)`, transformBox: "view-box" }
    : { transform: "rotate(0deg)", transformBox: "view-box" };

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

  // Persist group selection within the session
  useEffect(() => {
    const saved = sessionStorage.getItem("routine_group");
    if (saved === "A" || saved === "B") setGroup(saved);
    const rotSaved = localStorage.getItem("routine_rotation");
    if (rotSaved === "90") setRotation(90);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("routine_group", group);
  }, [group]);

  // Persist rotation
  useEffect(() => {
    localStorage.setItem("routine_rotation", String(rotation));
  }, [rotation]);

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

  // Detect lab courses robustly using course name/title and room pattern
  function isLabCourse(courseRaw, room, courseNamesMap, coursesList) {
    if (!courseRaw) return false;
    const nameOnly = resolveCourseNameOnly(courseRaw, courseNamesMap, coursesList) || "";
    const titleHasLab = /\bLab\b/i.test(nameOnly);
    const roomLooksLab = typeof room === "string" && /^L-\d+/i.test(room);
    const parts = courseRaw.split("/").map((p) => p.trim());
    const byCourses = parts.some((p) => {
      const norm = normalizeCode(p);
      const found = coursesList?.find((c) => c.code === p || normalizeCode(c.code) === norm);
      return /\bLab\b/i.test(found?.title || "");
    });
    return titleHasLab || roomLooksLab || byCourses;
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
      {/* Rotation overlay for subtle feedback during animation */}
      <div
        aria-hidden={true}
        className={`pointer-events-none fixed inset-0 transition-opacity duration-300 ease-in-out ${animating ? "opacity-20 bg-black" : "opacity-0"}`}
      />

      {/* Rotating container wraps entire routine card */}
      <div className="relative w-full overflow-auto" style={{ minHeight: wrapperMinHeight }}>
        <div ref={rotatorRef} className="inline-block transition-transform duration-300 ease-in-out" style={rotatorStyle}>
      <div ref={cardRef} className="bg-surface/80 border border-white/10 ring-1 ring-accent-lime/30 rounded-xl shadow-card backdrop-blur-sm">
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
            {/* ARIA live region for rotation announcements */}
            <p role="status" aria-live="polite" className="sr-only">
              {rotation === 90 ? "Routine rotated ninety degrees clockwise." : "Routine reset to default orientation."}
            </p>
          </div>
          <div className="flex items-center gap-6">

            {/* Rotation toggle */}
            <div className="inline-flex rounded-lg ring-1 ring-white/10 overflow-hidden">
              <button
                type="button"
                className={`group inline-flex items-center justify-center gap-2 min-w-[120px] min-h-[48px] px-4 py-2 text-base font-semibold ${orbitron.className} rounded-none transition-all duration-300 ease-in-out will-change-transform
                  ${rotation === 90
                    ? "bg-accent-lime/25 text-slate-100 ring-1 ring-accent-lime/60 shadow-lg shadow-accent-lime/25"
                    : "bg-dark/50 text-slate-300 hover:bg-dark/60"}
                  hover:scale-[1.03]
                  hover:shadow-md hover:shadow-black/40
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-accent-lime`}
                onClick={() => {
                  setAnimating(true);
                  setRotation((r) => (r === 90 ? 0 : 90));
                  setTimeout(() => setAnimating(false), 300);
                }}
                aria-pressed={rotation === 90}
                aria-label={rotation === 90 ? "Reset rotation" : "Rotate routine 90 degrees"}
                title={rotation === 90 ? "Reset rotation" : "Rotate 90°"}
              >
                {/* Rotation icon */}
                <svg
                  aria-hidden="true"
                  className={`h-5 w-5 transition-transform duration-300 ease-in-out ${rotation === 90 ? "rotate-90 text-accent-lime" : "rotate-0 text-slate-400"}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M16 3h5v5" />
                  <path d="M20 8A8 8 0 104 12" />
                </svg>
                <span>{rotation === 90 ? "Reset" : "Rotate"}</span>
              </button>
            </div>

            {/* Group toggle */}
            <div className="inline-flex rounded-lg ring-1 ring-white/10 overflow-hidden">
              {/* Group A */}
              <button
                type="button"
                className={`group inline-flex items-center justify-center gap-3 min-w-[120px] min-h-[60px] sm:min-w-[140px] sm:min-h-[64px] xl:min-w-[160px] xl:min-h-[72px] px-6 py-3.5 sm:px-7 sm:py-4 xl:px-8 xl:py-4 text-[1.15rem] sm:text-[1.3rem] xl:text-[1.35rem] font-bold ${orbitron.className} rounded-none transition-all duration-300 ease-in-out will-change-transform
                  ${group === "A"
                    ? "bg-accent-cyan/25 text-slate-100 ring-1 ring-accent-cyan/60 shadow-lg shadow-accent-cyan/25"
                    : "bg-dark/50 text-slate-300 hover:bg-dark/60"}
                  hover:scale-[1.05]
                  hover:shadow-md hover:shadow-black/40
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-accent-cyan`}
                onClick={() => setGroup("A")}
                aria-pressed={group === "A"}
                aria-label="Show Group A"
                title="Show Group A"
              >
                {/* Inline icon */}
                <svg aria-hidden="true" className={`h-5 w-5 sm:h-6 sm:w-6 ${group === "A" ? "text-accent-cyan" : "text-slate-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 00-8 0v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Group A</span>
              </button>
              {/* Divider */}
              <div className="w-px bg-white/10" aria-hidden="true" />

              {/* Group B */}
              <button
                type="button"
                className={`group inline-flex items-center justify-center gap-3 min-w-[120px] min-h-[60px] sm:min-w-[140px] sm:min-h-[64px] xl:min-w-[160px] xl:min-h-[72px] px-6 py-3.5 sm:px-7 sm:py-4 xl:px-8 xl:py-4 text-[1.15rem] sm:text-[1.3rem] xl:text-[1.35rem] font-bold ${orbitron.className} rounded-none transition-all duration-300 ease-in-out will-change-transform
                  ${group === "B"
                    ? "bg-accent-magenta/25 text-slate-100 ring-1 ring-accent-magenta/60 shadow-lg shadow-accent-magenta/25"
                    : "bg-dark/50 text-slate-300 hover:bg-dark/60"}
                  hover:scale-[1.05]
                  hover:shadow-md hover:shadow-black/40
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-accent-magenta`}
                onClick={() => setGroup("B")}
                aria-pressed={group === "B"}
                aria-label="Show Group B"
                title="Show Group B"
              >
                {/* Inline icon */}
                <svg aria-hidden="true" className={`h-5 w-5 sm:h-6 sm:w-6 ${group === "B" ? "text-accent-magenta" : "text-slate-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-8 0v2" />
                  <circle cx="16" cy="7" r="4" />
                  <path d="M8 21v-2a4 4 0 00-8 0v2" />
                  <circle cx="4" cy="7" r="4" />
                </svg>
                <span>Group B</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid container: 1 day column (left) + time range columns (top) */}
        <div
          className="w-full overflow-auto"
          style={{
            /* Increase height by 25% while staying responsive via viewport cap */
            height: "min(calc(var(--routine-scroll-height) * 1.9), 190vh)",
            scrollBehavior: "smooth",
            /* Lower the routine content slightly for clearer spacing */
            paddingTop: "clamp(12px, 2vw, 184px)",
            boxSizing: "border-box",
          }}
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: `120px repeat(${timeOrder.length}, minmax(160px, 1fr))`,
              gridTemplateRows: `auto repeat(${days.length}, var(--slotH))`,
              // Responsive, equal-height slots that adapt to viewport
              // without overlapping or mismatched dimensions
              "--slotH": "clamp(72px, 10vw, 116px)"
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

                    const starting = entries
                      .filter((e) => e.start === slotKey)
                      .filter((e) => {
                        // ML/CC slots are unaffected by group toggle
                        if (e.tag === "ML" || e.tag === "CC") return true;
                        // For lab/grouped entries with section, only show selected group
                        if (e.section === "A" || e.section === "B") return e.section === group;
                        // Non-grouped entries remain visible
                        return true;
                      });
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
                            const isLab = isLabCourse(item.course, item.room, data.course_names, data.courses);
                            const showBiWeekly = isLab && item.tag !== "ML" && item.tag !== "CC";
                            const labelClass = isMLCCCombined
                              ? "mt-1 inline-flex self-start px-2 py-0.5 rounded-md bg-accent-lime/15 text-accent-lime ring-1 ring-accent-lime/40 text-[0.7rem] sm:text-[0.75rem] font-semibold"
                              : "mt-1 inline-flex self-start px-2 py-0.5 rounded-md bg-accent-lime/15 text-accent-lime ring-1 ring-accent-lime/40 text-xs sm:text-sm font-semibold";
                            return (
                              <div key={`${day}-${slotKey}-item-${idx}`} className="flex flex-col">
                                <span className={nameClass} title={courseName}>{courseName}</span>
                                {item.room ? (
                                  <span className={roomClass} title={`Room: ${item.room}`}>Room: {item.room}</span>
                                ) : null}
                                {showBiWeekly ? (
                                  <span className={labelClass} aria-label="Bi-Weekly lab" title="Bi-Weekly">Bi-Weekly</span>
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
        {/* Close routine card container */}
        </div>
        {/* End rotating inner container */}
      </div>
      {/* End rotating outer wrapper */}
    </div>
    </section>
  );
  }