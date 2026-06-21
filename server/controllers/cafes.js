const cafes = require("../models/cafes.js");
const foodItems = require("../models/menu.js");

module.exports.index = async(req ,res)=>{
  try {
    const allCafes = await cafes.find();
    res.json(allCafes);
  } catch(err){
    console.log(err.message);
  }
}


module.exports.create = async(req ,res)=>{
  try {
    let userId = req.userId;
    let newCafe = new cafes({
      phone: req.body.phone,
      name: req.body.cafe,
      image: req.file.path,
      ownerId: userId  ,
    });
    await newCafe.save();
    res.json({message:"Cafe has been Listed Successfully!" , newCafe});
  } catch(err){
    console.log(err.message);
  }
};

module.exports.show = async(req ,res)=>{
  try {
    let {id} = req.params ;
    console.log(id);
    let cafe = await cafes.findById(id);
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });
    console.log("cafe",cafe);
    let menu = await foodItems.find({
      cafeId:id
    });
    res.json({cafe , menu});

    if (!cafe) return res.status(404).json({ message: 'Item not found' });
  } catch(err){
    console.log(err.message);
  }
};