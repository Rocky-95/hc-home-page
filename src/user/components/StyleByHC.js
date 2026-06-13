import React, { useRef, useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import img1 from "../../shared/assets/images/Designer.jpeg";
import img2 from "../../shared/assets/images/Wedding.jpeg";
import img3 from "../../shared/assets/images/SmartCasual.jpeg";

export default function StyleByHC() {
  const items = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
    { img: img3 },
  ].map((item) => ({ ...item, text: "Style By HC" }));

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemWidth = useCallback(() => {
    if (isMobile) {
      return window.innerWidth * 0.92 + 7;
    }
    return 907;
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
        .style-slider::-webkit-scrollbar { display: none; }

        .style-item {
          position: relative;
          width: 900px;
          height: 500px;
          margin-right: 7px;
          border-radius: 0;
          overflow: hidden;
          flex-shrink: 0;
        }

        .style-text {
          position: absolute;
          bottom: 60px;
          left: 20px;
          color: white;
          font-size: 60px;
          font-weight: 200;
          font-family: "Playfair Display", serif;
          text-shadow: 0px 4px 12px rgba(0,0,0,0.8);
        }

        .style-button {
          position: absolute;
          bottom: 80px;
          right: 20px;
          font-family: "MainLux", serif;
          padding: 6px 14px;
          font-weight: 530;
          border-radius: 0px;
        }

        @media (max-width: 768px) {
          .style-item {
            width: 92vw;
            height: 300px;
          }
          .style-text {
            font-size: 22px;
            line-height: 26px;
            left: 10px;
            bottom: 50px;
            max-width: 65vw;
          }
          .style-button {
            bottom: 50px;
            right: 10px;
            font-size: 10px;
            padding: 5px 12px;
          }
          .style-dot {
            width: 6px !important;
            height: 6px !important;
          }
        }

        @media (max-width: 480px) {
          .style-item {
            width: 92vw;
            height: 250px;
          }
          .style-text {
            font-size: 18px;
            bottom: 40px;
          }
          .style-button {
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
          className="style-slider"
          style={{
            whiteSpace: "nowrap",
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div style={{ display: "inline-flex" }}>
            {items.map((item, i) => (
              <div key={i} className="style-item">
                <img
                  src={item.img}
                  alt={item.text}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

              <div className="style-text">{item.text}</div>

<button className="btn btn-light btn-sm style-button">
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
              className="style-dot"
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

