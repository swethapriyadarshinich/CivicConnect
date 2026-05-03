import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, X, MessageSquare, Info } from 'lucide-react';
import { getCivicResponse } from '../services/geminiService';
import { Message } from '../types';

export const CivicAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'model', content: "Hello! I'm CivicConnect. I can help you with voting deadlines, candidate information, and the election process. How can I assist you today?" }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const result = await getCivicResponse(input, history);
    
    setMessages(prev => [...prev, { role: 'model', content: result || "I'm sorry, I couldn't process that. Please try again." }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        id="assistant-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 transition-transform hover:translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="font-black uppercase text-[10px] tracking-widest pr-2">Ask Assistant</span>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-slate-50 z-50 shadow-[-8px_0px_0px_0px_rgba(0,0,0,1)] border-l-4 border-slate-900 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b-4 border-slate-900 flex items-center justify-between bg-blue-600 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 p-2 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-black text-xl uppercase tracking-tighter">CivicConnect AI</h2>
                  <p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Non-Partisan Advisor</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
            >
              <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex gap-3 hover:bg-slate-100 transition-colors">
                <Info className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <p className="text-sm text-slate-800 font-bold uppercase">
                  I search real-time data to help you. Always verify with official local election offices.
                </p>
              </div>
              
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-1 p-2 border-2 border-slate-900 flex-shrink-0 ${m.role === 'user' ? 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}>
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 text-sm font-medium leading-relaxed border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${m.role === 'user' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-900'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Searching civic registry...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t-4 border-slate-900 bg-white">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="How do I register to vote?"
                  className="w-full pl-4 pr-12 py-3 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-px focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-bold text-slate-900 placeholder:text-slate-400"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 p-1.5 bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 active:translate-y-px active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="mt-4 text-[10px] text-center text-slate-500 font-black uppercase tracking-widest">
                POWERED BY GEMINI • ACCESSIBLE VOTING FOR ALL
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
