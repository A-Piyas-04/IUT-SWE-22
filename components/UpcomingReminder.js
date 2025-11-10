"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getDhakaNowParts,
  findNextClass,
  resolveCourseNameOnly,
  isLabCourse,
  findGroupLabPair,
} from "../lib/schedule";

export default function UpcomingReminder() {
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevKeyRef = useRef(null);

  // Fetch schedule data once
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/data/routine.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load routine.json: ${res.status}`);
        const json = await res.json();
        if (active) setRoutine(json);
      } catch (e) {
        if (active) setError(e.message || String(e));
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const nowDhaka = getDhakaNowParts();

  const next = useMemo(() => {
    if (!routine) return null;
    return findNextClass(routine, nowDhaka.weekday, nowDhaka.minutes);
  }, [routine, nowDhaka.weekday, nowDhaka.minutes]);

  // Auto-refresh when hour changes or upcoming class changes (polling every 60s)
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger state by updating a dummy counter or relying on render and memo deps
      // Here, we re-run by setting a ref key and forcing state update if upcoming changed
      if (!routine) return;
      const n = findNextClass(routine, getDhakaNowParts().weekday, getDhakaNowParts().minutes);
      const k = n ? `${n.day}|${n.item?.course}|${n.item?.room}` : "none";
      if (prevKeyRef.current !== k) {
        prevKeyRef.current = k;
        // Force a render by toggling a lightweight state
        setLoading((v) => v); // no-op; React will still render on interval tick
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [routine]);

  const title = "Upcoming Class";

  const content = (() => {
    if (loading) return { heading: "Loading…", sub: "Fetching schedule", room: "" };
    if (error) return { heading: "Error", sub: error, room: "" };
    if (!next || !next.item) return { heading: "No upcoming class", sub: "You are all caught up", room: "" };

    const item = next.item;
    const name = resolveCourseNameOnly(item.course, routine.course_names, routine.courses);
    const room = item.room || "TBA";
    // If upcoming is a bi-weekly lab and differs for A/B, show both
    const startKey = item.start || (Array.isArray(item.slot_range) ? String(item.slot_range[0]) : item.slot != null ? String(item.slot) : null);
    const isLab = isLabCourse(item.course, item.room, routine.course_names, routine.courses);
    const pair = startKey && isLab ? findGroupLabPair(routine, next.day, startKey) : null;

    if (pair && (pair.A || pair.B) && (pair.A && pair.B)) {
      const nameA = resolveCourseNameOnly(pair.A.course, routine.course_names, routine.courses);
      const nameB = resolveCourseNameOnly(pair.B.course, routine.course_names, routine.courses);
      const roomA = pair.A.room || "TBA";
      const roomB = pair.B.room || "TBA";
      return {
        heading: `Bi-Weekly Lab — ${next.day}`,
        sub: "Group-specific labs",
        room: "",
        ab: { A: { name: nameA, room: roomA }, B: { name: nameB, room: roomB } },
      };
    }

    return { heading: `${name}`, sub: `${next.day}`, room };
  })();

  return (
    <section
      aria-label="Upcoming class reminder"
      className="w-full rounded-xl border border-blue-400/40 bg-blue-50/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold tracking-wide text-blue-900 dark:text-blue-200">
          {title}
        </h2>
        <span className="text-xs sm:text-sm text-blue-700/80 dark:text-blue-300/80">
          Asia/Dhaka
        </span>
      </div>
      <div className="mt-3 sm:mt-4">
        <div className="flex items-center gap-3">
          <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
            {content.heading}
          </div>
          {content.ab && (
            <span className="inline-flex items-center rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 text-xs sm:text-sm font-semibold px-2.5 py-0.5 ring-1 ring-blue-300/60">
              Bi-Weekly
            </span>
          )}
        </div>
        {content.sub && (
          <div className="mt-0.5 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            {content.sub}
          </div>
        )}

        {content.ab ? (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="inline-flex items-center justify-between rounded-md bg-white/70 dark:bg-slate-700/50 px-3 py-1.5 ring-1 ring-blue-300/50">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">A</span>
              <span className="ml-2 flex-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{content.ab.A.name}</span>
              <span className="ml-2 text-sm font-semibold text-blue-800 dark:text-blue-200">{content.ab.A.room}</span>
            </div>
            <div className="inline-flex items-center justify-between rounded-md bg-white/70 dark:bg-slate-700/50 px-3 py-1.5 ring-1 ring-blue-300/50">
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">B</span>
              <span className="ml-2 flex-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{content.ab.B.name}</span>
              <span className="ml-2 text-sm font-semibold text-blue-800 dark:text-blue-200">{content.ab.B.room}</span>
            </div>
          </div>
        ) : (
          content.room && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-white/70 dark:bg-slate-700/50 px-3 py-1.5 ring-1 ring-blue-300/50">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-700 dark:text-slate-200">
                Room
              </span>
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">{content.room}</span>
            </div>
          )
        )}
      </div>
    </section>
  );
}