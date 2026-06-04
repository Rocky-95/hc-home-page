import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/Slider.css"; // Create this CSS file for styling

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../shared/assets/images/HomePageSliderImages/HomeSlide1.jpeg";
import slide2 from "../../shared/assets/images/HomePageSliderImages/HomeSlide2.jpeg";
import slide3 from "../../shared/assets/images/HomePageSliderImages/HomeSlide3.jpeg";

import slide4 from "../../shared/assets/images/HomePageSliderImages/HomeSlide4.jpeg";

import slide5 from "../../shared/assets/images/HomePageSliderImages/HomeSlide5.jpeg";

import slide6 from "../../shared/assets/images/HomePageSliderImages/HomeSlide6.jpeg";
import slide7 from "../../shared/assets/images/HomePageSliderImages/WhatsApp Image 2025-09-26 at 00.49.50.jpeg";

import whiteIcon from "../../shared/assets/images/Logo White.jpg";
const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    className="custom-arrow custom-prev"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    className="custom-arrow custom-next"
    onClick={onClick}
    aria-label="Next slide"
  >
    <FaChevronRight />
  </button>
);

const VideoImageSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        <div className="slide">
          <img src={slide1} alt="Slide 1" />
          <div className="white-icon-overlay" style={{ backgroundImage: `url(${whiteIcon})` }} />
        </div>
        <div className="slide">
          <img src={slide2} alt="Slide 2" />
          <div className="white-icon-overlay" style={{ backgroundImage: `url(${whiteIcon})` }} />
        </div>
        <div className="slide">
          <img src={slide3} alt="Slide 3" />
          <div className="white-icon-overlay" style={{ backgroundImage: `url(${whiteIcon})` }} />
        </div>
         <div className="slide">
          <img src={slide4} alt="Slide 4" />
          <div className="white-icon-overlay" style={{ backgroundImage: `url(${whiteIcon})` }} />
        </div>
         <div className="slide">
          <img src={slide5} alt="Slide 5" />
          <div className="white-icon-overlay" style={{ backgroundImage: `url(${whiteIcon})` }} />
        </div>
         <div className="slide">
          <img src={slide6} alt="Slide 6" />
          <div className="white-icon-overlay" style={{ backgroundImage: `url(${whiteIcon})` }} />
        </div>
         <div className="slide">
          <img src={slide7} alt="Slide 7" />
          <div className="white-icon-overlay" style={{ backgroundImage: `url(${whiteIcon})` }} />
        </div>
      </Slider>
    </div>
  );
};

export default VideoImageSlider;
