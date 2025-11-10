"use client";

export default function UrgentBox() {
  return (
    <section
      aria-label="Urgent notices"
      className="w-full rounded-xl border border-red-400/50 bg-red-50/70 dark:bg-slate-800/60 backdrop-blur-sm p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-extrabold tracking-wide text-red-900 dark:text-red-200">
          URGENT
        </h2>
        <span className="text-xs sm:text-sm text-red-700/80 dark:text-red-300/80">
          Placeholder
        </span>
      </div>
      <div className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
        No urgent notices yet. Content will appear here.
      </div>
    </section>
  );
}