import { motion } from 'motion/react';
import { honorsList } from '../data';
import { Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Honors() {
  return (
    <section id="honors" className="py-24 bg-slate-950 relative overflow-hidden text-white">
      {/* Dynamic background accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />
        {/* Fine grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest bg-blue-950 px-3 py-1.5 rounded-full border border-blue-900/40">
            Acolytes & Triumphs
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white mt-3 tracking-tight">
            Honors & Awards
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Formal achievements recognizing academic dedication, scholarship standing, and research excellence throughout my educational and professional roadmap.
          </p>
        </div>

        {/* Honors list cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {honorsList.map((honor, idx) => (
            <motion.div
              key={honor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-slate-900/60 border border-blue-950 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/20 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-blue-950/20 transition-all duration-300 relative group text-left"
            >
              <div className="space-y-4">
                {/* Header Trophy */}
                <div className="flex items-center justify-between border-b border-blue-950/80 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-900/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    {idx === 0 ? (
                      <Sparkles className="w-5 h-5 shrink-0" />
                    ) : idx === 1 ? (
                      <Award className="w-5 h-5 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 shrink-0" />
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-semibold bg-blue-950 border border-blue-900/20 px-2 py-0.5 rounded">
                    Distinction {idx + 1}
                  </span>
                </div>

                {/* Body Details */}
                <div className="space-y-2">
                  <h3 className="text-base sm:text-[17px] font-bold font-sans text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {honor.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-400 font-sans tracking-wide">
                    By: {honor.awardedBy}
                  </p>
                  
                  {honor.details && (
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {honor.details}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
