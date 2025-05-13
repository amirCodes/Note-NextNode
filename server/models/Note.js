// server/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }, // This ensures virtual properties are included
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Note', noteSchema);
