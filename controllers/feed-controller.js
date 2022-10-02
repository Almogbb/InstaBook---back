const feedService = require('../services/feed-service');
const ObjectId = require('mongodb').ObjectId;

async function getPosts(req, res, next) {
  const posts = await feedService.getPosts();
  res.status(200).json(posts);
}

async function addPost(req, res, next) {
  const post = req.body;
  const postToAdd = {
    _id: post._id,
    title: post.title,
    content: post.content,
    image: post.image,
    isLove: post.isLove,
    createdAt: post.createdAt,
    createdByUserId: ObjectId(post.createdBy),
  };
  console.log('post to add', postToAdd);
  const addedPost = await feedService.addPost(postToAdd);
  console.log('return post', addedPost);
  res.status(201).json(addedPost);
}

async function updatePost(req, res, next) {
  const postToEdit = req.body;
  // console.log('postToEdit', postToEdit);
  const editedPost = await feedService.updatePostById(postToEdit);
  res.status(201).json(editedPost);
}

async function removePostById(req, res, next) {
  const postId = req.params.postId;
  await feedService.removePostById(postId);
  res.status(200).json(postId);
}

async function updateLoveStatus(req, res, next) {
  const _id = req.body._id;
  const isLoveStatus = req.body.isLove;

  // console.log('postId', postId);
  // console.log('isLoveStatus', isLoveStatus);

  const loveStatus = await feedService.updateLoveStatus({
    _id,
    isLoveStatus,
  });

  res.status(201).json(loveStatus);
}

module.exports = {
  getPosts,
  addPost,
  removePostById,
  updatePost,
  updateLoveStatus,
};
