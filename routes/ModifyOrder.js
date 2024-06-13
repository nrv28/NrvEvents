const express = require('express');
const router = express.Router();
const BookingModel = require('../models/BookingSchema');


// Route to mark an order as complete
router.put('/partnerordercomplete', async (req, res) => {
    const { orderId, partnerid } = req.body;

    try {
        const partnerOrder = await BookingModel.findById(orderId);

        if (!partnerOrder) {
            return res.status(404).send('Partner not found');
        }

        partnerOrder.status = '1';
        await partnerOrder.save();

        res.status(200).send('Order marked as complete');
    } catch (error) {
        console.error('Error marking order as complete:', error);
        res.status(500).send('Internal server error');
    }
});


router.put('/partnerordercancel', async (req, res) => {
    const { orderId, partnerid } = req.body;

    try {
        const partnerOrder = await BookingModel.findById(orderId);

        if (!partnerOrder) {
            return res.status(404).send('Partner not found');
        }

        partnerOrder.status = '-1';
        await partnerOrder.save();

        res.status(200).send('Order Cancelled');
    } catch (error) {
        console.error('Error Cancelling Order:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
