import { TimelineStep, Candidate } from './types';

export const ELECTION_TIMELINE: TimelineStep[] = [
  {
    id: '1',
    title: 'Registration Deadline',
    date: 'Oct 05, 2026',
    description: 'The final date to register to vote for the upcoming general election.',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Early Voting Starts',
    date: 'Oct 20, 2026',
    description: 'Select locations open for early ballot submission.',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Election Day',
    date: 'Nov 03, 2026',
    description: 'General election day. Most polling locations are open 7 AM - 7 PM.',
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Results Certified',
    date: 'Nov 15, 2026',
    description: 'Official certification of the election results by the state board.',
    status: 'upcoming'
  }
];

export const SAMPLE_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Sarah Drumm',
    party: 'Progressive Alliance',
    role: 'County Representative',
    platform: ['Renewable Energy Transition', 'Universal Preschool', 'Public Transit Expansion'],
    issues: {
      economy: 'Focus on green jobs and increased corporate taxes.',
      healthcare: 'Universal coverage with expanded mental health services.',
      environment: 'Transition to 100% renewable energy by 2040 and strict emissions caps.',
    },
    priorities: [
      { name: 'Environment', value: 95 },
      { name: 'Healthcare', value: 85 },
      { name: 'Economy', value: 70 },
    ],
    experience: '12 years in civil engineering and community planning.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'c2',
    name: 'James Mercer',
    party: 'Constitutional Coalition',
    role: 'County Representative',
    platform: ['Tax Reduction', 'Charter School Choice', 'Small Business Deregulation'],
    issues: {
      economy: 'Lower individual taxes and deregulation to spur small business growth.',
      healthcare: 'Market-based solutions and expansion of health savings accounts.',
      environment: 'Balanced approach focusing on energy independence and realistic goals.',
    },
    priorities: [
      { name: 'Economy', value: 90 },
      { name: 'Defense', value: 80 },
      { name: 'Healthcare', value: 65 },
    ],
    experience: 'Small business owner and former President of the local Chamber of Commerce.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'c3',
    name: 'Alicia Vance',
    party: 'Independent',
    role: 'County Representative',
    platform: ['Government Transparency', 'Infrastructure Investment', 'Bipartisan Consensus'],
    issues: {
      economy: 'Targeted infrastructure spending to create jobs without raising taxes.',
      healthcare: 'Protecting existing coverage while negotiating lower prescription costs.',
      environment: 'Incentivizing private companies to adopt sustainable practices.',
    },
    priorities: [
      { name: 'Infrastructure', value: 85 },
      { name: 'Economy', value: 80 },
      { name: 'Environment', value: 75 },
    ],
    experience: '10 years as an investigative journalist and policy analyst.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
  }
];
