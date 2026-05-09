import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { TimelineStep } from '../types';

interface Props {
  steps: TimelineStep[];
}

export const ElectionTimeline: React.FC<Props> = ({ steps }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
      <div className="p-8 border-b-4 border-slate-900 flex flex-col md:flex-row md:items-center justify-between bg-white">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Election Roadmap</h2>
        <div className="flex gap-4 mt-6 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 border-2 border-slate-900" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-100 border-2 border-slate-900" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Upcoming</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 md:divide-x-4 divide-y-4 md:divide-y-0 divide-slate-900">
        {steps.map((step, index) => {
          const isExpanded = expandedId === step.id;
          return (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleExpand(step.id)}
              className={`p-8 flex flex-col relative cursor-pointer hover:opacity-90 transition-opacity ${step.status === 'completed' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'} ${step.status === 'current' ? 'bg-white' : ''} ${isExpanded ? 'shadow-[inset_0px_0px_15px_rgba(0,0,0,0.1)]' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-6xl font-black block leading-none ${step.status === 'completed' ? 'opacity-40' : (step.status === 'current' ? 'text-slate-200' : 'text-white')} `}>
                  0{index + 1}
                </span>
                {(step.details || step.link) && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-2 ${step.status === 'completed' ? 'text-white' : 'text-slate-900'}`}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                )}
              </div>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${step.status === 'completed' ? 'text-blue-200' : 'text-red-600'}`}>
                {step.date}
              </p>
              <h3 className="font-black text-xl uppercase mt-1 mb-2 leading-tight flex-shrink-0">{step.title}</h3>
              <p className={`text-sm font-medium ${step.status === 'completed' ? 'text-blue-100' : 'text-slate-600'}`}>
                {step.description}
              </p>

              <AnimatePresence>
                {isExpanded && (step.details || step.link) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: "1rem" }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden border-t-2 border-dashed border-current pt-4"
                  >
                    {step.details && (
                      <p className={`text-xs font-bold leading-relaxed mb-4 ${step.status === 'completed' ? 'text-blue-50' : 'text-slate-700'}`}>
                        {step.details}
                      </p>
                    )}
                    {step.link && (
                      <a 
                        href={step.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest hover:underline ${step.status === 'completed' ? 'text-white' : 'text-blue-600'}`}
                      >
                        Learn More <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
