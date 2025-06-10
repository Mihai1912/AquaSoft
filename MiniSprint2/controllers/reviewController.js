const Review = require('../models/review');
const ReviewRating = require('../models//review_rating');
const jwt = require('jsonwebtoken');
const secrete = 'supersecret';

const createReview = async (req, res) => {
    const { globalpropertyid, reviewtitle, reviewtext, criteriaratings } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secrete);
        const userid = decoded.id;

        const review = await Review.create({
            globalpropertyid,
            userid,
            reviewtitle,
            reviewtext,
            reviewrating: 1,
        });

        const criteriaratingsObj = req.body.criteriaratings;

        let totalRating = 0;

        for (const [criteria, ratingvalue] of Object.entries(criteriaratingsObj)) {
            await ReviewRating.create({
                reviewid: review.reviewid,
                criteria,
                ratingvalue,
            });
            totalRating += ratingvalue;
        }

        const averageRating = Math.round(totalRating / Object.keys(criteriaratingsObj).length);
        await review.update({ reviewrating: averageRating });

        res.status(201).json({
            message: 'Review created successfully',
            review: {
                reviewid: review.reviewid,
                hotelid: review.globalpropertyid,
                userid: review.userid,
                reviewtitle: review.reviewtitle,
                reviewtext: review.reviewtext,
                reviewrating: averageRating,
                reviewdate: review.reviewdate,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error: error.message });
    }
}

const getReview = async (req, res) => {
    const { reviewid } = req.params;

    try {
        const review = await Review.findOne({
            where: { reviewid },
            include: [{
                model: ReviewRating
            }]
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching review', error: error.message });
    }
}

const getReviewsByHotel = async (req, res) => {
    const { globalpropertyid } = req.params;

    try {
        const reviews = await Review.findAll({
            where: { globalpropertyid },
            include: [{
                model: ReviewRating
            }]
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this hotel' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
}

const deleteReview = async (req, res) => {
    const { reviewid } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secrete);
        const userid = decoded.id;

        const review = await Review.findOne({ where: { reviewid, userid } });

        if (!review) {
            return res.status(404).json({ message: 'Review not found or you do not have permission to delete this review' });
        }

        await Review.destroy({ where: { reviewid } });
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
}

module.exports = {
    createReview,
    getReview,
    getReviewsByHotel,
    deleteReview
};