const feedService = require('../services/feed-service');
const ObjectId = require('mongodb').ObjectId;

function getPosts(req, res, next) {
  res.json('hello from backend');
}

async function addPost(req, res, next) {
  const post = req.body;
  const postToAdd = {
    _id: post._id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    createdByUserId: ObjectId(post.createdBy),
  };
  console.log('post to add', postToAdd);
  const addedPost = await feedService.addPost(postToAdd);
  console.log('return post', addedPost);
  res.status(201).json(addedPost);
}

async function removePostById(req, res, next) {
  const postId = req.params.postId;
  await feedService.removePostById(postId);
  res.status(200).json(postId);
}

async function updatePost(req, res, next) {
  const postToEdit = req.body;
  // console.log('postToEdit', postToEdit);
  const editedPost = await feedService.updatePostById(postToEdit);
  res.status(201).json(editedPost);
}

module.exports = {
  getPosts,
  addPost,
  removePostById,
  updatePost,
};
