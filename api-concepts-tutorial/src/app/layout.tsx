import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Concepts Interactive Tutorial",
  description: "Learn 20 essential API concepts with interactive examples, quizzes, and AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
