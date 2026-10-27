"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

export function PrimaryNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  return (
    <div className="navigation-control" onKeyDown={handleKeyDown}>
      <button
        ref={menuButtonRef}
        aria-controls="primary-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="mobile-nav-toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          viewBox="0 0 20 20"
          width="18"
        >
          {isOpen ? (
            <path
              d="m5 5 10 10M15 5 5 15"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          ) : (
            <path
              d="M3 5.5h14M3 10h14M3 14.5h14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          )}
        </svg>
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>
      <nav
        aria-label="Primary navigation"
        className={`primary-nav${isOpen ? " is-open" : ""}`}
        id="primary-navigation"
      >
        <Link href="/models" onClick={() => setIsOpen(false)}>
          Models
        </Link>
        <Link href="/contact" onClick={() => setIsOpen(false)}>
          Contact Us
        </Link>
      </nav>
    </div>
  );
}
