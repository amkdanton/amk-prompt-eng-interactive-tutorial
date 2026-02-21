# PromptCraft Academy

An interactive, gamified prompt engineering tutorial web app built with Next.js and powered by Claude AI.

## Features

- **9 Chapters** of structured prompt engineering lessons
- **19 Interactive Exercises** with real Claude API integration
- **Gamification**: XP points, 6 rank levels (Novice → Grandmaster), badges
- **Leaderboard**: Compete with other learners
- **Certificate**: Downloadable completion certificate with your score and rank
- **Hints System**: Get help at the cost of some XP

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your Anthropic API key

Copy the example env file and add your key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Get your API key at: https://console.anthropic.com

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Course Content

Based on Anthropic's official prompt engineering tutorial, covering:

| Chapter | Topic | Difficulty |
|---------|-------|------------|
| 1 | Basic Prompt Structure | Beginner |
| 2 | Being Clear and Direct | Beginner |
| 3 | Assigning Roles | Beginner |
| 4 | Separating Data & Instructions | Intermediate |
| 5 | Formatting Output | Intermediate |
| 6 | Thinking Step by Step | Intermediate |
| 7 | Few-Shot Prompting | Intermediate |
| 8 | Avoiding Hallucinations | Advanced |
| 9 | Complex Prompts from Scratch | Advanced |

## Scoring System

- **Exercise XP**: 100-150 XP per exercise
- **Chapter Bonus**: 50-100 XP for completing all exercises in a chapter
- **Hint Penalty**: -30% XP if you use a hint
- **Attempt Penalty**: -15% per extra attempt (after the first)

## Rank Levels

| Level | XP Required |
|-------|-------------|
| Novice | 0+ |
| Apprentice | 300+ |
| Practitioner | 700+ |
| Expert | 1,200+ |
| Master | 1,800+ |
| Grandmaster | 2,400+ |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Anthropic Claude API (claude-haiku-4-5)
- **Certificate**: html2canvas
- **Storage**: localStorage (progress) + JSON file (leaderboard)
