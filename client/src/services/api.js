import axios from 'axios';

const API_BASE = '/api/leads';

export const submitLead = async (leadData) => {
  const response = await axios.post(API_BASE, leadData);
  return response.data;
};

export const fetchLeads = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const updateLeadStatus = async (id, status) => {
  const response = await axios.patch(`${API_BASE}/${id}/status`, { status });
  return response.data;
};

export const addLeadNote = async (id, text) => {
  const response = await axios.post(`${API_BASE}/${id}/notes`, { text });
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};
