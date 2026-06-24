import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";       
// "../../../../shared/assets/images/HC Black.png";

// category images / video
import weddingImg from "../../../../shared/assets/images/BabySuits/BabySuitsSliderImage1.jpeg"; //"../../../../shared/assets/images/SuitsPage/DesignerNew.jpeg"
import businessVideo from "../../../../shared/assets/video/babySuits/Baby 1st birthday.mp4";  //"../../../../shared/assets/video/suitsPage/BusinessCategory.mp4"
import designerImg from "../../../../shared/assets/images/BabySuits/BabySuitsSliderImage2.jpeg"; //"../../../../shared/assets/images/SuitsPage/WeddingNew.jpeg"
import travelImg from "../../../../shared/assets/images/BabySuits/DadAndSonCategory.jpeg"; //"../../../../shared/assets/images/SuitsPage/TravelNew.jpeg"
import smartCasualImg from "../../../../shared/assets/images/BabySuits/BabySuitsSliderImage3.jpeg"; //"../../../../shared/assets/images/SuitsPage/SmartCasualNew.jpeg"
import suitsPageLabelImg from "../../../../shared/assets/images/BabySuits/FirstBirthdayCategory.jpeg"; //"../../../../shared/assets/images/SuitsPage/LabelNew2.jpeg"
// import "../../../styles/SuitsCategoryPage.css";
import "../../../styles/SuitsCategoryPage.css";

const BabySuitsCategoryPage = () => {
  const navigate = useNavigate();   

  // Added a "link" key so we can navigate on click
const categories = [
  { name: "Wedding",      image: weddingImg,     link: "/collection/wedding-baby" },
  { name: "Business",     video: businessVideo,  link: "/collection/business-baby" },
  { name: "Designer",     image: designerImg,    link: "/collection/designer-baby" },
  { name: "Travel",       image: travelImg,      link: "/collection/travel-baby" },
  { name: "Smart Casual", image: smartCasualImg, link: "/collection/casual-baby" },
];

  // Single category card
  const CategoryCard = ({ cat }) => (
    <div
      className="card border-0 rounded-0 overflow-hidden shadow-sm w-100"
      style={{ cursor: "pointer", transition: "transform 0.4s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={() => cat.link && navigate(cat.link)}      // <-- navigate if link
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
  // parallax scroll for hero image
useEffect(() => {
  const handleScroll = () => {
    const img = document.querySelector(".hero-image"); // âœ… move inside

    if (!img) return; // âœ… safety

    const y = window.scrollY;
    const vh = window.innerHeight;

    if (y < vh) {
      img.style.transform = `translateY(-${y * 0.4}px)`;
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <>

      {/* HERO IMAGE WITH PARALLAX */}
      <section className="hero-scroll position-relative container-fluid px-0">
        <img
          src={suitsPageLabelImg}
          alt="Suits Page Label"
          className="hero-image img-fluid w-100"
        />
        <div className="position-absolute text-white hero-overlay">
          <h1 className="fw-bold display-4 mb-1">Own the Room</h1>
          <h5 className="fw-normal mb-0">
            Power dressing starts with a perfectly tailored suit.
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
            .fill(["WEDDING", "BUSINESS", "DESIGNER", "TRAVEL", "SMARTCASUAL"])
            .flat()
            .map((word, idx) => (
              <span key={idx} className="mx-4 fw-bold text-uppercase">
                {word}
              </span>
            ))}
        </div>
      </div>

      {/* CATEGORIES GRID */}
      <div id="category-grid" className="container-fluid px-0 my-0">
        <div className="row g-2">
          {categories.slice(0, 3).map((cat, i) => (
            <div key={i} className="col-12 col-md-4 d-flex">
              <CategoryCard cat={cat} />
            </div>
          ))}
        </div>
        <div className="row g-2 mt-2">
          {categories.slice(3).map((cat, i) => (
            <div key={i} className="col-12 col-md-6 d-flex">
              <CategoryCard cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BabySuitsCategoryPage;
console.log("BABY SUITS LOADED");