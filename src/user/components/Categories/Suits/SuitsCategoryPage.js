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
  { name: "Wedding", image: weddingImg, link: "/wedding" },
  { name: "Business", video: businessVideo, link: "/business" },
  { name: "Designer", image: designerImg, link: "/designer" },
  { name: "Travel", image: travelImg, link: "/travel" },
  { name: "Smart Casual", image: smartCasualImg, link: "/smart-casual" },
];

const SuitsCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="suits"
      heroImage={suitsPageLabelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with a perfectly tailored suit."
      marqueeWords={["Wedding", "Business", "Designer", "Travel", "Smart casual"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default SuitsCategoryPage;
