import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CandidateCompare } from '../components/CandidateCompare';
import { SAMPLE_CANDIDATES } from '../constants';
import { SEO } from '../components/SEO';

export default function CandidatesPage() {
  const [searchParams] = useSearchParams();
  const partyParam = searchParams.get('party');
  const roleParam = searchParams.get('role');

  const [initialParty] = useState(partyParam || 'All');
  const [initialRole] = useState(roleParam || 'All');
  const showSaved = searchParams.get('saved') === 'true';

  return (
    <div className="">
      <SEO 
        title="Candidate Hub" 
        description="Compare political candidates, research their platforms, and make an informed choice for the upcoming election." 
      />
      <div className="bg-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <CandidateCompare 
            candidates={SAMPLE_CANDIDATES} 
            initialPartyFilter={initialParty}
            initialRoleFilter={initialRole}
            showOnlySaved={showSaved}
          />
        </div>
      </div>
    </div>
  );
}
