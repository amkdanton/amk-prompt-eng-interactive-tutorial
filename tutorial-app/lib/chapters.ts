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

Claude uses a **Messages API** that requires three key parameters:

- **model**: The Claude model to use
- **max_tokens**: Maximum tokens Claude can generate
- **messages**: Array of messages with alternating \`user\` and \`assistant\` roles

### Message Structure

Every message needs a \`role\` and \`content\` field:

\`\`\`json
{ "role": "user", "content": "Hello, Claude!" }
\`\`\`

**Rules:**
- Messages must **alternate** between user and assistant roles
- The **first message** must always be from the user
- System prompts are **separate** from the messages array

### System Prompts

A system prompt provides context and instructions *before* the conversation starts. Well-written system prompts dramatically improve Claude's performance!

\`\`\`
SYSTEM: "You are a helpful assistant who always responds in rhymes."
USER: "What's the weather like?"
CLAUDE: "The weather today is bright and clear, with sunshine and warmth throughout the year!"
\`\`\`

### Key Insight

Think of Claude as a very capable colleague who only knows what you explicitly tell them. No context is assumed — everything must be spelled out in your prompt.`,
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
    lessonContent: `## The Golden Rule of Clear Prompting

> "Show your prompt to a colleague and have them follow the instructions. If they're confused, Claude's confused."

Claude has **no context** beyond what you explicitly provide. It doesn't know your intent, your background, or what you're trying to achieve — unless you tell it.

### Clarity Techniques

**1. Skip the preamble**
Instead of: *"Could you perhaps write a haiku?"*
Use: *"Write a haiku about robots. Skip the preamble; go straight into the poem."*

**2. Force definitive choices**
Instead of: *"Who is the best basketball player?"*
Use: *"Who is the best basketball player? Yes, there are differing opinions, but if you absolutely had to pick ONE player, who would it be?"*

**3. Specify exactly what you want**
- Word count requirements
- Format specifications
- Output language
- Level of detail

### The Clarity Spectrum

| Vague | Clear |
|-------|-------|
| "Write something about dogs" | "Write a 200-word informational paragraph about golden retrievers for a children's book" |
| "Summarize this" | "Summarize this in exactly 3 bullet points, each under 15 words" |
| "Help with my code" | "Identify the bug in lines 10-15 and explain why it causes a TypeError" |

The more specific you are, the better Claude can help!`,
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

Role prompting is one of the most powerful techniques in prompt engineering. By telling Claude to take on a specific role or persona, you can:

- **Change tone and style** — Claude as a pirate vs. Claude as a professor
- **Improve domain expertise** — Claude as a medical expert vs. general assistant
- **Fix logic problems** — "You are a logic bot" often fixes reasoning errors
- **Match your audience** — "You are explaining to a 5-year-old"

### How to Assign Roles

Roles can be assigned in the **system prompt** or the **user message**:

\`\`\`
SYSTEM: "You are an expert Python developer with 15 years of experience."
USER: "Review this code for security vulnerabilities."
\`\`\`

Or in the user message:
\`\`\`
USER: "As a world-class chef with expertise in French cuisine, explain how to make a perfect beurre blanc sauce."
\`\`\`

### Role Prompting Improves Logic

Here's a surprising example — without a role:
> *"Is a married person looking at an unmarried person?"*
> Claude might get this wrong!

With a role:
> *SYSTEM: "You are a logic bot designed to answer complex logic problems."*
> Claude gets it right!

### Tips for Effective Role Prompting

1. **Be specific** — "expert neurosurgeon" beats "doctor"
2. **Include context** — "expert in Python, specializing in async programming"
3. **Specify the audience** — "explain to a beginner with no coding experience"
4. **Multiple roles work** — "You are both a lawyer AND a tax expert"`,
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
    lessonContent: `## Separating Data from Instructions

One of the most important techniques is clearly **separating your data from your instructions**. This prevents Claude from confusing your content with your commands.

### Prompt Templates

Use variables as placeholders in your prompts:

\`\`\`python
ANIMAL = "Cow"
PROMPT = f"What noise does a {ANIMAL} make?"
\`\`\`

This lets you reuse the same prompt structure with different inputs.

### XML Tags as Delimiters

XML tags are Claude's superpower for organization. Claude was specifically trained to recognize and respect XML tags:

\`\`\`xml
<email>
Show up at 6am because I'm the CEO and I say so.
</email>

Make this email more polite without changing anything else.
\`\`\`

Without the tags, Claude might include your instructions in its rewrite. With the tags, it knows exactly what the email is.

### When to Use XML Tags

✅ **Use XML tags when:**
- Inserting user-provided data into a prompt
- The data might contain text that looks like instructions
- You have multiple pieces of data
- The data has unusual formatting

❌ **Skip XML tags when:**
- The data is very simple and unambiguous
- You're asking a simple direct question

### Choosing Tag Names

Tags should be **descriptive and relevant**:
- \`<email>\`, \`<document>\`, \`<question>\`, \`<code>\`
- \`<user_input>\`, \`<tax_code>\`, \`<legal_research>\`

No special schemas required — just make them meaningful!`,
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
    lessonContent: `## Formatting Claude's Output

### Output XML Tags

Ask Claude to wrap its output in XML tags for easy parsing:

\`\`\`
"Write a haiku about robots. Put it in <haiku> tags."
\`\`\`

Claude responds:
\`\`\`xml
<haiku>
Steel minds process dreams
Silicon thoughts flow like streams
Robots learn to feel
</haiku>
\`\`\`

### "Speaking for Claude" — Prefilling

The most powerful formatting technique is **prefilling** — putting text in Claude's "mouth" by adding content to the assistant's turn:

\`\`\`json
messages: [
  { "role": "user", "content": "Write a haiku about cats." },
  { "role": "assistant", "content": "<haiku>" }  // Prefill!
]
\`\`\`

Claude then *continues* from where you left off, ensuring the output starts with your tag.

### JSON Output

Prefilling with \`{\` forces Claude into JSON mode:

\`\`\`
USER: "Write a haiku in JSON with keys first_line, second_line, third_line"
ASSISTANT PREFILL: "{"
\`\`\`

Claude starts its response from the \`{\` and continues in valid JSON!

### Practical Uses

- Force a specific character to "speak" — \`[Detective Holmes]\`
- Lock in a specific opinion — \`"Stephen Curry is the GOAT because\`
- Ensure structured output — \`{"result":\`
- Guarantee format compliance — \`<response>\`

### Optimization: Stop Sequences

Use \`stop_sequences\` to end generation when a closing tag appears, saving tokens and time.`,
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
    lessonContent: `## Precognition — Making Claude Think First

Claude is much more accurate when it **thinks through** a problem before answering. This is called "precognition" or "chain-of-thought prompting."

### Why It Works

Without thinking:
> Claude makes snap judgments that are often wrong for nuanced questions.

With thinking:
> Claude builds a logical chain that leads to a correct conclusion.

### The Scratchpad Pattern

Give Claude space to "think aloud" using XML tags:

\`\`\`
"First, write your thoughts in <thinking> tags, then give your final answer."
\`\`\`

Or more specifically:
\`\`\`
"Consider both sides — write positive arguments in <positive> tags and negative ones in <negative> tags, then give your verdict."
\`\`\`

### Ordering Matters!

Claude is sensitive to order — it often favors the **second option** when presented with choices. Use this to your advantage:
- Put the option you want Claude to choose **second**
- Ask Claude to evaluate all options before deciding

### Structured Thinking Example

\`\`\`
Task: Classify this customer email into:
(A) Pre-sale question
(B) Defective item
(C) Billing question
(D) Other

First, identify the key topic in <thinking> tags.
Then output ONLY the letter in <answer> tags.
\`\`\`

This structured approach beats a simple "classify this email" prompt every time!`,
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
    lessonContent: `## Few-Shot Prompting — Learning from Examples

Few-shot prompting means providing **examples of what you want** before asking Claude to do the task. It's often more effective than lengthy descriptions.

### Why Examples Work

Examples teach Claude:
1. The **format** you want
2. The **tone** you want
3. The **level of detail** you want
4. How to handle **edge cases**

### Example Structure

\`\`\`
Here are some examples of how to classify emails:

<example>
EMAIL: "How much does shipping cost to Canada?"
ANSWER: A) Pre-sale question
</example>

<example>
EMAIL: "My blender stopped working after 2 days."
ANSWER: B) Broken or defective item
</example>

Now classify this email:
{email}
\`\`\`

### Number of Examples

- **0-shot**: No examples (just instructions)
- **1-shot**: One example
- **Few-shot**: 2-5 examples (sweet spot!)
- **Many-shot**: 10+ examples (for complex patterns)

For most tasks, **2-4 examples** hits the sweet spot.

### Best Practices

✅ **Do:**
- Format examples exactly as you want the output
- Include diverse examples covering edge cases
- Put examples in \`<example></example>\` tags
- Show the exact format you want at the end

❌ **Don't:**
- Use inconsistent formatting across examples
- Choose examples that are too similar
- Forget to include the actual task at the end

### Zero-Shot vs Few-Shot

Sometimes zero-shot (no examples) works fine. Add examples when:
- Output format matters precisely
- The task is subtle or non-obvious
- You're getting inconsistent results`,
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
    lessonContent: `## Hallucinations — What They Are and How to Fix Them

Claude sometimes **hallucinates** — confidently states things that aren't true. This happens because Claude tries to be helpful, even when it doesn't have sufficient information.

### Why Hallucinations Happen

1. **Overconfidence**: Claude tries to answer everything
2. **Pattern completion**: Claude predicts likely answers
3. **Training artifacts**: Conflated or confused training data

### Mitigation Strategy 1: Give Claude an "Out"

Tell Claude it's OK to say "I don't know":

\`\`\`
"Only answer if you know with certainty. If you're not sure, say 'I don't know' rather than guessing."
\`\`\`

### Mitigation Strategy 2: Evidence-First Answering

For document-based questions, make Claude gather evidence **before** answering:

\`\`\`
"First, extract relevant quotes from the document in <quotes> tags.
Then verify the quotes support your answer.
Only answer if the quotes are sufficient evidence."
\`\`\`

### Mitigation Strategy 3: Lower Temperature

Temperature 0 = more deterministic, less likely to hallucinate.

### The Scratchpad Technique

\`\`\`
Step 1: Extract quotes → <quotes>...</quotes>
Step 2: Check if quotes are sufficient
Step 3: If yes, give answer; if no, say "insufficient information"
\`\`\`

This forces Claude to confront its evidence (or lack thereof) before committing to an answer.

### Red Flags for Hallucination

- Very specific numbers/dates you haven't provided
- Famous people's lesser-known activities
- Highly specific factual claims
- Technical specifications you haven't verified`,
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
    lessonContent: `## The 10-Element Prompt Template

For complex, production-ready prompts, use this structured approach:

| Element | Purpose | Position |
|---------|---------|---------|
| 1. **Task Context** | Role + overarching goal | Early |
| 2. **Tone Context** | Communication style | Early |
| 3. **Task Description** | Specific rules + "outs" | Middle |
| 4. **Examples** | Ideal responses | Early-middle |
| 5. **Input Data** | Data in XML tags | Flexible |
| 6. **Immediate Task** | What to do right now | Near end |
| 7. **Precognition** | Think step-by-step | Near end |
| 8. **Output Format** | Specify structure | Near end |
| 9. **Prefilling** | Start Claude's response | API level |

### Example: Career Coach Chatbot

\`\`\`
SYSTEM: You are Joe, an AI career coach at AdAstra Careers.
Your goal is to give career advice.

TONE: Be friendly and encouraging.

RULES:
- Always stay in character as Joe
- If confused, ask for clarification
- Redirect off-topic questions to career advice

EXAMPLE:
<example>
User: What careers suit a biology degree?
Joe: Great question! Biology opens doors to...
</example>

INPUT:
<history>{conversation_history}</history>
<question>{user_question}</question>

IMMEDIATE: How do you respond to the user's question?

PRECOGNITION: Think about your answer before responding.

FORMAT: Put your response in <response> tags.
\`\`\`

### Key Insights

1. **Not every prompt needs all elements** — start with many, refine to what's needed
2. **Ordering is flexible** — but user's query should be near the bottom
3. **Iterate like a scientist** — change one thing at a time
4. **Slim down after testing** — remove elements that don't improve results`,
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
