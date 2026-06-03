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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar: logo "Frame of Thought", links - /movies, /concepts,
  /pathways, /submit, /about */}
        <main>
          {/* page content container */}
          {children}
        </main>
        {/* Footer */}
      </body>
    </html>
  );
}
