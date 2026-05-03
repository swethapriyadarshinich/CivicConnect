import React from 'react';
import { MapPin, ExternalLink, Mail, Phone, Globe, Search } from 'lucide-react';
import { motion } from 'motion/react';

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
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Enter your street address, city..." 
              className="w-full bg-white border-2 border-slate-900 text-slate-900 pl-14 pr-6 py-5 focus:outline-none focus:translate-y-px focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-lg placeholder:text-slate-400"
            />
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
             <div>
               <p className="font-black uppercase text-xl mb-2 tracking-tight">Central Community Library</p>
               <p className="text-slate-600 font-medium text-sm mb-2">402 Civic Center Dr<br/>Spring Valley, CA 91977</p>
               <p className="text-blue-600 font-black text-sm uppercase mb-6 tracking-tight">OPEN: 7AM - 8PM</p>
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
      <button className="p-2 bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors text-slate-900 border-2 border-slate-900">
        <Mail className="w-4 h-4" />
      </button>
      <button className="p-2 bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors text-slate-900 border-2 border-slate-900">
        <Phone className="w-4 h-4" />
      </button>
    </div>
  </div>
);
