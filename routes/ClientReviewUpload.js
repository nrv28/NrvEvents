// routes/reviews.js
const express = require('express');
const router = express.Router();
const ReviewsModel = require('../models/ReviewsRatingSchema');

// POST route to submit a review
router.post('/submitReview', async (req, res) => {
    try {
      const { partnerid, name, content, stars } = req.body;

      // Find the document by partnerId
      let reviewsRating = await ReviewsModel.findOne({ partnerid: partnerid });

      if (!reviewsRating.review) {
        reviewsRating.review = [];
      }

      // Create the new review
      const newReview = {
        reviewerName: name,
        reviewContent: content,
        reviewDate: new Date().toISOString(),
        reviewStars: stars
      }
  
      // Add the review to the array
      reviewsRating.review.push(newReview);
  
      reviewsRating.reviewscount = parseInt(reviewsRating.reviewscount) + 1;
      // reviewsRating.stars = (parseInt(reviewsRating.stars) * (reviewsRating.reviewscount - 1) + stars) / reviewsRating.reviewscount;
  

      await reviewsRating.save();
  
      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ error: 'Failed to submit review' });
    }
  });

module.exports = router;
