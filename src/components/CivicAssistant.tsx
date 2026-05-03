import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Bot, X, MessageSquare, Info, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const PREDEFINED_QUESTIONS = [
  {
    id: 'register',
    text: 'How do I register to vote?',
    answer: 'You can check your status and register online, by mail, or in-person.',
    link: '/status',
    linkText: 'Check Voter Status'
  },
  {
    id: 'candidates',
    text: 'Who are the candidates this election?',
    answer: 'We have a detailed candidate hub where you can compare platforms and issues.',
    link: '/candidates',
    linkText: 'View Candidate Hub'
  },
  {
    id: 'deadlines',
    text: 'When are the upcoming election deadlines?',
    answer: 'Check out the election process timeline for registration, early voting, and election day details.',
    link: '/#process',
    linkText: 'View Election Timeline'
  },
  {
    id: 'polling',
    text: 'Where is my polling location?',
    answer: 'You can verify your registered polling location by checking your voter status.',
    link: '/status',
    linkText: 'Find Polling Location'
  }
];

export const CivicAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{role: 'model'|'user', content: React.ReactNode}>([
    { 
      role: 'model', 
      content: "Hello! I'm CivicConnect AI. Select a question below to get started:" 
    }
  ]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuestionClick = (q: typeof PREDEFINED_QUESTIONS[0]) => {
    setMessages(prev => [
      ...prev,
      { role: 'user', content: q.text },
      { 
        role: 'model', 
        content: (
          <div className="flex flex-col gap-3">
            <p>{q.answer}</p>
            {q.link.includes('#') ? (
               <a 
                 href={q.link} 
                 onClick={() => setIsOpen(false)}
                 className="inline-flex w-max items-center gap-2 px-3 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
               >
                 {q.linkText} <ChevronRight className="w-3 h-3" />
               </a>
            ) : (
               <Link 
                 to={q.link} 
                 onClick={() => setIsOpen(false)}
                 className="inline-flex w-max items-center gap-2 px-3 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
               >
                 {q.linkText} <ChevronRight className="w-3 h-3" />
               </Link>
            )}
          </div>
        )
      }
    ]);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        id="assistant-trigger"
        aria-label="Open AI Assistant"
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
                  <h2 className="font-black text-xl uppercase tracking-tighter">Civic Assistant</h2>
                  <p className="text-blue-200 text-[10px] uppercase tracking-widest font-bold">Quick Navigation</p>
                </div>
              </div>
              <button aria-label="Close Assistant" onClick={() => setIsOpen(false)} className="p-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
              role="log"
              aria-live="polite"
              aria-label="Civic Assistant message log"
            >
              <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex gap-3 hover:bg-slate-100 transition-colors">
                <Info className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <p className="text-sm text-slate-800 font-bold uppercase">
                  Select a common question below to quickly navigate the platform.
                </p>
              </div>
              
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-1 p-2 border-2 border-slate-900 flex-shrink-0 ${m.role === 'user' ? 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}>
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 text-sm font-medium leading-relaxed border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col ${m.role === 'user' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-900'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Predefined Questions Input Area */}
            <div className="p-6 border-t-4 border-slate-900 bg-white">
              <div className="flex flex-col gap-3">
                {PREDEFINED_QUESTIONS.map(q => (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(q)}
                    className="text-left w-full px-4 py-3 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-100 hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex justify-between items-center"
                  >
                    {q.text}
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
