"use client";

import { useState } from "react";
import { Play, Copy, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeExample } from "@/types";
import { cn } from "@/lib/utils";

interface CodePlaygroundProps {
  example: CodeExample;
}

export function CodePlayground({ example }: CodePlaygroundProps) {
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setShowOutput(true);
    }, 800);
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-200">{example.title}</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
            {example.language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          {example.runnable && (
            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="bg-green-600 hover:bg-green-700 text-white text-xs"
            >
              <Play className="w-3 h-3 mr-1" />
              {running ? "Running..." : "Run"}
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-2 bg-gray-900 border-b border-gray-700">
        <p className="text-xs text-gray-400">{example.description}</p>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm text-gray-100 leading-relaxed">
          <code>{example.code}</code>
        </pre>
      </div>

      {/* Output */}
      {showOutput && example.mockResponse && (
        <div className="border-t border-gray-700">
          <div className="px-4 py-2 bg-gray-800 flex items-center justify-between">
            <span className="text-xs font-medium text-green-400">▶ Output</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOutput(false)}
              className="text-gray-500 hover:text-gray-300 text-xs h-6 px-2"
            >
              ✕
            </Button>
          </div>
          <pre className="p-4 text-sm text-green-300 leading-relaxed bg-gray-900">
            <code>{example.mockResponse}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
