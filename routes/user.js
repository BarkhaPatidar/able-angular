const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const authenticateToken = require('../config/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user-dashboard', authenticateToken, userController.userDashboard);
router.get('/friends', authenticateToken, userController.friends);
router.get('/posts', authenticateToken, userController.posts);
router.post('/add-post', authenticateToken, userController.addPost);
router.post('/like-post', authenticateToken, userController.updatePost);
router.post('/update-user', authenticateToken, userController.updateUser);
router.post('/follow-user', authenticateToken, userController.updateFriend);

module.exports = router; 