const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');

router.get('/', regionController.getAllRegions);
router.get('/:id', regionController.getRegion);
router.post('/', regionController.createRegion);

module.exports = router;