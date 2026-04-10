export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-950 text-white">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="8" height="8" x="3" y="3" rx="2" />
              <path d="M7 11v4a2 2 0 0 0 2 2h4" />
              <rect width="8" height="8" x="13" y="13" rx="2" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-tight text-neutral-500">
            cd systems &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex gap-8">
          {[
            { label: "Twitter", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "GitHub", href: "#" },
            { label: "Email", href: "mailto:hello@coldthreethree.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-500 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
