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
  { id: "classic-white-business-shirt", name: "Classic White Business Shirt", image: TheRoyalWeddingEdit, description: "A timeless white shirt designed for a clean, sharp, and professional business look." },
  { id: "navy-formal-shirt", name: "Navy Formal Shirt", video: TheChurchAffair, description: "A deep navy shirt offering a refined and confident appearance for formal settings." },
  { id: "black-premium-shirt", name: "Black Premium Shirt", image: TheDestinationDream, description: "A sleek black shirt crafted for bold and modern professional styling." },
  { id: "beige-office-shirt", name: "Beige Office Shirt", image: TheRoyalWeddingEdit, description: "A soft beige shirt perfect for a subtle and elegant office look." },
  { id: "striped-corporate-shirt", name: "Striped Corporate Shirt", video: TheChurchAffair, description: "A stylish striped shirt that adds a modern touch to business attire." },
  { id: "light-blue-formal-shirt", name: "Light Blue Formal Shirt", image: TheSangeetSoiree, description: "A fresh light blue shirt designed for a smart and approachable professional look." },
  { id: "brown-business-shirt", name: "Brown Business Shirt", image: TheRoyalWeddingEdit, description: "A rich brown shirt offering a warm and sophisticated office appearance." },
  { id: "checkered-office-shirt", name: "Checkered Office Shirt", video: TheChurchAffair, description: "A check-pattern shirt combining comfort with a stylish corporate vibe." },
  { id: "grey-slim-fit-shirt", name: "Grey Slim Fit Shirt", image: TheDestinationDream, description: "A modern grey slim-fit shirt tailored for a sharp and professional finish." },
];

const BusinessShirt = () => (
  <SubcategoryPage
    slug="shirts-business"
    heroVideo={weddingVideo}
    heroTitle="Business"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Business"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Business Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Business Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["shirt", "business", "office", "corporate"]}
    productGridKeyword=""
  />
);

export default BusinessShirt;
