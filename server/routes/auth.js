const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const wrapAsync = require('../utilis/wrapAsync');
const authMiddleware = require('../middleware/authMiddleware.js');
const ExpressError = require('../utilis/ExpressError');
const cafes = require('../models/cafes.js');


//Register User
router.post('/register', wrapAsync(async (req, res) => {
  console.log("body:",req.body);
  const { name, email, password , role} = req.body;

  // check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExpressError(400, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    role,
    email,
    password: hashedPassword,  // never save plain text password!
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id },          // payload — what to store in token
    process.env.JWT_SECRET,       // secret key from .env
    { expiresIn: '7d' }           // token expires in 7 days
  );

  res.json({ message: 'Registered successfully!', token , role });
}));


// LOGIN User
router.post('/login', wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  // find user by email
  const user = await User.findOne({ email });
  if (!user) {
    // res.json({error:"Invalid email or password"});
    throw new ExpressError(400, 'Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // res.json({message:"Invalid email or password"});
    throw new ExpressError(400, 'Invalid email or password');
  }

  console.log("user:",user);
  let role= user.role;

  // if(role = "Cafe Owner"){
    
  // }

  // generate token on successful login
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ message: 'Logged in successfully!',
     token ,role ,
    user: {
      _id: user._id,
      username: user.name,
      email: user.email,
    }});
}));

// returns current logged in user's info
router.get('/me', authMiddleware, wrapAsync(async (req, res) => {
  // req.userId is set by authMiddleware after verifying token
  const user = await User.findById(req.userId).select('-password');
  let cafe = null ;
  if(user.role == "Cafe Owner"){
    cafe = await cafes.find({
    ownerId:user?._id});

    console.log(cafe);
  }
  
  // .select('-password') means return everything EXCEPT password

  if (!user) throw new ExpressError(404, 'User not found');

  res.json({ user , cafe});
}));
module.exports = router;
