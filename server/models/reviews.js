const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

let reviewsSchema = new Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true,
    },
    rating: {
        type:Number ,
        required:true
    },
    review: {
        type:String ,
        required:true
    },
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cafes",
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const reviews = mongoose.model("reviews" , reviewsSchema);
module.exports = reviews ;

