const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/logout', userController.logout);
router.get('/me', userController.getCurrentUser);
router.get('/check-username', userController.checkUsernameAvailability);
router.get('/:id', userController.getUserById);

module.exports = router;


