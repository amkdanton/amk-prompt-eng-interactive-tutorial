'use client';

import { use, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useProgress } from '@/components/ProgressProvider';
import { CHAPTERS } from '@/lib/chapters';
import ExercisePanel from '@/components/ExercisePanel';
import { recordExerciseResult, markChapterComplete } from '@/lib/store';
import XPToast from '@/components/XPToast';

interface PageProps {
  params: Promise<{ chapterId: string }>;
}

export default function ChapterPage({ params }: PageProps) {
  const { chapterId } = use(params);
  const router = useRouter();
  const { progress, refreshProgress } = useProgress();

  const chapterIndex = CHAPTERS.findIndex((c) => c.id === chapterId);
  const chapter = CHAPTERS[chapterIndex];
  const nextChapter = CHAPTERS[chapterIndex + 1];

  const [activeTab, setActiveTab] = useState<'lesson' | 'exercises'>('lesson');
  const [chapterBonusToast, setChapterBonusToast] = useState<{ xp: number; message: string } | null>(null);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-2xl font-bold text-slate-800">Chapter not found</div>
          <Link href="/tutorial" className="text-purple-600 mt-4 inline-block">← Back to chapters</Link>
        </div>
      </div>
    );
  }

  const completedExercises = chapter.exercises.filter(
    (ex) => progress?.completedExercises[ex.id]?.passed
  ).length;
  const allComplete = completedExercises === chapter.exercises.length;

  const handleExerciseComplete = useCallback(
    (xpEarned: number, exerciseId: string) => {
      if (!progress) return;

      const exercise = chapter.exercises.find((ex) => ex.id === exerciseId);
      if (!exercise) return;

      const existing = progress.completedExercises[exerciseId];
      if (existing?.passed && existing.xpEarned >= xpEarned) return;

      const result = recordExerciseResult(exerciseId, {
        passed: true,
        xpEarned,
        attempts: 1,
        usedHint: false,
        completedAt: Date.now(),
        timeTaken: 0,
      });

      refreshProgress();

      const updatedCompleted = chapter.exercises.filter(
        (ex) => result?.completedExercises[ex.id]?.passed
      ).length;

      if (updatedCompleted === chapter.exercises.length && !result?.completedChapters.includes(chapter.id)) {
        markChapterComplete(chapter.id, chapter.xpBonus);
        refreshProgress();
        setChapterBonusToast({ xp: chapter.xpBonus, message: `Chapter ${chapter.number} complete!` });
      }
    },
    [progress, chapter, refreshProgress]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {chapterBonusToast && (
        <XPToast
          xp={chapterBonusToast.xp}
          message={chapterBonusToast.message}
          onDone={() => setChapterBonusToast(null)}
        />
      )}

      {/* Chapter header */}
      <div
        className="text-white py-12 px-6"
        style={{
          background: `linear-gradient(135deg, ${chapter.color}dd 0%, ${chapter.color}99 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/tutorial"
            className="text-white/70 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to chapters
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-5xl">{chapter.icon}</span>
            <div>
              <div className="text-white/60 text-sm font-mono mb-1">
                Chapter {chapter.number} • {chapter.difficulty}
              </div>
              <h1 className="text-3xl font-black">{chapter.title}</h1>
              <p className="text-white/80 mt-1">{chapter.subtitle}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Progress</span>
                <span>{completedExercises}/{chapter.exercises.length} exercises</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${chapter.exercises.length ? (completedExercises / chapter.exercises.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="text-yellow-300 font-bold text-sm">
              ⚡ {chapter.exercises.reduce((s, ex) => s + ex.xpReward, 0) + chapter.xpBonus} XP available
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-6 flex">
          {['lesson', 'exercises'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'lesson' | 'exercises')}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'lesson' ? '📖 Lesson' : `⚡ Exercises (${completedExercises}/${chapter.exercises.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Lesson Content */}
        {activeTab === 'lesson' && (
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6">
              <div className="lesson-content">
                <ReactMarkdown>{chapter.lessonContent}</ReactMarkdown>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setActiveTab('exercises')}
                className="px-8 py-4 text-white rounded-2xl font-bold text-lg transition-all shadow-lg"
                style={{ backgroundColor: chapter.color }}
              >
                Start Exercises ⚡
              </button>
            </div>
          </div>
        )}

        {/* Exercises */}
        {activeTab === 'exercises' && (
          <div className="space-y-6">
            {chapter.exercises.map((exercise) => (
              <ExercisePanel
                key={exercise.id}
                exercise={exercise}
                chapterId={chapter.id}
                onComplete={handleExerciseComplete}
                isCompleted={progress?.completedExercises[exercise.id]?.passed}
                previousXP={progress?.completedExercises[exercise.id]?.xpEarned}
              />
            ))}

            {/* Chapter Complete */}
            {allComplete && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-2xl font-black mb-2">Chapter Complete!</h3>
                <p className="text-white/80 mb-6">
                  You've mastered {chapter.title}. Keep going!
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {nextChapter ? (
                    <Link
                      href={`/tutorial/${nextChapter.id}`}
                      className="px-6 py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-colors"
                    >
                      Next: {nextChapter.title} →
                    </Link>
                  ) : (
                    <Link
                      href="/certificate"
                      className="px-6 py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-colors"
                    >
                      Get Certificate 📜
                    </Link>
                  )}
                  <Link
                    href="/tutorial"
                    className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-colors"
                  >
                    All Chapters
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
