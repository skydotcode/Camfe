// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config();
// };
require('dotenv').config();
const express = require("express");
const session = require('express-session');

const razorpayInstance = require('./config/razorpay');
const crypto = require('crypto');

const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const User = require("./models/users.js");
const foodItems = require("./models/menu.js");
const Cafes = require("./models/cafes.js");
const Menus = require("./models/menu.js");

const data = require("./init/data.js");

const wrapAsync = require ("./utilis/wrapAsync.js");
const ExpressError = require ("./utilis/ExpressError.js");

const { valid } = require('joi');
const orders = require('./models/orders.js');

const cafeController = require("./controllers/cafes.js");

app.use(cors());
app.use(express.json());

const menuRouter = require("./routes/menu.js");
const cafeRouter = require("./routes/cafe.js");
const orderRouter = require("./routes/order.js");

const passport = require('passport');
require('./config/passport'); 

const dbUrl = process.env.MONGOLINK ;
const MONGO_URL= dbUrl;

main().then(()=>{
  console.log("connected to DB");
}).catch(err =>{
  console.log(err);
})

async function main(params) {
  await mongoose.connect(MONGO_URL);
}



app.use(cors({
  origin: [
    'http://localhost:8080' ,
    'https://camfe-g4u5.onrender.com'] ,
  credentials: true  ,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Add this before passport lines
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());        
app.use('/auth', require('./routes/auth.js'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' })
});


app.get("/", (req, res) => {
  res.send("API is running ");
});

app.get("/api/search" ,async(req , res)=>{
  try {
    const { q } = req.query; // Search term
    console.log(q);
    if (!q) {
      return res.json({ success: true, results: { cafes: [], menus: [] } });
    };

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(q, 'i'); // Case-insensitive partial match

    // Execute queries in parallel across different models
    const [cafes , menus] = await Promise.all([
      Cafes.find({ name: searchRegex }).limit(5).lean(),
      Menus.find({ name: searchRegex }).limit(5).lean(),
      // Article.find({ content: searchRegex }).limit(5).lean()
    ]);

    // Format the unified response payload
    res.json({
      success: true,
      data: { cafes, menus }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
})

app.use("/api/menu" , menuRouter);
app.use("/api/cafe" , cafeRouter);
app.use("/api/orders" , orderRouter);

// STEP 1 — create a Razorpay order
app.post('/api/payment/create-order', wrapAsync(async (req, res) => {
  const { amount } = req.body;  // amount in rupees, e.g. 250

  const options = {
    amount: amount * 100,   // Razorpay needs amount in paise (smallest unit)
                             // ₹250 → 25000 paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,  // a unique order reference
  };

  const order = await razorpayInstance.orders.create(options);

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,  // sent to client to open checkout
  });
}));

// STEP 2 — verify payment after user completes payment
app.post('/api/payment/verify', wrapAsync(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log("body",req.body);

  // Razorpay sends back a signature — we recreate it using our secret key
  // and compare. If they match, payment is genuine and not tampered with.
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  console.log("expectedSignature" , expectedSignature);
  console.log("razorpay_signature" , razorpay_signature);

  if (!isAuthentic) {
    throw new ExpressError(400, 'Payment verification failed');
  }

  // ✅ payment is genuine — save order to MongoDB here
  // e.g. create a new Order document with status "paid"

  res.json({ message: 'Payment verified successfully!' });
}));


app.use("/*splat" ,(req ,res,next)=>{
  next(new ExpressError(404 ,"Page not found!"));
})

app.use((err ,req,res ,next)=>{
  console.log("error",err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({ err: message });
})

// server start
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});