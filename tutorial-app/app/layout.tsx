import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { ProgressProvider } from '@/components/ProgressProvider';

export const metadata: Metadata = {
  title: "PromptCraft Academy — Interactive Prompt Engineering Tutorial",
  description: "Master prompt engineering with Claude through interactive exercises, gamified learning, and real-time AI feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <ProgressProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
