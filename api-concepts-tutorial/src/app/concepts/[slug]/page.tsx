"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Code2,
  Brain,
  CreditCard,
  Network,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodePlayground } from "@/components/CodePlayground";
import { QuizCard } from "@/components/QuizCard";
import { FlashCard } from "@/components/FlashCard";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { AIAssistant } from "@/components/AIAssistant";
import { concepts, categoryLabels } from "@/lib/concepts";
import { getProgress, markConceptComplete, saveQuizScore, setLastVisited } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Tab = "learn" | "code" | "diagram" | "flashcards" | "quiz";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "learn", label: "Learn", icon: <BookOpen className="w-4 h-4" /> },
  { id: "code", label: "Code", icon: <Code2 className="w-4 h-4" /> },
  { id: "diagram", label: "Diagram", icon: <Network className="w-4 h-4" /> },
  { id: "flashcards", label: "Flashcards", icon: <CreditCard className="w-4 h-4" /> },
  { id: "quiz", label: "Quiz", icon: <Brain className="w-4 h-4" /> },
];

export default function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const concept = concepts.find((c) => c.slug === slug);

  if (!concept) notFound();

  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | undefined>();

  const conceptIndex = concepts.findIndex((c) => c.slug === slug);
  const prevConcept = conceptIndex > 0 ? concepts[conceptIndex - 1] : null;
  const nextConcept = conceptIndex < concepts.length - 1 ? concepts[conceptIndex + 1] : null;

  useEffect(() => {
    const progress = getProgress();
    setIsCompleted(progress.completedConcepts.includes(slug));
    setQuizScore(progress.quizScores[slug]);
    setLastVisited(slug);
  }, [slug]);

  function handleMarkComplete() {
    const updated = markConceptComplete(slug);
    setIsCompleted(updated.completedConcepts.includes(slug));
  }

  function handleQuizComplete(score: number) {
    const updated = saveQuizScore(slug, score);
    setQuizScore(updated.quizScores[slug]);
    if (score >= 60 && !isCompleted) {
      markConceptComplete(slug);
      setIsCompleted(true);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>API Concepts</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">{concept.title}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">{categoryLabels[concept.category]}</Badge>
            {isCompleted && (
              <Badge variant="success" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Concept header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{concept.icon}</span>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{concept.title}</h1>
                  <p className="text-gray-500 mt-1">{concept.shortDescription}</p>
                </div>
                <div className="text-xs text-gray-400 text-right">
                  <div>{conceptIndex + 1} / {concepts.length}</div>
                </div>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                    {tab.id === "quiz" && quizScore !== undefined && (
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full ml-1",
                        quizScore >= 70 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {quizScore}%
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Learn Tab */}
                {activeTab === "learn" && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3">What is {concept.title}?</h2>
                      <p className="text-gray-700 leading-relaxed">{concept.explanation}</p>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Key Points</h3>
                      <ul className="space-y-2">
                        {concept.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {!isCompleted && (
                      <Button onClick={handleMarkComplete} className="gap-2 mt-2">
                        <CheckCircle className="w-4 h-4" />
                        Mark as Learned
                      </Button>
                    )}
                  </div>
                )}

                {/* Code Tab */}
                {activeTab === "code" && (
                  <CodePlayground example={concept.codeExample} />
                )}

                {/* Diagram Tab */}
                {activeTab === "diagram" && (
                  <ConceptDiagram
                    steps={concept.diagramSteps}
                    title={`How ${concept.title} Works`}
                  />
                )}

                {/* Flashcards Tab */}
                {activeTab === "flashcards" && (
                  <FlashCard concept={concept} />
                )}

                {/* Quiz Tab */}
                {activeTab === "quiz" && (
                  <QuizCard
                    questions={concept.quiz}
                    conceptSlug={slug}
                    onComplete={handleQuizComplete}
                  />
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {prevConcept ? (
                <Link href={`/concepts/${prevConcept.slug}`}>
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {prevConcept.title}
                  </Button>
                </Link>
              ) : <div />}
              {nextConcept ? (
                <Link href={`/concepts/${nextConcept.slug}`}>
                  <Button className="gap-2">
                    {nextConcept.title}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/">
                  <Button className="gap-2">
                    🎉 All Done! Back to Home
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* AI Assistant */}
            <AIAssistant conceptTitle={concept.title} />

            {/* All concepts quick nav */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">All Concepts</h3>
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {concepts.map((c) => {
                  const progress = getProgress();
                  const done = progress.completedConcepts.includes(c.slug);
                  return (
                    <Link key={c.id} href={`/concepts/${c.slug}`}>
                      <div className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                        c.slug === slug
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      )}>
                        <span className="text-base">{c.icon}</span>
                        <span className="flex-1 truncate">{c.title}</span>
                        {done && <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
