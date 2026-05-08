import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Candidate } from '../types';
import { Search, ChevronRight, User, Bookmark, BookmarkCheck, CheckSquare, Square, ChevronDown } from 'lucide-react';
import { useBallot } from '../context/BallotContext';

interface Props {
  candidates: Candidate[];
  initialPartyFilter?: string;
  initialRoleFilter?: string;
  showOnlySaved?: boolean;
}

const DropdownFilter = ({ value, options, onChange, labelAll }: { value: string, options: string[], onChange: (val: string) => void, labelAll: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 min-w-[160px] md:min-w-[200px]" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white border-2 border-slate-900 px-4 py-2.5 md:py-2 font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px transition-all"
      >
        <span className="truncate mr-2">{value === 'All' ? labelAll : value}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 max-h-[300px] overflow-y-auto">
          {options.map(option => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors hover:bg-slate-100 border-b border-slate-100 last:border-0 ${value === option ? 'bg-blue-50 text-blue-800' : 'text-slate-900'}`}
            >
              {option === 'All' ? labelAll : option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const CandidateCompare: React.FC<Props> = ({ 
  candidates, 
  initialPartyFilter = 'All', 
  initialRoleFilter = 'All',
  showOnlySaved = false
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [partyFilter, setPartyFilter] = React.useState(initialPartyFilter);
  const [roleFilter, setRoleFilter] = React.useState(initialRoleFilter);
  const [ballotFilter, setBallotFilter] = React.useState(showOnlySaved);
  const { toggleCandidate, isSaved } = useBallot();

  const parties: string[] = ['All', ...(Array.from(new Set(candidates.map(c => c.party))) as string[])];
  const roles: string[] = ['All', ...(Array.from(new Set(candidates.map(c => c.role))) as string[])];

  const toggleSelect = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else {
        if (prev.length >= 3) {
          alert('You can only compare up to 3 candidates at a time.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const selectedCandidates = candidates.filter(c => selected.includes(c.id));

  return (
    <div className="py-12 px-6">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Candidate Compare & Hub</h2>
            <div className="h-1 w-24 bg-red-600 mb-4 mx-auto md:mx-0"></div>
            <p className="text-slate-600 font-medium max-w-md mx-auto md:mx-0">Select up to 3 candidates to view a side-by-side comparison of their policy stances and background.</p>
          </div>
          <div className="flex flex-col gap-4 w-full xl:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or office" 
              aria-label="Search candidates by name or office"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border-2 border-slate-900 w-full xl:w-[400px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-px focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-slate-300"
            />
          </div>
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            <button 
              onClick={() => setBallotFilter(!ballotFilter)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 md:py-2 font-bold text-[10px] md:text-xs uppercase tracking-widest border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                ballotFilter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-900 hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {ballotFilter ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              {ballotFilter ? 'Show All' : 'Saved Candidates'}
            </button>
            <div className="flex flex-col sm:flex-row flex-1 gap-4">
              <DropdownFilter 
                value={partyFilter} 
                options={parties} 
                onChange={setPartyFilter} 
                labelAll="All Parties"
              />
              <DropdownFilter 
                value={roleFilter} 
                options={roles} 
                onChange={setRoleFilter} 
                labelAll="All Roles"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {candidates
          .filter(c => ballotFilter ? isSaved(c.id) : true)
          .filter(c => partyFilter === 'All' || c.party === partyFilter)
          .filter(c => roleFilter === 'All' || c.role === roleFilter)
          .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(c => (
          <motion.div
            key={c.id}
            whileHover={{ y: -2 }}
            className={`p-6 border-2 transition-all cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative flex flex-col ${
              selected.includes(c.id) ? 'border-slate-900 bg-blue-50/50' : 'border-slate-900 bg-white hover:bg-slate-50'
            }`}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleCandidate(c.id);
              }}
              className={`absolute top-4 right-4 p-2 border-2 transition-all group ${
                isSaved(c.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-900'
              }`}
              aria-label={isSaved(c.id) ? "Remove from Tracker" : "Add to Tracker"}
            >
              {isSaved(c.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4 group-hover:text-slate-900" />}
            </button>
            <div className="flex items-center gap-4 mb-6 pr-12">
              {c.image ? (
                <img src={c.image} alt={c.name} loading="lazy" className="w-16 h-16 border-2 border-slate-900 object-cover" />
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
            
            <div className="space-y-4 flex-grow">
              <div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">Office Sought</span>
                <p className="text-sm font-bold uppercase">{c.role}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.platform.slice(0, 2).map((p, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-900 text-slate-800 font-bold uppercase">{p}</span>
                ))}
                {c.platform.length > 2 && <span className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-900 text-slate-500 font-bold">+{c.platform.length - 2} more</span>}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-200 flex flex-col gap-3">
              <button 
                onClick={(e) => toggleSelect(c.id, e)}
                className={`flex justify-center items-center gap-2 w-full py-2 px-4 border-2 font-black uppercase text-xs tracking-widest transition-all ${
                  selected.includes(c.id) ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-slate-900 border-slate-900 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-px'
                }`}
              >
                {selected.includes(c.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                {selected.includes(c.id) ? 'Selected for Compare' : 'Add to Compare'}
              </button>
              
              <Link to={`/candidate/${c.id}`} className="text-[10px] mt-1 font-black uppercase text-blue-600 hover:text-blue-800 tracking-widest flex items-center justify-center gap-1 w-full">
                View Full Profile <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Compare Action Bar */}
      {selected.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 z-50 flex items-center justify-between border-t-4 border-slate-900 shadow-[0_-4px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex items-center gap-4">
            <span className="font-black uppercase tracking-widest text-lg bg-slate-900 px-3 py-1 border-2 border-transparent">{selected.length}/3</span>
            <div>
              <p className="text-white font-black uppercase tracking-widest text-xs md:text-sm">Candidates Selected for Comparison</p>
              <p className="text-[10px] text-blue-200 hidden md:block">Select up to 3 candidates and click compare.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelected([])}
              className="text-[10px] font-black uppercase tracking-widest text-blue-200 hover:text-white"
            >
              Clear
            </button>
            <Link 
              to={`/compare?ids=${selected.join(',')}`}
              className="px-6 py-3 border-2 border-slate-900 bg-white text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-slate-100 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 group"
            >
              View Compare
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

