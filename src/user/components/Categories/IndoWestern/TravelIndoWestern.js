import React from "react";
import SubcategoryPage from "../../SubcategoryPage";
import weddingVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import leftImg from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import centerVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import rightImg from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";
import sliderImg1 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import sliderImg2 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";
import sliderImg3 from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import LabelVideo from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import LabelImage from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import TheChurchAffair from "../../../../shared/assets/video/WeddingPage/WeddingPageVideo.mp4";
import TheRoyalWeddingEdit from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";
import TheDestinationDream from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft2.jpg";
import TheSangeetSoiree from "../../../../shared/assets/images/ProductDetail/SangeetCreamLeft1.jpg";

const fallbackCategories = [
  { id: "indo-travel-comfort-set", name: "Indo Travel Comfort Set", image: TheRoyalWeddingEdit, description: "A relaxed Indo-Western outfit designed for maximum comfort during travel and long journeys." },
  { id: "indo-navy-travel-style", name: "Indo Navy Travel Style", video: TheChurchAffair, description: "A smart navy Indo-Western outfit combining style and ease for travel days." },
  { id: "indo-black-travel-edit", name: "Indo Black Travel Edit", image: TheDestinationDream, description: "A sleek black Indo-Western ensemble crafted for a clean and minimal travel look." },
  { id: "indo-beige-travel-set", name: "Indo Beige Travel Set", image: TheRoyalWeddingEdit, description: "A lightweight beige Indo-Western outfit offering comfort and flexibility on the go." },
  { id: "indo-striped-travel-style", name: "Indo Striped Travel Style", video: TheChurchAffair, description: "A trendy striped Indo-Western outfit adding a playful vibe to your travel wardrobe." },
  { id: "indo-blue-travel-look", name: "Indo Blue Travel Look", image: TheSangeetSoiree, description: "A fresh blue Indo-Western outfit designed for active and stylish travel moments." },
  { id: "indo-brown-travel-comfort", name: "Indo Brown Travel Comfort", image: TheRoyalWeddingEdit, description: "A cozy brown Indo-Western outfit perfect for relaxed journeys and everyday travel wear." },
  { id: "indo-check-travel-style", name: "Indo Check Travel Style", video: TheChurchAffair, description: "A stylish check-pattern Indo-Western outfit ideal for a modern and comfortable travel look." },
  { id: "indo-grey-travel-fit", name: "Indo Grey Travel Fit", image: TheDestinationDream, description: "A modern grey Indo-Western outfit offering a perfect blend of comfort and travel-ready style." },
];

const TravelIndoWestern = () => (
  <SubcategoryPage
    slug="indowestern-travel"
    heroVideo={weddingVideo}
    heroTitle="Velvet Royal Series"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Pick your Handcrafted elegance for unforgettable moments."]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="Regal Black & Gold Hand-Embroidered Tuxedo"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Wedding Suit Collection – Luxury Hand Embroidered"
    fallbackCategories={fallbackCategories}
    productKeywords={["indowestern", "indo-western", "travel"]}
    productGridKeyword=""
  />
);

export default TravelIndoWestern;
