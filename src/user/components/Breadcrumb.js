import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Breadcrumb.css";

const pathLabels = {
  "": "Home",
  "login": "Login",
  "register": "Register",
  "aboutUs": "About Us",
  "about-designer": "About the Designer",
  "contact-us": "Contact Us",
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
  "FAQs": "FAQs",
  "Policies": "Shipping, Returns & Cancellation",
  "help-center": "Help Center",
  "product": "Product",
  "babysuits": "Baby Suits",
  "suits": "Suits",
  "indowestern": "Indo Western",
  "shirts": "Shirts",
  "trousers": "Trousers",
  "collection": "Collection",
  "wedding": "Wedding",
  "business": "Business",
  "designer": "Designer",
  "travel": "Travel",
  "smart-casual": "Smart Casual",
  "wedding-baby": "Wedding Baby Suit",
  "business-baby": "Business Baby Suit",
  "designer-baby": "Designer Baby Suit",
  "travel-baby": "Travel Baby Suit",
  "casual-baby": "Casual Baby Suit",
  "indo-wedding": "Indo Wedding",
  "indo-business": "Indo Business",
  "indo-designer": "Indo Designer",
  "indo-travel": "Indo Travel",
  "indo-casual": "Indo Casual",
  "wedding-shirts": "Wedding Shirts",
  "business-shirts": "Business Shirts",
  "designer-shirts": "Designer Shirts",
  "travel-shirts": "Travel Shirts",
  "casual-shirts": "Casual Shirts",
  "wedding-trouser": "Wedding Trouser",
  "business-trouser": "Business Trouser",
  "designer-trouser": "Designer Trouser",
  "travel-trouser": "Travel Trouser",
  "smart-casual-trouser": "Smart Casual Trouser",
  "tuxedo": "Tuxedo Collection",
  "extreme-poppins": "Extreme Poppins",
  "gurkha-trousers": "Gurkha Trousers",
  "linen-shirts-trousers": "Linen Collection",
  "cigarettes": "Cigarette Collection",
  "collections": "Collections",
  "services": "Services",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-wrap">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const label = pathLabels[value] || value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <li key={to} className={`breadcrumb-item${isLast ? " active" : ""}`}>
              {isLast ? (
                <span className="breadcrumb-current">{label}</span>
              ) : (
                <Link to={to} className="breadcrumb-link">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
