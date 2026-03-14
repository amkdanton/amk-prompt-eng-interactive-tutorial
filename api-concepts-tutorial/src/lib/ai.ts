export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  provider: "gemini" | "groq";
  error?: string;
}

export async function askAI(
  question: string,
  conceptTitle: string,
  history: AIMessage[] = []
): Promise<AIResponse> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, conceptTitle, history }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return res.json();
}
