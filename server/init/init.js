const mongoose = require("mongoose");
const initData = require("./data");
const foodItems = require("../models/foodItems");

const MONGO_URL= 'mongodb://127.0.0.1:27017/campus-eats';

main().then(()=>{
  console.log("connected to DB");
}).catch(err =>{
  console.log(err);
})

async function main(params) {
  await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await foodItems.deleteMany({});
    console.log(initData.data);
    // await foodItems.insertMany(initData.data);
    console.log("data is initialised");
}

initDB();