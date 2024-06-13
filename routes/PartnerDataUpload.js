const express = require("express");
const path = require('path');
const multer = require('multer');
const PartnerDataSchema = require('../models/PartnerDataSchema');
const ReviewsRatingSchema = require('../models/ReviewsRatingSchema');
const fs=require('fs');
require("dotenv").config();
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  
  const upload = multer({ storage: storage });
  
  
  router.post('/submit', upload.single('photo'), async (req, res) => {
    const imageBuffer = fs.readFileSync(req.file.path);
  
    
    const base64Image = imageBuffer.toString('base64');
  
    const partnerData = new PartnerDataSchema({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      photo: base64Image,
      cityname: req.body.cityname,
      email: req.body.email,
      password: req.body.password,
    });

    const savedPartnerData = await partnerData.save();

    // Create reviews and ratings data
    const reviewsRating = new ReviewsRatingSchema({
      reviewscount: 0,
      stars: 0,
      partnerid: savedPartnerData._id.toString(),
      cityname: req.body.cityname,
      review: []
    });

    await reviewsRating.save()
      .then(() => {
        res.send('Data uploaded successfully');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error uploading data');
      });
  });
  
  router.get('/',(req,res)=>{
    const filePath = path.resolve(__dirname, '../upload.html');
 
    res.sendFile(filePath);
  })

    
module.exports = router;
