export interface Exercise {
  id: string;
  title: string;
  description: string;
  instruction: string;
  initialPrompt: string;
  initialSystemPrompt?: string;
  initialPrefill?: string;
  hint: string;
  gradingFn: (text: string) => boolean;
  gradingDescription: string;
  xpReward: number;
  hasSystemPrompt: boolean;
  hasPrefill: boolean;
  placeholder?: string;
  systemPlaceholder?: string;
  prefillPlaceholder?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  exercises: Exercise[];
  lessonContent: string;
  xpBonus: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface UserProgress {
  username: string;
  totalXP: number;
  level: number;
  completedExercises: Record<string, ExerciseResult>;
  completedChapters: string[];
  badges: Badge[];
  startedAt: number;
  completedAt?: number;
}

export interface ExerciseResult {
  exerciseId: string;
  passed: boolean;
  xpEarned: number;
  attempts: number;
  usedHint: boolean;
  completedAt: number;
  timeTaken: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number;
}

export interface LeaderboardEntry {
  username: string;
  totalXP: number;
  level: number;
  completedChapters: number;
  completedAt?: number;
  rank?: number;
}

export const LEVELS = [
  { name: 'Novice', minXP: 0, color: '#94a3b8', emoji: '🌱' },
  { name: 'Apprentice', minXP: 300, color: '#60a5fa', emoji: '📚' },
  { name: 'Practitioner', minXP: 700, color: '#34d399', emoji: '⚡' },
  { name: 'Expert', minXP: 1200, color: '#f59e0b', emoji: '🔥' },
  { name: 'Master', minXP: 1800, color: '#a855f7', emoji: '🏆' },
  { name: 'Grandmaster', minXP: 2400, color: '#ec4899', emoji: '👑' },
];

export function getLevelFromXP(xp: number) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXP) level = l;
    else break;
  }
  return level;
}

export function getNextLevel(xp: number) {
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp < LEVELS[i].minXP) return LEVELS[i];
  }
  return null;
}

export function getXPProgress(xp: number) {
  const current = getLevelFromXP(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}
