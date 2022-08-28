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
})
const GrocerySchema = mongoose.Schema({
    img:{
        type:String,
        required: true,
    },
    groceryName:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    details:[DetailSchema],
},{
    timestamps:true
});

const GroceryModel = mongoose.model("grocery",GrocerySchema);
module.exports = GroceryModel;