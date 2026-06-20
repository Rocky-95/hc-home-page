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
import vid1 from "../../../../shared/assets/video/WeddingProductVideos/WeddingProductVideo2.mp4";
import img1 from "../../../../shared/assets/images/WeddingSuitProductImages/The Royal Wedding Edit.jpeg";
import img2 from "../../../../shared/assets/images/WeddingSuitProductImages/IMG_1016.jpg";
import img3 from "../../../../shared/assets/images/WeddingSuitProductImages/Sangeet/Sangeet_Main.jpg";

const categories = [
  { id: "slim-fit-grey-suit",       name: "Slim Fit Grey Suit",       image: img1 },
  { id: "checkered-formal-suit",    name: "Checkered Formal Suit",    video: vid1 },
  { id: "dark-brown-business-suit", name: "Dark Brown Business Suit", image: img2 },
  { id: "beige-office-suit",        name: "Beige Office Suit",        image: img1 },
  { id: "midnight-designer-suit",   name: "Midnight Designer Suit",   video: vid1 },
  { id: "navy-business-suit",       name: "Navy Business Suit",       image: img3 },
  { id: "black-formal-suit",        name: "Black Formal Suit",        image: img1 },
  { id: "engagement-suit",          name: "The Engagement Chapter",   video: vid1 },
  { id: "sangeet-suit",             name: "The Sangeet Suit",         image: img2 },
];
const SmartCasualPage = () => (
  <CategoryPageTemplate
    pageTitle="SMART CASUAL"
    heroVideo={weddingVideo}
    heroHeadline="Smart Casual Series"
    heroSubline="Dressed Up, Slightly Relaxed."
    runningText="Modern ease meets sharp tailoring."
    leftImg={leftImg}
    centerVideo={centerVideo}
    rightImg={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    sliderDescription="<h3>Smart Casual Series</h3><p>Dressed Up, Slightly Relaxed.</p>"
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    fadeText="The Smart Casual Suit Collection"
    categories={categories}
    productBasePath="/product"
    categoryPath="/suits"
    categoryLabel="Suits"
  />
);

export default SmartCasualPage;