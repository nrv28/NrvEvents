const express = require('express');
const router = express.Router();
const UserDB = require('../models/UserSchema');
const PartnerData = require('../models/PartnerDataSchema');


router.get('/giveloggeduserdata', async (req, res) => {
    try {
        const user = await UserDB.findById(req.session.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/giveloggedpartnerdata', async (req, res) => {
    try {
        const partner = await PartnerData.findById(req.session.partnerlog.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.json(partner);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/loginroute', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserDB.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        req.session.user = {
          id: user._id,
          email: user.email,
          name: user.name,
          address: user.address,
          phone: user.phone,
        };

        res.json({message : "Login Successful"});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/partnerlogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const partner = await PartnerData.findOne({ email: email });
        if (!partner) {
            return res.status(400).json({ message: 'Invalid Partner Email' });
        }

        if (partner.password !== password) {
            return res.status(400).json({ message: 'Invalid Partner password' });
        }

        req.session.partnerlog ={
            id : partner._id,
            email : partner.email,
            phone : partner.phone,
            address : partner.address,
            name : partner.name,
            cityname : partner.cityname,
        }
       
        
        res.json({ message: 'Partner Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signuproute', async (req, res) => {
    const { email, password, name, address, phone } = req.body;

    try {
        let existingUser = await UserDB.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new UserDB({
            email,
            password, // Password is not hashed
            name,
            address,
            phone
        });

        await newUser.save();
        res.json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ message: 'Logout successful' });
    });
});

module.exports = router;
