import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cold Three Three — Automation studio for growing brands",
  description:
    "We build custom automations and internal tools for CPG founders and operations teams. Less busywork, more brand-building.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Cold Three Three — Automation studio for growing brands",
    description:
      "Custom automations and internal tools for CPG founders and operations teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
