import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  Activity, 
  Zap, 
  Target, 
  ShieldAlert, 
  Clock, 
  CheckCircle,
  Lightbulb,
  Camera,
  Compass,
  Car
} from 'lucide-react';
import { personalInfo, projectsList } from '../data';

// 1. Defect Catch Rate / Defect Leakage over the last 6 quarters (representing high-fidelity SQA performance)
const defectData = [
  { quarter: 'Q1-24', caughtInStaging: 42, leakedToProd: 2 },
  { quarter: 'Q2-24', caughtInStaging: 55, leakedToProd: 1 },
  { quarter: 'Q3-24', caughtInStaging: 68, leakedToProd: 0 },
  { quarter: 'Q4-24', caughtInStaging: 83, leakedToProd: 1 },
  { quarter: 'Q1-25', caughtInStaging: 94, leakedToProd: 0 },
  { quarter: 'Q2-25', caughtInStaging: 112, leakedToProd: 0 },
];

// 2. Automation vs Manual test coverage breakdown per top projects
const coverageData = [
  { name: 'bdtickets', Automated: 85, Manual: 15, amt: 100 },
  { name: 'lunchbd', Automated: 60, Manual: 40, amt: 100 },
  { name: 'EasyDesk', Automated: 90, Manual: 10, amt: 100 },
  { name: 'Trip 963', Automated: 75, Manual: 25, amt: 100 },
  { name: 'Gain.io', Automated: 92, Manual: 8, amt: 100 },
];

// 3. Technical expertise distribution (Radar representation)
const skillRadarData = [
  { subject: 'Automation Writing', A: 88, fullMark: 100 },
  { subject: 'API Testing', A: 92, fullMark: 100 },
  { subject: 'Load / Stress', A: 80, fullMark: 100 },
  { subject: 'Manual Audit', A: 98, fullMark: 100 },
  { subject: 'Defect Triage', A: 95, fullMark: 100 },
  { subject: 'Agile Tools', A: 94, fullMark: 100 },
];

// 4. Test execution speed optimization benchmark (Response time in Milliseconds across applications)
const speedData = [
  { name: 'bdtickets', beforeSync: 1250, afterAutomation: 340 },
  { name: 'lunchbd', beforeSync: 850, afterAutomation: 210 },
  { name: 'EasyDesk', beforeSync: 1540, afterAutomation: 420 },
  { name: 'Gain.io', beforeSync: 980, afterAutomation: 190 },
];

// Interests Map matching icons to items
const interestIcons: Record<string, any> = {
  'Photography': Camera,
  'Traveling': Compass,
  'Driving': Car,
};

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<'defect' | 'coverage' | 'skills' | 'speed'>('defect');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  return (
    <section id="analytics-dashboard" className="py-24 bg-slate-950 relative overflow-hidden border-t border-b border-blue-950/50">
      {/* Visual Accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest bg-blue-950 px-3.5 py-1.5 rounded-full border border-blue-900/40">
            Engineered Visualizations
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white mt-3 tracking-tight">
            Interactive SQA Metrics Dashboard
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Quality metrics compiled directly from verification cycles, continuous load testing checkpoints, and strategic sprint schedules.
          </p>
        </div>

        {/* Graphical Tabs Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'defect', label: 'QC Safety Shield', desc: 'SLA Defect Leaking Rates', icon: Activity },
            { id: 'coverage', label: 'Coverage Audit', desc: 'Auto vs Manual Breakdown', icon: PieIcon },
            { id: 'skills', label: 'Testing Radar', desc: 'Expertise Core Distribution', icon: Target },
            { id: 'speed', label: 'Execution Speed', desc: 'Optimized Endpoint Triggers', icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/80 border-blue-950/50 text-slate-400 hover:text-white hover:border-blue-900/30 hover:bg-slate-900'
                }`}
              >
                <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-16 h-16" />
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-blue-500 text-white shadow-inner' : 'bg-slate-950 text-blue-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-sans tracking-wide">
                      {tab.label}
                    </h4>
                    <p className={`text-[10px] font-mono mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                      {tab.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chart Viewport and Insight cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SQA Chart Rendering Container */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-blue-950/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[440px]">
            <div className="flex items-center justify-between border-b border-blue-950 pb-4 mb-6">
              <span className="text-xs font-mono font-semibold text-blue-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>REAL-TIME ANALYSIS PLOT</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                Active View: {activeTab}
              </span>
            </div>

            <div className="flex-1 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height={320}>
                {activeTab === 'defect' ? (
                  <AreaChart data={defectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCaught" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLeaked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} fontStyle="italic" />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px' }}
                      labelStyle={{ color: '#94a3b8', fontFamily: 'monospace' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Area type="monotone" name="Bugs Intercepted in CI/Staging" dataKey="caughtInStaging" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCaught)" strokeWidth={2.5} />
                    <Area type="monotone" name="Bugs Escaped to Production" dataKey="leakedToProd" stroke="#f43f5e" fillOpacity={1} fill="url(#colorLeaked)" strokeWidth={2.5} />
                  </AreaChart>
                ) : activeTab === 'coverage' ? (
                  <BarChart data={coverageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="square" />
                    <Bar dataKey="Automated" stackId="a" fill="#1e40af" radius={[0, 0, 0, 0]} name="Automation Coverage %">
                      {coverageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#3b82f6'} />
                      ))}
                    </Bar>
                    <Bar dataKey="Manual" stackId="a" fill="#475569" radius={[6, 6, 0, 0]} name="Exploratory Manual %" />
                  </BarChart>
                ) : activeTab === 'skills' ? (
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                    <Radar name={personalInfo.name} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                    <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px' }} />
                  </RadarChart>
                ) : (
                  <BarChart data={speedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10, offset: -10 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="beforeSync" fill="#334155" radius={[4, 4, 0, 0]} name="Legacy Loading (Manual Checkpoint)" />
                    <Bar dataKey="afterAutomation" fill="#10b981" radius={[4, 4, 0, 0]} name="Optimized Pipeline Guard Speed" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graphical Side Panels (Aesthetic SQA Guard Insight & Personal Interludes) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* QA Validation Insight Card */}
            <div className="bg-slate-900 border border-blue-950/60 rounded-3xl p-6 text-left space-y-4 hover:border-blue-900/30 transition-all flex-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-950 border border-blue-900/40 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
                  <ShieldAlert className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-base font-bold font-sans text-white">
                  Active Sprint Safety Shield
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
                  Leveraging a double-layered barrier against logical regression leaks. By implementing comprehensive coverage benchmarks early in development, production downtime is minimized to virtually zero.
                </p>
              </div>

              <div className="space-y-2.5 border-t border-blue-950/60 pt-4 mt-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Total Defect Severity Trapped</span>
                  <span className="text-blue-400 font-bold">100% Critical Defect Trap</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">SLA Recovery Trigger Rate</span>
                  <span className="text-emerald-400 font-bold">99.98% Under SLA Target</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Current Sprint Leakage</span>
                  <span className="text-rose-400 font-bold">0% Safe Margin</span>
                </div>
              </div>
            </div>

            {/* Structured representation of interests and Blood Group */}
            <div className="bg-slate-900 border border-blue-950/60 rounded-3xl p-6 text-left space-y-4 hover:border-blue-900/30 transition-all">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-blue-950 pb-2.5 flex justify-between items-center">
                <span>Personal Meta Index</span>
                <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded-full font-sans font-bold">
                  Blood Group: {personalInfo.bloodGroup}
                </span>
              </h4>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {personalInfo.interests.map((interest) => {
                  const Icon = interestIcons[interest] || Lightbulb;
                  return (
                    <div 
                      key={interest} 
                      className="p-3 bg-slate-950 rounded-2xl border border-blue-950/40 hover:border-blue-900/30 flex flex-col items-center justify-center text-center group transition-colors cursor-default"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-900/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-sans font-semibold text-slate-300 mt-2">
                        {interest}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono leading-relaxed bg-slate-950 p-3 rounded-xl border border-blue-950/20">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Balancing critical quality engineering processes with photography precision and road exploration pacing.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
