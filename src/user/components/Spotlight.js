import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../shared/hooks/useWindowWidth";
import { useContentData, getSetting } from "../../utils/contentHelpers";
import img1 from "../../shared/assets/images/Designer.jpeg";
import img2 from "../../shared/assets/images/Wedding.jpeg";
import img3 from "../../shared/assets/images/SmartCasual.jpeg";
import "../styles/Spotlight.css";
import productService from "../../services/productService";

const defaultItems = [
  { img: img1 },
  { img: img2 },
  { img: img3 },
  { img: img3 },
  { img: img3 },
  { img: img3 },
  { img: img3 },
  { img: img3 },
].map((item) => ({ ...item, text: "HC Spotlight" }));

export default function Spotlight() {
  const navigate = useNavigate();
  const [items, setItems] = useState(defaultItems);
  const windowWidth = useWindowWidth();
  const { settings } = useContentData();
  const sectionTitle = getSetting(settings, "home_spotlight_title") || "HC Spotlight";

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const [entriesRes, mediaRes] = await Promise.all([
          productService.getSpotlightEntries(),
          productService.getSpotlightMedia(),
        ]);
        const entries = entriesRes.data?.data || entriesRes.data || [];
        const media = mediaRes.data?.data || mediaRes.data || [];
        if (entries.length > 0 || media.length > 0) {
          const mapped = media.length > 0
            ? media.map((m) => ({
                img: m.media_url || m.image_url || img1,
                text: m.alt_text || "HC Spotlight",
                link: m.redirect_link || null,
              }))
            : entries.map((e) => ({
                img: e.image_url || e.media_url || img1,
                text: e.title || "HC Spotlight",
                link: e.redirect_link || null,
              }));
          setItems(mapped.length > 0 ? mapped : defaultItems);
        }
      } catch {
        // keep defaults
      }
    };
    fetchSpotlight();
  }, []);
  const isMobile = windowWidth <= 768;
  const sliderRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const itemWidthPx = isMobile ? windowWidth * 0.75 : 700;
  const gapPx = 7;
  const stepPx = itemWidthPx + gapPx;

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const index = Math.round(slider.scrollLeft / stepPx);
    setActiveIndex(((index % items.length) + items.length) % items.length);
  };

  const goToSlide = useCallback((index) => {
    if (!sliderRef.current) return;
    isProgrammaticScroll.current = true;
    sliderRef.current.scrollTo({
      left: index * stepPx,
      behavior: "smooth",
    });
    window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 650);
  }, [stepPx]);

  // Left-to-right infinite auto-scroll: move forward through items
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  useEffect(() => {
    goToSlide(activeIndex);
  }, [activeIndex, goToSlide]);

  const itemStyle = {
    position: "relative",
    width: isMobile ? "75vw" : "700px",
    height: isMobile ? "300px" : "500px",
    marginRight: `${gapPx}px`,
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
        {sectionTitle}
      </div>

      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="hc-slider"
      >
        <div style={{ display: "inline-flex" }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{ ...itemStyle, cursor: "pointer" }}
              onClick={() => navigate(item.link || "/hc-spotlight")}
            >
              <img
                src={item.img}
                alt="HC Spotlight"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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