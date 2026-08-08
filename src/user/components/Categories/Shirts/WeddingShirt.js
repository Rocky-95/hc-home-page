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
  { id: "royal-wedding-white-shirt", name: "Royal Wedding White Shirt", image: TheRoyalWeddingEdit, description: "A luxurious white shirt crafted for a clean and elegant wedding look." },
  { id: "navy-wedding-elegance-shirt", name: "Navy Wedding Elegance Shirt", video: TheChurchAffair, description: "A refined navy shirt designed for sophisticated wedding ceremonies and receptions." },
  { id: "black-wedding-signature-shirt", name: "Black Wedding Signature Shirt", image: TheDestinationDream, description: "A bold black shirt tailored for a sleek and premium wedding statement." },
  { id: "beige-wedding-luxe-shirt", name: "Beige Wedding Luxe Shirt", image: TheRoyalWeddingEdit, description: "A soft beige shirt offering elegance and comfort for day wedding events." },
  { id: "striped-wedding-style-shirt", name: "Striped Wedding Style Shirt", video: TheChurchAffair, description: "A stylish striped shirt adding a modern twist to wedding fashion." },
  { id: "blue-wedding-festive-shirt", name: "Blue Wedding Festive Shirt", image: TheSangeetSoiree, description: "A vibrant blue shirt perfect for festive wedding celebrations and functions." },
  { id: "brown-wedding-premium-shirt", name: "Brown Wedding Premium Shirt", image: TheRoyalWeddingEdit, description: "A rich brown shirt crafted for a warm and sophisticated wedding look." },
  { id: "check-wedding-designer-shirt", name: "Check Wedding Designer Shirt", video: TheChurchAffair, description: "A check-pattern shirt designed to bring a unique and stylish edge to wedding attire." },
  { id: "grey-wedding-modern-shirt", name: "Grey Wedding Modern Shirt", image: TheDestinationDream, description: "A modern grey shirt combining elegance with a clean and refined wedding finish." },
];

const WeddingShirt = () => (
  <SubcategoryPage
    slug="shirts-wedding"
    heroVideo={weddingVideo}
    heroTitle="Wedding Shirts"
    heroSubtitle="For the Men Who Wear Royalty, Not Just Suits."
    marqueeWords={["Wedding Shirts"]}
    leftImage={leftImg}
    centerVideo={centerVideo}
    rightImage={rightImg}
    sliderImages={[sliderImg1, sliderImg2, sliderImg3]}
    labelVideo={LabelVideo}
    labelImage={LabelImage}
    descriptionTitle="The Wedding Shirts Edit"
    descriptionText="Command attention with this masterpiece of craftsmanship: a luxurious black velvet tuxedo intricately hand-embroidered with golden threadwork and shimmering sequins. The blazer features an ornate front design, extending seamlessly to an equally detailed back, showcasing royal patterns inspired by heritage artistry. Paired with a sleek black shirt, bow tie, and trousers, the look is finished with a golden pocket square for the perfect touch of elegance.

This outfit blends modern tailoring with timeless hand embroidery, making it the ideal choice for weddings, receptions, red carpet events, and any occasion where sophistication meets grandeur."
    footerText="The Wedding Shirts Collection"
    fallbackCategories={fallbackCategories}
    productKeywords={["shirt", "wedding"]}
    productGridKeyword=""
  />
);

export default WeddingShirt;
