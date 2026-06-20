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
import img1 from "../../../../shared/assets/images/WeddingSuitProductImages/The Royal Wedding Edit.jpeg";
import img2 from "../../../../shared/assets/images/WeddingSuitProductImages/IMG_1016.jpg";
import img3 from "../../../../shared/assets/images/WeddingSuitProductImages/Sangeet/Sangeet_Main.jpg";
import vid1 from "../../../../shared/assets/video/WeddingProductVideos/WeddingProductVideo2.mp4";

const categories = [
  { id: 1, name: "Collection One",   image: img1 },
  { id: 2, name: "Collection Two",   video: vid1 },
  { id: 3, name: "Collection Three", image: img2 },
  { id: 4, name: "Collection Four",  image: img1 },
  { id: 5, name: "Collection Five",  video: vid1 },
  { id: 6, name: "Collection Six",   image: img3 },
  { id: 7, name: "Collection Seven", image: img1 },
  { id: 8, name: "Collection Eight", video: vid1 },
  { id: 9, name: "Collection Nine",  image: img2 },
];

const WeddingBabySuit = () => (
  <CategoryPageTemplate
    pageTitle="WEDDING"
    heroVideo={weddingVideo}
    heroHeadline="Little Royals Series"
    heroSubline="Dressed for the Most Special Day."
    runningText="Miniature elegance for the littlest guests."
    leftImg={leftImg}
    centerVideo={centerVideo}
    rightImg={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    sliderDescription="<h3>Little Royals Series</h3><p>Dressed for the Most Special Day.</p>"
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    fadeText="The Wedding Baby Suit Collection"
    categories={categories}
    productBasePath="/product"
    categoryPath="/baby-suits"
    categoryLabel="Baby Suits"
  />
);

export default WeddingBabySuit;