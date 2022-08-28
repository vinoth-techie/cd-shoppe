import * as ActionTypes from './ActionTypes'; 
import axios from 'axios';
 

export const postFashionContents = (id,title,content) => (dispatch) =>{
    dispatch(fashionLoading(true));
    return axios.put('http://localhost:3001/fashions/details', {
        id:id,
        title:title,
        content:content
    })
    .then((response)=> response.data) 
    .then(response => dispatch(addFashions(response)))
    .catch((error)=>dispatch(fashionsFailed(error)))
}
export const postApplianceContents =  (id,title,content) => (dispatch) =>{
    dispatch(applianceLoading(true));
    return axios.put('http://localhost:3001/appliances/details', {
        id:id,
        title:title,
        content:content
    })
        .then((response)=> response.data)
        .then(response => dispatch(addAppliance(response)))
        .catch((error)=>dispatch(applianceFailed(error)))
}

export const postElectronicContents = (id,title,content) => (dispatch) =>{
    dispatch(electronicsLoading(true));

    return axios.put('http://localhost:3001/electronics/details', {
        id:id,
        title:title,
        content:content
    }) 
        .then((response)=> response.data)
        .then(response => dispatch(addElectronics(response)))
        .catch((error)=>dispatch(electronicsFailed(error)))
}
export const postMobileContents = (id,title,content) => (dispatch) =>{
    dispatch(mobilesLoading(true));

    return axios.put('http://localhost:3001/mobiles/details', {
        id:id,
        title:title,
        content:content
    }) 
        .then((response)=> response.data)
        .then(response => dispatch(addMobiles(response)))
        .catch((error)=>dispatch(mobilesFailed(error)))
} 
export const postGroceryContents = (id,title,content) => (dispatch) =>{
    dispatch(groceryLoading(true));

    return axios.put('http://localhost:3001/grocery/details', {
        id:id,
        title:title,
        content:content
    }) 
        .then((response)=> response.data)
        .then(response => dispatch(addGrocery(response)))
        .catch((error)=>dispatch(groceryFailed(error)))
}


//delete product
export const deleteProduct = (id,category) => (dispatch) =>{ 
    if(category==="Fashions"){
        dispatch(fashionLoading(true))
        return axios.put(`http://localhost:3001/delete/fashions`,{id:id}) 
        .then((response)=> response.data) 
        .then(response => dispatch(addFashions(response)))
        .catch((error)=>dispatch(fashionsFailed(error)))
    }  
    if(category==="Mobile") {
        dispatch(mobilesLoading(true))
        return axios.put(`http://localhost:3001/delete/mobiles`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addMobiles(response)))
        .catch((error)=>dispatch(mobilesFailed(error)))
    }
    if(category==="Electronics"){
        dispatch(electronicsLoading(true));
        return axios.put(`http://localhost:3001/delete/electronics`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addElectronics(response)))
        .catch((error)=>dispatch(electronicsFailed(error)))
    }
    if(category==="Grocery"){
        dispatch(groceryLoading(true));
        return axios.put(`http://localhost:3001/delete/grocery`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addGrocery(response)))
        .catch((error)=>dispatch(groceryFailed(error)))
    }
    if(category==="Appliances"){
        dispatch(applianceLoading(true));
        return axios.put(`http://localhost:3001/delete/appliances`,{id:id})
        .then((response)=> response.data)
        .then(response => dispatch(addAppliance(response)))
        .catch((error)=>dispatch(applianceFailed(error)))
    }
}


export const postFashions = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category);
    fd.append("stock",stock); 
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/fashions', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addFashions(response)))
    .catch((error)=>dispatch(fashionsFailed(error)))
}

//Fetch the Fashions
export const fetchFashions = () =>(dispatch)=>{
    dispatch(fashionLoading(true));

    return axios.get('http://localhost:3001/fashions') 
        .then((response)=> response.data)
        .then(response => dispatch(addFashions(response)))
        .catch((error)=>dispatch(fashionsFailed(error)))
}

export const fashionLoading = () =>({
    type:ActionTypes.FASHIONS_LOADING
});

export const fashionsFailed = () =>({
    type:ActionTypes.FASHIONS_FAILED
});

export const addFashions = (fashions) => ({
    type:ActionTypes.ADD_FASHIONS,
    payload:fashions
});

//Post the Appliance
export const postAppliance = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/appliances', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addAppliance(response)))
    .catch((error)=>dispatch(applianceFailed(error))) 
}
//Fetch the Appliance
export const fetchAppliance = () =>(dispatch)=>{
    dispatch(applianceLoading(true));

    return axios.get('http://localhost:3001/appliances') 
        .then((response)=> response.data)
        .then(response => dispatch(addAppliance(response)))
        .catch((error)=>dispatch(applianceFailed(error)))
}

export const applianceLoading = () =>({
    type:ActionTypes.APPLIANCES_LOADING
});

export const applianceFailed = () =>({
    type:ActionTypes.APPLIANCES_FAILED
});

export const addAppliance = (appliance) => ({
    type:ActionTypes.ADD_APPLIANCES,
    payload:appliance
});

//Post the Electronics
export const postElectronics = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/electronics', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addElectronics(response)))
    .catch((error)=>dispatch(electronicsFailed(error))) 
}
//Fetch the Electronics
export const fetchElectronics = () =>(dispatch)=>{
    dispatch(electronicsLoading(true));

    return axios.get('http://localhost:3001/electronics') 
        .then((response)=> response.data)
        .then(response => dispatch(addElectronics(response)))
        .catch((error)=>dispatch(electronicsFailed(error)))
}

export const electronicsLoading = () =>({
    type:ActionTypes.ElECTRONICS_LOADING
});

export const electronicsFailed = () =>({
    type:ActionTypes.ElECTRONICS_FAILED
});

export const addElectronics = (electronic) => ({
    type:ActionTypes.ADD_ElECTRONICS,
    payload:electronic
});

//Post the Mobiles
export const postMobiles = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category);
    return axios.post('http://localhost:3001/mobiles', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addMobiles(response)))
    .catch((error)=>dispatch(mobilesFailed(error))) 
}
 
//Fetch the Mobiles
export const fetchMobiles = () =>(dispatch)=>{
    dispatch(mobilesLoading(true));

    return axios.get('http://localhost:3001/mobiles') 
        .then((response)=> response.data)
        .then(response => dispatch(addMobiles(response)))
        .catch((error)=>dispatch(mobilesFailed(error)))
}

export const mobilesLoading = () =>({
    type:ActionTypes.MOBILES_LOADING
});

export const mobilesFailed = () =>({
    type:ActionTypes.MOBILES_FAILED
});

export const addMobiles = (mobile) => ({
    type:ActionTypes.ADD_MOBILES,
    payload:mobile
});

//Post the Grocery
export const postGrocery = (image,name,price,category,stock) => (dispatch)=>{ 
    var fd = new FormData();
    fd.append("name",name);
    fd.append("price",price);
    fd.append("image",image);
    fd.append("category",category); 
    fd.append("stock",stock);
    console.log(image,name,price,category,stock);
    return axios.post('http://localhost:3001/grocery', fd)
    .then((response)=> response.data)
    .then(response => dispatch(addGrocery(response)))
    .catch((error)=>dispatch(groceryFailed(error))) 
}
//Fetch the Grocery
export const fetchGroceries = () =>(dispatch)=>{
    dispatch(groceryLoading(true));

    return axios.get('http://localhost:3001/grocery') 
        .then((response)=> response.data)
        .then(response => dispatch(addGrocery(response)))
        .catch((error)=>dispatch(groceryFailed(error)))
}

export const groceryLoading = () =>({
    type:ActionTypes.GROCERIES_LOADING
});

export const groceryFailed = () =>({
    type:ActionTypes.GROCERIES_FAILED
});

export const addGrocery = (grocery) => ({
    type:ActionTypes.ADD_GROCERIES,
    payload:grocery
});

//user get request
export const getUser = () => (dispatch)=>{ 
    dispatch(userLoading(true))
    return axios.get('http://localhost:3001/user')
    .then((response)=> response.data)
    .then(response => dispatch(addUser(response)))
    .catch((error)=>dispatch(userFailed(error))) 
} 


//Post User Cart
export const postCart = (email,product_id,product_name,count,category,img,price) => (dispatch)=>{ 
    dispatch(userLoading(true))
    return axios.put('http://localhost:3001/user/cart', {email:email,product_id:product_id,product_name:product_name,count:count,category:category,img:img,price:price})
    .then((response)=> response.data)
    .then(response => dispatch(addUser(response)))
    .catch((error)=>dispatch(userFailed(error))) 
} 
//user
export const postUser = (email) => (dispatch)=>{ 
    dispatch(userLoading(true))
    return axios.post('http://localhost:3001/user', {email:email})
    .then((response)=> response.data)
    .then(response => dispatch(addUser(response)))
    .catch((error)=>dispatch(userFailed(error))) 
} 

//delete the cart products
export const deleteCart = (email,name) => (dispatch)=>{ 
    dispatch(userLoading(true))
    return axios.put('http://localhost:3001/user/cart/delete', {email:email,name:name})
    .then((response)=> response.data)
    .then(response => dispatch(addUser(response)))
    .catch((error)=>dispatch(userFailed(error))) 
} 

export const userLoading = () =>({
    type:ActionTypes.USER_LOADING
});

export const userFailed = () =>({
    type:ActionTypes.USER_FAILED
});

export const addUser = (user) => ({
    type:ActionTypes.FIND_USER,
    payload:user
});
