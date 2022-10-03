const dbService = require('./db-service');

async function getUsers() {
  try {
    const usersCollection = await dbService.getCollection('users');
    // console.log('collection', usersCollection);
    const users = await usersCollection.find().toArray();
    console.log('users - backend', users);
    return users;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUser(user) {
  try {
    const usersCollection = await dbService.getCollection('users');
    const existingUser = await usersCollection.findOne({ email: user.email });
    return existingUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createUser(user) {
  try {
    console.log('user service backend');
    const collection = await dbService.getCollection('users');
    const existingUser = await collection.findOne({ _id: user._id });
    if (existingUser) {
      console.log('existingUser', existingUser);
      return existingUser;
    }
    const addedUser = await collection.insertOne(user);
    user._id = addedUser.insertedId;

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// async function addUser(user) {
//   const collection = await dbService.getCollection('users');
// }

module.exports = {
  getUsers,
  getUser,
  createUser,
};
