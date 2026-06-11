import React, { useRef, useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemWidth = useCallback(() => {
    return isMobile ? window.innerWidth * 0.8 : 720;
  }, [isMobile]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    const itemWidth = getItemWidth();
    const index = Math.round(slider.scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    const itemWidth = getItemWidth();
    sliderRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        .spotlight-slider::-webkit-scrollbar { display: none; }

        .spotlight-item {
          position: relative;
          width: 700px;
          height: 500px;
          margin-right: 7px;
          border-radius: 0;
          overflow: hidden;
          flex-shrink: 0;
        }

        .spotlight-text {
          position: absolute;
          bottom: 70px;
          left: 20px;
          color: white;
          font-size: 60px;
          font-weight: 200;
          font-family: "Playfair Display", serif;
          text-shadow: 0px 4px 12px rgba(0,0,0,0.8);
        }

        .spotlight-button {
          position: absolute;
          bottom: 30px;
          right: 20px;
          font-family: "MainLux", serif;
          padding: 10px 25px;
          font-weight: 530;
          border-radius: 0px;
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .spotlight-item {
            width: 80vw;
            height: 300px;
          }
          .spotlight-text {
            font-size: 22px;
            line-height: 26px;
            left: 10px;
            bottom: 50px;
            max-width: 65vw;
          }
          .spotlight-button {
            bottom: 50px;
            right: 10px;
            font-size: 10px;
            padding: 5px 12px;
          }
          .spotlight-dot {
            width: 6px !important;
            height: 6px !important;
          }
        }

        @media (max-width: 480px) {
          .spotlight-item {
            width: 85vw;
            height: 250px;
          }
          .spotlight-text {
            font-size: 18px;
            bottom: 40px;
          }
          .spotlight-button {
            bottom: 40px;
            font-size: 9px;
            padding: 4px 10px;
          }
        }
      `}</style>

      {/* PARENT WRAPPER (NEEDED FOR DOT POSITIONING) */}
      <div style={{ position: "relative", width: "100%" }}>
        
        {/* SLIDER */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="spotlight-slider"
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
              <div key={i} className="spotlight-item">
                <img
                  src={item.img}
                  alt={item.text}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

              <div className="spotlight-text">{item.text}</div>

<button className="btn btn-light btn-sm spotlight-button">
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
              className="spotlight-dot"
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

