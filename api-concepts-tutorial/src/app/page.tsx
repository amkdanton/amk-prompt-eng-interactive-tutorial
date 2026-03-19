"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, Filter, RotateCcw } from "lucide-react";
import { ConceptCard } from "@/components/ConceptCard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Button } from "@/components/ui/button";
import { concepts, categoryLabels } from "@/lib/concepts";
import { getProgress, resetProgress } from "@/lib/progress";
import { UserProgress } from "@/types";

const categories = ["all", "fundamentals", "security", "performance", "architecture", "documentation"];

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress>({
    completedConcepts: [],
    quizScores: {},
    lastVisited: null,
  });
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const filtered = concepts.filter((c) => {
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  function handleReset() {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setProgress(resetProgress());
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Quanta</h1>
              <p className="text-xs text-gray-500">API Concepts Tutorial</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-400 hover:text-red-500 gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Master 20 Essential{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              API Concepts
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Learn with interactive code playgrounds, animated diagrams, quizzes, flashcards, and AI-powered explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <ProgressTracker progress={progress} />

            {/* Category filter */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const count = cat === "all" ? concepts.length : concepts.filter((c) => c.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        activeCategory === cat
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{cat === "all" ? "All Concepts" : categoryLabels[cat]}</span>
                      <span className="text-xs opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search concepts..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              />
            </div>

            {/* Results info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {filtered.length} concept{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "all" ? ` in ${categoryLabels[activeCategory]}` : ""}
              </p>
              {progress.lastVisited && (
                <Link href={`/concepts/${progress.lastVisited}`}>
                  <Button variant="outline" size="sm" className="text-xs gap-1.5">
                    <BookOpen className="w-3 h-3" />
                    Continue: {concepts.find((c) => c.slug === progress.lastVisited)?.title}
                  </Button>
                </Link>
              )}
            </div>

            {/* Concept grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filtered.map((concept) => (
                  <ConceptCard
                    key={concept.id}
                    concept={concept}
                    isCompleted={progress.completedConcepts.includes(concept.slug)}
                    quizScore={progress.quizScores[concept.slug]}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No concepts found for &quot;{search}&quot;</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
