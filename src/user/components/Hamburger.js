import React, { useState, useEffect } from "react";
import "../styles/Hamburger.css";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import travelImg from "../../shared/assets/images/BabySuits/FirstBirthdayCategory.jpeg";

const Hamburger = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      const hamburger = document.querySelector(".hamburger");

      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        hamburger &&
        !hamburger.contains(event.target)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HAMBURGER ICON */}
      <div
        className={`hamburger ${isActive ? "active" : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${isActive ? "show" : ""}`} id="sidebar">
        <div className="Hdropdown grid-3col">
          
          {/* COLUMN 1 */}
          <div className="Hdropdown-category">
            <strong>CATEGORIES</strong>
            <ul>
              <li><Link to="/suits" onClick={() => setIsActive(false)}>Suits</Link></li>
              <li><Link to="/indo-western" onClick={() => setIsActive(false)}>Indo-Western</Link></li>
              <li><Link to="/shirts" onClick={() => setIsActive(false)}>Shirts</Link></li>
              <li><Link to="/trousers" onClick={() => setIsActive(false)}>Trousers</Link></li>
              <li><Link to="/baby-suits" onClick={() => setIsActive(false)}>Baby Suits</Link></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div className="Hdropdown-category">
            <strong>COLLECTIONS</strong>
            <ul>
              <li><Link to="/tuxedo" onClick={() => setIsActive(false)}>Tuxedo</Link></li>
              <li><Link to="/extreme-poppins" onClick={() => setIsActive(false)}>Extreme Poppins</Link></li>
              <li><Link to="/gurkha-trousers" onClick={() => setIsActive(false)}>Gurkha Trousers</Link></li>
              <li><Link to="/linen-shirts-trousers" onClick={() => setIsActive(false)}>Linen Shirts & Trousers</Link></li>
              <li><Link to="/cigarettes" onClick={() => setIsActive(false)}>88 Cigarettes</Link></li>
            </ul>
          </div>
               {/* COLUMN 3 */}
          <div className="Hdropdown-category">
            <strong>SERVICES</strong>
            <ul>
              <li><Link to="/services" onClick={() => setIsActive(false)}>Embroidery</Link></li>
              <li><Link to="/services" onClick={() => setIsActive(false)}>Alterations</Link></li>
              <li><Link to="/services" onClick={() => setIsActive(false)}>Personal Styling</Link></li>
              <li><Link to="/services" onClick={() => setIsActive(false)}>Custom Tailoring</Link></li>
            </ul>
          </div>
{/* COLUMN 4 — IMAGE + TEXT + BUTTON (DESKTOP ONLY) */}
<div className="Hdropdown-image-box">
  <img src={travelImg} alt="Travel Collection" className="Hdropdown-image" />

  <div className="Hdropdown-overlay">
    <h4>The Vision</h4>
    <button onClick={() => setIsActive(false)}>Shop Now</button>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default Hamburger;
