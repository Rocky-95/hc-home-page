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
  { id: "smart-casual-linen-shirt", name: "Smart Casual Linen Shirt", image: TheRoyalWeddingEdit, description: "A breathable linen shirt designed for a relaxed yet refined smart casual look." },
  { id: "navy-smart-casual-shirt", name: "Navy Smart Casual Shirt", video: TheChurchAffair, description: "A versatile navy shirt blending comfort with a polished everyday style." },
  { id: "black-casual-modern-shirt", name: "Black Casual Modern Shirt", image: TheDestinationDream, description: "A sleek black shirt perfect for a minimal and modern smart casual appearance." },
  { id: "beige-smart-casual-shirt", name: "Beige Smart Casual Shirt", image: TheRoyalWeddingEdit, description: "A soft beige shirt offering comfort and elegance for everyday casual wear." },
  { id: "striped-smart-casual-shirt", name: "Striped Smart Casual Shirt", video: TheChurchAffair, description: "A stylish striped shirt that adds a trendy touch to smart casual outfits." },
  { id: "blue-everyday-casual-shirt", name: "Blue Everyday Casual Shirt", image: TheSangeetSoiree, description: "A fresh blue shirt crafted for a comfortable and stylish daily look." },
  { id: "brown-relaxed-casual-shirt", name: "Brown Relaxed Casual Shirt", image: TheRoyalWeddingEdit, description: "A cozy brown shirt designed for relaxed and effortless smart casual styling." },
  { id: "check-smart-casual-shirt", name: "Check Smart Casual Shirt", video: TheChurchAffair, description: "A check-pattern shirt perfect for a modern and fashionable casual vibe." },
  { id: "grey-smart-casual-fit-shirt", name: "Grey Smart Casual Fit Shirt", image: TheDestinationDream, description: "A modern grey shirt combining comfort with a clean and smart casual finish." },
];

const SmartCasualShirt = () => (
  <SubcategoryPage
    slug="shirts-smart-casual"
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
    productKeywords={["shirt", "smart", "casual"]}
    productGridKeyword=""
  />
);

export default SmartCasualShirt;
