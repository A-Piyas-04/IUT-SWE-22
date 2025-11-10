// Utilities to parse time slots and determine the next upcoming class in Asia/Dhaka
// Pure functions to enable simple unit testing without a test framework.

// Parse a time string like "08:00" into minutes from midnight.
export function parseHHMM(str) {
  const m = /^\s*(\d{1,2}):(\d{2})\s*$/.exec(str);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (Number.isNaN(h) || Number.isNaN(min)) return null;
  return h * 60 + min;
}

// Given a slot label like "08:00 - 09:15", return start minutes.
export function slotStartMinutes(slotLabel) {
  if (!slotLabel) return null;
  const parts = String(slotLabel).split("-");
  if (parts.length < 1) return null;
  return parseHHMM(parts[0]);
}

// Known ordered days for scanning schedule
export const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Get current weekday and time in Asia/Dhaka using formatToParts to avoid parsing problems.
export function getDhakaNowParts() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const map = Object.create(null);
  for (const p of parts) {
    map[p.type] = p.value;
  }
  const weekday = map.weekday;
  const hour = Number(map.hour);
  const minute = Number(map.minute);
  return { weekday, hour, minute, minutes: hour * 60 + minute };
}

// Determine the next upcoming class given routine data and time slots.
// Returns { day, item } or null if none found across the week.
export function findNextClass(data, nowDay, nowMinutes) {
  if (!data || !data.time_slots || !data.routine) return null;
  const slotKeys = Object.keys(data.time_slots);
  const orderedSlots = ["1", "2", "3", "4", "break", "5", "6"].filter((k) => slotKeys.includes(k));

  const startMinutesBySlot = Object.fromEntries(
    orderedSlots.map((k) => [k, slotStartMinutes(data.time_slots[k])])
  );

  const startIndex = dayOrder.indexOf(nowDay);
  const scanDays = startIndex >= 0
    ? dayOrder.slice(startIndex).concat(dayOrder.slice(0, startIndex))
    : dayOrder;

  for (const day of scanDays) {
    const entriesRaw = data.routine?.[day] || [];
    // Normalize entries to have start slot key
    const entries = entriesRaw.map((e) => {
      if (Array.isArray(e.slot_range)) {
        const [start] = e.slot_range;
        return { ...e, start: String(start) };
      }
      if (e.slot != null) return { ...e, start: String(e.slot) };
      return e;
    }).filter((e) => orderedSlots.includes(e.start));

    // For current day, filter only classes that start later than now
    const filtered = day === nowDay
      ? entries.filter((e) => (startMinutesBySlot[e.start] ?? -1) > nowMinutes)
      : entries;

    // Sort by start time
    filtered.sort((a, b) => (startMinutesBySlot[a.start] ?? 0) - (startMinutesBySlot[b.start] ?? 0));

    if (filtered.length > 0) {
      return { day, item: filtered[0] };
    }
  }

  return null;
}

// Resolve course name from course code using provided maps.
export function resolveCourseNameOnly(courseRaw, courseNamesMap, coursesList) {
  if (!courseRaw) return "";
  const parts = String(courseRaw).split("/").map((p) => p.trim());
  const normalize = (code) => code.replace(/\s+/g, "");
  const names = parts.map((p) => {
    const norm = normalize(p);
    const byMap = courseNamesMap?.[norm];
    if (byMap) return byMap;
    const found = coursesList?.find((c) => c.code === p || (c.code && c.code.replace(/\s+/g, "") === norm));
    return found ? found.title : p;
  });
  return names.join(" / ");
}

// Detect lab courses via name/title or lab room pattern (L-###)
export function isLabCourse(courseRaw, room, courseNamesMap, coursesList) {
  if (!courseRaw) return false;
  const nameOnly = resolveCourseNameOnly(courseRaw, courseNamesMap, coursesList) || "";
  const titleHasLab = /\bLab\b/i.test(nameOnly);
  const roomLooksLab = typeof room === "string" && /^L-\d+/i.test(room);
  const parts = String(courseRaw).split("/").map((p) => p.trim());
  const byCourses = parts.some((p) => {
    const norm = p.replace(/\s+/g, "");
    const found = coursesList?.find((c) => c.code === p || (c.code && c.code.replace(/\s+/g, "") === norm));
    return /\bLab\b/i.test(found?.title || "");
  });
  return titleHasLab || roomLooksLab || byCourses;
}

// Find A/B lab entries sharing the same start slot on a given day.
// Excludes ML/CC tagged labs from bi-weekly label logic.
export function findGroupLabPair(data, day, startSlotKey) {
  const entriesRaw = data?.routine?.[day] || [];
  const normalizeEntry = (e) => {
    if (Array.isArray(e.slot_range)) {
      const [start] = e.slot_range;
      return { ...e, start: String(start) };
    }
    if (e.slot != null) return { ...e, start: String(e.slot) };
    return e;
  };

  const entries = entriesRaw.map(normalizeEntry).filter((e) => e.start === String(startSlotKey));
  const ab = entries.filter(
    (e) => isLabCourse(e.course, e.room, data.course_names, data.courses) && e.tag !== "ML" && e.tag !== "CC"
  );

  const bySection = Object.create(null);
  for (const e of ab) {
    const sec = e.section === "B" ? "B" : "A"; // default to A if missing
    bySection[sec] = e;
  }
  return bySection; // e.g., { A: {...}, B: {...} }
}