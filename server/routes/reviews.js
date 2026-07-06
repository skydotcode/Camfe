const express = require("express");
const router = express.Router();
const wrapAsync = require ("../utilis/wrapAsync.js");
const ExpressError = require ("../utilis/ExpressError.js");
const {menuSchema } = require("../schema.js");

const Menu = require("../models/menu.js");
const cafes = require("../models/cafes.js");
const orders = require("../models/orders.js");
const reviews = require("../models/reviews.js");
const authMiddleware = require("../middleware/authMiddleware.js");


const multer  = require('multer');
const {storage} = require("../config/cloudinary.js");
const upload = multer({ storage });

const cafeController = require("../controllers/cafes.js");
const menuController = require("../controllers/menu.js");
const orderController = require("../controllers/orders.js");


router.post("/new" ,
  authMiddleware ,
  wrapAsync(async(req,res) => {
  let {rating , review , cafeId , user } = req.body ;

  console.log("user",user)

  await reviews.create({
    user: user,
    rating: rating,
    review:review,
    cafeId: cafeId,
  });

  res.json({message:"Review Posted successfully"});

}));

router.get("/my" ,
  authMiddleware, wrapAsync(async(req,res)=>{
    // let userId = req.userId;
    let order = await orders.find({userId:req.userId});
    res.json({data:order});
}));

router.put("/:id" , async(req , res) =>{
  let {rating , review , cafeId , user } = req.body ;

  const updatedData = {
    user: user,
    rating: rating,
    review:review,
    cafeId: cafeId,
  };

  const updatedItem = await reviews.findByIdAndUpdate(
    req.params.id,     // find item by id
    updatedData,       // apply these changes
    { new: true }      // return the updated document, not the old one
  );
  console.log(updatedItem);
  if (!updatedItem) {
    return res.status(404).json({ error: 'Food item not found' });
  }
  res.json({ message: 'Review updated!', data: updatedItem });
});

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