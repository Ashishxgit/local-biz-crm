import React, { useState } from 'react';
import { X, MessageSquarePlus, Clock, Send, Loader2, StickyNote } from 'lucide-react';
import { addLeadNote } from '../services/api';

export default function NotesModal({ lead, onClose, onNoteAdded, showToast }) {
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!lead) return null;

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setLoading(true);
    try {
      const res = await addLeadNote(lead.id || lead._id, noteText);
      if (res.success) {
        showToast('Follow-up note appended successfully', 'success');
        setNoteText('');
        onNoteAdded(res.data);
      }
    } catch (err) {
      console.error('Error adding note:', err);
      showToast('Failed to add note', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl glass-card border border-slate-700 p-6 md:p-8 shadow-glow space-y-6 relative max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400">
              <StickyNote className="w-4 h-4" /> Internal Lead Notes
            </div>
            <h3 className="font-serif text-xl font-bold text-white mt-1">
              {lead.name}
            </h3>
            <p className="text-xs text-slate-400">{lead.service} • {lead.email}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Notes Timeline */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[150px]">
          {lead.notes && lead.notes.length > 0 ? (
            lead.notes.map((note, index) => (
              <div 
                key={index}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5"
              >
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light whitespace-pre-wrap">
                  {note.text}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3 text-brand-400" />
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs italic">
              No follow-up notes logged for this lead yet.
            </div>
          )}
        </div>

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="space-y-3 pt-4 border-t border-slate-800">
          <div className="relative">
            <textarea
              rows="2"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add internal follow-up note (e.g., Called client, left voicemail...)"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading || !noteText.trim()}
              className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-glow flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Save Note</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
