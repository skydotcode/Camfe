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
const reviews = require("../models/reviews.js");


const validateMenu = (req ,res ,next) =>{
  let {error} = menuSchema.validate(req.body);
  if(error){
    const message = error.details.map(d => d.message).join(', ');
    console.log(message);
    throw new ExpressError(400, message);
  }else{
    next();
  }
};

const validateImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ errors: ['Image is required'] });
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ errors: ['Only JPG or PNG  allowed'] });
  }
  console.log("validateImage passed 0 ✅");

  if (req.file.size > 5 * 1024 * 1024) {
    return res.status(400).json({ errors: ['Image must be less than 2MB'] });
  }
  console.log("validateImage passed ✅");

  next(); 
};



router.get("/" , wrapAsync(cafeController.index) );

router.post("/new" ,
  upload.single('image'),
  authMiddleware,
  (req, res, next) => {
        // ✅ Bridge req.file into req.body so validateListing finds foodItems.image
        if (req.file) {
            req.body.cafes = {
                ...req.body.cafes,
                image: req.file.path
            };
        }
        next();
    },
  validateImage,
  wrapAsync(cafeController.create));

router.get("/owner" ,
  authMiddleware,wrapAsync( async(req,res)=>{
  let userId = req.userId;
  let cafe = await cafes.find({ownerId:userId}).populate('menu');
  console.log("cafe",cafe);
  res.json({data:cafe});
}));

router.get("/:id" ,
  wrapAsync( async(req,res)=>{
  let {id} = req.params ; 
  console.log("id",id);
  let cafe = await cafes.findById(id).populate('menu');
  res.json({data:cafe});
}));

router.put("/:id" ,
  authMiddleware,
  wrapAsync( cafeController.update));

router.get("/:id/reviews" , async(req , res) =>{
  const {id} = req.params ;
  let rev = await reviews.find({
    cafeId : id
  }).populate("user") ;
  res.json({data:rev});
})



router.get("/:id/menu" ,
  authMiddleware,
  wrapAsync(menuController.index)
);

router.post("/:id/menu/new" ,
  upload.single('image'),
  authMiddleware,
  (req, res, next) => {
        if (req.file) {
            req.body.foodItems = {
                ...req.body.foodItems,
                image: req.file.path
            };
        }
        next();
    },
  validateMenu, 
  validateImage,
  wrapAsync(menuController.create )
);



router.get("/:id/orders" ,
  authMiddleware,wrapAsync( async(req,res)=>{
  let {id} = req.params ; 
  // console.log("id",id);
  let order = await orders.find({cafeId:id});
  // console.log("order",order);
  res.json({data:order});
}));

router.put("/:id/orders",
  authMiddleware,
  wrapAsync(async(req,res)=>{
  let {id } = req.params ; 
  let {status , orderId } = req.body ; 
  

  // let respond = await orders.findById(orderId);

  let order = await orders.findByIdAndUpdate(orderId ,
    {status : status} ,
    { new: true }
  );

  console.log("done")

  const io = req.app.get('io');
  // io.to(`order:${orderId}`).emit('order-status-updated', order);
  io.to(`cafe:${order.cafeId}`)
    .to(`order:${order._id}`)      // customer's room, whatever name you use
    .emit('order-status-updated', order);
  res.json({ message: "order updated successfully" });
}));


// router.get("/cafes/:id" ,wrapAsync( cafeController.show));


module.exports = router;
