import { useState, useEffect } from 'react';
import { Menu, X, Bug, GraduationCap, Briefcase, FileText, Award, BookOpen, Terminal, Mail, BarChart3 } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', icon: Terminal },
    { id: 'analytics-dashboard', label: 'Vitals & Analytics', icon: BarChart3 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & Tools', icon: Bug },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'qa-playground', label: 'QA Playground', icon: PlayActiveIcon },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'honors', label: 'Honors & Awards', icon: Award },
  ];

  function PlayActiveIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    );
  }

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-blue-900/40 shadow-lg shadow-blue-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('about')}
            className="flex items-center space-x-2 group focus:outline-none"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all duration-200">
              <Bug className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <span className="block text-white font-mono font-bold leading-none tracking-tight">Tahsin Ahmed</span>
              <span className="block text-[10px] text-blue-400 font-mono font-medium tracking-widest uppercase">QA Engineer • MBA</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md font-sans text-xs font-semibold tracking-wide transition-all duration-250 ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('contact')}
              id="nav-btn-contact"
              className="ml-4 flex items-center space-x-1.5 px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold tracking-wide shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-trigger"
              className="text-slate-300 hover:text-white p-1 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100 border-b border-blue-900/30' : 'max-h-0 opacity-0'
        } bg-slate-900/98 backdrop-blur-lg`}
      >
        <div className="px-3 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md font-sans text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4 text-inherit" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('contact')}
            id="mobile-nav-btn-contact"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 rounded-md bg-blue-600 text-white font-sans text-sm font-bold shadow-md shadow-blue-600/10"
          >
            <Mail className="w-4 h-4" />
            <span>Hire Me</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
