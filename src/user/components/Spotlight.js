import React, { useRef, useState } from "react";
import useWindowWidth from "../../shared/hooks/useWindowWidth";
import img1 from "../../shared/assets/images/Designer.jpeg";
import img2 from "../../shared/assets/images/Wedding.jpeg";
import img3 from "../../shared/assets/images/SmartCasual.jpeg";
import "../styles/Spotlight.css";

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
    width: isMobile ? "75vw" : "700px",
    height: isMobile ? "300px" : "500px",
    marginRight: "7px",
    borderRadius: "0",
    overflow: "hidden",
    flexShrink: 0,
  };

  const spotlightLabelStyle = {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: isMobile ? "75vw" : "700px",
    padding: isMobile ? "6px 16px" : "8px 24px",
    color: "white",
    fontSize: isMobile ? "24px" : "48px",
    fontWeight: "bold",
    fontFamily: "MAINLUX, Arial, sans-serif",
    textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
    zIndex: 5,
    pointerEvents: "none",
  };

  return (
    <div style={{ position: "relative", width: "100%", height: isMobile ? "300px" : "500px" }}>
      {/* HC Spotlight label — fixed over the section, never scrolls */}
      <div style={spotlightLabelStyle}>
        HC Spotlight
      </div>

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
                alt="HC Spotlight"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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