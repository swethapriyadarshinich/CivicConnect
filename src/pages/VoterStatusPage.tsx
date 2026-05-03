import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Download, Info, MapPin, Building2, Map, Phone, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function VoterStatusPage() {
  const [voterId, setVoterId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterId.trim()) return;

    setStatus('loading');
    setTimeout(() => {
      // Fake logic: if it starts with 'CA' or includes '123' it's found, else not found.
      if (voterId.toUpperCase().startsWith('CA') || voterId.includes('123')) {
        setStatus('found');
      } else {
        setStatus('not-found');
      }
    }, 1500);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 py-8 md:px-6 md:py-20 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-center">Voter Status Registration</h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
        <p className="text-center text-slate-600 font-medium mb-8 md:mb-12 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Verify your voter registration status securely. Enter your Voter ID or State Identification to fetch your polling location and details.
        </p>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12 md:mb-16 relative">
          <div className="relative group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow">
            <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-slate-400 z-10" />
            <input 
              type="text" 
              placeholder="Enter Voter ID" 
              aria-label="Enter Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="w-full bg-white border-4 border-slate-900 text-slate-900 pl-12 md:pl-16 pr-24 md:pr-32 py-4 md:py-5 font-black text-base md:text-lg placeholder:text-slate-300 focus:outline-none"
              required
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 md:px-6 py-2 md:py-3 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Checking...' : 'Check'}
            </button>
          </div>
          <p className="text-center text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
            Try "CA-9021-X" for a valid response.
          </p>
        </form>

        <AnimatePresence mode="wait">
          {status === 'found' && (
            <motion.div 
              key="found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border-4 border-emerald-500 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-8 text-center md:text-left">
                <CheckCircle className="w-12 h-12 text-emerald-500 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-black uppercase text-slate-900 leading-tight">Active & Registered</h2>
                  <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs">Voter Confirmed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                <div>
                  <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Voter Details</h3>
                  <div className="space-y-4">
                    <div className="pb-4 border-b-2 border-slate-100">
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Voter Name</span>
                      <span className="font-medium text-slate-900">Eleanor Shellstrop</span>
                    </div>
                    <div className="pb-4 border-b-2 border-slate-100">
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Voter ID</span>
                      <span className="font-medium text-slate-900">{voterId || 'CA-9021-X'}</span>
                    </div>
                    <div className="pb-4 border-b-2 border-slate-100">
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Registered District</span>
                      <span className="font-medium text-slate-900">District 4, Spring Valley</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Polling Location</h3>
                  <div className="bg-slate-50 border-2 border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-black uppercase text-slate-900 tracking-tight">Central Community Library</p>
                        <p className="text-slate-600 font-medium text-sm mt-1">402 Civic Center Dr<br/>Spring Valley, CA 91977</p>
                        <p className="text-emerald-600 font-bold text-xs uppercase mt-4 mb-6 tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Open: Nov 03, 7AM - 8PM
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t-2 border-slate-200">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Download className="w-4 h-4" /> Download Booth Slip
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-900 text-slate-900 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Map className="w-4 h-4" /> Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'not-found' && (
            <motion.div 
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <XCircle className="w-12 h-12 text-red-600" />
                <div>
                  <h2 className="text-2xl font-black uppercase text-slate-900">Registration Not Found</h2>
                  <p className="text-red-600 font-bold tracking-widest uppercase text-xs">Voter Not Included in List</p>
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-200 p-6 mb-8 text-red-900 font-medium leading-relaxed">
                We couldn't find a registration matching <strong>"{voterId}"</strong>. Your details are not included in the active voters list for the upcoming election. This could be due to a recent move, inactivity, or typing error.
              </div>

              <div>
                <h3 className="text-xl font-black uppercase text-slate-900 mb-6 tracking-tighter">How to Enroll for Voting</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border-2 border-slate-900 p-6 bg-slate-50">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xl mb-4 border-2 border-blue-600">1</div>
                    <h4 className="font-bold uppercase text-sm mb-2 text-slate-900">Online Registration</h4>
                    <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed">The fastest way to register. Requires a valid State ID or Driver's License.</p>
                    <a href="https://vote.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:text-blue-800">
                      Register Online <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="border-2 border-slate-900 p-6 bg-slate-50">
                    <div className="w-10 h-10 bg-slate-200 text-slate-700 flex items-center justify-center font-black text-xl mb-4 border-2 border-slate-900">2</div>
                    <h4 className="font-bold uppercase text-sm mb-2 text-slate-900">Mail-in Form</h4>
                    <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed">Download and print the National Mail Voter Registration Form, fill it up, and post it.</p>
                    <button className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600">
                      Download Form <FileText className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="border-2 border-slate-900 p-6 bg-slate-50">
                    <div className="w-10 h-10 bg-slate-200 text-slate-700 flex items-center justify-center font-black text-xl mb-4 border-2 border-slate-900">3</div>
                    <h4 className="font-bold uppercase text-sm mb-2 text-slate-900">In-Person</h4>
                    <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed">Visit your local election office, DMV, or authorized registration center.</p>
                    <button className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600">
                      Find Location <Building2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t-2 border-slate-100 flex items-start gap-4">
                <Info className="w-6 h-6 text-slate-400 flex-shrink-0" />
                <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-2xl">
                  <strong>Need help?</strong> If you believe this is an error and you have already registered, please contact your local Board of Elections immediately at <a href="tel:1-800-VOTE-NOW" className="font-bold text-slate-900 hover:underline">1-800-VOTE-NOW</a>. Registration lookup data is updated every 24 hours.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Ensure the ExternalLink icon is available if used
const ExternalLink: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
)
