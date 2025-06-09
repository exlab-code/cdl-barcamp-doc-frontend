export interface Node {
  id: string;
  type: 'session' | 'theme' | 'challenge' | 'question' | 'cross-challenge' | 'cross-concept' | 'concept' | 'example' | 'solution' | 'tool';
  label: string;
  slug: string;
  weight?: number;
  cluster?: string;
  size?: number;
  metadata?: {
    description?: string;
    keyPoints?: string[];
    documentPath?: string;
  };
}

export interface Edge {
  source: string;
  target: string;
  type: 'shares_theme' | 'shares_challenge' | 'related_topic' | 'affects' | 'challenges' | 'core-theme' | 'vision' | 'symptom' | 'explores' | 'primary' | 'example' | 'constrained-by' | 'motivates' | 'uses';
  strength: number;
  evidence: string[];
  story?: ConnectionStory;
}

export interface ConnectionStory {
  id: string;
  sourceTitle: string; // Full session title
  targetTitle: string; // Full session title
  title: string; // Connection title
  story: string; // Narrative explanation
  keyInsight?: string;
  quotes: {
    sessionTitle: string;
    text: string;
    link: string; // Direct link to session doc
  }[];
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export interface TooltipContent {
  node?: {
    title: string;
    type: string;
    keyPoints: string[];
    connections: number;
    strongestConnection: string;
  };
  edge?: {
    title: string;
    strength: string;
    preview: string; // First 150 chars of story
    clickForMore: boolean;
  };
}

// D3 specific types for force simulation
export interface D3Node extends Node {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
}

export interface D3Edge extends Omit<Edge, 'source' | 'target'> {
  source: D3Node | string;
  target: D3Node | string;
}
