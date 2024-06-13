const mongoose = require('mongoose');

const partnerDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  cityname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
  
}, { collection: 'PartnerData' });


// PartnerData is model name that we are exporting
module.exports = mongoose.model('PartnerData', partnerDataSchema);
