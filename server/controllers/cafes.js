const cafes = require("../models/cafes.js");
const foodItems = require("../models/menu.js");

module.exports.index = async(req ,res)=>{
  try {
    const allCafes = await cafes.find({isOpen:true});
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

module.exports.update = async(req,res)=>{
  let {id} = req.params ; 
  console.log("id..",id);
  let cafe = await cafes.findById(id);
  res.json({data:cafe});
  console.log(req.body.isOpen);
  const updatedData = {
    isOpen: req.body.isOpen,
    // price: req.body.price,
    // description: req.body.description,
    // category: req.body.category,
  };
  const updatedItem = await cafes.findByIdAndUpdate(
    req.params.id,     // find item by id
    updatedData,       // apply these changes
    { new: true }      // return the updated document, not the old one
  );
  console.log(updatedItem);
  if (!updatedItem) {
    return res.status(404).json({ error: 'Cafe not found' });
  }
  res.json({ message: 'Cafe status updated!', data: updatedItem });

}