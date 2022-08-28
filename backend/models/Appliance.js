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
const ApplianceSchema = mongoose.Schema({
    img:{
        type:String,
        required: true,
    },
    applianceName:{
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

const ApplianceModel = mongoose.model("appliance",ApplianceSchema);
module.exports = ApplianceModel;