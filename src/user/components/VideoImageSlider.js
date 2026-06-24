import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/Slider.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../shared/assets/images/HomePageSliderImages/slider1.png";
import slide2 from "../../shared/assets/images/HomePageSliderImages/slider2.JPG";
import slide3 from "../../shared/assets/images/HomePageSliderImages/slider3.png";
import slide4 from "../../shared/assets/images/HomePageSliderImages/slider4.png";
import slide5 from "../../shared/assets/images/HomePageSliderImages/slider5.png";
import slide6 from "../../shared/assets/images/HomePageSliderImages/slider6.png";
import slide7 from "../../shared/assets/images/HomePageSliderImages/slider7.png";
import slide8 from "../../shared/assets/images/HomePageSliderImages/slider8.png";
import whiteIcon from "../../shared/assets/images/Logo White.jpg";
import productService from "../../services/productService";

const defaultSlides = [
  { src: slide1, alt: "Harry Clinton collection look 1" },
  { src: slide2, alt: "Harry Clinton collection look 2" },
  { src: slide3, alt: "Harry Clinton collection look 3" },
  { src: slide4, alt: "Harry Clinton collection look 4" },
  { src: slide5, alt: "Harry Clinton collection look 5" },
  { src: slide6, alt: "Harry Clinton collection look 6" },
  { src: slide7, alt: "Harry Clinton collection look 7" },
  { src: slide8, alt: "Harry Clinton collection look 8" },
];

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
  const [slides, setSlides] = useState(defaultSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await productService.getImageSliders();
        const data = res.data?.data || res.data || [];
        if (data.length > 0) {
          setSlides(
            data.map((item) => ({
              src: item.image_url || item.media_url || item.src,
              alt: item.title || item.alt_text || "Harry Clinton",
              redirect: item.redirect_link || null,
            }))
          );
        }
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  if (loading) {
    return (
      <div className="slider-container d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading slider...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div className="slide" key={slide.src}>
            <img
              src={slide.src}
              alt={slide.alt}
              decoding="async"
            />
            <div
              className="white-icon-overlay"
              style={{ backgroundImage: `url(${whiteIcon})` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoImageSlider;
