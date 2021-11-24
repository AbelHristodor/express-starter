const router = require('express').Router();
const passport = require('../../config/passport-config');
const {
  googleLogin,
  passwordSignup,
  passwordLogin,
  requestReset,
  resetPassword,
} = require('../controllers/auth');

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
  .route('/google/callback')
  .get(passport.authenticate('google', { session: false }), googleLogin);

// Create user with email/password, returns user and JWT
router.route('/local/signup').post(passwordSignup);

// Login user with email/password, returns user and JWT
router.route('/local/login').post(passwordLogin);

// Request reset password token
router.route('/password/request-reset').post(requestReset);

// Reset password, returns user and JWT
router.route('/password/reset').post(resetPassword);

module.exports = router;
