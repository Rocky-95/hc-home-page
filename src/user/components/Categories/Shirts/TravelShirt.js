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
  { id: "lightweight-travel-shirt", name: "Lightweight Travel Shirt", image: TheRoyalWeddingEdit, description: "A breathable lightweight shirt designed for maximum comfort during travel and long journeys." },
  { id: "navy-travel-comfort-shirt", name: "Navy Travel Comfort Shirt", video: TheChurchAffair, description: "A relaxed navy shirt combining smart style with all-day travel comfort." },
  { id: "black-travel-essentials-shirt", name: "Black Travel Essentials Shirt", image: TheDestinationDream, description: "A sleek black shirt crafted for a minimal and versatile travel wardrobe." },
  { id: "beige-travel-flex-shirt", name: "Beige Travel Flex Shirt", image: TheRoyalWeddingEdit, description: "A soft beige shirt offering flexibility and ease for outdoor travel and trips." },
  { id: "striped-travel-style-shirt", name: "Striped Travel Style Shirt", video: TheChurchAffair, description: "A stylish striped shirt that adds a playful vibe to your travel outfits." },
  { id: "blue-travel-breeze-shirt", name: "Blue Travel Breeze Shirt", image: TheSangeetSoiree, description: "A fresh blue shirt designed to keep you cool and stylish during travel." },
  { id: "brown-travel-comfort-shirt", name: "Brown Travel Comfort Shirt", image: TheRoyalWeddingEdit, description: "A cozy brown shirt perfect for relaxed journeys and everyday travel wear." },
  { id: "check-travel-adventure-shirt", name: "Check Travel Adventure Shirt", video: TheChurchAffair, description: "A check-pattern shirt built for stylish adventures and travel outings." },
  { id: "grey-travel-smart-shirt", name: "Grey Travel Smart Shirt", image: TheDestinationDream, description: "A modern grey shirt combining comfort with a clean and travel-ready look." },
];

const TravelShirt = () => (
  <SubcategoryPage
    slug="shirts-travel"
    heroVideo={weddingVideo}
    heroTitle="Travel Shirts"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Travel Shirts"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Travel Shirts Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Travel Shirts Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["shirt", "travel"]}
    productGridKeyword=""
  />
);

export default TravelShirt;
