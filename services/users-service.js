const dbService = require('./db-service');

async function getUsers() {
  const usersCollection = await dbService.getCollection('users');
  // console.log('collection', usersCollection);
  const users = await usersCollection.find().toArray();
  console.log('users - backend', users);
  return users;
}

async function createUser(user) {
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
}

// async function addUser(user) {
//   const collection = await dbService.getCollection('users');
// }

module.exports = {
  getUsers,
  createUser,
};
