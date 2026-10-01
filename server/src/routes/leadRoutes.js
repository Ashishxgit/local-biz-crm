const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  updateLeadStatus,
  addLeadNote,
  deleteLead
} = require('../controllers/leadController');

// Public route to submit lead form
router.post('/', createLead);

// Admin routes for lead management
router.get('/', getLeads);
router.patch('/:id/status', updateLeadStatus);
router.post('/:id/notes', addLeadNote);
router.delete('/:id', deleteLead);

module.exports = router;
