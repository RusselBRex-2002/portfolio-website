import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Russel B Rex — AI-First UI/UX Designer & Full Stack Developer",
  description:
    "Interactive portfolio of Russel B Rex: AI-First UI/UX Designer and Full-Stack Developer specializing in systems thinking, WCAG accessibility, and high-impact digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#030508] text-[#e2e8f0] font-sans overflow-x-hidden selection:bg-[#dfd000] selection:text-black">
        {children}
      </body>
    </html>
  );
}
