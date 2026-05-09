
export interface Candidate {
  id: string;
  name: string;
  party: string;
  role: string;
  contendingPlace: string;
  age: number;
  education: string;
  yearsInService: number;
  partySwaps: number;
  criminalRecords: string;
  deeds: string[];
  manifestoLink: string;
  platform: string[];
  issues: {
    economy: string;
    healthcare: string;
    environment: string;
    education: string;
    foreignPolicy: string;
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
  details?: string;
  link?: string;
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
