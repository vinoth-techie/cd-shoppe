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
const MobileSchema = mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    mobileName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    details:[DetailSchema]
},{
    timestamps:true
});
const MobileModel = mongoose.model("mobile",MobileSchema);

module.exports = MobileModel; 