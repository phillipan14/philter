import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhilTer — LinkedIn Profile Change Tracker",
  description:
    "Know when your ex gets a new job before they tell anyone. Track LinkedIn profile changes for job titles, companies, and headlines.",
  openGraph: {
    title: "PhilTer — LinkedIn Profile Change Tracker",
    description:
      "Know when your ex gets a new job before they tell anyone.",
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
