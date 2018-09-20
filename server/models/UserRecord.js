const mongoose = require('mongoose');

const UserRecordSchema = new mongoose.Schema({
  regNumber: {
    type: String,
    default: ''
  },
  
  healthHistory: {
    type: String,
    default: ''
  },

  doctorNotes: {
    type: String,
    default: ''
  },

  prescription: {
    type: String,
    default: ''
  },

  appointmentDates: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('UserRecord', UserRecordSchema);
