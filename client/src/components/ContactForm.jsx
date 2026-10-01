import React, { useState } from 'react';
import { Send, Sparkles, User, Mail, Phone, Calendar, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { submitLead } from '../services/api';

const SERVICE_OPTIONS = [
  'Signature Hydrafacial Glow',
  'Cryotherapy Body Sculpting',
  'IV Vitamin Wellness Drips',
  'Pico-Laser Skin Rejuvenation',
  'Comprehensive Aesthetic Consultation',
  'General Inquiry'
];

export default function ContactForm({ selectedService, onLeadSubmitted, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: selectedService || 'Signature Hydrafacial Glow',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync selectedService prop if passed from parent
  React.useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await submitLead(formData);
      if (res.success) {
        showToast('Appointment inquiry submitted! Our concierge team will reach out shortly.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Signature Hydrafacial Glow',
          message: ''
        });
        if (onLeadSubmitted) onLeadSubmitted();
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      const msg = err.response?.data?.message || 'Failed to submit inquiry. Please try again.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Glow Effects */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
              Reserve Your Experience
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Schedule Your <br />
              <span className="text-gradient">Personal Consultation</span>
            </h2>

            <p className="text-slate-300 text-base font-light leading-relaxed">
              Fill out the form to request your preferred treatment date. A personal wellness concierge will contact you within 2 business hours to finalize your reservation.
            </p>

            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Complimentary Skin Analysis</div>
                  <div className="text-xs text-slate-400">Included with all first-time appointments</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">No-Obligation Consultation</div>
                  <div className="text-xs text-slate-400">Customized treatment plan before any commitment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Ingestion Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-card p-8 md:p-10 border border-slate-700/60 shadow-glow relative overflow-hidden">
              
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Inquire & Book Appointment
              </h3>
              <p className="text-slate-400 text-xs mb-8">
                Fields marked with an asterisk (*) are required.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-400" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all ${
                        errors.name ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.name && <span className="text-[11px] text-rose-400">{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-400" /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="eleanor@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all ${
                        errors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.email && <span className="text-[11px] text-rose-400">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-400" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                    />
                  </div>

                  {/* Service Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" /> Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map((opt, i) => (
                        <option key={i} value={opt} className="bg-slate-900 text-slate-100">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-brand-400" /> Personal Message / Preferred Dates
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your wellness goals or preferred appointment times..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-500 via-teal-400 to-cyan-400 text-slate-950 font-bold text-base shadow-glow hover:shadow-glow-lg hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Booking Request</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
