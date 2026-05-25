import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Bug, Terminal, Copy, Check, RefreshCw, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  type: 'Happy Path' | 'Boundary Limit' | 'Security / Negative';
  expected: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

interface TestModule {
  name: string;
  tool: 'Cypress' | 'Playwright' | 'K6' | 'Insomnia';
  cases: TestCase[];
}

export default function QAPlayground() {
  const modules: Record<string, TestModule> = {
    'bdtickets': {
      name: 'bdtickets Reservation Flow',
      tool: 'Cypress',
      cases: [
        { id: 'TC-B101', name: 'Purchase multi-journey bus tickets with credit coupon codes', type: 'Happy Path', expected: 'Accurate discount deduction and successful checkout redirection.', status: 'pending' },
        { id: 'TC-B102', name: 'Seat lock boundary: Book 45 seats concurrently on single profile', type: 'Boundary Limit', expected: 'Policy validation blocks excess with "Exceeded Max Seat Allocation".', status: 'pending' },
        { id: 'TC-B103', name: 'Rapid ticketing queries: 250 requests within 2 seconds', type: 'Security / Negative', expected: 'API load balancer handles threshold cleanly without response drop.', status: 'pending' },
      ],
    },
    'lunchbd': {
      name: 'lunchbd Web Order Platform',
      tool: 'Insomnia',
      cases: [
        { id: 'TC-L201', name: 'Fetch menu schedule list for corporate accounts', type: 'Happy Path', expected: 'Returns authentic 200 OK with correct date arrays.', status: 'pending' },
        { id: 'TC-L202', name: 'Validation guard on order schedule threshold (11:00 AM)', type: 'Boundary Limit', expected: 'Blocks submissions at exactly 11:01 AM with error code 400.', status: 'pending' },
        { id: 'TC-L203', name: 'Manipulating payment payload transaction sums directly', type: 'Security / Negative', expected: 'Server rejects mismatched currency check value, throwing 403 Forbidden.', status: 'pending' },
      ],
    },
    'EasyDesk': {
      name: 'EasyDesk Dynamic SLA Triggers',
      tool: 'Playwright',
      cases: [
        { id: 'TC-E301', name: 'Verify ticket escalates automatically upon SLA deadline', type: 'Happy Path', expected: 'Urgency flag gets updated in real-time database.', status: 'pending' },
        { id: 'TC-E302', name: 'Insert maximum characters (10,000+) inside description input', type: 'Boundary Limit', expected: 'Input field clips correctly with readable tooltips, no console errors.', status: 'pending' },
        { id: 'TC-E303', name: 'Ticket submission with raw HTML/Script payload injection', type: 'Security / Negative', expected: 'System sanitizes entries safely, rendering them strictly as text.', status: 'pending' },
      ],
    }
  };

  const [activeModuleKey, setActiveModuleKey] = useState<string>('bdtickets');
  const [activeModule, setActiveModule] = useState<TestModule>(modules.bdtickets);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [customFail, setCustomFail] = useState<boolean>(true); // Let users experience a mock failure to trigger the Jira report!
  const [copied, setCopied] = useState(false);

  // Sync active module state on tab changes
  useEffect(() => {
    setActiveModule(JSON.parse(JSON.stringify(modules[activeModuleKey])));
    setLogs([]);
    setIsRunning(false);
  }, [activeModuleKey]);

  const triggerSimulation = async () => {
    setIsRunning(true);
    setLogs(['Initiating test runtime engine...', `$ npx ${activeModule.tool.toLowerCase()} run --module ${activeModuleKey}`]);
    
    // Reset statuses to running
    const updated = { ...activeModule };
    updated.cases.forEach(tc => tc.status = 'running');
    setActiveModule(updated);

    // Simulate logs in step intervals
    for (let i = 0; i < updated.cases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const nextCases = [...updated.cases];
      
      // Intentional Fail for the last case to let recruiters explore the "Generate JIRA report" feature
      const isLast = i === updated.cases.length - 1;
      const pass = isLast ? !customFail : true;
      
      nextCases[i].status = pass ? 'passed' : 'failed';
      setActiveModule({ ...updated, cases: nextCases });

      setLogs(prev => [
        ...prev,
        `[${nextCases[i].id}] Running "${nextCases[i].name}"...`,
        pass 
          ? `✔ SUCCESS: Expected outcome met. (${Math.floor(Math.random() * 300) + 150}ms)`
          : `✖ CRITICAL FAILURE: Expectation mismatch. Returned status code 503 (620ms)`
      ]);
    }

    setLogs(prev => [...prev, '\nSimulation complete. Please review reports.']);
    setIsRunning(false);
  };

  const getJiraTemplate = () => {
    const failedCase = activeModule.cases.find(c => c.status === 'failed');
    if (!failedCase) return '';

    return `**PROJECT:** ${activeModule.name}
**TEST CASE ID:** ${failedCase.id}
**BUG TITLE:** [BUG] Concurrency threshold verification failed during load testing inside ${activeModuleKey}
**SEVERITY:** High (Business Blocking)
**REPORTER:** Tahsin Ahmed (Software QA Engineer)
**ENVIRONMENT:** Staging / Sandboxed QA Environment

**STEPS TO REPRODUCE:**
1. Initialize active automation package with command: npx ${activeModule.tool.toLowerCase()} run
2. Fire stress configuration: "${failedCase.name}"
3. Monitor server response times and transaction lock files.

**EXPECTED RESULT:**
${failedCase.expected}

**ACTUAL RESULT:**
Server locks, returning 503 Service Unavailable with gateway timeout. Latency reached 6.2 seconds before thread termination.

**SUGGESTED MITIGATION:**
Implement standard queue buffer locks on seat/billing microservices to prevent database transaction collisions under peak concurrent bursts.`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getJiraTemplate());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const failedCaseExists = activeModule.cases.some(c => c.status === 'failed');

  return (
    <section id="qa-playground" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-blue-900/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest bg-blue-950 px-3 py-1.5 rounded-full border border-blue-900/40">
            Interactive Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white mt-3 tracking-tight">
            QA Playground & Automation Simulator
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Act as a Lead Developer or Recruiter! Run Tahsin's programmatic test suites, simulate real edge-case failures, and generate professional Jira Bug Reports.
          </p>
        </div>

        {/* Modules Navigation tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-blue-950/60 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-blue-950 pb-2.5">
                1. Select Target Application
              </h4>
              <div className="flex flex-col gap-2">
                {Object.keys(modules).map((key) => {
                  const m = modules[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveModuleKey(key)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                        activeModuleKey === key
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{m.name}</div>
                      <div className={`text-[10px] font-mono mt-0.5 ${activeModuleKey === key ? 'text-blue-200' : 'text-blue-400'}`}>
                        Engine: {m.tool}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Test Configuration Card */}
            <div className="bg-slate-900 border border-blue-950/60 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-blue-950 pb-2.5">
                2. Suite Configuration
              </h4>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-sans">Introduce Edge-Case Failure</span>
                <button
                  onClick={() => setCustomFail(!customFail)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                    customFail ? 'bg-blue-600' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-250 ease-in-out ${
                      customFail ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                When enabled, the complex concurrency test will intentionally fail, allowing you to trigger a structured Jira defect report representation on the right.
              </p>

              <button
                onClick={triggerSimulation}
                disabled={isRunning}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-sans text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-blue-600/10 active:scale-[0.98] transition-all"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Spec Tests...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Execute SQA Automation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Test run visual interface column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Specs Check list */}
            <div className="bg-slate-900 border border-blue-950/60 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold font-mono text-blue-400 uppercase tracking-widest border-b border-blue-950 pb-2.5 flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span>Verification Specs Matrix ({activeModule.tool})</span>
              </h3>

              <div className="space-y-3">
                {activeModule.cases.map((tc) => (
                  <div
                    key={tc.id}
                    className="p-4 rounded-xl border bg-slate-950/80 border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950 border border-blue-900/30 px-1.5 py-0.5 rounded">
                          {tc.id}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 font-sans uppercase">
                          {tc.type}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-sans text-slate-200">
                        {tc.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-sans">
                        <strong className="text-slate-300">Expected:</strong> {tc.expected}
                      </p>
                    </div>

                    {/* Status badge */}
                    <div className="shrink-0 pt-1">
                      {tc.status === 'pending' && (
                        <span className="text-[10px] text-slate-500 font-mono font-semibold border border-slate-800 px-2 py-1 rounded bg-slate-950">
                          PENDING
                        </span>
                      )}
                      {tc.status === 'running' && (
                        <span className="text-[10px] text-blue-400 font-mono font-semibold border border-blue-900/40 px-2 py-1 rounded bg-blue-950/50 animate-pulse flex items-center space-x-1">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>RUNNING</span>
                        </span>
                      )}
                      {tc.status === 'passed' && (
                        <span className="text-[10px] text-emerald-400 font-mono font-bold border border-emerald-990/40 px-2 py-1 rounded bg-emerald-950/30 flex items-center space-x-1">
                          <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                          <span>PASSED</span>
                        </span>
                      )}
                      {tc.status === 'failed' && (
                        <span className="text-[10px] text-rose-400 font-mono font-bold border border-rose-950/40 px-2 py-1 rounded bg-rose-950/30 flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>FAILED</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Console and Jira Report generation panel */}
            <AnimatePresence>
              {(logs.length > 0 || failedCaseExists) && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Console logs */}
                  <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 overflow-hidden font-mono text-[11px] text-slate-300 text-left space-y-2 h-[340px] flex flex-col justify-between">
                    <div className="border-b border-slate-900 pb-2 text-slate-500 flex justify-between items-center">
                      <span>CONSOLE OUTPUT</span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin pr-1 opacity-90">
                      {logs.map((log, i) => (
                        <div key={i} className={log.startsWith('✖') ? 'text-rose-400' : log.startsWith('✔') ? 'text-emerald-400' : 'text-slate-300'}>
                          {log}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-900 text-slate-500 text-[10px] flex justify-between">
                      <span>Thread: MainSrv-QA</span>
                      <span>UTF-8 Engine</span>
                    </div>
                  </div>

                  {/* Bug tracker report representation */}
                  <div className="bg-slate-900 border border-blue-950/40 rounded-2xl p-5 flex flex-col justify-between h-[340px]">
                    <div className="space-y-2 text-left">
                      <div className="flex items-center justify-between border-b border-blue-950/80 pb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                          <Bug className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                          <span>Defect Log Generator</span>
                        </span>
                        {failedCaseExists && (
                          <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono font-bold text-[9px] px-1.5 py-0.5 rounded">
                            Defect Found
                          </span>
                        )}
                      </div>

                      {failedCaseExists ? (
                        <>
                          <h4 className="text-xs sm:text-sm font-bold font-sans text-white text-left">
                            Auto Generate JIRA Log
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Cypress validation discovered a boundary stress exception. Press Copy to output a standard developer-ready markdown bug report block.
                          </p>
                          
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[10px] text-left text-slate-400 font-mono h-[142px] overflow-y-auto overflow-x-hidden select-all whitespace-pre">
                            {getJiraTemplate()}
                          </div>
                        </>
                      ) : (
                        <div className="h-[210px] flex flex-col items-center justify-center text-center space-y-2">
                          <CheckCircle className="w-10 h-10 text-emerald-400" />
                          <h4 className="text-sm font-sans font-bold text-slate-200">Suite Passed Successfully</h4>
                          <p className="text-slate-400 text-xs px-4 max-w-xs leading-relaxed">
                            No exceptions were logged during the simulation. Set "Introduce Edge-Case Failure" to true above, then re-execute.
                          </p>
                        </div>
                      )}
                    </div>

                    {failedCaseExists && (
                      <button
                        onClick={copyToClipboard}
                        className="w-full flex items-center justify-center space-x-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-mono text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">JIRA Log Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Jira Ticket Markdown</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
