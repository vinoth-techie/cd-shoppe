import React,{useEffect,useState} from "react";
import SignUp from "./components/signup/SignUp";
import Home from './components/home/Home'
import Login from './components/login/Login'; 
import { useAuth } from "./contexts/AuthContext";
import {withRouter, Route, Switch,Redirect} from 'react-router-dom';
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import UpdateProfile from "./components/updateprofile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import "./App.css";
import Products from "./components/products/Products";
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';
import LightSpeed from 'react-reveal/LightSpeed';
import HeadShake from 'react-reveal/HeadShake';

import { 
  deleteCart, 
  fetchFashions, 
  fetchAppliance, 
  fetchGroceries, 
  fetchElectronics, 
  fetchMobiles, 
  getUser, 
  postCart,
  postUser,
  deleteProduct, 
  postFashions, 
  postGrocery, 
  postElectronics, 
  postAppliance, 
  postMobiles, 
  postFashionContents, 
  postGroceryContents, 
  postElectronicContents, 
  postApplianceContents, 
  postMobileContents, } from "./redux/ActionCreators";
 
import { connect } from "react-redux";
import Footer from "./components/footer/Footer"; 
import ProductDetails from "./components/products/ProductDetails";
import ContactUs from "./components/contactus/ContactUs";
import ScrollToTop from "./components/scrollTop/ScrollToTop";
import Cart from "./components/cart/Cart";

const mapStateToProps = (state) =>{
  return {
    categories : state.categories,
    fashions : state.fashions,
    groceries : state.groceries,
    mobiles : state.mobiles,
    appliances : state.appliances,
    electronics : state.electronics,
    user : state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  postFashions : (image,name,price,category,stock)=>{dispatch(postFashions(image,name,price,category,stock))},
  postGrocery : (image,name,price,category,stock)=>{dispatch(postGrocery(image,name,price,category,stock))},
  postElectronics : (image,name,price,category,stock)=>{dispatch(postElectronics(image,name,price,category,stock))},
  postAppliance : (image,name,price,category,stock)=>{dispatch(postAppliance(image,name,price,category,stock))},
  postMobiles : (image,name,price,category,stock)=>{dispatch(postMobiles(image,name,price,category,stock))},
  postCart : (email,product_id,product_name,count,category,img,price)=> {dispatch(postCart(email,product_id,product_name,count,category,img,price))},
  getUser : ()=>{dispatch(getUser())},
  deleteCart : (email,name)=>{dispatch(deleteCart(email,name))},
  postUser : (email)=>{dispatch(postUser(email))},
  fetchFashions : ()=>{dispatch(fetchFashions())},
  fetchGroceries : ()=>{dispatch(fetchGroceries())},
  fetchElectronics : ()=>{dispatch(fetchElectronics())},
  fetchAppliance : ()=>{dispatch(fetchAppliance())},
  fetchMobiles : ()=>{dispatch(fetchMobiles())},
  postFashionContents : (id,title,content) =>{dispatch(postFashionContents(id,title,content))},
  postGroceryContents : (id,title,content) =>{dispatch(postGroceryContents(id,title,content))},
  postElectronicContents : (id,title,content) =>{dispatch(postElectronicContents(id,title,content))},
  postApplianceContents : (id,title,content) =>{dispatch(postApplianceContents(id,title,content))},
  postMobileContents : (id,title,content) =>{dispatch(postMobileContents(id,title,content))},
  deleteProduct : (id,category) => {dispatch(deleteProduct(id,category))},
})

function MainComponent(props) {
  const {currentUser} = useAuth();  
  const [allProduct,setAllProduct] = useState([]);
  var allproducts = []

  useEffect(()=>{
    props.fetchFashions();
    props.fetchGroceries();
    props.fetchElectronics();
    props.fetchAppliance();
    props.fetchMobiles();
    props.getUser();
    //allproducts.push(...props.fishes.fishes,...props.substrates.substrates,...props.foods.foods,...props.filters.filters,...props.plants.plants)
    //console.log("dfs",props.user.user);
    console.log("Allproducts ",props.categories);
  },[]);   
  useEffect(() => {
  //  await allproducts.push(...props.fishes.fishes,...props.substrates.substrates,...props.foods.foods,...props.filters.filters,...props.plants.plants)
  //  console.log("Allproducts ",allproducts);
  }, []);

  const HomePage = () =>{
    return(
      <Home 
        categories = {props.categories}
        electronics = {props.electronics.electronics}
      />
    )
  }
  
  const ProductWithDetails = () =>{
    return(
      <ProductDetails 
        postCart = {props.postCart}
        postFashionContents = {props.postFashionContents}
        postApplianceContents = {props.postApplianceContents}
        postElectronicContents = {props.postElectronicContents}
        postMobileContents = {props.postMobileContents}
        postGroceryContents = {props.postGroceryContents}
      />
    )
  }
  const CartWithDetails =  () =>{ 

    return (
      <Cart  
        deleteCart = {props.deleteCart}
        user = {props.user.user}
      />
    )
  }
  const ProductsData = () =>{
    return(
      <Products  
        allProducts = {allProduct}

        fashions = {props.fashions.fashions}
        fashionsLoading = {props.fashions.isLoading}
        fashionsErr = {props.fashions.errmess}

        groceries = {props.groceries.groceries}
        groceriesLoading = {props.groceries.isLoading}
        groceriesErr = {props.groceries.errmess}

        mobiles = {props.mobiles.mobiles}
        mobilesLoading = {props.mobiles.isLoading}
        mobilesErr = {props.mobiles.errmess}

        electronics = {props.electronics.electronics}
        electronicsLoading = {props.electronics.isLoading}
        electronicsErr = {props.electronics.errmess}

        appliances = {props.appliances.appliances}
        appliancesLoading = {props.appliances.isLoading}
        appliancesErr = {props.appliances.errmess}

        postFashions = {props.postFashions}
        postAppliance = {props.postAppliance}
        postMobiles = {props.postMobiles}
        postElectronics = {props.postElectronics}
        postGrocery = {props.postGrocery}

        deleteProduct = {props.deleteProduct}
        />
    );
  }

  return ( 
        <>
          <ScrollToTop>
            <Switch>
            {/*  <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} /> */}
              <Route exact path='/home' component={HomePage}/>
              <Route path='/contactus' component={ContactUs} />
              <Route exact path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={()=> <Login postUser={props.postUser}/>} />
              <Route path='/forgot-password' component={ForgotPassword}/>
              <Route exact path='/products' component={ProductsData} />
              <Route path='/products/details/:name' component={ProductWithDetails} />
              <Route exact path='/cart' component={CartWithDetails} />
              <Redirect to='/home' /> 
            </Switch> 
          </ScrollToTop>
          <Fade bottom>
            <Footer />
          </Fade>
       </>
  );
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));
