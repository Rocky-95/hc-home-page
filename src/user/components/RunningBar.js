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
        const res = await productService.getRunningBars();
        const data = res.data?.data || res.data || [];
        if (data.length > 0) {
          setSentences(
            data.map((item) => item.text || item.title || item.content || "")
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
