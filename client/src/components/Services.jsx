import React from 'react';
import { Sparkles, Zap, Flame, Droplet, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'hydrafacial',
    name: 'Signature Hydrafacial Glow',
    category: 'Facial Aesthetics',
    price: '$189',
    duration: '60 Min',
    description: 'Medical-grade hydradermabrasion that cleanses, extracts, and hydrates with super serums.',
    features: ['Vortex extraction technology', 'Hyaluronic acid infusion', 'Red LED anti-aging therapy'],
    icon: Sparkles,
    badge: 'Best Seller'
  },
  {
    id: 'cryo-sculpt',
    name: 'Cryotherapy Body Sculpting',
    category: 'Body Contouring',
    price: '$249',
    duration: '45 Min',
    description: 'Targeted sub-zero thermal shock to freeze stubborn fat cells and boost collagen production.',
    features: ['Non-invasive fat cell reduction', 'Skin tightening & toning', 'Lymphatic drainage booster'],
    icon: Flame,
    badge: 'Trending'
  },
  {
    id: 'iv-detox',
    name: 'IV Vitamin Wellness Drips',
    category: 'Holistic Health',
    price: '$145',
    duration: '30 Min',
    description: 'Custom formulation of essential vitamins, antioxidants, and electrolytes directly into your bloodstream.',
    features: ['Instant cellular hydration', 'Immune defense boost', 'High-dose Vitamin C & Glutathione'],
    icon: Droplet,
    badge: 'Popular'
  },
  {
    id: 'laser-skin',
    name: 'Pico-Laser Skin Rejuvenation',
    category: 'Clinical Dermatology',
    price: '$299',
    duration: '50 Min',
    description: 'Advanced ultra-short laser pulses to erase hyperpigmentation, acne scars, and fine lines.',
    features: ['Erases sun spots & scars', 'Stimulates deep elastin', 'Minimal discomfort'],
    icon: Zap,
    badge: 'Advanced'
  }
];

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
            Premium Offerings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Curated Services & Signature Treatments
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            Each treatment is customized by our clinical specialists to deliver noticeable, long-lasting wellness and aesthetic results.
          </p>
        </div>

        {/* Services Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="group relative rounded-2xl glass-card p-6 border border-slate-800 hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-glow"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-slate-950 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-brand-950 text-brand-300 text-[10px] font-bold tracking-wider uppercase border border-brand-500/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Category & Title */}
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-brand-300 transition-colors">
                    {service.name}
                  </h3>

                  {/* Pricing & Duration */}
                  <div className="flex items-baseline gap-3 my-4">
                    <span className="text-2xl font-bold text-white">{service.price}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-400" /> {service.duration}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  {/* Features Bullet List */}
                  <ul className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Action */}
                <a
                  href="#contact"
                  onClick={() => onSelectService(service.name)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-brand-500 text-slate-200 hover:text-slate-950 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-slate-700 hover:border-brand-400"
                >
                  <span>Select & Book</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
