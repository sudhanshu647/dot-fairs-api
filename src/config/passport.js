const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const BearerStrategy = require('passport-http-bearer');
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./vars');
// const authProviders = require('../api/services/authProviders');
const { User } = require('../api/models');

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const user = await User.findByPk(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const oAuth = service => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
exports.facebook = new BearerStrategy(oAuth('facebook'));
exports.google = new BearerStrategy(oAuth('google'));
exports.local = new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: 'email',
  },
  (email, password, done) => {
    // When a user tries to sign in this code runs
    User.findOne({
      where: {
        email,
      },
    }).then(dbUser => {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect email.',
        });
      }
      if (!dbUser.validPassword(password)) {
        // If there is a user with the given email,
        // but the password the user gives us is incorrect
        return done(null, false, {
          message: 'Incorrect password.',
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
);
