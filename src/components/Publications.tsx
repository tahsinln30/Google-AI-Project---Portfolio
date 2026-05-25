import { motion } from 'motion/react';
import { publicationsList } from '../data';
import { BookOpen, ExternalLink, ArrowUpRight, GraduationCap } from 'lucide-react';

export default function Publications() {
  return (
    <section id="publications" className="py-24 bg-slate-50 relative overflow-hidden text-slate-800">
      {/* Decorative accents */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 left-10 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Academic Research
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-3 tracking-tight">
            Scientific Publications
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Peer-reviewed papers exploring wireless computer network topologies, startup software company demographics, and modern management-tech intersections.
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {publicationsList.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white border border-slate-200 hover:border-blue-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg hover:shadow-blue-950/5 transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Header Tag and Year */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-mono text-[10px] tracking-wider uppercase font-bold">Peer Reviewed Paper</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Published {pub.year}
                  </span>
                </div>

                {/* Article Name */}
                <div className="space-y-2 text-left">
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {pub.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 font-mono">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="font-medium">{pub.journal}</span>
                  </div>
                </div>
              </div>

              {/* Redirection Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-blue-500 font-medium transition-colors">
                  Check reference index
                </span>
                
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-500 transition-all cursor-pointer"
                >
                  <span>Open PDF Resource</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
