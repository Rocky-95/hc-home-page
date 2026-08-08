import React from "react";
import CategoryPage from "../../CategoryPage";
import weddingImg from "../../../../shared/assets/images/IndoWestern/WeddingIndoWesternCategory.png";
import businessVideo from "../../../../shared/assets/images/IndoWestern/BusinessIndoWesternCategory.png";
import designerImg from "../../../../shared/assets/images/IndoWestern/DesignerIndoWesternCategory.png";
import travelImg from "../../../../shared/assets/images/IndoWestern/TravelIndoWesternCategory.png";
import smartCasualImg from "../../../../shared/assets/images/IndoWestern/SmartCasualIndoWesternCategory.png";
import labelImg from "../../../../shared/assets/images/IndoWestern/IndoWesternLabelImg.png";
import "../../../styles/SuitsCategoryPage.css";

const fallbackSubcategories = [
  { name: "Wedding", image: weddingImg, link: "/indo-wedding" },
  { name: "Business", video: businessVideo, link: "/indo-business" },
  { name: "Designer", image: designerImg, link: "/indo-designer" },
  { name: "Travel", image: travelImg, link: "/indo-travel" },
  { name: "Smart Casual", image: smartCasualImg, link: "/indo-casual" },
];

const IndoWesternCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="indowestern"
      heroImage={labelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with a perfectly tailored Indo-Western."
      marqueeWords={["WEDDING", "BUSINESS", "DESIGNER", "TRAVEL", "SMARTCASUAL"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default IndoWesternCategoryPage;
