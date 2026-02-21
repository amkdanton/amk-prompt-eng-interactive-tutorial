'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/components/ProgressProvider';
import { initProgress } from '@/lib/store';
import { CHAPTERS } from '@/lib/chapters';
import { LEVELS } from '@/lib/types';

const FEATURES = [
  { icon: '🎮', title: 'Gamified Learning', desc: 'Earn XP, level up, and unlock badges as you master each technique' },
  { icon: '⚡', title: 'Real Claude API', desc: 'Test your prompts against real Claude responses instantly' },
  { icon: '🏆', title: 'Leaderboard', desc: 'Compete with other learners and claim the top spot' },
  { icon: '📜', title: 'Certificate', desc: 'Earn a personalized certificate of completion with your score' },
];

export default function HomePage() {
  const router = useRouter();
  const { progress, setProgress, refreshProgress } = useProgress();
  const [username, setUsername] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleStart = () => {
    if (!username.trim()) return;
    const p = initProgress(username.trim());
    setProgress(p);
    router.push('/tutorial');
  };

  const totalXP = CHAPTERS.reduce(
    (sum, ch) => sum + ch.exercises.reduce((s, ex) => s + ex.xpReward, 0) + ch.xpBonus,
    0
  );

  const completedExercises = progress
    ? Object.values(progress.completedExercises).filter((e) => e.passed).length
    : 0;
  const totalExercises = CHAPTERS.reduce((sum, ch) => sum + ch.exercises.length, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Powered by Claude AI • 9 Chapters • {totalExercises} Interactive Exercises
          </div>

          <h1 className="text-6xl font-black mb-6 leading-tight">
            Master{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Prompt Engineering
            </span>
            <br />
            The Fun Way
          </h1>

          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Level up your AI skills through hands-on exercises, earn XP, climb the leaderboard,
            and earn a certificate — all while learning real prompting techniques used by professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {progress ? (
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white/10 rounded-2xl px-6 py-3 text-sm">
                  Welcome back, <strong>{progress.username}</strong>! You have {progress.totalXP} XP.
                  ({completedExercises}/{totalExercises} exercises done)
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/tutorial"
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-purple-500/30"
                  >
                    Continue Learning →
                  </Link>
                  <button
                    onClick={() => { setShowForm(true); }}
                    className="px-6 py-4 border-2 border-white/30 hover:bg-white/10 rounded-2xl font-medium transition-all"
                  >
                    New Player
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-purple-500/30"
                  >
                    Start Your Journey 🚀
                  </button>
                ) : (
                  <div className="flex gap-3 justify-center">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                      placeholder="Enter your username..."
                      className="px-6 py-4 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
                      autoFocus
                    />
                    <button
                      onClick={handleStart}
                      disabled={!username.trim()}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 rounded-2xl font-bold text-lg transition-all"
                    >
                      Let's Go!
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-sm text-white/60">
            <div><span className="text-white font-bold text-2xl">{totalXP}+</span><br/>Total XP available</div>
            <div><span className="text-white font-bold text-2xl">9</span><br/>Chapters</div>
            <div><span className="text-white font-bold text-2xl">{totalExercises}</span><br/>Exercises</div>
            <div><span className="text-white font-bold text-2xl">6</span><br/>Rank levels</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-800 mb-3">Why PromptCraft Academy?</h2>
          <p className="text-slate-500">Learn by doing, not just reading</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{f.icon}</div>
              <div className="font-bold text-slate-800 mb-1">{f.title}</div>
              <div className="text-sm text-slate-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Levels */}
      <div className="bg-gradient-to-r from-slate-900 to-purple-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Your Rank Journey</h2>
            <p className="text-white/60">Progress from Novice to Grandmaster</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {LEVELS.map((level, i) => (
              <div
                key={level.name}
                className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-6 py-4 border border-white/20"
              >
                <span className="text-3xl">{level.emoji}</span>
                <div>
                  <div className="text-white font-bold">{level.name}</div>
                  <div className="text-white/60 text-sm">{level.minXP}+ XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Overview */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-800 mb-3">9 Chapters of Expert Knowledge</h2>
          <p className="text-slate-500">From basic structure to complex, production-ready prompts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHAPTERS.map((ch) => (
            <div
              key={ch.id}
              className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundColor: ch.color }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{ch.icon}</span>
                    <span className="text-xs font-bold text-slate-400">CH {ch.number}</span>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ backgroundColor: ch.bgColor, color: ch.color }}
                  >
                    {ch.difficulty}
                  </span>
                </div>
                <div className="font-bold text-slate-800 mb-1">{ch.title}</div>
                <div className="text-xs text-slate-500 mb-3">{ch.subtitle}</div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{ch.exercises.length} exercises</span>
                  <span className="text-yellow-600 font-medium">
                    ⚡ {ch.exercises.reduce((s, ex) => s + ex.xpReward, 0) + ch.xpBonus} XP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {progress ? (
            <Link
              href="/tutorial"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg"
            >
              Continue Learning →
            </Link>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg"
            >
              Start Now — It's Free! 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
