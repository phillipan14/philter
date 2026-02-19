import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhilTer — LinkedIn Profile Change Tracker",
  description:
    "Monitor LinkedIn profiles for job changes, title updates, and headline rewrites. For market research purposes, obviously.",
  openGraph: {
    title: "PhilTer — LinkedIn Profile Change Tracker",
    description:
      "Monitor LinkedIn profiles for job changes. For market research purposes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
