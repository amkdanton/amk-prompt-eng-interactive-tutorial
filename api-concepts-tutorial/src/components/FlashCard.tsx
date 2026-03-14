"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Concept } from "@/types";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  concept: Concept;
}

export function FlashCard({ concept }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const cards = [
    {
      front: `What is ${concept.title}?`,
      back: concept.explanation,
    },
    ...concept.keyPoints.map((point, i) => ({
      front: `Key Point ${i + 1}: Complete this...`,
      back: point,
    })),
    ...concept.quiz.slice(0, 2).map((q) => ({
      front: q.question,
      back: `${q.options[q.correctIndex]}\n\n${q.explanation}`,
    })),
  ];

  const card = cards[cardIndex];

  function nextCard() {
    setIsFlipped(false);
    setTimeout(() => setCardIndex((i) => (i + 1) % cards.length), 150);
  }

  function prevCard() {
    setIsFlipped(false);
    setTimeout(() => setCardIndex((i) => (i - 1 + cards.length) % cards.length), 150);
  }

  return (
    <div className="space-y-4">
      {/* Card counter */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Card {cardIndex + 1} of {cards.length}
        </span>
        <span className="text-xs">Click card to flip</span>
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setIsFlipped((f) => !f)}
      >
        <div
          className={cn(
            "relative w-full transition-transform duration-500",
            "transform-gpu"
          )}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="w-full rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 min-h-48 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-4xl mb-4">{concept.icon}</div>
            <p className="text-lg font-semibold text-gray-800 text-center">{card.front}</p>
            <p className="text-xs text-blue-500 mt-4">Click to reveal answer</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-full rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-sm text-gray-800 text-center leading-relaxed whitespace-pre-line">
              {card.back}
            </p>
            <p className="text-xs text-green-500 mt-4">Click to flip back</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" onClick={prevCard}>
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsFlipped(false);
                setTimeout(() => setCardIndex(i), 150);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === cardIndex ? "bg-blue-500" : "bg-gray-300"
              )}
            />
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextCard}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
