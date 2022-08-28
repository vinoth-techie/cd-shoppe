const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    product_id:{
        type:String,
        required:false, 
    },
    product_name:{
        type:String,
        required:false
    },
    product_img:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:false
    },
    category:{
        type:String,
        required:false, 
    },
    count:{
        type:Number,
        return:true
    }
})
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    cart:[CartSchema]
})

module.exports = mongoose.model("users",UserSchema);