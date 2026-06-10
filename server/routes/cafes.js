const cafes = require("../models/cafes.js");

module.exports.index = async(req ,res)=>{
  try {
    const allCafes = await cafes.find();
    res.json(allCafes);
  } catch(err){
    console.log(err.message);
  }
}


