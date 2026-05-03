import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Vote, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CivicAssistant } from '../components/CivicAssistant';
import { ElectionTimeline } from '../components/ElectionTimeline';
import { RepFinder } from '../components/RepFinder';
import { ELECTION_TIMELINE, SAMPLE_CANDIDATES } from '../constants';

export default function HomePage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const navigate = useNavigate();

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the center of the element, normalized between -0.5 and 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [partyFilter, setPartyFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const parties = ['All', ...Array.from(new Set(SAMPLE_CANDIDATES.map(c => c.party)))];
  const roles = ['All', ...Array.from(new Set(SAMPLE_CANDIDATES.map(c => c.role)))];

  const handleCandidateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (partyFilter !== 'All') params.set('party', partyFilter);
    if (roleFilter !== 'All') params.set('role', roleFilter);
    navigate(`/candidates?${params.toString()}`);
  }

  return (
    <div className="flex flex-col">
      <main className="pt-20">
        {/* Hero Section - Editorial Style */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20, rotateX: -10 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                  style={{ perspective: 1000 }}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Your Voice, Your Future</p>
                  <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-8 transform-gpu">
                    Democracy, <br />
                    Simplified.
                  </h1>
                  <p className="text-xl text-slate-600 font-medium max-w-lg mb-10 leading-relaxed">
                    Navigating elections shouldn't be a maze. Explore timelines, research candidates, and find your local polls in one non-partisan platform.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">Start Exploration</button>
                    <button className="px-8 py-4 bg-white border-2 border-slate-900 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">How it works</button>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-5 relative" style={{ perspective: 1000 }}>
                <motion.div 
                   onMouseMove={handleMouseMove}
                   onMouseLeave={handleMouseLeave}
                   style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1, delay: 0.2 }}
                   className="aspect-[4/5] bg-slate-100 border-4 border-slate-900 relative shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 z-10"
                >
                   <motion.div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 overflow-hidden pointer-events-none">
                     <img 
                      src="https://images.unsplash.com/photo-1523292419353-8326e95c1fc1?auto=format&fit=crop&q=80&w=600" 
                      alt="Voting booth" 
                      className="w-full h-full object-cover grayscale brightness-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                   </motion.div>
                   
                   <motion.div 
                     style={{ transform: "translateZ(60px)" }} 
                     className="absolute bottom-8 left-8 right-8 pointer-events-none"
                   >
                     <div className="bg-white p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                        <p className="text-slate-900 font-black uppercase text-xl leading-snug tracking-tight">"The vote is the most powerful non-violent tool we have."</p>
                        <p className="text-blue-600 text-xs font-bold mt-2 uppercase tracking-widest">— John Lewis</p>
                     </div>
                   </motion.div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600 border-4 border-slate-900 flex items-center justify-center p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-0 rounded-full"
                >
                   <ShieldCheck className="w-full h-full text-white" />
                </motion.div>
                
                <motion.div 
                  animate={{ x: [-5, 5, -5], y: [5, -5, 5], rotate: [-10, 0, -10] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-8 -left-8 w-24 h-24 bg-red-600 border-4 border-slate-900 flex items-center justify-center p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20"
                >
                   <Vote className="w-full h-full text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="process" className="py-24 border-y-2 border-slate-900 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <ElectionTimeline steps={ELECTION_TIMELINE} />
          </div>
        </section>

        <section id="lookup" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <RepFinder />
          </div>
        </section>

        <section id="candidates" className="py-24 border-y-2 border-slate-900 bg-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter">Candidate Matchup</h2>
                <div className="h-1 w-24 bg-red-600 mb-6"></div>
                <p className="text-slate-600 font-medium mb-8 text-lg">
                  Explore candidates across parties and offices. Compare their priorities, background, and platform before casting your vote.
                </p>
                
                <form onSubmit={handleCandidateSearch} className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Quick Filters</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="partyFilter" className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Party Affiliation</label>
                      <select 
                        id="partyFilter"
                        value={partyFilter} 
                        onChange={(e) => setPartyFilter(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-px focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer block"
                      >
                        {parties.map(p => <option key={p} value={p}>{p === 'All' ? 'All Parties' : p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="roleFilter" className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Office Roll</label>
                      <select 
                        id="roleFilter"
                        value={roleFilter} 
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-px focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer block"
                      >
                        {roles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-sm border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest hover:bg-blue-700 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    View Candidates
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  {SAMPLE_CANDIDATES.slice(0, 4).map((c) => (
                    <div key={c.id} className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center hover:bg-slate-50 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate(`/candidate/${c.id}`)}>
                      <div className="w-16 h-16 bg-slate-200 border-2 border-slate-900 overflow-hidden mb-3">
                         <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-black uppercase text-sm">{c.name}</h4>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 line-clamp-1">{c.party}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & FAQ Section */}
        <section className="py-24 border-t-2 border-slate-900">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-slate-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-8">
              <HelpCircle className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter">Still have questions?</h2>
            <p className="text-slate-600 font-medium mb-10 text-lg">
              Our non-partisan AI assistant uses real-time civic data to answer specifics about registration, deadlines, and voting procedures.
            </p>
            <button 
              onClick={() => {
                const trigger = document.getElementById('assistant-trigger');
                if (trigger) trigger.click();
              }}
              className="px-8 py-4 bg-slate-900 text-white text-sm border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest hover:bg-slate-800 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Consult the AI Assistant
            </button>
          </div>
        </section>
      </main>

      {/* Interactive AI Assistant */}
      <CivicAssistant />
    </div>
  );
}
