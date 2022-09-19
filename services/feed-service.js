const dbService = require('./db-service');
// const ObjectId = require('mongodb').ObjectId;

async function addPost(post) {
  // console.log('userToUpdate', userPostsUpdate);
  const postsCollection = await dbService.getCollection('posts');
  const savedPost = await postsCollection.insertOne(post);
  post_id = savedPost.insertedId;

  const usersCollection = await dbService.getCollection('users');
  const userPostsUpdate = await usersCollection.updateOne(
    { _id: post.createdByUserId },
    { $push: { posts: post } }
  );
  return post;
}

async function removePostById(postId) {
  const postsCollection = await dbService.getCollection('posts');
  // find the specific post
  const postToDelete = await postsCollection.findOne({ _id: postId });
  console.log('postToDelete', postToDelete);
  await postsCollection.deleteOne({ _id: postId });

  const usersCollection = await dbService.getCollection('users');
  await usersCollection.updateOne(
    { _id: postToDelete.createdByUserId },
    { $pull: { posts: { _id: postId } } }
  );
  return postId;
}

async function updatePostById(post) {
  const postsCollection = await dbService.getCollection('posts');
  const postToEdit = await postsCollection.findOne({ _id: post._id });
  await postsCollection.updateOne({ _id: post._id }, { $set: { ...post } });

  // need to update the user database
  const usersCollection = await dbService.getCollection('users');
  await usersCollection.updateOne(
    {
      _id: postToEdit.createdByUserId,
      'posts._id': post._id,
    },
    {
      $set: {
        'posts.$.title': post.title,
        'posts.$.content': post.content,
        'posts.$.updatedAt': post.updatedAt,
      },
    }
  );

  return post;
}

module.exports = {
  addPost,
  removePostById,
  updatePostById,
};
