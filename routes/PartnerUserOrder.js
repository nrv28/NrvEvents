const express = require('express');
const router = express.Router();
const BookingModel = require('../models/BookingSchema');


router.get('/partnerorder', async (req, res) => {
    try {
        const partnerOrders = await BookingModel.find({ partnerid: req.session.partnerlog.id });
        if (!partnerOrders || partnerOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.json(partnerOrders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Add a route to fetch user orders
router.get('/userorder', async (req, res) => {
    try {
        const userOrders = await BookingModel.find({ clientid : req.session.user.id });
        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
