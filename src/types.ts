
export interface Candidate {
  id: string;
  name: string;
  party: string;
  role: string;
  platform: string[];
  issues: {
    economy: string;
    healthcare: string;
    environment: string;
  };
  priorities: {
    name: string;
    value: number;
  }[];
  experience: string;
  image?: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'upcoming' | 'current' | 'completed';
}

export interface Representative {
  id: string;
  name: string;
  title: string;
  party: string;
  photoUrl?: string;
  contact: {
    email?: string;
    phone?: string;
    website?: string;
    office?: string;
  };
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}
