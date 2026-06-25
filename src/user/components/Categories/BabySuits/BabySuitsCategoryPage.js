import React from "react";
import CategoryPage from "../../CategoryPage";
import weddingImg from "../../../../shared/assets/images/BabySuits/BabySuitsSliderImage1.jpeg";
import businessVideo from "../../../../shared/assets/video/babySuits/Baby 1st birthday.mp4";
import designerImg from "../../../../shared/assets/images/BabySuits/BabySuitsSliderImage2.jpeg";
import travelImg from "../../../../shared/assets/images/BabySuits/DadAndSonCategory.jpeg";
import smartCasualImg from "../../../../shared/assets/images/BabySuits/BabySuitsSliderImage3.jpeg";
import labelImg from "../../../../shared/assets/images/BabySuits/FirstBirthdayCategory.jpeg";
import "../../../styles/SuitsCategoryPage.css";

const fallbackSubcategories = [
  { name: "Wedding", image: weddingImg, link: "/collection/wedding-baby" },
  { name: "Business", video: businessVideo, link: "/collection/business-baby" },
  { name: "Designer", image: designerImg, link: "/collection/designer-baby" },
  { name: "Travel", image: travelImg, link: "/collection/travel-baby" },
  { name: "Smart Casual", image: smartCasualImg, link: "/collection/casual-baby" },
];

const BabySuitsCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="baby-suits"
      heroImage={labelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with perfectly tailored baby suits."
      marqueeWords={["WEDDING", "BUSINESS", "DESIGNER", "TRAVEL", "SMARTCASUAL"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default BabySuitsCategoryPage;