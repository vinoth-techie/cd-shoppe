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

const ElectronicSchema = mongoose.Schema({
    img:{
        type:String,
        required: true,
    },
    electronicName:{
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
    details:[DetailSchema]
},{
    timestamps:true
});

const ElectronicModel = mongoose.model("electronic",ElectronicSchema);
module.exports = ElectronicModel;