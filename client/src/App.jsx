import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutTrust from './components/AboutTrust';
import ContactForm from './components/ContactForm';
import AdminDashboard from './components/AdminDashboard';
import Toast from './components/Toast';
import { fetchLeads } from './services/api';
import { Sparkles, MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'
  const [selectedService, setSelectedService] = useState('');
  const [newLeadsCount, setNewLeadsCount] = useState(0);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  // Check new leads count for Navbar badge
  const checkNewLeads = async () => {
    try {
      const res = await fetchLeads();
      if (res.success && res.data) {
        const count = res.data.filter((l) => l.status === 'New').length;
        setNewLeadsCount(count);
      }
    } catch (err) {
      // Silent error for poll check
    }
  };

  useEffect(() => {
    checkNewLeads();
    const interval = setInterval(checkNewLeads, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
  };

  return (
    <div className="min-h-screen bg-[#0b101d] text-slate-100 flex flex-col selection:bg-brand-500 selection:text-slate-950 font-sans">
      
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />

      {/* Floating Glass Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        newLeadsCount={newLeadsCount}
      />

      {/* View Switcher Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <div className="space-y-4">
            <Hero onBookClick={() => setSelectedService('')} />
            <Services onSelectService={handleSelectService} />
            <AboutTrust />
            <ContactForm
              selectedService={selectedService}
              onLeadSubmitted={checkNewLeads}
              showToast={showToast}
            />
          </div>
        ) : (
          <AdminDashboard showToast={showToast} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 pt-12 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-serif text-lg font-bold text-white">Aura Luxe Clinic</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Premier Medical Spa & Wellness center specializing in advanced hydrafacials, cryotherapy body sculpting, laser rejuvenation, and personalized holistic vitality.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-white uppercase tracking-wider mb-2">Quick Navigation</div>
              <div>
                <button onClick={() => setCurrentView('landing')} className="text-slate-400 hover:text-brand-300 transition-colors">
                  Home Landing Page
                </button>
              </div>
              <div>
                <a href="#services" onClick={() => setCurrentView('landing')} className="text-slate-400 hover:text-brand-300 transition-colors">
                  Offerings & Pricing
                </a>
              </div>
              <div>
                <a href="#about" onClick={() => setCurrentView('landing')} className="text-slate-400 hover:text-brand-300 transition-colors">
                  Clinic Hours & Staff
                </a>
              </div>
              <div>
                <button onClick={() => setCurrentView('admin')} className="text-slate-400 hover:text-brand-300 transition-colors font-medium">
                  Admin CRM Dashboard
                </button>
              </div>
            </div>

            {/* Col 3: Contact */}
            <div className="space-y-2 text-xs text-slate-400">
              <div className="font-semibold text-white uppercase tracking-wider mb-2">Concierge Desk</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>742 Evergreen Terrace, Suite 400</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>(555) 839-2000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>concierge@auraluxeclinic.com</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Aura Luxe Medical Spa & Wellness. All rights reserved.
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <span>Crafted for high-converting local business growth</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
