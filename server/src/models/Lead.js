const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  service: {
    type: String,
    trim: true,
    default: 'General Inquiry'
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Converted', 'Archived'],
    default: 'New'
  },
  notes: [noteSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Transform output JSON to format _id as string id
leadSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Lead', leadSchema);
