'use client';

import Link from 'next/link';
import { useProgress } from '@/components/ProgressProvider';
import { CHAPTERS } from '@/lib/chapters';
import { getLevelFromXP } from '@/lib/types';
import XPBar from '@/components/XPBar';

export default function TutorialPage() {
  const { progress } = useProgress();

  const getChapterProgress = (chapterId: string) => {
    if (!progress) return { completed: 0, total: 0, xpEarned: 0 };
    const chapter = CHAPTERS.find((c) => c.id === chapterId);
    if (!chapter) return { completed: 0, total: 0, xpEarned: 0 };

    const completed = chapter.exercises.filter(
      (ex) => progress.completedExercises[ex.id]?.passed
    ).length;
    const xpEarned = chapter.exercises.reduce(
      (sum, ex) => sum + (progress.completedExercises[ex.id]?.xpEarned || 0),
      0
    );
    return { completed, total: chapter.exercises.length, xpEarned };
  };

  const isChapterUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevChapter = CHAPTERS[index - 1];
    const prevProgress = getChapterProgress(prevChapter.id);
    return prevProgress.completed === prevProgress.total && prevProgress.total > 0;
  };

  const totalXP = progress?.totalXP || 0;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 pt-10 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-1">
            Course Chapters
          </h1>
          <p className="text-zinc-500 text-sm mb-6">
            Complete exercises to earn XP and unlock the next chapter
          </p>
          {progress ? (
            <div className="max-w-sm">
              <XPBar xp={totalXP} />
            </div>
          ) : (
            <div className="border border-amber-800/50 bg-amber-950/30 rounded-md px-4 py-3 text-amber-400 text-sm">
              <Link href="/" className="underline underline-offset-2">Create a profile</Link> to track your progress and earn XP.
            </div>
          )}
        </div>
      </div>

      {/* Chapters */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-3">
          {CHAPTERS.map((chapter, index) => {
            const chProgress = getChapterProgress(chapter.id);
            const unlocked = isChapterUnlocked(index);
            const completed = chProgress.completed === chProgress.total && chProgress.total > 0;
            const inProgress = chProgress.completed > 0 && !completed;
            const isChapterBonusEarned = progress?.completedChapters.includes(chapter.id);

            return (
              <div
                key={chapter.id}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                  completed
                    ? 'border-teal-700 bg-teal-950/30'
                    : inProgress
                    ? 'border-teal-800 bg-zinc-900'
                    : unlocked
                    ? 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    : 'border-zinc-800 bg-zinc-900/40 opacity-50'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Chapter icon */}
                    <div className="w-12 h-12 rounded-md border border-zinc-700 flex items-center justify-center text-2xl flex-shrink-0 bg-zinc-800">
                      {completed ? '✓' : unlocked ? chapter.icon : '—'}
                    </div>

                    {/* Chapter info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-zinc-600 text-xs font-mono">Ch.{chapter.number}</span>
                        <h3 className="text-white font-medium text-sm">{chapter.title}</h3>
                        <span className="text-xs px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">
                          {chapter.difficulty}
                        </span>
                        {completed && (
                          <span className="text-xs px-1.5 py-0.5 rounded border border-teal-700 text-teal-400">
                            Done
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-500 text-xs mb-3">{chapter.subtitle}</p>

                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden max-w-40">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${chProgress.total ? (chProgress.completed / chProgress.total) * 100 : 0}%`,
                              backgroundColor: completed ? '#0d9488' : '#0d9488',
                            }}
                          />
                        </div>
                        <span className="text-zinc-600 text-xs">
                          {chProgress.completed}/{chProgress.total}
                        </span>
                        {chProgress.xpEarned > 0 && (
                          <span className="text-teal-500 text-xs font-medium">
                            {chProgress.xpEarned + (isChapterBonusEarned ? chapter.xpBonus : 0)} XP
                          </span>
                        )}
                      </div>
                    </div>

                    {/* XP and action */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-teal-500 text-xs font-medium mb-2">
                        {chapter.exercises.reduce((s, ex) => s + ex.xpReward, 0) + chapter.xpBonus} XP
                      </div>
                      {unlocked ? (
                        <Link
                          href={`/tutorial/${chapter.id}`}
                          className="inline-block px-4 py-1.5 rounded-md font-medium text-xs transition-colors bg-teal-700 hover:bg-teal-600 text-white"
                        >
                          {completed ? 'Review' : inProgress ? 'Continue' : 'Start'} &rarr;
                        </Link>
                      ) : (
                        <div className="text-zinc-600 text-xs">Locked</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate CTA */}
        {progress && progress.completedChapters.length === CHAPTERS.length && (
          <div className="mt-8 border border-teal-700 bg-teal-950/30 rounded-lg p-6 text-center">
            <h3 className="text-white font-semibold text-lg mb-2">All Chapters Complete</h3>
            <p className="text-zinc-400 text-sm mb-4">You&apos;ve mastered prompt engineering. Claim your certificate.</p>
            <Link
              href="/certificate"
              className="inline-block px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-md font-medium text-sm transition-colors"
            >
              Get Certificate &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
