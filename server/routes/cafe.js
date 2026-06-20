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
  console.log("id",id);
  let order = await orders.find({cafeId:id});
  console.log("order",order);
  res.json({data:order});
}));

router.put("/:id/orders",
  authMiddleware,
  wrapAsync(async(req,res)=>{
  let {id } = req.params ; 
  let {status , orderId } = req.body ; 
  console.log("order",orderId);
  console.log("id",id);
  let respon = await orders.findById(orderId);
  console.log("res",respon);
  await orders.findByIdAndUpdate(orderId ,
    {status : status} 
  );
  console.log("doen");
  res.json({ message: "order updated successfully" });
}));


// router.get("/cafes/:id" ,wrapAsync( cafeController.show));


module.exports = router;
