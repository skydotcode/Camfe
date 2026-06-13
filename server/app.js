// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config();
// };
require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const User = require("./models/users.js");
const foodItems = require("./models/foodItems.js");
const cafes = require("./models/cafes.js");
const data = require("./init/data.js");
const authMiddleware = require('./middleware/authMiddleware');

const multer  = require('multer');

const {storage} = require('./config/cloudinary.js');
// const {cloudinary} = require('./config/cloudinary');
const cloudinary = require("./config/cloudinary.js")
const upload = multer({ storage });
const wrapAsync = require('./utilis/wrapAsync.js');
const ExpressError = require('./utilis/ExpressError.js');

const menuController = require("./controllers/menu.js");
const cafeController = require("./controllers/cafes.js");

const {foodItemsSchema} = require("./schema.js");
const { valid } = require('joi');
const orders = require('./models/orders.js');
// const orders = require('./models/orders.js');
const dbUrl = process.env.MONGOLINK ;

const cors = require('cors');

// Temporarily use no field restriction to catch all fields
const debugUpload = multer({ storage: multer.memoryStorage() });

// middleware
app.use(cors());
app.use(express.json());

const MONGO_URL= dbUrl;

main().then(()=>{
  console.log("connected to DB");
}).catch(err =>{
  console.log(err);
})

async function main(params) {
  await mongoose.connect(MONGO_URL);
}



const validateListing = (req ,res ,next) =>{
  let {error} = foodItemsSchema.validate(req.body);
  if(error){
    const message = error.details.map(d => d.message).join(', ');
    console.log(message);
    throw new ExpressError(400, message);
  }else{
    next();
  }
}
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



app.use(cors({
  origin: [
    'http://localhost:5173' ,
    'https://camfe-g4u5.onrender.com'] ,
  credentials: true  ,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

app.use('/api/auth', require('./routes/auth.js')); 
// app.use('/api/auth', require('./routes/user.js')); // public — no auth needed
app.get("/", (req, res) => {
  res.send("API is running ");
});

app.get("/api/cafe/:id/menu" ,
  authMiddleware,
  wrapAsync(menuController.index)
  );

//fooditems CREATE
app.post("/api/:id/menu" ,
  upload.single('image'),
  authMiddleware,
  (req, res, next) => {
        // Bridge req.file into req.body so validateListing finds foodItems.image
        if (req.file) {
            req.body.foodItems = {
                ...req.body.foodItems,
                image: req.file.path
            };
        }
        next();
    },
  validateListing, 
  validateImage,
  wrapAsync(menuController.create )
);

// app.get("/api/:id" , async(req , res)=>{
//   let {id} = req.params ;
//   let data = await cafes.find({ownerId:id});
//   res.json({data:data});
// })

app.get("/api/cafes" , wrapAsync(cafeController.index) );

// app.post("/api/fooditems",
//     upload.any(),   // accepts any field
//     (req, res, next) => {
//         console.log('req.files:', req.files);  // 👈 check terminal for field names
//         console.log('req.body:', req.body);
//         res.json({ debug: req.files, body: req.body }); // also returns to browser
//     }
// );

app.post("/api/orders" ,
  authMiddleware ,
  wrapAsync(async(req,res) => {
  let {cart , deliveryLocation, customer } = req.body ;
  
  let total = 0;
  const populatedItems = [];

  for (let item of cart) {
    const menuItem = await foodItems.findById(item._id);
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
    console.log("cart",cart);
  const order = await orders.create({
    userId: req.userId,
    customer:customer,
    cafeId: cart[0].cafeId,
    items: populatedItems,
    totalPrice: total,
    deliveryLocation,
    status: "placed"
  });

  res.json({message:"order placed successfully"});

}));

app.get("/api/cafe/owner" ,
  authMiddleware,wrapAsync( async(req,res)=>{
  let userId = req.userId;
  // console.log("id",id);
  let cafe = await cafes.find({ownerId:userId}).populate('menu');
  console.log("cafe",cafe);
  res.json({data:cafe});
}));

app.get("/api/cafe/:id" ,
  authMiddleware,wrapAsync( async(req,res)=>{
  let {id} = req.params ; 
  console.log("id",id);
  let cafe = await cafes.findById(id).populate('menu');
  console.log("cafe",cafe);
  res.json({data:cafe});
}));

app.get("/api/cafe/:id/orders" ,
  authMiddleware,wrapAsync( async(req,res)=>{
  let {id} = req.params ; 
  console.log("id",id);
  let order = await orders.find({cafeId:id});
  console.log("order",order);
  res.json({data:order});
}));

app.put("/api/cafe/:id/orders",
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


app.get("/api/orders/my" ,
  authMiddleware, wrapAsync(async(req,res)=>{
    // let userId = req.userId;
    let order = await orders.find({userId:req.userId});
    res.json({data:order});
}));

app.put("/api/orders/:id/status" ,
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

app.get("/api/orders/:id/status" ,
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


app.post("/api/cafe/register" ,
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

app.get("/api/cafes/:id" ,wrapAsync( cafeController.show));



//fooditems SHOW
app.get('/api/menu/:id',
  authMiddleware,
  wrapAsync(menuController.show));

//fooditems UPDATE
app.put("/api/menu/:id" ,
  authMiddleware,
  validateListing,
  upload.single('image'),
  wrapAsync(menuController.update ));

//foodItems DELETE
app.delete("/api/menu/:id" ,
  authMiddleware,
  wrapAsync(menuController.delete)
   );




app.use("/*splat" ,(req ,res,next)=>{
  next(new ExpressError(404 ,"Page not found!"));
})

app.use((err ,req,res ,next)=>{
  console.log("error",err);
  // let {statusCode , message} = err ;
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({ err: message });
})

// server start
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});