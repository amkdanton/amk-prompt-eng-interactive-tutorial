"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiagramStep } from "@/types";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  client: "bg-blue-100 border-blue-400 text-blue-800",
  server: "bg-green-100 border-green-400 text-green-800",
  service: "bg-purple-100 border-purple-400 text-purple-800",
  database: "bg-orange-100 border-orange-400 text-orange-800",
  gateway: "bg-yellow-100 border-yellow-400 text-yellow-800",
  token: "bg-pink-100 border-pink-400 text-pink-800",
  arrow: "bg-gray-100 border-gray-400 text-gray-700",
};

const typeIcons: Record<string, string> = {
  client: "💻",
  server: "🖥️",
  service: "⚙️",
  database: "🗄️",
  gateway: "🚪",
  token: "🎫",
  arrow: "→",
};

interface ConceptDiagramProps {
  steps: DiagramStep[];
  title?: string;
}

export function ConceptDiagram({ steps, title }: ConceptDiagramProps) {
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  function play() {
    setActiveStep(-1);
    setIsPlaying(true);
  }

  useEffect(() => {
    if (!isPlaying) return;

    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= steps.length) {
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  function reset() {
    setActiveStep(-1);
    setIsPlaying(false);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {title && <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>}

      {/* Diagram */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2">
            {/* Step box */}
            <div
              className={cn(
                "flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 min-w-20",
                typeStyles[step.type] || typeStyles.server,
                activeStep === index
                  ? "scale-110 shadow-lg ring-2 ring-offset-2 ring-blue-400"
                  : activeStep > index
                  ? "opacity-90"
                  : "opacity-60"
              )}
            >
              <span className="text-2xl mb-1">{typeIcons[step.type]}</span>
              <span className="text-xs font-semibold text-center leading-tight">{step.label}</span>
            </div>

            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "text-gray-400 font-bold text-lg transition-all duration-300",
                  activeStep > index ? "text-blue-500" : ""
                )}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active step description */}
      <div className="min-h-10 mb-4">
        {activeStep >= 0 && activeStep < steps.length && (
          <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3 animate-pulse-once">
            <span className="font-semibold text-gray-800">{steps[activeStep].label}:</span>{" "}
            {steps[activeStep].description}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={play}
          disabled={isPlaying}
          size="sm"
          className="gap-2"
        >
          <Play className="w-3 h-3" />
          {isPlaying ? "Animating..." : "Animate Flow"}
        </Button>
        <Button variant="outline" size="sm" onClick={reset} className="gap-2">
          <RotateCcw className="w-3 h-3" />
          Reset
        </Button>
      </div>
    </div>
  );
}
