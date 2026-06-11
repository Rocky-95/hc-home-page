import React, { useState, useEffect, useRef } from "react";
import "../styles/RunningBar.css"; 

const SENTENCES = [
  "🔥 Grand Opening Soon in Trichy & Chennai!",
  "💥 Flat 50% off on all men's fashion items!",
  "🚚 Free shipping for first-time users!"
];

const RunningBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto rotate sentences
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % SENTENCES.length);
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SENTENCES.length) % SENTENCES.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SENTENCES.length);
  };

  return (
    <div
      className="running-bar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="arrow left" onClick={showPrev}>
        &#10094;
      </div>

      <div className="sentence-wrapper">
        <span
          key={currentIndex}
          className="fly-centered"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {SENTENCES[currentIndex]}
        </span>
      </div>

      <div className="arrow right" onClick={showNext}>
        &#10095;
      </div>
    </div>
  );
};

export default RunningBar;
