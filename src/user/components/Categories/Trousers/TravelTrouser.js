// https://intl.fursac.com/en/c-new-collection.html-------for the reference
import React from "react";
import { useNavigate } from "react-router-dom";
// import logo from ""; // "../../../../shared/assets/images/HC Black.png"
import weddingVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4"; //"../../../../shared/assets/video/suitsPage/BusinessCategory.mp4"

import leftImg from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg"; //"../../../../shared/assets/images/WeddingPage/WeddingLeftImage.jpeg"
import centerVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4"; //"../../../../shared/assets/video/WeddingPage/WeddingCenterVideo.mp4"
import rightImg from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg"; //"../../../../shared/assets/images/WeddingPage/WeddingRightImage.jpeg"

import sliderImg1 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg"; //"../../../../shared/assets/images/WeddingPage/Slider/SliderImage1.jpeg"
import sliderImg2 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg"; //"../../../../shared/assets/images/WeddingPage/Slider/SliderImage2.jpeg"
import sliderImg3 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg"; //"../../../../shared/assets/images/WeddingPage/Slider/SliderImage3.jpeg"

import LabelVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4"; //"../../../../shared/assets/video/WeddingPage/WeddingLabelVideo.mp4"
import LabelImage from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg"; //"../../../../shared/assets/images/WeddingPage/LabelImage.jpeg"
import TheChurchAffair from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4"; //"../../../../shared/assets/video/WeddingPage/TheChurchAffair.mp4"
import TheRoyalWeddingEdit from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg"; //"../../../../shared/assets/images/WeddingPage/TheRoyalWeddingEdit.jpeg"
import TheDestinationDream from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg"; //"../../../../shared/assets/images/WeddingPage/TheDestinationDream.jpeg"
import TheSangeetSoiree from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg"; //"../../../../shared/assets/images/WeddingPage/TheSangeetSoiree.jpeg"

const TravelTrouser = () => {
  const navigate = useNavigate();

  const categories = [
  { 
    id: "travel-comfort-chino-trouser", 
    name: "Travel Comfort Chino Trouser", 
    image: TheRoyalWeddingEdit, 
    description: "A lightweight chino trouser designed for maximum comfort during travel and long journeys.", 
    // link: "/collection/travel-trousers" 
  },

  { 
    id: "navy-travel-flex-trouser", 
    name: "Navy Travel Flex Trouser", 
    video: TheChurchAffair, 
    description: "A flexible navy trouser combining style and ease for travel days." 
  },

  { 
    id: "black-travel-essentials-trouser", 
    name: "Black Travel Essentials Trouser", 
    image: TheDestinationDream, 
    description: "A sleek black trouser crafted for a minimal and versatile travel wardrobe." 
  },

  { 
    id: "beige-travel-lightweight-trouser", 
    name: "Beige Travel Lightweight Trouser", 
    image: TheRoyalWeddingEdit, 
    description: "A soft beige trouser offering breathability and comfort for outdoor travel." 
  },

  { 
    id: "striped-travel-style-trouser", 
    name: "Striped Travel Style Trouser", 
    video: TheChurchAffair, 
    description: "A stylish striped trouser that adds a playful touch to your travel outfits." 
  },

  { 
    id: "blue-travel-breeze-trouser", 
    name: "Blue Travel Breeze Trouser", 
    image: TheSangeetSoiree, 
    description: "A fresh blue trouser designed to keep you cool and stylish during travel." 
  },

  { 
    id: "brown-travel-comfort-trouser", 
    name: "Brown Travel Comfort Trouser", 
    image: TheRoyalWeddingEdit, 
    description: "A cozy brown trouser perfect for relaxed journeys and everyday travel wear." 
  },

  { 
    id: "check-travel-adventure-trouser", 
    name: "Check Travel Adventure Trouser", 
    video: TheChurchAffair, 
    description: "A check-pattern trouser built for stylish adventures and travel outings." 
  },

  { 
    id: "grey-travel-smart-trouser", 
    name: "Grey Travel Smart Trouser", 
    image: TheDestinationDream, 
    description: "A modern grey trouser combining comfort with a clean and travel-ready look." 
  },
];


  const CategoryCard = ({ cat }) => (
    <div
      className="card border-0 rounded-0 overflow-hidden shadow-sm w-100"
      style={{ cursor: "pointer", transition: "transform 0.4s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
// onClick={() => navigate(`/product/${cat.id}`)}
onClick={() => navigate(`/product/${cat.id}`)}

    >
      <div className="position-relative">
        {cat.video ? (
          <video
            src={cat.video}
            className="w-100"
            style={{ aspectRatio: "421.66 / 527.06", objectFit: "cover" }}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={cat.image}
            alt={cat.name}
            className="w-100"
            style={{ aspectRatio: "421.66 / 527.06", objectFit: "cover" }}
          />
        )}
        <div className="category-overlay">{cat.name}</div>
      </div>
    </div>
    
  );
  return (
    <>

      {/* ===== HERO VIDEO ===== */}
      <section className="position-relative w-100">
        <video
          src={weddingVideo}
          className="w-100"
          style={{ objectFit: "cover", height: "600px" }}
          autoPlay
          loop
          muted
          playsInline
        />
     
         <div className="position-absolute text-white hero-overlay">
          <h1 className="fw-bold display-4 mb-1">Velvet Royal Series</h1>
          <h5 className="fw-normal mb-0">
For the Men Who Wear Royalty, Not Just Suits.
      </h5>
          <button
            className="btn btn-light btn-lg fw-semibold mt-3"
            style={{ borderRadius: "20px", padding: "0.5rem 1.5rem" }}
            onClick={() => {
              const section = document.getElementById("category-grid");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now
          </button>
        </div>
      </section>
      {/* RUNNING TEXT BAR */}
      <div className="bg-light overflow-hidden">
        <div className="d-flex marquee-track py-4">
          {Array(4)
            .fill(["Pick your Handcrafted elegance for unforgettable moments."])
            .flat()
            .map((word, idx) => (
              <span key={idx} className="mx-4 fw-bold text-uppercase">
                {word}
              </span>
            ))}
        </div>
      </div>
  {/* ===== NEW ROW: image â€“ video â€“ image ===== */}
    <section className="container-fluid my-0 px-0">
  <div className="row g-0">
    {/* Left Image */}
    <div className="col-md-4">
      <img
        src={leftImg}
        alt="Left"
        className="img-fluid shadow-sm"
        style={{
          width: "100%",
          height: "520.39px",
          objectFit: "cover",
          borderRadius: "0px",
        }}
      />
    </div>
    {/* Center Video */}
    <div className="col-md-4">
      <video
        src={centerVideo}
        className="w-100 shadow-sm"
        style={{
          height: "520.39px",
          objectFit: "cover",
          borderRadius: "0px",
        }}
        autoPlay
        loop
        muted
        playsInline
        controls 
      />
    </div>

    {/* Right Image */}
    <div className="col-md-4">
      <img
        src={rightImg}
        alt="Right"
        className="img-fluid shadow-sm"
        style={{
          width: "100%",
          height: "520.39px",
          objectFit: "cover",
          borderRadius: "0px",
        }}
      />
    </div>
  </div>
</section>

<div className="row g-0 mt-0 mx-0">
  {/* Left Side: Image Slider */}
  <div className="col-md-6 p-0"> {/* make it 50% width */}
    <div id="sliderCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={sliderImg1}
            className="d-block w-100"
            alt="Slide 1"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={sliderImg2}
            className="d-block w-100"
            alt="Slide 2"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={sliderImg3}
            className="d-block w-100"
            alt="Slide 3"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#sliderCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#sliderCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  {/* Right Side: Description */}
  <div className="col-md-6 d-flex align-items-center p-4">
    <div>
      <h3>Regal Black & Gold Hand-Embroidered Tuxedo</h3>
      <p>
        Command attention with this masterpiece of craftsmanship: a luxurious
        black velvet tuxedo intricately hand-embroidered with golden threadwork
        and shimmering sequins. The blazer features an ornate front design,
        extending seamlessly to an equally detailed back, showcasing royal
        patterns inspired by heritage artistry. Paired with a sleek black shirt,
        bow tie, and trousers, the look is finished with a golden pocket square
        for the perfect touch of elegance.
      </p>
      <p>
        This outfit blends modern tailoring with timeless hand embroidery,
        making it the ideal choice for weddings, receptions, red carpet events,
        and any occasion where sophistication meets grandeur.
      </p>
    </div>
  </div>
</div>
{/* ===== NEW ROW: 75% Video â€“ 25% Image ===== */}
<div className="row g-0 mt-1 mx-0">
  {/* Left Side: Video (75%) */}
  <div className="col-md-9 p-0">
    <video
      src={LabelVideo} 
      className="w-100"
      style={{ height: "500px", objectFit: "cover" }}
      autoPlay
      loop
      muted
      playsInline  
    />
  </div>

  {/* Right Side: Image (25%) */}
  <div className="col-md-3 p-0">
    <img
      src={LabelImage} 
      alt="Right Side"
      className="img-fluid"
      style={{ height: "500px", width: "100%", objectFit: "cover" }}
    />
  </div>
</div>
{/* TEXT BAR WITH CONTINUOUS FADE-IN FADE-OUT */}
<div className="bg-light text-center py-4">
  <span className="fw-bold text-uppercase fs-4 fade-in-out-text">
    The Wedding Suit Collection â€“ Luxury Hand Embroidered
  </span>
</div>

{/* Add this CSS to your WeddingPage.css or SuitsCategoryPage.css */}
<style>
{`
  .fade-in-out-text {
    display: inline-block;
    animation: fadeInOut 7s ease-in-out infinite;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 1; }
    100% { opacity: 0; }
  }
`}
</style>

{/* ===== PRODUCT GRID ===== */}
 {/* CATEGORIES GRID */}
<div id="category-grid" className="container-fluid px-0 my-0">

  {/* Row 1: Image â€“ Video â€“ Image */}
  <div className="row g-2">
    {categories.slice(0, 3).map((cat, i) => (
      <div key={i} className="col-12 col-md-4 d-flex">
        <CategoryCard cat={cat} />
      </div>
    ))}
  </div>

  {/* Row 2: Image â€“ Video â€“ Image */}
  <div className="row g-2 mt-2">
    {categories.slice(3, 6).map((cat, i) => (
      <div key={i + 3} className="col-12 col-md-4 d-flex">
        <CategoryCard cat={cat} />
      </div>
    ))}
  </div>

  {/* Row 3: Image â€“ Video â€“ Image */}
  <div className="row g-2 mt-2">
    {categories.slice(6, 9).map((cat, i) => (
      <div key={i + 6} className="col-12 col-md-4 d-flex">
        <CategoryCard cat={cat} />
      </div>
    ))}
  </div>

</div>


    </>
  );
};

export default TravelTrouser;
