const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: true,
    },
    reviewContent: {
        type: String,
        required: true,
    },
    reviewDate: {
        type: String,
        required: true,
    },
    reviewStars:{
        type: String,
        required: true,
    }
});

const ReviewsRatingSchema = new mongoose.Schema({
    
    reviewscount: {
        type: String,
        required: true,
    },
    stars:{
        type: String,
        required: true
    },
    partnerid:{
        type: String,
        required: true
    },
    cityname:{
        type: String,
        required: true
    },
    review: [reviewSchema]

}, { collection: 'ReviewsRatings' });


// model name + ReviewsRatingSchema
module.exports = mongoose.model("ReviewsRatings", ReviewsRatingSchema);
