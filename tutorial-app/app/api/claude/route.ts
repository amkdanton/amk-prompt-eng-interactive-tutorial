import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, systemPrompt, prefill, apiKey, provider } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Use Groq when provider is explicitly 'groq', or when no Anthropic key is available
    const useGroq =
      provider === 'groq' ||
      (provider !== 'anthropic' && !apiKey?.startsWith('sk-ant-') && !process.env.ANTHROPIC_API_KEY);

    if (useGroq) {
      const groqKey = apiKey || process.env.GROQ_API_KEY;
      if (!groqKey) {
        return NextResponse.json(
          {
            error: 'NO_API_KEY',
            message:
              "Add a free Groq API key in Settings (⚙ icon) to run exercises. Sign up at groq.com — it's free! Or add an Anthropic key for premium access.",
          },
          { status: 401 }
        );
      }

      const client = new OpenAI({
        apiKey: groqKey,
        baseURL: 'https://api.groq.com/openai/v1',
      });

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

      // Simulate Anthropic-style prefill via a system instruction
      let combinedSystem = systemPrompt || '';
      if (prefill) {
        const prefillInstruction = `Begin your response with exactly: "${prefill}"`;
        combinedSystem = combinedSystem
          ? `${combinedSystem}\n\n${prefillInstruction}`
          : prefillInstruction;
      }

      if (combinedSystem) {
        messages.push({ role: 'system', content: combinedSystem });
      }
      messages.push({ role: 'user', content: prompt });

      const response = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages,
      });

      const text = response.choices[0]?.message?.content || '';
      // Ensure response begins with prefill text (best-effort simulation)
      const finalText = prefill && !text.startsWith(prefill) ? prefill + text : text;

      return NextResponse.json({ text: finalText, model: 'llama-3.3-70b-versatile', provider: 'groq' });
    }

    // --- Anthropic path ---
    const resolvedKey = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!resolvedKey) {
      return NextResponse.json(
        {
          error: 'NO_API_KEY',
          message:
            'Please add your Anthropic API key in Settings (⚙ icon in the top bar), or use a free Groq key instead.',
        },
        { status: 401 }
      );
    }

    const client = new Anthropic({ apiKey: resolvedKey });

    const anthropicMessages: Anthropic.MessageParam[] = [{ role: 'user', content: prompt }];

    if (prefill) {
      anthropicMessages.push({ role: 'assistant', content: prefill });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: systemPrompt || undefined,
      messages: anthropicMessages,
    });

    const content = response.content[0];
    const text = content.type === 'text' ? content.text : '';

    return NextResponse.json({
      text: prefill ? prefill + text : text,
      model: 'claude-haiku-4-5',
      provider: 'anthropic',
    });
  } catch (error: unknown) {
    console.error('LLM API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to call AI API';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
