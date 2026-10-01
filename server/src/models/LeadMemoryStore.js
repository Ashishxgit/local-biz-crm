class LeadMemoryStore {
  constructor() {
    this.leads = [];
    this.idCounter = 1;
  }

  async create(data) {
    const id = (this.idCounter++).toString();
    const now = new Date();
    const newLead = {
      _id: id,
      id: id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      service: data.service || 'General Inquiry',
      message: data.message || '',
      status: data.status || 'New',
      notes: data.notes ? data.notes.map(n => ({ text: n.text, createdAt: n.createdAt || new Date() })) : [],
      createdAt: data.createdAt || now
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  async countDocuments() {
    return this.leads.length;
  }

  async find() {
    return {
      sort: (sortObj) => {
        const sorted = [...this.leads];
        if (sortObj && sortObj.createdAt === -1) {
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return sorted;
      }
    };
  }

  async findById(id) {
    return this.leads.find(l => l.id === id || l._id === id) || null;
  }

  async findByIdAndUpdate(id, updateObj, options) {
    const lead = await this.findById(id);
    if (!lead) return null;
    if (updateObj.status) {
      lead.status = updateObj.status;
    }
    return lead;
  }

  async findByIdAndDelete(id) {
    const index = this.leads.findIndex(l => l.id === id || l._id === id);
    if (index === -1) return null;
    const deleted = this.leads.splice(index, 1)[0];
    return deleted;
  }

  async saveLeadNote(id, noteText) {
    const lead = await this.findById(id);
    if (!lead) return null;
    const newNote = { text: noteText, createdAt: new Date() };
    lead.notes.push(newNote);
    return lead;
  }
}

module.exports = new LeadMemoryStore();
