import React, { useEffect, useRef, useState } from "react";
import "../styles/RunningBar.css";
import productService from "../../services/productService";

const DEFAULT_SENTENCES = [
  "Grand Opening Soon in Trichy & Chennai!",
  "Flat 50% off on all men's fashion items!",
  "Free shipping for first-time users!",
];

const RunningBar = () => {
  const [sentences, setSentences] = useState(DEFAULT_SENTENCES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchRunningBar = async () => {
      try {
        const res = await productService.getRunningBarItems();
        const data = res.data?.data || res.data || [];
        const activeItems = data.filter(
          (item) => item.isactive === 1 || item.isactive === true || item.is_active === 1 || item.is_active === true
        );
        const items = activeItems.length > 0 ? activeItems : data;
        if (items.length > 0) {
          setSentences(
            items
              .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
              .map((item) => item.itemsdata || item.text || item.title || item.content || "")
          );
        }
      } catch {
        // keep default sentences on error
      }
    };
    fetchRunningBar();
  }, []);

  useEffect(() => {
    if (!isPaused && sentences.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sentences.length);
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, sentences.length]);

  const showPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + sentences.length) % sentences.length
    );
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sentences.length);
  };

  return (
    <div
      className="running-bar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        type="button"
        className="arrow left"
        onClick={showPrev}
        aria-label="Previous announcement"
      >
        &#10094;
      </button>

      <div className="sentence-wrapper">
        <span
          key={currentIndex}
          className="fly-centered"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {sentences[currentIndex]}
        </span>
      </div>

      <button
        type="button"
        className="arrow right"
        onClick={showNext}
        aria-label="Next announcement"
      >
        &#10095;
      </button>
    </div>
  );
};

export default RunningBar;
