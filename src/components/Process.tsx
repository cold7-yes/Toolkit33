const FEATURES = [
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 0 0 9 9" />
      </svg>
    ),
    title: "Handles the hard stuff",
    desc: "Most automation tools break the moment logic gets complex. We build workflows with conditional branching, loops, and real error handling so edge cases don\u2019t become your problem.",
  },
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </svg>
    ),
    title: "Data that arrives ready to use",
    desc: "Every system speaks a different language. We write the transformation logic that cleans, reformats, and structures your data so it lands exactly where it needs to in exactly the right shape.",
  },
  {
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12l2 2l4-4" />
      </svg>
    ),
    title: "Your data stays yours",
    desc: "We run on self-hosted n8n instances or locked-down cloud environments. Nothing passes through systems you don\u2019t control.",
  },
];

export function Process() {
  return (
    <section id="process" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — features */}
          <div>
            <h2 className="mb-8 text-4xl font-medium leading-snug tracking-tight text-white">
              Built to run.
              <br />
              Built to last.
            </h2>
            <div className="flex flex-col gap-10">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-white">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-medium text-white">{f.title}</h4>
                    <p className="text-base leading-relaxed text-neutral-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — workflow visual */}
          <div
            className="relative flex h-[500px] items-center justify-center overflow-hidden rounded-2xl border p-8"
            style={{
              background: "rgba(23,23,23,0.4)",
              backdropFilter: "blur(8px)",
              borderColor: "#262626",
            }}
          >
            {/* Dot grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 flex w-full max-w-xs flex-col items-center">
              {/* Trigger node */}
              <div className="z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              </div>
              <div className="h-6 w-0.5 bg-neutral-600/50" />

              {/* Extract node */}
              <div className="z-10 flex w-56 items-center gap-4 rounded-xl border border-neutral-700 bg-neutral-950/90 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                    <path d="M3 12a9 3 0 0 0 18 0" />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="font-medium tracking-tight text-white">Extract Data</div>
                  <div className="text-xs text-neutral-500">PostgreSQL</div>
                </div>
              </div>
              <div className="h-6 w-0.5 bg-neutral-600/50" />

              {/* AI Agent node */}
              <div className="relative z-10 flex w-60 items-center gap-4 overflow-hidden rounded-xl border border-neutral-600 bg-neutral-800 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-orange-600/10 to-transparent" />
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-600 to-orange-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 4V2m-6 2V2M9 16l-2 6 5-3 5 3-2-6M4 8h16M4 8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2" />
                  </svg>
                </div>
                <div className="relative z-10 text-sm">
                  <div className="font-medium tracking-tight text-white">AI Agent</div>
                  <div className="text-xs text-neutral-400">Processing intent...</div>
                </div>
              </div>
              <div className="h-6 w-0.5 bg-neutral-600/50" />

              {/* Router node */}
              <div className="z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-950/90 text-neutral-400 backdrop-blur-lg">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5" cy="6" r="3" /><path d="M8 6h3" /><circle cx="19" cy="6" r="3" /><path d="M16 6h-3" /><circle cx="12" cy="18" r="3" /><path d="M12 15V9" />
                </svg>
              </div>

              {/* Branch lines */}
              <div className="relative z-0 -my-px h-10 w-56">
                <svg className="absolute inset-0 h-full w-full text-neutral-600/50" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M50,0 C50,40 4,60 4,100" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <path d="M50,0 C50,40 96,60 96,100" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {/* Terminal nodes */}
              <div className="z-10 flex w-64 justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-950/90 text-green-400 backdrop-blur-lg">
                  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="m9 12l2 2l4-4" />
                  </svg>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-950/90 text-red-400 backdrop-blur-lg">
                  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
