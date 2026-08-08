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
  { name: "Formal", image: weddingImg, link: "/coming-soon" },
  { name: "Casual", video: businessVideo, link: "/casual-shirts" },
  { name: "Designer", image: designerImg, link: "/designer-shirts" },
  { name: "Ceremonial", image: travelImg, link: "/coming-soon" },
  { name: "Business", image: smartCasualImg, link: "/business-shirts" },
];

const ShirtsCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="shirts"
      heroImage={labelImg}
      heroTitle="New Arrivals"
      heroSubtitle="Power dressing starts with a perfectly tailored shirt."
      marqueeWords={["Formal", "Casual", "Designer", "Ceremonial", "Business"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default ShirtsCategoryPage;
