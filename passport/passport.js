const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const mongoose = require('mongoose');
const secretOrKey = require('../config/Keys').secretOrKey;
const clientID = require('../config/Keys').googleClientID2;
const clientSecret = require('../config/Keys').googleClientSecret2;
const facebookclientID = require('../config/Keys').facebookClientID;
const facebookclientSecret = require('../config/Keys').facebookClientSecret;
const User = require('../model/User');

// Passport jwt Authentication.
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

// Google Strategy without Token ... Oauth2

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID,
//       clientSecret,
//       callbackURL: '/api/users/google/callback'
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       console.log('accessToken from GoogleStrategy', accessToken);
//       console.log('profile from GoogleStrategy', profile);
//     }
//   )
// );

// Google token strategy.
passport.use(
  'google-plus-token',
  new GooglePlusTokenStrategy(
    {
      clientID,
      clientSecret
      // passReqToCallback: true
      // callbackURL: '/api/users/google'
      // proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('profile', profile);
      // Getting the Large Image substracting end part.
      const photo = profile.photos[0].value.substring(
        0,
        profile.photos[0].value.indexOf('?')
      );
      try {
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);

// Facebook token strategy.
passport.use(
  // 'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: facebookclientID,
      clientSecret: facebookclientSecret
      // callbackURL: '/api/users/facebook/callback',
      // proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('profile', profile);
      const fbphoto = profile.photos[0].value;
      const photo = fbphoto.replace('large', 'album');

      try {
        const existingUser = await User.findOne({ 'facebook.id': profile.id });
        if (existingUser) {
          console.log('User Already Registered, responding with existingUser');
          return done(null, existingUser);
        }
        const newUser = new User({
          method: 'facebook',
          facebook: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo
          }
        });
        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);
