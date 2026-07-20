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
  { id: "smart-casual-chino-trouser", name: "Smart Casual Chino Trouser", image: TheRoyalWeddingEdit, description: "A versatile chino trouser designed for a relaxed yet polished smart casual look." },
  { id: "navy-smart-casual-trouser", name: "Navy Smart Casual Trouser", video: TheChurchAffair, description: "A refined navy trouser blending comfort with a clean and modern casual style." },
  { id: "black-casual-modern-trouser", name: "Black Casual Modern Trouser", image: TheDestinationDream, description: "A sleek black trouser perfect for a minimal and stylish smart casual appearance." },
  { id: "beige-relaxed-fit-trouser", name: "Beige Relaxed Fit Trouser", image: TheRoyalWeddingEdit, description: "A soft beige trouser offering comfort and ease for everyday smart casual wear." },
  { id: "striped-smart-casual-trouser", name: "Striped Smart Casual Trouser", video: TheChurchAffair, description: "A stylish striped trouser that adds a trendy touch to your casual outfits." },
  { id: "blue-everyday-casual-trouser", name: "Blue Everyday Casual Trouser", image: TheSangeetSoiree, description: "A fresh blue trouser crafted for a comfortable and stylish daily look." },
  { id: "brown-relaxed-casual-trouser", name: "Brown Relaxed Casual Trouser", image: TheRoyalWeddingEdit, description: "A cozy brown trouser designed for relaxed and effortless smart casual styling." },
  { id: "check-smart-casual-trouser", name: "Check Smart Casual Trouser", video: TheChurchAffair, description: "A check-pattern trouser perfect for a modern and fashionable casual vibe." },
  { id: "grey-smart-casual-fit-trouser", name: "Grey Smart Casual Fit Trouser", image: TheDestinationDream, description: "A modern grey trouser combining comfort with a clean and smart casual finish." },
];

const SmartCasualTrouser = () => (
  <SubcategoryPage
    slug="trousers-smart-casual"
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
    productKeywords={["trouser", "smart", "casual"]}
    productGridKeyword=""
  />
);

export default SmartCasualTrouser;
