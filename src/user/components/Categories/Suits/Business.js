import React from "react";
import CategoryPageTemplate from "../../../../shared/components/CategoryPageTemplate";
import weddingVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import leftImg from "../../../../shared/assets/images/WeddingPage/WeddingLeftImage.jpeg";
import centerVideo from "../../../../shared/assets/video/WeddingPage/WeddingCenterVideo.mp4";
import rightImg from "../../../../shared/assets/images/WeddingPage/WeddingRightImage.jpeg";
import sliderImg1 from "../../../../shared/assets/images/WeddingPage/Slider/SliderImage1.jpeg";
import sliderImg2 from "../../../../shared/assets/images/WeddingPage/Slider/SliderImage2.jpeg";
import sliderImg3 from "../../../../shared/assets/images/WeddingPage/Slider/SliderImage3.jpeg";
import LabelVideo from "../../../../shared/assets/video/WeddingPage/WeddingLabelVideo.mp4";
import LabelImage from "../../../../shared/assets/images/WeddingPage/LabelImage.jpeg";
import TheChurchAffair from "../../../../shared/assets/video/WeddingProductVideos/WeddingProductVideo2.mp4";
import TheRoyalWeddingEdit from "../../../../shared/assets/images/WeddingSuitProductImages/The Royal Wedding Edit.jpeg";
import TheDestinationDream from "../../../../shared/assets/images/WeddingSuitProductImages/IMG_1016.jpg";
import TheSangeetSoiree from "../../../../shared/assets/images/WeddingSuitProductImages/Sangeet/Sangeet_Main.jpg";

const categories = [
  { id: 1, name: "The Classic Boardroom", image: TheRoyalWeddingEdit },
  { id: 2, name: "The Executive Edge", video: TheChurchAffair },
  { id: 3, name: "The Corporate Prestige", image: TheDestinationDream },
  { id: 4, name: "The Power Meeting", image: TheRoyalWeddingEdit },
  { id: 5, name: "The Conference Series", video: TheChurchAffair },
  { id: 6, name: "The Founder's Cut", image: TheSangeetSoiree },
  { id: 7, name: "The Diplomat", image: TheRoyalWeddingEdit },
  { id: 8, name: "The Summit Edit", video: TheChurchAffair },
  { id: 9, name: "The Minimalist CEO", image: TheDestinationDream },
];

const BusinessPage = () => (
  <CategoryPageTemplate
    pageTitle="BUSINESS"
    heroVideo={weddingVideo}
    heroHeadline="Power Dressing Series"
    heroSubline="For the Men Who Command Every Room They Enter."
    runningText="Crafted for boardrooms, handcrafted for legacy."
    leftImg={leftImg}
    centerVideo={centerVideo}
    rightImg={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    sliderDescription="<h3>The Executive Collection</h3><p>Precision-cut business suits crafted for authority. Each piece is tailored with premium fabrics designed to project confidence from the first handshake.</p>"
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    fadeText="The Business Suit Collection â€“ Tailored for Authority"
    categories={categories}
    productBasePath="/product"
  />
);

export default BusinessPage;
