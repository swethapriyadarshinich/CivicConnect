import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Vote, ArrowRight, Menu, X, Facebook, Twitter, Instagram, Bookmark, Info } from 'lucide-react';
import { BallotProvider, useBallot } from './context/BallotContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageTranslator } from './components/LanguageTranslator';

import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import VoterStatusPage from './pages/VoterStatusPage';

// Lazy load components for performance
const LazyHomePage = React.lazy(() => import('./pages/HomePage'));
const LazyCandidatesPage = React.lazy(() => import('./pages/CandidatesPage'));
const LazyCandidateProfilePage = React.lazy(() => import('./pages/CandidateProfilePage'));
const LazyVoterStatusPage = React.lazy(() => import('./pages/VoterStatusPage'));
const LazyFeedbackPage = React.lazy(() => import('./pages/FeedbackPage'));
const LazyComparePage = React.lazy(() => import('./pages/ComparePage'));
const LazyDataInsightsPage = React.lazy(() => import('./pages/DataInsightsPage'));

function LoadingFallback() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Perspective...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BallotProvider>
        <AppContent />
      </BallotProvider>
    </ErrorBoundary>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const location = useLocation();
  const { savedCandidates } = useBallot();

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname !== '/') {
      // Navigate to home then scroll
      const link = document.createElement('a');
      link.href = `/${id}`;
      link.click();
    } else {
      const el = document.getElementById(id.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex flex-col">
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-slate-900 focus:text-white focus:font-black focus:uppercase focus:tracking-widest focus:shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]"
      >
        Skip to main content
      </a>

      {/* Top Banner */}
      {isBannerVisible && (
        <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-center relative z-[60]">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center mr-6">
            Welcome to CivicConnect! Learn how to navigate the platform. 
            <button 
              onClick={() => setShowGuideModal(true)} 
              className="ml-2 underline font-black hover:text-blue-200 transition-colors"
            >
              Learn More
            </button>
          </p>
          <button 
            onClick={() => setIsBannerVisible(false)}
            className="absolute right-4 p-1 hover:bg-blue-700 transition-colors rounded-sm"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className={`relative z-50 bg-white border-b-2 border-slate-900 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="bg-slate-900 p-2 transform rotate-3 hover:rotate-6 transition-transform">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase sm:block hidden">CivicConnect</span>
            <span className="font-black text-xl tracking-tighter uppercase sm:hidden block">Civic</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-4 xl:gap-8">
            <a href="/#process" onClick={(e) => scrollToSection(e, '#process')} className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Election Process</a>
            <Link to="/candidates" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Candidate Hub</Link>
            <Link to="/insights" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Data Insights</Link>
            <a href="/#lookup" onClick={(e) => scrollToSection(e, '#lookup')} className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Representatives</a>
            <Link to="/status" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Voter Status</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageTranslator />
            <Link to="/candidates?saved=true" className="relative group p-2 hover:bg-slate-100 transition-colors border-2 border-transparent hover:border-slate-900 shadow-none hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Bookmark className="w-5 h-5 text-slate-900" />
              {savedCandidates.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                  {savedCandidates.length}
                </span>
              )}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Saved Candidates</span>
            </Link>
            <Link to="/status" className="hidden md:flex items-center gap-2 px-4 md:px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
              Register for Vote
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden p-2 bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-200 transition-all active:translate-y-px active:shadow-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-20 left-0 w-full bg-white border-b-2 border-slate-900 shadow-xl py-8 px-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-6">
              <a href="/#process" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={(e) => scrollToSection(e, '#process')}>Election Process</a>
              <Link to="/candidates" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={closeMenu}>Candidate Hub</Link>
              <Link to="/insights" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={closeMenu}>Data Insights</Link>
              <a href="/#lookup" className="text-lg font-black uppercase tracking-widest hover:text-blue-600 transition-colors" onClick={(e) => scrollToSection(e, '#lookup')}>Representatives</a>
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

      <main id="main-content" className="flex-grow flex flex-col">
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LazyHomePage />} />
            <Route path="/candidates" element={<LazyCandidatesPage />} />
            <Route path="/candidate/:id" element={<LazyCandidateProfilePage />} />
            <Route path="/status" element={<LazyVoterStatusPage />} />
            <Route path="/feedback" element={<LazyFeedbackPage />} />
            <Route path="/compare" element={<LazyComparePage />} />
            <Route path="/insights" element={<LazyDataInsightsPage />} />
          </Routes>
        </React.Suspense>
      </main>

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            onClick={() => setShowGuideModal(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full relative z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white border-b-4 border-slate-900 p-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter">Website Guide</h3>
              </div>
              <button 
                onClick={() => setShowGuideModal(false)}
                className="p-2 hover:bg-slate-100 border-2 border-transparent hover:border-slate-900 transition-colors"
                aria-label="Close guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h4 className="font-black uppercase text-lg mb-2">Navigating CivicConnect</h4>
                <p className="text-slate-600 font-medium mb-4">CivicConnect provides resources across four key areas to help you participate in the democratic process.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border-2 border-slate-200 p-4 hover:border-slate-900 transition-colors">
                  <h5 className="font-bold text-sm uppercase text-slate-900 mb-2">1. Election Process</h5>
                  <p className="text-xs text-slate-600 mb-3">View timeline of upcoming deadlines from the Election Commission of India.</p>
                  <Link to="/#process" onClick={(e) => { setShowGuideModal(false); scrollToSection(e, '#process') }} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Go to Timeline &rarr;</Link>
                </div>
                <div className="bg-slate-50 border-2 border-slate-200 p-4 hover:border-slate-900 transition-colors">
                  <h5 className="font-bold text-sm uppercase text-slate-900 mb-2">2. Candidate Hub</h5>
                  <p className="text-xs text-slate-600 mb-3">Research competing candidates in your constituency, their affidavits, and backgrounds.</p>
                  <Link to="/candidates" onClick={() => setShowGuideModal(false)} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">View Candidates &rarr;</Link>
                </div>
                <div className="bg-slate-50 border-2 border-slate-200 p-4 hover:border-slate-900 transition-colors">
                  <h5 className="font-bold text-sm uppercase text-slate-900 mb-2">3. Representatives</h5>
                  <p className="text-xs text-slate-600 mb-3">Find current MLA, MP, and your designated polling booth information.</p>
                  <Link to="/#lookup" onClick={(e) => { setShowGuideModal(false); scrollToSection(e, '#lookup') }} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Find Reps &rarr;</Link>
                </div>
                <div className="bg-slate-50 border-2 border-slate-200 p-4 hover:border-slate-900 transition-colors">
                  <h5 className="font-bold text-sm uppercase text-slate-900 mb-2">4. Voter Status</h5>
                  <p className="text-xs text-slate-600 mb-3">Check if your name is on the electoral roll using your EPIC number.</p>
                  <Link to="/status" onClick={() => setShowGuideModal(false)} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Check Status &rarr;</Link>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 p-4 mt-6">
                <h5 className="font-bold text-sm uppercase text-blue-900 mb-1">Language Translation</h5>
                <p className="text-xs text-blue-800">You can translate the platform to multiple languages using the Globe icon in the header.</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <li><Link to="/status" className="hover:text-blue-400 transition-colors" onClick={() => window.scrollTo(0, 0)}>Voter Registration</Link></li>
                <li><Link to="/candidates" className="hover:text-blue-400 transition-colors" onClick={() => window.scrollTo(0, 0)}>Candidate Directory</Link></li>
                <li><Link to="/feedback" className="hover:text-blue-400 transition-colors" onClick={() => window.scrollTo(0, 0)}>Feedback & Complaints</Link></li>
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
