import { useState } from 'react';
import { motion } from 'motion/react';
import { skillsList } from '../data';
import { Bug, Sliders, Settings, CheckCircle2, Terminal } from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'automation' | 'tools'>('all');

  const filteredSkills = activeTab === 'all'
    ? skillsList
    : skillsList.filter(skill => skill.category === activeTab);

  const categories = [
    { id: 'all', label: 'All Capabilities', icon: Sliders },
    { id: 'core', label: 'Core QA & Verification', icon: Bug },
    { id: 'automation', label: 'Automation & Scripts', icon: Terminal },
    { id: 'tools', label: 'Management & Tools', icon: Settings },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-12 left-12 w-[350px] h-[350px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest bg-blue-950 px-3 py-1.5 rounded-full border border-blue-900/40">
            Skills Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white mt-3 tracking-tight">
            Technical SQA Capabilities
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Expertise structured into clean quality assurance testing methodologies, programmatic automation scripts, and industry-standard agile collaboration systems.
          </p>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                id={`skill-tab-${cat.id}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-sans text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Skill Bars List */}
          <div className="bg-slate-950 border border-blue-950 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl shadow-blue-950/10 mb-8 md:mb-0">
            <h3 className="text-sm font-bold font-mono text-blue-400 uppercase tracking-widest border-b border-blue-950 pb-3">
              Core Competencies Index
            </h3>

            <div className="space-y-5">
              {filteredSkills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white font-semibold flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{skill.name}</span>
                    </span>
                    <span className="text-blue-400 font-bold">{skill.level}% Confidence</span>
                  </div>

                  {/* Range indicator bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800/60 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="bg-blue-500 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SQA philosophy details / explanation column */}
          <div className="space-y-6">
            <div className="bg-slate-950 border border-blue-950 rounded-2xl p-6 sm:p-8 shadow-xl shadow-blue-950/10">
              <h3 className="text-base font-bold font-sans text-white mb-4">
                Testing Policy & Quality Mindset
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Quality isn't checked at the end — it's designed from the inception. My testing strategy integrates programmatic functional automations with thorough exploratory manual test scenarios to reveal complex bugs before they impact customers.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-white font-sans font-semibold">Boundary Value & Partition Testing: </strong>
                    Rigorous data boundary testing to ensure software fails gracefully under stress.
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-white font-sans font-semibold">CI/CD Automated Integration: </strong>
                    Coupled Cypress & Playwright scripts embedded inside GitHub actions workflows to trigger tests on every pull request.
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-white font-sans font-semibold">Performance Load Budgets: </strong>
                    Simulate concurrent API request nodes using K6 stress tools to measure service thresholds and eliminate bottlenecks.
                  </div>
                </div>
              </div>
            </div>

            {/* Micro badges of tools */}
            <div className="bg-slate-950 border border-blue-950 rounded-2xl p-6 sm:p-8 shadow-xl shadow-blue-950/10">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4">
                Active Tech Toolkit
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Playwright', 'Cypress', 'K6', 'Insomnia APIs', 'JIRA', 'ClickUp', 'Git', 'GitHub', 'TypeScript', 'Jest', 'Chrome Tools', 'Slack', 'VS Code'].map(tool => (
                  <span
                    key={tool}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-md text-xs font-mono text-slate-300 hover:text-white transition-all cursor-default"
                  >
                    #{tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
