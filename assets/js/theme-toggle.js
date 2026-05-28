/**
 * Theme toggle — persists preference in localStorage.
 * Reads system preference as fallback when no stored value exists.
 *
 * Usage: include this script in <head> with defer, then add to your markup:
 *   <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
 *     <svg class="icon-moon" ...>...</svg>
 *     <svg class="icon-sun"  ...>...</svg>
 *   </button>
 */

(function () {
  const STORAGE_KEY = "ignacio-info-theme";
  const DARK = "dark";
  const LIGHT = "light";

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK
      : LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute(
        "aria-label",
        theme === DARK ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function toggleTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") || LIGHT;
    const next = current === DARK ? LIGHT : DARK;
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  /* Apply before first paint to avoid flash */
  applyTheme(getPreferred());

  /* Wire up button once DOM is ready */
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  });

  /* Sync across tabs / windows */
  window.addEventListener("storage", function (e) {
    if (e.key === STORAGE_KEY && (e.newValue === DARK || e.newValue === LIGHT)) {
      applyTheme(e.newValue);
    }
  });

  /* Expose helper for other scripts if needed */
  window.themeToggle = { toggle: toggleTheme, get: getPreferred };
})();
