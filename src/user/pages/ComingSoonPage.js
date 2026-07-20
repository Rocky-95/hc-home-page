import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ComingSoonPage.css";
import logo from "../../shared/assets/images/HC Black.png";

const ComingSoonPage = ({ title = "Coming Soon", message }) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coming-soon-page d-flex flex-column align-items-center justify-content-center text-center px-3">
      <div className="coming-soon-content">
        <img src={logo} alt="Harry Clinton" className="coming-soon-logo mb-4" />
        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-message">
          {message || "We are crafting something extraordinary for you. Stay tuned for the reveal."}
          <span className="coming-soon-dots">{dots}</span>
        </p>
        <Link to="/" className="coming-soon-btn">
          Back to Home
        </Link>
      </div>
      <div className="coming-soon-marquee">
        <div className="coming-soon-track">
          {Array(4).fill(["HARRY CLINTON", "·", "COMING SOON", "·", "CRAFTED FOR YOU", "·"]).flat().map((word, i) => (
            <span key={i} className={word === "·" ? "coming-soon-dot" : "coming-soon-word"}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
