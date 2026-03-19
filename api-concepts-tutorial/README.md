# Quanta

**Quanta** is an interactive tutorial app for learning 20 essential API concepts — through code playgrounds, animated diagrams, quizzes, flashcards, and AI-powered explanations.

## Features

- **20 API concepts** across 5 categories: Fundamentals, Security, Performance, Architecture, Documentation
- **Interactive code playground** — run and experiment with live examples
- **Animated diagrams** — visualize how concepts work
- **Quizzes & flashcards** — test and reinforce your knowledge
- **AI assistant** — ask questions powered by Google Gemini and Groq
- **Progress tracking** — pick up where you left off

## Tech Stack

- [Next.js 16](https://nextjs.org/) + TypeScript
- [React 19](https://react.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
- [Google Generative AI (Gemini)](https://aistudio.google.com/)
- [Groq](https://groq.com/)
- [Radix UI](https://www.radix-ui.com/) + [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/amkdanton/system-design-sensie.git
cd system-design-sensie
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

- Get a **Gemini API key**: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- Get a **Groq API key**: [console.groq.com/keys](https://console.groq.com/keys)

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

Deploy instantly on [Vercel](https://vercel.com):

1. Import `amkdanton/system-design-sensie` on Vercel
2. Add `GEMINI_API_KEY` and `GROQ_API_KEY` as environment variables
3. Deploy
