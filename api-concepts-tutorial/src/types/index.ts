export interface Concept {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: ConceptCategory;
  icon: string;
  color: string;
  explanation: string;
  keyPoints: string[];
  codeExample: CodeExample;
  quiz: QuizQuestion[];
  diagramSteps: DiagramStep[];
}

export type ConceptCategory =
  | "fundamentals"
  | "security"
  | "performance"
  | "architecture"
  | "documentation";

export interface CodeExample {
  language: string;
  title: string;
  code: string;
  description: string;
  runnable?: boolean;
  mockResponse?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DiagramStep {
  id: string;
  label: string;
  description: string;
  type: "client" | "server" | "service" | "database" | "gateway" | "token" | "arrow";
  from?: string;
  to?: string;
}

export interface UserProgress {
  completedConcepts: string[];
  quizScores: Record<string, number>;
  lastVisited: string | null;
}
