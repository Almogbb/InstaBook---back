const dbService = require('./db-service');
// const ObjectId = require('mongodb').ObjectId;

async function getPosts() {
  try {
    const postsCollection = await dbService.getCollection('posts');
    const posts = await postsCollection.find().toArray();
    return posts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addPost(post) {
  try {
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
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function removePostById(postId) {
  try {
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
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updatePostById(post) {
  try {
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
          'posts.$.isLove': post.isLove,
          'posts.$.updatedAt': post.updatedAt,
        },
      }
    );

    return post;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateLoveStatus(post) {
  try {
    const postsCollection = await dbService.getCollection('posts');
    const postToEdit = await postsCollection.findOne({ _id: post._id });
    await postsCollection.updateOne(
      { _id: post._id },
      { $set: { isLove: post.isLoveStatus } }
    );

    const usersCollection = await dbService.getCollection('users');
    await usersCollection.updateOne(
      {
        _id: postToEdit.createdByUserId,
        'posts._id': post._id,
      },
      {
        $set: {
          'posts.$.isLove': post.isLoveStatus,
        },
      }
    );

    return post;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getPosts,
  addPost,
  removePostById,
  updatePostById,
  updateLoveStatus,
};
