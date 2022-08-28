import React, { useEffect,useState,useRef } from 'react'
import { Container,Input,UncontrolledDropdown,DropdownItem,DropdownMenu,DropdownToggle, Modal, ModalHeader, ModalBody,Card,CardImg, Label} from 'reactstrap' 
import "./style.css"
import { Button, IconButton } from '@material-ui/core'; 
import {Button as Btn} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Fashions from './fashion/Fashions';  
import AppsIcon from '@material-ui/icons/Apps';
import DehazeIcon from '@material-ui/icons/Dehaze'; 
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Fab } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router';
import Electronics from './electronic/Electronics';
import Appliances from './appliance/Appliances';
import Mobiles from './mobile/Mobiles';
import NavBar from '../navbar/Navbar';
import Groceries from './grocery/Groceries';
import AllProducts from './allproducts/AllProducts';
import {Form} from 'react-bootstrap'
import {Fade,Zoom} from 'react-reveal';
export default function Products(props) {
    const [value, setValue] = React.useState(0);
    const [imageUpload,setImageUpload]=useState(null);
    const categoryRef = useRef(null);
    const priceRef = useRef();
    const nameRef = useRef();
    const stockRef = useRef();
    const [name,setName] = useState(); 

    const {currentUser} = useAuth();
   

    const [imagePreview,setImagePreview] = useState('');
     const [category,setCategory] = useState('');
     const [state,setState] = useState({
        search:null,
        allData:[],
        filteredData:[]
    });
     useEffect(()=>{
        state.allData.push(...props.fashions,...props.mobiles,...props.electronics,...props.groceries);
        state.filteredData.push(...props.fashions,...props.mobiles,...props.electronics,...props.groceries);
        state.filteredData.push(...props.appliances)
     },[]); 
 
     const [newState,setNewState] = useState({
         search:null,
         fashions: props.fashions,
         fashionsTemp: props.fashions,
         groceries:props.groceries,
         groceriesTemp:props.groceries,
         mobiles : props.mobiles,
         mobilesTemp : props.mobiles,
         electronics : props.electronics,
         electronicsTemp : props.electronics,
         appliances: props.appliances,
         appliancesTemp: props.appliances,
     },[]);

     

    const history = useHistory();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
     const [isModalOpen,setIsModalOpen] = useState(false); 
    
    const toggleModal=()=>{
         setIsModalOpen(!isModalOpen);
         setImagePreview('');
        setImageUpload('');
        setCategory('');
    } 
   
     
    const searchChange = (event) => {
        console.log(event.target.value);
        if(value===0){
            setState({
                ...state,
                [event.target.name] : event.target.value,
                
                filteredData:state.allData.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===1){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                fashions:newState.fashionsTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===2){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                appliances:newState.appliancesTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===3){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                mobiles:newState.mobilesTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===4){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                electronics:newState.electronicsTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
        else if(value===5){
            setNewState({
                ...newState,
                [event.target.name] : event.target.value,
                
                groceries:newState.groceriesTemp.filter(item =>{
                return Object.keys(item).some(key=>
                item[key].toString().toLowerCase().includes(event.target.value.toString().toLowerCase()))
            }),
            });
        }
         console.log("search ",state.search);
      };


      const handleImageUpload = async(event) =>{
          event.preventDefault();
          await save(imageUpload,nameRef.current.value,priceRef.current.value,category,stockRef.current.value);
          toggleModal();

      }

      const handleCategoryChange=(e)=>{
         setCategory(e.target.value);
      }

      const handleUploadClick = (event) =>{
            const file = event.target.files[0];
            setImageUpload(file);
            setImagePreview(URL.createObjectURL(file));
      }

      const save = (image,name,price,category,stock) =>{
        var fd = new FormData();
        fd.append("name",name);
        fd.append("price",price);
        fd.append("image",image);
        fd.append("category",category);
        console.log(name,price,category,stock,'form data')
        if(category==="Fashions"){ 
            console.log("Fashions Post Command");
             props.postFashions(image,name,price,category,stock);
        }
        if(category==="Appliances"){
            console.log("Appliances Post Command");
            props.postAppliance(image,name,price,category,stock);
        }
        if(category==="Mobile"){
            console.log("Mobile Post Command");
            props.postMobiles(image,name,price,category,stock);
        }
        if(category==="Electronics"){
            console.log("Electronics Post Command"); 
            props.postElectronics(image,name,price,category,stock);
        }
        if(category==="Grocery"){
            console.log("Grocery Post command");
            props.postGrocery(image,name,price,category,stock);
        }
      } 
      const handleSortByProduct = () =>{
          if(value===0){ 
            const temp = state.filteredData.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                   (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setState({
                ...state,
                filteredData:temp
            })
          }
          if(value===1){ 
            const temp = newState.fashions.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                fashions:temp
            })
          }
          if(value===2){ 
            const temp = newState.appliances.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                appliances:temp
            })
          }
          if(value===3){ 
            const temp = newState.mobiles.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                mobiles:temp
            })
          }
          if(value===4){ 
            const temp = newState.electronics.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                electronics:temp
            })
          }
          if(value===5){ 
            const temp = newState.groceries.sort((a, b) =>{
                var val1 = Object.values(a);
                var val2 = Object.values(b); 
                return(
                    (val1[2]+"").toLowerCase() > (val2[2]+"").toLowerCase() ? 1 : -1
                )
            })
            setNewState({
                ...newState,
                groceries:temp
            })
          }
          
      }
      const handleSortByPrice = () =>{
        if(value===0){ 
            const temp = [...state.filteredData].sort((a, b) =>(parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setState({
                ...state,
                filteredData:temp
            })
        }
        else if(value===1){ 
            const temp = [...newState.fashions].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                fashions:temp
            })
        }
        else if(value===2){ 
            const temp = [...newState.appliances].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                appliances:temp
            })
        }
        else if(value===3){ 
            const temp = [...newState.mobiles].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                mobiles:temp
            })
        }
        else if(value===4){ 
            const temp = [...newState.electronics].sort((a, b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                electronics:temp
            })
        }
     //   parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))
        if(value===5){  
            const temp = [...newState.groceries].sort((a,b) => (parseFloat(a.price.replace(/,/g, ''))-parseFloat(b.price.replace(/,/g, ''))));
            setNewState({
                ...newState,
                groceries:temp
            })
        }
           
      } 
    return (
        <>
           <NavBar navbg={'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))'} 
             textColor = {'white'}
           />
           <div style={{marginTop:'20px'}}>
               <Container>
                    <div className="row" style={{padding:'30px'}}> 
                        <div className="col-8 col-sm-6 offset-sm-3 p-3 pt-5">
                            <Fade top>
                            <Form>
                                <div className="d-flex justify-content-center mt-4">
                                    <Input type="search" placeholder="Search here..." 
                                        className="form-control w-100 rounded-left"
                                        name="search"
                                        value={state.search}
                                        onChange = {searchChange}
                                    />
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="m-0 border-none d-none d-sm-block"

                                    >Search&nbsp;&nbsp;</Button>
                                </div>
                            </Form>
                            </Fade>
                        </div>
                        {currentUser && currentUser.email==="vinoth@gmail.com" && <div className="col-3 col-sm-3 p-3 pt-5 mt-4">
                            <Btn
                                style={{float:'right'}}
                                variant="outline-success"
                                onClick={toggleModal}
                            >
                                <span className="fa fa-cart-plus fa-lg" style={{marginRight:'9px'}}></span><span className="d-none d-sm-inline-block">ADD</span>
                            </Btn>  
                        </div>}
                        
                        {/* <ProductNav className="col-12" />  */}
                        <div className="col-12">  
                            <Paper elevation={3}>
                                <Tabs
                                    value={value}
                                    indicatorColor="secondary"
                                
                                    textColor="primary"
                                    onChange={handleChange}
                                    aria-label="disabled tabs example"
                                    //centered
                                    variant="scrollable"
                                    scrollButtons="on"
                                    >
                                    <Tab label={<b>All</b>}></Tab>
                                    <Tab label={<b>Fashions</b>}/>
                                    <Tab label={<b>Appliances</b>}/>
                                    <Tab label={<b>Mobile</b>}/>
                                    <Tab label={<b>Electronics</b>}/>
                                    <Tab label={<b>Grocery</b>} /> 
                                </Tabs>
                            </Paper> 
                     <div className="row">
                        <div className="col-12 m-2 d-flex justify-content-between">
                                <div className="p-1 mt-2">
                                    <div className="d-flex">
                                        <div className="m-3 mt-2">Sort By </div>
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret>
                                                    Position
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem header>Sort By</DropdownItem> 
                                                    <DropdownItem onClick={handleSortByProduct}>Product Name</DropdownItem> 
                                                    <DropdownItem onClick={handleSortByPrice}>Price</DropdownItem> 
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div> 
                                    </div> 
                                    <div className="p-1 mt-2">
                                        Show 
                                        <IconButton>
                                            <AppsIcon />
                                        </IconButton> 
                                        <IconButton>
                                            <DehazeIcon />
                                        </IconButton>
                                    </div>
                                </div>
                        </div>
                        <div className="col-12"> 
                            {value===0 && 
                                <Fade left>
                                    <AllProducts 
                                            allProducts={state.filteredData}
                                            deleteProduct = {props.deleteProduct} 
                                        />
                                </Fade>
                            }
                            {
                            value===1 && 
                                <Fade left>
                                <Fashions 
                                    fashions = {newState.fashions} 
                                    isLoading = {props.fashionsLoading}
                                    errmess = {props.fashionsErr}

                                    deleteProduct = {props.deleteProduct} 
                                />
                                </Fade>
                            }
                            {
                                value===2 && 
                                <Fade right>
                                    <Appliances
                                        appliances={newState.appliances} 
                                        isLoading = {props.appliancesLoading}
                                        errmess = {props.appliancesErr} 

                                        deleteProduct = {props.deleteProduct}
                                    />
                                </Fade>
                            }
                            {
                                value===3 && 
                                <Fade left>
                                    <Mobiles 
                                        mobiles={newState.mobiles}
                                        isLoading={props.mobilesLoading}
                                        errmess = {props.mobilesErr}
                                        deleteProduct = {props.deleteProduct}
    
                                    />
                                </Fade>
                            }
                            {
                                value===4 && 
                                <Fade left>
                                <Electronics 
                                    electronics = {newState.electronics} 
                                    isLoading = {props.electronicsLoading}
                                    errmess = {props.electronicsErr}

                                    deleteProduct = {props.deleteProduct}
                                />
                                </Fade>
                            }
                            {
                                value===5 &&
                                <Zoom top>
                                <Groceries 
                                    groceries = {newState.groceries}
                                    isLoading = {props.groceriesLoading}  
                                    errmess = {props.groceriesErr}  
                                    
                                    deleteProduct = {props.deleteProduct}
                                />
                                </Zoom> 
                            }
                         </div>
                       </div>
                       
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        toggle={toggleModal}
                        className="modal-lg"
                        backdrop="static"
                        >
                         <ModalHeader toggle={toggleModal} >
                                <h4 style={{fontWeight:'bold'}}>ADD PRODUCT</h4>
                          </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={handleImageUpload} className="row" method="POST" enctype='multipart/form-data'>
                                    <div className="col-12 col-md-6"> 
                                        <Form.Group id="image" className="text-center">
                                            {/* <Form.Label for="image">Image<span className="text-danger"> *</span></Form.Label><br /> */}
                                            <input
                                                accept="image/*"
                                                className="d-none"
                                                id="contained-button-file"
                                                //multiple
                                                type="file"
                                                onChange={handleUploadClick}
                                                onError={(event) => event.target.src = ''}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Fab component="span" color="primary">
                                                    <AddPhotoAlternateIcon />
                                                </Fab>
                                            </label> 
                                            <Card className="mt-3 border-0"> 
                                                <CardImg className="border-0" src={imagePreview && imagePreview} />
                                            </Card>
                                        </Form.Group>   
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Form.Group id="name">
                                                <Form.Label for="name" className="mt-3">Product Name<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control 
                                                    className="pr-4" 
                                                    type="text" 
                                                    ref={nameRef} 
                                                    placeholder="Name" 
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group id="price">
                                                <Form.Label for="price" className="mt-3">Price<span className="text-danger"> *</span></Form.Label>
                                                <Form.Control 
                                                    className="pr-4" 
                                                    type="text" 
                                                    ref={priceRef} 
                                                    placeholder="Price" 
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group id="stock">
                                                <Form.Label for="stock" className="mt-3">Stock Count <span className="text-danger"> *</span></Form.Label>
                                                <Form.Control 
                                                    className="pr-4" 
                                                    type="text" 
                                                    ref={stockRef} 
                                                    placeholder="Stock count" 
                                                    required
                                                />
                                            </Form.Group>
                                            <Label className="mt-3">Category<span className="text-danger"> *</span></Label>
                                                <Input 
                                                    type="select" 
                                                    id="time"
                                                    name="time"   
                                                    style={{marginTop:'10px'}} 
                                                    value={category}
                                                    onChange = {handleCategoryChange}
                                                > 
                                                    <option>Select a Category....</option> 
                                                    <option>Fashions</option> 
                                                    <option>Appliances</option> 
                                                    <option>Mobile</option> 
                                                    <option>Electronics</option> 
                                                    <option>Grocery</option> 
                                                </Input>  
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                            className="mt-3"
                                        >
                                            Submit
                                        </Button>
                                        </div> 
                                </Form> 
                            </ModalBody>
                    </Modal>
               </Container>
               
           </div>
        </>
    )
}
function TabPanel(props){
    const {children,value,index} = props;
    return(
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        >
            {
                value===index && (
                    <div className="row">
                        <div className="col-12 m-2 d-flex justify-content-between">
                            <div className="p-1 mt-2">
                                <div className="d-flex">
                                    <div className="m-3 mt-2">Sort By </div>
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret>
                                            Position
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Sort By</DropdownItem> 
                                            <DropdownItem>Product Name</DropdownItem> 
                                            <DropdownItem>Price</DropdownItem> 
                                            <DropdownItem>Most viewed</DropdownItem> 
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div> 
                            </div>
                            
                            <div className="p-1 mt-2">
                                Show 
                                <IconButton>
                                    <AppsIcon />
                                </IconButton> 
                                <IconButton>
                                    <DehazeIcon />
                                </IconButton>
                            </div>
                        </div>
                        
                        <div className="col-12"> 
                            {children}
                        </div>
                    </div>
                )
            }
        </div>
    )
}