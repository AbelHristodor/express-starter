const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../src/models/User');
const logger = require('./winston');
const GenericError = require('../src/utils/GenericError');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  // TODO: Find user and return done(null, user) if successful
  try {
    const user = await User.findById(id).exec();
    if (!user) throw new GenericError(500, "Can't find user");
    return done(null, user);
  } catch (err) {
    throw new GenericError(500, 'Error while deserializing user');
  }
});

const googleAuth = new GoogleStrategy(
  {
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_CLIENT_CALLBACK_URL,
    passReqtoCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    // Check for an existing user
    const existingUser = await User.findOne({ email: profile.emails[0].value });

    // Found an already existing user profile
    if (existingUser) return done(null, existingUser);

    // No profile found, create user
    logger.info('Creating User');
    const createdUser = await new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
    })
      .save()
      .catch(() => {
        throw new GenericError(500, 'Error while creating user');
      });
    return done(null, createdUser);
  },
);

passport.use(googleAuth);

module.exports = passport;
