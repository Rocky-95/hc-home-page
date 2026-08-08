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
  { name: "Baby First Birthday Suits", video: businessVideo, link: "/coming-soon" },
  { name: "Baptism & Christening Suits", image: designerImg, link: "/coming-soon" },
  { name: "Wedding & Ring Bearer Suits", image: weddingImg, link: "/wedding-baby" },
  { name: "Family Photoshoot Suits", image: travelImg, link: "/coming-soon" },
  { name: "Formal & Party Wear Suits", image: smartCasualImg, link: "/coming-soon" },
];

const BabySuitsCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="babysuits"
      heroImage={labelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with perfectly tailored baby suits."
      marqueeWords={["Baby First Birthday Suits", "Baptism & Christening Suits", "Wedding & Ring Bearer Suits", "Family Photoshoot Suits", "Formal & Party Wear Suits"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default BabySuitsCategoryPage;