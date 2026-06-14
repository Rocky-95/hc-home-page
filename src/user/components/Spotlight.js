import React, { useRef, useState } from "react";


import img1 from "../../shared/assets/images/Designer.jpeg";
import img2 from "../../shared/assets/images/Wedding.jpeg";
import img3 from "../../shared/assets/images/SmartCasual.jpeg";
export default function Spotlight() {
  const items = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
  ].map((item) => ({ ...item, text: "HC Spotlight" }));

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;
    const itemWidth = window.innerWidth <= 768 ? window.innerWidth : 720;
    const index = Math.round(slider.scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    const itemWidth = window.innerWidth <= 768 ? window.innerWidth : 720;
    sliderRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  const isMobile = window.innerWidth <= 768;

  const itemStyle = {
    position: "relative",
    width: isMobile ? "75vw" : "700px",
    height: isMobile ? "300px" : "500px",
    marginRight: isMobile ? "7px" : "7px",
    borderRadius: "0",
    overflow: "hidden",
    flexShrink: 0,
  };

const textStyle = {
  position: "absolute",
  bottom: "70px",
  left: "20px",
  color: "white",
  fontSize: isMobile ? "28px" : "60px",   // BIG TEXT
  fontWeight: "200",
fontFamily: "Playfair Display, serif",
  textShadow: "0px 4px 12px rgba(0,0,0,0.8)",
};


  return (
    <>
      <style>{`
        div::-webkit-scrollbar { display:none; }

        @media (max-width: 768px) {
          .dot {
            width: 6px !important;
            height: 6px !important;
            margin: 1px !important;
          }
        }

          /* MOBILE ONLY for Running slide */
@media (max-width: 768px) {
  .hc-text {
    font-size: 22px !important;
    line-height: 26px !important;
    left: 10px !important;
    bottom: 50px !important;
    max-width: 65vw !important;
  }

  .hc-button {
    bottom: 50px !important;
    right: 10px !important;
    font-size: 10px !important;
    padding: 5px 12px !important;
  }
}

      `}</style>

      {/* PARENT WRAPPER (NEEDED FOR DOT POSITIONING) */}
      <div style={{ position: "relative", width: "100%",}}>
        
        {/* SLIDER */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          style={{
            whiteSpace: "nowrap",
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            borderBottom: "10px solid white",
            borderTop: "10px solid white",
            borderLeft: "10px solid white",
          }}
        >
          <div style={{ display: "inline-flex" }}>
            {items.map((item, i) => (
              <div key={i} style={itemStyle}>
                <img
                  src={item.img}
                  alt={item.text}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

              <div style={textStyle} className="hc-text">{item.text}</div>

<button
  className="btn btn-light btn-sm hc-button"
  style={{
    position: "absolute",
    bottom: "30px",
    right: "20px",
    fontFamily: "MainLux, serif",
    padding: "10px 25px",
    fontWeight: "530",
    borderRadius: "0px",
    fontSize: "20px", 
  }}
>
 Discover the collection &nbsp; ›
 </button>

              </div>
            ))}
          </div>
        </div>

        {/* DOTS INSIDE SLIDER */}
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "6px 12px",
            borderRadius: "20px",
            display: "flex",
            gap: "8px",
          }}
        >
          {items.map((_, i) => (
            <span
              key={i}
              onClick={() => goToSlide(i)}
              className="dot"
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: activeIndex === i ? "white" : "#bbb",
                cursor: "pointer",
                transition: "0.3s",
              }}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
}

