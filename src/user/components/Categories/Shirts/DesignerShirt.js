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
  { id: "luxury-embroidered-designer-shirt", name: "Luxury Embroidered Designer Shirt", image: TheRoyalWeddingEdit, description: "A premium designer shirt featuring intricate embroidery for a standout luxurious look." },
  { id: "navy-designer-premium-shirt", name: "Navy Designer Premium Shirt", video: TheChurchAffair, description: "A refined navy designer shirt crafted with premium fabric and modern styling." },
  { id: "black-designer-signature-shirt", name: "Black Designer Signature Shirt", image: TheDestinationDream, description: "A bold black designer shirt tailored for a sleek and signature fashion statement." },
  { id: "beige-designer-elegance-shirt", name: "Beige Designer Elegance Shirt", image: TheRoyalWeddingEdit, description: "A soft beige designer shirt offering elegance and refined minimal styling." },
  { id: "striped-designer-style-shirt", name: "Striped Designer Style Shirt", video: TheChurchAffair, description: "A stylish striped designer shirt that blends trend and sophistication." },
  { id: "blue-designer-modern-shirt", name: "Blue Designer Modern Shirt", image: TheSangeetSoiree, description: "A vibrant blue designer shirt crafted for a fresh and modern fashion appeal." },
  { id: "brown-designer-premium-shirt", name: "Brown Designer Premium Shirt", image: TheRoyalWeddingEdit, description: "A rich brown designer shirt designed for a warm and premium look." },
  { id: "check-designer-fashion-shirt", name: "Check Designer Fashion Shirt", video: TheChurchAffair, description: "A check-pattern designer shirt that adds a fashionable and trendy edge." },
  { id: "grey-designer-slim-shirt", name: "Grey Designer Slim Shirt", image: TheDestinationDream, description: "A sleek grey designer shirt with a slim fit for a sharp and modern silhouette." },
];

const DesignerShirt = () => (
  <SubcategoryPage
    slug="shirts-designer"
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
    productKeywords={["shirt", "designer"]}
    productGridKeyword=""
  />
);

export default DesignerShirt;
