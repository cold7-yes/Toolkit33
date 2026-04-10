"use client";

import Link from "next/link";

function WorkflowIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  );
}

export function Header() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-700 text-white">
            <WorkflowIcon />
          </div>
          <span className="text-base font-medium tracking-tight text-white">
            cd systems
          </span>
        </Link>
        <div className="hidden items-center gap-8 sm:flex">
          {["Showcase", "Process", "Stack"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-base font-medium text-neutral-400 transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="https://calendly.com/cdean-brand33/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
        >
          Book a Call
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14m-7-7l7 7l-7 7" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
