// Lightweight requestAnimationFrame-based debouncing for scroll/resize or any high-frequency events
// Ensures handlers run at most once per animation frame and can include a trailing delay.

export function rafDebounce(handler, delay = 0) {
  let rafId = null;
  let timeoutId = null;
  let lastArgs = null;

  const clear = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    if (timeoutId !== null) clearTimeout(timeoutId);
    rafId = null;
    timeoutId = null;
  };

  const debounced = (...args) => {
    lastArgs = args;
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (delay > 0) {
        if (timeoutId !== null) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => handler(...lastArgs), delay);
      } else {
        handler(...lastArgs);
      }
    });
  };

  debounced.cancel = clear;
  return debounced;
}

export function addRafDebouncedEvent(target, type, handler, { passive = true, delay = 0 } = {}) {
  const debounced = rafDebounce(handler, delay);
  target.addEventListener(type, debounced, { passive });
  return () => {
    debounced.cancel();
    target.removeEventListener(type, debounced, { passive });
  };
}