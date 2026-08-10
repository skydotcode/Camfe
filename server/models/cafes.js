const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

let cafesSchema = new Schema({
    name: {
        type:String ,
        required:true
    },
    phone: {
        type:String ,
        required:true
    },
    ownerName: {
        type:String ,
        
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contactNumber: {
        type:Number ,
        // required:true
    },
    description: {
        type:String ,
    },
    image: {
        type:String ,
        required:true
    },
    location: {
        type:String ,
        // required:true
    },
    // category: {
    //     type:String ,
    //     enum: ["Drinks" , "Snacks" , "Meals" , "Desserts"],
    //     required:true
    // },
    isOpen: {
        type: Boolean,
        default: true
    } ,
    menu : [{
        type : Schema.Types.ObjectId ,
        ref:"foodItems"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const cafes = mongoose.model("cafes" , cafesSchema);
module.exports = cafes ;

