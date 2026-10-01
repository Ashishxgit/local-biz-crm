import React from 'react';
import { Sparkles, LayoutDashboard, Home, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, newLeadsCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-teal-400 to-cyan-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-brand-300 transition-colors">
              Aura Luxe
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-brand-400 font-semibold">
              Medical Spa & Wellness
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#services" 
            onClick={() => setCurrentView('landing')}
            className="text-sm font-medium text-slate-300 hover:text-brand-300 transition-colors"
          >
            Services & Pricing
          </a>
          <a 
            href="#about" 
            onClick={() => setCurrentView('landing')}
            className="text-sm font-medium text-slate-300 hover:text-brand-300 transition-colors"
          >
            About & Hours
          </a>
          <a 
            href="#contact" 
            onClick={() => setCurrentView('landing')}
            className="text-sm font-medium text-slate-300 hover:text-brand-300 transition-colors"
          >
            Book Appointment
          </a>
        </nav>

        {/* Action Controls & Admin Switcher */}
        <div className="flex items-center gap-3">
          {currentView === 'landing' ? (
            <button
              onClick={() => setCurrentView('admin')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 text-sm font-semibold transition-all duration-300 hover:border-brand-500/50 shadow-md group"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-400 group-hover:rotate-12 transition-transform" />
              <span>CRM Admin</span>
              {newLeadsCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-brand-500 text-slate-950 rounded-full animate-pulse">
                  {newLeadsCount}
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-slate-950 text-sm font-bold transition-all duration-300 shadow-glow"
            >
              <Home className="w-4 h-4" />
              <span>View Public Site</span>
            </button>
          )}

          {currentView === 'landing' && (
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-teal-400 text-slate-950 text-sm font-bold shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              <span>Inquire Now</span>
            </a>
          )}
        </div>

      </div>
    </header>
  );
}
