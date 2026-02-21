'use client';

import { useState, useCallback } from 'react';
import { Exercise } from '@/lib/types';
import { calculateXPForExercise } from '@/lib/store';
import { TEST_INPUTS } from '@/lib/chapters';
import XPToast from './XPToast';

interface ExercisePanelProps {
  exercise: Exercise;
  chapterId: string;
  onComplete: (xpEarned: number, exerciseId: string) => void;
  isCompleted?: boolean;
  previousXP?: number;
}

function substituteVariables(prompt: string, exerciseId: string): string {
  const inputs = TEST_INPUTS[exerciseId];
  if (!inputs) return prompt;
  let result = prompt;
  for (const [key, value] of Object.entries(inputs)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

export default function ExercisePanel({
  exercise,
  chapterId,
  onComplete,
  isCompleted,
  previousXP,
}: ExercisePanelProps) {
  const [prompt, setPrompt] = useState(exercise.initialPrompt);
  const [systemPrompt, setSystemPrompt] = useState(exercise.initialSystemPrompt || '');
  const [prefill, setPrefill] = useState(exercise.initialPrefill || '');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [passed, setPassed] = useState(isCompleted || false);
  const [xpToast, setXpToast] = useState<{ xp: number; message: string } | null>(null);
  const [startTime] = useState(Date.now());

  const handleRun = useCallback(async () => {
    setLoading(true);
    setError('');
    setResponse('');

    const substituted = substituteVariables(prompt, exercise.id);
    const substitutedSystem = substituteVariables(systemPrompt, exercise.id);
    const substitutedPrefill = substituteVariables(prefill, exercise.id);

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: substituted,
          systemPrompt: substitutedSystem || undefined,
          prefill: substitutedPrefill || undefined,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const text = data.text;
      setResponse(text);
      setAttempts((a) => a + 1);

      const newAttempts = attempts + 1;
      const gradingResult = exercise.gradingFn(text);

      if (gradingResult && !passed) {
        setPassed(true);
        const xpEarned = calculateXPForExercise(newAttempts, hintUsed, exercise.xpReward);
        const timeTaken = Math.round((Date.now() - startTime) / 1000);

        onComplete(xpEarned, exercise.id);
        setXpToast({ xp: xpEarned, message: 'Exercise complete!' });
      }
    } catch {
      setError('Failed to connect to Claude. Check your API key configuration.');
    }

    setLoading(false);
  }, [prompt, systemPrompt, prefill, exercise, attempts, hintUsed, passed, onComplete, startTime]);

  const handleShowHint = () => {
    setShowHint(true);
    setHintUsed(true);
  };

  const variables = TEST_INPUTS[exercise.id];

  return (
    <div className={`rounded-2xl border-2 transition-all duration-300 ${
      passed
        ? 'border-green-400 bg-green-50'
        : 'border-slate-200 bg-white'
    }`}>
      {xpToast && (
        <XPToast
          xp={xpToast.xp}
          message={xpToast.message}
          onDone={() => setXpToast(null)}
        />
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                passed ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {passed ? '✓' : '!'}
              </span>
              <h3 className="font-bold text-slate-800 text-lg">{exercise.title}</h3>
            </div>
            <p className="text-slate-600 text-sm">{exercise.description}</p>
          </div>
          <div className="text-right">
            <div className="text-yellow-600 font-bold text-sm">⚡ {exercise.xpReward} XP</div>
            {previousXP && <div className="text-green-600 text-xs">Earned: {previousXP} XP</div>}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <div className="text-sm font-semibold text-blue-800 mb-1">🎯 Your Task</div>
          <div className="text-sm text-blue-700 whitespace-pre-wrap">{exercise.instruction}</div>
        </div>

        {/* Test Variables */}
        {variables && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
            <div className="text-xs font-semibold text-slate-500 mb-2">TEST VARIABLES (auto-substituted)</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(variables).map(([key, val]) => (
                <div key={key} className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs">
                  <span className="text-purple-600 font-mono font-bold">{'{' + key + '}'}</span>
                  <span className="text-slate-500"> = </span>
                  <span className="text-slate-700">"{typeof val === 'string' && val.length > 40 ? val.slice(0, 40) + '...' : val}"</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt Editors */}
        <div className="space-y-3 mb-4">
          {exercise.hasSystemPrompt && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                System Prompt
              </label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder={exercise.systemPlaceholder || 'Enter system prompt...'}
                className="w-full h-20 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm font-mono text-slate-800 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
              User Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={exercise.placeholder || 'Enter your prompt...'}
              className="w-full h-28 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {exercise.hasPrefill && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Prefill (Claude starts its response with this)
              </label>
              <textarea
                value={prefill}
                onChange={(e) => setPrefill(e.target.value)}
                placeholder={exercise.prefillPlaceholder || 'Prefill text...'}
                className="w-full h-16 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-sm font-mono text-slate-800 resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleRun}
            disabled={loading || !prompt.trim()}
            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Running...
              </span>
            ) : (
              '▶ Run Prompt'
            )}
          </button>

          {!showHint && !passed && (
            <button
              onClick={handleShowHint}
              className="px-4 py-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-50 rounded-xl font-medium text-sm transition-colors"
            >
              💡 Hint (-30% XP)
            </button>
          )}
        </div>

        {/* Hint */}
        {showHint && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <div className="text-sm font-semibold text-amber-800 mb-1">💡 Hint</div>
            <div className="text-sm text-amber-700">{exercise.hint}</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <div className="text-sm font-semibold text-red-700">Error</div>
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        {/* Response */}
        {response && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Claude's Response
              </label>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                exercise.gradingFn(response)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {exercise.gradingFn(response) ? '✓ Passed!' : '✗ Not quite'}
              </div>
            </div>
            <div className="bg-slate-900 text-green-300 rounded-xl p-4 text-sm font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
              {response}
            </div>
            {!exercise.gradingFn(response) && (
              <div className="mt-2 text-xs text-slate-500">
                <span className="font-semibold">Grading criteria:</span> {exercise.gradingDescription}
              </div>
            )}
          </div>
        )}

        {/* Attempts counter */}
        {attempts > 0 && (
          <div className="mt-3 text-xs text-slate-400 text-right">
            Attempts: {attempts}
          </div>
        )}
      </div>
    </div>
  );
}
