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
  { id: "royal-wedding-edit",  name: "The Royal Wedding Edit",   image: TheRoyalWeddingEdit },
  { id: "church-affair",       name: "The Church Affair",        video: TheChurchAffair },
  { id: "destination-dream",   name: "The Destination Dream",    image: TheDestinationDream },
  { id: "reception-suit",      name: "The Reception Night",      image: TheRoyalWeddingEdit },
  { id: "engagement-suit",     name: "The Engagement Chapter",   video: TheChurchAffair },
  { id: "sangeet-suit",        name: "The Sangeet Soirée",       image: TheSangeetSoiree },
  { id: "mehendi-suit",        name: "The Mehendi & Haldi Mood", image: TheRoyalWeddingEdit },
  { id: "intimate-suit",       name: "The Intimate Wedding Edit",video: TheChurchAffair },
  { id: "minimalist-suit",     name: "The Modern Minimalist",    image: TheDestinationDream },
];

const WeddingPage = () => (
  <CategoryPageTemplate
    pageTitle="WEDDING"
    heroVideo={weddingVideo}
    heroHeadline="Velvet Royal Series"
    heroSubline="For the Men Who Wear Royalty, Not Just Suits."
    runningText="Pick your Handcrafted elegance for unforgettable moments."
    leftImg={leftImg}
    centerVideo={centerVideo}
    rightImg={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    sliderDescription="<h3>Regal Black &amp; Gold Hand-Embroidered Tuxedo</h3><p>Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins.</p>"
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    fadeText="The Wedding Suit Collection – Luxury Hand Embroidered"
    categories={categories}
    productBasePath="/product"
    categoryPath="/suits"
    categoryLabel="Suits"
  />
);

export default WeddingPage;
