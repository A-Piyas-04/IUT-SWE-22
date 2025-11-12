export default function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className="h-1 w-48 bg-white/10 overflow-hidden rounded"
        aria-label="Loading"
        role="status"
      >
        <div className="loading-bar h-full w-1/3 bg-cyan-400/70" />
      </div>
    </div>
  );
}