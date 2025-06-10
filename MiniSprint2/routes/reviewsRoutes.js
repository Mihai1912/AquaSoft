const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/create', reviewController.createReview),
router.get('/get/:reviewid', reviewController.getReview),
router.get('/getbyhotel/:globalpropertyid', reviewController.getReviewsByHotel),
router.delete('/delete/:reviewid', reviewController.deleteReview),

module.exports = router;