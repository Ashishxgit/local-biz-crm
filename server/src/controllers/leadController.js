const Lead = require('../models/Lead');
const memoryStore = require('../models/LeadMemoryStore');
const { isUsingMemoryStore } = require('../config/db');

// @desc    Create a new lead (Public Ingestion Form)
// @route   POST /api/leads
// @access  Public
exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and Email are required fields.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    let lead;
    if (isUsingMemoryStore()) {
      lead = await memoryStore.create({ name, email, phone, service, message });
    } else {
      lead = await Lead.create({
        name,
        email,
        phone: phone || '',
        service: service || 'General Inquiry',
        message: message || '',
        status: 'New',
        notes: []
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error in createLead:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error creating lead',
      error: error.message
    });
  }
};

// @desc    Get all leads (Admin Dashboard)
// @route   GET /api/leads
// @access  Public
exports.getLeads = async (req, res) => {
  try {
    let leads;
    if (isUsingMemoryStore()) {
      const resStore = await memoryStore.find();
      leads = resStore.sort({ createdAt: -1 });
    } else {
      leads = await Lead.find().sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    console.error('Error in getLeads:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching leads',
      error: error.message
    });
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Public
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'Converted', 'Archived'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`
      });
    }

    let lead;
    if (isUsingMemoryStore()) {
      lead = await memoryStore.findByIdAndUpdate(id, { status });
    } else {
      lead = await Lead.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
    }

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead status updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error in updateLeadStatus:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating status',
      error: error.message
    });
  }
};

// @desc    Add follow-up note to lead
// @route   POST /api/leads/:id/notes
// @access  Public
exports.addLeadNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Note content text is required.'
      });
    }

    let lead;
    if (isUsingMemoryStore()) {
      lead = await memoryStore.saveLeadNote(id, text.trim());
    } else {
      lead = await Lead.findById(id);
      if (lead) {
        lead.notes.push({ text: text.trim(), createdAt: new Date() });
        await lead.save();
      }
    }

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error in addLeadNote:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error adding note',
      error: error.message
    });
  }
};

// @desc    Delete lead record
// @route   DELETE /api/leads/:id
// @access  Public
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    let lead;
    if (isUsingMemoryStore()) {
      lead = await memoryStore.findByIdAndDelete(id);
    } else {
      lead = await Lead.findByIdAndDelete(id);
    }

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      data: { id }
    });
  } catch (error) {
    console.error('Error in deleteLead:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error deleting lead',
      error: error.message
    });
  }
};
