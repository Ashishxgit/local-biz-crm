import React from 'react';
import { Star, ShieldCheck, Sparkles, Clock, ArrowRight, HeartPulse } from 'lucide-react';

export default function Hero({ onBookClick }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-brand-500/30 backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-400 animate-spin-slow" />
              <span className="text-xs font-semibold tracking-wide uppercase text-brand-300">
                Voted #1 Aesthetic & Wellness Spa 2026
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
              Rejuvenate Your Body. <br />
              <span className="text-gradient">Illuminate Your Aura.</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Experience medical-grade facial treatments, cryotherapy body sculpting, and personalized holistic vitality therapies tailored specifically for your lifestyle.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 via-teal-400 to-cyan-400 text-slate-950 font-bold text-base shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-slate-800/90 text-slate-200 font-semibold text-base border border-slate-700/80 hover:border-brand-500/40 transition-all duration-300 text-center"
              >
                Explore Offerings
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">4.9 / 5.0</div>
                  <div className="text-xs text-slate-400">500+ Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Board Certified</div>
                  <div className="text-xs text-slate-400">Expert MD Staff</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">100% Organic</div>
                  <div className="text-xs text-slate-400">Clinical Formulas</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Card Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Decorative Card */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
                <div className="h-64 rounded-2xl bg-gradient-to-tr from-slate-900 via-teal-950 to-slate-900 border border-brand-500/20 p-6 flex flex-col justify-between relative overflow-hidden group">
                  
                  {/* Subtle Background Art Patterns */}
                  <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-bold text-brand-300 border border-brand-500/30">
                      Popular Treatment
                    </span>
                    <span className="text-sm font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                      $189
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                      Signature Hydrafacial Glow
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Deep pore cleansing, exfoliation, antioxidant hydration & LED therapy.
                    </p>
                  </div>
                </div>

                {/* Quick Info Strip */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-400" /> Duration
                    </span>
                    <span className="font-semibold text-white">60 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Instant Results
                    </span>
                    <span className="font-semibold text-emerald-400">Zero Downtime</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={onBookClick}
                  className="block w-full text-center py-3 rounded-xl bg-brand-600/90 hover:bg-brand-500 text-slate-950 font-bold text-sm transition-all duration-300"
                >
                  Reserve This Experience
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
