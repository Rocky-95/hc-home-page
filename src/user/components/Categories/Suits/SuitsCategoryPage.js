import React from "react";
import CategoryPage from "../../CategoryPage";
import weddingImg from "../../../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import businessVideo from "../../../../shared/assets/video/suitsPage/BusinessCategory.mp4";
import designerImg from "../../../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import travelImg from "../../../../shared/assets/images/ProductDetail/SangeetBlack.jpg";
import smartCasualImg from "../../../../shared/assets/images/SuitsPage/SmartCasualNew.jpeg";
import suitsPageLabelImg from "../../../../shared/assets/images/SuitsPage/LabelNew2.jpeg";

import "../../../styles/SuitsCategoryPage.css";

const fallbackSubcategories = [
  { name: "Wedding", image: weddingImg, link: "/collection/wedding" },
  { name: "Business", video: businessVideo, link: "/collection/business" },
  { name: "Designer", image: designerImg, link: "/collection/designer" },
  { name: "Travel", image: travelImg, link: "/collection/travel" },
  { name: "Smart Casual", image: smartCasualImg, link: "/collection/smart-casual" },
];

const SuitsCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="suits"
      heroImage={suitsPageLabelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with a perfectly tailored suit."
      marqueeWords={["WEDDING", "BUSINESS", "DESIGNER", "TRAVEL", "SMARTCASUAL"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default SuitsCategoryPage;
