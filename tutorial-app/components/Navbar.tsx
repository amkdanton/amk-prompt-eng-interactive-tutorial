'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProgress } from './ProgressProvider';
import XPBar from './XPBar';
import { CHAPTERS } from '@/lib/chapters';
import ApiKeyModal, { getStoredApiKey } from './ApiKeyModal';

export default function Navbar() {
  const { progress } = useProgress();
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    setHasKey(!!getStoredApiKey());
  }, [showApiKey]);

  const totalExercises = CHAPTERS.reduce((sum, ch) => sum + ch.exercises.length, 0);
  const completedExercises = progress
    ? Object.values(progress.completedExercises).filter((e) => e.passed).length
    : 0;

  return (
    <>
      {showApiKey && <ApiKeyModal onClose={() => setShowApiKey(false)} />}

      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-teal-500 rounded flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" fill="currentColor" opacity="0.7"/>
                <rect x="6" y="6" width="4" height="4" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white font-semibold text-base tracking-tight">PromptCraft</span>
              <span className="text-teal-400 font-semibold text-base tracking-tight">Academy</span>
            </div>
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="/tutorial"
              className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
            >
              Chapters
            </Link>
            <Link
              href="/leaderboard"
              className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
            >
              Leaderboard
            </Link>

            <button
              onClick={() => setShowApiKey(true)}
              title={hasKey ? 'API key configured' : 'Add API key to run exercises'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                hasKey
                  ? 'border-teal-700 bg-teal-950 text-teal-400 hover:bg-teal-900'
                  : 'border-amber-700 bg-amber-950 text-amber-400 hover:bg-amber-900'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${hasKey ? 'bg-teal-400' : 'bg-amber-400'}`} />
              {hasKey ? 'API Key' : 'Add Key'}
            </button>

            {progress && (
              <div className="flex items-center gap-3">
                <div className="text-zinc-500 text-xs hidden sm:block">
                  {completedExercises}/{totalExercises}
                </div>
                <XPBar xp={progress.totalXP} compact />
                <div className="text-zinc-300 text-sm font-medium hidden sm:block">
                  {progress.username}
                </div>
              </div>
            )}

            {!progress && (
              <Link
                href="/"
                className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Start
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
