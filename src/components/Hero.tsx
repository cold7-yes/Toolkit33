export function Hero() {
  return (
    <header className="relative overflow-hidden px-6 pt-56 pb-40">
      {/* Background now provided by AuraBackground in page.tsx */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
          <span
            className="inline-block h-2 w-2 rounded-full bg-green-500"
            style={{ animation: "pulse-dot 2s infinite" }}
          />
          Available for new automation projects
        </div>
        <h1 className="mb-8 text-5xl font-medium leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl">
          Less manual work.{" "}
          <br className="hidden sm:block" />
          <span className="text-neutral-500">More growth.</span>
        </h1>
        <p className="mx-auto mb-12 max-w-3xl text-lg font-light leading-relaxed text-neutral-400 sm:text-2xl">
          We architect intelligent workflows and AI agents that eliminate the manual work holding your growth back.
        </p>
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-medium text-black transition hover:bg-neutral-200"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
          </svg>
          View Automations
        </a>
      </div>
    </header>
  );
}
