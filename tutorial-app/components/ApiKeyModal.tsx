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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🔑</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">Anthropic API Key</h2>
            <p className="text-slate-500 text-sm">Required to run prompts against Claude</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-700">
          <strong>Where to get one:</strong> Visit{' '}
          <span className="font-mono bg-blue-100 px-1 rounded">console.anthropic.com</span>{' '}
          → API Keys → Create Key. The key starts with{' '}
          <span className="font-mono bg-blue-100 px-1 rounded">sk-ant-</span>
          <br /><br />
          <strong>Privacy:</strong> Your key is stored only in your browser's localStorage and sent directly to the Anthropic API. It is never logged.
        </div>

        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
          API Key
        </label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="sk-ant-api03-..."
          className="w-full px-4 py-3 border-2 border-slate-200 focus:border-purple-400 rounded-xl font-mono text-sm outline-none transition-colors mb-4"
          autoFocus
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={!key.trim()}
            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all"
          >
            {saved ? '✓ Saved!' : 'Save Key'}
          </button>
          {getStoredApiKey() && (
            <button
              onClick={handleClear}
              className="px-4 py-3 border-2 border-red-200 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-3 border-2 border-slate-200 text-slate-500 hover:bg-slate-50 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
