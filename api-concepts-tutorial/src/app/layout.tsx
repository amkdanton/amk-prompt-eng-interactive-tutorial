import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quanta — API Concepts Interactive Tutorial",
  description: "Learn 20 essential API concepts with interactive code playgrounds, quizzes, flashcards, and AI-powered explanations.",
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
