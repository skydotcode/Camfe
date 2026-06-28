const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodItems",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

let ordersSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    // userName: {
    //     type: String,
    //     required:true
    // },
    customer: {
      name: {type: String,required:true},
      phone: {type: String , required:true},
    },
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cafes",
        required: true
    },
    totalPrice: {
        type:Number ,
        // required:true
    },
    items: {
        type:[orderItemSchema]
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryLocation: {
      type: [String],
      required: true,
    },
    paymentMethod : {
      type : String ,
      required: true
    },
    paymentId : {
      type : String ,
      required: true
    },
    status: {
      type: String,
      enum: ["placed", "accepted", "preparing", "out_for_delivery", "delivered", "cancelled" , "rejected","ready"],
      default: "placed",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orders = mongoose.model("orders" , ordersSchema);
module.exports = orders ;

