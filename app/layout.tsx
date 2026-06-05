import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
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
  title: "Frame of Thought",
  description:
    "A philosophical cinema archive - explore films through the lens of philosophy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-200`}
      >
        <ThemeProvider>
          <header className="sticky top-0 z-50 border-b border-header-border bg-header-bg backdrop-blur-sm transition-colors duration-200">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="flex items-center gap-2.5 text-base font-semibold tracking-widest uppercase text-stone-800 dark:text-stone-300 transition-colors hover:text-stone-950 dark:hover:text-stone-100"
              >
                <Logo size={24} className="text-amber-600 dark:text-amber-500" />
                <span>Frame of Thought</span>
              </Link>

              <nav className="flex items-center gap-6 text-sm text-stone-500">
                <Link
                  href="/movies"
                  className="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
                >
                  Films
                </Link>
                <Link
                  href="/concepts"
                  className="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
                >
                  Concepts
                </Link>
                <Link
                  href="/pathways"
                  className="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
                >
                  Pathways
                </Link>
                <Link
                  href="/about"
                  className="transition-colors hover:text-stone-800 dark:hover:text-stone-200"
                >
                  About
                </Link>
                <ThemeToggle />
                <Link
                  href="/submit"
                  className="rounded border border-amber-600/40 dark:border-amber-700/60 bg-amber-600/10 dark:bg-amber-900/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 transition-colors hover:bg-amber-600/20 dark:hover:bg-amber-900/40 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  Submit
                </Link>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="mt-24 border-t border-stone-800/60">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-10 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-2.5 opacity-60">
                <Logo size={20} className="text-stone-500" />
                <p className="text-sm font-semibold uppercase tracking-widest text-stone-500">
                  Frame of Thought
                </p>
              </div>
              <p className="text-sm italic text-stone-500">
                &ldquo;The impediment to action advances action. What stands in
                the way becomes the way.&rdquo; — Marcus Aurelius
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
