const cafes = require("../models/cafes.js");
const foodItems = require("../models/menu.js");
const {cloudinary} = require("../config/cloudinary.js");

module.exports.index = async(req ,res)=>{
  try {
    let {id} = req.params ;
    let items = await foodItems.find({
      cafeId: id
    });
    console.log(items);
    res.json(items);
  } catch(err){
    console.log(err.message);
  }
}

module.exports.create = async(req,res)=>{
  console.log("create function reached ✅");
  let {id} = req.params ;
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  let newMenu = new foodItems({
    cafeId: id,
    name: req.body.foodItems.name ,
    price: req.body.foodItems.price ,
    category : req.body.category,
    image: req.file.path ,
  });

  await newMenu.save();
  await cafes.findByIdAndUpdate(id, {
    $push: { menu: newMenu._id }
  });

  res.json({message:"Food Item Added" , data:newMenu});
};

module.exports.show = async (req, res) => {
  const item = await foodItems.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
};

module.exports.update = async(req,res)=>{
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
  };

  // only update image if a new one was uploaded
  // otherwise keep the existing image
  if (req.file) {
    updatedData.image = req.file.path;
  };
  const updatedItem = await foodItems.findByIdAndUpdate(
    req.params.id,     // find item by id
    updatedData,       // apply these changes
    { new: true }      // return the updated document, not the old one
  );
  console.log(updatedItem);
  if (!updatedItem) {
    return res.status(404).json({ error: 'Food item not found' });
  }
  res.json({ message: 'Food item updated!', data: updatedItem });

}

module.exports.delete = async(req ,res)=>{
  let {id} = req.params ;
  let deletedItem = await foodItems.findByIdAndDelete(id);
  console.log("deletedItem",deletedItem);
  if (!deletedItem) {
    throw new ExpressError(404, 'Food item not found');
  }
  if (deletedItem.image) {
    const urlParts = deletedItem.image.split('/');  // split URL by /
    const fileName = urlParts[urlParts.length - 1]; // get last part: burger.jpg
    const publicId = `campus-eats/${fileName.split('.')[0]}`; // remove extension: campus-eats/burger

    await cloudinary.uploader.destroy(publicId);  // delete from Cloudinary
  }
  res.json({ message: 'Food item deleted!', data: deletedItem });
}
