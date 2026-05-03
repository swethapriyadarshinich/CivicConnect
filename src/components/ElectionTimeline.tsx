import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle } from 'lucide-react';
import { TimelineStep } from '../types';

interface Props {
  steps: TimelineStep[];
}

export const ElectionTimeline: React.FC<Props> = ({ steps }) => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-slate-900">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-8 flex flex-col relative ${step.status === 'completed' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'} ${step.status === 'current' ? 'bg-white' : ''}`}
          >
            <span className={`text-6xl font-black block leading-none mb-4 ${step.status === 'completed' ? 'opacity-40' : (step.status === 'current' ? 'text-slate-200' : 'text-white')} `}>
              0{index + 1}
            </span>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${step.status === 'completed' ? 'text-blue-200' : 'text-red-600'}`}>
              {step.date}
            </p>
            <h3 className="font-black text-xl uppercase mt-1 mb-2 leading-tight flex-shrink-0">{step.title}</h3>
            <p className={`text-sm font-medium ${step.status === 'completed' ? 'text-blue-100' : 'text-slate-600'}`}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
