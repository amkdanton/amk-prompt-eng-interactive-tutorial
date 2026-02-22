'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'promptcraft_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function saveApiKey(key: string) {
  if (typeof window === 'undefined') return;
  if (key) localStorage.setItem(STORAGE_KEY, key);
  else localStorage.removeItem(STORAGE_KEY);
}

interface ApiKeyModalProps {
  onClose: () => void;
}

export default function ApiKeyModal({ onClose }: ApiKeyModalProps) {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setKey(getStoredApiKey());
  }, []);

  const handleSave = () => {
    saveApiKey(key.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  const handleClear = () => {
    saveApiKey('');
    setKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl p-7 w-full max-w-md mx-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-1">Anthropic API Key</h2>
          <p className="text-zinc-400 text-sm">Required to run prompts against Claude</p>
        </div>

        <div className="border border-zinc-700 bg-zinc-800/50 rounded-md p-4 mb-5 text-sm text-zinc-400">
          <strong className="text-zinc-300">Where to get one:</strong> Visit{' '}
          <span className="font-mono bg-zinc-700 text-teal-400 px-1.5 py-0.5 rounded text-xs">console.anthropic.com</span>{' '}
          &rarr; API Keys &rarr; Create Key. It starts with{' '}
          <span className="font-mono bg-zinc-700 text-teal-400 px-1.5 py-0.5 rounded text-xs">sk-ant-</span>
          <br /><br />
          <strong className="text-zinc-300">Privacy:</strong> Stored only in your browser&apos;s localStorage. Never logged server-side.
        </div>

        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
          API Key
        </label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="sk-ant-api03-..."
          className="w-full px-4 py-2.5 border border-zinc-700 bg-zinc-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-md font-mono text-sm text-white placeholder-zinc-600 outline-none transition-colors mb-4"
          autoFocus
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-md font-medium text-sm transition-colors"
          >
            {saved ? 'Saved' : 'Save Key'}
          </button>
          {getStoredApiKey() && (
            <button
              onClick={handleClear}
              className="px-4 py-2.5 border border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-800 rounded-md font-medium text-sm transition-colors"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 rounded-md font-medium text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
