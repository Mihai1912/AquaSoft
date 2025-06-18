const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const authorizeRole = require('../middleware/roleMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authorizeRole(3), userController.getAllUsers);
router.delete('/:id', authorizeRole(3), userController.deleteUser);
router.put('/:id', authorizeRole(3), userController.updateUser);

module.exports = router