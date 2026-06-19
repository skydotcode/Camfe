const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users.js');
const { json } = require('express');
require('dotenv').config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
  try {
    let email = profile.emails[0].value ;

    let user = await User.findOne({ 
      $or: [
        { googleId: profile.id }, 
        { email:email }
      ] 
    });

    let role = null ;
    (/\d/.test(email)) ?
      role = "Student" : role = "Teacher" ;

    if(!email.includes("nsut.ac.in")){
      return done(null, false, { message: "Invalid NSUT email" });
    }
    
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email : email,
        role : role
      });
    } else if (!user.googleId) {
      user.googleId = profile.id;
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));



// Add these two at the bottom
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});