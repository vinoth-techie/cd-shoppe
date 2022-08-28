const mongoose = require('mongoose');
const DetailSchema = mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    contents:{
        type:String,
        required:false
    }
});
const FashionSchema = mongoose.Schema({
    img:{
        type:String,
        required: true,
    },
    fashionName:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    stockCount:{
        type:Number,
        required:false,
        default:0
    },
    details:[DetailSchema]
},{
    timestamps:true
});

const FashionModel = mongoose.model("fashion",FashionSchema);

module.exports = FashionModel; 