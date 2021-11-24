/* eslint-disable consistent-return */
const { User } = require('../models');
const BadRequestError = require('../errors/badRequestError');

const getAll = async (req, res, next) => {
  /* Returns all users GET: /users/all  */

  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (err) {
    throw new BadRequestError('Unknown Error');
  }
};

const getOne = async (req, res, next) => {
  /* Returns one user by id GET: /users/:id  */

  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) throw new BadRequestError('User not found');
    return res.status(200).send(user);
  } catch (err) {
    throw new BadRequestError('Unknown Error');
  }
};

const create = async (req, res, next) => {
  /* Creates a new user POST: /users/create  */

  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone = null,
      is_admin = false,
      is_mod = false,
      is_active = true,
      is_client = false,
    } = req.body;

    const toCreate = {
      first_name,
      last_name,
      email,
      password,
      phone,
      is_admin,
      is_mod,
      is_active,
      is_client,
    };
    const user = await User.create(toCreate);
    if (!user) throw new BadRequestError('Invalid Parameters');
    return res.status(201).send(user);
  } catch (err) {
    throw new BadRequestError('Unknown Error');
  }
};

const update = async (req, res, next) => {
  /* Updates existing user PUT: /users/:id  */

  try {
    const {
      first_name,
      last_name,
      email,
      phone = null,
      is_admin = false,
      is_mod = false,
      is_active = true,
      is_client = false,
    } = req.body;

    const toUpdate = {
      first_name,
      last_name,
      email,
      phone,
      is_admin,
      is_mod,
      is_active,
      is_client,
    };

    const user = await User.update(toUpdate, { where: { id: req.params.id } });
    if (!user) throw new BadRequestError('Error while updating user');
    return res.status(200).send(user);
  } catch (err) {
    throw new BadRequestError('Unknown Error');
  }
};

const terminate = async (req, res, next) => {
  /* Terminates existing user DELETE: /users/:id  */

  try {
    const user = await User.getOne({ where: { id: req.params.id } });
    if (!user) throw new BadRequestError('User not found');
    return res.status(200).send(user);
  } catch (err) {
    throw new BadRequestError('Unknown Error');
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  terminate,
};
