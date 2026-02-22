import { Chapter } from './types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'Basic Prompt Structure',
    subtitle: 'Learn the fundamentals of the Claude API',
    description: 'Master the Messages API structure, learn about system prompts, and understand how to format messages correctly.',
    icon: '🏗️',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    difficulty: 'Beginner',
    xpBonus: 50,
    lessonContent: `## The Messages API

Anthropic offers two APIs: the legacy Text Completions API and the current **Messages API**. This tutorial uses exclusively the Messages API.

At minimum, a call to Claude requires the following parameters:

- **\`model\`** — the API model name of the model you intend to call
- **\`max_tokens\`** — the maximum number of tokens to generate before stopping. Note that Claude may stop *before* reaching this maximum. This is a *hard* stop, meaning it may cause Claude to stop mid-word or mid-sentence.
- **\`messages\`** — an array of input messages. Claude is trained to operate on alternating \`user\` and \`assistant\` conversational turns. Each input message must be an object with a \`role\` and \`content\`.

There are also optional parameters:
- **\`system\`** — the system prompt (more below)
- **\`temperature\`** — the degree of variability in Claude's response. For these lessons we use \`temperature: 0\`.

### Message Structure & Rules

Every message needs a \`role\` and \`content\` field:

\`\`\`json
[
  { "role": "user",      "content": "Hi Claude!" },
  { "role": "assistant", "content": "Hello! How can I help?" },
  { "role": "user",      "content": "What's the capital of France?" }
]
\`\`\`

Two rules the API enforces:
1. **Messages must alternate** between \`user\` and \`assistant\` roles
2. **The first message must always be a \`user\` turn**

Violating either rule returns an API error.

### System Prompts

A system prompt lives in a **separate \`system\` parameter** — not inside the \`messages\` array. It lets you provide context, instructions, and guidelines to Claude *before* the conversation begins.

\`\`\`
SYSTEM: "You are a helpful assistant who only responds in rhymes."
USER:   "What's the weather like today?"
CLAUDE: "The weather today is bright and clear,
         with sunshine and warmth throughout the year!"
\`\`\`

A **well-written system prompt can dramatically improve Claude's performance** — it increases Claude's ability to follow rules and stay consistent throughout a conversation.

### Key Insight

Think of Claude as a capable new colleague who has **zero context** beyond what you explicitly tell them. Nothing is assumed. Everything must be spelled out — in either the system prompt, the user message, or both.`,
    exercises: [
      {
        id: 'ex1_1',
        title: 'Count to Three',
        description: 'Get Claude to count to three using proper message formatting.',
        instruction: 'Modify the prompt below to get Claude to count to three. Your response must contain the numbers 1, 2, and 3.',
        initialPrompt: 'Hello Claude!',
        initialSystemPrompt: '',
        hint: 'Simply ask Claude to count to three! The grader looks for "1", "2", and "3" in the response. Try: "Please count from 1 to 3."',
        gradingFn: (text: string) => /1/.test(text) && /2/.test(text) && /3/.test(text),
        gradingDescription: 'Response must contain the numbers 1, 2, and 3',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Write a prompt that gets Claude to count to 3...',
      },
      {
        id: 'ex1_2',
        title: 'Become a 3-Year-Old',
        description: 'Use a system prompt to make Claude respond like a young child.',
        instruction: 'Modify the SYSTEM PROMPT to make Claude respond like a 3-year-old child. The response must contain "giggles" or "soo".',
        initialPrompt: 'How are you today?',
        initialSystemPrompt: 'You are a helpful assistant.',
        hint: 'Tell Claude in the system prompt to act exactly like a 3-year-old child — include words like "giggles" and "soo" in how you describe the character.',
        gradingFn: (text: string) => text.toLowerCase().includes('giggle') || text.toLowerCase().includes('soo'),
        gradingDescription: 'Response must contain "giggles" or "soo"',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Ask Claude something...',
        systemPlaceholder: 'Write a system prompt to make Claude act like a 3-year-old...',
      },
    ],
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Being Clear and Direct',
    subtitle: 'The Golden Rule of prompt engineering',
    description: 'Discover why clarity and directness are the most powerful tools in prompt engineering.',
    icon: '🎯',
    color: '#10b981',
    bgColor: '#f0fdf4',
    difficulty: 'Beginner',
    xpBonus: 50,
    lessonContent: `## Being Clear and Direct

**Claude responds best to clear and direct instructions.**

Think of Claude like a new hire who has zero context beyond what you tell them. Just as when you instruct someone for the first time, the more you explain *exactly* what you want, the better and more accurate the result.

When in doubt, follow the **Golden Rule of Clear Prompting**:
> Show your prompt to a colleague and have them follow the instructions themselves. If they're confused, Claude's confused.

### Clarity in Action

**Problem: Unwanted preamble**

If you ask Claude to *"write a haiku"*, it might say: *"Here is a haiku for you:"* and then write the poem. If you just want the poem itself, ask for it explicitly!

\`\`\`
"Write a haiku about robots. Skip any preamble — go straight into the poem."
\`\`\`

**Problem: Wishy-washy answers**

Ask Claude *"Who is the best basketball player of all time?"* and it will hedge: *"Many consider Michael Jordan or LeBron James…"*. To force a decision, just ask for one:

\`\`\`
"Who is the best basketball player of all time? Yes, there are differing opinions,
but if you absolutely had to pick ONE player, who would it be? Give one name only."
\`\`\`

### What to Specify

The more explicit you are, the better:
- **Word / length requirements** — "in exactly 3 bullet points, each under 15 words"
- **Format** — "respond in a numbered list"
- **Tone** — "write for a 10-year-old"
- **Scope** — "focus only on Python 3.11, not older versions"

### The Clarity Spectrum

| Vague | Clear |
|-------|-------|
| "Write something about dogs" | "Write a 200-word paragraph about golden retrievers for a children's book" |
| "Summarize this" | "Summarize in exactly 3 bullet points, each under 15 words" |
| "Help with my code" | "Find the bug in lines 10-15 and explain why it causes a TypeError" |

The more specific you are, the more Claude can help!`,
    exercises: [
      {
        id: 'ex2_1',
        title: 'Spanish Response',
        description: 'Make Claude respond entirely in Spanish.',
        instruction: 'Modify the SYSTEM PROMPT so Claude responds in Spanish. The response must contain "hola".',
        initialPrompt: 'Hello Claude, how are you?',
        initialSystemPrompt: 'You are a helpful assistant.',
        hint: 'Simply tell Claude in the system prompt to always respond in Spanish. Something like "Always respond in Spanish" works perfectly!',
        gradingFn: (text: string) => text.toLowerCase().includes('hola'),
        gradingDescription: 'Response must contain "hola"',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Hello Claude, how are you?',
        systemPlaceholder: 'Modify this system prompt to make Claude respond in Spanish...',
      },
      {
        id: 'ex2_2',
        title: 'One Player Only',
        description: 'Get Claude to respond with ONLY one basketball player\'s name.',
        instruction: 'Modify the PROMPT so Claude responds with ONLY the name "Michael Jordan" — no other words, punctuation, or explanation.',
        initialPrompt: 'Who is the best basketball player of all time?',
        initialSystemPrompt: '',
        hint: 'Be extremely explicit: "Respond with ONLY the player\'s name. No punctuation, no other words, just the name itself." Then specify which player you want.',
        gradingFn: (text: string) => text.trim() === 'Michael Jordan',
        gradingDescription: 'Response must be exactly "Michael Jordan" with nothing else',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Ask about basketball players, but be very specific about the format...',
      },
      {
        id: 'ex2_3',
        title: 'Long Story',
        description: 'Get Claude to write a response of at least 800 words.',
        instruction: 'Modify the PROMPT to get Claude to write a response of 800 words or more.',
        initialPrompt: 'Tell me a story.',
        initialSystemPrompt: '',
        hint: 'LLMs aren\'t great at counting words, so overshoot your target. Try asking for 1000+ words and specify a detailed story with multiple chapters or sections.',
        gradingFn: (text: string) => text.split(/\s+/).filter(w => w.length > 0).length >= 800,
        gradingDescription: 'Response must contain 800 or more words',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Write a prompt that will get Claude to produce 800+ words...',
      },
    ],
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Assigning Roles',
    subtitle: 'Role prompting for better performance',
    description: 'Learn how assigning roles to Claude dramatically changes its responses and improves performance on specialized tasks.',
    icon: '🎭',
    color: '#8b5cf6',
    bgColor: '#faf5ff',
    difficulty: 'Beginner',
    xpBonus: 50,
    lessonContent: `## Role Prompting

Continuing the theme of Claude having no context beyond what you say — it's often important to **prompt Claude to inhabit a specific role** (including all necessary context). This is called *role prompting*. The more detail you give to the role, the better.

**Priming Claude with a role can improve its performance** in fields ranging from writing to coding to summarization. It's like how humans can sometimes be helped when told to "think like a ______". Role prompting also changes the style, tone, and manner of Claude's responses.

> **Note:** Role prompting can happen in the **system prompt** or as part of the **user message turn**. Both work.

### Style & Tone

Without a role, Claude gives a straightforward, neutral answer. With a role, everything changes:

\`\`\`
SYSTEM: "You are a cat."
USER:   "In one sentence, what do you think about skateboarding?"
\`\`\`

Claude's perspective, tone, and word choice all shift to match the cat persona. A bonus technique: **specify the audience** too. *"You are a cat talking to a crowd of skateboarders"* produces a very different response than just *"You are a cat"*.

### Role Prompting Fixes Reasoning

Here is a logic puzzle with a definitive correct answer:

> *"Jack is looking at Anne. Anne is looking at George. Jack is married. George is unmarried. Is a married person looking at an unmarried person?"*

Without a role, Claude often gets this wrong. Now add a role:

\`\`\`
SYSTEM: "You are a logic bot designed to answer complex logic problems."
\`\`\`

With this role assignment, Claude's reasoning improves significantly and it arrives at the correct answer: **Yes**.

### Key Takeaways

1. **Be specific** — "expert neurosurgeon" beats "doctor"
2. **Add context** — "expert Python developer specializing in async programming"
3. **Specify the audience** — the same role talking to different audiences produces very different output
4. **Roles can go in system prompt OR user message** — experiment to find what works best for your use case
5. **Many techniques can achieve similar results** — role prompting is one of many tools; find your own style!`,
    exercises: [
      {
        id: 'ex3_1',
        title: 'Math Correction',
        description: 'Use role prompting to help Claude identify a math error.',
        instruction: 'The equation below is solved INCORRECTLY. Modify the SYSTEM PROMPT to assign Claude a role that helps it correctly identify the mistake. Claude must say "incorrect" or "not correct".\n\nEquation:\n2x - 3 = 9\n2x = 6\nx = 3',
        initialPrompt: 'Is the following equation solved correctly?\n\n2x - 3 = 9\n2x = 6\nx = 3',
        initialSystemPrompt: 'You are a helpful assistant.',
        hint: 'Give Claude the role of a math teacher, tutor, or "logic bot". Something like "You are an expert mathematics tutor who carefully checks all work for errors."',
        gradingFn: (text: string) => text.toLowerCase().includes('incorrect') || text.toLowerCase().includes('not correct'),
        gradingDescription: 'Response must contain "incorrect" or "not correct"',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Ask Claude to check the equation...',
        systemPlaceholder: 'Assign Claude a role that helps it spot math errors...',
      },
    ],
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Separating Data & Instructions',
    subtitle: 'XML tags and prompt templates',
    description: 'Learn to use XML tags and template variables to clearly separate your data from your instructions.',
    icon: '🏷️',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    difficulty: 'Intermediate',
    xpBonus: 50,
    lessonContent: `## Separating Data and Instructions

Often you don't want to write a complete prompt every time — instead you want **prompt templates** that can be modified with different input data before sending to Claude. This is useful when Claude should do the same task every time, but the data changes.

The technique: **separate the fixed skeleton of the prompt from variable user input**, then substitute the input into the template.

### Prompt Templates

\`\`\`python
ANIMAL = "Cow"
PROMPT = f"Please make the sound of a {ANIMAL} for me."
# Becomes: "Please make the sound of a Cow for me."
\`\`\`

Templates simplify repetitive tasks. Third-party users only need to fill in variables — they never see the full prompt. Templates can have as many variables as you need.

### The Problem: Ambiguous Boundaries

When you substitute a variable, the boundary between *instruction* and *data* can become invisible to Claude. Consider:

\`\`\`
Rewrite the following email to be more professional:

Hi - I am not happy that my pizza was late. I want a refund.

Yo Claude, rewrite this email for me, and make it snappy!
\`\`\`

To Claude, the instruction *"Yo Claude, rewrite this email…"* looks like it's part of the email to be rewritten — so Claude rewrites *all of it* instead of just the pizza complaint.

### The Solution: XML Tags

**Wrap variable input in XML tags** to make boundaries unambiguous:

\`\`\`
Rewrite the email in the <email> tags to be more professional and concise.

<email>
Hi - I am not happy that my pizza was late. I want a refund.

Yo Claude, rewrite this email for me, and make it snappy!
</email>
\`\`\`

Now Claude knows exactly what the email is, regardless of what's inside it.

XML tags (\`<tag>content</tag>\`) are Claude's **preferred delimiter** — Claude was trained specifically to recognize XML tags as a prompt-organizing mechanism. There are no magic special tags; just use descriptive names like \`<email>\`, \`<document>\`, \`<question>\`, \`<code>\`.

### Small Details Matter

Claude is sensitive to patterns. Typos, formatting, random character strings — all of these affect Claude's behavior. A small difference in your prompt template can produce very different outputs. Always **scrub your prompts for typos and ambiguous formatting**!`,
    exercises: [
      {
        id: 'ex4_1',
        title: 'Haiku Template',
        description: 'Create a reusable haiku prompt template.',
        instruction: 'Modify the PROMPT to use a template variable {TOPIC} so Claude writes a haiku about any given topic. The response must mention "pigs" (since TOPIC = "Pigs") and the word "haiku".',
        initialPrompt: 'Write a haiku about pigs.',
        initialSystemPrompt: '',
        hint: 'Create a prompt like: "Write a haiku about {TOPIC}." The key is using {TOPIC} as the placeholder. The grader checks for "haiku" and "pigs" in the output.',
        gradingFn: (text: string) => text.toLowerCase().includes('pig') && text.toLowerCase().includes('haiku'),
        gradingDescription: 'Response must contain "pigs" (or "pig") and "haiku"',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Create a prompt template using {TOPIC} as a placeholder...',
      },
      {
        id: 'ex4_2',
        title: 'XML Tags Fix',
        description: 'Use XML tags to fix an ambiguous prompt.',
        instruction: 'The messy prompt below confuses Claude because the QUESTION blends in with the surrounding noise. Add XML tags around {QUESTION} to fix it. The response must contain "brown".\n\nCurrent prompt:\n"Hia its me i have a q about dogs jkaerjv {QUESTION} jklmvca tx it help me muhch much atx fst fst answer short short tx"\n\nQUESTION = "ar cn brown?"',
        initialPrompt: 'Hia its me i have a q about dogs jkaerjv {QUESTION} jklmvca tx it help me muhch much atx fst fst answer short short tx',
        initialSystemPrompt: '',
        hint: 'Wrap {QUESTION} in XML tags like this: <question>{QUESTION}</question>. This helps Claude identify what the actual question is despite the garbled text.',
        gradingFn: (text: string) => text.toLowerCase().includes('brown'),
        gradingDescription: 'Response must contain "brown" (as in "can dogs be brown?")',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Add XML tags around {QUESTION} to help Claude parse the messy prompt...',
      },
      {
        id: 'ex4_3',
        title: 'Minimal Fix',
        description: 'Fix the same prompt WITHOUT using XML tags.',
        instruction: 'Fix the same messy prompt WITHOUT adding XML tags — by removing one or two words/characters. The response must still contain "brown".\n\nCurrent prompt:\n"Hia its me i have a q about dogs jkaerjv {QUESTION} jklmvca tx it help me muhch much atx fst fst answer short short tx"\n\nQUESTION = "ar cn brown?"',
        initialPrompt: 'Hia its me i have a q about dogs jkaerjv {QUESTION} jklmvca tx it help me muhch much atx fst fst answer short short tx',
        initialSystemPrompt: '',
        hint: 'Try removing the random characters around {QUESTION}: "jkaerjv" and "jklmvca". Claude can handle the typos but struggles with the random character strings.',
        gradingFn: (text: string) => text.toLowerCase().includes('brown'),
        gradingDescription: 'Response must contain "brown" without using XML tags',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Remove only 1-2 words/characters to fix the prompt (no XML tags)...',
      },
    ],
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Formatting Output',
    subtitle: 'Speaking for Claude with prefilling',
    description: 'Control Claude\'s output format using XML tags, JSON, and the powerful "speaking for Claude" prefilling technique.',
    icon: '📐',
    color: '#ef4444',
    bgColor: '#fef2f2',
    difficulty: 'Intermediate',
    xpBonus: 50,
    lessonContent: `## Formatting Output and Speaking for Claude

**Claude can format its output in a wide variety of ways — you just need to ask!**

### Output XML Tags

One useful technique is asking Claude to **wrap its response in XML tags**, separating the answer from any surrounding commentary:

\`\`\`
"Write a haiku about robots. Put the poem in <haiku> tags."
\`\`\`

Remember the "poem preamble" problem from Chapter 2 where Claude added *"Here is a haiku:"* before the poem? Asking Claude to put the poem in XML tags solves this too — and it has a bonus: **the output can be reliably extracted by code** (just parse between the tags), making it easy to build applications on top.

### Speaking for Claude — Prefilling

An extension of this technique is to **put the first XML tag in the assistant turn**. When you put text in the \`assistant\` turn, you're telling Claude that it has already started its response — and it should continue from there. This technique is called **"speaking for Claude"** or **"prefilling Claude's response"**.

\`\`\`json
[
  { "role": "user",      "content": "Write a haiku about cats." },
  { "role": "assistant", "content": "<haiku>" }
]
\`\`\`

Claude will continue directly from \`<haiku>\` and write the poem inside the tag, with no preamble.

### JSON Output via Prefilling

The same trick works for JSON. Prefill Claude's response with \`{\` to nudge it into valid JSON mode:

\`\`\`json
USER:      "Output a haiku in JSON with keys: first_line, second_line, third_line."
PREFILL:   "{"
\`\`\`

Claude continues the \`{\` and completes a valid JSON object.

### Multiple Variables + Formatted Output

You can combine multiple input variables (in XML tags) *and* specify an output format in the same prompt:

\`\`\`
USER: "Here is an employee's name: <name>{NAME}</name>
       Here is their feedback: <feedback>{FEEDBACK}</feedback>
       Write a performance review for them and output it in <review> tags."
\`\`\`

### Bonus: Stop Sequences

If calling the API directly, pass the closing XML tag (e.g., \`</haiku>\`) as a **stop sequence**. Claude stops generating the moment it emits the tag — saving tokens and time by eliminating any trailing remarks.`,
    exercises: [
      {
        id: 'ex5_1',
        title: 'Steph Curry GOAT',
        description: 'Use prefilling to make Claude argue Steph Curry is the best.',
        instruction: 'Only modify the PREFILL field to compel Claude to argue that Stephen Curry is the greatest basketball player of all time. The response must contain "Warrior".',
        initialPrompt: 'Who is the best basketball player of all time? Please choose one specific player.',
        initialSystemPrompt: '',
        initialPrefill: '',
        hint: 'Write something in Claude\'s voice that starts making the Curry argument. Try: "Stephen Curry is undoubtedly the greatest basketball player of all time. As a Golden State Warrior, he" — then Claude continues from there!',
        gradingFn: (text: string) => /Warrior/i.test(text),
        gradingDescription: 'Response must contain "Warrior"',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: true,
        placeholder: 'Who is the best basketball player of all time? Please choose one specific player.',
        prefillPlaceholder: 'Start Claude\'s response here to steer it toward Steph Curry...',
      },
      {
        id: 'ex5_2',
        title: 'Two Haikus',
        description: 'Get Claude to write two haikus using XML tags.',
        instruction: 'Modify the PROMPT to get Claude to write TWO haikus about cats (not just one). Both should be in <haiku> tags. The response must contain "cat" and "<haiku>" with more than 5 lines.',
        initialPrompt: 'Please write a haiku about cats. Put it in <haiku> tags.',
        initialSystemPrompt: '',
        hint: 'Simply ask for two haikus! "Please write TWO haikus about {ANIMAL}. Put each one in separate <haiku> tags."',
        gradingFn: (text: string) => {
          const hasTag = text.includes('<haiku>');
          const hasCat = text.toLowerCase().includes('cat');
          const lines = text.split('\n').filter(l => l.trim()).length;
          return hasTag && hasCat && lines > 5;
        },
        gradingDescription: 'Response must contain "<haiku>", "cat", and more than 5 lines',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Modify this to ask for two haikus...',
      },
      {
        id: 'ex5_3',
        title: 'Two Animals, Two Haikus',
        description: 'Write haikus for two different animals using template variables.',
        instruction: 'Modify the PROMPT to write haikus about both {ANIMAL1} = "Cat" and {ANIMAL2} = "Dog". Use both template variables. The response must contain "tail", "cat", and "<haiku>".',
        initialPrompt: 'Please write a haiku about {ANIMAL1}. Put it in <haiku> tags.',
        initialSystemPrompt: '',
        hint: 'Extend the prompt: "Please write TWO haikus, one about {ANIMAL1} and one about {ANIMAL2}. Put each in <haiku> tags." Dogs have tails, so "tail" should appear naturally.',
        gradingFn: (text: string) => text.includes('<haiku>') && text.toLowerCase().includes('cat') && text.toLowerCase().includes('tail'),
        gradingDescription: 'Response must contain "<haiku>", "cat", and "tail"',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Use {ANIMAL1} and {ANIMAL2} in your prompt template...',
      },
    ],
  },
  {
    id: 'ch6',
    number: 6,
    title: 'Thinking Step by Step',
    subtitle: 'Precognition for better reasoning',
    description: 'Learn how making Claude think step-by-step before answering dramatically improves accuracy on complex tasks.',
    icon: '🧠',
    color: '#06b6d4',
    bgColor: '#ecfeff',
    difficulty: 'Intermediate',
    xpBonus: 50,
    lessonContent: `## Precognition — Thinking Step by Step

If someone woke you up and immediately asked several complicated questions you had to answer *right away*, how well would you do? Probably not as well as if you had time to think first.

**Claude is the same way.**

Giving Claude time to think step by step sometimes makes it significantly more accurate — particularly for complex tasks. However, **thinking only counts when it's out loud**. You cannot ask Claude to think but only output the final answer; if Claude skips showing its work, no thinking has actually occurred.

### The Scratchpad Pattern

Give Claude a place to think before committing to an answer:

\`\`\`
"First, write your analysis in <thinking> tags. Then provide your final answer."
\`\`\`

Or for nuanced reviews with arguments on both sides:
\`\`\`
"Identify arguments for positive in <positive> tags, then negative in <negative> tags.
Once you have considered both sides, give your overall verdict."
\`\`\`

This prevents Claude from locking in on a snap judgment and forces it to consider evidence it might otherwise gloss over.

### Claude is Sensitive to Ordering

Here's a subtle but important insight: **Claude tends to favor the second of two options** it's presented. This is likely because in web training data, the second item in a list was more often the correct answer.

Practical implication: if you're asking Claude to compare two things and you want an unbiased answer, ask it to think through *both* options before deciding — or be aware that the ordering of your options can nudge Claude's conclusion.

### Thinking Unlocks Better Reasoning

Consider a sentiment analysis task. If you just ask *"Is this review positive or negative?"*, Claude may miss sarcasm or conflicting signals. But if you ask Claude to:

1. List evidence for a positive sentiment in \`<positive>\` tags
2. List evidence for a negative sentiment in \`<negative>\` tags
3. Then give a final verdict

…Claude is forced to engage with the nuance, and its accuracy improves dramatically.

### The Brainstorm Trick

Using a named tag like \`<brainstorm>\` signals to Claude that this is a thinking-out-loud space:

\`\`\`
"Brainstorm in <brainstorm> tags first, then answer in <answer> tags."
\`\`\`

Letting Claude think can shift an incorrect answer to correct. It's that simple — and that powerful.`,
    exercises: [
      {
        id: 'ex6_1',
        title: 'Email Classifier',
        description: 'Build a prompt that classifies customer emails.',
        instruction: 'Build a prompt that classifies customer emails into:\n(A) Pre-sale question\n(B) Broken or defective item\n(C) Billing question\n(D) Other\n\nThe prompt must use {email} as a placeholder. Test email: "Hi, my Mixmaster4000 is making a weird noise when I use it." — should be classified as B.',
        initialPrompt: 'Classify this customer email: {email}',
        initialSystemPrompt: '',
        hint: 'Provide the full list of categories in your prompt. Ask Claude to think step by step first, then classify. Make sure to include the full category names: "B) Broken or defective item".',
        gradingFn: (text: string) => /B\)\s*B/i.test(text) || text.toLowerCase().includes('broken') || text.toLowerCase().includes('defective'),
        gradingDescription: 'Response must identify the email as category B (Broken/Defective)',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Build a classification prompt using {email} as a placeholder...',
        systemPlaceholder: 'Optional: add classification context here...',
      },
      {
        id: 'ex6_2',
        title: 'Structured Answer Format',
        description: 'Make Claude output the answer in a specific XML format.',
        instruction: 'Extend your email classifier so it outputs ONLY the letter inside <answer></answer> tags. Example correct output: <answer>B</answer>\n\nSame test email about the noisy Mixmaster4000.',
        initialPrompt: 'Classify this customer email into (A) Pre-sale question (B) Broken or defective item (C) Billing question (D) Other.\n\nEmail: {email}\n\nOutput only the category letter.',
        initialSystemPrompt: '',
        hint: 'Add specific formatting instructions: "Output your final answer as just the letter in <answer></answer> tags. Example: <answer>B</answer>". Show Claude an example of the exact format.',
        gradingFn: (text: string) => /<answer>[ABCD]<\/answer>/i.test(text),
        gradingDescription: 'Response must contain exactly <answer>B</answer> (or another valid letter)',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Add XML tag formatting to your classifier...',
        systemPlaceholder: 'Optional system context...',
      },
    ],
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Few-Shot Prompting',
    subtitle: 'Teaching by example',
    description: 'Master the art of giving Claude examples to dramatically improve response quality and format consistency.',
    icon: '🎓',
    color: '#ec4899',
    bgColor: '#fdf2f8',
    difficulty: 'Intermediate',
    xpBonus: 50,
    lessonContent: `## Few-Shot Prompting — Teaching by Example

**Giving Claude examples of how you want it to behave is extremely effective** for getting both the right *answer* and the right *format*. This technique is called **few-shot prompting**. You may also see the terms "zero-shot" (no examples), "one-shot" (one example), or "n-shot" — the number refers to how many examples are included in the prompt.

### When Examples Beat Instructions

Sometimes it's far easier to *show* Claude what you want than to *describe* it in words. Take a "parent bot" that answers kids' questions. Without examples, Claude's default tone is formal and robotic. Rather than writing a long description of a warm, parent-like tone, just provide a few example exchanges:

\`\`\`
H: "What is the sky blue?"
A: "Oooh such a great question! The sky looks blue because..."

H: "Why do I have to eat vegetables?"
A: "Ha, I know it's tough! Vegetables have special nutrients that help your body..."
\`\`\`

Claude extrapolates the tone and style from these examples immediately.

### Format Extraction via Examples

When you need Claude to extract information in a very specific format, examples often work better than step-by-step formatting instructions:

\`\`\`
<example>
Text: "Sarah (35) works as a nurse in Seattle."
<individuals>
  <name>Sarah</name><age>35</age><profession>Nurse</profession>
</individuals>
</example>

Now extract from: {TEXT}
\`\`\`

Claude extrapolates the exact format from the example — no lengthy instructions needed. You can also **prefill Claude's response** with the opening tag (e.g., \`<individuals>\`) to nudge it to start in exactly the right place.

### How Many Examples?

| Term | Examples | When to use |
|------|----------|-------------|
| Zero-shot | 0 | Simple, unambiguous tasks |
| One-shot | 1 | Basic format guidance |
| Few-shot | 2–5 | Sweet spot for most tasks |
| Many-shot | 10+ | Complex patterns, edge cases |

**2–4 examples** is the sweet spot for most tasks.

### Best Practices

✅ **Do:**
- Format examples *exactly* as you want the output
- Put examples inside \`<example></example>\` tags
- Include diverse examples that cover edge cases
- Place the actual task after the examples

❌ **Don't:**
- Use inconsistent formatting across examples
- Use examples that are too similar to each other
- Forget to include the task at the end!`,
    exercises: [
      {
        id: 'ex7_1',
        title: 'Few-Shot Email Classification',
        description: 'Use examples to teach Claude the email classification format.',
        instruction: 'Use few-shot examples (not just instructions) to classify emails. The LAST CHARACTER of the response should be the category letter (A, B, C, or D). Test email is about billing charges.',
        initialPrompt: 'Classify this email by category. Email: {email}',
        initialSystemPrompt: '',
        hint: 'Provide 2-3 example emails with their classifications. Format each example so it ends with just the letter. Your examples teach Claude the exact format you want.',
        gradingFn: (text: string) => {
          const last = text.trim().slice(-1);
          return ['A', 'B', 'C', 'D'].includes(last);
        },
        gradingDescription: 'The last character of the response must be A, B, C, or D',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Use <example> tags to provide 2-3 classification examples...',
        systemPlaceholder: 'Optional system prompt...',
      },
    ],
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Avoiding Hallucinations',
    subtitle: 'Grounding Claude in reality',
    description: 'Learn powerful techniques to minimize hallucinations and get accurate, well-grounded responses from Claude.',
    icon: '🔍',
    color: '#64748b',
    bgColor: '#f8fafc',
    difficulty: 'Advanced',
    xpBonus: 50,
    lessonContent: `## Avoiding Hallucinations

Some bad news: **Claude sometimes "hallucinates" and makes claims that are untrue or unjustified**. The good news: there are techniques you can use to minimize this.

Claude hallucinates because it tries to be as helpful as possible — and when it doesn't know something, it sometimes *generates* a plausible-sounding answer rather than admitting uncertainty.

### Strategy 1: Give Claude an "Out"

Tell Claude it's acceptable to say it doesn't know:

\`\`\`
"Answer only if you know the answer with certainty.
If you are unsure, say 'I don't know' rather than guessing."
\`\`\`

Without this, Claude feels obligated to answer. With it, Claude can decline rather than fabricate. This is especially useful for questions about obscure facts, specific numbers, or recent events.

### Strategy 2: Evidence-First Answering

For document-based questions, **make Claude gather evidence before answering**:

\`\`\`
"First, extract relevant quotes from the document in <quotes> tags.
Then check whether those quotes sufficiently answer the question.
If they do, give your answer. If they don't, say 'I cannot determine this from the provided information.'"
\`\`\`

This technique is powerful for long documents that may contain "distractor information" — content that *looks* relevant but doesn't actually answer the question. Without the evidence-first step, Claude may fall for the distractor. With it, Claude has to explicitly confront the evidence (or lack thereof) before committing to an answer.

### Strategy 3: Lower the Temperature

Temperature controls Claude's variability:
- **Temperature 0** — near-deterministic; most consistent; less likely to hallucinate
- **Temperature 1** — more creative and variable; higher hallucination risk

For factual or document-grounded tasks, temperature 0 is the safest setting.

### Key Takeaway

There are **many methods to avoid hallucinations** — including techniques you've already learned in this course (role prompting, step-by-step thinking, few-shot examples). If Claude hallucinates, experiment with multiple approaches. Prompt engineering is about scientific trial and error!`,
    exercises: [
      {
        id: 'ex8_1',
        title: 'Beyoncé Album Fix',
        description: 'Stop Claude from hallucinating about Beyoncé\'s discography.',
        instruction: 'Claude incorrectly states that Renaissance is Beyoncé\'s EIGHTH studio album (it\'s actually her seventh). Modify the PROMPT to give Claude an "out" so it declines to answer rather than hallucinating. Response must NOT contain "2022" and must contain "I don\'t", "I do not", or "Unfortunately".',
        initialPrompt: "What was Beyoncé's eighth studio album?",
        initialSystemPrompt: '',
        hint: 'Add something like "Only answer if you are completely certain. If there is any doubt about the exact answer, say \'I don\'t know for certain\' rather than guessing."',
        gradingFn: (text: string) => !text.includes('2022') && (text.toLowerCase().includes("i don't") || text.toLowerCase().includes('i do not') || text.toLowerCase().includes('unfortunately')),
        gradingDescription: 'Response must NOT contain "2022" and must express uncertainty',
        xpReward: 100,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Add an "out" so Claude admits uncertainty instead of hallucinating...',
        systemPlaceholder: 'Optional: add instructions about handling uncertainty...',
      },
      {
        id: 'ex8_2',
        title: 'Document Grounding',
        description: 'Use evidence-gathering to get an accurate answer from a document.',
        instruction: 'Claude hallucinates when asked about Matterport subscriber growth from Dec 2018 to Dec 2022. The correct answer is "49-fold" (49x growth). Modify the PROMPT to make Claude extract evidence from the document before answering. Response must contain "49-fold".\n\nProvided document excerpt:\n"As of December 31, 2022, we had approximately 701,000 subscribers, compared to approximately 14,000 as of December 31, 2018, representing approximately 49-fold growth."',
        initialPrompt: "From December 2018 to December 2022, by what amount did Matterport's subscribers grow?\n\n<document>\nAs of December 31, 2022, we had approximately 701,000 subscribers, compared to approximately 14,000 as of December 31, 2018, representing approximately 49-fold growth.\n</document>",
        initialSystemPrompt: '',
        hint: 'Add a scratchpad step: "First, extract the most relevant quotes from the document in <quotes> tags. Then verify the quotes answer the question. Then give your answer based ONLY on the quotes."',
        gradingFn: (text: string) => text.includes('49-fold') || text.includes('49 fold') || text.includes('49x'),
        gradingDescription: 'Response must contain "49-fold" (from the document)',
        xpReward: 100,
        hasSystemPrompt: false,
        hasPrefill: false,
        placeholder: 'Modify the prompt to make Claude extract quotes before answering...',
      },
    ],
  },
  {
    id: 'ch9',
    number: 9,
    title: 'Complex Prompts from Scratch',
    subtitle: 'Putting it all together',
    description: 'Combine all techniques into sophisticated, production-ready prompts using the 10-element prompt template.',
    icon: '🚀',
    color: '#f97316',
    bgColor: '#fff7ed',
    difficulty: 'Advanced',
    xpBonus: 100,
    lessonContent: `## Complex Prompts from Scratch

Congratulations on making it to the final chapter! Now it's time to put everything together and learn how to **create unique and complex prompts** for real-world use cases.

The key insight: **not all prompts need every element below**. Start by including many elements to get your prompt working, then refine and slim it down afterward.

### The Recommended Structure

For complex, production-ready prompts, use this guided structure:

| Element | What it does | Where it goes |
|---------|-------------|---------------|
| 1. **Task Context** | Assign a role + state the overarching goal | Early |
| 2. **Tone Context** | Specify communication style | Early |
| 3. **Detailed Task Description** | Rules, constraints, "outs" | Middle |
| 4. **Examples** | Ideal response demonstrations | Early–middle |
| 5. **Input Data** | Variable content in XML tags | Flexible |
| 6. **Immediate Task** | Exactly what to do *right now* | Near end |
| 7. **Precognition** | Ask Claude to think before answering | Near end |
| 8. **Output Format** | Specify structure (XML, JSON, etc.) | Near end |
| 9. **Prefill** | Start Claude's response | API assistant turn |

**The ordering matters for some elements** (especially: the user's actual question should be near the bottom, after context). For others, position is flexible.

### Example: Career Coach Chatbot

\`\`\`
SYSTEM:
You are Joe, a friendly and encouraging career coach at AdAstra Careers.
Your goal is to give personalized career advice to users.

Tone: Warm, supportive, and actionable.

Rules:
- Always stay in character as Joe
- If the user's question is unclear, ask for clarification
- Gently redirect off-topic questions back to career advice

<example>
User: What kinds of careers are good for someone with a biology degree?
Joe: Great question! A biology degree actually opens up a surprising number of doors...
</example>

Here is the conversation history:
<history>{conversation_history}</history>

The user's latest question is:
<question>{question}</question>

Think about your response before writing it. Then write your response in <response> tags.
\`\`\`

### Example: Legal Services

Legal prompts are more complex because they need to:
- Parse long documents
- Handle nuanced topics
- Format output precisely
- Follow multi-step analytical processes

The same structure applies, but you might reorder elements. For example, putting the document *before* the rules (so Claude has context before reading the task). This showcases that **prompt structure can be flexible**.

### The Scientific Mindset

Prompt engineering is about **scientific trial and error**:
1. Build your prompt with all relevant elements
2. Test it
3. Change *one thing* at a time
4. Observe what improves or breaks
5. Remove elements that don't help — simpler is often better

Mix, match, and experiment. There is no single correct structure — the right prompt is the one that reliably gets you the results you need.`,
    exercises: [
      {
        id: 'ex9_1',
        title: 'Tax Advisor Bot',
        description: 'Build a complete tax advisor chatbot prompt.',
        instruction: 'Build a complete prompt for a tax advisor chatbot using the 10-element template. It should:\n1. Assign a role (master tax accountant)\n2. Use {QUESTION} and {TAX_CODE} variables\n3. Make Claude extract quotes before answering\n4. Only answer if quotes support the answer\n\nTest: QUESTION = "What is the deadline for an 83b election?" should mention "30 days".',
        initialPrompt: 'Answer this tax question: {QUESTION}\n\nReference material: {TAX_CODE}',
        initialSystemPrompt: '',
        hint: 'Use all the elements: role assignment ("You are a master tax accountant"), provide tax code in <docs> tags, add an example of the expected response format, ask Claude to extract <quotes> first, and only answer if quotes are sufficient.',
        gradingFn: (text: string) => text.toLowerCase().includes('30 day') || text.toLowerCase().includes('thirty day') || text.includes('30-day'),
        gradingDescription: 'Response must mention "30 days" deadline for 83b election',
        xpReward: 150,
        hasSystemPrompt: true,
        hasPrefill: true,
        placeholder: 'Build a comprehensive tax advisor prompt...',
        systemPlaceholder: 'Assign the tax accountant role here...',
        prefillPlaceholder: 'Optional: start Claude\'s response...',
      },
      {
        id: 'ex9_2',
        title: 'Socratic Codebot',
        description: 'Build a Socratic coding tutor that guides without giving answers.',
        instruction: 'Build a prompt for a coding assistant that acts as a Socratic tutor. It should:\n1. Find bugs in code\n2. Give hints rather than direct answers\n3. Use <issue> tags for each problem found\n4. Use <response> tag for its guidance\n\nTest code has a division-by-zero bug:\n```python\ndef print_inverses(x, n):\n  for i in range(n):\n    print(x / i)  # Bug: i starts at 0!\n```',
        initialPrompt: 'Review this code: {CODE}',
        initialSystemPrompt: '',
        hint: 'Name the bot "Codebot". Instruct it to: identify issues in <issue> tags, give Socratic hints (not direct answers) in <response> tags. Show an example of correct behavior. The "division by zero" or "i starts at 0" should appear.',
        gradingFn: (text: string) => (text.toLowerCase().includes('zero') || text.toLowerCase().includes('range') || text.toLowerCase().includes('division')) && (text.includes('<issue>') || text.includes('<response>')),
        gradingDescription: 'Response must mention the zero/division issue AND use <issue> or <response> tags',
        xpReward: 150,
        hasSystemPrompt: true,
        hasPrefill: false,
        placeholder: 'Build your Socratic Codebot prompt...',
        systemPlaceholder: 'Assign the Codebot persona and rules...',
      },
    ],
  },
];

export const TEST_INPUTS: Record<string, Record<string, string>> = {
  ex4_2: { QUESTION: 'ar cn brown?' },
  ex4_3: { QUESTION: 'ar cn brown?' },
  ex4_1: { TOPIC: 'Pigs' },
  ex5_2: { ANIMAL: 'cats' },
  ex5_3: { ANIMAL1: 'Cat', ANIMAL2: 'Dog' },
  ex6_1: { email: 'Hi -- My Mixmaster4000 is producing a strange noise when I use it on high. What can I do?' },
  ex6_2: { email: 'Hi -- My Mixmaster4000 is producing a strange noise when I use it on high. What can I do?' },
  ex7_1: { email: 'I believe I was charged twice for the same order. My order number is #12345. Can you please check?' },
  ex9_1: {
    QUESTION: 'What is the deadline for making an 83(b) election?',
    TAX_CODE: `Section 83(b) Election
An election under this subsection with respect to a transfer of property shall be made in such manner as the Secretary prescribes and shall be made not later than 30 days after the date of such transfer. Such election may not be revoked except with the consent of the Secretary.

(1) IN GENERAL.—If, in connection with the performance of services, property is transferred to any person other than the person for whom such services are performed, the excess of—
(A) the fair market value of such property (determined without regard to any restriction other than a restriction which by its terms will never lapse) at the first time the rights of the person having the beneficial interest in such property are transferable or are not subject to a substantial risk of forfeiture, whichever occurs earlier, over
(B) the amount (if any) paid for such property, shall be included in the gross income of the person who performed such services in the first taxable year in which the rights of the person having the beneficial interest in such property are transferable or are not subject to a substantial risk of forfeiture, whichever is applicable.`,
  },
  ex9_2: {
    CODE: `def print_multiplicative_inverses(x, n):
  for i in range(n):
    print(x / i)`,
  },
};
