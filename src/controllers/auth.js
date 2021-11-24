/* eslint-disable object-curly-newline */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const { randomBytes } = require('crypto');

const User = require('../models/User');

const BadRequestError = require('../errors/badRequestError');

const generateToken = (userId) => {
  /* Generate Token with UserID payload */

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10),
  });
  return token;
};

const googleLogin = (req, res, next) => {
  /* Google Oauth2 handler to register/login users */

  req.login(req.user, (err) => {
    if (err) throw new BadRequestError('Unknown Error');
    const userJwt = generateToken(req.user.id);
    req.session.jwt = userJwt;

    return res.status(200).send();
  });
};

const passwordSignup = async (req, res) => {
  /* Password Signup function to register a new user */

  const { email, password, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError('Email in use');

  // User does not exist

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User
  const newUser = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  const createdUser = await newUser.save();

  // Generate JWT
  const userJwt = generateToken(createdUser.id);

  // Store it in session
  req.session.jwt = userJwt;

  return res.status(201).send({
    user: { ...createdUser.publicFields() },
  });
};

const passwordLogin = async (req, res) => {
  /* Password Login function to authenticate registered users */

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Check if user exists in db
  if (!user) throw new BadRequestError('Invalid Credentials');

  // Check if user has logged in with google
  if (user.googleId && !user.password) {
    throw new BadRequestError('Wrong Provider');
  }

  // Compare passwords
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) throw new BadRequestError('Invalid Credentials');

  user.lastLoggedIn = new Date();
  const loggedInUser = user.save();

  // Generate JWT
  const userJwt = generateToken(loggedInUser.id);

  // Store it in session
  req.session.jwt = userJwt;

  return res.status(201).send({
    user: { ...loggedInUser.publicFields() },
  });
};

const requestReset = async (req, res) => {
  const { email } = req.body;

  // Find user by email if it exists
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError('Email not found');

  // Generate and save reset token
  const resetToken = (await promisify(randomBytes)(20)).toString('hex');
  const resetTokenExpiry = Date.now() + 1000 * process.env.RESET_TOKEN_EXPIRY;
  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  user.save();

  // TODO: Add Send token through email
  /*
  const msg = {
    to: profile.email,
    from: process.env.CONTACT_EMAIL,
    subject: `Reset your Writing Streak password`,
    html:,
  };
  sgMail.send(msg);

  */

  return res.status(200).send({ token: resetToken, expires: resetTokenExpiry });
};

const resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  /* Find user by reset token */
  const user = await User.findOne({ resetToken })
    .where('resetTokenExpiry')
    .gt(Date.now());
  if (!user) throw new BadRequestError('Invalid or expired token');

  // Update password
  const newPassword = await bcrypt.hash(password, 10);
  user.password = newPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  user.lastLoggedIn = new Date();
  user.save();

  // Generate JWT
  const userJwt = generateToken(user.id);

  // Store it in session
  req.session.jwt = userJwt;

  return res.status(200).send({
    user: { ...user.publicFields() },
  });
};

const signout = async (req, res) => {
  req.session = null;
  res.status(200).send({});
};

module.exports = {
  googleLogin,
  passwordSignup,
  passwordLogin,
  requestReset,
  resetPassword,
  signout,
};
