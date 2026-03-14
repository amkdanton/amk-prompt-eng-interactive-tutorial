"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Concept } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
  yellow: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
  green: "bg-green-50 border-green-200 hover:border-green-400",
  red: "bg-red-50 border-red-200 hover:border-red-400",
  purple: "bg-purple-50 border-purple-200 hover:border-purple-400",
  indigo: "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
  orange: "bg-orange-50 border-orange-200 hover:border-orange-400",
  teal: "bg-teal-50 border-teal-200 hover:border-teal-400",
  amber: "bg-amber-50 border-amber-200 hover:border-amber-400",
  cyan: "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
  pink: "bg-pink-50 border-pink-200 hover:border-pink-400",
  violet: "bg-violet-50 border-violet-200 hover:border-violet-400",
  slate: "bg-slate-50 border-slate-200 hover:border-slate-400",
  emerald: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
};

interface ConceptCardProps {
  concept: Concept;
  isCompleted: boolean;
  quizScore?: number;
}

export function ConceptCard({ concept, isCompleted, quizScore }: ConceptCardProps) {
  return (
    <Link href={`/concepts/${concept.slug}`}>
      <div
        className={cn(
          "relative rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer",
          "hover:shadow-md hover:-translate-y-0.5",
          colorMap[concept.color] || "bg-gray-50 border-gray-200 hover:border-gray-400"
        )}
      >
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        )}

        <div className="flex items-start gap-3">
          <span className="text-2xl">{concept.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{concept.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{concept.shortDescription}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {concept.category}
          </Badge>
          {quizScore !== undefined && (
            <Badge
              variant={quizScore >= 70 ? "success" : "warning"}
              className="text-xs ml-auto"
            >
              Quiz: {quizScore}%
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
