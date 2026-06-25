import React from "react";
import CategoryPage from "../../CategoryPage";
import weddingImg from "../../../../shared/assets/images/Shirts_new.jpeg";
import businessVideo from "../../../../shared/assets/images/Shirts-Collection.jpeg";
import designerImg from "../../../../shared/assets/images/Shirt2.jpeg";
import travelImg from "../../../../shared/assets/images/Shirts_new.jpeg";
import smartCasualImg from "../../../../shared/assets/images/Shirts-Collection.jpeg";
import labelImg from "../../../../shared/assets/images/Shirts-Collection.jpeg";
import "../../../styles/SuitsCategoryPage.css";

const fallbackSubcategories = [
  { name: "Wedding", image: weddingImg, link: "/collection/wedding-shirts" },
  { name: "Business", video: businessVideo, link: "/collection/business-shirts" },
  { name: "Designer", image: designerImg, link: "/collection/designer-shirts" },
  { name: "Travel", image: travelImg, link: "/collection/travel-shirts" },
  { name: "Smart Casual", image: smartCasualImg, link: "/collection/casual-shirts" },
];

const ShirtsCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="shirts"
      heroImage={labelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with a perfectly tailored shirt."
      marqueeWords={["WEDDING", "BUSINESS", "DESIGNER", "TRAVEL", "SMARTCASUAL"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default ShirtsCategoryPage;
