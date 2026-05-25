import { motion } from 'motion/react';
import { educationList } from '../data';
import { GraduationCap, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-white relative overflow-hidden text-slate-800">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Intellectual Pedigree
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-3 tracking-tight">
            Education Profile
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Detailed view of my academic journey, representing a rare dual expertise combining advanced computer science research with strategic business management.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="max-w-4xl mx-auto relative border-l border-slate-200 pl-6 sm:pl-8 space-y-12 text-left">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline nodes */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-7 h-7 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-200">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>

              {/* Layout Content */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 hover:bg-white hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-950/5 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/50 pb-3 mb-3">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    {edu.duration}
                  </span>
                  
                  {edu.grade && (
                    <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-250/20">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{edu.grade}</span>
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold font-sans text-slate-950">
                    {edu.degree}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
                    <span className="text-slate-800 font-bold">{edu.institution}</span>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Dhaka, Bangladesh</span>
                    </div>
                  </div>
                </div>

                {edu.field && (
                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span><strong className="text-slate-700 font-sans">Specialization:</strong> {edu.field}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
