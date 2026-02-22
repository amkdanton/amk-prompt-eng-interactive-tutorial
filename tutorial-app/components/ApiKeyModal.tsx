'use client';

import { useState, useEffect } from 'react';
import {
  getStoredAnthropicKey,
  getStoredGroqKey,
  saveAnthropicKey,
  saveGroqKey,
  getActiveProvider,
  hasConfiguredProvider,
} from '@/lib/providerStore';

// Backward-compat export used in Navbar
export { hasConfiguredProvider as getStoredApiKey };

interface ApiKeyModalProps {
  onClose: () => void;
}

type Tab = 'groq' | 'anthropic';

export default function ApiKeyModal({ onClose }: ApiKeyModalProps) {
  const [tab, setTab] = useState<Tab>('groq');
  const [groqKey, setGroqKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setGroqKey(getStoredGroqKey());
    setAnthropicKey(getStoredAnthropicKey());
    // Default to whichever tab is configured, preferring groq for new users
    setTab(getStoredAnthropicKey() ? 'anthropic' : 'groq');
  }, []);

  const currentKey = tab === 'groq' ? groqKey : anthropicKey;
  const setCurrentKey = tab === 'groq' ? setGroqKey : setAnthropicKey;
  const storedKey = tab === 'groq' ? getStoredGroqKey() : getStoredAnthropicKey();
  const activeProvider = getActiveProvider();

  const handleSave = () => {
    if (tab === 'groq') saveGroqKey(groqKey.trim());
    else saveAnthropicKey(anthropicKey.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  const handleClear = () => {
    if (tab === 'groq') { saveGroqKey(''); setGroqKey(''); }
    else { saveAnthropicKey(''); setAnthropicKey(''); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl p-7 w-full max-w-md mx-4">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white mb-1">AI Provider Settings</h2>
          <p className="text-zinc-400 text-sm">
            Choose a provider to run exercises. Both support all prompt engineering concepts.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-md border border-zinc-700 overflow-hidden mb-5 text-sm font-medium">
          <button
            onClick={() => setTab('groq')}
            className={`flex-1 py-2 flex items-center justify-center gap-2 transition-colors ${
              tab === 'groq'
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <span className="text-green-400 text-xs font-bold uppercase tracking-wide">Free</span>
            Groq
            {getStoredGroqKey() && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-0.5" />
            )}
            {activeProvider === 'groq' && !getStoredAnthropicKey() && (
              <span className="text-[10px] bg-teal-800 text-teal-300 px-1.5 py-0.5 rounded">active</span>
            )}
          </button>
          <button
            onClick={() => setTab('anthropic')}
            className={`flex-1 py-2 flex items-center justify-center gap-2 transition-colors ${
              tab === 'anthropic'
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wide">Premium</span>
            Anthropic
            {getStoredAnthropicKey() && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5" />
            )}
            {activeProvider === 'anthropic' && (
              <span className="text-[10px] bg-teal-800 text-teal-300 px-1.5 py-0.5 rounded">active</span>
            )}
          </button>
        </div>

        {/* Info box */}
        <div className="border border-zinc-700 bg-zinc-800/50 rounded-md p-4 mb-5 text-sm text-zinc-400">
          {tab === 'groq' ? (
            <>
              <strong className="text-zinc-300">Free tier with generous rate limits.</strong>
              <br />
              Sign up at{' '}
              <span className="font-mono bg-zinc-700 text-teal-400 px-1.5 py-0.5 rounded text-xs">groq.com</span>
              {' '}→ API Keys → Create. Key starts with{' '}
              <span className="font-mono bg-zinc-700 text-teal-400 px-1.5 py-0.5 rounded text-xs">gsk_</span>
              <br /><br />
              Runs on <strong className="text-zinc-300">Llama 3.3 70B</strong>. All prompt engineering
              concepts (zero-shot, few-shot, chain-of-thought, etc.) work the same way.
            </>
          ) : (
            <>
              <strong className="text-zinc-300">Uses real Claude models.</strong>
              <br />
              Visit{' '}
              <span className="font-mono bg-zinc-700 text-teal-400 px-1.5 py-0.5 rounded text-xs">console.anthropic.com</span>
              {' '}→ API Keys → Create. Key starts with{' '}
              <span className="font-mono bg-zinc-700 text-teal-400 px-1.5 py-0.5 rounded text-xs">sk-ant-</span>
              <br /><br />
              Unlocks <strong className="text-zinc-300">prefill</strong> (Anthropic-exclusive feature).
              When both keys are set, Anthropic is used automatically.
            </>
          )}
          <br />
          <strong className="text-zinc-300">Privacy:</strong> Keys are stored only in your browser&apos;s localStorage.
        </div>

        {/* Key input */}
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
          {tab === 'groq' ? 'Groq' : 'Anthropic'} API Key
        </label>
        <input
          type="password"
          value={currentKey}
          onChange={(e) => setCurrentKey(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder={tab === 'groq' ? 'gsk_...' : 'sk-ant-api03-...'}
          className="w-full px-4 py-2.5 border border-zinc-700 bg-zinc-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-md font-mono text-sm text-white placeholder-zinc-600 outline-none transition-colors mb-4"
          autoFocus
        />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!currentKey.trim()}
            className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-md font-medium text-sm transition-colors"
          >
            {saved ? 'Saved!' : 'Save Key'}
          </button>
          {storedKey && (
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
