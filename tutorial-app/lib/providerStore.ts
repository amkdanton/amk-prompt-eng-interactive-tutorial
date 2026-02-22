'use client';

export type Provider = 'groq' | 'anthropic';

const GROQ_KEY = 'promptcraft_groq_key';
const ANTHROPIC_KEY = 'promptcraft_api_key'; // same key name for backward compat

export function getStoredAnthropicKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(ANTHROPIC_KEY) || '';
}

export function getStoredGroqKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GROQ_KEY) || '';
}

export function saveAnthropicKey(key: string) {
  if (typeof window === 'undefined') return;
  if (key) localStorage.setItem(ANTHROPIC_KEY, key);
  else localStorage.removeItem(ANTHROPIC_KEY);
}

export function saveGroqKey(key: string) {
  if (typeof window === 'undefined') return;
  if (key) localStorage.setItem(GROQ_KEY, key);
  else localStorage.removeItem(GROQ_KEY);
}

/** Anthropic takes priority when both keys are set (richer features). */
export function getActiveProvider(): Provider {
  if (getStoredAnthropicKey()) return 'anthropic';
  return 'groq';
}

export function hasConfiguredProvider(): boolean {
  return !!(getStoredAnthropicKey() || getStoredGroqKey());
}

/** Returns the API key for the active provider. */
export function getActiveApiKey(): string {
  if (getStoredAnthropicKey()) return getStoredAnthropicKey();
  return getStoredGroqKey();
}
