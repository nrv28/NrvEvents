const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    
    clientid:{
        type: String,
        required: true
    },
    partnerid:{
        type: String,
        required: true
    },
    packagetype:{
        type: String,
        required: true
    },
    packageamount:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    
}, { collection: 'Bookings' });


// model name + UserOrderSchema
module.exports = mongoose.model("Bookings", BookingSchema);
