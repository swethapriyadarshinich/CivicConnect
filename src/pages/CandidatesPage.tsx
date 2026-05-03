import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CandidateCompare } from '../components/CandidateCompare';
import { SAMPLE_CANDIDATES } from '../constants';

export default function CandidatesPage() {
  const [searchParams] = useSearchParams();
  const partyParam = searchParams.get('party');
  const roleParam = searchParams.get('role');

  const [initialParty] = useState(partyParam || 'All');
  const [initialRole] = useState(roleParam || 'All');

  // In real app, we could pass these initial filters to CandidateCompare 
  // if CandidateCompare accepted initial filters, but here we can just render CandidateCompare
  // and hopefully CandidateCompare can read from URL or we pass them as props.
  // We'll update CandidateCompare to take initial filter values.
  
  return (
    <div className="pt-20">
      <div className="bg-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <CandidateCompare 
            candidates={SAMPLE_CANDIDATES} 
            initialPartyFilter={initialParty}
            initialRoleFilter={initialRole}
          />
        </div>
      </div>
    </div>
  );
}
