"use client";

import { useMemo } from "react";
import { Trophy, Target, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { concepts } from "@/lib/concepts";
import { UserProgress } from "@/types";

interface ProgressTrackerProps {
  progress: UserProgress;
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  const stats = useMemo(() => {
    const completed = progress.completedConcepts.length;
    const total = concepts.length;
    const quizScores = Object.values(progress.quizScores);
    const avgScore = quizScores.length
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;
    const passedQuizzes = quizScores.filter((s) => s >= 70).length;

    return { completed, total, avgScore, passedQuizzes, quizCount: quizScores.length };
  }, [progress]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-blue-500" />
        Your Progress
      </h2>

      {/* Overall progress */}
      <div className="mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Concepts Explored</span>
          <span className="font-medium text-gray-900">
            {stats.completed}/{stats.total}
          </span>
        </div>
        <Progress value={stats.completed} max={stats.total} />
        <p className="text-xs text-gray-400 mt-1">
          {Math.round((stats.completed / stats.total) * 100)}% complete
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
          <div className="text-xs text-gray-500 mt-0.5">Learned</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.avgScore > 0 ? `${stats.avgScore}%` : "—"}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">Avg Quiz</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.passedQuizzes}</div>
          <div className="text-xs text-gray-500 mt-0.5">Quizzes Passed</div>
        </div>
      </div>

      {/* Achievement badges */}
      {stats.completed > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Achievements</p>
          <div className="flex flex-wrap gap-2">
            {stats.completed >= 1 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">🚀 First Step</span>
            )}
            {stats.completed >= 5 && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">⚡ Getting Started</span>
            )}
            {stats.completed >= 10 && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">🌟 Halfway There</span>
            )}
            {stats.completed >= 20 && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">🏆 API Master!</span>
            )}
            {stats.passedQuizzes >= 5 && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">🧠 Quiz Ace</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
