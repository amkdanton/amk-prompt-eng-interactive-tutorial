import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADERBOARD_FILE = path.join(process.cwd(), 'data', 'leaderboard.json');

interface LeaderboardEntry {
  username: string;
  totalXP: number;
  level: string;
  completedChapters: number;
  completedAt?: number;
  submittedAt: number;
}

function readLeaderboard(): LeaderboardEntry[] {
  try {
    if (!fs.existsSync(path.dirname(LEADERBOARD_FILE))) {
      fs.mkdirSync(path.dirname(LEADERBOARD_FILE), { recursive: true });
    }
    if (!fs.existsSync(LEADERBOARD_FILE)) {
      return [];
    }
    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeLeaderboard(entries: LeaderboardEntry[]) {
  if (!fs.existsSync(path.dirname(LEADERBOARD_FILE))) {
    fs.mkdirSync(path.dirname(LEADERBOARD_FILE), { recursive: true });
  }
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(entries, null, 2));
}

export async function GET() {
  const entries = readLeaderboard();
  const sorted = entries
    .sort((a, b) => b.totalXP - a.totalXP)
    .slice(0, 100)
    .map((entry, i) => ({ ...entry, rank: i + 1 }));
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, totalXP, level, completedChapters, completedAt } = body;

    if (!username || totalXP === undefined) {
      return NextResponse.json({ error: 'Username and totalXP are required' }, { status: 400 });
    }

    const entries = readLeaderboard();
    const existingIndex = entries.findIndex(
      (e) => e.username.toLowerCase() === username.toLowerCase()
    );

    const newEntry: LeaderboardEntry = {
      username,
      totalXP,
      level,
      completedChapters,
      completedAt,
      submittedAt: Date.now(),
    };

    if (existingIndex >= 0) {
      if (totalXP > entries[existingIndex].totalXP) {
        entries[existingIndex] = newEntry;
      }
    } else {
      entries.push(newEntry);
    }

    writeLeaderboard(entries);

    const sorted = entries.sort((a, b) => b.totalXP - a.totalXP);
    const rank = sorted.findIndex((e) => e.username.toLowerCase() === username.toLowerCase()) + 1;

    return NextResponse.json({ success: true, rank });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to update leaderboard' }, { status: 500 });
  }
}
