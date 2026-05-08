import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Vote, ArrowRight, ShieldCheck, HelpCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CivicAssistant } from '../components/CivicAssistant';
import { ElectionTimeline } from '../components/ElectionTimeline';
import { RepFinder } from '../components/RepFinder';
import { SAMPLE_CANDIDATES, ELECTION_TIMELINE } from '../constants';
import { SEO } from '../components/SEO';

export default function HomePage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

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
      <SEO 
        title="Home" 
        description="Your non-partisan election hub for candidate information, voting process, and representative lookup." 
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "GovernmentService",
          "name": "CivicConnect Election Hub",
          "description": "Non-partisan election information and voter assistance platform.",
          "provider": {
            "@type": "Organization",
            "name": "CivicConnect"
          }
        }}
      />
      <div className="flex flex-col">
        {/* Hero Section - Editorial Style */}
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 z-10 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20, rotateX: -10 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                  style={{ perspective: 1000 }}
                >
                  <p className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">Verified Election Data</p>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter uppercase mb-8 transform-gpu">
                    Democracy, <br />
                    Decoded.
                  </h1>
                  <p className="text-lg md:text-xl text-slate-600 font-medium max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0">
                    A responsible citizen needs accurate facts. Explore verified timelines, official candidate details, and precise polling booth logic in one unbiased national platform.
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                    <button 
                      onClick={() => {
                        document.getElementById('candidates')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                    >
                      Start Exploration
                    </button>
                    <button 
                      onClick={() => setShowHowItWorks(true)}
                      className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-900 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                    >
                      How it works
                    </button>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-5 relative mt-12 lg:mt-0" style={{ perspective: 1000 }}>
                <motion.div 
                   onMouseMove={handleMouseMove}
                   onMouseLeave={handleMouseLeave}
                   style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1, delay: 0.2 }}
                   className="aspect-[4/5] w-full max-w-[400px] mx-auto lg:max-w-none bg-slate-100 border-4 border-slate-900 relative shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 z-10"
                >
                    <motion.div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img 
                       src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=1000" 
                       alt="Voting booth and ballot" 
                       loading="lazy"
                       width="500"
                       height="600"
                       className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    </motion.div>
                   
                   <motion.div 
                     style={{ transform: "translateZ(60px)" }} 
                     className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 pointer-events-none"
                   >
                     <div className="bg-white p-4 md:p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                        <p className="text-slate-900 font-black uppercase text-lg md:text-xl leading-snug tracking-tight">"The vote is the most powerful non-violent tool we have."</p>
                        <p className="text-blue-600 text-xs font-bold mt-2 uppercase tracking-widest">— John Lewis</p>
                     </div>
                   </motion.div>
                </motion.div>
                
                {/* Floating Elements - Hidden or simplified on mobile */}
                <motion.div 
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 md:-top-12 md:-right-12 w-20 h-20 md:w-32 md:h-32 bg-blue-600 border-4 border-slate-900 flex items-center justify-center p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-0 rounded-full"
                >
                   <ShieldCheck className="w-full h-full text-white" />
                </motion.div>
                
                <motion.div 
                  animate={{ x: [-5, 5, -5], y: [5, -5, 5], rotate: [-10, 0, -10] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-16 h-16 md:w-24 md:h-24 bg-red-600 border-4 border-slate-900 flex items-center justify-center p-3 md:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20"
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
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter text-center lg:text-left">Candidate Matchup</h2>
                <div className="h-1 w-24 bg-red-600 mb-6 mx-auto lg:mx-0"></div>
                <p className="text-slate-600 font-medium mb-8 text-lg text-center lg:text-left">
                  Explore candidates across parties and offices. Compare their priorities, background, and platform before casting your vote.
                </p>
                
                <form onSubmit={handleCandidateSearch} className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
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
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAMPLE_CANDIDATES.slice(0, 4).map((c) => (
                    <div key={c.id} className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center hover:bg-slate-50 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer" onClick={() => navigate(`/candidate/${c.id}`)}>
                      <div className="w-16 h-16 bg-slate-200 border-2 border-slate-900 overflow-hidden mb-3">
                         <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
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

        {/* Data Insights Section */}
        <section id="insights" className="py-24 border-y-2 border-slate-900 bg-white">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
               <div className="w-full lg:w-1/2">
                 <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter text-center lg:text-left">Visualize the Election</h2>
                 <div className="h-1 w-24 bg-blue-600 mb-6 mx-auto lg:mx-0"></div>
                 <p className="text-slate-600 font-medium mb-8 text-lg text-center lg:text-left">
                   Dive into the data behind the democracy. Explore interactive charts mapping historical turnout trends, candidate funding sources, and voting demographics.
                 </p>
                 <div className="flex justify-center lg:justify-start">
                   <button onClick={() => navigate('/insights')} className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                     Explore Data Insights
                     <ArrowRight className="w-4 h-4" />
                   </button>
                 </div>
               </div>
               <div className="w-full lg:w-1/2 relative">
                 <div className="bg-slate-50 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => navigate('/insights')}>
                    <div className="flex gap-4">
                       <div className="flex-1 space-y-4">
                         <div className="h-24 bg-blue-100 border-2 border-blue-900 relative overflow-hidden flex items-end">
                             <div className="h-1/2 w-1/4 bg-blue-500 border-r-2 border-t-2 border-blue-900"></div>
                             <div className="h-3/4 w-1/4 bg-blue-500 border-r-2 border-t-2 border-blue-900"></div>
                             <div className="h-full w-1/4 bg-blue-500 border-r-2 border-t-2 border-blue-900"></div>
                             <div className="h-2/3 w-1/4 bg-blue-500 border-t-2 border-blue-900"></div>
                         </div>
                         <div className="h-12 bg-red-100 border-2 border-red-900 flex items-center justify-center">
                            <div className="w-2/3 h-4 bg-red-300"></div>
                         </div>
                       </div>
                       <div className="w-32 bg-yellow-100 border-2 border-yellow-900 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-4 border-yellow-500 border-t-yellow-800"></div>
                       </div>
                    </div>
                 </div>
                 
                 {/* Decorative elements */}
                 <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
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
      </div>

      {/* Interactive AI Assistant */}
      <CivicAssistant />

      <AnimatePresence>
        {showHowItWorks && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHowItWorks(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b-4 border-slate-900 p-4 flex items-center justify-between z-20">
                <h3 className="text-xl font-black uppercase tracking-tighter">How CivicConnect Works</h3>
                <button 
                  onClick={() => setShowHowItWorks(false)}
                  className="p-2 hover:bg-slate-100 border-2 border-transparent hover:border-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8 space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 border-2 border-blue-900 flex items-center justify-center font-black text-xl text-blue-900">1</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-2">Know the Process</h4>
                    <p className="text-slate-600 font-medium">Use the "Election Process" timeline on the homepage to track important deadlines, from voter registration to early voting and election day.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-red-100 border-2 border-red-900 flex items-center justify-center font-black text-xl text-red-900">2</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-2">Research Candidates</h4>
                    <p className="text-slate-600 font-medium">Navigate to the "Candidate Hub" to search candidates by office or party. Select up to 3 candidates to compare their platforms side-by-side.</p>
                    <button onClick={() => { setShowHowItWorks(false); navigate('/candidates'); }} className="mt-3 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 flex items-center gap-1">Go to Hub <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-green-100 border-2 border-green-900 flex items-center justify-center font-black text-xl text-green-900">3</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-2">Find Your Area Officials & Polls</h4>
                    <p className="text-slate-600 font-medium">Use the "Representatives" tool to learn about your current MLA, MP, and corporator, and locate your polling booth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-purple-100 border-2 border-purple-900 flex items-center justify-center font-black text-xl text-purple-900">4</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-2">Check EPIC Status</h4>
                    <p className="text-slate-600 font-medium">Head to the "Voter Status" page to verify if your name is on the electoral roll using your EPIC number.</p>
                    <button onClick={() => { setShowHowItWorks(false); navigate('/status'); }} className="mt-3 text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 flex items-center gap-1">Check Status <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
