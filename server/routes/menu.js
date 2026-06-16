const express = require("express");
const router = express.Router();
const wrapAsync = require ("../utilis/wrapAsync.js");
const ExpressError = require ("../utilis/ExpressError.js");
const {menuSchema } = require("../schema.js");
const Menu = require("../models/menu.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const multer  = require('multer');
const {storage} = require("../config/cloudinary.js");
const upload = multer({ storage });
const debugUpload = multer({ storage: multer.memoryStorage() });


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
  console.log("file",req.file)
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

//fooditems SHOW
router.get('/:id',
  authMiddleware,
  wrapAsync(menuController.show));

//fooditems UPDATE
router.put("/:id" ,
  authMiddleware,
  validateMenu,
  upload.single('image'),
  wrapAsync(menuController.update ));

//foodItems DELETE
router.delete("/:id" ,
  authMiddleware,
  wrapAsync(menuController.delete)
   );


module.exports = router;





