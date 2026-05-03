import React, { createContext, useContext, useState, useEffect } from 'react';

interface BallotContextType {
  savedCandidates: string[];
  toggleCandidate: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const BallotContext = createContext<BallotContextType | undefined>(undefined);

export const BallotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedCandidates, setSavedCandidates] = useState<string[]>(() => {
    const saved = localStorage.getItem('civic-ballot');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('civic-ballot', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const toggleCandidate = (id: string) => {
    setSavedCandidates(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedCandidates.includes(id);

  return (
    <BallotContext.Provider value={{ savedCandidates, toggleCandidate, isSaved }}>
      {children}
    </BallotContext.Provider>
  );
};

export const useBallot = () => {
  const context = useContext(BallotContext);
  if (context === undefined) {
    throw new Error('useBallot must be used within a BallotProvider');
  }
  return context;
};
