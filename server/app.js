// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config();
// };
require('dotenv').config();
const express = require("express");
const session = require('express-session');

const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const User = require("./models/users.js");
const foodItems = require("./models/menu.js");
const cafes = require("./models/cafes.js");
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

app.use("/api/menu" , menuRouter);
app.use("/api/cafe" , cafeRouter);
app.use("/api/orders" , orderRouter);


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