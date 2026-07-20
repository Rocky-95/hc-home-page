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
  { id: "travel-comfort-chino-trouser", name: "Travel Comfort Chino Trouser", image: TheRoyalWeddingEdit, description: "A lightweight chino trouser designed for maximum comfort during travel and long journeys." },
  { id: "navy-travel-flex-trouser", name: "Navy Travel Flex Trouser", video: TheChurchAffair, description: "A flexible navy trouser combining style and ease for travel days." },
  { id: "black-travel-essentials-trouser", name: "Black Travel Essentials Trouser", image: TheDestinationDream, description: "A sleek black trouser crafted for a minimal and versatile travel wardrobe." },
  { id: "beige-travel-lightweight-trouser", name: "Beige Travel Lightweight Trouser", image: TheRoyalWeddingEdit, description: "A soft beige trouser offering breathability and comfort for outdoor travel." },
  { id: "striped-travel-style-trouser", name: "Striped Travel Style Trouser", video: TheChurchAffair, description: "A stylish striped trouser that adds a playful touch to your travel outfits." },
  { id: "blue-travel-breeze-trouser", name: "Blue Travel Breeze Trouser", image: TheSangeetSoiree, description: "A fresh blue trouser designed to keep you cool and stylish during travel." },
  { id: "brown-travel-comfort-trouser", name: "Brown Travel Comfort Trouser", image: TheRoyalWeddingEdit, description: "A cozy brown trouser perfect for relaxed journeys and everyday travel wear." },
  { id: "check-travel-adventure-trouser", name: "Check Travel Adventure Trouser", video: TheChurchAffair, description: "A check-pattern trouser built for stylish adventures and travel outings." },
  { id: "grey-travel-smart-trouser", name: "Grey Travel Smart Trouser", image: TheDestinationDream, description: "A modern grey trouser combining comfort with a clean and travel-ready look." },
];

const TravelTrouser = () => (
  <SubcategoryPage
    slug="trousers-travel"
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
    productKeywords={["trouser", "travel"]}
    productGridKeyword=""
  />
);

export default TravelTrouser;
