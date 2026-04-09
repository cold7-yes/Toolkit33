import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Signal · Carson Dean",
  description:
    "An operator console for the automations, agents, and web tools built by Carson Dean. You're not reading a portfolio \u2014 you're using one.",
  openGraph: {
    title: "Signal · Carson Dean",
    description:
      "Automations, agents, and web tools built by Carson Dean.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signal · Carson Dean",
    description:
      "Automations, agents, and web tools built by Carson Dean.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
