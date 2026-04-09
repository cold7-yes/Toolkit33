import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Signal · Carson Dean";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 25% 20%, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.22), transparent 60%), #000",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#22c55e",
            }}
          />
          system online
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            Signal
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 900,
            }}
          >
            Automations, agents, and web tools built by Carson Dean.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div>operator · carson dean</div>
          <div>3 systems active</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
