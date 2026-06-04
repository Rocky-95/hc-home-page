import React from "react";
import "../styles/OfferBar.css"; // Create this CSS file for styling
import logoBlack from "../../shared/assets/images/HC Black.png"; // adjust path if needed

const OfferBar = () => {
  const items = [
    "Enjoy an Exclusive 50% Privilege on All Orders Today Only !",

  ];

  return (
    <div className="scrolling-label-wrapper offer-bar">
      {[...Array(3)].map((_, idx) => (
        <div className="scrolling-label" key={idx}>
          {items.map((text, index) => (
            <React.Fragment key={index}>
              <span>{text}</span>
              <img className="offer-img-logo" src={logoBlack} alt="Black" />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OfferBar;
