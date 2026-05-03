import React from 'react';
import { MapPin, ExternalLink, Mail, Phone, Globe, Search, CheckCircle, Download, Info, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const RepFinder: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 px-6">
      <div className="bg-slate-900 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-white flex flex-col justify-between overflow-hidden relative">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-900 text-slate-900 font-bold text-[10px] uppercase tracking-widest mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <MapPin className="w-3 h-3" />
            Live Lookup
          </div>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tighter mb-8">Who speaks for you?</h2>
          <p className="text-slate-300 font-medium mb-10 max-w-sm leading-relaxed">
            Enter your address to instantly identify your local, state, and federal representatives and contact them directly.
          </p>
          
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
            <input 
              id="rep-search"
              type="text" 
              placeholder="Enter your street address, city..." 
              autoComplete="address-line1"
              aria-label="Enter your street address or city to find representatives"
              className="relative z-0 w-full bg-white border-2 border-slate-900 text-slate-900 pl-14 pr-6 py-5 focus:outline-none focus:translate-y-px focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-lg placeholder:text-slate-400"
            />
          </div>

          <div className="mt-8 p-6 border-2 border-slate-700 bg-slate-800 flex flex-col justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Voter Status</h4>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-300 font-medium">Verify your electoral registration, locate your precinct, and stay prepared for the upcoming election.</p>
              <Link to="/status" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 border-2 border-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 transition-colors tooltip">
                <CheckCircle className="w-4 h-4" />
                Check Voter Status & Register
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-4 italic flex items-center gap-1">
              <Info className="w-3 h-3" /> Registration deadlines are approaching fast!
            </p>
          </div>
        </div>

        {/* Visual Decoration */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600 opacity-20 pointer-events-none" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Your Poll Location</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">Next Election: Nov 03</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mt-8">
             <div className="w-full md:w-2/5 aspect-square bg-slate-100 border-2 border-slate-900 overflow-hidden flex-shrink-0 relative">
               <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=402%20Civic%20Center%20Dr,%20Spring%20Valley,%20CA%2091977+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
                <div className="absolute inset-0 border-2 border-slate-900 pointer-events-none"></div>
             </div>
             <div className="flex flex-col justify-between">
               <div>
                 <p className="font-black uppercase text-xl mb-2 tracking-tight">Central Community Library</p>
                 <p className="text-slate-600 font-medium text-sm mb-2">402 Civic Center Dr<br/>Spring Valley, CA 91977</p>
                 <p className="text-blue-600 font-black text-sm uppercase mb-4 tracking-tight">OPEN: 7AM - 8PM</p>
                 
                 <div className="mb-6 bg-slate-50 p-4 border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Booth In-Charge</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-slate-200 border-2 border-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Officer" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase text-slate-900">Maria Gonzalez</p>
                        <p className="text-[10px] font-medium text-slate-500">Chief Election Officer</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href="tel:555-019-2837" aria-label="Call Office Maria Gonzalez" className="group relative bg-white border border-slate-300 p-2 text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[10px] py-1 px-2 font-bold uppercase tracking-widest whitespace-nowrap z-20">Call Officer</span>
                      </a>
                      <a href="mailto:mgonzalez@county.gov" aria-label="Email Officer Maria Gonzalez" className="group relative bg-white border border-slate-300 p-2 text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-colors">
                        <Mail className="w-4 h-4" />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[10px] py-1 px-2 font-bold uppercase tracking-widest whitespace-nowrap z-20">Email Officer</span>
                      </a>
                    </div>
                 </div>
               </div>
               
               <div className="flex flex-wrap gap-4">
                 <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-colors">
                   <Globe className="w-4 h-4" />
                   Directions
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50 transition-colors">
                   <ExternalLink className="w-4 h-4" />
                   Info
                 </button>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-100 p-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Quick Contacts</h3>
          <div className="space-y-4">
            <ContactItem name="Board of Elections" role="Local County Office" email="elections@county.gov" phone="(555) 012-3456" />
            <ContactItem name="Voter Hotline" role="Election Integrity" email="help@voter.org" phone="1-800-VOTE-NOW" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ name, role, email, phone }: { name: string, role: string, email: string, phone: string }) => (
  <div className="flex items-center justify-between p-4 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-50 hover:border-red-600 transition-colors">
    <div>
      <h4 className="font-black uppercase text-sm">{name}</h4>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{role}</p>
    </div>
    <div className="flex gap-2">
      <a href={`mailto:${email}`} aria-label={`Email ${name}`} className="group relative p-2 bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors text-slate-900 border-2 border-slate-900 cursor-pointer">
        <Mail className="w-4 h-4" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[10px] py-1 px-2 font-bold uppercase tracking-widest whitespace-nowrap z-20">Email</span>
      </a>
      <a href={`tel:${phone}`} aria-label={`Call ${name}`} className="group relative p-2 bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors text-slate-900 border-2 border-slate-900 cursor-pointer">
        <Phone className="w-4 h-4" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[10px] py-1 px-2 font-bold uppercase tracking-widest whitespace-nowrap z-20">Call</span>
      </a>
      <a href="#" aria-label={`Visit Website for ${name}`} className="group relative p-2 bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors text-slate-900 border-2 border-slate-900 cursor-pointer">
        <Globe className="w-4 h-4" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[10px] py-1 px-2 font-bold uppercase tracking-widest whitespace-nowrap z-20">Website</span>
      </a>
    </div>
  </div>
);
