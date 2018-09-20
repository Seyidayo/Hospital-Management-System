var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    default: ''
  },
  lastName: { 
    type: String, 
    default: ''
  },
  regNumber: { 
    type: String, 
    default: ''
  },
  gender:{
    type: String, 
    default: ''
  },
  age: {
    type: Number, 
    default: 0
  },
  height: {
    type: String, 
    default: ''
  },
  weight: {
    type: Number, 
    default: 0
  },
  email: { 
    type: String, 
    default: '' 
  },
  phoneNumber: { 
    type: Number, 
    default: 0
  },
  password: { 
    type: String, 
    default: 'default1' 
  },
  status: { 
    type: String, 
    default: 'patient' 
  },
  isDeleted: { 
    type: Boolean,
    default: false 
  }
});

module.exports = mongoose.model('User', UserSchema);
