const express = require('express');

const feedController = require('../controllers/feed-controller');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post('/post', feedController.addPost);

router.post('/post/:postId', feedController.updateLoveStatus);

router.put('/post/:postId', feedController.updatePost);

router.delete('/post/:postId', feedController.removePostById);

module.exports = router;
