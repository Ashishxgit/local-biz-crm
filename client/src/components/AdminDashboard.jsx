import React, { useState, useEffect } from 'react';
import { 
  Users, Sparkles, PhoneCall, CheckCircle2, Archive, 
  Search, RefreshCw, Trash2, StickyNote, Filter, 
  ChevronDown, ExternalLink, Download, AlertTriangle, Loader2 
} from 'lucide-react';
import { fetchLeads, updateLeadStatus, deleteLead } from '../services/api';
import NotesModal from './NotesModal';

const STATUS_CONFIG = {
  New: { label: 'New', color: 'bg-cyan-950 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900' },
  Contacted: { label: 'Contacted', color: 'bg-amber-950 text-amber-300 border-amber-500/40 hover:bg-amber-900' },
  Converted: { label: 'Converted', color: 'bg-emerald-950 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900' },
  Archived: { label: 'Archived', color: 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700' }
};

export default function AdminDashboard({ showToast }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Note Modal state
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState(null);

  // Delete Confirm Modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetchLeads();
      if (res.success) {
        setLeads(res.data || []);
      }
    } catch (err) {
      console.error('Error loading leads:', err);
      showToast('Failed to connect to CRM database server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Handle inline status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateLeadStatus(id, newStatus);
      if (res.success) {
        showToast(`Lead status updated to "${newStatus}"`, 'success');
        setLeads((prev) =>
          prev.map((item) => (item.id === id || item._id === id ? res.data : item))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      showToast('Failed to update status', 'error');
    }
  };

  // Handle lead deletion
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await deleteLead(deleteConfirmId);
      if (res.success) {
        showToast('Lead record permanently removed', 'success');
        setLeads((prev) => prev.filter((item) => item.id !== deleteConfirmId && item._id !== deleteConfirmId));
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      showToast('Failed to delete lead record', 'error');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  // Callback when a note is added in modal
  const handleNoteAdded = (updatedLead) => {
    setLeads((prev) =>
      prev.map((item) =>
        item.id === updatedLead.id || item._id === updatedLead._id ? updatedLead : item
      )
    );
    setSelectedLeadForNotes(updatedLead);
  };

  // Metrics Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.phone && l.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.service && l.service.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Export CSV Helper
  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Status', 'Date', 'Notes Count'];
    const rows = leads.map((l) => [
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${l.service || ''}"`,
      `"${l.status}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      l.notes ? l.notes.length : 0
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">
            Internal Operations CRM
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">
            Lead Management System
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Track inquiries, update sales statuses, and log internal client follow-up notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadLeads}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-slate-950 text-xs font-bold transition-all shadow-glow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Overview Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Leads */}
        <div className="rounded-2xl glass-card p-5 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Leads</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{totalLeads}</div>
          <div className="text-[11px] text-slate-500">All recorded submissions</div>
        </div>

        {/* New Enquiries */}
        <div className="rounded-2xl glass-card p-5 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">New Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-cyan-400">{newLeads}</div>
          <div className="text-[11px] text-cyan-500/80">Pending initial contact</div>
        </div>

        {/* Contacted */}
        <div className="rounded-2xl glass-card p-5 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Contacted</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-amber-400">{contactedLeads}</div>
          <div className="text-[11px] text-amber-500/80">In active follow-up</div>
        </div>

        {/* Converted Clients */}
        <div className="rounded-2xl glass-card p-5 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Converted Clients</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-400">{convertedLeads}</span>
            <span className="text-xs text-emerald-500 font-semibold">({conversionRate}%)</span>
          </div>
          <div className="text-[11px] text-emerald-500/80">Booked & paying guests</div>
        </div>

      </div>

      {/* Controls & Filter Bar */}
      <div className="rounded-2xl glass-card p-4 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, email, service..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {['All', 'New', 'Contacted', 'Converted', 'Archived'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                statusFilter === st
                  ? 'bg-brand-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Main Leads Table */}
      <div className="rounded-3xl glass-card border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            
            {/* Table Header */}
            <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Client Contact</th>
                <th className="px-6 py-4">Requested Service</th>
                <th className="px-6 py-4">Lead Status</th>
                <th className="px-6 py-4">Inflow Date</th>
                <th className="px-6 py-4 text-center">Follow-up Notes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-brand-400" />
                      <span>Loading lead records from CRM database...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-500 italic">
                    No leads found matching your current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const leadId = lead.id || lead._id;
                  const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.New;

                  return (
                    <tr key={leadId} className="hover:bg-slate-900/50 transition-colors">
                      
                      {/* Name, Email & Phone */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="text-slate-400">{lead.email}</div>
                        {lead.phone && <div className="text-[11px] text-brand-400/80 font-mono mt-0.5">{lead.phone}</div>}
                      </td>

                      {/* Service & Optional Message */}
                      <td className="px-6 py-4 max-w-xs">
                        <div className="font-medium text-slate-200">{lead.service || 'General Inquiry'}</div>
                        {lead.message && (
                          <div className="text-[11px] text-slate-400 truncate mt-0.5 max-w-[200px]" title={lead.message}>
                            "{lead.message}"
                          </div>
                        )}
                      </td>

                      {/* Dynamic Inline Status Switcher Dropdown */}
                      <td className="px-6 py-4">
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(leadId, e.target.value)}
                            className={`appearance-none px-3 py-1.5 pr-8 rounded-full font-bold text-xs border cursor-pointer focus:outline-none transition-all ${statusInfo.color}`}
                          >
                            <option value="New" className="bg-slate-900 text-cyan-300">New</option>
                            <option value="Contacted" className="bg-slate-900 text-amber-300">Contacted</option>
                            <option value="Converted" className="bg-slate-900 text-emerald-300">Converted</option>
                            <option value="Archived" className="bg-slate-900 text-slate-400">Archived</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
                        </div>
                      </td>

                      {/* Creation Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Follow-Up Notes Button */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedLeadForNotes(lead)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
                        >
                          <StickyNote className="w-3.5 h-3.5 text-brand-400" />
                          <span>Notes</span>
                          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-900 text-[10px] text-brand-300 font-bold border border-slate-700">
                            {lead.notes ? lead.notes.length : 0}
                          </span>
                        </button>
                      </td>

                      {/* Quick Action: Delete */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setDeleteConfirmId(leadId)}
                          className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                          title="Delete Lead Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Notes Modal */}
      {selectedLeadForNotes && (
        <NotesModal
          lead={selectedLeadForNotes}
          onClose={() => setSelectedLeadForNotes(null)}
          onNoteAdded={handleNoteAdded}
          showToast={showToast}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl glass-card border border-slate-700 p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Delete Lead Record?</h3>
            <p className="text-xs text-slate-400">
              This action cannot be undone. All contact details and follow-up notes will be permanently removed.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
