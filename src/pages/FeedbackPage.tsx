import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { SAMPLE_CANDIDATES } from '../constants';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, submit this to backend (e.g. Google Cloud Firestore / Pub/Sub)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <SEO 
        title="Feedback & Complaints" 
        description="Submit your feedback, complaints, or general queries about candidates or the voting process." 
      />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4">
            Voice Your Concerns
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Democracy relies on accountability. Use this form to submit feedback, file complaints, or ask questions about candidates and the election process.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border-2 border-slate-900 p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Feedback Received</h2>
            <p className="text-slate-600 mb-8">
              Thank you for sharing your thoughts. Your feedback has been securely transmitted for review.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)] shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] transition-all"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-900 p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    required 
                    className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 focus:outline-none focus:translate-y-px focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    required 
                    className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 focus:outline-none focus:translate-y-px focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 focus:outline-none focus:translate-y-px focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Category</label>
                <select 
                  id="category" 
                  required 
                  className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 focus:outline-none focus:translate-y-px focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none"
                >
                  <option value="">Select a category</option>
                  <option value="complaint">Candidate Complaint</option>
                  <option value="feedback">General Feedback</option>
                  <option value="query">General Query</option>
                  <option value="technical">Website Technical Issue</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="candidate" className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Related Candidate (Optional)</label>
                <select 
                  id="candidate" 
                  className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 focus:outline-none focus:translate-y-px focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none"
                >
                  <option value="">-- None / General --</option>
                  {Array.from(new Set(SAMPLE_CANDIDATES.map(c => c.name))).sort().slice(0, 50).map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  required 
                  placeholder="Please provide specifics about your concern or query..."
                  className="w-full bg-slate-50 border-2 border-slate-900 px-4 py-3 focus:outline-none focus:translate-y-px focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all resize-y"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-slate-800 hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(37,99,235,1)] shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] transition-all group"
                >
                  Submit Inquiry
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Protected by standard security protocols.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
