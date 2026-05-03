import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Candidate } from '../types';
import { Search, ChevronRight, User } from 'lucide-react';

interface Props {
  candidates: Candidate[];
}

export const CandidateCompare: React.FC<{ candidates: Candidate[], initialPartyFilter?: string, initialRoleFilter?: string }> = ({ 
  candidates, 
  initialPartyFilter = 'All', 
  initialRoleFilter = 'All' 
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [partyFilter, setPartyFilter] = React.useState(initialPartyFilter);
  const [roleFilter, setRoleFilter] = React.useState(initialRoleFilter);

  const parties = ['All', ...Array.from(new Set(candidates.map(c => c.party)))];
  const roles = ['All', ...Array.from(new Set(candidates.map(c => c.role)))];

  const toggleSelect = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id].slice(-3)
    );
  };

  const selectedCandidates = candidates.filter(c => selected.includes(c.id));

  return (
    <div className="py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Candidate Matchup</h2>
          <div className="h-1 w-24 bg-red-600 mb-4"></div>
          <p className="text-slate-600 font-medium max-w-md">Compare platforms and backgrounds to make an informed decision at the ballot box. (Select up to 3)</p>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or office" 
              aria-label="Search candidates by name or office"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border-2 border-slate-900 w-full md:w-[400px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-px focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-slate-300"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={partyFilter} 
              onChange={(e) => setPartyFilter(e.target.value)}
              aria-label="Filter candidates by party"
              className="flex-1 bg-white border-2 border-slate-900 px-4 py-2 font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-px focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              {parties.map(p => <option key={p} value={p}>{p === 'All' ? 'All Parties' : p}</option>)}
            </select>
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter candidates by role"
              className="flex-1 bg-white border-2 border-slate-900 px-4 py-2 font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-px focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              {roles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {candidates
          .filter(c => partyFilter === 'All' || c.party === partyFilter)
          .filter(c => roleFilter === 'All' || c.role === roleFilter)
          .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(c => (
          <motion.div
            key={c.id}
            whileHover={{ y: -2 }}
            className={`p-6 border-2 transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              selected.includes(c.id) ? 'border-slate-900 bg-blue-50/50' : 'border-slate-900 bg-white'
            }`}
            onClick={() => toggleSelect(c.id)}
          >
            <div className="flex items-center gap-4 mb-6">
              {c.image ? (
                <img src={c.image} alt={c.name} className="w-16 h-16 border-2 border-slate-900 object-cover" />
              ) : (
                <div className="w-16 h-16 border-2 border-slate-900 bg-slate-100 flex items-center justify-center text-slate-400">
                  <User className="w-8 h-8" />
                </div>
              )}
              <div>
                <h3 className="font-black text-2xl uppercase leading-tight">{c.name}</h3>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{c.party}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Office Sought</span>
                <p className="text-sm font-bold uppercase">{c.role}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.platform.slice(0, 2).map((p, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-900 text-slate-800 font-bold uppercase">{p}</span>
                ))}
                {c.platform.length > 2 && <span className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-900 text-slate-500 font-bold">+{c.platform.length - 2} more</span>}
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {selected.includes(c.id) ? 'Deselect to remove' : 'Click to compare'}
                </span>
                <Link to={`/candidate/${c.id}`} onClick={(e) => e.stopPropagation()} className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-800 tracking-widest flex items-center gap-1">
                  View Profile <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison View */}
      {selectedCandidates.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 text-white border-4 border-slate-900 p-8 md:p-12 overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex flex-col md:flex-row gap-12 relative z-10 w-full overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr>
                    <th className="p-4 border-b-2 border-slate-700 w-1/4"></th>
                    {selectedCandidates.map(c => (
                      <th key={c.id} className="p-4 border-b-2 border-slate-700 align-bottom w-1/4 min-w-[250px]">
                        <div className="flex flex-col items-start gap-4">
                           <div className="w-16 h-16 bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                            {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" /> : <User className="w-8 h-8 text-white/50" />}
                           </div>
                           <div>
                            <Link to={`/candidate/${c.id}`} className="hover:text-blue-400 transition-colors">
                              <h4 className="text-2xl font-black uppercase inline-flex items-center gap-2">
                                {c.name}
                                <ChevronRight className="w-4 h-4 opacity-50" />
                              </h4>
                            </Link>
                            <p className="text-blue-400 uppercase font-bold text-[10px] tracking-widest">{c.party}</p>
                            <p className="text-slate-500 uppercase font-bold text-[9px] tracking-widest mt-1">Age: {c.age} | {c.contendingPlace}</p>
                           </div>
                        </div>
                      </th>
                    ))}
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  <tr>
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Education & Background</th>
                    {selectedCandidates.map(c => (
                      <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium">
                        <p className="mb-2"><span className="text-[10px] font-bold uppercase text-slate-500 block">Education:</span> {c.education}</p>
                        <p className="mb-2"><span className="text-[10px] font-bold uppercase text-slate-500 block">Years in Service:</span> {c.yearsInService}</p>
                        <p><span className="text-[10px] font-bold uppercase text-slate-500 block">Party Swaps:</span> {c.partySwaps}</p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Records & Deeds</th>
                    {selectedCandidates.map(c => (
                      <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium">
                        <div className="mb-3">
                          <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Key Accomplishments:</span>
                          <ul className="space-y-1">
                            {c.deeds.map((d, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ChevronRight className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-500 block">Records:</span>
                          <span className={c.criminalRecords.includes('Clean') ? 'text-blue-400' : 'text-red-400'}>{c.criminalRecords}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Core Platform</th>
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
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Economy</th>
                    {selectedCandidates.map(c => (
                      <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium">
                        {c.issues.economy}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Healthcare</th>
                    {selectedCandidates.map(c => (
                      <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium">
                        {c.issues.healthcare}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Environment</th>
                    {selectedCandidates.map(c => (
                      <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium">
                        {c.issues.environment}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Priorities</th>
                    {selectedCandidates.map(c => (
                      <td key={c.id} className="p-4 align-top">
                        <div className="space-y-4">
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
                  <tr>
                    <th className="p-4 align-top text-[10px] font-black uppercase tracking-widest text-slate-400">Experience</th>
                    {selectedCandidates.map(c => (
                      <td key={c.id} className="p-4 align-top text-sm text-slate-300 font-medium leading-relaxed">
                        <p className="mb-4">{c.experience}</p>
                        <a href={c.manifestoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300">
                          Read Full Manifesto <ChevronRight className="w-3 h-3" />
                        </a>
                      </td>
                    ))}
                  </tr>
               </tbody>
             </table>
          </div>

          {selectedCandidates.length === 1 && (
            <div className="absolute inset-y-0 right-0 w-1/2 hidden md:flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20">
              <p className="text-slate-400 max-w-xs text-center uppercase tracking-widest font-black text-sm">
                Select another candidate to compare side-by-side
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
