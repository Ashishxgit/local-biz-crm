import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, Star, Award, CheckCircle } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The Signature Hydrafacial transformed my skin texture before my wedding day. The staff is warm, professional, and exceptionally detailed!",
    name: "Camilla R.",
    role: "Verified Client",
    stars: 5,
    treatment: "Hydrafacial Glow"
  },
  {
    quote: "After 3 sessions of Cryo Sculpting, the results speak for themselves. The ambiance feels like a 5-star luxury resort spa in Beverly Hills.",
    name: "Jonathan Vance",
    role: "Executive Member",
    stars: 5,
    treatment: "Cryo Sculpting"
  },
  {
    quote: "Their IV Vitamin therapy got me through intense travel fatigue. Highly recommend Aura Luxe for anyone prioritizing longevity and skin health.",
    name: "Dr. Ananya Mehta",
    role: "Physician & Wellness Enthusiast",
    stars: 5,
    treatment: "IV Vitamin Therapy"
  }
];

export default function AboutTrust() {
  // Simple check for clinic open status
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 9 && currentHour < 19;

  return (
    <section id="about" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* About & Story Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
              The Aura Luxe Standard
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Where Clinical Science Meets <br />
              <span className="text-gradient">Pure Luxury Wellness</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed font-light">
              Founded in 2021 by double board-certified aesthetic specialists, Aura Luxe was created with a single vision: to merge state-of-the-art dermatological protocols with restorative spa serenity.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed font-light">
              We operate with strict FDA-approved technology, medical-grade organic topical formulations, and individualized care plans designed to elevate both internal vitality and external radiance.
            </p>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                'Double Board-Certified Clinical Staff',
                'FDA-Approved Medical Laser & Cryo Equipment',
                'Private VIP Treatment Suites',
                'Complimentary Wellness Refreshments'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Info Box & Hours */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
              
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-400" />
                  <span className="font-serif text-lg font-bold text-white">Opening Hours</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  isOpen 
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                  {isOpen ? 'Open Now' : 'Closed Now (Opens 9 AM)'}
                </div>
              </div>

              {/* Hours List */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-300">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-white font-semibold">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="font-medium">Saturday</span>
                  <span className="text-white font-semibold">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="font-medium">Sunday</span>
                  <span className="text-slate-400 font-semibold">By Appointment Only</span>
                </div>
              </div>

              {/* Location & Contact Info */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Aura Luxe Flagship Clinic</div>
                    <div className="text-slate-400">742 Evergreen Terrace, Suite 400, Metro City</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>(555) 839-2000</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>concierge@auraluxeclinic.com</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Testimonials Sub-section */}
        <div className="pt-10 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Loved by Over 1,200+ Clients
            </h3>
            <p className="text-slate-400 text-sm">
              Read real stories from our community members and recurring VIP guests.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testi, idx) => (
              <div 
                key={idx}
                className="rounded-2xl glass-card p-6 border border-slate-800/80 flex flex-col justify-between hover:border-brand-500/30 transition-colors"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(testi.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{testi.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 mt-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{testi.name}</div>
                    <div className="text-slate-400">{testi.role}</div>
                  </div>
                  <span className="px-2 py-1 rounded bg-brand-950 text-brand-300 text-[10px] font-semibold border border-brand-500/20">
                    {testi.treatment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
