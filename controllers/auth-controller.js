const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('../services/users-service');

async function getUsers(req, res, next) {
  const users = await userService.getUsers();
  res.status(200).json(users);
}

async function signUp(req, res, next) {
  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;

  const user = req.body;
  const savedUser = await userService.createUser(user);
  console.log('savedUser', savedUser);
  res.status(200).json(savedUser);
}

async function addUser(req, res, next) {
  const guestUser = req.body;
  const savedGuestUser = await userService.createUser(guestUser);
  const token = jwt.sign(
    {
      email: guestUser.email,
      userId: savedGuestUser._id.toString(),
    },
    'superSecretPassword',
    { expiresIn: '1h' }
  );
  const user = {
    _id: savedGuestUser._id,
    name: savedGuestUser.name,
  };
  console.log('savedGuestUser', savedGuestUser);
  res.status(200).json({ token, user });
}

module.exports = {
  signUp,
  getUsers,
  addUser,
};
