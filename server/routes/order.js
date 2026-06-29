const express = require("express");
const router = express.Router();
const wrapAsync = require ("../utilis/wrapAsync.js");
const ExpressError = require ("../utilis/ExpressError.js");
const {menuSchema } = require("../schema.js");

const Menu = require("../models/menu.js");
const cafes = require("../models/cafes.js");
const orders = require("../models/orders.js");
const authMiddleware = require("../middleware/authMiddleware.js");


const multer  = require('multer');
const {storage} = require("../config/cloudinary.js");
const upload = multer({ storage });

const cafeController = require("../controllers/cafes.js");
const menuController = require("../controllers/menu.js");
const orderController = require("../controllers/orders.js");

router.post("/" ,
  authMiddleware ,
  wrapAsync(async(req,res) => {
  let {cart , deliveryLocation, customer,paymentMethod ,paymentId } = req.body ;
  
  let total = 0;
  const populatedItems = [];

  for (let item of cart) {
    const menuItem = await Menu.findById(item._id);
    total += menuItem.price * item.quantity;

    populatedItems.push({
      menuItemId: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: item.quantity
    });
  }
    // 2. Create order
    console.log("user",req.userId);
    console.log("cart",paymentMethod);
  const order = await orders.create({
    userId: req.userId,
    customer:customer,
    cafeId: cart[0].cafeId,
    items: populatedItems,
    totalPrice: total,
    paymentMethod,
    paymentId,
    deliveryLocation,
    status: "placed"
  });

  res.json({message:"order placed successfully"});

}));

router.get("/my" ,
  authMiddleware, wrapAsync(async(req,res)=>{
    // let userId = req.userId;
    let order = await orders.find({userId:req.userId});
    res.json({data:order});
}));


router.get("/:id/status" ,
  authMiddleware, wrapAsync( async(req ,res)=>{
  let {id} = req.params;
  console.log(id);
  // await orders.findByIdAndUpdate(id ,
  //   {status : "cancelled"} ,
  // )
  let order = await orders.findById(id);
  console.log("order");
  res.json({data:order});
}));


router.put("/:id/status" ,
  authMiddleware, wrapAsync( async(req ,res)=>{
  let {id} = req.params;
  console.log(id);
  await orders.findByIdAndUpdate(id ,
    {status : "cancelled"} ,
  )
  let order = await orders.findById(id);
  console.log("order");
  res.json({message:"order cancelled successfully"});
}));

module.exports = router;