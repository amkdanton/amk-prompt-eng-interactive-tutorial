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
  const level = getLevelFromXP(totalXP);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">
            📚 Course Chapters
          </h1>
          <p className="text-white/60 mb-6">
            Complete exercises to earn XP and unlock the next chapter
          </p>
          {progress ? (
            <div className="max-w-lg">
              <XPBar xp={totalXP} />
            </div>
          ) : (
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl px-4 py-3 text-amber-200 text-sm">
              <Link href="/" className="underline">Create a profile</Link> to track your progress and earn XP!
            </div>
          )}
        </div>
      </div>

      {/* Chapters */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {CHAPTERS.map((chapter, index) => {
            const chProgress = getChapterProgress(chapter.id);
            const unlocked = isChapterUnlocked(index);
            const completed = chProgress.completed === chProgress.total && chProgress.total > 0;
            const inProgress = chProgress.completed > 0 && !completed;
            const isChapterBonusEarned = progress?.completedChapters.includes(chapter.id);

            return (
              <div
                key={chapter.id}
                className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  completed
                    ? 'border-green-400 bg-green-900/20'
                    : inProgress
                    ? 'border-purple-400 bg-purple-900/20'
                    : unlocked
                    ? 'border-slate-600 bg-slate-800/80 hover:border-slate-500'
                    : 'border-slate-700 bg-slate-900/50 opacity-60'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Chapter icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ backgroundColor: chapter.color + '20', border: `2px solid ${chapter.color}40` }}
                    >
                      {completed ? '✅' : unlocked ? chapter.icon : '🔒'}
                    </div>

                    {/* Chapter info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white/40 text-sm font-mono">Ch.{chapter.number}</span>
                        <h3 className="text-white font-bold text-lg">{chapter.title}</h3>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: chapter.color + '30', color: chapter.color }}
                        >
                          {chapter.difficulty}
                        </span>
                        {completed && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                            COMPLETE
                          </span>
                        )}
                      </div>
                      <p className="text-white/50 text-sm mb-3">{chapter.subtitle}</p>

                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden max-w-48">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${chProgress.total ? (chProgress.completed / chProgress.total) * 100 : 0}%`,
                              backgroundColor: completed ? '#22c55e' : chapter.color,
                            }}
                          />
                        </div>
                        <span className="text-white/40 text-xs">
                          {chProgress.completed}/{chProgress.total} exercises
                        </span>
                        {chProgress.xpEarned > 0 && (
                          <span className="text-yellow-400 text-xs font-bold">
                            ⚡ {chProgress.xpEarned + (isChapterBonusEarned ? chapter.xpBonus : 0)} XP earned
                          </span>
                        )}
                      </div>
                    </div>

                    {/* XP and action */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-yellow-400 font-bold text-sm mb-2">
                        ⚡ {chapter.exercises.reduce((s, ex) => s + ex.xpReward, 0) + chapter.xpBonus} XP
                      </div>
                      {unlocked ? (
                        <Link
                          href={`/tutorial/${chapter.id}`}
                          className="inline-block px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                          style={{
                            backgroundColor: chapter.color,
                            color: 'white',
                          }}
                        >
                          {completed ? 'Review' : inProgress ? 'Continue' : 'Start'} →
                        </Link>
                      ) : (
                        <div className="text-slate-500 text-xs">
                          Complete previous chapter
                        </div>
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
          <div className="mt-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/40 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-white font-black text-xl mb-2">All Chapters Complete!</h3>
            <p className="text-white/70 mb-4">You've mastered prompt engineering. Claim your certificate!</p>
            <Link
              href="/certificate"
              className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all"
            >
              Get My Certificate 📜
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
