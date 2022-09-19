const express = require('express');

const feedController = require('../controllers/feed-controller');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post('/post', feedController.addPost);

router.put('/post/:postId', feedController.updatePost);

router.delete('/post/:postId', feedController.removePostById);

module.exports = router;
