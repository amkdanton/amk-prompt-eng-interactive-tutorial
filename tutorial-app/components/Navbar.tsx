'use client';

import Link from 'next/link';
import { useProgress } from './ProgressProvider';
import XPBar from './XPBar';
import { CHAPTERS } from '@/lib/chapters';

export default function Navbar() {
  const { progress } = useProgress();

  const totalExercises = CHAPTERS.reduce((sum, ch) => sum + ch.exercises.length, 0);
  const completedExercises = progress
    ? Object.values(progress.completedExercises).filter((e) => e.passed).length
    : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🧠</span>
          <div>
            <span className="text-white font-black text-lg">PromptCraft</span>
            <span className="text-purple-300 font-semibold text-lg"> Academy</span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/tutorial"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            Chapters
          </Link>
          <Link
            href="/leaderboard"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            🏆 Leaderboard
          </Link>

          {progress && (
            <div className="flex items-center gap-4">
              <div className="text-white/60 text-xs">
                {completedExercises}/{totalExercises} exercises
              </div>
              <XPBar xp={progress.totalXP} compact />
              <div className="text-white/80 text-sm font-medium">
                {progress.username}
              </div>
            </div>
          )}

          {!progress && (
            <Link
              href="/"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Start Learning
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
