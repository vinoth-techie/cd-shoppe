const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const CategoryModel = require("./models/Categories")
const FashionModel = require('./models/Fashions');
const ApplianceModel = require("./models/Appliance");
const MobileModel = require('./models/Mobile');
const ElectronicModel = require('./models/Electronics'); 
const GroceryModel = require('./models/Grocery'); 
const UserModel = require('./models/User'); 

app.use(cors());
app.use('/uploads',express.static('uploads')); //uploads image
mongoose.connect(
    "mongodb://localhost:27017/e-commerce?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    { useNewUrlParser: true }
);

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:false,
    })
)

app.use(fileUpload());
app.post('/fashions',async (req,res)=>{
    var img = req.files.image
      
    const imageTime = Date.now()+img.name;
    await img.mv('uploads/images/'+imageTime,async(err)=>{
            if(err){
                res.json({"status":"file Not Uploaded"});
            }
            else{
                const fashion = new FashionModel({
                    fashionName:req.body.name,
                    price:req.body.price,
                    img:imageTime,
                    category:req.body.category,
                    stockCount:parseInt(req.body.stock)
                });
                await fashion.save() 
                
                FashionModel.find({},(error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    else{
                        res.send(result);
                    }
                })
            }
    });
    
}) 
app.get("/categories",async(req,res)=>{
    CategoryModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.get("/fashions",async(req,res)=>{
    FashionModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.put("/fashions/details",async(req,res)=>{
    console.log(req.body);
    const des = await FashionModel.findByIdAndUpdate(
        req.body.id,
        {$addToSet:{details:{title:req.body.title,contents:req.body.content}}},
        {upsert: true, new : true}
    )
    des.save();
    res.send(des);
})


app.put("/appliances/details",async(req,res)=>{
    console.log(req.body);
    const des = await ApplianceModel.findByIdAndUpdate(
        req.body.id,
        {$addToSet:{details:{title:req.body.title,contents:req.body.content}}},
        {upsert: true, new : true}
    )
    des.save();
    res.send(des);
})

app.put("/electronics/details",async(req,res)=>{
    console.log(req.body);
    const des = await ElectronicModel.findByIdAndUpdate(
        req.body.id,
        {$addToSet:{details:{title:req.body.title,contents:req.body.content}}},
        {upsert: true, new : true}
    )
    des.save();
    res.send(des);
})

app.put("/mobiles/details",async(req,res)=>{
    console.log(req.body);
    const des = await MobileModel.findByIdAndUpdate(
        req.body.id,
        {$addToSet:{details:{title:req.body.title,contents:req.body.content}}},
        {upsert: true, new : true}
    )
    des.save();
    res.send(des);
})

app.put("/grocery/details",async(req,res)=>{
    console.log(req.body);
    const des = await GroceryModel.findByIdAndUpdate(
        req.body.id,
        {$addToSet:{details:{title:req.body.title,contents:req.body.content}}},
        {upsert: true, new : true}
    )
    des.save();
    res.send(des);
})



app.post('/appliances',async(req,res)=>{ 
    var img = req.files.image 
    const imageTime = Date.now()+img.name;
    await img.mv('uploads/images/'+imageTime,async(err)=>{
            if(err){
                res.json({"status":"file Not Uploaded"});
            }
            else{ 
                const appliance = new ApplianceModel({
                    applianceName:req.body.name,
                    price:req.body.price,
                    img:imageTime,
                    category:req.body.category,
                    stockCount:parseInt(req.body.stock)
                });
                await appliance.save() 
                .then(()=>{})
                .catch((err)=>{console.log(err)});

                ApplianceModel.find({},(error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    else{
                        res.send(result);
                    }
                })
            }
    });
    
});


app.get("/appliances",async(req,res)=>{
    ApplianceModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.post('/electronics',async(req,res)=>{ 
    var img = req.files.image 
    const imageTime = Date.now()+img.name;
    await img.mv('uploads/images/'+imageTime,async(err)=>{
            if(err){
                res.json({"status":"file Not Uploaded"});
            }
            else{ 
                const electronic = new ElectronicModel({
                    electronicName:req.body.name,
                    price:req.body.price,
                    img:imageTime,
                    category:req.body.category,
                    stockCount:parseInt(req.body.stock)
                });
                await electronic.save() 
                .then(()=>{})
                .catch((err)=>{console.log(err)});

                ElectronicModel.find({},(error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    else{
                        res.send(result);
                    }
                })
            }
    });
    
});

app.get("/electronics",async(req,res)=>{
    ElectronicModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.post('/mobiles',async(req,res)=>{ 
    var img = req.files.image 
    const imageTime = Date.now()+img.name;
    await img.mv('uploads/images/'+imageTime,async(err)=>{
            if(err){
                res.json({"status":"file Not Uploaded"});
            }
            else{ 
                const mobile = new MobileModel({
                    mobileName:req.body.name,
                    price:req.body.price,
                    img:imageTime,
                    category:req.body.category,
                    stockCount:parseInt(req.body.stock)
                });
                await mobile.save() 
                .then(()=>{})
                .catch((err)=>{console.log(err)});

                MobileModel.find({},(error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    else{
                        res.send(result);
                    }
                }) 
            }
    });
    
});

app.get("/mobiles",async(req,res)=>{
    MobileModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

//Get for Accessories
app.get("/grocery",async(req,res)=>{
    GroceryModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});
app.post('/grocery',async (req,res)=>{ 
    var img = req.files.image 
    const imageTime = Date.now()+img.name;
    await img.mv('uploads/images/'+imageTime,async(err)=>{
            if(err){
                res.json({"status":"file Not Uploaded"});
            }
            else{ 
                const grocery = new GroceryModel({
                    groceryName:req.body.name,
                    price:req.body.price,
                    img:imageTime,
                    category:req.body.category,
                    stockCount:parseInt(req.body.stock)
                });
                await grocery.save() 
                .then(()=>{})
                .catch((err)=>{console.log(err)});

                GroceryModel.find({},(error,result)=>{
                    if(error){
                        res.send(error);
                    }
                    else{
                        res.send(result);
                    }
                })
            }
    });
    
});
//get user
app.get("/user",async(req,res)=>{
    UserModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
//user
app.post("/user",async(req,res)=>{
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        UserModel.findOne({email: req.body.email},(err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    } else {
        // Insert the new user if they do not exist yet
        user = new UserModel({ 
            email: req.body.email, 
        });
        await user.save()
        .then(()=>{})
        .catch((err)=>{console.log(err)});
        res.send(user);
    }
    
})


app.put("/user/cart",async(req,res)=>{
    console.log(req.body);
    const cart = await UserModel.findOneAndUpdate(
        { email: req.body.email }, 
        { $addToSet: { cart: {product_id:req.body.product_id,product_name:req.body.product_name,count:req.body.count,category:req.body.category,product_img:req.body.img,price:req.body.price}  } });
        
    cart.save();
    res.send(cart);
})

app.put("/user/cart/delete",async(req,res)=>{
    console.log(req.body);
    const dele = await UserModel.findOneAndUpdate(
        { email: req.body.email }, 
        { $pull: { cart: { product_name: req.body.name} } });
    dele.save();
    res.send(dele);
})

app.put("/delete/fashions",async(req,res)=>{
    FashionModel.findByIdAndRemove(req.body.id, function(err){
        if(err){
            console.log("error",err);
        } else {
            console.log("successfully deleted");
        }
     });
     FashionModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.put("/delete/electronics",async(req,res)=>{
    ElectronicModel.findByIdAndRemove(req.body.id, function(err){
        if(err){
            console.log("errors",err);
        } else {
            console.log("successfully deleted");
        }
     });
     ElectronicModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
app.put("/delete/mobiles",async(req,res)=>{
    MobileModel.findByIdAndRemove(req.body.id, function(err){
        if(err){
            console.log("error",err);
        } else {
            console.log("successfully deleted");
        }
     });
     MobileModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
app.put("/delete/grocery",async(req,res)=>{
    GroceryModel.findByIdAndRemove(req.body.id, function(err){
        if(err){
            console.log("error",err);
        } else {
            console.log("successfully deleted");
        }
     });
     GroceryModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
app.put("/delete/appliances",async(req,res)=>{

    ApplianceModel.findByIdAndRemove(req.body.id, function(err){
        if(err){
            console.log("error",err);
        } else {
            console.log("successfully deleted");
        }
     });
     ApplianceModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

//Server is Running this Port
app.listen(3001,()=>{
    console.log(`Server is up and running on http://localhost:3001`);
})
