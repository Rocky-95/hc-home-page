import React, { useEffect, useState } from "react";
import "../styles/OfferBar.css";
import logoBlack from "../../shared/assets/images/HC Black.png";
import { safeParse, getSetting, useContentData } from "../../utils/contentHelpers";

const defaultItems = ["Enjoy an Exclusive 50% Privilege on All Orders Today Only !"];

const OfferBar = () => {
  const [items, setItems] = useState(defaultItems);
  const { settings } = useContentData();

  useEffect(() => {
    const raw = getSetting(settings, "home_offer_bar_text") || getSetting(settings, "offer_bar_text");
    const parsed = safeParse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      setItems(parsed);
    } else if (raw) {
      setItems([raw]);
    }
  }, [settings]);

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
