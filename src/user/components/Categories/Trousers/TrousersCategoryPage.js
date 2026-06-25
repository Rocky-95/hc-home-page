import React from "react";
import CategoryPage from "../../CategoryPage";
import weddingImg from "../../../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import businessVideo from "../../../../shared/assets/video/suitsPage/BusinessCategory.mp4";
import designerImg from "../../../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import travelImg from "../../../../shared/assets/images/SuitsPage/TravelNew.jpeg";
import smartCasualImg from "../../../../shared/assets/images/SuitsPage/SmartCasualNew.jpeg";
import labelImg from "../../../../shared/assets/images/SuitsPage/LabelNew1.jpeg";
import "../../../styles/SuitsCategoryPage.css";

const fallbackSubcategories = [
  { name: "Wedding", image: weddingImg, link: "/collection/wedding-trouser" },
  { name: "Business", video: businessVideo, link: "/collection/business-trouser" },
  { name: "Designer", image: designerImg, link: "/collection/designer-trouser" },
  { name: "Travel", image: travelImg, link: "/collection/travel-trouser" },
  { name: "Smart Casual", image: smartCasualImg, link: "/collection/smart-casual-trouser" },
];

const TrousersCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="trousers"
      heroImage={labelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with perfectly tailored trousers."
      marqueeWords={["WEDDING", "BUSINESS", "DESIGNER", "TRAVEL", "SMARTCASUAL"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default TrousersCategoryPage;
