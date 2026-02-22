'use client';

import { useEffect, useState } from 'react';

interface XPToastProps {
  xp: number;
  message?: string;
  onDone: () => void;
}

export default function XPToast({ xp, message, onDone }: XPToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3">
        <span className="text-3xl">⚡</span>
        <div>
          <div className="font-black text-xl">+{xp} XP</div>
          {message && <div className="text-white/90 text-sm">{message}</div>}
        </div>
      </div>
    </div>
  );
}
