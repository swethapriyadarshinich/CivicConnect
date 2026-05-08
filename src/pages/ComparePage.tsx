import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, User, ArrowLeft, Plus } from 'lucide-react';
import { SAMPLE_CANDIDATES } from '../constants';
import { SEO } from '../components/SEO';

export default function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const idsParam = searchParams.get('ids');
  const selectedIds = idsParam ? idsParam.split(',') : [];
  
  const selectedCandidates = SAMPLE_CANDIDATES.filter(c => selectedIds.includes(c.id));
  
  // Find other candidates not in the selected list, maybe from the same party or role of the first candidate
  const firstCandidate = selectedCandidates[0];
  const otherCandidates = SAMPLE_CANDIDATES.filter(c => !selectedIds.includes(c.id))
    .sort((a, b) => {
       if (firstCandidate) {
         const aMatch = (a.role === firstCandidate.role ? 1 : 0) + (a.party === firstCandidate.party ? 1 : 0);
         const bMatch = (b.role === firstCandidate.role ? 1 : 0) + (b.party === firstCandidate.party ? 1 : 0);
         return bMatch - aMatch;
       }
       return 0;
    })
    .slice(0, 3); // show top 3 suggestions

  const removeCandidate = (idToRemove: string) => {
    const newIds = selectedIds.filter(id => id !== idToRemove);
    if (newIds.length === 0) {
      navigate('/candidates');
    } else {
      setSearchParams({ ids: newIds.join(',') });
    }
  };

  const addCandidate = (idToAdd: string) => {
    let newIds = [...selectedIds];
    if (newIds.length >= 3) {
      // Replace the last one if we're already at max
      newIds[2] = idToAdd;
    } else {
      newIds.push(idToAdd);
    }
    setSearchParams({ ids: newIds.join(',') });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <SEO 
        title="Compare Candidates" 
        description="Side-by-side comparison of political candidates."
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link to="/candidates" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 mb-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Candidates
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
              Candidate Comparison
            </h1>
          </div>
          {selectedIds.length < 3 && (
            <div className="bg-blue-100 text-blue-800 px-4 py-2 border-2 border-blue-200 text-xs font-black uppercase tracking-widest">
              You can add {3 - selectedIds.length} more candidate{3 - selectedIds.length > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {selectedCandidates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-slate-500 mb-6">No candidates selected for comparison.</p>
            <Link to="/candidates" className="px-6 py-3 bg-blue-600 text-white font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-slate-900 hover:bg-blue-700 transition-all">
              Go to Candidate Hub
            </Link>
          </div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 text-white border-4 border-slate-900 p-4 md:p-8 lg:p-12 overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="flex flex-col gap-4 border-b border-slate-800 pb-4 mb-4 md:hidden">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scroll horizontally to compare candidates</p>
              </div>
              <div className="flex flex-col md:flex-row gap-12 relative z-10 w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                        <th className="p-4 border-b-2 border-slate-700 w-1/4"></th>
                        {selectedCandidates.map(c => (
                          <th key={c.id} className="p-4 border-b-2 border-slate-700 align-bottom w-1/4 min-w-[250px]">
                            <div className="flex flex-col items-start gap-4">
                              <div className="flex items-center justify-between w-full">
                                <div className="w-16 h-16 bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                                  {c.image ? <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" /> : <User className="w-8 h-8 text-white/50" />}
                                </div>
                                <button onClick={() => removeCandidate(c.id)} className="px-2 py-1 bg-slate-800 border-2 border-slate-700 text-[10px] uppercase font-black tracking-widest text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors">
                                  Remove
                                </button>
                              </div>
                              <div>
                                <Link to={`/candidate/${c.id}`} className="hover:text-blue-400 transition-colors">
                                  <h4 className="text-2xl font-black uppercase inline-flex items-center gap-2">
                                    {c.name}
                                    <ChevronRight className="w-4 h-4 opacity-50" />
                                  </h4>
                                </Link>
                                <p className="text-blue-400 uppercase font-bold text-[10px] tracking-widest">{c.party} | {c.role}</p>
                                <p className="text-slate-500 uppercase font-bold text-[9px] tracking-widest mt-1">Age: {c.age} | {c.contendingPlace}</p>
                              </div>
                            </div>
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                      <tr>
                        <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-800">Background & Service</th>
                        {selectedCandidates.map(c => (
                          <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium">
                            <p className="mb-2"><span className="text-[10px] font-bold uppercase text-slate-500 block">Education:</span> {c.education}</p>
                            <p className="mb-2"><span className="text-[10px] font-bold uppercase text-slate-500 block">Years in Service:</span> {c.yearsInService}</p>
                            <p><span className="text-[10px] font-bold uppercase text-slate-500 block">Experience:</span> {c.experience}</p>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-800">Core Platform</th>
                        {selectedCandidates.map(c => (
                          <td key={c.id} className="p-4 align-top">
                            <ul className="space-y-2">
                              {c.platform.map((p, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm">
                                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-200 font-medium">{p}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-800">Key Policy: Economy</th>
                        {selectedCandidates.map(c => (
                          <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium whitespace-pre-wrap">
                            {c.issues.economy}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-800">Key Policy: Healthcare</th>
                        {selectedCandidates.map(c => (
                          <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium whitespace-pre-wrap">
                            {c.issues.healthcare}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-800">Key Policy: Environment</th>
                        {selectedCandidates.map(c => (
                          <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium whitespace-pre-wrap">
                            {c.issues.environment}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-800">Priorities</th>
                        {selectedCandidates.map(c => (
                          <td key={c.id} className="p-4 align-top">
                            <div className="space-y-4 max-w-[200px]">
                              {c.priorities.map((prior, k) => (
                                <div key={k}>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold uppercase text-slate-300">{prior.name}</span>
                                    <span className="text-[10px] font-bold text-blue-400">{prior.value}%</span>
                                  </div>
                                  <div className="w-full bg-slate-800 h-2 border border-slate-700">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${prior.value}%` }}
                                      transition={{ duration: 1, ease: 'easeOut' }}
                                      className="bg-blue-600 h-full" 
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Suggestions */}
            {otherCandidates.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Related Candidates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {otherCandidates.map(c => (
                    <motion.div 
                      key={c.id} 
                      whileHover={{ y: -2 }}
                      className="bg-white p-6 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <img src={c.image} alt={c.name} className="w-12 h-12 border-2 border-slate-900 object-cover" />
                          <div>
                            <h4 className="font-black text-xl uppercase leading-tight">{c.name}</h4>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{c.party}</span>
                          </div>
                        </div>
                        <p className="text-sm font-bold uppercase text-slate-600 mb-6">{c.role}</p>
                      </div>
                      
                      <button 
                        onClick={() => addCandidate(c.id)}
                        className="w-full py-3 bg-blue-50 border-2 border-blue-200 text-blue-700 font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add to Compare
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
