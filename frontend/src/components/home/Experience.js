import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import {Card, CardBody, CardHeader,CardImgOverlay,CardImg } from "reactstrap"; 

export default function Experience() {
  var settings = {  
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase : 'linear',
    arrows: false,
    initialSlide: 0,
    
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
    ]
  
  }; 
  return (
      <div className="row">
          Products
    </div>
  );
}
