import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, MapPin, Send, CheckCircle, Bug, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // QA Sanity Checklist
  const [sanityChecks, setSanityChecks] = useState({
    nameLength: false,
    validEmail: false,
    messageFilled: false
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      
      // Perform live QA validations
      setSanityChecks({
        nameLength: next.name.trim().length >= 2,
        validEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email),
        messageFilled: next.message.trim().length >= 10
      });

      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Ensure quality barrier is met before sending request
    if (!sanityChecks.nameLength || !sanityChecks.validEmail || !sanityChecks.messageFilled) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delivery block
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSanityChecks({ nameLength: false, validEmail: false, messageFilled: false });
    }, 1500);
  };

  const allChecksPass = sanityChecks.nameLength && sanityChecks.validEmail && sanityChecks.messageFilled;

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden text-slate-800">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Secure Connection
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 mt-3 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Interested in setting up automated testing suites, quality checks, or coordinating business leadership strategies? Connect directly using the certified gateway below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SQA Contact details info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow flex flex-col justify-between text-left h-full">
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-sans text-slate-950 pb-3 border-b border-slate-100">
                  Tahsin Ahmed CV Index
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  You can contact me directly for professional queries, contract testing advisories, or permanent QA placements in Dhaka or remote frameworks.
                </p>

                <div className="space-y-4">
                  {/* Mail and Address fields */}
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Primary Mail</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 font-sans mt-1 block">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Operational Office</span>
                      <span className="text-sm font-bold text-slate-900 font-sans mt-1 block">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SQA Verification statement */}
                <div className="p-4 bg-blue-50/50 border border-blue-200/50 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-blue-900 font-bold font-mono">
                    <Bug className="w-4 h-4 text-blue-600" />
                    <span>ENCRYPTED QA GATEWAY v1.0</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Message flows validation requires matching basic semantic tests (Name length, structured email patterns, and adequate message parameters) to bypass incoming spam filters automatically.
                  </p>
                </div>
              </div>

              {/* Technical Social icons block */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 mt-6">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive validation form column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all text-left">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto animate-bounce shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 px-4">
                    <h3 className="text-xl font-bold text-slate-900 font-sans">Message Validated & Sent!</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you. Your feedback request has bypassed security checks, formatted into a direct lead, and submitted to Tahsin Ahmed.
                    </p>
                  </div>

                  {/* SQA validation block response */}
                  <div className="max-w-xs mx-auto p-4 bg-slate-950 rounded-xl border border-blue-900/10 text-left font-mono text-[10px] text-slate-300 space-y-1">
                    <p className="text-blue-400 font-bold border-b border-slate-900 pb-1.5 mb-1.5">SANITY SYSTEM STATS</p>
                    <p>STATUS: <span className="text-emerald-400 font-bold">202 ACCEPTED</span></p>
                    <p>RECIPIENT: {personalInfo.email}</p>
                    <p>VALIDATION CHECKS: Passed (3/3)</p>
                    <p>THREAD ID: {Math.random().toString(36).substring(4, 12).toUpperCase()}</p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center space-x-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <span>Submit another thread</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Jane Cooper"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Corporate Mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., coorper@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Subject Topic</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., Contract automation suite, hiring position, etc."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block font-sans">Brief Message Parameters</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Write your email body or contract instructions here... (At least 10 chars)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3  py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all shadow-sm min-h-[96px]"
                    />
                  </div>

                  {/* SQA Sanity requirements bar */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap gap-x-4 gap-y-1 items-center justify-start text-[11px] font-mono text-slate-500">
                    <span className="font-bold text-slate-600">Form Sanity:</span>
                    <span className={sanityChecks.nameLength ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      [Name: {sanityChecks.nameLength ? 'OK' : 'PENDING'}]
                    </span>
                    <span className={sanityChecks.validEmail ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      [Email: {sanityChecks.validEmail ? 'OK' : 'PENDING'}]
                    </span>
                    <span className={sanityChecks.messageFilled ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      [Body Size: {sanityChecks.messageFilled ? 'OK' : 'PENDING'}]
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !allChecksPass}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-sans text-xs font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-blue-600/10 active:scale-95 transition-all outline-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Bug className="w-4 h-4 animate-spin text-inherit" />
                        <span>Validating and Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Dispatch Message Thread</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
