import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Form,
  Input,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  FormGroup,
  Label,
  Col,
  ModalFooter,
} from "reactstrap";
import { Button, Grid, IconButton } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import emailjs from "emailjs-com";
import { Alert as AlertComponent } from "reactstrap";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavBar from "../navbar/Navbar";
import ClearIcon from "@material-ui/icons/Clear";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { baseUrl } from "../../shared/baseUrl";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Cart(props) {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order,setOrder] = useState(false)
  const [state, setState] = useState({
    cartDetails: [],
  });
  const [contactInfo, setContactInfo] = useState({
    user_name: "",
    address: "",
    contactno: "",
    country: "",
    state: "",
  });
  const [checkData, setCheckData] = useState();
  const history = useHistory()
  
  useEffect( () => {
    currentUserCartDetails(props.user);
  }, []);
  const currentUserCartDetails = async(user) =>{
    let currentUserCart = await user?.filter((user)=>user.email === currentUser?.email)[0]
    setState({
      cartDetails : currentUserCart?.cart
    })
    console.log('current user',state.cartDetails)
    setCheckData(
      state.cartDetails?.map((data) => {
        return {
          select: false,
          id: data._id,
          price: data.price,
          count: data.count,
          category: data.category,
          product_img: data.product_img,
          product_name: data.product_name,
          product_id: data.product_id,
        };
      })
    );
  }


  const sumOfProducts =
    checkData?.filter((data) => data.select && data)
      .reduce((a, v) => (a = a + v.count * v.price), 0);


  const callToDelete = async (name) => {
    await props.deleteCart(currentUser.email, name);
    window.location.reload();
  };

  const handleSubmitDetails = async () => {
    setTimeout(async () => {
      // (await checkData) &&
      //   checkData.map(async (data) => {
      //     let newObj = {
      //       email: currentUser && currentUser.email,
      //       price: data.price,
      //       count: data.count,
      //       user_name: contactInfo.user_name,
      //       contactno: contactInfo.contactno,
      //       address: contactInfo.address,
      //       state: contactInfo.state,
      //       country: contactInfo.country,
      //       product_img: data.product_img,
      //       product_name: data.product_name,
      //     };
      //     if (data.select) {
      //       alert('getting your orders...')
      //      }
      //   });
      setOrder(true)
      console.log('ordered successfully')
      
    }, 2000);

    

  };
  const paymentHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      if (contactInfo.user_name !== "") {
        await handleSubmitDetails();
      } else {
        setOpen(true);
      }

      setLoading(false);
    }, 3000);
  };

  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const cartproducts = state.cartDetails?.map((cart) => {
    const handleDelete = async (name) => {
      setState({
        cartDetails : state.cartDetails?.filter((product)=>product.product_name !== name)
      })
      console.log(state.cartDetails,'deleted this post',name);
      await callToDelete(name);
    };
    const handleChange = (e) => {
      let checkedVal = e.target.checked;
      setCheckData(
        checkData.map((data) => {
          if (cart._id === data.id) {
            data.select = checkedVal;
          }
          return data;
        })
      );
      console.log("checked ", checkData);
    };
    return (
      <div key={cart._id}>
        <div className="row">
          <div className="d-flex justify-content-end">
            <IconButton
              color="primary"
              onClick={() => handleDelete(cart.product_name)}
            >
              <ClearIcon color="primary" />
            </IconButton>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkData?.select}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                  disabled={contactInfo.user_name === ""}
                />
              }
            />
          </div>
          <Card className="col-4 m-0 p-0">
            <CardImg
              width="100%"
              style={{ height: "250px" }}
              src={baseUrl + cart.product_img}
            />
          </Card>
          <div className="col-3 mt-5 pt-5" style={{ marginRight: "25px" }}>
            <p className="">{cart.product_name}</p>
          </div>
          <div className="col-2 mt-5 pt-5" style={{ marginRight: "-26px" }}>
            <p>
              {" "}
              <span className="fa fa-inr"> </span>
              {cart.price}.0
            </p>
          </div>
          <div className="col-1 mt-5 pt-5" style={{ marginRight: "10px" }}>
            <p className="text-center">{cart.count}</p>
          </div>
          <div
            className="col-2 mt-5 pt-5 text-center"
            style={{ marginRight: "-33px" }}
          >
            <p className="text-center">
              {" "}
              <span className="fa fa-inr"> </span>
              {cart.count * cart.price}.0
            </p>
          </div>
        </div>
        <hr className="mt-4" />
      </div>
    );
  });

  const handleChangeInfo = (e) => {
    const value = e.target.value;
    setContactInfo({
      ...contactInfo,
      [e.target.name]: value,
    });
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSubmitContactInfo = () => {
    console.log(contactInfo);
    toggleModal();
  };

  const toggleOrder = () =>{
    console.log(order)
    setOrder(!order)
  }

  const handleOrder = () =>{
    
    toggleOrder()
  }
  return (
    <>
      <NavBar
      />
      <div className="container">
        <div className="row">
          <div className="col-8 col-sm-6 pt-5 mt-5" style={{ margin: "auto" }}>
            <Form>
              <div className="d-flex justify-content-center mt-4">
                <Input
                  type="search"
                  placeholder="Search here..."
                  className="form-control w-100"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="m-0 border-none d-none d-sm-block"
                >
                  Search&nbsp;&nbsp;
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className="row mt-4">
          <h2 style={{ fontWeight: "bold", color: "#0088CC" }}>
            Shopping Cart
          </h2>
        </div>
        <div className="row mt-5">
          <p>
            <AlertComponent color="warning">
              {" "}
              <i class="fa fa-warning" aria-hidden="true"></i> Please fill your
              Order details first before ordering!
            </AlertComponent>
          </p>
          <h5 style={{ fontWeight: "bold" }} className="text-muted">
            Free Delivery above INR 499 for Aquarium Plants & Accessories
          </h5>
        </div>
        <div className="row mt-3">
          <div className="col-3 text-muted">Product</div>
          <div className="col-2 text-muted" style={{ marginLeft: "-23px" }}>
            Name
          </div>
          <div className="col-1 text-muted" style={{ marginLeft: "12px" }}>
            Price
          </div>
          <div className="col-1 text-muted" style={{ marginLeft: "10px" }}>
            Qty
          </div>
          <div className="col-1 text-muted">SubTotal</div>
          <hr className="col-8 mt-3" />
        </div>
        <div className="row">
          <div className="col-8 mt-4">
            {cartproducts}
            
          </div>
          <div className="col-4">
            <Card>
              <CardBody>
                <CardTitle>
                  <h3 style={{ fontWeight: "bold", color: "#0088CC" }}>
                    Summary
                  </h3>
                </CardTitle>
                <Accordion square={false} elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Fill Your Order Details{" "}
                      <span className="text-danger">*</span>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid md={12}>
                      <div>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={toggleModal}
                          fullWidth
                        >
                          Order Info
                        </Button>
                      </div>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <hr />
                <div className="row">
                  <div className="col-9">
                    <p>Subtotal</p>
                  </div>
                  <div className="col-3">
                    <p>
                      <i class="fa fa-inr" aria-hidden="true"></i>
                      {sumOfProducts}.0
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9 text-muted">
                    <p>
                      Shipping (Shipping Table Rates - Shipping across India
                      (Blue Dart & other leading couriers))
                    </p>
                  </div>
                  <div className="col-3">
                    <h6>
                      <i class="fa fa-inr" aria-hidden="true"></i>99.0
                    </h6>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-9">
                    <h5 className="text-muted">Order Total</h5>
                  </div>
                  <div className="col-3">
                    ₹{sumOfProducts ? Number(sumOfProducts) + Number(99) : 0}.0
                  </div>
                </div>
                <div className="row p-2">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={paymentHandler}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size="30px" thickness="4.5" />
                    ) : (
                      "Order now"
                    )}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose} severity="error" variant="filled">
              Please Provide your Order Details!
            </Alert>
          </Snackbar>
          <Modal
            scrollable
            isOpen={isModalOpen}
            toggle={toggleModal}
            backdrop="static"
            centered
            className="modal-lg"
          >
            <ModalHeader toggle={toggleModal}>
              <h4>
                <b>Order Info</b>
              </h4>
            </ModalHeader>
            <ModalBody className="row mt-0">
              <div className="col-12">
                <form className="row" autoComplete="off">
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="name">
                          Full Name <span className="text-danger"> *</span>
                        </Label>
                        <Input
                          className="mt-2"
                          type="text"
                          name="user_name"
                          placeholder="Name"
                          value={contactInfo.user_name}
                          onChange={handleChangeInfo}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <FormGroup>
                        <Label htmlFor="contactno">
                          Contact No<span className="text-danger">*</span>
                        </Label>
                        <Input
                          className="mt-2"
                          type="text"
                          name="contactno"
                          placeholder="Contact Number"
                          value={contactInfo.contactno}
                          onChange={handleChangeInfo}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <FormGroup>
                        <Label htmlFor="address">
                          Address<span className="text-danger"> *</span>
                        </Label>
                        <textarea
                          rows="2"
                          className="mt-2 form-control"
                          type="text"
                          name="address"
                          placeholder="address"
                          value={contactInfo.address}
                          onChange={handleChangeInfo}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col>
                      <FormGroup>
                        <Label htmlFor="country">
                          Country <span className="text-danger"> *</span>
                        </Label>
                        <Input
                          className="mt-2"
                          type="text"
                          name="country"
                          placeholder="Country"
                          value={contactInfo.country}
                          onChange={handleChangeInfo}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <FormGroup>
                        <Label htmlFor="state">
                          State <span className="text-danger"> *</span>
                        </Label>
                        <Input
                          className="mt-2"
                          type="text"
                          name="state"
                          placeholder="State"
                          value={contactInfo.state}
                          onChange={handleChangeInfo}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="contained"
                style={{
                  marginRight: "6px",
                  color: "white",
                  backgroundColor: "#918d8d",
                }}
                onClick={toggleModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmitContactInfo}
              >
                submit
              </Button>
            </ModalFooter>
          </Modal>



          <Modal
                isOpen={order}
                toggle={toggleOrder} 
                centered
                >
                <ModalBody className="row p-4">
                    <div className="col-12 text-center">
                        <img width="220" height="170" src="./assets/order.gif" />
                    </div>
                    <div className="col-12 text-center"> 
                        <h5><b>Ordered Successfully</b></h5>
                        <Button
                            onClick={handleOrder}
                            variant="contained"
                            color="secondary"
                        >
                            Done
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
      </div>
    </>
  );
}

export default Cart;
