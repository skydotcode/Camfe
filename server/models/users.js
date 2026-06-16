const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name : {
        type:String ,
        require:true
    } ,
    googleId: { 
        type: String, 
        sparse: true   // ← allows multiple null values without duplicate error
    },
    email: {
        type:String ,
        require:true,
        unique: true
    },
    password : {
        type: String , 
        requiure : true,
    },
    role: {
        type:String ,
    }, 
    phone: {
        type:Number ,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

// const Users = mongoose.model("Users" , userSchema);
const Users = mongoose.mongoose.models.Users || mongoose.model("Users", userSchema);
module.exports = Users ;