const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

let foodItemsSchema = new Schema({
    name: {
        type:String ,
        required:true
    },
    price: {
        type:Number ,
        required:true
    },
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cafes",
        required:true,
    },
    description: {
        type:String ,
    },
    image: {
        type:String ,
    },
    category: {
        type:String ,
        // required:true
    },
    available: {
        type: Boolean,
        default: true
    } ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const foodItems = mongoose.model("foodItems" , foodItemsSchema);
module.exports = foodItems ;

