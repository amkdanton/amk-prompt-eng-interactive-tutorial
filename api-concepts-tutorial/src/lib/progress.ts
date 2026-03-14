import { UserProgress } from "@/types";

const STORAGE_KEY = "api_tutorial_progress";

export const defaultProgress: UserProgress = {
  completedConcepts: [],
  quizScores: {},
  lastVisited: null,
};

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markConceptComplete(slug: string): UserProgress {
  const progress = getProgress();
  if (!progress.completedConcepts.includes(slug)) {
    progress.completedConcepts.push(slug);
  }
  progress.lastVisited = slug;
  saveProgress(progress);
  return progress;
}

export function saveQuizScore(slug: string, score: number): UserProgress {
  const progress = getProgress();
  progress.quizScores[slug] = Math.max(score, progress.quizScores[slug] || 0);
  saveProgress(progress);
  return progress;
}

export function setLastVisited(slug: string): void {
  const progress = getProgress();
  progress.lastVisited = slug;
  saveProgress(progress);
}

export function resetProgress(): UserProgress {
  saveProgress(defaultProgress);
  return defaultProgress;
}
