import React,{ useEffect, useState } from 'react'
import { Card,CardText,CardBody,CardHeader,CardImg,CardImgOverlay,CardTitle,Container,Modal, ModalBody } from 'reactstrap'
import { Link,useHistory } from 'react-router-dom';
import { Loading } from '../../../shared/Loading';
import { baseUrl } from '../../../shared/baseUrl';
import {Button, IconButton, Typography, withWidth} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import Rating from '@material-ui/lab/Rating'; 
import { useAuth } from '../../../contexts/AuthContext';
import DeleteIcon from '@material-ui/icons/Delete';
const RenderFashion = ({fashion,deleteProduct}) =>{
    const [text,setText] = useState(false);
    const [value,setValue] = useState(0);
    const [backtofront,setBackToFront] = useState();
    const handleMouseOver = () =>{

        setText(!text);
    }
    const {currentUser} = useAuth();
    const history = useHistory();
    const handleClick = (fashion) =>{ 
        history.push({ 
            pathname: `/products/details/${fashion.fashionName}`,
            state: {data: fashion}
        });
    }
    const [isModalOpen,setIsModalOpen] = useState(false);

    const handleDelete = async(id) =>{
        console.log("sdfsdf",id);
        await deleteProduct(id,fashion.category)
        await toggleModal();
        await window.location.reload();
    }
    const handleModal = () =>{
        toggleModal();
    }
    const toggleModal = () =>{
        setIsModalOpen(!isModalOpen)
         
       
    }
    return(
        <div className="p-0 m-2">
            <Card 
                className="img-quick p-2"
                onMouseEnter={handleMouseOver} 
                onMouseLeave={handleMouseOver}  
                style={{height:'425px'}}  
            >
                    <CardImg className="img-q" width="100" height="250" top src={baseUrl+fashion.img} alt={fashion.fashionName} />
                    <CardImgOverlay className="text-white m-2 row"> 
                        <div className="col-12">
                            <b>{text && 
                                <IconButton
                                    variant="outlined"
                                    color="inherit"
                                    style={{backgroundColor:'#0088cc'}}
                                    onClick={()=>handleClick(fashion)}
                                >
                                    <i class="fa fa-shopping-bag"></i>
                                </IconButton>
                                }</b>
                            {currentUser && currentUser.email==="vinoth@gmail.com" && <b style={{marginLeft:'4px'}}>{text && 
                                <IconButton
                                    variant="outlined"
                                    color="inherit"
                                    style={{backgroundColor:'#e32040'}}
                                    onClick={handleModal}
                                >
                                   <DeleteIcon style={{fontSize:'26px'}}/>
                                </IconButton>
                            }</b>}
                        </div> 
                    </CardImgOverlay>
                    <CardBody className="text-center"> 
                         <p><b>{fashion.fashionName}</b></p>  
                            <Rating  
                                className="mt-0"
                                name="simple-controlled" 
                                value={4}
                                readOnly
                                style={{fontSize:'1.3rem'}}
                            />&nbsp; | <i className="mt-1" style={{fontSize:'13px',marginTop:'-10px'}}> 4 &nbsp; reviews</i>
                           
                            <h5 className="mt-1"><b><i className="fa fa-inr"></i>{fashion.price}.0</b></h5> 
                    </CardBody>
    
            </Card> 
            <Modal
                isOpen={isModalOpen}
                toggle={toggleModal} 
                centered
                >
                <ModalBody className="row p-4">
                    <div className="col-12 text-center">
                        {/* <h4 style={{color:'#d42059'}}><b>You Can't Undo this operation</b></h4> */}
                        <img width="220" height="170" src="https://i.pinimg.com/originals/ff/fa/9b/fffa9b880767231e0d965f4fc8651dc2.gif" />
                    </div>
                    <div className="col-12 text-center"> 
                        <h5><b>Are you sure to Delete?</b></h5>
                        <Button
                            onClick={()=>handleDelete(fashion._id)}
                            variant="contained"
                            color="secondary"
                        >
                            Yes
                        </Button>
                        <Button 
                            onClick={toggleModal}
                            variant="contained"
                           style={{backgroundColor:'#807c7c',marginLeft:'6px',color:'white'}}
                        >
                            No
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
function Fashions(props) { 
    const [page,setPage] = useState(1);
    const [showPerPage,setShowPerPage] = useState(12);
    const [value, setValue] = React.useState(0);
    const [paginaton,setPagination] = useState({
        start:0,
        end:showPerPage
    });
    useEffect(()=>{
        const value = showPerPage * page;
        console.log("start : ",value-showPerPage);
        console.log("end : ",value);
        setPagination({
            start:value-showPerPage,
            end : value
        })
    },[page]);
    
    const fashions = props.fashions?.slice(paginaton.start,paginaton.end).map((fashion)=>{
        return ( 
            <div className="col-6 col-md-3 m-0 p-0"  key={fashion._id}>
                <RenderFashion fashion={fashion} deleteProduct = {props.deleteProduct}/>
            </div>
        )
    });
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row text-center">
                    <Loading />
                </div>
            </div>
        )
    }
    else if(props.errmess){
        return(
            <div className="container">
                <div className="row text-center">
                    <h4>{props.errmess}</h4>
                </div>
            </div>
        );
    }
    else{
        return ( 
            
                <div className="row"> 
                    {fashions} 
                    <div className="d-flex justify-content-end align-items-end">
                        <Pagination  
                            count={Math.ceil(props.fashions?.length/showPerPage)}
                            color={page%2==0 ?"primary":"secondary"}  
                            shape="rounded"
                            size="large"
                            defaultPage={page}
                            onChange={(event,value)=>setPage(value)}
                            // showFirstButton="true"
                        />
                    </div>
                </div>
        ) 
    }
}

export default Fashions
