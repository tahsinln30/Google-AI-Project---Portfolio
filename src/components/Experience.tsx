import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, ChevronRight, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { experienceList } from '../data';

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<string>(experienceList[0].id);

  return (
    <section id="experience" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Professional Trajectory
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-3 tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Continuous history of engineering, verifying, and optimizing production-grade software applications for enterprise businesses and telecommunications vendors.
          </p>
        </div>

        {/* Dynamic Two-Column Layout for Desktop, Collapsible Cards for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Experience List Selectors (Left side) */}
          <div className="lg:col-span-4 space-y-3">
            {experienceList.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExp(exp.id)}
                id={`exp-tab-${exp.id}`}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedExp === exp.id
                    ? 'bg-white border-blue-600 shadow-md shadow-blue-100/50 translate-x-2'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className={`text-sm font-bold font-sans transition-colors ${
                      selectedExp === exp.id ? 'text-blue-600' : 'text-slate-900'
                    }`}>
                      {exp.company}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans font-medium">{exp.role}</p>
                  </div>
                  {exp.isCurrent && (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 mt-2.5 text-[11px] text-slate-400 font-mono">
                  <Calendar className="w-3 h-3 text-blue-500" />
                  <span>{exp.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Details Panel (Right side) */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm shadow-slate-100 min-h-[420px] flex flex-col justify-between">
              {experienceList.map((exp) => {
                if (exp.id !== selectedExp) return null;
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-950">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-semibold font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                          {exp.duration}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                        <div className="flex items-center space-x-1.5">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          <span className="text-slate-700 font-bold">{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>Dhaka, Bangladesh</span>
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Key Responsibilities & Deliverables
                      </h4>
                      <ul className="space-y-3">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-slate-600 text-sm leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive SQA Quality Mark */}
                    <div className="pt-4 mt-6 border-t border-slate-100">
                      <div className="flex items-center space-x-2.5 text-xs text-blue-800 bg-blue-50/50 border border-blue-200/50 p-3.5 rounded-xl">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <div>
                          <span className="font-bold">Verified QA Integrity Profile:</span> Full traceability of error-free ticket submissions and high-coverage automation scripts documented.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
