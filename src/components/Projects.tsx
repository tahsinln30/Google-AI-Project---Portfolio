import { useState } from 'react';
import { motion } from 'motion/react';
import { projectsList } from '../data';
import { Search, Globe, Smartphone, FolderGit, Cpu, CheckSquare } from 'lucide-react';

export default function Projects() {
  const [filterType, setFilterType] = useState<'All' | 'Web' | 'Mobile' | 'Web & Mobile'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsList.filter((project) => {
    // Type Filter
    const matchesType = filterType === 'All' || project.type === filterType;
    
    // Search Query Filter
    const searchString = `${project.name} ${project.description} ${project.tags.join(' ')}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-slate-50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              Assurance Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-3 tracking-tight">
              QA Project History
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Explore concrete software applications verified using robust manual test coverage matrices and automated playwright, k6 and cypress spec scripts. 
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by project or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-slate-100">
          {(['All', 'Web', 'Mobile', 'Web & Mobile'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`pb-3 px-2 font-sans text-xs sm:text-sm font-semibold border-b-2 transition-all duration-200 relative ${
                filterType === type
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{type === 'All' ? 'All Verified Apps' : type}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-white border border-slate-200 hover:border-blue-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category Icons and Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-all duration-200 shadow-sm">
                      {project.type.includes('Mobile') ? (
                        <Smartphone className="w-5 h-5 shrink-0" />
                      ) : (
                        <Globe className="w-5 h-5 shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-blue-500 uppercase tracking-widest flex items-center space-x-1">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{project.type}</span>
                    </span>
                  </div>

                  {/* Project Name & Description */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="text-base sm:text-lg font-bold font-sans text-slate-950 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed min-h-[72px]">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* SQA Tags List */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap gap-1.5 justify-start">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-50 group-hover:bg-blue-50/50 border border-slate-200/60 text-[10px] font-mono text-slate-500 group-hover:text-blue-700 rounded-md px-2 py-0.5 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl">
            <FolderGit className="w-12 h-12 text-slate-300 mx-auto animate-bounce mb-3" />
            <h3 className="text-lg font-bold text-slate-800 font-sans">No matching verification suites found</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
              Try adjusting your query or filters. (e.g. Try typing "Cypress", "K6", or "Robi")
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
