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
  { id: "midnight-designer-suit", name: "Midnight Designer Suit", image: img1 },
  { id: "royal-wedding-edit",     name: "The Royal Wedding Edit",  video: vid1 },
  { id: "church-affair",          name: "The Church Affair",       image: img2 },
  { id: "destination-dream",      name: "The Destination Dream",   image: img1 },
  { id: "reception-suit",         name: "The Reception Night",     video: vid1 },
  { id: "engagement-suit",        name: "The Engagement Chapter",  image: img3 },
  { id: "sangeet-suit",           name: "The Sangeet Suit",        image: img1 },
  { id: "mehendi-suit",           name: "The Mehendi Suit",        video: vid1 },
  { id: "minimalist-suit",        name: "The Modern Minimalist",   image: img2 },
];
const DesignerPage = () => (
  <CategoryPageTemplate
    pageTitle="DESIGNER"
    heroVideo={weddingVideo}
    heroHeadline="The Designer Series"
    heroSubline="Where Art Meets Tailoring."
    runningText="Handcrafted couture for the visionary."
    leftImg={leftImg}
    centerVideo={centerVideo}
    rightImg={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    sliderDescription="<h3>The Designer Series</h3><p>Where Art Meets Tailoring.</p>"
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    fadeText="The Designer Suit Collection"
    categories={categories}
    productBasePath="/product"
    categoryPath="/suits"
    categoryLabel="Suits"
  />
);

export default DesignerPage;