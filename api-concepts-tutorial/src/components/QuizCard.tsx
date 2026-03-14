"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/types";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  questions: QuizQuestion[];
  conceptSlug: string;
  onComplete: (score: number) => void;
}

export function QuizCard({ questions, conceptSlug, onComplete }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIndex];
  const isCorrect = selected === question?.correctIndex;
  const score = answers.filter(Boolean).length;

  function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
    setAnswers((prev) => [...prev, index === question.correctIndex]);
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100);
      setIsFinished(true);
      onComplete(finalScore);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelected(null);
    setAnswers([]);
    setShowExplanation(false);
    setIsFinished(false);
  }

  if (isFinished) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-xl border border-gray-200 p-8 text-center bg-white">
        <Trophy className={cn("w-16 h-16 mx-auto mb-4", finalScore >= 70 ? "text-yellow-500" : "text-gray-400")} />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
        <p className="text-gray-500 mb-4">
          You scored <span className="font-semibold text-gray-900">{score}/{questions.length}</span> correct
        </p>
        <div className={cn(
          "text-4xl font-bold mb-6",
          finalScore >= 80 ? "text-green-600" : finalScore >= 60 ? "text-yellow-600" : "text-red-600"
        )}>
          {finalScore}%
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {finalScore >= 80 ? "Excellent! You've mastered this concept." :
           finalScore >= 60 ? "Good job! Review the explanation and try again." :
           "Keep studying! Re-read the concept and try again."}
        </p>
        <Button onClick={handleRestart} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-6">
        {/* Question counter */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {score} correct
          </span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-gray-900 mb-5">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let optionStyle = "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
            if (selected !== null) {
              if (index === question.correctIndex) {
                optionStyle = "border-green-400 bg-green-50";
              } else if (index === selected && selected !== question.correctIndex) {
                optionStyle = "border-red-400 bg-red-50";
              } else {
                optionStyle = "border-gray-200 opacity-60";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={selected !== null}
                className={cn(
                  "w-full text-left p-3 rounded-lg border-2 transition-all duration-150",
                  "flex items-center gap-3 text-sm",
                  optionStyle
                )}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {selected !== null && index === question.correctIndex && (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
                {selected !== null && index === selected && index !== question.correctIndex && (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={cn(
            "mt-4 p-4 rounded-lg border-l-4 text-sm",
            isCorrect ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"
          )}>
            <p className={cn("font-semibold mb-1", isCorrect ? "text-green-800" : "text-red-800")}>
              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {selected !== null && (
          <div className="mt-5 flex justify-end">
            <Button onClick={handleNext}>
              {currentIndex + 1 >= questions.length ? "See Results" : "Next Question →"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
