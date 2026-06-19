import React, { useRef, useState } from "react";
import useWindowWidth from "../../shared/hooks/useWindowWidth";
import "../styles/StyleByHC.css";

import img1 from "../../shared/assets/images/Designer.jpeg";
import img2 from "../../shared/assets/images/Wedding.jpeg";
import img3 from "../../shared/assets/images/SmartCasual.jpeg";

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

export default function StyleByHC() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 768;
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;
    const itemWidth = isMobile ? windowWidth : 720;
    const index = Math.round(slider.scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  const goToSlide = (index) => {
    const itemWidth = isMobile ? windowWidth : 720;
    sliderRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  const itemStyle = {
    position: "relative",
    width: isMobile ? "95vw" : "900px",
    height: isMobile ? "300px" : "500px",
    marginRight: "7px",
    borderRadius: "0",
    overflow: "hidden",
    flexShrink: 0,
  };

  const textStyle = {
    position: "absolute",
    bottom: "60px",
    left: "20px",
    color: "white",
    fontSize: isMobile ? "28px" : "60px",
    fontWeight: "200",
    fontFamily: "MAINLUX, Arial, sans-serif",
    textShadow: "0px 4px 12px rgba(0,0,0,0.8)",
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="hc-slider"
      >
        <div style={{ display: "inline-flex" }}>
          {items.map((item, i) => (
            <div key={i} style={itemStyle}>
              <img
                src={item.img}
                alt={item.text}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={textStyle} className="hc-text">{item.text}</div>
              <button className="btn btn-light btn-sm hc-button">
                Discover the collection &nbsp; &rsaquo;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="hc-slider-dots">
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
          />
        ))}
      </div>
    </div>
  );
}