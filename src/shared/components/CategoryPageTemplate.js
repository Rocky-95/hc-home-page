import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/images/HC Black.png";
import "../../user/styles/CategoryPageTemplate.css";

const CategoryCard = ({ cat, onNavigate }) => (
  <div
    className="card border-0 rounded-0 overflow-hidden shadow-sm w-100"
    style={{ cursor: "pointer", transition: "transform 0.4s ease" }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    onClick={() => onNavigate(cat.id)}
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

const CategoryPageTemplate = ({
  pageTitle,
  heroVideo,
  heroHeadline,
  heroSubline,
  runningText,
  leftImg,
  centerVideo,
  rightImg,
  sliderImages,
  sliderDescription,
  labelVideo,
  labelImage,
  fadeText,
  categories,
  productBasePath,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => navigate(`${productBasePath}/${id}`);

  return (
    <>
      {/* HEADER */}
      <header
        className="container-fluid bg-white border-bottom py-2 sticky-top"
        style={{ zIndex: 1000 }}
      >
        <div className="d-flex justify-content-between align-items-center px-3">
          <div
            className="d-flex align-items-center gap-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="img-fluid" style={{ height: "40px" }} />
          </div>
          <h1 className="h5 mb-0 text-dark text-center flex-grow-1">
            {pageTitle}
          </h1>
          <FaShoppingCart
            className="fs-4 text-dark"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          />
        </div>
      </header>

      {/* HERO VIDEO */}
      <section className="position-relative w-100">
        <video
          src={heroVideo}
          className="w-100"
          style={{ objectFit: "cover", height: "600px" }}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="position-absolute text-white hero-overlay">
          <h1 className="fw-bold display-4 mb-1">{heroHeadline}</h1>
          <h5 className="fw-normal mb-0">{heroSubline}</h5>
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
            .fill([runningText])
            .flat()
            .map((word, idx) => (
              <span key={idx} className="mx-4 fw-bold text-uppercase">
                {word}
              </span>
            ))}
        </div>
      </div>

      {/* IMAGE – VIDEO – IMAGE ROW */}
      <section className="container-fluid my-0 px-0">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={leftImg}
              alt=""
              className="img-fluid shadow-sm"
              style={{ width: "100%", height: "520.39px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-4">
            <video
              src={centerVideo}
              className="w-100 shadow-sm"
              style={{ height: "520.39px", objectFit: "cover" }}
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
          <div className="col-md-4">
            <img
              src={rightImg}
              alt=""
              className="img-fluid shadow-sm"
              style={{ width: "100%", height: "520.39px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* SLIDER + DESCRIPTION */}
      <div className="row g-0 mt-0 mx-0">
        <div className="col-md-6 p-0">
          <div id="sliderCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {sliderImages.map((src, idx) => (
                <div key={idx} className={`carousel-item${idx === 0 ? " active" : ""}`}>
                  <img
                    src={src}
                    className="d-block w-100"
                    alt={`Slide ${idx + 1}`}
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
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
        <div className="col-md-6 d-flex align-items-center p-4">
          <div dangerouslySetInnerHTML={{ __html: sliderDescription }} />
        </div>
      </div>

      {/* 75% VIDEO – 25% IMAGE */}
      <div className="row g-0 mt-1 mx-0">
        <div className="col-md-9 p-0">
          <video
            src={labelVideo}
            className="w-100"
            style={{ height: "500px", objectFit: "cover" }}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className="col-md-3 p-0">
          <img
            src={labelImage}
            alt=""
            className="img-fluid"
            style={{ height: "500px", width: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* FADE TEXT BAR */}
      <div className="bg-light text-center py-4">
        <span className="fw-bold text-uppercase fs-4 fade-in-out-text">
          {fadeText}
        </span>
      </div>

      {/* PRODUCT GRID */}
      <div id="category-grid" className="container-fluid px-0 my-0">
        {[0, 3, 6].map((start) => (
          <div key={start} className={`row g-2${start > 0 ? " mt-2" : ""}`}>
            {categories.slice(start, start + 3).map((cat) => (
              <div key={cat.id} className="col-12 col-md-4 d-flex">
                <CategoryCard cat={cat} onNavigate={handleNavigate} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryPageTemplate;
