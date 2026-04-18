const CONTACT_EMAIL = "hello@coldthreethree.com";

export function FinalCTA() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-4xl font-medium tracking-tight text-white sm:text-5xl">
          Less admin. More growth.
        </h2>
        <p className="mb-12 text-xl text-neutral-400">
          Book a free 30-minute call. We&rsquo;ll map out what to automate first.
        </p>

        <div
          className="overflow-hidden rounded-2xl border p-14 text-left"
          style={{
            background: "rgba(23,23,23,0.6)",
            backdropFilter: "blur(8px)",
            borderColor: "#262626",
          }}
        >
          <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="mb-2 text-2xl font-medium tracking-tight text-white">
                Workflow Audit
              </div>
              <div className="text-base text-neutral-500">
                30-minute discovery call to map your workflow.
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-3xl font-medium text-white">$0</div>
              <a
                href="https://calendly.com/cdean-brand33/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-8 py-3.5 text-base font-medium text-black transition hover:bg-neutral-200"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="mb-10 h-px bg-neutral-800" />

          <div className="grid gap-6 sm:grid-cols-3">
            {["Custom Architecture", "Full Documentation", "30 Days Support"].map(
              (item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-white">
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-base text-neutral-400">{item}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
