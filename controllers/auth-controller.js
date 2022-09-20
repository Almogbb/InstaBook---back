const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('../services/users-service');

async function getUsers(req, res, next) {
  const users = await userService.getUsers();
  res.status(200).json(users);
}

// async function signUp(req, res, next) {
//   // const name = req.body.name;
//   // const email = req.body.email;
//   // const password = req.body.password;

//   const user = req.body;
//   const savedUser = await userService.createUser(user);
//   console.log('savedUser', savedUser);
//   res.status(200).json(savedUser);
// }

async function signUp(req, res, next) {
  const user = req.body;
  console.log('user', user);
  const hashedPassword = await bcrypt.hash(user.password, 12);
  const userToSave = {
    name: user.name,
    email: user.email,
    password: hashedPassword,
    createdAt: user.createdAt,
  };
  const savedUser = await userService.createUser(userToSave);
  console.log('savedUser with id', savedUser);
  // const token = jwt.sign(
  //   {
  //     email: user.email,
  //     userId: savedUser._id.toString(),
  //   },
  //   'superSecretPassword',
  //   { expiresIn: '1h' }
  // );
  const createdNewUser = {
    _id: savedUser._id,
    name: savedUser.name,
    createdAt: savedUser.createdAt,
  };
  console.log('createdNewUser', createdNewUser);
  res.status(200).json(createdNewUser);
}

async function login(req, res, next) {
  try {
    const loggedUser = req.body;
    console.log('loggedUser', loggedUser);
    const loadedUser = await userService.getUser(loggedUser);
    // if (!existingUser) {
    //   const error = new Error('')
    // }
    console.log('found user in DB', loadedUser);
    const isPasswordCorrect = await bcrypt.compare(
      loggedUser.password,
      loadedUser.password
    );

    if (!isPasswordCorrect) {
      const error = new Error('Email or password is incorrect');
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id,
      },
      'superSecretPassword',
      { expiresIn: '1h' }
    );

    delete loadedUser.password;

    res.status(200).json({ token, loadedUser });
  } catch (err) {
    console.log('Email or password is incorrect', err);
  }
}

module.exports = {
  signUp,
  getUsers,
  login,
  // addUser,
};
