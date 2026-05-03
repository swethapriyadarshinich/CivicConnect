/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Vote, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { CivicAssistant } from './components/CivicAssistant';
import { ElectionTimeline } from './components/ElectionTimeline';
import { CandidateCompare } from './components/CandidateCompare';
import { RepFinder } from './components/RepFinder';
import { ELECTION_TIMELINE, SAMPLE_CANDIDATES } from './constants';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-2">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">CivicConnect</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#process" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Election Process</a>
            <a href="#candidates" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Candidate Hub</a>
            <a href="#lookup" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Representatives</a>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
            Register to Vote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section - Editorial Style */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Your Voice, Your Future</p>
                  <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-8">
                    Democracy, <br />
                    Simplified.
                  </h1>
                  <p className="text-xl text-slate-600 font-medium max-w-lg mb-10 leading-relaxed">
                    Navigating elections shouldn't be a maze. Explore timelines, research candidates, and find your local polls in one non-partisan platform.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">Start Exploration</button>
                    <button className="px-8 py-4 bg-white border-2 border-slate-900 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 transition-all hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">How it works</button>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-5 relative">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1, delay: 0.2 }}
                   className="aspect-[4/5] bg-slate-100 border-4 border-slate-900 overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                   <img 
                    src="https://images.unsplash.com/photo-1540910419892-f0440632207f?auto=format&fit=crop&q=80&w=600" 
                    alt="Voting booth" 
                    className="w-full h-full object-cover grayscale brightness-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                   <div className="absolute bottom-8 left-8 right-8">
                     <div className="bg-white p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-slate-900 font-black uppercase text-xl leading-snug tracking-tight">"The vote is the most powerful non-violent tool we have."</p>
                        <p className="text-blue-600 text-xs font-bold mt-2 uppercase tracking-widest">— John Lewis</p>
                     </div>
                   </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600 border-2 border-slate-900 flex items-center justify-center p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                   <ShieldCheck className="w-full h-full text-white" />
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

        <section id="lookup" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <RepFinder />
          </div>
        </section>

        <section id="candidates" className="py-24 border-y-2 border-slate-900 bg-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <CandidateCompare candidates={SAMPLE_CANDIDATES} />
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Vote className="w-6 h-6 text-white" />
                <span className="font-black text-2xl tracking-tighter uppercase">CivicConnect</span>
              </div>
              <p className="text-slate-400 font-medium max-w-sm mb-8 leading-relaxed">
                Empowering citizens with accessible, non-partisan information to strengthen democracy one vote at a time.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 border-2 border-slate-700 flex items-center justify-center" />
                <div className="w-10 h-10 bg-slate-800 border-2 border-slate-700 flex items-center justify-center" />
                <div className="w-10 h-10 bg-slate-800 border-2 border-slate-700 flex items-center justify-center" />
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">Resources</h4>
              <ul className="space-y-4 text-slate-300 font-bold">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Voter Registration</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Polling Place Finder</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Election Laws</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Ballot Tracker</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-300 font-bold">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Non-Partisan Pledge</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-6">
            <p className="text-slate-400 text-xs font-black uppercase">© 2026 CIVICCONNECT. CREATED FOR CITIZENS.</p>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase">
              <span className="w-2 h-2 bg-blue-500" />
              SYSTEMS ACTIVE • VERIFIED CIVIC DATA
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

