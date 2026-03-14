import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  question: string;
  conceptTitle: string;
  history: Message[];
}

const SYSTEM_PROMPT = `You are an expert API educator helping developers learn about API concepts.
You explain concepts clearly with practical examples. Keep responses concise (2-4 paragraphs max).
When showing code, use markdown code blocks. Be encouraging and helpful.`;

async function tryGemini(body: RequestBody): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("No Gemini API key");

  const messages = [
    ...body.history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    {
      role: "user",
      parts: [{ text: `[Context: Learning about "${body.conceptTitle}"] ${body.question}` }],
    },
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages,
        generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error: ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function tryGroq(body: RequestBody): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("No Groq API key");

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...body.history,
    {
      role: "user",
      content: `[Context: Learning about "${body.conceptTitle}"] ${body.question}`,
    },
  ];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq error: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    // Try Gemini first
    try {
      const content = await tryGemini(body);
      return NextResponse.json({ content, provider: "gemini" });
    } catch (geminiError) {
      console.warn("Gemini failed, falling back to Groq:", geminiError);
    }

    // Fallback to Groq
    try {
      const content = await tryGroq(body);
      return NextResponse.json({ content, provider: "groq" });
    } catch (groqError) {
      console.error("Both AI providers failed:", groqError);
      return NextResponse.json(
        {
          content:
            "AI assistant is currently unavailable. Please check your API keys in the environment variables (GEMINI_API_KEY or GROQ_API_KEY).",
          provider: "groq",
          error: "Both providers unavailable",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
