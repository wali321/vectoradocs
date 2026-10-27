"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle light and dark themes"
      className="theme-toggle"
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      type="button"
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="17"
        viewBox="0 0 20 20"
        width="17"
      >
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" />
        <path
          d="M10 1.5v2m0 13v2m8.5-8.5h-2m-13 0h-2m14.51-6.01-1.42 1.42M5.41 14.59l-1.42 1.42m12.02 0-1.42-1.42M5.41 5.41 3.99 3.99"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
      <span className="theme-toggle-label">Theme</span>
    </button>
  );
}
