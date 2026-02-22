'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, getLevelFromXP } from '@/lib/types';
import { getProgress, saveProgress } from '@/lib/store';

interface ProgressContextType {
  progress: UserProgress | null;
  setProgress: (p: UserProgress) => void;
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType>({
  progress: null,
  setProgress: () => {},
  refreshProgress: () => {},
});

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressState] = useState<UserProgress | null>(null);

  const refreshProgress = () => {
    const p = getProgress();
    setProgressState(p);
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  const setProgress = (p: UserProgress) => {
    saveProgress(p);
    setProgressState(p);
  };

  return (
    <ProgressContext.Provider value={{ progress, setProgress, refreshProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
