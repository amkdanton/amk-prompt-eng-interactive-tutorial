"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { askAI } from "@/lib/ai";
import type { AIMessage } from "@/lib/ai";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  conceptTitle: string;
}

export function AIAssistant({ conceptTitle }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    `Can you give a real-world example of ${conceptTitle}?`,
    `What are common mistakes with ${conceptTitle}?`,
    `How does ${conceptTitle} relate to other API concepts?`,
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text?: string) {
    const question = text || input.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const response = await askAI(question, conceptTitle, messages);
      setMessages((prev) => [...prev, { role: "assistant", content: response.content }]);
      setProvider(response.provider);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect to the AI assistant. Please check your API keys." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-purple-200 overflow-hidden bg-white">
      {/* Header - always visible */}
      <button
        className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">AI Assistant</p>
            <p className="text-xs text-gray-500">Ask questions about {conceptTitle}</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-purple-100">
          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center mb-3">Suggested questions:</p>
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-2.5 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn("flex gap-2 items-start", msg.role === "user" && "flex-row-reverse")}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs",
                    msg.role === "user" ? "bg-blue-100" : "bg-purple-100"
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-purple-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-lg p-3 text-sm max-w-[85%]",
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Provider badge */}
          {provider && (
            <div className="px-4 py-1 bg-gray-50 border-t border-gray-100">
              <span className="text-xs text-gray-400">Powered by {provider}</span>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              size="icon"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
