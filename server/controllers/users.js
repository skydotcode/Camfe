const foodItems = require("../models/foodItems.js");

module.exports.index = async(req ,res)=>{
  try {
    let cafe = await cafes.findOne({
      ownerId: req.userId 
    });
    console.log("cafe:",cafe);
    console.log("cafeid:",cafe._id);
    let items = await foodItems.find({
      cafeId:cafe._id
    });
    console.log(items);
    res.json(items);
  } catch(err){
    console.log(err.message);
  }
}



