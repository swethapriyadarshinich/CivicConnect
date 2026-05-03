import { TimelineStep, Candidate } from './types';

export const ELECTION_TIMELINE: TimelineStep[] = [
  {
    id: '1',
    title: 'Registration Deadline',
    date: 'Oct 05, 2026',
    description: 'The final date to register to vote for the upcoming general election.',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Early Voting Starts',
    date: 'Oct 20, 2026',
    description: 'Select locations open for early ballot submission.',
    status: 'current'
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

const generateCandidates = (): Candidate[] => {
  const parties = ['Progressive Alliance', 'Constitutional Coalition', 'Liberty Front'];
  const baseFirstNames = ['Sarah', 'James', 'Alicia', 'Robert', 'Michael', 'Emma', 'David', 'Olivia', 'William', 'Sophia', 'Lucas', 'Mia', 'Alexander', 'Charlotte', 'Ethan'];
  const baseLastNames = ['Drumm', 'Mercer', 'Vance', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez'];
  const roles = ['County Representative', 'City Council', 'State Senator', 'Mayor', 'Governor', 'School Board'];
  const issueEconomy = [
    'Focus on green jobs and increased corporate taxes.',
    'Lower individual taxes and deregulation to spur small business growth.',
    'Targeted infrastructure spending to create jobs without raising taxes.',
    'Universal basic income and wealth tax.',
    'Free market solutions and crypto regulation.'
  ];
  const issueHealthcare = [
    'Universal coverage with expanded mental health services.',
    'Market-based solutions and expansion of health savings accounts.',
    'Protecting existing coverage while negotiating lower prescription costs.',
    'Medicare for All.',
    'State-managed healthcare pools for uninsured.'
  ];
  const issueEnvironment = [
    'Transition to 100% renewable energy by 2040 and strict emissions caps.',
    'Balanced approach focusing on energy independence and realistic goals.',
    'Incentivizing private companies to adopt sustainable practices.',
    'Green New Deal implementation globally.',
    'Nuclear energy expansion and carbon capture investments.'
  ];
  const backgrounds = [
    'Clean background check. Minor traffic violation (2018).',
    'Clean background check.',
    'Clean background check. No civil litigation.',
    'Clean background check. Minor zoning dispute (2015).'
  ];
  const platformsOptions = [
    ['Renewable Energy Transition', 'Universal Preschool', 'Public Transit Expansion'],
    ['Tax Reduction', 'Charter School Choice', 'Small Business Deregulation'],
    ['Government Transparency', 'Infrastructure Investment', 'Bipartisan Consensus'],
    ['Tech Innovation', 'Data Privacy Laws', 'Smart City Development'],
    ['Affordable Housing', 'Police Reform', 'Community Policing']
  ];
  
  const candidates: Candidate[] = [];
  let idCounter = 1;

  parties.forEach(party => {
    for (let i = 0; i < 100; i++) {
        const firstName = baseFirstNames[Math.floor(Math.random() * baseFirstNames.length)];
        const lastName = baseLastNames[Math.floor(Math.random() * baseLastNames.length)];
        const role = roles[Math.floor(Math.random() * roles.length)];
        
        candidates.push({
            id: `c${idCounter++}`,
            name: `${firstName} ${lastName}`,
            party: party,
            role: role,
            contendingPlace: `District ${Math.floor(Math.random() * 20) + 1}, State Area`,
            age: Math.floor(Math.random() * 50) + 25,
            education: 'B.A. Political Science, State University',
            yearsInService: Math.floor(Math.random() * 20),
            partySwaps: Math.floor(Math.random() * 3),
            criminalRecords: backgrounds[Math.floor(Math.random() * backgrounds.length)],
            deeds: ['Secured funding for local parks', 'Authored community growth plan', 'Led town hall initiatives'],
            manifestoLink: '#',
            platform: platformsOptions[Math.floor(Math.random() * platformsOptions.length)],
            issues: {
                economy: issueEconomy[Math.floor(Math.random() * issueEconomy.length)],
                healthcare: issueHealthcare[Math.floor(Math.random() * issueHealthcare.length)],
                environment: issueEnvironment[Math.floor(Math.random() * issueEnvironment.length)],
            },
            priorities: [
                { name: 'Economy', value: Math.floor(Math.random() * 40) + 60 },
                { name: 'Healthcare', value: Math.floor(Math.random() * 40) + 60 },
                { name: 'Environment', value: Math.floor(Math.random() * 40) + 60 },
            ],
            experience: `${Math.floor(Math.random() * 15) + 5} years in public and private sector leadership roles.`,
            image: `https://i.pravatar.cc/200?u=${idCounter}`
        });
    }
  });

  return candidates;
};

export const SAMPLE_CANDIDATES: Candidate[] = generateCandidates();
