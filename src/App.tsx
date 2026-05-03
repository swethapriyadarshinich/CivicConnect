import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Vote, ArrowRight, Menu, X, Facebook, Twitter, Instagram, Bookmark } from 'lucide-react';
import { BallotProvider, useBallot } from './context/BallotContext';

import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import VoterStatusPage from './pages/VoterStatusPage';

export default function App() {
  return (
    <BallotProvider>
      <AppContent />
    </BallotProvider>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { savedCandidates } = useBallot();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col">
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-slate-900 focus:text-white focus:font-black focus:uppercase focus:tracking-widest focus:shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="bg-slate-900 p-2 transform rotate-3 hover:rotate-6 transition-transform">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">CivicConnect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#process" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Election Process</Link>
            <Link to="/candidates" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Candidate Hub</Link>
            <Link to="/#lookup" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Representatives</Link>
            <Link to="/status" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Voter Status</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/candidates?saved=true" className="relative group p-2 hover:bg-slate-100 transition-colors border-2 border-transparent hover:border-slate-900 shadow-none hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Bookmark className="w-5 h-5 text-slate-900" />
              {savedCandidates.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                  {savedCandidates.length}
                </span>
              )}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">My Ballot</span>
            </Link>
            <Link to="/status" className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
              Register for Vote
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-200 transition-all active:translate-y-px active:shadow-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b-2 border-slate-900 shadow-xl py-8 px-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-6">
              <Link to="/#process" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={closeMenu}>Election Process</Link>
              <Link to="/candidates" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={closeMenu}>Candidate Hub</Link>
              <Link to="/#lookup" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={closeMenu}>Representatives</Link>
              <Link to="/status" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={closeMenu}>Voter Status</Link>
              <Link 
                to="/status" 
                className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white text-md font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-px active:shadow-none transition-all mt-4"
                onClick={closeMenu}
              >
                Register for Vote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content" className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/candidate/:id" element={<CandidateProfilePage />} />
          <Route path="/status" element={<VoterStatusPage />} />
        </Routes>
      </main>

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
                <a href="#" className="w-10 h-10 bg-slate-800 border-2 border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors" aria-label="Visit our Facebook page">
                  <Facebook className="w-4 h-4 text-slate-500" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 border-2 border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors" aria-label="Visit our Twitter profile">
                  <Twitter className="w-4 h-4 text-slate-500" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 border-2 border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors" aria-label="Visit our Instagram profile">
                  <Instagram className="w-4 h-4 text-slate-500" />
                </a>
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
