import { TimelineStep, Candidate } from './types';

export const ELECTION_TIMELINE: TimelineStep[] = [
  {
    id: '1',
    title: 'Voter Registration Deadline',
    date: 'Mar 15, 2029',
    description: 'The final date to register / verify your name in the electoral roll.',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Last Date for Nominations',
    date: 'Apr 04, 2029',
    description: 'Final deadline for candidates to file their nomination papers for the Lok Sabha elections.',
    status: 'current'
  },
  {
    id: '3',
    title: 'Polling Phase 1',
    date: 'Apr 19, 2029',
    description: 'First phase of voting begins across designated constituencies. Typically multi-phase.',
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Counting of Votes',
    date: 'Jun 04, 2029',
    description: 'EVMs are opened, votes are counted, and election results are officially declared by the ECI.',
    status: 'upcoming'
  }
];

const generateCandidates = (): Candidate[] => {
  const parties = ['Progressive Alliance', 'Conservative Front', 'Democratic Union', 'Liberty Party', 'National Unity Coalition'];
  const baseFirstNames = ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Arjun', 'Siddharth', 'Rahul', 'Rishabh', 'Amit', 'Rohan', 'Isha', 'Riya', 'Ananya', 'Diya', 'Roshni'];
  const baseLastNames = ['Patel', 'Sharma', 'Singh', 'Kumar', 'Reddy', 'Verma', 'Gupta', 'Desai', 'Rao', 'Yadav', 'Jain', 'Mehta', 'Chauhan', 'Nair', 'Menon'];
  const roles = ['Member of Parliament (MP)', 'Member of Legislative Assembly (MLA)', 'Mayor', 'Corporator / Councillor', 'Sarpanch', 'Zila Parishad Member'];
  const issueEconomy = [
    'Focus on MSME sector and increased subsidies.',
    'Lower individual taxes and FDI in key sectors.',
    'Targeted infrastructure spending to create jobs without raising taxes.',
    'Direct benefit transfers to poor households.',
    'Free market solutions and startup India push.'
  ];
  const issueHealthcare = [
    'Universal coverage with expanded village clinics (Mohalla Clinics).',
    'Expansion of Ayushman Bharat to all low-income families.',
    'Protecting existing coverage while negotiating lower prescription costs.',
    'Opening of AIIMS and super specialty branches in rural areas.',
    'State-managed healthcare pools for uninsured.'
  ];
  const issueEnvironment = [
    'International Solar Alliance goals and strict emissions caps.',
    'Balanced approach focusing on energy independence and Swachh Bharat.',
    'Incentivizing private companies to adopt sustainable practices and Namami Gange.',
    'Focus on EV (Electric Vehicles) subsidies across the state.',
    'Solar energy expansion and water conservation investments.'
  ];
  const issueEducation = [
    'Increasing education budget to 6% of GDP and boosting digital literacy.',
    'Implementation of the National Education Policy with local languages.',
    'Free education for women up to post-graduation.',
    'Upgrading rural school infrastructure and establishing more ITIs.',
    'Subsidies on student loans and strengthening skill development programs.'
  ];
  const issueForeignPolicy = [
    'Strategic autonomy and securing permanent UN Security Council seat.',
    'Strengthening relations with neighboring nations and prioritizing border security.',
    'Focusing on trade agreements and expanding foreign direct investments.',
    'Promoting a multipolar world and increasing foreign diaspora engagement.',
    'Non-alignment and focusing on global south leadership.'
  ];
  const backgrounds = [
    'Clean background check. Minor traffic violation (2018).',
    'Clean background check.',
    'Clean background check. No civil litigation.',
    'Clean background check. Minor zoning dispute (2015).'
  ];
  const platformsOptions = [
    ['Make in India Initiative', 'Free Electricity Scheme', 'Agricultural Relief'],
    ['Tax Exemption for Middle Class', 'Digital India Expansion', 'Smart Cities Mission'],
    ['Panchayati Raj Empowerment', 'Highway Infrastructure', 'Women Safety Bills'],
    ['Tech Innovation fund', 'Data Privacy Laws', 'Beti Bachao Beti Padhao'],
    ['Affordable Housing (PMAY)', 'Police Reform', 'Ayushman Bharat Expansion']
  ];
  
  const candidates: Candidate[] = [];
  let idCounter = 1;

  parties.forEach(party => {
    for (let i = 0; i < 100; i++) {
        const firstName = baseFirstNames[Math.floor(Math.random() * baseFirstNames.length)];
        const lastName = baseLastNames[Math.floor(Math.random() * baseLastNames.length)];
        const role = roles[Math.floor(Math.random() * roles.length)];
        
    const formalImages = [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
    ];

    candidates.push({
        id: `c${idCounter++}`,
        name: `${firstName} ${lastName}`,
        party: party,
        role: role,
        contendingPlace: `Constituency ${Math.floor(Math.random() * 543) + 1}, Lok Sabha`,
        age: Math.floor(Math.random() * 50) + 25,
        education: 'B.A. Political Science, Delhi University',
        yearsInService: Math.floor(Math.random() * 20),
        partySwaps: Math.floor(Math.random() * 3),
        criminalRecords: backgrounds[Math.floor(Math.random() * backgrounds.length)],
        deeds: ['Secured funding for local infrastructure', 'Authored constituency growth plan', 'Led community welfare initiatives'],
        manifestoLink: '#',
        platform: platformsOptions[Math.floor(Math.random() * platformsOptions.length)],
        issues: {
            economy: issueEconomy[Math.floor(Math.random() * issueEconomy.length)],
            healthcare: issueHealthcare[Math.floor(Math.random() * issueHealthcare.length)],
            environment: issueEnvironment[Math.floor(Math.random() * issueEnvironment.length)],
            education: issueEducation[Math.floor(Math.random() * issueEducation.length)],
            foreignPolicy: issueForeignPolicy[Math.floor(Math.random() * issueForeignPolicy.length)],
        },
        priorities: [
            { name: 'Economy', value: Math.floor(Math.random() * 40) + 60 },
            { name: 'Healthcare', value: Math.floor(Math.random() * 40) + 60 },
            { name: 'Environment', value: Math.floor(Math.random() * 40) + 60 },
        ],
        experience: `${Math.floor(Math.random() * 15) + 5} years in public and private sector leadership roles.`,
        image: formalImages[Math.floor(Math.random() * formalImages.length)]
    });
    }
  });

  return candidates;
};

export const SAMPLE_CANDIDATES: Candidate[] = generateCandidates();
