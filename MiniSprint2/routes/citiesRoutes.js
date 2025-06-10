const express = require('express')
const router = express.Router();
const cityController = require('../controllers/cityController')

router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCity);
router.post('/', cityController.createCity);

module.exports = router;