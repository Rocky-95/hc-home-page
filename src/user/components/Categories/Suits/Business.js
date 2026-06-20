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
  { id: "executive-charcoal-suit",  name: "Executive Charcoal Suit",  image: TheRoyalWeddingEdit },
  { id: "navy-business-suit",       name: "Navy Business Suit",        video: TheChurchAffair },
  { id: "black-formal-suit",        name: "Black Formal Suit",         image: TheDestinationDream },
  { id: "beige-office-suit",        name: "Beige Office Suit",         image: TheRoyalWeddingEdit },
  { id: "pinstripe-power-suit",     name: "Pinstripe Power Suit",      video: TheChurchAffair },
  { id: "light-blue-formal-suit",   name: "Light Blue Formal Suit",    image: TheSangeetSoiree },
  { id: "dark-brown-business-suit", name: "Dark Brown Business Suit",  image: TheRoyalWeddingEdit },
  { id: "checkered-formal-suit",    name: "Checkered Formal Suit",     video: TheChurchAffair },
  { id: "slim-fit-grey-suit",       name: "Slim Fit Grey Suit",        image: TheDestinationDream },
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
    fadeText="The Business Suit Collection - Tailored for Authority"
    categories={categories}
    productBasePath="/product"
    categoryPath="/suits"
    categoryLabel="Suits"
  />
);

export default BusinessPage;