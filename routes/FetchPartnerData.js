const express = require('express');
const router = express.Router();
const PartnerData = require('../models/PartnerDataSchema'); 
const ReviewsRatings = require('../models/ReviewsRatingSchema'); 


// // Partners Data by CityName
// router.get('/fetchpartnersdata', async (req, res) => {
//     try {
//         const cityName = req.query.city;

//         // Fetch partner data based on city name
//         const partnerData = await PartnerData.find({ cityname: { $regex: cityName, $options: 'i' } });

//         // Extract partner IDs from partnerData
//         const partnerIds = partnerData.map(partner => partner.id);

//         // Fetch reviews and ratings for the fetched partners
//         const reviewsRating = await ReviewsRatings.find({ partnerid: { $in: partnerIds } });

//         // Create a lookup map for reviews and ratings by partner ID
//         const reviewsRatingMap = reviewsRating.reduce((map, review) => {
//             map[review.partnerid] = review;
//             return map;
//         }, {});

//         // Map over partner data and merge with corresponding reviews and ratings
//         const sanitizedData = partnerData.map(item => {
//             const reviewRating = reviewsRatingMap[item.id] || {};

//             return {
//                 id: item.id,
//                 companyName: item.name,
//                 address: item.address,
//                 image: item.photo,
//                 reviewscount: reviewRating.reviewscount || 0,
//                 stars: reviewRating.stars || 0
//             };
//         });

//         res.json(sanitizedData);
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// router.get('/fetchpartnerdata', async (req, res) => {
//     try {
//         const id = req.query.id;

//         // Fetch the partner data by id
//         const partnerData = await PartnerData.findById(id);

//         // Fetch the reviews and ratings by id
//         const reviewRating = await ReviewsRatings.findOne({ partnerid: id });

//         if (!partnerData) {
//             return res.status(404).json({ message: 'Partner not found' });
//         }

//         // Combine partner data with its reviews and ratings
//         const sanitizedData = {
//             id: partnerData.id,
//             name: partnerData.name,
//             address: partnerData.address,
//             photo: partnerData.photo,
//             phone: partnerData.phone,
//             reviewscount: reviewRating ? reviewRating.reviewscount : 0,
//             reviews: reviewRating ? reviewRating.review : [],
//             stars: reviewRating ? reviewRating.stars : 0,
//             email: partnerData.email,
//         };


//         res.json(sanitizedData);
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });













// Partners Data by CityName
router.post('/fetchpartnersdata', async (req, res) => {
    try {
        const cityName = req.body.city;

        // Fetch partner data based on city name
        const partnerData = await PartnerData.find({ cityname: { $regex: cityName, $options: 'i' } });

        // Extract partner IDs from partnerData
        const partnerIds = partnerData.map(partner => partner.id);

        // Fetch reviews and ratings for the fetched partners
        const reviewsRating = await ReviewsRatings.find({ partnerid: { $in: partnerIds } });

        // Create a lookup map for reviews and ratings by partner ID
        const reviewsRatingMap = reviewsRating.reduce((map, review) => {
            map[review.partnerid] = review;
            return map;
        }, {});

        // Map over partner data and merge with corresponding reviews and ratings
        const sanitizedData = partnerData.map(item => {
            const reviewRating = reviewsRatingMap[item.id] || {};

            return {
                id: item.id,
                companyName: item.name,
                address: item.address,
                image: item.photo,
                reviewscount: reviewRating.reviewscount || 0,
                stars: reviewRating.stars || 0
            };
        });

        res.json(sanitizedData);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/fetchpartnerdata', async (req, res) => {
    try {
        const id = req.body.id;

        // Fetch the partner data by id
        const partnerData = await PartnerData.findById(id);

        // Fetch the reviews and ratings by id
        const reviewRating = await ReviewsRatings.findOne({ partnerid: id });

        if (!partnerData) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        // Combine partner data with its reviews and ratings
        const sanitizedData = {
            id: partnerData.id,
            name: partnerData.name,
            address: partnerData.address,
            photo: partnerData.photo,
            phone: partnerData.phone,
            reviewscount: reviewRating ? reviewRating.reviewscount : 0,
            reviews: reviewRating ? reviewRating.review : [],
            stars: reviewRating ? reviewRating.stars : 0,
            email: partnerData.email,
        };


        res.json(sanitizedData);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
