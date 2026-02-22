import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  try {
    const { prompt, systemPrompt, prefill, apiKey } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Use the key from request body (user-provided), env var, or throw a helpful error
    const resolvedKey = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!resolvedKey) {
      return NextResponse.json(
        { error: 'NO_API_KEY', message: 'Please add your Anthropic API key in Settings (⚙ icon in the top bar).' },
        { status: 401 }
      );
    }

    const client = new Anthropic({ apiKey: resolvedKey });

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: prompt },
    ];

    if (prefill) {
      messages.push({ role: 'assistant', content: prefill });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: systemPrompt || undefined,
      messages,
    });

    const content = response.content[0];
    const text = content.type === 'text' ? content.text : '';

    return NextResponse.json({ text: prefill ? prefill + text : text });
  } catch (error: unknown) {
    console.error('Claude API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to call Claude API';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
