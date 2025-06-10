const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const hotelController = require("../controllers/hotelController");

router.get('/', hotelController.getAllHotels);
router.get('/:globalpropertyname', hotelController.getHotel);
router.post('/', authMiddleware, hotelController.createHotel);
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;