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
  { name: "Wedding Indo Western", image: weddingImg, link: "/indo-wedding" },
  { name: "Designer IW", video: businessVideo, link: "/indo-designer" },
  { name: "Wedding Guest IW", image: designerImg, link: "/coming-soon" },
  { name: "Haldi IW", image: travelImg, link: "/coming-soon" },
  { name: "Sangeet IW", image: smartCasualImg, link: "/coming-soon" },
];

const IndoWesternCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="indowestern"
      heroImage={labelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with a perfectly tailored Indo-Western."
      marqueeWords={["Wedding Indo Western", "Designer IW", "Wedding Guest IW", "Haldi IW", "Sangeet IW"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default IndoWesternCategoryPage;
