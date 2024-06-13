const express = require("express");
const crypto = require("crypto");
require("dotenv").config();
const router = express.Router();
const razorpay = require('../config/razorpay');



router.post('/payment', async (req, res) => {

      const amount = req.body.Amount * 100; // Amount in paise
      const currency = "INR";
      const receipt = "nrv2888";

      const options = {
            amount: amount,
            currency: currency,
            receipt: receipt
           };

      try {
      const response = await razorpay.orders.create(options);
        res.json(response);
      } catch (error) {
      console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Something went wrong" });
      }
      
});


router.post('/paymentverification', async (req, res) => {
      const {Name,razorpayPaymentId,razorpayOrderId,razorpaySignature} = req.body;
      const secret = process.env.RAZORPAY_PASSKEY;
    
      const shasum = crypto.createHmac("sha256", secret);
      shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const digest = shasum.digest("hex");
    
      if (digest === razorpaySignature) {
        // console.log("Payment is legitimate");
        res.json({ status: 'ok' });
      } else {
        res.status(400).json({ status: "Invalid signature" });
      }
    });

    
module.exports = router;
