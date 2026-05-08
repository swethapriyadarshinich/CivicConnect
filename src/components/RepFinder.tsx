import React, { useState } from 'react';
import { MapPin, ExternalLink, Mail, Phone, Globe, Search, CheckCircle, Download, Info, Building2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { getRepresentatives } from '../services/civicInfoService';

export const RepFinder: React.FC = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [repsData, setRepsData] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await getRepresentatives(address);
      setRepsData(data);
    } catch (err) {
      console.error(err);
      setError('Could not fetch representatives. Please ensure API key is set and address is valid.');
    } finally {
      setLoading(false);
    }
  };

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
            Enter your address to instantly identify your local MLA, MP, corporators, and contact them directly.
          </p>
          
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
            <input 
              id="rep-search"
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your street address, PIN Code..." 
              autoComplete="address-line1"
              aria-label="Enter your pincode or city to find representatives"
              className="relative z-0 w-full bg-white border-2 border-slate-900 text-slate-900 pl-14 pr-24 py-5 focus:outline-none focus:translate-y-px focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-lg placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </form>
          {error && <p className="text-red-400 text-xs font-bold mt-2 uppercase tracking-widest bg-red-900/50 p-2 inline-block border border-red-500">{error}</p>}

          <div className="mt-8 p-6 border-l-4 border-l-blue-500 border-2 border-slate-700 bg-slate-800 flex flex-col justify-between hover:bg-slate-750 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-white">Voter Status</h4>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-300 font-medium">Verify your electoral registration, locate your precinct, and stay prepared for the upcoming election.</p>
              <Link to="/status" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 border-2 border-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <Search className="w-4 h-4" />
                Check Status & Register
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-4 italic flex items-center gap-1">
              <Info className="w-3 h-3 text-red-400" /> Registration deadlines are approaching fast!
            </p>
          </div>
        </div>

        {/* Visual Decoration */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600 opacity-20 pointer-events-none" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="flex items-center justify-between mb-8 border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center rotate-3 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
                <MapPin className="w-6 h-6 -rotate-3" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Your Poll Location</h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 px-3 py-1 border-2 border-emerald-200">Next Election: Apr 19</span>
          </div>
          
          {repsData && repsData.officials && repsData.officials.length > 0 ? (
            <div className="mt-8 border-t-2 border-slate-900 pt-8">
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-2"><Building2 className="w-5 h-5"/> Your Representatives</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {repsData.officials.map((official: any, index: number) => {
                  const office = repsData.offices?.find((o: any) => o.officialIndices.includes(index));
                  return (
                    <div key={index} className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {official.photoUrl && (
                        <img src={official.photoUrl} alt={official.name} className="w-16 h-16 object-cover rounded-full border-2 border-slate-900 mb-2" />
                      )}
                      <p className="font-black text-sm uppercase">{official.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{office?.name || official.party}</p>
                      <div className="flex gap-2 mt-3">
                        {official.phones && official.phones.length > 0 && (
                          <a href={`tel:${official.phones[0]}`} className="p-1 border border-slate-300 hover:bg-slate-900 hover:text-white transition-colors"><Phone className="w-3 h-3" /></a>
                        )}
                        {official.urls && official.urls.length > 0 && (
                          <a href={official.urls[0]} target="_blank" rel="noopener noreferrer" className="p-1 border border-slate-300 hover:bg-slate-900 hover:text-white transition-colors"><Globe className="w-3 h-3" /></a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
             <div className="flex flex-col md:flex-row gap-6 mt-8">
               <div className="w-full md:w-2/5 aspect-square bg-slate-100 border-2 border-slate-900 overflow-hidden flex-shrink-0 relative">
                 <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Block%20A,%20Connaught%20Place,%20New%20Delhi,%20Delhi%20110001&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                  </iframe>
                  <div className="absolute inset-0 border-2 border-slate-900 pointer-events-none"></div>
               </div>
               <div className="flex flex-col justify-between">
                 <div>
                   <p className="font-black uppercase text-xl mb-2 tracking-tight">Government Primary School</p>
                   <p className="text-slate-600 font-medium text-sm mb-2">Block A, Connaught Place<br/>New Delhi, Delhi 110001</p>
                   <p className="text-blue-600 font-black text-sm uppercase mb-4 tracking-tight">OPEN: 7AM - 6PM</p>
                   
                   <div className="mb-6 bg-slate-50 p-4 border border-slate-200 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Presiding Officer</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-slate-200 border-2 border-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Officer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm uppercase text-slate-900">Anjali Sharma</p>
                          <p className="text-[10px] font-medium text-slate-500">Presiding Officer</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a href="tel:555-019-2837" aria-label="Call Office Anjali Sharma" className="group relative bg-white border border-slate-300 p-2 text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-colors">
                          <Phone className="w-4 h-4" />
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[10px] py-1 px-2 font-bold uppercase tracking-widest whitespace-nowrap z-20">Call Officer</span>
                        </a>
                        <a href="mailto:asharma@delhicontact.gov.in" aria-label="Email Officer Anjali Sharma" className="group relative bg-white border border-slate-300 p-2 text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-colors">
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
          )}
        </div>

        <div className="bg-blue-50 p-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter">Election Support Contacts</h3>
          </div>
          <div className="space-y-4">
            <ContactItem name="Election Commission of India" role="National Helpline" email="complaints@eci.gov.in" phone="1950" />
            <ContactItem name="Chief Electoral Officer" role="State Level Office" email="ceo@eci.gov.in" phone="1-800-11-1950" />
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
