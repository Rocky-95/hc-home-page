import React from "react";
import CategoryPage from "../../CategoryPage";
import weddingImg from "../../../../shared/assets/images/SuitsPage/WeddingNew.jpeg";
import businessVideo from "../../../../shared/assets/video/suitsPage/BusinessCategory.mp4";
import designerImg from "../../../../shared/assets/images/SuitsPage/DesignerNew.jpeg";
import labelImg from "../../../../shared/assets/images/SuitsPage/LabelNew2.jpeg";
import "../../../styles/SuitsCategoryPage.css";

const fallbackSubcategories = [
  { name: "Formal", image: weddingImg, link: "/coming-soon" },
  { name: "Casual", video: businessVideo, link: "/smart-casual-trouser" },
  { name: "Designer", image: designerImg, link: "/designer-trouser" },
];

const TrousersCategoryPage = () => {

  return (
    <CategoryPage
      categorySlug="trousers"
      heroImage={labelImg}
      heroTitle="Own the Room"
      heroSubtitle="Power dressing starts with perfectly tailored trousers."
      marqueeWords={["Formal", "Casual", "Designer"]}
      fallbackSubcategories={fallbackSubcategories}
    />
  );
};

export default TrousersCategoryPage;
