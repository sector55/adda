
export interface QuizAnswers {
  [key: string]: string;
}

export interface Perfume {
  name: string;
  notes: string;
  description: string;
  visualTheme: string;
  imageUrl?: string;
}

export interface ScentProfile {
  profileTitle: string;
  profileDescription: string;
  personalityTraits: string[];
  recommendedNotes: string[];
  perfumes: Perfume[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}