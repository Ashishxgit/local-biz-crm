import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast.show) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-glass border backdrop-blur-xl transition-all duration-300 ${
        isSuccess 
          ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100 shadow-emerald-950/50' 
          : 'bg-rose-950/90 border-rose-500/30 text-rose-100 shadow-rose-950/50'
      }`}>
        {isSuccess ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
        )}
        
        <div className="text-sm font-medium pr-2">
          {toast.message}
        </div>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
