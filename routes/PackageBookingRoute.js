const express = require('express');
const router = express.Router();
const BookingModel = require('../models/BookingSchema');


// Add a route to handle bookings
router.post('/booking', async (req, res) => {
    const { id, userId, price, name } = req.body;
    try {
        const newPartnerOrder = new BookingModel({     
            partnerid: id,
            clientid: userId,
            packagetype: name,
            status: 0,
            packageamount:price
        });
        await newPartnerOrder.save();

        res.status(200).json({ message: 'Booking successful' });
    } catch (error) {
        console.error('Error handling booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
