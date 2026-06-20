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
  { id: "royal-wedding-edit",      name: "The Royal Wedding Edit",  image: img1 },
  { id: "destination-dream",       name: "The Destination Dream",   video: vid1 },
  { id: "executive-charcoal-suit", name: "Executive Charcoal Suit", image: img2 },
  { id: "navy-business-suit",      name: "Navy Business Suit",      image: img1 },
  { id: "black-formal-suit",       name: "Black Formal Suit",       video: vid1 },
  { id: "beige-office-suit",       name: "Beige Office Suit",       image: img3 },
  { id: "pinstripe-power-suit",    name: "Pinstripe Power Suit",    image: img1 },
  { id: "light-blue-formal-suit",  name: "Light Blue Formal Suit",  video: vid1 },
  { id: "slim-fit-grey-suit",      name: "Slim Fit Grey Suit",      image: img2 },
];
const TravelPage = () => (
  <CategoryPageTemplate
    pageTitle="TRAVEL"
    heroVideo={weddingVideo}
    heroHeadline="The Travel Edit"
    heroSubline="Style That Moves With You."
    runningText="Light. Wrinkle-resistant. Impeccable."
    leftImg={leftImg}
    centerVideo={centerVideo}
    rightImg={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    sliderDescription="<h3>The Travel Edit</h3><p>Style That Moves With You.</p>"
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    fadeText="The Travel Suit Collection"
    categories={categories}
    productBasePath="/product"
    categoryPath="/suits"
    categoryLabel="Suits"
  />
);

export default TravelPage;