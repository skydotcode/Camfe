require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const Razorpay = require('razorpay');

// creates an instance to talk to Razorpay's API
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpayInstance;