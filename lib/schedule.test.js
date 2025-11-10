import assert from "node:assert";
import {
  parseHHMM,
  slotStartMinutes,
  dayOrder,
  findNextClass,
  resolveCourseNameOnly,
} from "./schedule.js";

// Basic unit tests for time parsing
assert.strictEqual(parseHHMM("08:00"), 480, "08:00 should be 480 minutes");
assert.strictEqual(parseHHMM("0:05"), 5, "0:05 should be 5 minutes");
assert.strictEqual(slotStartMinutes("08:00 - 09:15"), 480, "slot start should be 480");

// Mock routine data for next class determination
const mock = {
  time_slots: {
    "1": "08:00 - 09:15",
    "2": "09:15 - 10:30",
    "3": "10:30 - 11:45",
    break: "11:45 - 01:00",
    "5": "01:00 - 02:15",
    "6": "02:15 - 03:30",
  },
  routine: {
    Monday: [
      { slot: 1, course: "CSE 4502", room: "NC-210" },
      { slot_range: [5, 6], course: "SWE 4504", room: "NC-206" },
    ],
  },
  course_names: {
    CSE4502: "Data Science Lab",
    SWE4504: "Web Engineering",
  },
  courses: [
    { code: "CSE 4502", title: "Data Science Lab" },
    { code: "SWE 4504", title: "Web Engineering" },
  ],
};

// At 09:00 Monday, next should be 09:15 slot (if exists) or 10:30.
const next1 = findNextClass(mock, "Monday", 540);
assert.ok(next1, "Should find next class at 09:00");
assert.strictEqual(next1.day, "Monday");
assert.strictEqual(next1.item.course, "SWE 4504");

// Before 08:00 Monday, next should be 08:00 slot.
const next2 = findNextClass(mock, "Monday", 470);
assert.ok(next2, "Should find next class at 07:50");
assert.strictEqual(next2.item.course, "CSE 4502");

// Resolve names
assert.strictEqual(
  resolveCourseNameOnly("CSE 4502", mock.course_names, mock.courses),
  "Data Science Lab"
);
assert.strictEqual(
  resolveCourseNameOnly("SWE 4504", mock.course_names, mock.courses),
  "Web Engineering"
);

console.log("schedule.test.js: All tests passed");