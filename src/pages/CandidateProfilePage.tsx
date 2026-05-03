import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SAMPLE_CANDIDATES } from '../constants';
import { SEO } from '../components/SEO';
import { useBallot } from '../context/BallotContext';
import { ArrowLeft, ExternalLink, ChevronRight, User, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function CandidateProfilePage() {
  const { id } = useParams<{ id: string }>();
  const candidate = SAMPLE_CANDIDATES.find(c => c.id === id);
  const { toggleCandidate, isSaved } = useBallot();

  if (!candidate) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen">
        <h2 className="text-3xl font-black uppercase mb-4">Candidate Not Found</h2>
        <Link to="/candidates" className="text-blue-600 font-bold uppercase tracking-widest text-sm hover:underline">
          Return to Candidates
        </Link>
      </div>
    );
  }

  const saved = isSaved(candidate.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`${candidate.name} - ${candidate.role}`} 
        description={`Learn more about ${candidate.name}, contending for ${candidate.role}. Explore their platform, experience, and key accomplishments.`} 
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/candidates" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to candidates
        </Link>
        
        <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row border-b-4 border-slate-900">
            {/* Header Image */}
            <div className="w-full md:w-1/3 bg-slate-200 border-b-4 md:border-b-0 md:border-r-4 border-slate-900 aspect-square md:aspect-auto flex items-center justify-center relative">
              {candidate.image ? (
                <img src={candidate.image} alt={candidate.name} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <User className="w-24 h-24 text-slate-400" />
              )}
            </div>
            
            {/* Header Info */}
            <div className="p-8 md:p-12 w-full md:w-2/3 flex flex-col justify-center">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">{candidate.party}</span>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">{candidate.name}</h1>
              <p className="text-xl font-medium text-slate-600 uppercase tracking-tight mb-2">{candidate.role}</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{candidate.contendingPlace}</p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={candidate.manifestoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                  Read Manifesto
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => toggleCandidate(candidate.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-900 text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                    saved ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900'
                  }`}
                >
                  {saved ? (
                    <>
                      Saved to Ballot
                      <BookmarkCheck className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Add to Ballot
                      <Bookmark className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-12">
                <section>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-4">
                    Background & Education
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">Age</span>
                      <span className="font-medium">{candidate.age}</span>
                    </li>
                    <li>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">Education</span>
                      <span className="font-medium">{candidate.education}</span>
                    </li>
                    <li>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">Experience</span>
                      <span className="font-medium leading-relaxed block mt-1">{candidate.experience}</span>
                    </li>
                    <li>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase">Years in Service</span>
                      <span className="font-medium">{candidate.yearsInService}</span>
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-4">
                    Key Accomplishments
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h3>
                  <ul className="space-y-3">
                    {candidate.deeds.map((deed, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="font-medium text-slate-700 leading-relaxed">{deed}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-4">
                    Core Platform
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.platform.map((p, i) => (
                      <span key={i} className="px-3 py-2 bg-slate-100 border-2 border-slate-900 text-xs font-bold uppercase tracking-widest">{p}</span>
                    ))}
                  </div>
                </section>
              </div>
              
              {/* Right Column */}
              <div className="space-y-12">
                <section>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-4">
                    Issue Priorities
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h3>
                  <div className="space-y-6">
                    {candidate.priorities.map((prior, k) => (
                      <div key={k}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold uppercase tracking-widest">{prior.name}</span>
                          <span className="text-xs font-bold text-blue-600">{prior.value}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 border-2 border-slate-900">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${prior.value}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                            className="bg-blue-600 h-full border-r-2 border-slate-900" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-4">
                    Stances on Issues
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <span className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">Economy</span>
                      <p className="p-4 bg-slate-50 border-2 border-slate-900 font-medium text-slate-700 leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{candidate.issues.economy}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">Healthcare</span>
                      <p className="p-4 bg-slate-50 border-2 border-slate-900 font-medium text-slate-700 leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{candidate.issues.healthcare}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">Environment</span>
                      <p className="p-4 bg-slate-50 border-2 border-slate-900 font-medium text-slate-700 leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{candidate.issues.environment}</p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-4">
                    Public Records Transparency
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </h3>
                  <div className={`p-4 border-2 font-medium ${candidate.criminalRecords.includes('Clean') ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                    <span className="block text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Background Check Summary:</span>
                    {candidate.criminalRecords}
                  </div>
                  <div className="mt-4 p-4 border-2 border-slate-200 bg-slate-50 font-medium text-slate-700">
                    <span className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-slate-500">Party Swaps (Lifetime):</span>
                    {candidate.partySwaps} recorded
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
