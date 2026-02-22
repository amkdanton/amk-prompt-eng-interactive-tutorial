'use client';

import { getLevelFromXP, getNextLevel, getXPProgress, LEVELS } from '@/lib/types';

interface XPBarProps {
  xp: number;
  compact?: boolean;
}

export default function XPBar({ xp, compact = false }: XPBarProps) {
  const level = getLevelFromXP(xp);
  const nextLevel = getNextLevel(xp);
  const progress = getXPProgress(xp);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{level.emoji}</span>
        <div>
          <div className="text-xs font-bold text-white/90">{level.name}</div>
          <div className="flex items-center gap-1">
            <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: level.color }}
              />
            </div>
            <span className="text-xs text-white/70">{xp} XP</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{level.emoji}</span>
          <div>
            <div className="font-bold text-white">{level.name}</div>
            <div className="text-white/70 text-sm">{xp} XP total</div>
          </div>
        </div>
        {nextLevel && (
          <div className="text-right text-sm text-white/70">
            <div>{nextLevel.name} at {nextLevel.minXP} XP</div>
            <div>{nextLevel.minXP - xp} XP to go</div>
          </div>
        )}
      </div>
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${progress}%`, backgroundColor: level.color }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {LEVELS.map((l) => (
          <div
            key={l.name}
            className={`text-xs ${xp >= l.minXP ? 'text-white' : 'text-white/30'}`}
          >
            {l.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
